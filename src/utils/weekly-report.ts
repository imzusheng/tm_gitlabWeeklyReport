import { DEFAULT_BATCH_WEEKS, MAX_BATCH_WEEKS } from '@/constants'
import type {
  GitLabEvent,
  NormalizedGitLabEvent,
  WeeklyReportBatchData,
  WeeklyReportBatchItem,
  WeeklyReportEventCategory,
  WeeklyReportStats,
  WeeklyReportWeekWindow,
} from '@/types'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const WEEKDAY_LABELS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const CATEGORY_LABELS: Record<WeeklyReportEventCategory, string> = {
  pushed: 'Push',
  merged: 'Merge',
  commented: 'Comment',
  created: 'Create',
  approved: 'Approve',
  closed: 'Close',
  reopened: 'Reopen',
  updated: 'Update',
  other: 'Other',
}

const ZERO_STATS = (): WeeklyReportStats => ({
  raw: 0,
  meaningful: 0,
  pushed: 0,
  merged: 0,
  commented: 0,
  created: 0,
  approved: 0,
  closed: 0,
  reopened: 0,
  updated: 0,
})

const normalizeText = (value?: string | null): string =>
  (value ?? '').replace(/\s+/g, ' ').trim()

const normalizeKey = (value?: string | null): string =>
  normalizeText(value).toLowerCase().replace(/[_-]+/g, ' ')

const pad2 = (value: number): string => String(value).padStart(2, '0')

export const clampBatchWeeks = (
  weeks: number,
  min = 1,
  max = MAX_BATCH_WEEKS,
): number => {
  if (!Number.isFinite(weeks)) {
    return DEFAULT_BATCH_WEEKS
  }

  return Math.min(max, Math.max(min, Math.floor(weeks)))
}

export const clampBatchEndOffset = (
  endOffsetWeeks: number,
  weeks: number,
): number => {
  const safeWeeks = clampBatchWeeks(weeks)
  const maxEndOffset = Math.max(0, MAX_BATCH_WEEKS - safeWeeks)

  if (!Number.isFinite(endOffsetWeeks)) {
    return 0
  }

  return Math.min(maxEndOffset, Math.max(0, Math.floor(endOffsetWeeks)))
}

