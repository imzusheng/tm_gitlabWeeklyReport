import { AppConfig } from '@/types'
import { DEFAULT_CONFIG } from '@/constants'
import { storageUtils } from '@/utils'

export interface ConfigState {
  config: AppConfig
  isValid: boolean
}

export type ConfigAction =
  | { type: 'LOAD_CONFIG'; payload?: AppConfig }
  | { type: 'UPDATE_CONFIG'; payload: Partial<AppConfig> }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'RESET_CONFIG' }

/**
 * 验证配置是否完整
 */
const validateConfig = (config: AppConfig): boolean => {
  const requiredFields: (keyof AppConfig)[] = [
    'gitlabUrl',
    'gitlabToken',
    'deepseekApiKey',
    'defaultPrompt',
  ]
  return requiredFields.every(field => {
    const value = config[field]
    return typeof value === 'string' ? value.trim() !== '' : !!value
  })
}

export const configReducer = (
  state: ConfigState,
  action: ConfigAction,
): ConfigState => {
  switch (action.type) {
    case 'LOAD_CONFIG': {
      const config = action.payload || DEFAULT_CONFIG
      return {
        config,
        isValid: validateConfig(config),
      }
    }

    case 'UPDATE_CONFIG': {
      const newConfig = { ...state.config, ...action.payload }
      storageUtils.saveConfig(newConfig)
      return {
        config: newConfig,
        isValid: validateConfig(newConfig),
      }
    }

    case 'SET_THEME': {
      const newConfig = { ...state.config, theme: action.payload }
      storageUtils.saveConfig(newConfig)
      return {
        config: newConfig,
        isValid: state.isValid,
      }
    }

    case 'RESET_CONFIG': {
      storageUtils.clearConfig()
      return {
        config: DEFAULT_CONFIG,
        isValid: false,
      }
    }

    default:
      return state
  }
}

export const initialConfigState: ConfigState = {
  config: DEFAULT_CONFIG,
  isValid: false,
}
