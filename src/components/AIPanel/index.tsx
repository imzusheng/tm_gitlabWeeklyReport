import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  AI_TASK_CONFIGS,
  DEFAULT_BATCH_WEEKS,
  MAX_BATCH_WEEKS,
} from '@/constants'
import type {
  AIGenerationConfig,
  AITaskType,
  BatchGenerationState,
  WeeklyReportBatchData,
  WeeklyReportBatchItem,
} from '@/types'
import {
  clampBatchEndOffset,
  clampBatchWeeks,
  formatRelativeWeekLabel,
} from '@/utils/weekly-report'
import Modal from '../Modal'
import styles from './index.module.less'

interface AIPanelProps {
  visible: boolean
  config: AIGenerationConfig | null
  taskType: AITaskType
  onClose: () => void
  onGenerate: (
    prompt: string,
    weeks?: number,
    endOffsetWeeks?: number,
  ) => void | Promise<void>
  onCancelGeneration?: () => void
  onRerunWeek?: (weekKey: string, prompt: string) => void | Promise<void>
  isLoading: boolean
  selectedEventsCount?: number
  batchData?: WeeklyReportBatchData | null
  batchGenerationState?: BatchGenerationState | null
}

const createIdleBatchState = (
  weeks: number,
  endOffsetWeeks: number,
): BatchGenerationState => ({
  status: 'idle',
  progress: 0,
  currentWeekKey: null,
  currentWeekLabel: null,
  processedWeeks: 0,
  totalWeeks: weeks,
  failedWeeks: 0,
  endOffsetWeeks,
  message: '等待批量生成',
})

