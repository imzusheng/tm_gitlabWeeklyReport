import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/store'
import { useEventManagement } from '@/hooks/useEventManagement'
import { useEventSelection } from '@/hooks/useEventSelection'
import { useThemeManager } from '@/hooks/useThemeManager'

import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'

import type { GitLabEvent, AIGenerationConfig } from '@/types'
import { createDeepSeekApiService } from '@/services/deepseek-api'
import styles from './App.module.less'

interface AppProps {}

/**
 * 主应用组件
 * 使用 Zustand 进行状态管理，将业务逻辑拆分到自定义 hooks 中
 */
const App: React.FC<AppProps> = () => {
  // 全局状态
  const {
    config,
    activePanel,
    isLoading,
    events,
    aiGenerationConfig,
    setActivePanel,
    updateConfig,
    setAIGenerationConfig,
    setReportData,
    setLoading,
    setError,
  } = useAppStore()

  // 自定义 hooks
  const { actualTheme } = useThemeManager()
  const {
    loadEvents,
    handleFilterChange,
    handleSortChange,
    handlePaginationChange,
  } = useEventManagement()
  const { selectedEvents, toggleEventSelection } = useEventSelection()

  // 本地状态
  const [selectedEvent, setSelectedEvent] = useState<GitLabEvent | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 初始化加载
  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  /**
   * 处理事件详情查看
   */
  const handleEventDetail = (event: GitLabEvent) => {
    setSelectedEvent(event)
    setIsDetailModalVisible(true)
  }

  /**
   * 处理 AI 报告生成
   */
  const handleGenerateReport = async (aiConfig: AIGenerationConfig) => {
    if (selectedEvents.length === 0) {
      setError('请先选择要生成报告的事件')
      return
    }

    setLoading(true)
    setError(null)
    setAIGenerationConfig(aiConfig)

    try {
      const deepseekService = createDeepSeekApiService(config.deepseekApiKey)

      const eventsText = selectedEvents
        .map(event => {
          const projectName = event.project?.name || '未知项目'
          const targetTitle = event.target_title || event.title || '无标题'
          const actionName = event.action_name || '未知操作'
          const createdAt = new Date(event.created_at).toLocaleString('zh-CN')
          return `- [${projectName}] ${actionName}: ${targetTitle} (${createdAt})`
        })
        .join('\n')

      const response = await deepseekService.generateWeeklyReport(
        eventsText,
        aiConfig.prompt,
        config.model || 'deepseek-chat',
        config.tokenLimit || 4000,
      )

      const reportData = {
        events: selectedEvents,
        generatedReport: response.content,
        tokensUsed: response.tokensUsed || 0,
        generatedAt: new Date().toISOString(),
      }

      setReportData(reportData)
      setActivePanel('ai')
    } catch (error) {
      console.error('AI 报告生成失败:', error)
      setError(error instanceof Error ? error.message : 'AI 报告生成失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`${styles.app} ${styles[actualTheme]}`}
      data-theme={actualTheme}
    >
      <div className={styles.container}>
        {/* 主面板 - 始终渲染，确保 backdrop-filter 能看到背景 */}
        <MainPanel
          events={events}
          totalCount={useAppStore.getState().totalCount}
          loading={isLoading}
          filterConditions={useAppStore.getState().filterConditions}
          sortOptions={useAppStore.getState().sortOptions}
          paginationOptions={useAppStore.getState().paginationOptions}
          selectedEventIds={selectedEvents.map(e => e.id)}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onPaginationChange={handlePaginationChange}
          onEventSelect={toggleEventSelection}
          onSelectionChange={() => {}}
          onEventDetail={handleEventDetail}
          onOpenSettings={() => setActivePanel('settings')}
          onOpenAI={() => setActivePanel('ai')}
        />

        {/* 设置面板 */}
        {activePanel === 'settings' && (
          <SettingsPanel
            isOpen={true}
            config={config}
            theme={useAppStore.getState().theme}
            onClose={() => setActivePanel('main')}
            onSave={(newConfig, newTheme) => {
              updateConfig(newConfig)
              useAppStore.getState().setTheme(newTheme)
            }}
          />
        )}

        {/* AI 面板 */}
        {activePanel === 'ai' && (
          <AIPanel
            visible={true}
            config={aiGenerationConfig}
            taskType="weekly-report"
            onClose={() => setActivePanel('main')}
            onGenerate={prompt => {
              if (aiGenerationConfig) {
                handleGenerateReport({ ...aiGenerationConfig, prompt })
              }
            }}
            isLoading={isLoading}
            selectedEventsCount={selectedEvents.length}
          />
        )}

        {/* 事件详情模态框 */}
        <EventDetailModal
          event={selectedEvent}
          visible={isDetailModalVisible}
          onClose={() => {
            setIsDetailModalVisible(false)
            setSelectedEvent(null)
          }}
        />
      </div>
    </div>
  )
}

export default App
