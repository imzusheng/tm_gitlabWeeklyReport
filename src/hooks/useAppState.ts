import { useState, useEffect, useCallback } from 'react'
import { AppConfig, WeeklyReportData, AppState, FilterConditions, SortOptions, PaginationOptions, AIGenerationConfig, PanelType, GitLabEvent, UserSession } from '@/types'
import { storageUtils } from '@/utils'
import { 
  DEFAULT_CONFIG, 
  DEFAULT_FILTER_CONDITIONS, 
  DEFAULT_SORT_OPTIONS, 
  DEFAULT_PAGINATION_OPTIONS 
} from '@/constants'

const initialState: AppState = {
  config: DEFAULT_CONFIG,
  userSession: null,
  reportData: null,
  isLoading: false,
  error: null,
  theme: 'system',
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

  // 加载保存的配置和用户会话
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [savedConfig, savedSession] = await Promise.all([
          storageUtils.loadConfig(),
          storageUtils.loadUserSession()
        ])
        
        setState(prev => ({
          ...prev,
          config: savedConfig ? { ...DEFAULT_CONFIG, ...savedConfig } : DEFAULT_CONFIG,
          userSession: savedSession
        }))
      } catch (error) {
        console.error('加载保存的数据失败:', error)
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
        config: newConfig
      }
    })
  }, [])

  // 设置用户会话
  const setUserSession = useCallback((session: UserSession | null) => {
    setState(prev => ({
      ...prev,
      userSession: session
    }))
    
    if (session) {
      storageUtils.saveUserSession(session)
    } else {
      storageUtils.clearUserSession()
    }
  }, [])

  // 更新会话活跃时间
  const updateSessionActivity = useCallback(() => {
    setState(prev => {
      if (prev.userSession) {
        const updatedSession = {
          ...prev.userSession,
          lastActiveTime: new Date().toISOString()
        }
        storageUtils.saveUserSession(updatedSession)
        return {
          ...prev,
          userSession: updatedSession
        }
      }
      return prev
    })
  }, [])

  // 检查会话是否有效
  const isSessionValid = useCallback(() => {
    const session = state.userSession
    if (!session) return false
    
    const loginTime = new Date(session.loginTime)
    const now = new Date()
    const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
    
    return hoursDiff <= 24
  }, [state.userSession])

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
        page: 1
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
  const setEvents = useCallback((events: GitLabEvent[]) => {
    setState(prev => ({
      ...prev,
      events
    }))
  }, [])

  // 设置总数
  const setTotal = useCallback((total: number) => {
    setState(prev => ({
      ...prev,
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
    storageUtils.clearUserSession()
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

  // 验证是否已登录
  const isLoggedIn = useCallback(() => {
    return state.userSession !== null && isSessionValid()
  }, [state.userSession, isSessionValid])

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
    setUserSession,
    updateSessionActivity,
    isSessionValid,
    isLoggedIn,
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
    toggleTheme,
    resetState,
    isConfigValid,
    getTimeRange,
  }
}