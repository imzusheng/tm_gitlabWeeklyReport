import { useReducer, useEffect, useCallback, useMemo, useRef } from 'react'
import { GitLabEvent, AppMode } from '@/types'
import { storageUtils, errorUtils, configErrors } from '@/utils'
import { useAbortableRequest } from './useAbortableRequest'
import { createGitLabApiService, GitLabApiService } from '@/services/gitlab-api'
import { createDeepSeekApiService } from '@/services/deepseek-api'

// Import reducers
import { configReducer, initialConfigState } from './reducers/configReducer'
import { uiReducer, initialUIState } from './reducers/uiReducer'
import { dataReducer, initialDataState } from './reducers/dataReducer'

// Legacy state structure - kept for reference but not used
// const initialState: AppState = { ... }

export function useAppState() {
  // Initialize reducers
  const [configState, dispatchConfig] = useReducer(
    configReducer,
    initialConfigState,
  )
  const [uiState, dispatchUI] = useReducer(uiReducer, initialUIState)
  const [dataState, dispatchData] = useReducer(dataReducer, initialDataState)

  const { createRequest, isRequestCancelled, cleanupRequest, isAbortError } =
    useAbortableRequest()

  // Combined state for backward compatibility
  const state = useMemo(
    () => ({
      config: configState.config,
      reportData: null, // Deprecated, keeping for compatibility
      isLoading: uiState.isLoading,
      error: uiState.error,
      theme: configState.config.theme,
      activePanel: uiState.activePanel,
      appMode: uiState.appMode,
      filterConditions: dataState.filterConditions,
      sortOptions: dataState.sortOptions,
      paginationOptions: dataState.paginationOptions,
      // 根据模式返回不同的数据
      events:
        uiState.appMode === 'changelog'
          ? dataState.changelogState.events
          : dataState.events,
      totalCount:
        uiState.appMode === 'changelog'
          ? dataState.changelogState.totalCount
          : dataState.totalCount,
      aiGenerationConfig: dataState.aiGenerationConfig,
      projects: dataState.projects,
      selectedProjectId: dataState.selectedProjectId,
      commits: [], // Deprecated, keeping for compatibility
      eventsSelectedIds: dataState.eventsSelectedIds,
      changelogState: dataState.changelogState,
      changelogFilterConditions: dataState.changelogFilterConditions,
      selectedEvent: uiState.selectedEvent,
      isDetailModalVisible: uiState.isDetailModalVisible,
    }),
    [configState, uiState, dataState],
  )

  const gitlabService = useRef<GitLabApiService | null>(null)
  const stableGitlabService = useRef<GitLabApiService | null>(null)

  // 确保 gitlabService 只在配置真正变化时才重新创建
  useEffect(() => {
    if (!gitlabService.current) {
      gitlabService.current = createGitLabApiService(
        configState.config.gitlabUrl,
        configState.config.gitlabToken,
      )
      stableGitlabService.current = gitlabService.current
    } else {
      // 只更新配置，不重新创建实例
      gitlabService.current.updateConfig(
        configState.config.gitlabUrl,
        configState.config.gitlabToken,
      )
    }
  }, [configState.config.gitlabUrl, configState.config.gitlabToken])

  // Load saved configuration on mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedConfig = storageUtils.loadConfig()
        if (savedConfig) {
          dispatchConfig({ type: 'LOAD_CONFIG', payload: savedConfig })
          dispatchUI({
            type: 'SET_THEME',
            payload: savedConfig.theme || 'system',
          })
        }
      } catch (error) {
        console.error('Failed to load saved config:', error)
        dispatchConfig({ type: 'LOAD_CONFIG' })
      }
    }
    loadSavedData()
  }, [])

  // Configuration actions
  const updateConfig = useCallback(
    (updates: Partial<typeof configState.config>) => {
      dispatchConfig({ type: 'UPDATE_CONFIG', payload: updates })
    },
    [configState], // 添加 configState 依赖
  )

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    dispatchConfig({ type: 'SET_THEME', payload: theme })
    dispatchUI({ type: 'SET_THEME', payload: theme })
  }, [])

  const isConfigValid = useCallback(
    () => configState.isValid,
    [configState.isValid],
  )

  // UI actions
  const setActivePanel = useCallback(
    (panel: typeof uiState.activePanel) => {
      dispatchUI({ type: 'SET_ACTIVE_PANEL', payload: panel })
    },
    [uiState], // 添加 uiState 依赖
  )

  const setAppMode = useCallback((mode: AppMode) => {
    dispatchUI({ type: 'SET_APP_MODE', payload: mode })
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    dispatchUI({ type: 'SET_LOADING', payload: loading })
  }, [])

  const setError = useCallback((error: string | null) => {
    dispatchUI({ type: 'SET_ERROR', payload: error })
  }, [])

  const handleEventDetail = useCallback((event: GitLabEvent) => {
    dispatchUI({ type: 'SHOW_EVENT_DETAIL', payload: event })
  }, [])

  const handleCloseEventDetail = useCallback(() => {
    dispatchUI({ type: 'HIDE_EVENT_DETAIL' })
  }, [])

  // Data actions - setEvents and setTotal functions removed as they are unused

  const setEventsSelectedIds = useCallback(
    (updater: number[] | ((prev: number[]) => number[])) => {
      dispatchData({ type: 'SET_EVENTS_SELECTED_IDS', payload: updater })
    },
    [],
  )

  const setChangelogState = useCallback(
    (updater: Partial<typeof dataState.changelogState>) => {
      dispatchData({ type: 'SET_CHANGELOG_STATE', payload: updater })
    },
    [dataState],
  )

  const setSelectedProjectId = useCallback((projectId: number | null) => {
    dispatchData({ type: 'SET_SELECTED_PROJECT', payload: projectId })
  }, [])

  const updateFilterConditions = useCallback(
    (filters: typeof dataState.filterConditions) => {
      dispatchData({ type: 'SET_FILTER_CONDITIONS', payload: filters })
    },
    [dataState],
  )

  const updateSortOptions = useCallback(
    (sort: typeof dataState.sortOptions) => {
      dispatchData({ type: 'SET_SORT_OPTIONS', payload: sort })
    },
    [dataState],
  )

  const updatePaginationOptions = useCallback(
    (pagination: Partial<typeof dataState.paginationOptions>) => {
      dispatchData({ type: 'SET_PAGINATION_OPTIONS', payload: pagination })
    },
    [dataState], // 添加 dataState 依赖
  )

  // Time range calculation - 使用 useMemo 优化性能
  const timeRange = useMemo(() => {
    const now = new Date()
    const timeRangeValue = dataState.filterConditions.timeRange
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
    const endDate = new Date(now.getTime() + MILLISECONDS_PER_DAY)
    if (timeRangeValue === 'week') {
      const currentDay = now.getDay()
      let daysFromMonday = currentDay === 0 ? 6 : currentDay - 1
      if (currentDay === 1) daysFromMonday += 1
      const startDate = new Date(
        now.getTime() - daysFromMonday * MILLISECONDS_PER_DAY,
      )
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }
    }
    const TIME_RANGE_DAYS = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '180d': 180,
      '365d': 365,
    } as const
    const days =
      TIME_RANGE_DAYS[timeRangeValue as keyof typeof TIME_RANGE_DAYS] || 7
    const startDate = new Date(now.getTime() - days * MILLISECONDS_PER_DAY)
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    }
  }, [dataState.filterConditions.timeRange])

  const getTimeRange = useCallback(() => timeRange, [timeRange])

  // Load events
  const loadEvents = useCallback(async () => {
    if (!isConfigValid()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }
    if (!gitlabService.current) {
      setError('GitLab 服务未初始化')
      return
    }
    const abortController = createRequest()
    setLoading(true)
    setError(null)
    try {
      await gitlabService.current.init()
      const { startDate, endDate } = getTimeRange()
      const currentUser = await gitlabService.current.getCurrentUser()
      const { events, total } =
        await gitlabService.current.getUserEventsWithTotal(currentUser.id, {
          after: startDate,
          before: endDate,
          target_type:
            dataState.filterConditions.targetType?.length > 0
              ? dataState.filterConditions.targetType
              : undefined,
          action:
            dataState.filterConditions.action?.length > 0
              ? dataState.filterConditions.action
              : undefined,
          page: dataState.paginationOptions.page,
          per_page: dataState.paginationOptions.pageSize,
          sort: dataState.sortOptions.order || 'desc',
          signal: abortController.signal,
        })
      if (isRequestCancelled(abortController)) return

      dispatchData({
        type: 'SET_EVENTS',
        payload: { events, totalCount: total },
      })
      // 重置选择状态，但保持全选状态
      dispatchData({
        type: 'SET_EVENTS_SELECTED_IDS',
        payload: (prev: number[]) =>
          prev.length === 1 && prev[0] === 0 ? prev : [],
      })
    } catch (error) {
      if (!isAbortError(error)) {
        setError(errorUtils.formatErrorMessage(error))
        dispatchData({
          type: 'SET_EVENTS',
          payload: { events: [], totalCount: 0 },
        })
      }
    } finally {
      if (!isRequestCancelled(abortController)) setLoading(false)
      cleanupRequest(abortController)
    }
  }, [
    dataState.paginationOptions.page,
    dataState.paginationOptions.pageSize,
    dataState.sortOptions,
    dataState.filterConditions,
    getTimeRange,
    setLoading,
    setError,
    isConfigValid,
    createRequest,
    isRequestCancelled,
    isAbortError,
    cleanupRequest,
  ])

  // Set changelog filter conditions
  const setChangelogFilterConditions = useCallback(
    (filters: typeof dataState.changelogFilterConditions) => {
      dispatchData({
        type: 'SET_CHANGELOG_FILTER_CONDITIONS',
        payload: filters,
      })
    },
    [dataState],
  )

  // Load changelog events
  const loadChangelogEvents = useCallback(async () => {
    if (!isConfigValid()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }
    if (!gitlabService.current) {
      setError('GitLab 服务未初始化')
      return
    }
    if (!dataState.selectedProjectId) {
      // 如果没有选择项目，清空数据
      dispatchData({
        type: 'SET_CHANGELOG_STATE',
        payload: { events: [], totalCount: 0 },
      })
      return
    }
    const abortController = createRequest()
    setLoading(true)
    setError(null)
    try {
      await gitlabService.current.init()

      const filterConditions = dataState.changelogFilterConditions
      const params: {
        page: number
        per_page: number
        sort: 'asc' | 'desc'
        signal: AbortSignal
        after?: string
        before?: string
        action?: string[]
        target_type?: string[]
      } = {
        page: dataState.paginationOptions.page,
        per_page: dataState.paginationOptions.pageSize,
        sort: dataState.sortOptions.order || 'desc',
        signal: abortController.signal,
      }

      // Add date filters
      if (filterConditions.startDate) {
        params.after = filterConditions.startDate
      }
      if (filterConditions.endDate) {
        params.before = filterConditions.endDate
      }

      // Add action filter
      if (filterConditions.actionTypes.length > 0) {
        params.action = filterConditions.actionTypes
      }

      // Add target type filter
      if (filterConditions.targetTypes.length > 0) {
        params.target_type = filterConditions.targetTypes
      }

      const { events, total } =
        await gitlabService.current.getProjectEventsWithTotal(
          dataState.selectedProjectId,
          params,
        )
      if (isRequestCancelled(abortController)) return

      // 根据新事件列表同步已选中 ID，避免显示与实际不符的计数
      const previousSelectedIds = dataState.changelogState.selectedEventIds
      const isKeepingFullSelection =
        previousSelectedIds.length === 1 && previousSelectedIds[0] === 0
      let syncedSelectedIds = previousSelectedIds
      if (!isKeepingFullSelection) {
        const idSet = new Set(events.map(e => e.id))
        syncedSelectedIds = previousSelectedIds.filter(id => idSet.has(id))
      }

      dispatchData({
        type: 'SET_CHANGELOG_STATE',
        payload: {
          events,
          totalCount: total,
          selectedEventIds: syncedSelectedIds,
        },
      })
    } catch (error) {
      if (!isAbortError(error)) {
        setError(errorUtils.formatErrorMessage(error))
        dispatchData({
          type: 'SET_CHANGELOG_STATE',
          payload: { events: [], totalCount: 0 },
        })
      }
    } finally {
      if (!isRequestCancelled(abortController)) setLoading(false)
      cleanupRequest(abortController)
    }
  }, [
    dataState,
    setLoading,
    setError,
    isConfigValid,
    createRequest,
    isRequestCancelled,
    isAbortError,
    cleanupRequest,
  ])

  // Load projects
  const loadProjects = useCallback(async () => {
    if (!isConfigValid()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }
    if (!gitlabService.current) {
      setError('GitLab 服务未初始化')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await gitlabService.current.init()
      const projects = await gitlabService.current.getProjects({
        membership: true,
        per_page: 100,
        simple: true,
        order_by: 'last_activity_at',
      })
      dispatchData({ type: 'SET_PROJECTS', payload: projects })
    } catch (error) {
      setError(errorUtils.formatErrorMessage(error as Error))
      dispatchData({ type: 'SET_PROJECTS', payload: [] })
    } finally {
      setLoading(false)
    }
  }, [isConfigValid, setLoading, setError])

  // Mode change handler
  const handleModeChange = useCallback(
    async (mode: AppMode) => {
      setAppMode(mode)
      // 移除自动加载项目的逻辑，让 ProjectSelector 组件自己管理
      // 这样可以避免重复请求
    },
    [setAppMode],
  )

  // Auto-load events when in events mode - 直接在 useEffect 中处理数据加载
  useEffect(() => {
    if (!isConfigValid() || uiState.appMode !== 'events') return

    const loadData = async () => {
      if (!gitlabService.current) {
        setError('GitLab 服务未初始化')
        return
      }
      const abortController = createRequest()
      setLoading(true)
      setError(null)
      try {
        await gitlabService.current.init()
        const { startDate, endDate } = getTimeRange()
        const currentUser = await gitlabService.current.getCurrentUser()
        const { events, total } =
          await gitlabService.current.getUserEventsWithTotal(currentUser.id, {
            after: startDate,
            before: endDate,
            target_type:
              dataState.filterConditions.targetType?.length > 0
                ? dataState.filterConditions.targetType
                : undefined,
            action:
              dataState.filterConditions.action?.length > 0
                ? dataState.filterConditions.action
                : undefined,
            page: dataState.paginationOptions.page,
            per_page: dataState.paginationOptions.pageSize,
            sort: dataState.sortOptions.order || 'desc',
            signal: abortController.signal,
          })
        if (isRequestCancelled(abortController)) return

        dispatchData({
          type: 'SET_EVENTS',
          payload: { events, totalCount: total },
        })
        dispatchData({
          type: 'SET_EVENTS_SELECTED_IDS',
          payload: (prev: number[]) =>
            prev.length === 1 && prev[0] === 0 ? prev : [],
        })
      } catch (error) {
        if (!isAbortError(error)) {
          setError(errorUtils.formatErrorMessage(error))
          dispatchData({
            type: 'SET_EVENTS',
            payload: { events: [], totalCount: 0 },
          })
        }
      } finally {
        if (!isRequestCancelled(abortController)) setLoading(false)
        cleanupRequest(abortController)
      }
    }

    loadData()
  }, [
    uiState.appMode,
    dataState.paginationOptions.page,
    dataState.paginationOptions.pageSize,
    dataState.sortOptions.order,
    dataState.filterConditions,
    timeRange.startDate,
    timeRange.endDate,
    isConfigValid,
    cleanupRequest,
    createRequest,
    getTimeRange,
    isAbortError,
    isRequestCancelled,
    setError,
    setLoading,
  ])

  // Auto-load changelog events when in changelog mode
  useEffect(() => {
    if (!isConfigValid() || uiState.appMode !== 'changelog') return

    const loadData = async () => {
      if (!dataState.selectedProjectId) {
        dispatchData({
          type: 'SET_CHANGELOG_STATE',
          payload: { events: [], totalCount: 0 },
        })
        return
      }

      if (!gitlabService.current) {
        setError('GitLab 服务未初始化')
        return
      }
      const abortController = createRequest()
      setLoading(true)
      setError(null)
      try {
        await gitlabService.current.init()
        const { events, total } =
          await gitlabService.current.getProjectEventsWithTotal(
            dataState.selectedProjectId,
            {
              page: dataState.paginationOptions.page,
              per_page: dataState.paginationOptions.pageSize,
              sort: dataState.sortOptions.order || 'desc',
              signal: abortController.signal,
            },
          )
        if (isRequestCancelled(abortController)) return

        dispatchData({
          type: 'SET_CHANGELOG_STATE',
          payload: { events, totalCount: total },
        })
      } catch (error) {
        if (!isAbortError(error)) {
          setError(errorUtils.formatErrorMessage(error))
          dispatchData({
            type: 'SET_CHANGELOG_STATE',
            payload: { events: [], totalCount: 0 },
          })
        }
      } finally {
        if (!isRequestCancelled(abortController)) setLoading(false)
        cleanupRequest(abortController)
      }
    }

    loadData()
  }, [
    uiState.appMode,
    dataState.selectedProjectId,
    dataState.paginationOptions.page,
    dataState.paginationOptions.pageSize,
    dataState.sortOptions.order,
    dataState.changelogFilterConditions,
    isConfigValid,
    cleanupRequest,
    createRequest,
    isAbortError,
    isRequestCancelled,
    setError,
    setLoading,
  ])

  // Computed values
  const selectedEventIds = useMemo(() => {
    return uiState.appMode === 'events'
      ? dataState.eventsSelectedIds
      : dataState.changelogState.selectedEventIds
  }, [
    uiState.appMode,
    dataState.eventsSelectedIds,
    dataState.changelogState.selectedEventIds,
  ])

  const isAllEventsSelected = useMemo(() => {
    if (uiState.appMode === 'events')
      return selectedEventIds.includes(0) && dataState.totalCount > 0
    return dataState.changelogState.isAllEventsSelected
  }, [
    uiState.appMode,
    selectedEventIds,
    dataState.totalCount,
    dataState.changelogState.isAllEventsSelected,
  ])

  const displaySelectedCount = useMemo(() => {
    if (uiState.appMode === 'events') {
      if (isAllEventsSelected) return dataState.totalCount
      return selectedEventIds.filter(id => id !== 0).length
    } else {
      if (dataState.changelogState.isAllEventsSelected)
        return dataState.changelogState.totalCount
      return dataState.changelogState.selectedEventIds.filter(id => id !== 0)
        .length
    }
  }, [
    uiState.appMode,
    selectedEventIds,
    dataState.totalCount,
    dataState.changelogState,
    isAllEventsSelected,
  ])

  // Fetch all events helper
  const handleFetchAllEvents = useCallback(async (): Promise<GitLabEvent[]> => {
    if (!isConfigValid()) throw new Error('配置不完整')
    if (!gitlabService.current) throw new Error('GitLab 服务未初始化')
    await gitlabService.current.init()
    let allEvents: GitLabEvent[] = []
    const perPage = 100
    let page = 1,
      hasMore = true
    if (uiState.appMode === 'events') {
      const currentUser = await gitlabService.current.getCurrentUser()
      while (hasMore) {
        const { events, total } =
          await gitlabService.current.getUserEventsWithTotal(currentUser.id, {
            per_page: perPage,
            page,
            after: timeRange.startDate,
            before: timeRange.endDate,
            sort: dataState.sortOptions.order,
          })
        allEvents = [...allEvents, ...events]
        hasMore = events.length === perPage && allEvents.length < total
        page++
        if (page > 100) break
      }
    } else if (uiState.appMode === 'changelog' && dataState.selectedProjectId) {
      while (hasMore) {
        const { events, total } =
          await gitlabService.current.getProjectEventsWithTotal(
            dataState.selectedProjectId,
            {
              per_page: perPage,
              page,
              sort: dataState.sortOptions.order,
            },
          )
        allEvents = [...allEvents, ...events]
        hasMore = events.length === perPage && allEvents.length < total
        page++
        if (page > 100) break
      }
    }
    return allEvents
  }, [
    isConfigValid,
    uiState.appMode,
    dataState.sortOptions.order,
    dataState.selectedProjectId,
    timeRange,
  ])

  // Generate report
  const handleGenerateReport = useCallback(
    async (prompt: string) => {
      if (!isConfigValid()) {
        setError(configErrors.INCOMPLETE_CONFIG)
        return
      }
      if (selectedEventIds.length === 0) {
        setError(configErrors.NO_EVENTS_SELECTED)
        return
      }
      setLoading(true)
      setError(null)
      try {
        let selectedEvents: GitLabEvent[]
        if (isAllEventsSelected) {
          selectedEvents = await handleFetchAllEvents()
        } else {
          const sourceEvents =
            uiState.appMode === 'events'
              ? dataState.events
              : dataState.changelogState.events
          selectedEvents = sourceEvents.filter(event =>
            selectedEventIds.includes(event.id),
          )
        }
        const taskType =
          uiState.appMode === 'changelog' ? 'changelog' : 'weekly-report'
        const eventsData = selectedEvents
          .map(
            (event: GitLabEvent) =>
              `${new Date(event.created_at).toLocaleDateString('zh-CN')} - ${event.action_name}: ${event.target_title || event.push_data?.commit_title || '无标题'}`,
          )
          .join('\n')
        const deepseekService = createDeepSeekApiService(
          configState.config.deepseekApiKey,
        )
        const result = await deepseekService.generateWeeklyReport(
          eventsData,
          prompt,
          configState.config.model,
          configState.config.tokenLimit,
        )
        dispatchData({
          type: 'SET_AI_GENERATION_CONFIG',
          payload: {
            taskType,
            prompt,
            tokensUsed: result.tokensUsed,
            result: result.content,
          },
        })
      } catch (error) {
        setError(errorUtils.formatErrorMessage(error as Error))
      } finally {
        setLoading(false)
      }
    },
    [
      isConfigValid,
      selectedEventIds,
      isAllEventsSelected,
      handleFetchAllEvents,
      uiState.appMode,
      configState.config,
      dataState.events,
      dataState.changelogState.events,
      setError,
      setLoading,
    ],
  )

  return {
    state,
    gitlabService: stableGitlabService.current,
    updateConfig,
    setActivePanel,
    setAppMode,
    setLoading,
    setError,
    setTheme,
    loadEvents,
    loadChangelogEvents,
    loadProjects,
    handleModeChange,
    handleGenerateReport,
    handleFetchAllEvents,
    isConfigValid,
    getTimeRange,
    selectedEventIds,
    isAllEventsSelected,
    displaySelectedCount,
    setEventsSelectedIds,
    setChangelogState,
    setSelectedProjectId,
    updateFilterConditions,
    updateSortOptions,
    updatePaginationOptions,
    setChangelogFilterConditions,
    handleEventDetail,
    handleCloseEventDetail,
  }
}
