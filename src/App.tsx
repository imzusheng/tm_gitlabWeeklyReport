import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppStore } from '@/store'
import { useEventManagement } from '@/hooks/useEventManagement'
import { useEventSelection } from '@/hooks/useEventSelection'
import { useThemeManager } from '@/hooks/useThemeManager'
import { useBatchReportGeneration } from '@/hooks/useBatchReportGeneration'

import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'

import { AI_TASK_CONFIGS, DEFAULT_BATCH_WEEKS } from '@/constants'
import type { AIGenerationConfig, AITaskType, GitLabEvent } from '@/types'
import { createDeepSeekApiService } from '@/services/deepseek-api'
import styles from './App.module.less'

interface AppProps {}

const getDefaultPromptForTask = (
  taskType: AITaskType,
  defaultPrompt: string,
): string => {
  return taskType === 'weekly-report-batch'
    ? AI_TASK_CONFIGS['weekly-report-batch'].defaultPrompt
    : defaultPrompt
}

const buildSelectedEventsText = (events: GitLabEvent[]): string => {
  return events
    .map(event => {
      const projectName = event.project?.name || '未知项目'
      const targetTitle = event.target_title || event.title || '无标题'
      const actionName = event.action_name || '未知操作'
      const createdAt = new Date(event.created_at).toLocaleString('zh-CN')
      return `- [${projectName}] ${actionName}: ${targetTitle} (${createdAt})`
    })
    .join('\n')
}

/**
 * 主应用组件
 * 使用 Zustand 进行状态管理，将业务逻辑拆分到自定义 hooks 中
 */
