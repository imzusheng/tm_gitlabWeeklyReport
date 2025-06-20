import { useState, useEffect, useCallback } from 'react'
import {
  AppConfig,
  WeeklyReportData,
  AppState,
  FilterConditions,
  SortOptions,
  PaginationOptions,
  AIGenerationConfig,
  PanelType,
  GitLabEvent,
} from '@/types'
import { storageUtils } from '@/utils'
import {
  DEFAULT_CONFIG,
  DEFAULT_FILTER_CONDITIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from '@/constants'

const initialState: AppState = {
  config: DEFAULT_CONFIG,
  reportData: null,
  isLoading: false,
  error: null,
  theme: DEFAULT_CONFIG.theme,
  activePanel: 'main',
  filterConditions: DEFAULT_FILTER_CONDITIONS,
  sortOptions: DEFAULT_SORT_OPTIONS,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  events: [],
  totalCount: 0,
  aiGenerationConfig: null,
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  // 加载保存的配置
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedConfig = await storageUtils.loadConfig()

        setState(prev => {
          const mergedConfig = savedConfig
            ? { ...DEFAULT_CONFIG, ...savedConfig }
            : DEFAULT_CONFIG
          return {
            ...prev,
            config: mergedConfig,
            theme: mergedConfig.theme || DEFAULT_CONFIG.theme,
          }
        })
      } catch (error) {
        // 静默处理配置加载失败，使用默认配置
      }
    }

    loadSavedData()
  }, [])

  // 更新配置
  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    setState(prev => {
      const newConfig = { ...prev.config, ...updates }
      storageUtils.saveConfig(newConfig)
      return {
        ...prev,
        config: newConfig,
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
        page: 1,
      },
    }))
  }, [])

  // 更新排序选项
  const updateSortOptions = useCallback((sort: SortOptions) => {
    setState(prev => ({ ...prev, sortOptions: sort }))
  }, [])

  // 更新分页选项
  const updatePaginationOptions = useCallback(
    (pagination: Partial<PaginationOptions>) => {
      setState(prev => ({
        ...prev,
        paginationOptions: { ...prev.paginationOptions, ...pagination },
      }))
    },
    [],
  )

  // 设置事件数据
  const setEvents = useCallback((events: GitLabEvent[]) => {
    setState(prev => ({
      ...prev,
      events,
    }))
  }, [])

  // 设置总数
  const setTotal = useCallback((total: number) => {
    setState(prev => ({
      ...prev,
      totalCount: total,
      paginationOptions: {
        ...prev.paginationOptions,
        total: total,
      },
    }))
  }, [])

  // 设置AI生成配置
  const setAIGenerationConfig = useCallback(
    (config: AIGenerationConfig | null) => {
      setState(prev => ({ ...prev, aiGenerationConfig: config }))
    },
    [],
  )

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

  // 设置主题
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    setState(prev => {
      const newConfig = { ...prev.config, theme }
      
      // 保存主题设置到localStorage
      try {
        storageUtils.saveConfig(newConfig)
      } catch (error) {
        console.error('Failed to save theme:', error)
      }
      
      return {
        ...prev,
        config: newConfig,
        theme,
      }
    })
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
      
      const newConfig = { ...prev.config, theme: newTheme }
      
      // 保存主题设置到localStorage
      try {
        storageUtils.saveConfig(newConfig)
      } catch (error) {
        console.error('Failed to save theme:', error)
      }
      
      return {
        ...prev,
        config: newConfig,
        theme: newTheme,
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
    const { gitlabUrl, gitlabToken, deepseekApiKey, defaultPrompt } =
      state.config
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
    const TIME_RANGE_DAYS = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '180d': 180,
      '365d': 365,
    } as const

    days = TIME_RANGE_DAYS[timeRange] || 7

    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
    const startDate = new Date(now.getTime() - days * MILLISECONDS_PER_DAY)
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
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
    setTotal,
    setAIGenerationConfig,
    setLoading,
    setError,
    setReportData,
    setTheme,
    toggleTheme,
    resetState,
    isConfigValid,
    getTimeRange,
  }
}