export const formatDateOnly = (date: Date): string => {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export const formatDateTime = (date: Date): string => {
  return `${formatDateOnly(date)} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

export const formatDayLabel = (date: Date): string => {
  return `${formatDateOnly(date)} ${WEEKDAY_LABELS[date.getDay()]}`
}

export const formatRelativeWeekLabel = (weeksAgo: number): string => {
  if (weeksAgo <= 0) {
    return '本周'
  }

  if (weeksAgo === 1) {
    return '上周'
  }

  if (weeksAgo === 2) {
    return '上上周'
  }

  if (weeksAgo === 3) {
    return '上上上周'
  }

  return `${weeksAgo}周前`
}

const getIsoWeekInfo = (date: Date): { year: number; week: number } => {
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)

  const dayNumber = target.getDay() || 7
  target.setDate(target.getDate() + 4 - dayNumber)

  const year = target.getFullYear()
  const yearStart = new Date(year, 0, 1)
  yearStart.setHours(0, 0, 0, 0)

  const week = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / MS_PER_DAY + 1) / 7,
  )

  return { year, week }
}

export const getIsoWeekKey = (date: Date): string => {
  const { year, week } = getIsoWeekInfo(date)
  return `${year}-W${pad2(week)}`
}

export const getStartOfIsoWeek = (date: Date): Date => {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const day = start.getDay() || 7
  start.setDate(start.getDate() - day + 1)
  return start
}

export const getEndOfIsoWeek = (date: Date): Date => {
  const end = getStartOfIsoWeek(date)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export const getWeekWindow = (
  date: Date,
  weeksAgo = 0,
): WeeklyReportWeekWindow => {
  const anchor = new Date(date)
  anchor.setHours(0, 0, 0, 0)
  const baseStart = getStartOfIsoWeek(anchor)
  const startDate = new Date(baseStart)
  startDate.setDate(baseStart.getDate() - weeksAgo * 7)
  const endDate = getEndOfIsoWeek(startDate)
  const weekKey = getIsoWeekKey(startDate)
  const relativeLabel = formatRelativeWeekLabel(weeksAgo)

  return {
    weekKey,
    weeksAgo,
    relativeLabel,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    startDateText: formatDateOnly(startDate),
    endDateText: formatDateOnly(endDate),
  }
}

export const buildWeekWindows = (
  weeks: number,
  anchorDate = new Date(),
  endOffsetWeeks = 0,
): WeeklyReportWeekWindow[] => {
  const safeWeeks = clampBatchWeeks(weeks)
  const safeEndOffsetWeeks = clampBatchEndOffset(endOffsetWeeks, safeWeeks)
  const windows: WeeklyReportWeekWindow[] = []

  for (
    let weeksAgo = safeEndOffsetWeeks + safeWeeks - 1;
    weeksAgo >= safeEndOffsetWeeks;
    weeksAgo -= 1
  ) {
    windows.push(getWeekWindow(anchorDate, weeksAgo))
  }

  return windows
}

const getCategoryFromActionName = (
  event: GitLabEvent,
): WeeklyReportEventCategory => {
  const actionName = normalizeKey(event.action_name)
  const targetType = normalizeKey(event.target_type)

  if (event.push_data || actionName.includes('push')) {
    return 'pushed'
  }

  if (actionName === 'approved') {
    return 'approved'
  }

  if (actionName === 'merged') {
    return 'merged'
  }

  if (actionName === 'commented on' || actionName === 'commented') {
    return 'commented'
  }

  if (actionName === 'closed') {
    return 'closed'
  }

  if (actionName === 'reopened') {
    return 'reopened'
  }

  if (actionName === 'created' || actionName === 'opened') {
    return 'created'
  }

  if (actionName === 'updated') {
    return 'updated'
  }

  if (event.note || targetType === 'note') {
    return 'commented'
  }

  return 'other'
}

export const classifyEvent = (
  event: GitLabEvent,
): WeeklyReportEventCategory => {
  return getCategoryFromActionName(event)
}

const getDisplayTitle = (
  event: GitLabEvent,
  category: WeeklyReportEventCategory,
): string => {
  if (event.push_data) {
    const ref = normalizeText(event.push_data.ref)
    const commitCount = event.push_data.commit_count ?? 0
    const commitTitle = normalizeText(event.push_data.commit_title)
    const refLabel = ref ? `推送到 ${ref}` : '代码推送'
    const commitLabel = commitCount > 0 ? `${commitCount} 个提交` : ''

    if (commitTitle) {
      return [refLabel, commitLabel, commitTitle].filter(Boolean).join(' · ')
    }

    return [refLabel, commitLabel].filter(Boolean).join(' · ')
  }

  if (event.note?.body) {
    return `评论：${normalizeText(event.note.body).slice(0, 60)}`
  }

  const title = normalizeText(event.title) || normalizeText(event.target_title)
  if (title) {
    return title
  }

  const fallbackType = normalizeKey(event.target_type)
  const fallbackAction =
    CATEGORY_LABELS[category] || event.action_name || '事件'
  return fallbackType ? `${fallbackType} · ${fallbackAction}` : fallbackAction
}

const getDisplayContent = (event: GitLabEvent): string => {
  if (event.push_data?.commit_title) {
    return normalizeText(event.push_data.commit_title)
  }

  if (event.note?.body) {
    return normalizeText(event.note.body).slice(0, 120)
  }

  return normalizeText(event.target_title || event.title)
}

const getProjectName = (event: GitLabEvent): string => {
  return (
    normalizeText(event.project?.name) ||
    normalizeText(event.project?.path_with_namespace) ||
    `项目 #${event.project_id ?? event.id}`
  )
}

const getProjectPath = (event: GitLabEvent): string => {
  return (
    normalizeText(event.project?.path_with_namespace) || getProjectName(event)
  )
}

