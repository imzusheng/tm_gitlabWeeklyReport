import { useCallback, useEffect } from 'react'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'
import { useAppStore } from '@/store'
import { createDeepSeekApiService } from '@/services/deepseek-api'
import { createGitLabApiService } from '@/services/gitlab-api'
import type {
  GitLabEvent,
  NormalizedGitLabEvent,
  WeeklyReportBatchData,
  WeeklyReportBatchItem,
  WeeklyReportStats,
  WeeklyReportWeekWindow,
} from '@/types'
import { DEFAULT_BATCH_WEEKS } from '@/constants'
import {
  buildBatchReportData,
  buildBatchDataWithReuse,
  buildFallbackWeeklySummary,
  buildWeekWindows,
  formatDateOnly,
  buildWeeklyPromptText,
  buildWeeklyReportMarkdown,
  buildWeeklyStats,
  clampBatchEndOffset,
  clampBatchWeeks,
  createEmptyBatchGenerationState,
  groupEventsByWeek,
} from '@/utils/weekly-report'

interface WeekItemInput {
  window: WeeklyReportWeekWindow
  rawEvents: GitLabEvent[]
  normalizedEvents: NormalizedGitLabEvent[]
  prompt: string
  model: string
  tokenLimit: number
  signal: AbortSignal
  deepseekService: ReturnType<typeof createDeepSeekApiService>
}

const calculateBatchTotals = (items: WeeklyReportBatchItem[]) => {
  return items.reduce(
    (acc, item) => {
      acc.totalEvents += item.rawEvents.length
      acc.totalTokensUsed += item.tokensUsed
      acc.meaningfulEvents += item.stats.meaningful
      if (item.status === 'failed') {
        acc.failedWeeks += 1
      }
      return acc
    },
    {
      totalEvents: 0,
      totalTokensUsed: 0,
      meaningfulEvents: 0,
      failedWeeks: 0,
    },
  )
}

const finalizeBatchData = (
  data: WeeklyReportBatchData,
): WeeklyReportBatchData => {
  const totals = calculateBatchTotals(data.items)
  return buildBatchReportData({
    ...data,
    totalEvents: totals.totalEvents,
    totalTokensUsed: totals.totalTokensUsed,
    meaningfulEvents: totals.meaningfulEvents,
  })
}

const replaceBatchItem = (
  data: WeeklyReportBatchData,
  index: number,
  item: WeeklyReportBatchItem,
): WeeklyReportBatchData => {
  const nextItems = [...data.items]
  nextItems[index] = item
  return finalizeBatchData({
    ...data,
    items: nextItems,
  })
}

const createRunningItem = (
  window: WeeklyReportWeekWindow,
  rawEvents: GitLabEvent[],
  normalizedEvents: NormalizedGitLabEvent[],
  stats: WeeklyReportStats,
): WeeklyReportBatchItem => {
  return {
    weekKey: window.weekKey,
    weeksAgo: window.weeksAgo,
    relativeLabel: window.relativeLabel,
    startDate: window.startDate,
    endDate: window.endDate,
    rawEvents,
    normalizedEvents,
    stats,
    summary: '正在生成周报...',
    report: '',
    tokensUsed: 0,
    status: 'running',
    generatedAt: new Date().toISOString(),
  }
}