const STATUS_LABELS: Record<WeeklyReportBatchItem['status'], string> = {
  pending: '等待中',
  running: '生成中',
  success: '已完成',
  failed: '失败',
  skipped: '已跳过',
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  taskType,
  onClose,
  onGenerate,
  onCancelGeneration,
  onRerunWeek,
  isLoading,
  selectedEventsCount = 0,
  batchData,
  batchGenerationState,
}) => {
  const taskConfig = useMemo(() => AI_TASK_CONFIGS[taskType], [taskType])

  const activeConfig = useMemo<AIGenerationConfig>(() => {
    const defaultPrompt =
      taskType === 'weekly-report-batch'
        ? taskConfig.defaultPrompt
        : config?.prompt || taskConfig.defaultPrompt

    const defaultConfig: AIGenerationConfig = {
      taskType,
      prompt: defaultPrompt,
      tokensUsed: 0,
      result: '',
      weeks:
        taskType === 'weekly-report-batch' ? DEFAULT_BATCH_WEEKS : undefined,
      endOffsetWeeks: taskType === 'weekly-report-batch' ? 0 : undefined,
    }

    if (!config || config.taskType !== taskType) {
      return defaultConfig
    }

    return {
      ...defaultConfig,
      ...config,
      prompt: config.prompt || defaultPrompt,
      weeks:
        taskType === 'weekly-report-batch'
          ? clampBatchWeeks(config.weeks ?? DEFAULT_BATCH_WEEKS)
          : undefined,
      endOffsetWeeks:
        taskType === 'weekly-report-batch'
          ? clampBatchEndOffset(
              config.endOffsetWeeks ?? 0,
              config.weeks ?? DEFAULT_BATCH_WEEKS,
            )
          : undefined,
    }
  }, [config, taskConfig.defaultPrompt, taskType])

  const [prompt, setPrompt] = useState(activeConfig.prompt)
  const [weeks, setWeeks] = useState(activeConfig.weeks ?? DEFAULT_BATCH_WEEKS)
  const [endOffsetWeeks, setEndOffsetWeeks] = useState(
    activeConfig.endOffsetWeeks ?? 0,
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [copyTarget, setCopyTarget] = useState<string | null>(null)

  useEffect(() => {
    setPrompt(activeConfig.prompt)
    if (taskType === 'weekly-report-batch') {
      setWeeks(clampBatchWeeks(activeConfig.weeks ?? DEFAULT_BATCH_WEEKS))
      setEndOffsetWeeks(activeConfig.endOffsetWeeks ?? 0)
    }
    setIsExpanded(false)
    setCopyTarget(null)
  }, [
    activeConfig.endOffsetWeeks,
    activeConfig.prompt,
    activeConfig.weeks,
    taskType,
  ])

  useEffect(() => {
    setEndOffsetWeeks(prev => clampBatchEndOffset(prev, weeks))
  }, [weeks])

  const safeEndOffsetWeeks = clampBatchEndOffset(endOffsetWeeks, weeks)
  const batchState =
    batchGenerationState ?? createIdleBatchState(weeks, safeEndOffsetWeeks)

  const currentResultText = useMemo(() => {
    if (taskType === 'weekly-report-batch') {
      return batchData?.combinedMarkdown || activeConfig.result || ''
    }
    return activeConfig.result || ''
  }, [activeConfig.result, batchData?.combinedMarkdown, taskType])

  const canGenerate = useMemo(() => {
    if (isLoading || !prompt.trim()) {
      return false
    }

    if (taskType === 'weekly-report-batch') {
      return clampBatchWeeks(weeks) > 0
    }

    return selectedEventsCount > 0
  }, [isLoading, prompt, selectedEventsCount, taskType, weeks])

  const handleGenerate = useCallback(() => {
    if (!canGenerate) {
      return
    }

    if (taskType === 'weekly-report-batch') {
      void onGenerate(prompt, clampBatchWeeks(weeks), safeEndOffsetWeeks)
      return
    }

    void onGenerate(prompt)
  }, [canGenerate, onGenerate, prompt, safeEndOffsetWeeks, taskType, weeks])

  const handleCopyText = useCallback(async (text: string, target: string) => {
    if (!text.trim()) {
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopyTarget(target)
      setTimeout(() => setCopyTarget(null), 2000)
    } catch (error) {
      console.error('Failed to copy result:', error)
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopyTarget(target)
        setTimeout(() => setCopyTarget(null), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }, [])

  const handleCopyCurrentResult = useCallback(() => {
    void handleCopyText(currentResultText, 'all')
  }, [currentResultText, handleCopyText])

  const handleCopyWeek = useCallback(
    (item: WeeklyReportBatchItem) => {
      void handleCopyText(item.report || item.summary, item.weekKey)
    },
    [handleCopyText],
  )

  const handleRerunWeek = useCallback(
    (item: WeeklyReportBatchItem) => {
      if (!onRerunWeek) {
        return
      }

      void onRerunWeek(item.weekKey, prompt)
    },
    [onRerunWeek, prompt],
  )

  const resetPrompt = useCallback(() => {
    setPrompt(activeConfig.prompt)
    if (taskType === 'weekly-report-batch') {
      setWeeks(clampBatchWeeks(activeConfig.weeks ?? DEFAULT_BATCH_WEEKS))
      setEndOffsetWeeks(activeConfig.endOffsetWeeks ?? 0)
    }
  }, [
    activeConfig.endOffsetWeeks,
    activeConfig.prompt,
    activeConfig.weeks,
    taskType,
  ])

  const batchItems = batchData?.items ?? []
  const hasBatchResult =
    taskType === 'weekly-report-batch' && batchItems.length > 0
  const displayResultText = currentResultText
  const resultTitle =
    taskType === 'weekly-report-batch' ? '批量结果' : '生成结果'
  const canCancel = Boolean(onCancelGeneration) && isLoading
  const canAppendExisting =
    taskType === 'weekly-report-batch' &&
    Boolean(
      batchData &&
        batchData.prompt.trim() === prompt.trim() &&
        batchData.weeks < clampBatchWeeks(weeks),
    )
  const batchGenerateLabel = isLoading
    ? '生成中...'
    : canAppendExisting
      ? '继续追加'
      : displayResultText
        ? taskConfig.regenerateButtonText
        : taskConfig.generateButtonText
  const batchEndOptions = useMemo(() => {
    const maxEndOffset = Math.max(0, MAX_BATCH_WEEKS - clampBatchWeeks(weeks))
    return Array.from({ length: maxEndOffset + 1 }, (_, offset) => ({
      value: offset,
      label: formatRelativeWeekLabel(offset),
    }))
  }, [weeks])

  const batchSuccessCount = batchItems.filter(
    item => item.status === 'success' || item.status === 'skipped',
  ).length
  const batchFailedCount = batchItems.filter(
    item => item.status === 'failed',
  ).length

  return (
    <Modal
      visible={visible}
      title={taskConfig.title}
      width={taskType === 'weekly-report-batch' ? 980 : 800}
      onClose={onClose}
      maskClosable={!isLoading}
    >
      <div className={styles.aiPanel}>
        <div className={styles.dataOverview}>
          <div className={styles.overviewHeader}>
            <h4>📊 数据概览</h4>
          </div>
          <div className={styles.overviewContent}>
            {taskType === 'weekly-report-batch' ? (
              <>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>批量周数：</span>
                  <span className={styles.overviewValue}>
                    {batchData?.weeks ?? clampBatchWeeks(weeks)} 周
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>截止周：</span>
                  <span className={styles.overviewValue}>
                    {formatRelativeWeekLabel(
                      batchData?.endOffsetWeeks ?? safeEndOffsetWeeks,
                    )}
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>事件数量：</span>
                  <span className={styles.overviewValue}>
                    {batchData?.totalEvents ?? 0} 条
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>有效事件：</span>
                  <span className={styles.overviewValue}>
                    {batchData?.meaningfulEvents ?? 0} 条
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>生成状态：</span>
                  <span
                    className={`${styles.overviewValue} ${
                      batchState.status === 'success'
                        ? styles.ready
                        : batchState.status === 'error' || batchFailedCount > 0
                          ? styles.error
                          : styles.waiting
                    }`}
                  >
                    {batchState.message}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>已选择事件：</span>
                  <span className={styles.overviewValue}>
                    {selectedEventsCount} 条
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>生成状态：</span>
                  <span
                    className={`${styles.overviewValue} ${
                      selectedEventsCount > 0 ? styles.ready : styles.waiting
                    }`}
                  >
                    {isLoading ? '🔄 生成中...' : '✅ 等待生成'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {taskType === 'weekly-report-batch' && (
          <div className={styles.batchProgressSection}>
            <div className={styles.batchProgressHeader}>
              <div className={styles.batchProgressTitle}>
                <span className={styles.progressIcon}>🧭</span>
                <span>批量进度</span>
              </div>
              <span className={styles.batchProgressText}>
                {batchState.processedWeeks}/{batchState.totalWeeks} 周
              </span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${batchState.progress}%` }}
              />
            </div>
            <div className={styles.batchProgressMeta}>
              <span>当前：{batchState.currentWeekLabel || '等待中'}</span>
              <span>失败：{batchState.failedWeeks} 周</span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingSpinner} />
            <p>{taskConfig.loadingText}</p>
            <div className={styles.loadingTips}>
              {taskType === 'weekly-report-batch' ? (
                <span>
                  💡 批量模式按周串行生成，周数越多耗时越长，可随时取消
                </span>
              ) : (
                <span>💡 生成时间通常为 10-30 秒</span>
              )}
            </div>
            {canCancel && (
              <button className={styles.cancelBtn} onClick={onCancelGeneration}>
                取消生成
              </button>
            )}
          </div>
        )}

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

          {taskType === 'weekly-report-batch' && (
            <>
              <div className={styles.batchControls}>
                <label className={styles.batchWeeksControl}>
                  <span className={styles.batchLabel}>批量周数</span>
                  <input
                    className={styles.batchWeeksInput}
                    type="number"
                    min={1}
                    max={MAX_BATCH_WEEKS}
                    value={weeks}
                    onChange={event => {
                      const nextValue = Number.parseInt(event.target.value, 10)
                      setWeeks(
                        clampBatchWeeks(nextValue || DEFAULT_BATCH_WEEKS),
                      )
                    }}
                    disabled={isLoading}
                  />
                </label>
                <label className={styles.batchEndControl}>
                  <span className={styles.batchLabel}>截止周</span>
                  <select
                    className={styles.batchEndSelect}
                    value={safeEndOffsetWeeks}
                    onChange={event => {
                      setEndOffsetWeeks(
                        clampBatchEndOffset(
                          Number.parseInt(event.target.value, 10),
                          weeks,
                        ),
                      )
                    }}
                    disabled={isLoading}
                  >
                    {batchEndOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <span className={styles.batchHint}>
                  建议 4-8 周，截止周默认本周，可切到上周继续向前
                </span>
              </div>
              {canAppendExisting && (
                <div className={styles.batchAppendHint}>
                  已有 {batchData?.weeks} 周结果，改成 {clampBatchWeeks(weeks)}{' '}
                  周后会自动补齐更早的周报，不会重算已完成内容。
                </div>
              )}
            </>
          )}

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
                className={`${styles.btnPrimary} ${displayResultText ? styles.regenerate : ''}`}
                onClick={handleGenerate}
                disabled={!canGenerate}
              >
                {batchGenerateLabel}
              </button>
            </div>
          </div>
        </div>

        {taskType === 'weekly-report-batch' && hasBatchResult && (
          <div className={styles.batchSection}>
            <div className={styles.batchSectionHeader}>
              <h3>周次明细</h3>
              <span>
                {batchSuccessCount} 成功 / {batchFailedCount} 失败
              </span>
            </div>

            <div className={styles.batchList}>
              {batchItems.map(item => {
                const isCurrent =
                  batchState.currentWeekKey === item.weekKey &&
                  batchState.status === 'loading'
                const isCopied = copyTarget === item.weekKey
                return (
                  <article
                    key={item.weekKey}
                    className={`${styles.batchItem} ${styles[item.status]} ${
                      isCurrent ? styles.current : ''
                    }`}
                  >
                    <div className={styles.batchItemHeader}>
                      <div className={styles.batchItemTitle}>
                        <span className={styles.batchWeekKey}>
                          {item.weekKey}
                        </span>
                        <span className={styles.batchRelativeLabel}>
                          {item.relativeLabel}
                        </span>
                      </div>
                      <span
                        className={`${styles.statusBadge} ${styles[item.status]}`}
                      >
                        {STATUS_LABELS[item.status]}
                      </span>
                    </div>

                    <div className={styles.batchStats}>
                      <span>原始 {item.stats.raw}</span>
                      <span>有效 {item.stats.meaningful}</span>
                      <span>Push {item.stats.pushed}</span>
                      <span>Merge {item.stats.merged}</span>
                      <span>评论 {item.stats.commented}</span>
                    </div>

                    <div className={styles.batchSummary}>
                      {item.error ? (
                        <span className={styles.batchError}>
                          生成失败：{item.error}
                        </span>
                      ) : (
                        <span>{item.summary || '无有效事件'}</span>
                      )}
                    </div>

                    <div className={styles.batchItemActions}>
                      <button
                        className={styles.batchActionBtn}
                        onClick={() => handleCopyWeek(item)}
                      >
                        {isCopied ? '已复制' : '复制本周'}
                      </button>
                      <button
                        className={`${styles.batchActionBtn} ${styles.primary}`}
                        onClick={() => handleRerunWeek(item)}
                        disabled={!onRerunWeek || isLoading}
                      >
                        重跑本周
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {displayResultText && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>
                <span className={styles.titleIcon}>✨</span>
                {resultTitle}
              </h3>
              <div className={styles.resultActions}>
                <button
                  className={`${styles.actionBtn} ${copyTarget === 'all' ? styles.copied : ''}`}
                  onClick={handleCopyCurrentResult}
                  title="一键复制"
                  disabled={copyTarget === 'all'}
                >
                  <span className={styles.btnIcon}>
                    {copyTarget === 'all' ? '✅' : '📋'}
                  </span>
                  {copyTarget === 'all' ? '已复制' : '复制全部'}
                </button>
              </div>
            </div>

            <div className={styles.resultContent}>
              <div className={styles.resultText}>{displayResultText}</div>
            </div>

            <div className={styles.resultMeta}>
              <div className={styles.metaLeft}>
                <div className={styles.metaItem}>
                  <span>{displayResultText.split('\n').length} 行</span>
                </div>
                <div className={styles.metaItem}>
                  <span>{displayResultText.length} 字符</span>
                </div>
                {taskType === 'weekly-report-batch' && batchData && (
                  <>
                    <div className={styles.metaItem}>
                      <span>{batchData.weeks} 周</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span>{batchData.totalTokensUsed} Token</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {!displayResultText && !isLoading && (
          <div className={styles.emptyResult}>
            <div className={styles.emptyIcon}>🤖</div>
            <h3>{taskConfig.emptyTitle}</h3>
            <p>{taskConfig.emptyDescription}</p>
            <div className={styles.emptyFeatures}>
              {taskType === 'weekly-report-batch' ? (
                <>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>📅</span>
                    <span>按 ISO 周批量生成</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🧩</span>
                    <span>空周也会正常输出</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🔁</span>
                    <span>支持单周重跑</span>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default React.memo(AIPanel)
