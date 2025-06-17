import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useAppState } from '@/hooks/useAppState'
import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'
import { GitLabEvent } from '@/types'
import { mockEvents } from '@/data/mockData'
import { createGitLabApiService } from '@/services/gitlab-api'
import './App.less'

interface AppProps {
  isUserscript?: boolean
}

const App: React.FC<AppProps> = ({ isUserscript = false }) => {
  const {
    state,
    updateConfig,
    setActivePanel,
    updateFilterConditions,
    updateSortOptions,
    updatePaginationOptions,
    setEvents,
    setAIGenerationConfig,
    setLoading,
    setError,
    toggleTheme,
    isConfigValid,
    getTimeRange,
  } = useAppState()

  // 事件详情状态
  const [selectedEvent, setSelectedEvent] = useState<GitLabEvent | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 数据版本控制，用于强制刷新
  const [dataVersion, setDataVersion] = useState(0)

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
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [state.theme])

  // 纯粹的数据加载函数 - 不依赖任何状态
  const loadEvents = useCallback(async () => {
    // 如果配置无效，使用模拟数据
    if (!isConfigValid()) {
      setEvents(mockEvents, mockEvents.length)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const gitlabService = createGitLabApiService(
        state.config.gitlabUrl,
        state.config.gitlabToken,
      )

      // 获取时间范围
      const { startDate, endDate } = getTimeRange()

      // 获取所有事件数据
      const allEvents = await gitlabService.getAllUserEvents(startDate, endDate)

      // 应用筛选条件
      let filteredEvents = allEvents
      if (state.filterConditions.targetType.length > 0) {
        filteredEvents = filteredEvents.filter(event =>
          state.filterConditions.targetType.includes(event.target_type as any),
        )
      }

      if (state.filterConditions.action.length > 0) {
        filteredEvents = filteredEvents.filter(event =>
          state.filterConditions.action.includes(event.action_name as any),
        )
      }

      // 应用排序
      filteredEvents.sort((a, b) => {
        const { field, order } = state.sortOptions
        let aValue: any
        let bValue: any

        switch (field) {
          case 'created_at':
            aValue = new Date(a.created_at).getTime()
            bValue = new Date(b.created_at).getTime()
            break
          case 'title':
            aValue = a.title || a.target_title || ''
            bValue = b.title || b.target_title || ''
            break
          case 'action_name':
            aValue = a.action_name
            bValue = b.action_name
            break
          case 'target_type':
            aValue = a.target_type
            bValue = b.target_type
            break
          default:
            aValue = new Date(a.created_at).getTime()
            bValue = new Date(b.created_at).getTime()
        }

        if (order === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      // 应用分页
      const { page, pageSize } = state.paginationOptions
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

      // 更新事件数据
      setEvents(paginatedEvents, filteredEvents.length)
    } catch (error) {
      console.error('加载事件数据失败:', error)

      if (error instanceof Error && error.message.includes('429')) {
        setError('请求过于频繁，请稍后再试')
      } else {
        setError('加载事件数据失败，请检查GitLab配置或网络连接')
      }

      // 发生错误时使用模拟数据
      setEvents(mockEvents, mockEvents.length)
    } finally {
      setLoading(false)
    }
  }, [
    // 只依赖必要的不可变引用
    isConfigValid,
    setEvents,
    setLoading,
    setError,
    getTimeRange,
    // 注意：这里不包含state的任何部分，避免循环依赖
  ])

  // 初始化数据
  useEffect(() => {
    setEvents(mockEvents, mockEvents.length)
    // 不要强制覆盖用户配置，让useAppState自己加载保存的配置
  }, [])

  // 配置变化时触发数据刷新
  useEffect(() => {
    if (state.config.gitlabUrl && state.config.gitlabToken) {
      setDataVersion(prev => prev + 1)
    }
  }, [state.config.gitlabUrl, state.config.gitlabToken])

  // 数据版本变化时重新加载
  useEffect(() => {
    if (dataVersion > 0) {
      loadEvents()
    }
  }, [dataVersion, loadEvents])

  // 处理设置面板的打开和关闭
  const handleOpenSettings = () => {
    setActivePanel('settings')
  }

  const handleCloseSettings = () => {
    setActivePanel('main')
  }

  const handleSaveSettings = (config: any) => {
    updateConfig(config)
  }

  // 处理AI面板的打开和关闭
  const handleOpenAI = () => {
    if (!isConfigValid()) {
      setError('请先完善GitLab和DeepSeek配置信息')
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
      setError('请先完善配置信息')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // TODO: 实现实际的GitLab API调用和DeepSeek AI生成
      // 这里先使用模拟数据
      setTimeout(() => {
        const mockResult = {
          prompt,
          tokensUsed: 1234,
          result: `你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;`,
        }

        setAIGenerationConfig(mockResult)
        setLoading(false)
      }, 2000)
    } catch (error) {
      setError('生成周报时发生错误，请重试')
      setLoading(false)
    }
  }

  // 处理重新生成
  const handleRegenerate = () => {
    if (state.aiGenerationConfig) {
      handleGenerateReport(state.aiGenerationConfig.prompt)
    }
  }

  // 处理分页变化
  const handlePageChange = (page: number) => {
    updatePaginationOptions({ page })
    setDataVersion(prev => prev + 1)
  }

  // 处理筛选条件变化
  const handleFilterChange = (filters: any) => {
    updateFilterConditions(filters)
    setDataVersion(prev => prev + 1)
  }

  // 处理排序变化
  const handleSortChange = (sort: any) => {
    updateSortOptions(sort)
    setDataVersion(prev => prev + 1)
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
      className={`app ${isUserscript ? 'userscript-mode' : 'web-mode'} ${actualTheme}`}
    >
      {/* 错误提示 */}
      {state.error && (
        <div className="error-toast">
          <span>{state.error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* 主面板 */}
      <MainPanel
        events={state.events}
        filterConditions={state.filterConditions}
        sortOptions={state.sortOptions}
        paginationOptions={state.paginationOptions}
        theme={state.theme}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onEventDetail={handleEventDetail}
        onOpenSettings={handleOpenSettings}
        onOpenAI={handleOpenAI}
        onToggleTheme={toggleTheme}
        isLoading={state.isLoading}
      />

      {/* 事件详情弹窗 */}
      <EventDetailModal
        event={selectedEvent}
        visible={isDetailModalVisible}
        onClose={handleCloseEventDetail}
      />

      {/* 设置面板 */}
      <SettingsPanel
        visible={state.activePanel === 'settings'}
        config={state.config}
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
        onRegenerate={handleRegenerate}
        isLoading={state.isLoading}
      />
    </div>
  )
}

export default App
