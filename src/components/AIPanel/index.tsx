import React, { useState, useEffect, useMemo, useCallback } from 'react'
import type { AIGenerationConfig, AITaskType, GitLabEvent } from '@/types'
import { AI_TASK_CONFIGS } from '@/constants'
import Modal from '../Modal'
import styles from './index.module.less'

interface AIPanelProps {
  visible: boolean
  config: AIGenerationConfig | null
  taskType: AITaskType
  onClose: () => void
  onGenerate: (prompt: string) => void
  isLoading: boolean
  selectedEventsCount?: number
  allEventsCount?: number // 总事件数量
  dateRange?: {
    startDate: string
    endDate: string
  }
  // 获取全量数据的功能
  onFetchAllEvents?: () => Promise<GitLabEvent[]>
  isAllSelected?: boolean // 是否选择了全选
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  taskType,
  onClose,
  onGenerate,
  isLoading,
  selectedEventsCount = 0,
  allEventsCount = 0,
  dateRange,
  onFetchAllEvents,
  isAllSelected = false,
}) => {
  // 根据任务类型获取配置
  const taskConfig = useMemo(() => AI_TASK_CONFIGS[taskType], [taskType])

  const [prompt, setPrompt] = useState(taskConfig.defaultPrompt)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // 数据获取状态
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [fetchProgress, setFetchProgress] = useState(0)
  const [allEvents, setAllEvents] = useState<GitLabEvent[] | null>(null)
  const [hasTriedFetch, setHasTriedFetch] = useState(false)
  const [fetchStatus, setFetchStatus] = useState<string>('') // 添加状态文本

  // 当taskType或默认prompt更新时，同步更新prompt状态
  useEffect(() => {
    setPrompt(taskConfig.defaultPrompt)
  }, [taskConfig.defaultPrompt])

  // 获取全量数据
  const fetchAllEventsData = useCallback(async () => {
    if (!onFetchAllEvents || isFetchingData) return

    setIsFetchingData(true)
    setFetchProgress(0)
    setFetchStatus('正在初始化数据获取...')
    setHasTriedFetch(true)

    try {
      // 创建一个模拟的进度更新，当实际获取数据时会被覆盖
      let progressTimeout: NodeJS.Timeout
      const updateProgress = () => {
        setFetchProgress(prev => {
          if (prev >= 85) {
            clearTimeout(progressTimeout)
            return prev
          }
          const newProgress = prev + Math.random() * 8
          // 根据进度更新状态文本
          if (newProgress < 30) {
            setFetchStatus('正在连接GitLab API...')
          } else if (newProgress < 60) {
            setFetchStatus('正在分批获取事件数据...')
          } else {
            setFetchStatus('正在处理数据...')
          }
          return newProgress
        })
        progressTimeout = setTimeout(updateProgress, 400)
      }
      updateProgress()

      const events = await onFetchAllEvents()

      clearTimeout(progressTimeout!)
      setFetchProgress(100)
      setFetchStatus(`数据获取完成！共获取 ${events.length} 条事件`)
      setAllEvents(events)

      // 延迟一下让用户看到100%的进度
      setTimeout(() => {
        setIsFetchingData(false)
        setFetchStatus('')
      }, 1000)
    } catch (error) {
      console.error('Failed to fetch all events:', error)
      setIsFetchingData(false)
      setFetchProgress(0)
      setFetchStatus('数据获取失败，请稍后重试')
      setTimeout(() => setFetchStatus(''), 3000)
    }
  }, [onFetchAllEvents, isFetchingData])

  // 当面板打开且需要获取全量数据时，自动获取
  useEffect(() => {
    if (visible && isAllSelected && !hasTriedFetch && onFetchAllEvents) {
      fetchAllEventsData()
    }
  }, [
    visible,
    isAllSelected,
    hasTriedFetch,
    onFetchAllEvents,
    fetchAllEventsData,
  ])

  // 检查是否可以生成
  const canGenerate = useMemo(() => {
    if (isLoading || !prompt.trim()) return false
    if (isAllSelected && selectedEventsCount !== allEventsCount) {
      return !isFetchingData && allEvents !== null
    }
    return selectedEventsCount > 0
  }, [
    isLoading,
    prompt,
    isAllSelected,
    selectedEventsCount,
    allEventsCount,
    isFetchingData,
    allEvents,
  ])

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(prompt)
    }
  }

  // 复制结果到剪贴板
  const handleCopy = useCallback(async () => {
    if (!config?.result) return

    try {
      await navigator.clipboard.writeText(config.result)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy result:', error)
      // 回退方案：使用传统的复制方法
      const textArea = document.createElement('textarea')
      textArea.value = config.result
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (e) {
        console.error('Fallback copy also failed:', e)
      }
      document.body.removeChild(textArea)
    }
  }, [config?.result])

  // 重置提示词
  const resetPrompt = useCallback(() => {
    setPrompt(taskConfig.defaultPrompt)
  }, [taskConfig.defaultPrompt])

  return (
    <Modal
      visible={visible}
      title={taskConfig.title}
      width={800}
      onClose={onClose}
      maskClosable={!isLoading}
    >
      <div className={styles.aiPanel}>
        {/* 数据概览信息 */}
        <div className={styles.dataOverview}>
          <div className={styles.overviewHeader}>
            <h4>📊 数据概览</h4>
          </div>
          <div className={styles.overviewContent}>
            <div className={styles.overviewItem}>
              <span className={styles.overviewLabel}>已选择事件：</span>
              <span className={styles.overviewValue}>
                {isAllSelected && allEvents
                  ? allEvents.length
                  : selectedEventsCount}{' '}
                条
              </span>
            </div>
            {dateRange && (
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>时间范围：</span>
                <span className={styles.overviewValue}>
                  {dateRange.startDate} 至 {dateRange.endDate}
                </span>
              </div>
            )}
            <div className={styles.overviewItem}>
              <span className={styles.overviewLabel}>状态：</span>
              <span
                className={`${styles.overviewValue} ${selectedEventsCount > 0 ? styles.ready : styles.waiting}`}
              >
                {isFetchingData
                  ? '🔄 获取数据中...'
                  : allEvents
                    ? '✅ 数据已就绪'
                    : selectedEventsCount > 0
                      ? '✅ 数据就绪'
                      : '⏳ 等待选择事件'}
              </span>
            </div>
          </div>
        </div>

        {/* 数据获取进度 */}
        {isFetchingData && (
          <div className={styles.fetchProgress}>
            <div className={styles.progressHeader}>
              <span>{fetchStatus}</span>
              <span>{Math.round(fetchProgress)}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${fetchProgress}%` }}
              />
            </div>
            <p className={styles.progressTip}>
              正在分批获取事件数据（每批最多100条），请稍候...
            </p>
          </div>
        )}

        {/* 提示词编辑区域 */}
        <div className={styles.promptSection}>
          <div className={styles.sectionHeader}>
            <h3>提示词</h3>
            <div className={styles.headerActions}>
              <button
                className={styles.btnText}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? '收起' : '展开'}
              </button>
              <button className={styles.btnText} onClick={resetPrompt}>
                重置
              </button>
            </div>
          </div>

          <div
            className={`${styles.promptEditor} ${isExpanded ? styles.expanded : ''}`}
          >
            <textarea
              className={styles.promptTextarea}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={taskConfig.placeholder}
              rows={isExpanded ? 15 : 6}
              disabled={isLoading}
            />
            <div className={styles.promptFooter}>
              <span className={styles.charCount}>{prompt.length} 字符</span>
              <button
                className={`${styles.btnPrimary} ${config?.result ? styles.regenerate : ''}`}
                onClick={handleGenerate}
                disabled={!canGenerate}
              >
                {isLoading
                  ? '生成中...'
                  : config?.result
                    ? taskConfig.regenerateButtonText
                    : taskConfig.generateButtonText}
              </button>
            </div>
          </div>
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingSpinner}></div>
            <p>{taskConfig.loadingText}</p>
            <div className={styles.loadingTips}>
              <span>💡 生成时间通常为 10-30 秒</span>
            </div>
          </div>
        )}

        {/* 生成结果区域 */}
        {config?.result && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>
                <span className={styles.titleIcon}>✨</span>
                生成结果
              </h3>
              <div className={styles.resultActions}>
                <button
                  className={`${styles.actionBtn} ${isCopied ? styles.copied : ''}`}
                  onClick={handleCopy}
                  title="一键复制"
                  disabled={isCopied}
                >
                  <span className={styles.btnIcon}>
                    {isCopied ? '✅' : '📋'}
                  </span>
                  {isCopied ? '已复制' : '复制'}
                </button>
              </div>
            </div>

            <div className={styles.resultContent}>
              <div className={styles.resultText}>{config.result}</div>
            </div>

            <div className={styles.resultMeta}>
              <div className={styles.metaLeft}>
                <div className={styles.metaItem}>
                  <span>{config.result.split('\n').length} 行</span>
                </div>
                <div className={styles.metaItem}>
                  <span>{config.result.length} 字符</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.emptyResult}>
          <div className={styles.emptyIcon}>🤖</div>
          <h3>{taskConfig.emptyTitle}</h3>
          <p>{taskConfig.emptyDescription}</p>
          <div className={styles.emptyFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📊</span>
              <span>智能分析工作数据</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📝</span>
              <span>自动生成专业内容</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🎯</span>
              <span>突出重点信息</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default React.memo(AIPanel)
