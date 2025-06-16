import React, { useEffect, useMemo, useState } from 'react'
import { useAppState } from '@/hooks/useAppState'
import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'
import { GitLabEvent } from '@/types'
import { mockEvents, mockConfig } from '@/data/mockData'
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
    isConfigValid
  } = useAppState()

  // 事件详情状态
  const [selectedEvent, setSelectedEvent] = useState<GitLabEvent | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 计算实际主题
  const actualTheme = useMemo(() => {
    if (state.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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

  // 初始化模拟数据
  useEffect(() => {
    // 在开发模式下使用模拟数据
    setEvents(mockEvents, mockEvents.length)
    updateConfig(mockConfig)
  }, [])

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
          result: `# 工作周报

## 本周主要工作
1. 完成了重要功能的开发
2. 修复了若干bug
3. 优化了系统性能

## 遇到的问题
1. 某个技术难题需要进一步研究
2. 与其他团队的协作需要加强

## 下周计划
1. 继续完善新功能
2. 进行系统测试
3. 准备发布上线

本周总体进展顺利，按计划完成了大部分工作任务。`
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
    // TODO: 重新加载事件数据
  }

  // 处理筛选条件变化
  const handleFilterChange = (filters: any) => {
    updateFilterConditions(filters)
    // TODO: 重新加载事件数据
  }

  // 处理排序变化
  const handleSortChange = (sort: any) => {
    updateSortOptions(sort)
    // TODO: 重新加载事件数据
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
    <div className={`app ${isUserscript ? 'userscript-mode' : 'web-mode'} ${actualTheme}`}>
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