export const isMeaningfulEvent = (event: GitLabEvent): boolean => {
  if (!event.created_at) {
    return false
  }

  const category = classifyEvent(event)
  if (category === 'other') {
    return false
  }

  const targetType = normalizeKey(event.target_type)
  const title = normalizeText(event.title)
  const targetTitle = normalizeText(event.target_title)

  if (['joined', 'left', 'deleted'].includes(normalizeKey(event.action_name))) {
    return false
  }

  if (category === 'pushed') {
    return Boolean(
      event.push_data &&
        (event.push_data.commit_count > 0 || event.push_data.commit_title),
    )
  }

  if (category === 'commented') {
    return Boolean(normalizeText(event.note?.body) || title || targetTitle)
  }

  if (category === 'created') {
    if (targetType === 'user') {
      return false
    }

    return Boolean(event.push_data || event.note || title || targetTitle)
  }

  if (category === 'updated') {
    return Boolean(title || targetTitle || event.note || event.project)
  }

  return Boolean(title || targetTitle || event.push_data || event.note)
}

export const normalizeEvent = (event: GitLabEvent): NormalizedGitLabEvent => {
  const createdAtMs = new Date(event.created_at).getTime()
  const createdAt = new Date(event.created_at).toISOString()
  const weekKey = getIsoWeekKey(new Date(event.created_at))
  const category = classifyEvent(event)
  const displayTitle = getDisplayTitle(event, category)
  const displayContent = getDisplayContent(event)

  return {
    id: event.id,
    createdAt,
    createdAtMs,
    weekKey,
    weekLabel: weekKey,
    category,
    actionName: normalizeText(event.action_name),
    targetType: normalizeText(event.target_type),
    projectName: getProjectName(event),
    projectPath: getProjectPath(event),
    title: normalizeText(event.title),
    targetTitle: normalizeText(event.target_title),
    displayTitle,
    displayContent,
    isMeaningful: isMeaningfulEvent(event),
    raw: event,
  }
}

const sortByDateAsc = <T extends { createdAtMs: number }>(items: T[]): T[] => {
  return [...items].sort((left, right) => left.createdAtMs - right.createdAtMs)
}

export const groupEventsByDay = (
  events: NormalizedGitLabEvent[],
): Array<{
  dayKey: string
  dayLabel: string
  events: NormalizedGitLabEvent[]
}> => {
  const dayMap = new Map<string, NormalizedGitLabEvent[]>()

  for (const event of events) {
    const dayKey = formatDateOnly(new Date(event.createdAt))
    const list = dayMap.get(dayKey) ?? []
    list.push(event)
    dayMap.set(dayKey, list)
  }

  return [...dayMap.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([dayKey, dayEvents]) => ({
      dayKey,
      dayLabel: `${dayKey} ${WEEKDAY_LABELS[new Date(`${dayKey}T00:00:00`).getDay()]}`,
      events: sortByDateAsc(dayEvents),
    }))
}

export const groupEventsByWeek = (
  events: GitLabEvent[],
  weeks: number,
  anchorDate = new Date(),
  endOffsetWeeks = 0,
): Array<{
  window: WeeklyReportWeekWindow
  rawEvents: GitLabEvent[]
  normalizedEvents: NormalizedGitLabEvent[]
}> => {
  const windows = buildWeekWindows(weeks, anchorDate, endOffsetWeeks)
  const grouped = windows.map(window => ({
    window,
    rawEvents: [] as GitLabEvent[],
    normalizedEvents: [] as NormalizedGitLabEvent[],
  }))

  const sortedEvents = [...events].sort(
    (left, right) =>
      new Date(right.created_at).getTime() -
      new Date(left.created_at).getTime(),
  )

  for (const event of sortedEvents) {
    const createdAt = new Date(event.created_at)
    const matchedIndex = grouped.findIndex(group => {
      const start = new Date(group.window.startDate)
      const end = new Date(group.window.endDate)
      return createdAt >= start && createdAt <= end
    })

    if (matchedIndex === -1) {
      continue
    }

    grouped[matchedIndex].rawEvents.push(event)
    grouped[matchedIndex].normalizedEvents.push(normalizeEvent(event))
  }

  return grouped.map(group => ({
    ...group,
    rawEvents: [...group.rawEvents].sort(
      (left, right) =>
        new Date(left.created_at).getTime() -
        new Date(right.created_at).getTime(),
    ),
    normalizedEvents: sortByDateAsc(group.normalizedEvents),
  }))
}