const generateWeekItem = async (
  input: WeekItemInput,
): Promise<WeeklyReportBatchItem> => {
  const {
    window,
    rawEvents,
    normalizedEvents,
    prompt,
    model,
    tokenLimit,
    signal,
    deepseekService,
  } = input
  const stats = buildWeeklyStats(rawEvents)

  if (stats.meaningful === 0) {
    const summary = buildFallbackWeeklySummary(normalizedEvents, stats)
    return {
      weekKey: window.weekKey,
      weeksAgo: window.weeksAgo,
      relativeLabel: window.relativeLabel,
      startDate: window.startDate,
      endDate: window.endDate,
      rawEvents,
      normalizedEvents,
      stats,
      summary,
      report: buildWeeklyReportMarkdown({
        window,
        stats,
        events: normalizedEvents,
        summary,
        tokensUsed: 0,
      }),
      tokensUsed: 0,
      status: 'skipped',
      generatedAt: new Date().toISOString(),
    }
  }

  try {
    const weeklyPromptText = buildWeeklyPromptText(
      window,
      normalizedEvents,
      stats,
    )
    const response = await deepseekService.generateWeeklyReport(
      weeklyPromptText,
      prompt,
      model,
      tokenLimit,
      signal,
    )

    const summary =
      response.content.trim() ||
      buildFallbackWeeklySummary(normalizedEvents, stats)

    return {
      weekKey: window.weekKey,
      weeksAgo: window.weeksAgo,
      relativeLabel: window.relativeLabel,
      startDate: window.startDate,
      endDate: window.endDate,
      rawEvents,
      normalizedEvents,
      stats,
      summary,
      report: buildWeeklyReportMarkdown({
        window,
        stats,
        events: normalizedEvents,
        summary,
        tokensUsed: response.tokensUsed || 0,
      }),
      tokensUsed: response.tokensUsed || 0,
      status: 'success',
      generatedAt: new Date().toISOString(),
    }
  } catch (error) {
    if (
      signal.aborted ||
      (error instanceof Error && error.name === 'AbortError')
    ) {
      throw error
    }

    const errorMessage = error instanceof Error ? error.message : '周报生成失败'
    const summary = buildFallbackWeeklySummary(normalizedEvents, stats)

    return {
      weekKey: window.weekKey,
      weeksAgo: window.weeksAgo,
      relativeLabel: window.relativeLabel,
      startDate: window.startDate,
      endDate: window.endDate,
      rawEvents,
      normalizedEvents,
      stats,
      summary,
      report: buildWeeklyReportMarkdown({
        window,
        stats,
        events: normalizedEvents,
        summary,
        tokensUsed: 0,
        error: errorMessage,
      }),
      tokensUsed: 0,
      status: 'failed',
      error: errorMessage,
      generatedAt: new Date().toISOString(),
    }
  }
}

/**
 * 批量周报生成 Hook
 */
