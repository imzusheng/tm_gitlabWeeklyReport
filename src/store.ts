import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  storageUtils,
  sessionStorageUtils,
  createEmptyBatchGenerationState,
  buildBatchReportData,
} from '@/utils'
import {
  DEFAULT_CONFIG,
  DEFAULT_FILTER_CONDITIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_BATCH_WEEKS,
} from '@/constants'
import type {
  AppConfig,
  AppSessionState,
  FilterConditions,
  SortOptions,
  PaginationOptions,
  AIGenerationConfig,
  WeeklyReportData,
  WeeklyReportBatchData,
  BatchGenerationState,
  PanelType,
  Theme,
  GitLabEvent,
} from '@/types'
/**
 * 应用状态接口
 */
const restoredSessionState = sessionStorageUtils.loadSessionState()

const buildSessionSnapshot = (state: {
  reportData: AppState['reportData']
  aiGenerationConfig: AppState['aiGenerationConfig']
  batchReportData: AppState['batchReportData']
  batchGenerationState: AppState['batchGenerationState']
}): Pick<
  AppSessionState,
  | 'reportData'
  | 'aiGenerationConfig'
  | 'batchReportData'
  | 'batchGenerationState'
> => ({
  reportData: state.reportData,
  aiGenerationConfig: state.aiGenerationConfig,
  batchReportData: state.batchReportData,
  batchGenerationState: state.batchGenerationState,
})

const normalizeBatchGenerationState = (
  state: BatchGenerationState | null | undefined,
  weeks: number,
  endOffsetWeeks = 0,
): BatchGenerationState => {
  const baseState = createEmptyBatchGenerationState(weeks, endOffsetWeeks)

  if (!state) {
    return baseState
  }

  const isLoading = state.status === 'loading'
  const status = isLoading ? 'partial' : state.status

  return {
    ...baseState,
    ...state,
    status,
    currentWeekKey: isLoading ? null : state.currentWeekKey,
    currentWeekLabel: isLoading ? null : state.currentWeekLabel,
  }
}

const normalizeBatchReportData = (
  data: WeeklyReportBatchData | null | undefined,
): WeeklyReportBatchData | null => {
  if (!data || !Array.isArray(data.items)) {
    return null
  }

  return buildBatchReportData({
    ...data,
    weeks: data.weeks ?? DEFAULT_BATCH_WEEKS,
    prompt: data.prompt ?? '',
    endOffsetWeeks: data.endOffsetWeeks ?? 0,
    generatedAt: data.generatedAt ?? new Date().toISOString(),
    totalEvents: data.totalEvents ?? 0,
    meaningfulEvents: data.meaningfulEvents ?? 0,
    totalTokensUsed: data.totalTokensUsed ?? 0,
    combinedMarkdown: data.combinedMarkdown ?? '',
    items: data.items,
  })
}

/**
 * 应用状态接口
 */
interface AppState {
  config: AppConfig
  reportData: WeeklyReportData | null
  isLoading: boolean
  error: string | null
  theme: Theme
  activePanel: PanelType
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  events: GitLabEvent[]
  totalCount: number
  aiGenerationConfig: AIGenerationConfig | null
  batchReportData: WeeklyReportBatchData | null
  batchGenerationState: BatchGenerationState
}

/**
 * 应用 Store 接口
 */
interface AppStore extends AppState {
  // 配置相关操作
  updateConfig: (config: Partial<AppConfig>) => void
  resetConfig: () => void

  // UI 状态操作
  setActivePanel: (panel: PanelType) => void
  setTheme: (theme: Theme) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // 数据操作
  setEvents: (events: GitLabEvent[]) => void
  setTotalCount: (count: number) => void

  // 筛选和分页操作
  setFilterConditions: (filters: Partial<FilterConditions>) => void
  setSortOptions: (sort: Partial<SortOptions>) => void
  setPaginationOptions: (pagination: Partial<PaginationOptions>) => void

  // AI 相关操作
  setAIGenerationConfig: (config: AIGenerationConfig | null) => void
  setReportData: (data: WeeklyReportData | null) => void
  setBatchReportData: (data: WeeklyReportBatchData | null) => void
  setBatchGenerationState: (state: Partial<BatchGenerationState>) => void

  // 工具方法
  resetState: () => void
  getTimeRange: () => { startDate: Date; endDate: Date }
  validateConfig: () => boolean
}

/**
 * 初始状态
 */
const initialState: AppState = {
  config: DEFAULT_CONFIG,
  reportData: restoredSessionState?.reportData ?? null,
  isLoading: false,
  error: null,
  theme: 'system',
  activePanel: 'main',
  filterConditions: DEFAULT_FILTER_CONDITIONS,
  sortOptions: DEFAULT_SORT_OPTIONS,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  events: [],
  totalCount: 0,
  aiGenerationConfig: restoredSessionState?.aiGenerationConfig ?? null,
  batchReportData: normalizeBatchReportData(
    restoredSessionState?.batchReportData ?? null,
  ),
  batchGenerationState: normalizeBatchGenerationState(
    restoredSessionState?.batchGenerationState ?? null,
    restoredSessionState?.batchReportData?.weeks ?? DEFAULT_BATCH_WEEKS,
    restoredSessionState?.batchGenerationState?.endOffsetWeeks ??
      restoredSessionState?.batchReportData?.endOffsetWeeks ??
      0,
  ),
}

/**
 * 计算时间范围
 */
