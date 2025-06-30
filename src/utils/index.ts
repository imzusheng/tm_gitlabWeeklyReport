import { AppConfig } from '@/types'
import { storageAdapter } from './request'
import { STORAGE_KEYS } from '@/constants'

/**
 * 日期工具函数
 */
export const dateUtils = {
  /**
   * 格式化日期
   */
  formatDate: (date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  },
}

/**
 * 存储工具函数
 */
export const storageUtils = {
  /**
   * 保存配置
   */
  saveConfig: (config: AppConfig): void => {
    try {
      storageAdapter.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
    } catch (error) {
      // 降级到 localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
      }
    }
  },

  /**
   * 加载配置
   */
  loadConfig: (): AppConfig | null => {
    try {
      const config = storageAdapter.getItem(STORAGE_KEYS.CONFIG)
      return config ? JSON.parse(config) : null
    } catch (error) {
      // 降级到 localStorage
      try {
        if (typeof localStorage !== 'undefined') {
          const config = localStorage.getItem(STORAGE_KEYS.CONFIG)
          return config ? JSON.parse(config) : null
        }
      } catch (fallbackError) {
        // 静默处理降级存储失败
      }
      return null
    }
  },

  /**
   * 清除配置
   */
  clearConfig: (): void => {
    try {
      storageAdapter.removeItem(STORAGE_KEYS.CONFIG)
    } catch (error) {
      // 降级到 localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.CONFIG)
      }
    }
  },
}

/**
 * URL验证工具
 */
export const urlUtils = {
  /**
   * 验证GitLab URL
   */
  isValidGitLabUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  },
}

// 旧的错误处理工具已移动到 ./error.ts
// 保持向后兼容性的配置错误常量
export const configErrors = {
  INCOMPLETE_GITLAB_DEEPSEEK: '请先完善GitLab和DeepSeek配置信息',
  INCOMPLETE_CONFIG: '请先完善配置信息',
  NO_EVENTS_SELECTED: '请至少选择一个事件来生成周报',
  INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置',
} as const

// 导出错误处理工具
export * from './error'
export { ErrorHandler as errorUtils } from './error'