const App: React.FC<AppProps> = () => {
  const {
    config,
    activePanel,
    isLoading,
    events,
    totalCount,
    filterConditions,
    sortOptions,
    paginationOptions,
    aiGenerationConfig,
    batchReportData,
    batchGenerationState,
    setActivePanel,
    updateConfig,
    setAIGenerationConfig,
    setReportData,
    setLoading,
    setError,
    validateConfig,
  } = useAppStore()

  // 自定义 hooks
  const { actualTheme } = useThemeManager()
  const {
    loadEvents,
    handleFilterChange,
    handleSortChange,
    handlePaginationChange,
  } = useEventManagement()
  const {
    selectedEvents,
    selectedEventIds,
    toggleEventSelection,
    selectAllEvents,
    clearSelection,
  } = useEventSelection()
  const { runFullBatch, rerunWeek, cancelGeneration } =
    useBatchReportGeneration()

  // 本地状态
  const [selectedEvent, setSelectedEvent] = useState<GitLabEvent | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [activeTaskType, setActiveTaskType] =
    useState<AITaskType>('weekly-report')

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

  const currentGenerationConfig = useMemo<AIGenerationConfig>(() => {
    const defaultPrompt = getDefaultPromptForTask(
      activeTaskType,
      config.defaultPrompt,
    )
    const defaultConfig: AIGenerationConfig = {
      taskType: activeTaskType,
      prompt: defaultPrompt,
      tokensUsed: 0,
      result: '',
      weeks:
        activeTaskType === 'weekly-report-batch'
          ? DEFAULT_BATCH_WEEKS
          : undefined,
      endOffsetWeeks: activeTaskType === 'weekly-report-batch' ? 0 : undefined,
    }

    if (!aiGenerationConfig || aiGenerationConfig.taskType !== activeTaskType) {
      return defaultConfig
    }

    return {
      ...defaultConfig,
      ...aiGenerationConfig,
      prompt: aiGenerationConfig.prompt || defaultPrompt,
      weeks:
        activeTaskType === 'weekly-report-batch'
          ? (aiGenerationConfig.weeks ?? DEFAULT_BATCH_WEEKS)
          : undefined,
      endOffsetWeeks:
        activeTaskType === 'weekly-report-batch'
          ? (aiGenerationConfig.endOffsetWeeks ?? 0)
          : undefined,
    }
  }, [activeTaskType, aiGenerationConfig, config.defaultPrompt])

  const openAIPanel = useCallback(
    (taskType: AITaskType) => {
      if (taskType === 'weekly-report-batch') {
        selectAllEvents()
      }
      setActiveTaskType(taskType)
      setActivePanel('ai')
    },
    [selectAllEvents, setActivePanel],
  )

  /**
   * 处理单周 AI 报告生成
   */
  const handleGenerateSingleReport = useCallback(
    async (prompt: string) => {
      if (!validateConfig()) {
        setError('请先完善 GitLab 和 DeepSeek 配置')
        return
      }

      if (selectedEvents.length === 0) {
        setError('请先选择要生成报告的事件')
        return
      }

      setLoading(true)
      setError(null)

      const pendingConfig: AIGenerationConfig = {
        taskType: 'weekly-report',
        prompt,
        tokensUsed: 0,
        result: '',
      }
      setAIGenerationConfig(pendingConfig)

      try {
        const deepseekService = createDeepSeekApiService(config.deepseekApiKey)
        const eventsText = buildSelectedEventsText(selectedEvents)

        const response = await deepseekService.generateWeeklyReport(
          eventsText,
          prompt,
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
        setAIGenerationConfig({
          ...pendingConfig,
          result: response.content,
          tokensUsed: response.tokensUsed || 0,
        })
        setActivePanel('ai')
      } catch (error) {
        console.error('AI 报告生成失败:', error)
        setError(error instanceof Error ? error.message : 'AI 报告生成失败')
      } finally {
        setLoading(false)
      }
    },
    [
      config.deepseekApiKey,
      config.model,
      config.tokenLimit,
      selectedEvents,
      setAIGenerationConfig,
      setActivePanel,
      setError,
      setLoading,
      setReportData,
      validateConfig,
    ],
  )

  const handleGenerateReport = useCallback(
    async (prompt: string, weeks?: number, endOffsetWeeks?: number) => {
      if (activeTaskType === 'weekly-report-batch') {
        await runFullBatch(prompt, weeks, endOffsetWeeks)
        return
      }

      await handleGenerateSingleReport(prompt)
    },
    [activeTaskType, handleGenerateSingleReport, runFullBatch],
  )

  const handleRerunWeek = useCallback(
    async (weekKey: string, prompt: string) => {
      await rerunWeek(weekKey, prompt)
    },
    [rerunWeek],
  )

  return (
    <div
      className={`${styles.app} ${styles[actualTheme]}`}
      data-theme={actualTheme}
    >
      <div className={styles.container}>
        {/* 主面板 - 始终渲染，确保 backdrop-filter 能看到背景 */}
        <MainPanel
          events={events}
          totalCount={totalCount}
          loading={isLoading}
          filterConditions={filterConditions}
          sortOptions={sortOptions}
          paginationOptions={paginationOptions}
          selectedEventIds={selectedEventIds}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onPaginationChange={handlePaginationChange}
          onEventSelect={toggleEventSelection}
          onSelectAllEvents={selectAllEvents}
          onClearSelection={clearSelection}
          onEventDetail={handleEventDetail}
          onOpenSettings={() => setActivePanel('settings')}
          onOpenAI={() => openAIPanel('weekly-report')}
          onOpenBatchAI={() => openAIPanel('weekly-report-batch')}
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
            config={currentGenerationConfig}
            taskType={activeTaskType}
            onClose={() => setActivePanel('main')}
            onGenerate={handleGenerateReport}
            onCancelGeneration={
              activeTaskType === 'weekly-report-batch'
                ? cancelGeneration
                : undefined
            }
            onRerunWeek={
              activeTaskType === 'weekly-report-batch'
                ? handleRerunWeek
                : undefined
            }
            isLoading={isLoading}
            selectedEventsCount={selectedEvents.length}
            batchData={batchReportData}
            batchGenerationState={batchGenerationState}
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
