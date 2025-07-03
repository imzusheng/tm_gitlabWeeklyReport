import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'
// import { useGlobalSelection } from '@/hooks/useGlobalSelection' // 暂时注释

import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'

import type {
  GitLabEvent,
  FilterConditions,
  PaginationOptions,
  AppConfig,
  SortOptions,
  AppMode,
} from '@/types'
import { errorUtils, configErrors } from '@/utils'
import { createGitLabApiService } from '@/services/gitlab-api'
import styles from './App.module.less'

interface AppProps {
  isUserscript?: boolean
}

const App: React.FC<AppProps> = ({ isUserscript = false }) => {
  const {
    state,
    updateConfig,
    setTheme,
    setActivePanel,
    setAppMode,
    setProjects,
    updateFilterConditions,
    updateSortOptions,
    updatePaginationOptions,
    setEvents,
    setTotal,
    setAIGenerationConfig,
    setLoading,
    setError,
    isConfigValid,
    getTimeRange,
  } = useAppState()

  // 使用可取消请求Hook
  const { createRequest, isRequestCancelled, cleanupRequest, isAbortError } =
    useAbortableRequest()

  const gitlabService = useMemo(() => {
    return createGitLabApiService(
      state.config.gitlabUrl,
      state.config.gitlabToken,
    )
  }, [state.config.gitlabUrl, state.config.gitlabToken])

  // 事件详情状态
  const [selectedEvent, setSelectedEvent] = useState<GitLabEvent | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 暂时保持原有的选择状态管理
  const [eventsSelectedIds, setEventsSelectedIds] = useState<number[]>([])

  // Changelog面板状态（保留用于兼容）
  const [changelogState, setChangelogState] = useState<{
    selectedEventIds: number[]
    isAllEventsSelected: boolean
    totalCount: number
    events: GitLabEvent[]
  }>({
    selectedEventIds: [],
    isAllEventsSelected: false,
    totalCount: 0,
    events: [],
  })

  // 根据当前模式获取相应的选中状态
  const selectedEventIds = useMemo(() => {
    return state.appMode === 'events'
      ? eventsSelectedIds
      : changelogState.selectedEventIds
  }, [state.appMode, eventsSelectedIds, changelogState.selectedEventIds])

  // 根据当前模式获取相应的setState函数
  const setSelectedEventIds = useCallback(
    (updater: number[] | ((prev: number[]) => number[])) => {
      if (state.appMode === 'events') {
        setEventsSelectedIds(updater)
      }
      // Changelog模式的状态通过ChangelogPanel内部管理，不需要在这里设置
    },
    [state.appMode],
  )

  // 使用全局选择状态管理 (暂时注释)
  // const {
  //   getSelectionForMode,
  //   updateSelectionForMode,
  //   isEventSelected,
  //   getSelectedCount,
  //   toggleEventSelection,
  //   getSelectedEvents,
  // } = useGlobalSelection()

  // 计算实际主题
  const actualTheme = useMemo(() => {
    if (state.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return state.theme
  }, [state.theme])

  // 监听系统主题变化并应用主题类
  useEffect(() => {
    // 应用主题类到body元素
    document.body.className = document.body.className
      .replace(/\b(light|dark)\b/g, '')
      .trim()
    document.body.classList.add(actualTheme)

    if (state.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        // 强制重新渲染以更新主题
        window.dispatchEvent(new Event('resize'))
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
    // 当主题不是system时，确保没有遗留的监听器
    return undefined
  }, [state.theme, actualTheme])

  /**
   * 加载GitLab事件数据
   */
  const loadEvents = useCallback(async () => {
    if (!isConfigValid()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }

    // 创建新请求并取消之前的请求
    const abortController = createRequest()

    setLoading(true)
    setError(null)

    try {
      // 确保GitLab服务已初始化
      await gitlabService.init()

      const { startDate, endDate } = getTimeRange()
      const targetTypes =
        state.filterConditions.targetType?.length > 0
          ? state.filterConditions.targetType
          : undefined

      const actions =
        state.filterConditions.action?.length > 0
          ? state.filterConditions.action
          : undefined

      // 只支持created_at字段的排序
      const sort = state.sortOptions.order || 'desc'

      // 获取当前用户信息
      const currentUser = await gitlabService.getCurrentUser()
      const params = {
        after: startDate,
        before: endDate,
        target_type: targetTypes,
        action: actions,
        page: state.paginationOptions.page,
        per_page: state.paginationOptions.pageSize,
        sort,
        signal: abortController.signal, // 传递 abort signal
      }

      // 获取用户事件数据和总数
      const { events, total } = await gitlabService.getUserEventsWithTotal(
        currentUser.id,
        params,
      )

      // 检查请求是否被取消
      if (isRequestCancelled(abortController)) {
        return
      }

      setEvents(events)
      // 如果不是全选状态，则清空选中事件（翻页时保持全选状态）
      setEventsSelectedIds(prev => {
        // 如果当前是全选状态（[0]），保持全选状态
        if (prev.length === 1 && prev[0] === 0) {
          return prev
        }
        // 否则清空选中状态
        return []
      })
      // 使用响应头中的总数
      setTotal(total)
    } catch (error) {
      // 忽略被取消的请求错误
      if (isAbortError(error)) {
        return
      }

      const errorMessage = errorUtils.formatErrorMessage(error)
      setError(errorMessage)
      setEvents([])
      setTotal(0)
    } finally {
      // 只有当前请求才设置 loading 为 false
      if (!isRequestCancelled(abortController)) {
        setLoading(false)
      }

      // 清理引用
      cleanupRequest(abortController)
    }
  }, [
    state.paginationOptions.page,
    state.paginationOptions.pageSize,
    state.sortOptions,
    state.filterConditions,
    getTimeRange,
    setEvents,
    setTotal,
    setLoading,
    setError,
    isConfigValid,
    gitlabService,
    createRequest,
    isRequestCancelled,
    isAbortError,
    cleanupRequest,
  ])

  useEffect(() => {
    if (isConfigValid()) {
      loadEvents()
    }
  }, [isConfigValid, loadEvents])

  // useAbortableRequest Hook 已经处理了组件卸载时的请求取消

  // 处理设置面板的打开和关闭
  const handleOpenSettings = useCallback(() => {
    setActivePanel('settings')
  }, [setActivePanel])

  const handleCloseSettings = useCallback(() => {
    setActivePanel('main')
  }, [setActivePanel])

  const handleSaveSettings = useCallback(
    (config: AppConfig, theme: 'light' | 'dark' | 'system') => {
      // 更新配置
      updateConfig(config)
      // 更新主题
      setTheme(theme)
    },
    [updateConfig, setTheme],
  )

  // 处理AI面板的打开和关闭
  const handleOpenAI = useCallback(() => {
    if (!isConfigValid()) {
      setError(configErrors.INCOMPLETE_GITLAB_DEEPSEEK)
      return
    }
    setActivePanel('ai')
  }, [isConfigValid, setError, setActivePanel])

  const handleCloseAI = useCallback(() => {
    setActivePanel('main')
  }, [setActivePanel])

  // 获取全量事件数据用于AI生成
  const handleFetchAllEvents = useCallback(async (): Promise<GitLabEvent[]> => {
    if (!isConfigValid()) {
      throw new Error('配置不完整')
    }

    const { createGitLabApiService } = await import('@/services/gitlab-api')
    const gitlabService = createGitLabApiService(
      state.config.gitlabUrl,
      state.config.gitlabToken,
    )

    await gitlabService.init()

    let allEvents: GitLabEvent[] = []
    const perPage = 100 // GitLab API 推荐的最大值
    let page = 1
    let hasMore = true

    // 根据应用模式获取不同的数据
    if (state.appMode === 'events') {
      const currentUser = await gitlabService.getCurrentUser()

      while (hasMore) {
        const { events, total } = await gitlabService.getUserEventsWithTotal(
          currentUser.id,
          {
            per_page: perPage,
            page,
            after: getTimeRange().startDate,
            before: getTimeRange().endDate,
            sort: state.sortOptions.order,
          },
        )

        allEvents = [...allEvents, ...events]
        hasMore = events.length === perPage && allEvents.length < total
        page++

        // 避免无限循环，设置最大页数限制
        if (page > 100) break
      }
    } else if (state.appMode === 'changelog' && state.selectedProjectId) {
      while (hasMore) {
        const { events, total } = await gitlabService.getProjectEventsWithTotal(
          state.selectedProjectId,
          {
            per_page: perPage,
            page,
            sort: state.sortOptions.order,
          },
        )

        allEvents = [...allEvents, ...events]
        hasMore = events.length === perPage && allEvents.length < total
        page++

        // 避免无限循环，设置最大页数限制
        if (page > 100) break
      }
    }

    return allEvents
  }, [
    isConfigValid,
    state.config.gitlabUrl,
    state.config.gitlabToken,
    state.appMode,
    state.sortOptions.order,
    state.selectedProjectId,
    getTimeRange,
  ])

  // 处理全选/取消全选
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        // 全选 - 设置选中数量为总数，但不实际获取所有事件ID
        setSelectedEventIds([0]) // 使用一个占位符表示全选状态
      } else {
        // 取消选中所有事件
        setSelectedEventIds([])
      }
    },
    [setSelectedEventIds],
  )

  // 检查是否选择了全部数据
  const isAllEventsSelected = useMemo(() => {
    if (state.appMode === 'events') {
      return eventsSelectedIds.includes(-1) && state.totalCount > 0
    } else {
      return changelogState.isAllEventsSelected
    }
  }, [
    state.appMode,
    eventsSelectedIds,
    state.totalCount,
    changelogState.isAllEventsSelected,
  ])

  // 获取显示的选中数量
  const displaySelectedCount = useMemo(() => {
    if (state.appMode === 'events') {
      if (eventsSelectedIds.includes(-1)) {
        return state.totalCount
      }
      // 排除-1标记计算真实的选中数量
      return eventsSelectedIds.filter(id => id !== -1).length
    } else {
      if (changelogState.isAllEventsSelected) {
        return changelogState.totalCount
      }
      return changelogState.selectedEventIds.length
    }
  }, [state.appMode, eventsSelectedIds, state.totalCount, changelogState])

  // 处理Changelog状态变化
  const handleChangelogStateChange = useCallback(
    (newState: {
      selectedEventIds: number[]
      isAllEventsSelected: boolean
      totalCount: number
      events: GitLabEvent[]
    }) => {
      setChangelogState(newState)
    },
    [setChangelogState],
  )

  // 处理AI生成
  const handleGenerateReport = useCallback(
    async (prompt: string) => {
      if (!isConfigValid()) {
        setError(configErrors.INCOMPLETE_CONFIG)
        return
      }

      // 检查是否需要选择事件
      if (selectedEventIds.length === 0) {
        setError(configErrors.NO_EVENTS_SELECTED)
        return
      }

      setLoading(true)
      setError(null)

      try {
        let selectedEvents: GitLabEvent[]

        // 如果是全选状态，需要先获取所有事件
        if (isAllEventsSelected) {
          selectedEvents = await handleFetchAllEvents()
        } else {
          // 使用已选中的事件数据
          if (state.appMode === 'events') {
            selectedEvents = state.events.filter(event =>
              selectedEventIds.includes(event.id),
            )
          } else {
            selectedEvents = changelogState.events.filter(event =>
              selectedEventIds.includes(event.id),
            )
          }
        }

        // 根据应用模式确定任务类型
        const taskType =
          state.appMode === 'changelog' ? 'changelog' : 'weekly-report'

        // 格式化事件数据为字符串
        const eventsData = selectedEvents
          .map((event: GitLabEvent) => {
            const date = new Date(event.created_at).toLocaleDateString('zh-CN')
            return `${date} - ${event.action_name}: ${event.target_title || event.push_data?.commit_title || '无标题'}`
          })
          .join('\n')

        // 使用DeepSeek API生成报告
        const { createDeepSeekApiService } = await import(
          '@/services/deepseek-api'
        )
        const deepseekService = createDeepSeekApiService(
          state.config.deepseekApiKey,
        )

        const result = await deepseekService.generateWeeklyReport(
          eventsData,
          prompt,
          state.config.model,
          state.config.tokenLimit,
        )

        setAIGenerationConfig({
          taskType,
          prompt,
          tokensUsed: result.tokensUsed,
          result: result.content,
        })
        setLoading(false)
      } catch (error) {
        const errorMessage = errorUtils.formatErrorMessage(error)
        setError(errorMessage)
        setLoading(false)
      }
    },
    [
      isConfigValid,
      selectedEventIds,
      isAllEventsSelected,
      handleFetchAllEvents,
      state.events,
      state.appMode,
      state.config.deepseekApiKey,
      state.config.model,
      state.config.tokenLimit,
      changelogState.events,
      setError,
      setLoading,
      setAIGenerationConfig,
    ],
  )

  // 处理分页变化
  const handlePaginationChange = useCallback(
    (paginationOptions: PaginationOptions) => {
      updatePaginationOptions(paginationOptions)
    },
    [updatePaginationOptions],
  )

  // 处理筛选条件变化
  const handleFilterChange = useCallback(
    (filters: FilterConditions) => {
      updateFilterConditions(filters)
      // 不需要立即调用 loadEvents，因为 useEffect 会监听 state.filterConditions 的变化自动触发
    },
    [updateFilterConditions],
  )

  // 处理排序变化
  const handleSortChange = useCallback(
    (sort: SortOptions) => {
      updateSortOptions(sort)
      // loadEvents会通过useEffect自动触发，因为依赖数组中包含了state.sortOptions
    },
    [updateSortOptions],
  )

  // 处理选择状态变更
  const handleSelectionChange = useCallback(
    (selectedIds: number[], isFullSelection: boolean) => {
      console.log('App: 处理选择状态变更', { selectedIds, isFullSelection })
      if (isFullSelection) {
        // 全选状态
        setSelectedEventIds([-1])
      } else {
        // 部分选择状态
        setSelectedEventIds(selectedIds)
      }
    },
    [setSelectedEventIds],
  )

  // 处理事件选择（toggle模式）
  const handleEventSelect = useCallback(
    (eventId: number) => {
      // 检查当前是否选中
      const isCurrentlySelected =
        isAllEventsSelected || eventsSelectedIds.includes(eventId)

      if (isAllEventsSelected) {
        if (isCurrentlySelected) {
          // 如果是全选状态且要取消选择某个事件，则退出全选状态，选中当前页面除了该事件的所有事件
          const currentPageEventIds = state.events
            .filter(event => event.id !== eventId)
            .map(event => event.id)
          setSelectedEventIds(currentPageEventIds)
        }
        // 如果是全选状态且要选择某个事件，保持全选状态（不需要操作）
      } else {
        // 正常的toggle逻辑
        setSelectedEventIds(prev =>
          isCurrentlySelected
            ? prev.filter(id => id !== eventId)
            : [...prev, eventId],
        )
      }
    },
    [isAllEventsSelected, eventsSelectedIds, state.events, setSelectedEventIds],
  )

  // 处理事件详情
  const handleEventDetail = useCallback((event: GitLabEvent) => {
    setSelectedEvent(event)
    setIsDetailModalVisible(true)
  }, [])

  const handleCloseEventDetail = useCallback(() => {
    setIsDetailModalVisible(false)
    setSelectedEvent(null)
  }, [])

  // 加载项目列表
  const loadProjects = useCallback(async () => {
    if (!isConfigValid()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }

    setLoading(true)
    setError(null)

    try {
      await gitlabService.init()

      const projects = await gitlabService.getProjects({
        membership: true,
        per_page: 100,
        starred: false,
        simple: true,
        order_by: 'last_activity_at',
        search: '',
      })

      setProjects(projects)
    } catch (error) {
      const errorMessage = errorUtils.formatErrorMessage(error)
      setError(errorMessage)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [gitlabService, isConfigValid, setProjects, setLoading, setError])

  // 处理应用模式切换
  const handleModeChange = useCallback(
    async (mode: AppMode) => {
      setAppMode(mode)

      if (mode === 'changelog') {
        // 切换到Changelog模式时，加载项目列表
        await loadProjects()
      } else {
        // 切换到Events模式时，重新加载事件
        if (isConfigValid()) {
          loadEvents()
        }
      }
    },
    [setAppMode, loadProjects, isConfigValid, loadEvents],
  )

  return (
    <div
      id="gitlab-weekly-report-app"
      className={`${styles.app} ${isUserscript ? styles.userscriptMode : styles.webMode}`}
    >
      {/* 主面板 */}
      <MainPanel
        appMode={state.appMode}
        events={state.events}
        totalCount={state.totalCount}
        loading={state.isLoading}
        filterConditions={state.filterConditions}
        sortOptions={state.sortOptions}
        paginationOptions={state.paginationOptions}
        selectedEventIds={selectedEventIds}
        onModeChange={handleModeChange}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onPaginationChange={handlePaginationChange}
        onEventSelect={handleEventSelect}
        onSelectAll={handleSelectAll}
        onSelectionChange={handleSelectionChange}
        onEventDetail={handleEventDetail}
        onOpenSettings={handleOpenSettings}
        onOpenAI={handleOpenAI}
        isAllEventsSelected={isAllEventsSelected}
        onChangelogStateChange={handleChangelogStateChange}
      />

      {/* 事件详情弹窗 */}
      <EventDetailModal
        event={selectedEvent}
        visible={isDetailModalVisible}
        onClose={handleCloseEventDetail}
      />

      {/* 设置面板 */}
      <SettingsPanel
        isOpen={state.activePanel === 'settings'}
        config={state.config}
        theme={state.theme}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
      />

      {/* AI面板 */}
      {state.activePanel === 'ai' && (
        <AIPanel
          visible={state.activePanel === 'ai'}
          config={state.aiGenerationConfig}
          taskType={
            state.appMode === 'changelog' ? 'changelog' : 'weekly-report'
          }
          onClose={handleCloseAI}
          onGenerate={handleGenerateReport}
          isLoading={state.isLoading}
          selectedEventsCount={displaySelectedCount}
          allEventsCount={
            state.appMode === 'events'
              ? state.totalCount
              : changelogState.totalCount
          }
          dateRange={getTimeRange()}
          onFetchAllEvents={handleFetchAllEvents}
          isAllSelected={isAllEventsSelected}
        />
      )}
    </div>
  )
}

export default App
