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
  formatDate: (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ): string => {
    const d = new Date(date)
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }
    return new Intl.DateTimeFormat('zh-CN', {
      ...defaultOptions,
      ...options,
    }).format(d)
  },
}

/**
 * 存储工具函数
 */
const withStorageFallback = <T>(
  operation: (storage: typeof storageAdapter | Storage) => T,
) => {
  try {
    return operation(storageAdapter)
  } catch (error) {
    if (typeof localStorage !== 'undefined') {
      try {
        return operation(localStorage)
      } catch (fallbackError) {
        // 静默处理降级存储失败
      }
    }
  }
}

export const storageUtils = {
  /**
   * 保存配置
   */
  saveConfig: (config: AppConfig): void => {
    withStorageFallback(storage =>
      storage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config)),
    )
  },

  /**
   * 加载配置
   */
  loadConfig: (): AppConfig | null => {
    const config = withStorageFallback(storage =>
      storage.getItem(STORAGE_KEYS.CONFIG),
    )
    return config ? JSON.parse(config as string) : null
  },

  /**
   * 清除配置
   */
  clearConfig: (): void => {
    withStorageFallback(storage => storage.removeItem(STORAGE_KEYS.CONFIG))
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