export const buildWeeklyStats = (events: GitLabEvent[]): WeeklyReportStats => {
  const stats = ZERO_STATS()
  stats.raw = events.length

  for (const event of events) {
    if (!isMeaningfulEvent(event)) {
      continue
    }

    const category = classifyEvent(event)
    stats.meaningful += 1

    switch (category) {
      case 'pushed':
        stats.pushed += 1
        break
      case 'merged':
        stats.merged += 1
        break
      case 'commented':
        stats.commented += 1
        break
      case 'created':
        stats.created += 1
        break
      case 'approved':
        stats.approved += 1
        break
      case 'closed':
        stats.closed += 1
        break
      case 'reopened':
        stats.reopened += 1
        break
      case 'updated':
        stats.updated += 1
        break
      case 'other':
      default:
        break
    }
  }

  return stats
}

export const buildWeeklyPromptText = (
  window: WeeklyReportWeekWindow,
  events: NormalizedGitLabEvent[],
  stats: WeeklyReportStats,
): string => {
  const meaningfulEvents = events.filter(event => event.isMeaningful)
  const dayGroups = groupEventsByDay(meaningfulEvents)

  const lines: string[] = [
    `周次：${window.weekKey}（${window.relativeLabel}）`,
    `时间范围：${window.startDateText} ~ ${window.endDateText}`,
    `事件统计：原始 ${stats.raw} 条，有效 ${stats.meaningful} 条`,
    `分类统计：Push ${stats.pushed}，Merge ${stats.merged}，Comment ${stats.commented}，Create ${stats.created}，Approve ${stats.approved}，Close ${stats.closed}，Reopen ${stats.reopened}，Update ${stats.updated}`,
    '',
    '事件清单：',
  ]

  if (meaningfulEvents.length === 0) {
    lines.push('- 本周无有效事件')
    return lines.join('\n')
  }

  for (const dayGroup of dayGroups) {
    lines.push(`### ${dayGroup.dayLabel}`)
    for (const event of dayGroup.events) {
      lines.push(
        `- ${formatDateTime(new Date(event.createdAt))} | [${event.projectName}] ${CATEGORY_LABELS[event.category]} | ${event.displayTitle}${event.displayContent ? ` - ${event.displayContent}` : ''}`,
      )
    }
  }

  return lines.join('\n')
}

export const buildFallbackWeeklySummary = (
  events: NormalizedGitLabEvent[],
  stats: WeeklyReportStats,
): string => {
  const meaningfulEvents = events.filter(event => event.isMeaningful)

  if (meaningfulEvents.length === 0) {
    return '本周没有可用于周报的有效事件。'
  }

  const activityParts: string[] = []
  if (stats.pushed > 0) activityParts.push(`完成 ${stats.pushed} 次 Push`)
  if (stats.merged > 0) activityParts.push(`推进 ${stats.merged} 次合并`)
  if (stats.commented > 0) activityParts.push(`处理 ${stats.commented} 条评论`)
  if (stats.created > 0) activityParts.push(`新增 ${stats.created} 项内容`)
  if (stats.approved > 0) activityParts.push(`完成 ${stats.approved} 次审批`)
  if (stats.closed > 0) activityParts.push(`关闭 ${stats.closed} 项任务`)
  if (stats.reopened > 0) activityParts.push(`重开 ${stats.reopened} 项任务`)
  if (stats.updated > 0) activityParts.push(`更新 ${stats.updated} 项内容`)

  if (activityParts.length === 0) {
    activityParts.push(`处理了 ${stats.meaningful} 条有效事件`)
  }

  const topicCandidates = meaningfulEvents
    .map(
      event => event.displayTitle || event.displayContent || event.targetTitle,
    )
    .map(text => normalizeText(text))
    .filter(Boolean)

  const seenTopics = new Set<string>()
  const topics: string[] = []
  for (const candidate of topicCandidates) {
    if (seenTopics.has(candidate)) {
      continue
    }
    seenTopics.add(candidate)
    topics.push(candidate)
    if (topics.length >= 3) {
      break
    }
  }

  const topicText = topics.length > 0 ? `，主要涉及${topics.join('、')}` : ''
  return `本周${activityParts.join('，')}。${topicText}`
}

