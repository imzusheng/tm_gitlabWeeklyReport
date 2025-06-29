import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'

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

  // 事件选择状态
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])

  // 计算实际主题
  const actualTheme = useMemo(() => {
    if (state.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return state.theme
  }, [state.theme])

  // 监听系统主题变化
  useEffect(() => {
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
  }, [state.theme])

  /**
   * 加载GitLab事件数据
   */
  const loadEvents = useCallback(
    async (filterConditions?: FilterConditions) => {
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
        const currentFilters = filterConditions || state.filterConditions
        const targetTypes =
          currentFilters.targetType?.length > 0
            ? currentFilters.targetType
            : undefined

        const actions =
          currentFilters.action?.length > 0 ? currentFilters.action : undefined

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
        // 默认选中所有事件
        setSelectedEventIds(events.map(event => event.id))
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
    },
    [
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
    ],
  )

  useEffect(() => {
    if (isConfigValid()) {
      loadEvents()
    }
  }, [isConfigValid, loadEvents])

  // useAbortableRequest Hook 已经处理了组件卸载时的请求取消

  // 处理设置面板的打开和关闭
  const handleOpenSettings = () => {
    setActivePanel('settings')
  }

  const handleCloseSettings = () => {
    setActivePanel('main')
  }

  const handleSaveSettings = (
    config: AppConfig,
    theme: 'light' | 'dark' | 'system',
  ) => {
    // 更新配置
    updateConfig(config)
    // 更新主题
    setTheme(theme)
  }

  // 处理AI面板的打开和关闭
  const handleOpenAI = () => {
    if (!isConfigValid()) {
      setError(configErrors.INCOMPLETE_GITLAB_DEEPSEEK)
      return
    }
    setActivePanel('ai')
  }

  const handleCloseAI = () => {
    setActivePanel('main')
  }

  // 处理AI周报生成
  const handleGenerateReport = async (prompt: string) => {
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
      // 使用已选中的事件数据
      const selectedEvents = state.events.filter(event =>
        selectedEventIds.includes(event.id),
      )

      // 格式化事件数据为字符串
      const eventsData = selectedEvents
        .map((event: GitLabEvent) => {
          const date = new Date(event.created_at).toLocaleDateString('zh-CN')
          return `${date} - ${event.action_name}: ${event.target_title || event.push_data?.commit_title || '无标题'}`
        })
        .join('\n')

      // 使用DeepSeek API生成周报
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
  }

  // 处理分页变化
  const handlePaginationChange = (paginationOptions: PaginationOptions) => {
    updatePaginationOptions(paginationOptions)
  }

  // 处理筛选条件变化
  const handleFilterChange = (filters: FilterConditions) => {
    updateFilterConditions(filters)
    // 立即使用新的筛选条件加载事件
    loadEvents(filters)
  }

  // 处理排序变化
  const handleSortChange = (sort: SortOptions) => {
    updateSortOptions(sort)
    // loadEvents会通过useEffect自动触发，因为依赖数组中包含了state.sortOptions
  }

  // 处理事件选择
  const handleEventSelect = (eventId: number, selected: boolean) => {
    setSelectedEventIds(prev =>
      selected ? [...prev, eventId] : prev.filter(id => id !== eventId),
    )
  }

  // 处理全选/取消全选
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      // 选中当前页面的所有事件
      setSelectedEventIds(state.events.map(event => event.id))
    } else {
      // 取消选中所有事件
      setSelectedEventIds([])
    }
  }

  // 处理事件详情
  const handleEventDetail = (event: GitLabEvent) => {
    setSelectedEvent(event)
    setIsDetailModalVisible(true)
  }

  const handleCloseEventDetail = () => {
    setIsDetailModalVisible(false)
    setSelectedEvent(null)
  }

  return (
    <div
      id="gitlab-weekly-report-app"
      className={`${styles.app} ${isUserscript ? styles.userscriptMode : styles.webMode} ${styles[actualTheme]}`}
    >
      {/* 主面板 */}
      <MainPanel
        events={state.events}
        totalCount={state.totalCount}
        loading={state.isLoading}
        filterConditions={state.filterConditions}
        sortOptions={state.sortOptions}
        paginationOptions={state.paginationOptions}
        selectedEventIds={selectedEventIds}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onPaginationChange={handlePaginationChange}
        onEventSelect={handleEventSelect}
        onSelectAll={handleSelectAll}
        onEventDetail={handleEventDetail}
        onOpenSettings={handleOpenSettings}
        onOpenAI={handleOpenAI}
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
      <AIPanel
        visible={state.activePanel === 'ai'}
        config={state.aiGenerationConfig}
        defaultPrompt={state.config.defaultPrompt}
        onClose={handleCloseAI}
        onGenerate={handleGenerateReport}
        isLoading={state.isLoading}
        selectedEventsCount={selectedEventIds.length}
        dateRange={getTimeRange()}
      />
    </div>
  )
}

export default App