const calculateTimeRange = (timeRange: string) => {
  const now = new Date()
  const endDate = new Date(now)
  const startDate = new Date(now)

  switch (timeRange) {
    case 'week': {
      // 本周（周一到周日）
      const dayOfWeek = now.getDay()
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
      const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
      startDate.setDate(now.getDate() - daysToMonday)
      endDate.setDate(now.getDate() + daysToSunday)
      break
    }
    case '7d':
      startDate.setDate(now.getDate() - 7)
      break
    case '30d':
      startDate.setDate(now.getDate() - 30)
      break
    case '90d':
      startDate.setDate(now.getDate() - 90)
      break
    case '180d':
      startDate.setDate(now.getDate() - 180)
      break
    case '365d':
      startDate.setDate(now.getDate() - 365)
      break
    default:
      startDate.setDate(now.getDate() - 7)
  }

  // 设置时间为当天的开始和结束
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)

  return { startDate, endDate }
}

/**
 * 验证配置完整性
 */
const validateAppConfig = (config: AppConfig): boolean => {
  return !!(
    config.gitlabUrl?.trim() &&
    config.gitlabToken?.trim() &&
    config.deepseekApiKey?.trim()
  )
}

/**
 * 创建应用状态 store
 */
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 配置相关操作
      updateConfig: (newConfig: Partial<AppConfig>) => {
        set((state: AppStore) => {
          const updatedConfig = { ...state.config, ...newConfig }
          // 保存到本地存储
          storageUtils.saveConfig(updatedConfig)
          return { config: updatedConfig }
        })
      },

      resetConfig: () => {
        set({ config: DEFAULT_CONFIG })
        storageUtils.clearConfig()
      },

      // UI 状态操作
      setActivePanel: (panel: PanelType) => set({ activePanel: panel }),
      setTheme: (theme: Theme) => set({ theme }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      // 数据操作
      setEvents: (events: GitLabEvent[]) => set({ events }),
      setTotalCount: (count: number) => set({ totalCount: count }),

      // 筛选和分页操作
      setFilterConditions: (filters: Partial<FilterConditions>) => {
        set((state: AppStore) => ({
          filterConditions: { ...state.filterConditions, ...filters },
        }))
      },

      setSortOptions: (sort: Partial<SortOptions>) => {
        set((state: AppStore) => ({
          sortOptions: { ...state.sortOptions, ...sort },
        }))
      },

      setPaginationOptions: (pagination: Partial<PaginationOptions>) => {
        set((state: AppStore) => ({
          paginationOptions: { ...state.paginationOptions, ...pagination },
        }))
      },

      // AI 相关操作
      setAIGenerationConfig: (config: AIGenerationConfig | null) => {
        set({ aiGenerationConfig: config })
        sessionStorageUtils.saveSessionState(
          buildSessionSnapshot({
            ...get(),
            aiGenerationConfig: config,
          }),
        )
      },
      setReportData: (data: WeeklyReportData | null) => {
        set({ reportData: data })
        sessionStorageUtils.saveSessionState(
          buildSessionSnapshot({
            ...get(),
            reportData: data,
          }),
        )
      },
      setBatchReportData: (data: WeeklyReportBatchData | null) => {
        set({ batchReportData: data })
        sessionStorageUtils.saveSessionState(
          buildSessionSnapshot({
            ...get(),
            batchReportData: data,
          }),
        )
      },
      setBatchGenerationState: (state: Partial<BatchGenerationState>) => {
        const nextBatchGenerationState = {
          ...get().batchGenerationState,
          ...state,
        }

        set({ batchGenerationState: nextBatchGenerationState })
        sessionStorageUtils.saveSessionState(
          buildSessionSnapshot({
            ...get(),
            batchGenerationState: nextBatchGenerationState,
          }),
        )
      },

      // 工具方法
      resetState: () => {
        set({
          ...initialState,
          batchGenerationState:
            createEmptyBatchGenerationState(DEFAULT_BATCH_WEEKS),
        })
        storageUtils.clearConfig()
        sessionStorageUtils.clearSessionState()
      },

      getTimeRange: () => {
        const { filterConditions } = get() as AppStore
        return calculateTimeRange(filterConditions.timeRange)
      },

      validateConfig: () => {
        const { config } = get() as AppStore
        return validateAppConfig(config)
      },
    }),
    {
      name: 'gitlab-weekly-report-store',
      partialize: (state: AppStore) => ({
        config: state.config,
        theme: state.theme,
        filterConditions: state.filterConditions,
        sortOptions: state.sortOptions,
      }),
    },
  ),
)

/**
 * 选择器 hooks - 用于组件中获取特定状态
 */
export const useConfig = () => useAppStore(state => state.config)
export const useTheme = () => useAppStore(state => state.theme)
export const useActivePanel = () => useAppStore(state => state.activePanel)
export const useLoading = () => useAppStore(state => state.isLoading)
export const useError = () => useAppStore(state => state.error)
export const useEvents = () => useAppStore(state => state.events)
export const useFilterConditions = () =>
  useAppStore(state => state.filterConditions)
export const usePaginationOptions = () =>
  useAppStore(state => state.paginationOptions)
export const useReportData = () => useAppStore(state => state.reportData)
export const useBatchReportData = () =>
  useAppStore(state => state.batchReportData)
export const useBatchGenerationState = () =>
  useAppStore(state => state.batchGenerationState)

/**
 * 操作 hooks - 用于组件中执行状态更新
 */
export const useAppActions = () => {
  const store = useAppStore()
  return {
    updateConfig: store.updateConfig,
    setActivePanel: store.setActivePanel,
    setTheme: store.setTheme,
    setLoading: store.setLoading,
    setError: store.setError,
    setEvents: store.setEvents,
    setFilterConditions: store.setFilterConditions,
    setPaginationOptions: store.setPaginationOptions,
    setReportData: store.setReportData,
    setBatchReportData: store.setBatchReportData,
    setBatchGenerationState: store.setBatchGenerationState,
    resetState: store.resetState,
    getTimeRange: store.getTimeRange,
    validateConfig: store.validateConfig,
  }
}