const buildStatsMarkdown = (stats: WeeklyReportStats): string[] => {
  return [
    `- 原始事件：${stats.raw} 条`,
    `- 有效事件：${stats.meaningful} 条`,
    `- Push：${stats.pushed} 条`,
    `- Merge：${stats.merged} 条`,
    `- Comment：${stats.commented} 条`,
    `- Create：${stats.created} 条`,
    `- Approve：${stats.approved} 条`,
    `- Close：${stats.closed} 条`,
    `- Reopen：${stats.reopened} 条`,
    `- Update：${stats.updated} 条`,
  ]
}

export const buildWeeklyReportMarkdown = (options: {
  window: WeeklyReportWeekWindow
  stats: WeeklyReportStats
  events: NormalizedGitLabEvent[]
  summary: string
  tokensUsed?: number
  error?: string
}): string => {
  const { window, stats, events, summary, tokensUsed, error } = options
  const meaningfulEvents = events.filter(event => event.isMeaningful)
  const dayGroups = groupEventsByDay(meaningfulEvents)
  const lines: string[] = [
    `# 周报 ${window.weekKey}（${window.relativeLabel}）`,
    '',
    `时间范围：${window.startDateText} ~ ${window.endDateText}`,
    '',
    '## 结构化统计',
    ...buildStatsMarkdown(stats),
  ]

  if (typeof tokensUsed === 'number' && tokensUsed > 0) {
    lines.push(`- 本次消耗 Token：${tokensUsed}`)
  }

  lines.push('', '## 事件清单')

  if (meaningfulEvents.length === 0) {
    lines.push('- 无有效事件')
  } else {
    for (const dayGroup of dayGroups) {
      lines.push(`### ${dayGroup.dayLabel}`)
      for (const event of dayGroup.events) {
        lines.push(
          `- ${pad2(new Date(event.createdAt).getHours())}:${pad2(new Date(event.createdAt).getMinutes())} | [${event.projectName}] ${CATEGORY_LABELS[event.category]} | ${event.displayTitle}${event.displayContent ? ` - ${event.displayContent}` : ''}`,
        )
      }
    }
  }

  lines.push('', '## 周总结')

  if (error) {
    lines.push(`> 生成失败：${error}`)
  }

  lines.push(summary.trim() || '本周未生成有效总结。')

  return lines.join('\n')
}

export const buildBatchCombinedMarkdown = (
  data: WeeklyReportBatchData,
): string => {
  const summaryLines = [
    `# 批量周报（近 ${data.weeks} 周）`,
    '',
    `生成时间：${formatDateTime(new Date(data.generatedAt))}`,
    `- 周数：${data.weeks}`,
    `- 截止周：${formatRelativeWeekLabel(data.endOffsetWeeks)}`,
    `- 原始事件：${data.totalEvents} 条`,
    `- 有效事件：${data.meaningfulEvents} 条`,
    `- 总 Token：${data.totalTokensUsed}`,
    '',
    '## 汇总',
    `- 成功 ${data.items.filter(item => item.status === 'success' || item.status === 'skipped').length} 周`,
    `- 失败 ${data.items.filter(item => item.status === 'failed').length} 周`,
    '',
  ]

  const itemBlocks = data.items.map(item => item.report.trim()).filter(Boolean)
  const summaryBlock = summaryLines.join('\n')

  if (itemBlocks.length === 0) {
    return summaryBlock
  }

  return `${summaryBlock}\n${itemBlocks.join('\n\n---\n\n')}`
}