export const useBatchReportGeneration = () => {
  const setLoading = useAppStore(state => state.setLoading)
  const setError = useAppStore(state => state.setError)
  const setAIGenerationConfig = useAppStore(
    state => state.setAIGenerationConfig,
  )
  const setBatchReportData = useAppStore(state => state.setBatchReportData)
  const setBatchGenerationState = useAppStore(
    state => state.setBatchGenerationState,
  )

  const { createRequest, cancelRequest, cleanupRequest, isAbortError } =
    useAbortableRequest()

  const syncProgressState = useCallback(
    (params: {
      status?:
        | 'idle'
        | 'loading'
        | 'partial'
        | 'success'
        | 'error'
        | 'cancelled'
      progress: number
      currentWeekKey: string | null
      currentWeekLabel: string | null
      processedWeeks: number
      totalWeeks: number
      failedWeeks: number
      endOffsetWeeks: number
      message: string
    }) => {
      setBatchGenerationState(params)
    },
    [setBatchGenerationState],
  )

  const updateFinalState = useCallback(
    (data: WeeklyReportBatchData) => {
      const failedWeeks = data.items.filter(
        item => item.status === 'failed',
      ).length
      const completedWeeks = data.items.filter(
        item => item.status === 'success' || item.status === 'skipped',
      ).length
      const status =
        failedWeeks === 0
          ? 'success'
          : completedWeeks === 0
            ? 'error'
            : 'partial'

      syncProgressState({
        status,
        progress: 100,
        currentWeekKey: null,
        currentWeekLabel: null,
        processedWeeks: data.items.length,
        totalWeeks: data.items.length,
        failedWeeks,
        endOffsetWeeks: data.endOffsetWeeks,
        message:
          status === 'success'
            ? '批量周报生成完成'
            : status === 'partial'
              ? '批量周报已生成，但部分周报失败'
              : '批量周报生成失败',
      })
    },
    [syncProgressState],
  )

  const runFullBatch = useCallback(
    async (prompt: string, weeks?: number, endOffsetWeeks = 0) => {
      const { config, validateConfig } = useAppStore.getState()

      if (!validateConfig()) {
        setError('请先完善 GitLab 和 DeepSeek 配置')
        return
      }

      const safeWeeks = clampBatchWeeks(weeks ?? DEFAULT_BATCH_WEEKS)
      const safeEndOffsetWeeks = clampBatchEndOffset(endOffsetWeeks, safeWeeks)
      const controller = createRequest()
      const model = config.model || 'deepseek-chat'
      const tokenLimit = config.tokenLimit || 4000
      const anchorDate = new Date()
      const existingBatchData = useAppStore.getState().batchReportData

      setLoading(true)
      setError(null)
      setAIGenerationConfig({
        taskType: 'weekly-report-batch',
        prompt,
        tokensUsed: 0,
        result: '',
        weeks: safeWeeks,
        endOffsetWeeks: safeEndOffsetWeeks,
      })
      setBatchGenerationState(
        createEmptyBatchGenerationState(safeWeeks, safeEndOffsetWeeks),
      )
      let batchData = buildBatchDataWithReuse({
        weeks: safeWeeks,
        prompt,
        anchorDate,
        endOffsetWeeks: safeEndOffsetWeeks,
        existingData: existingBatchData,
      })
      let processedWeeks = batchData.items.filter(
        item => item.status !== 'pending' && item.status !== 'running',
      ).length
      let failedWeeks = batchData.items.filter(
        item => item.status === 'failed',
      ).length

      setBatchReportData(batchData)
      syncProgressState({
        status: 'loading',
        progress:
          safeWeeks > 0 ? Math.round((processedWeeks / safeWeeks) * 100) : 0,
        currentWeekKey: null,
        currentWeekLabel: null,
        processedWeeks,
        totalWeeks: safeWeeks,
        failedWeeks,
        endOffsetWeeks: safeEndOffsetWeeks,
        message:
          processedWeeks > 0
            ? `已复用 ${processedWeeks} 周结果，正在补齐剩余周报...`
            : `正在拉取最近 ${safeWeeks} 周事件...`,
      })

      try {
        if (processedWeeks >= safeWeeks) {
          const finalBatchData = finalizeBatchData({
            ...batchData,
            generatedAt: anchorDate.toISOString(),
          })
          setBatchReportData(finalBatchData)
          setAIGenerationConfig({
            taskType: 'weekly-report-batch',
            prompt,
            tokensUsed: finalBatchData.totalTokensUsed,
            result: finalBatchData.combinedMarkdown,
            weeks: safeWeeks,
            endOffsetWeeks: safeEndOffsetWeeks,
          })
          updateFinalState(finalBatchData)
          return
        }

        const gitlabService = createGitLabApiService(
          config.gitlabUrl,
          config.gitlabToken,
        )
        const deepseekService = createDeepSeekApiService(config.deepseekApiKey)

        const windows = buildWeekWindows(
          safeWeeks,
          anchorDate,
          safeEndOffsetWeeks,
        )
        const events = await gitlabService.getCurrentUserEventsInRange({
          startDate: windows[0]?.startDate || anchorDate.toISOString(),
          endDate:
            windows[windows.length - 1]?.endDate || anchorDate.toISOString(),
          signal: controller.signal,
        })

        if (controller.signal.aborted) {
          return
        }

        const groupedWeeks = groupEventsByWeek(
          events,
          safeWeeks,
          anchorDate,
          safeEndOffsetWeeks,
        )

        syncProgressState({
          status: 'loading',
          progress: Math.round((processedWeeks / groupedWeeks.length) * 100),
          currentWeekKey: null,
          currentWeekLabel: null,
          processedWeeks,
          totalWeeks: groupedWeeks.length,
          failedWeeks,
          endOffsetWeeks: safeEndOffsetWeeks,
          message: `已获取 ${events.length} 条事件，开始逐周生成`,
        })

        for (let index = 0; index < groupedWeeks.length; index += 1) {
          if (controller.signal.aborted) {
            break
          }

          const currentItem = batchData.items[index]
          if (currentItem && currentItem.status !== 'pending') {
            continue
          }

          const group = groupedWeeks[index]
          const stats = buildWeeklyStats(group.rawEvents)
          const runningItem = createRunningItem(
            group.window,
            group.rawEvents,
            group.normalizedEvents,
            stats,
          )

          batchData = replaceBatchItem(batchData, index, runningItem)
          setBatchReportData(batchData)
          syncProgressState({
            status: processedWeeks > 0 ? 'partial' : 'loading',
            progress: Math.round((processedWeeks / groupedWeeks.length) * 100),
            currentWeekKey: group.window.weekKey,
            currentWeekLabel: group.window.relativeLabel,
            processedWeeks,
            totalWeeks: groupedWeeks.length,
            failedWeeks,
            endOffsetWeeks: safeEndOffsetWeeks,
            message: `正在生成 ${group.window.weekKey}（${group.window.relativeLabel}）`,
          })

          const finishedItem = await generateWeekItem({
            window: group.window,
            rawEvents: group.rawEvents,
            normalizedEvents: group.normalizedEvents,
            prompt,
            model,
            tokenLimit,
            signal: controller.signal,
            deepseekService,
          })

          if (controller.signal.aborted) {
            break
          }

          batchData = replaceBatchItem(batchData, index, finishedItem)
          processedWeeks += 1
          if (finishedItem.status === 'failed') {
            failedWeeks += 1
          }

          setBatchReportData(batchData)
          syncProgressState({
            status: 'loading',
            progress: Math.round((processedWeeks / groupedWeeks.length) * 100),
            currentWeekKey: null,
            currentWeekLabel: null,
            processedWeeks,
            totalWeeks: groupedWeeks.length,
            failedWeeks,
            endOffsetWeeks: safeEndOffsetWeeks,
            message: `已完成 ${processedWeeks}/${groupedWeeks.length} 周`,
          })
        }

        if (controller.signal.aborted) {
          if (processedWeeks === 0) {
            setBatchReportData(null)
          }
          syncProgressState({
            status: 'cancelled',
            progress: Math.round((processedWeeks / groupedWeeks.length) * 100),
            currentWeekKey: null,
            currentWeekLabel: null,
            processedWeeks,
            totalWeeks: groupedWeeks.length,
            failedWeeks,
            endOffsetWeeks: safeEndOffsetWeeks,
            message: '批量周报生成已取消',
          })
          return
        }

        batchData = finalizeBatchData({
          ...batchData,
          totalEvents: events.length,
          generatedAt: anchorDate.toISOString(),
        })
        setBatchReportData(batchData)
        setAIGenerationConfig({
          taskType: 'weekly-report-batch',
          prompt,
          tokensUsed: batchData.totalTokensUsed,
          result: batchData.combinedMarkdown,
          weeks: safeWeeks,
          endOffsetWeeks: safeEndOffsetWeeks,
        })
        updateFinalState(batchData)
      } catch (error) {
        if (controller.signal.aborted || isAbortError(error)) {
          if (processedWeeks === 0) {
            setBatchReportData(null)
          }
          syncProgressState({
            status: 'cancelled',
            progress: 0,
            currentWeekKey: null,
            currentWeekLabel: null,
            processedWeeks: 0,
            totalWeeks: safeWeeks,
            failedWeeks: 0,
            endOffsetWeeks: safeEndOffsetWeeks,
            message: '批量周报生成已取消',
          })
          return
        }

        const errorMessage =
          error instanceof Error ? error.message : '批量周报生成失败'
        setError(errorMessage)
        syncProgressState({
          status: 'error',
          progress: 0,
          currentWeekKey: null,
          currentWeekLabel: null,
          processedWeeks: 0,
          totalWeeks: safeWeeks,
          failedWeeks: safeWeeks,
          endOffsetWeeks: safeEndOffsetWeeks,
          message: errorMessage,
        })
      } finally {
        setLoading(false)
        cleanupRequest(controller)
      }
    },
    [
      cleanupRequest,
      createRequest,
      isAbortError,
      setAIGenerationConfig,
      setBatchGenerationState,
      setBatchReportData,
      setError,
      setLoading,
      syncProgressState,
      updateFinalState,
    ],
  )

  const rerunWeek = useCallback(
    async (weekKey: string, prompt: string) => {
      const { config, batchReportData, validateConfig } = useAppStore.getState()

      if (!validateConfig()) {
        setError('请先完善 GitLab 和 DeepSeek 配置')
        return
      }

      if (!batchReportData) {
        setError('当前没有可重跑的批量周报')
        return
      }

      const weekIndex = batchReportData.items.findIndex(
        item => item.weekKey === weekKey,
      )

      if (weekIndex === -1) {
        setError('未找到对应的周报条目')
        return
      }

      const controller = createRequest()
      const model = config.model || 'deepseek-chat'
      const tokenLimit = config.tokenLimit || 4000
      const targetItem = batchReportData.items[weekIndex]
      const deepseekService = createDeepSeekApiService(config.deepseekApiKey)

      setLoading(true)
      setError(null)
      syncProgressState({
        status: 'loading',
        progress: Math.round((weekIndex / batchReportData.items.length) * 100),
        currentWeekKey: targetItem.weekKey,
        currentWeekLabel: targetItem.relativeLabel,
        processedWeeks: weekIndex,
        totalWeeks: batchReportData.items.length,
        failedWeeks: batchReportData.items.filter(
          item => item.status === 'failed',
        ).length,
        endOffsetWeeks: batchReportData.endOffsetWeeks,
        message: `正在重跑 ${targetItem.weekKey}（${targetItem.relativeLabel}）`,
      })

      try {
        const nextItem = await generateWeekItem({
          window: {
            weekKey: targetItem.weekKey,
            weeksAgo: targetItem.weeksAgo,
            relativeLabel: targetItem.relativeLabel,
            startDate: targetItem.startDate,
            endDate: targetItem.endDate,
            startDateText: formatDateOnly(new Date(targetItem.startDate)),
            endDateText: formatDateOnly(new Date(targetItem.endDate)),
          },
          rawEvents: targetItem.rawEvents,
          normalizedEvents: targetItem.normalizedEvents,
          prompt,
          model,
          tokenLimit,
          signal: controller.signal,
          deepseekService,
        })

        if (controller.signal.aborted) {
          syncProgressState({
            status: 'cancelled',
            progress: 0,
            currentWeekKey: null,
            currentWeekLabel: null,
            processedWeeks: 0,
            totalWeeks: batchReportData.items.length,
            failedWeeks: batchReportData.items.filter(
              item => item.status === 'failed',
            ).length,
            endOffsetWeeks: batchReportData.endOffsetWeeks,
            message: '单周重跑已取消',
          })
          return
        }

        const nextItems = [...batchReportData.items]
        nextItems[weekIndex] = nextItem
        const nextData = finalizeBatchData({
          ...batchReportData,
          items: nextItems,
          generatedAt: batchReportData.generatedAt,
        })

        setBatchReportData(nextData)
        setAIGenerationConfig({
          taskType: 'weekly-report-batch',
          prompt,
          tokensUsed: nextData.totalTokensUsed,
          result: nextData.combinedMarkdown,
          weeks: nextData.weeks,
        })
        updateFinalState(nextData)
      } catch (error) {
        if (controller.signal.aborted || isAbortError(error)) {
          syncProgressState({
            status: 'cancelled',
            progress: 0,
            currentWeekKey: null,
            currentWeekLabel: null,
            processedWeeks: 0,
            totalWeeks: batchReportData.items.length,
            failedWeeks: batchReportData.items.filter(
              item => item.status === 'failed',
            ).length,
            endOffsetWeeks: batchReportData.endOffsetWeeks,
            message: '单周重跑已取消',
          })
          return
        }

        const errorMessage =
          error instanceof Error ? error.message : '单周重跑失败'
        setError(errorMessage)
        syncProgressState({
          status: 'error',
          progress: 0,
          currentWeekKey: null,
          currentWeekLabel: null,
          processedWeeks: 0,
          totalWeeks: batchReportData.items.length,
          failedWeeks: batchReportData.items.filter(
            item => item.status === 'failed',
          ).length,
          endOffsetWeeks: batchReportData.endOffsetWeeks,
          message: errorMessage,
        })
      } finally {
        setLoading(false)
        cleanupRequest(controller)
      }
    },
    [
      cleanupRequest,
      createRequest,
      isAbortError,
      setAIGenerationConfig,
      setError,
      setLoading,
      setBatchReportData,
      syncProgressState,
      updateFinalState,
    ],
  )

  const cancelGeneration = useCallback(() => {
    cancelRequest()
    const currentState = useAppStore.getState().batchGenerationState
    if (currentState.status === 'loading') {
      const currentBatchData = useAppStore.getState().batchReportData
      const hasCompletedItems = currentBatchData?.items.some(
        item => item.status !== 'pending' && item.status !== 'running',
      )
      if (!hasCompletedItems) {
        setBatchReportData(null)
      }
      syncProgressState({
        status: 'cancelled',
        progress: currentState.progress,
        currentWeekKey: null,
        currentWeekLabel: null,
        processedWeeks: currentState.processedWeeks,
        totalWeeks: currentState.totalWeeks,
        failedWeeks: currentState.failedWeeks,
        endOffsetWeeks: currentState.endOffsetWeeks,
        message: '批量周报生成已取消',
      })
    }
    setLoading(false)
  }, [cancelRequest, setBatchReportData, setLoading, syncProgressState])

  useEffect(() => {
    return () => {
      cancelRequest()
    }
  }, [cancelRequest])

  return {
    runFullBatch,
    rerunWeek,
    cancelGeneration,
  }
}

export default useBatchReportGeneration
