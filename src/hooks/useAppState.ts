import { useState, useEffect, useCallback } from 'react'
import { AppConfig, WeeklyReportData, AppState, FilterConditions, SortOptions, PaginationOptions, AIGenerationConfig, PanelType } from '@/types'
import { storageUtils } from '@/utils'
import { 
  DEFAULT_CONFIG, 
  DEFAULT_FILTER_CONDITIONS, 
  DEFAULT_SORT_OPTIONS, 
  DEFAULT_PAGINATION_OPTIONS 
} from '@/constants'

const initialState: AppState = {
  config: DEFAULT_CONFIG,
  reportData: null,
  isLoading: false,
  error: null,
  theme: 'system',
  activePanel: 'main',
  filterConditions: DEFAULT_FILTER_CONDITIONS,
  sortOptions: DEFAULT_SORT_OPTIONS,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  events: [],
  aiGenerationConfig: null,
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  // 加载保存的配置
  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const savedConfig = await storageUtils.loadConfig()
        if (savedConfig) {
          setState(prev => ({
            ...prev,
            config: { ...DEFAULT_CONFIG, ...savedConfig }
          }))
        }
      } catch (error) {
        console.error('加载保存的配置失败:', error)
      }
    }

    loadSavedConfig()
    // 如果没有保存的配置，保持使用 DEFAULT_CONFIG 作为默认值
  }, [])

  // 更新配置
  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    setState(prev => {
      const newConfig = { ...prev.config, ...updates }
      storageUtils.saveConfig(newConfig)
      return {
        ...prev,
        config: newConfig
      }
    })
  }, [])

  // 设置活动面板
  const setActivePanel = useCallback((panel: PanelType) => {
    setState(prev => ({ ...prev, activePanel: panel }))
  }, [])

  // 更新筛选条件
  const updateFilterConditions = useCallback((filters: FilterConditions) => {
    setState(prev => ({
      ...prev,
      filterConditions: filters,
      paginationOptions: {
        ...prev.paginationOptions,
        page: 1 // 重置到第一页
      }
    }))
  }, [])

  // 更新排序选项
  const updateSortOptions = useCallback((sort: SortOptions) => {
    setState(prev => ({ ...prev, sortOptions: sort }))
  }, [])

  // 更新分页选项
  const updatePaginationOptions = useCallback((pagination: Partial<PaginationOptions>) => {
    setState(prev => ({
      ...prev,
      paginationOptions: { ...prev.paginationOptions, ...pagination }
    }))
  }, [])

  // 设置事件数据
  const setEvents = useCallback((events: any[], total: number) => {
    setState(prev => ({
      ...prev,
      events,
      paginationOptions: {
        ...prev.paginationOptions,
        total
      }
    }))
  }, [])

  // 设置AI生成配置
  const setAIGenerationConfig = useCallback((config: AIGenerationConfig | null) => {
    setState(prev => ({ ...prev, aiGenerationConfig: config }))
  }, [])

  // 设置加载状态
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }))
  }, [])

  // 设置错误
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  // 设置周报数据
  const setReportData = useCallback((reportData: WeeklyReportData | null) => {
    setState(prev => ({ ...prev, reportData }))
  }, [])

  // 切换主题
  const toggleTheme = useCallback(() => {
    setState(prev => {
      let newTheme: 'light' | 'dark' | 'system'
      switch (prev.theme) {
        case 'light':
          newTheme = 'dark'
          break
        case 'dark':
          newTheme = 'system'
          break
        default:
          newTheme = 'light'
          break
      }
      return {
        ...prev,
        theme: newTheme
      }
    })
  }, [])

  // 重置状态
  const resetState = useCallback(() => {
    setState(initialState)
    storageUtils.clearConfig()
  }, [])

  // 验证配置完整性
  const isConfigValid = useCallback(() => {
    const { gitlabUrl, gitlabToken, deepseekApiKey, defaultPrompt } = state.config
    return !!(
      gitlabUrl.trim() &&
      gitlabToken.trim() &&
      deepseekApiKey.trim() &&
      defaultPrompt.trim()
    )
  }, [state.config])

  // 获取时间范围
  const getTimeRange = useCallback(() => {
    const now = new Date()
    const timeRange = state.filterConditions.timeRange
    
    let days = 7
    switch (timeRange) {
      case '30d': days = 30; break
      case '90d': days = 90; break
      case '180d': days = 180; break
      case '365d': days = 365; break
      default: days = 7
    }
    
    const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000))
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0]
    }
  }, [state.filterConditions.timeRange])

  return {
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
    setReportData,
    toggleTheme,
    resetState,
    isConfigValid,
    getTimeRange,
  }
} 