export const createBatchSkeleton = (
  weeks: number,
  anchorDate = new Date(),
  endOffsetWeeks = 0,
): WeeklyReportBatchItem[] => {
  return buildWeekWindows(weeks, anchorDate, endOffsetWeeks).map(window => ({
    weekKey: window.weekKey,
    weeksAgo: window.weeksAgo,
    relativeLabel: window.relativeLabel,
    startDate: window.startDate,
    endDate: window.endDate,
    rawEvents: [],
    normalizedEvents: [],
    stats: ZERO_STATS(),
    summary: '',
    report: '',
    tokensUsed: 0,
    status: 'pending',
  }))
}

export const createEmptyBatchGenerationState = (
  weeks: number,
  endOffsetWeeks = 0,
) => ({
  status: 'idle' as const,
  progress: 0,
  currentWeekKey: null as string | null,
  currentWeekLabel: null as string | null,
  processedWeeks: 0,
  totalWeeks: clampBatchWeeks(weeks),
  failedWeeks: 0,
  endOffsetWeeks: clampBatchEndOffset(endOffsetWeeks, weeks),
  message: '等待批量生成',
})

export const createEmptyBatchData = (
  weeks: number,
  anchorDate = new Date(),
  prompt = '',
  endOffsetWeeks = 0,
): WeeklyReportBatchData => ({
  weeks: clampBatchWeeks(weeks),
  prompt,
  endOffsetWeeks: clampBatchEndOffset(endOffsetWeeks, weeks),
  generatedAt: anchorDate.toISOString(),
  totalEvents: 0,
  meaningfulEvents: 0,
  totalTokensUsed: 0,
  combinedMarkdown: '',
  items: createBatchSkeleton(weeks, anchorDate, endOffsetWeeks),
})

export const buildBatchReportData = (
  data: WeeklyReportBatchData,
): WeeklyReportBatchData => {
  return {
    ...data,
    combinedMarkdown: buildBatchCombinedMarkdown(data),
  }
}

export const buildBatchDataWithReuse = (options: {
  weeks: number
  prompt: string
  anchorDate?: Date
  endOffsetWeeks?: number
  existingData?: WeeklyReportBatchData | null
}): WeeklyReportBatchData => {
  const {
    weeks,
    prompt,
    anchorDate = new Date(),
    endOffsetWeeks = 0,
    existingData,
  } = options

  const safeWeeks = clampBatchWeeks(weeks)
  const safeEndOffsetWeeks = clampBatchEndOffset(endOffsetWeeks, safeWeeks)
  const windows = buildWeekWindows(safeWeeks, anchorDate, safeEndOffsetWeeks)
  const reusableItems =
    existingData?.prompt.trim() === prompt.trim()
      ? new Map(existingData.items.map(item => [item.weekKey, item]))
      : null
  let totalEvents = 0
  let meaningfulEvents = 0
  let totalTokensUsed = 0

  const items = windows.map(window => {
    const reusableItem = reusableItems?.get(window.weekKey)
    if (reusableItem) {
      totalEvents += reusableItem.rawEvents.length
      meaningfulEvents += reusableItem.stats.meaningful
      totalTokensUsed += reusableItem.tokensUsed
      return reusableItem
    }

    return {
      weekKey: window.weekKey,
      weeksAgo: window.weeksAgo,
      relativeLabel: window.relativeLabel,
      startDate: window.startDate,
      endDate: window.endDate,
      rawEvents: [],
      normalizedEvents: [],
      stats: ZERO_STATS(),
      summary: '',
      report: '',
      tokensUsed: 0,
      status: 'pending' as const,
    }
  })

  return buildBatchReportData({
    weeks: safeWeeks,
    prompt,
    endOffsetWeeks: safeEndOffsetWeeks,
    generatedAt: existingData?.generatedAt ?? anchorDate.toISOString(),
    totalEvents,
    meaningfulEvents,
    totalTokensUsed,
    combinedMarkdown: '',
    items,
  })
}
