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

  /**
   * 相对时间
   */
  timeAgo: (date: Date | string): string => {
    const now = new Date()
    const target = new Date(date)
    const diff = now.getTime() - target.getTime()

    const SECONDS_PER_MINUTE = 60
    const MINUTES_PER_HOUR = 60
    const HOURS_PER_DAY = 24
    const MILLISECONDS_PER_SECOND = 1000

    const seconds = Math.floor(diff / MILLISECONDS_PER_SECOND)
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
    const hours = Math.floor(minutes / MINUTES_PER_HOUR)
    const days = Math.floor(hours / HOURS_PER_DAY)

    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    if (minutes > 0) return `${minutes}分钟前`
    return '刚刚'
  },

  /**
   * 验证日期
   */
  isValidDate: (date: string): boolean => {
    return !isNaN(Date.parse(date))
  },

  /**
   * 获取日期范围
   */
  getDateRange: (days: number): { start: string; end: string } => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    }
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

  /**
   * 规范化URL
   */
  normalizeUrl: (url: string): string => {
    return url.replace(/\/+$/, '')
  },
}

/**
 * 文件导出工具
 */
export const exportUtils = {
  /**
   * 导出文本内容为文件
   */
  exportTextAsFile(
    content: string,
    filename: string,
    mimeType = 'text/plain',
  ): void {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  },

  /**
   * 导出周报为Markdown文件
   */
  exportReportAsMarkdown(report: string, dateRange: string): void {
    const filename = `gitlab-weekly-report-${dateRange}.md`
    const content = `# GitLab 周报\n\n**时间范围**: ${dateRange}\n**生成时间**: ${new Date().toLocaleString('zh-CN')}\n\n---\n\n${report}`

    this.exportTextAsFile(content, filename, 'text/markdown')
  },
}

/**
 * 错误处理工具
 */
export const errorUtils = {
  /**
   * 提取错误消息
   */
  getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === 'string') {
      return error
    }
    return '未知错误'
  },

  /**
   * 判断是否为网络错误
   */
  isNetworkError(error: unknown): boolean {
    const message = this.getErrorMessage(error).toLowerCase()
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('连接')
    )
  },

  /**
   * 处理GitLab API错误
   */
  handleGitLabError(error: unknown): string {
    const message = this.getErrorMessage(error)

    if (message.includes('429')) {
      return '请求过于频繁，请稍后再试'
    }

    if (message.includes('401') || message.includes('403')) {
      return 'GitLab Token 无效或权限不足，请检查配置'
    }

    if (message.includes('404')) {
      return 'GitLab API 地址不正确，请检查配置'
    }

    if (this.isNetworkError(error)) {
      return '网络连接失败，请检查网络设置'
    }

    return `加载失败: ${message}`
  },

  /**
   * 处理DeepSeek API错误
   */
  handleDeepSeekError(error: unknown): string {
    const message = this.getErrorMessage(error)

    if (message.includes('401') || message.includes('403')) {
      return 'DeepSeek API Key 无效或权限不足，请检查配置'
    }

    if (message.includes('429')) {
      return 'DeepSeek API 请求过于频繁，请稍后再试'
    }

    if (
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503')
    ) {
      return 'DeepSeek API 服务暂时不可用，请稍后再试'
    }

    if (this.isNetworkError(error)) {
      return '网络连接失败，请检查网络设置'
    }

    return `DeepSeek API 调用失败: ${message}`
  },

  /**
   * 通用错误处理
   */
  handleGenericError(error: unknown, defaultMessage = '操作失败'): string {
    if (this.isNetworkError(error)) {
      return '网络连接失败，请检查网络设置'
    }

    const message = this.getErrorMessage(error)
    return message || defaultMessage
  },

  /**
   * 创建标准化的API错误
   */
  createApiError(status: number, statusText: string, apiName = 'API'): Error {
    return new Error(`${apiName} Error: ${status} ${statusText}`)
  },

  /**
   * 创建标准化的响应错误
   */
  createResponseError(message: string, apiName = 'API'): Error {
    return new Error(`${apiName} 返回了${message}`)
  },

  /**
   * 配置验证错误消息
   */
  configErrors: {
    INCOMPLETE_GITLAB_DEEPSEEK: '请先完善GitLab和DeepSeek配置信息',
    INCOMPLETE_CONFIG: '请先完善配置信息',
    NO_EVENTS_SELECTED: '请至少选择一个事件来生成周报',
    INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置',
  } as const,
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastExecTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime >= delay) {
      func(...args)
      lastExecTime = currentTime
    }
  }
}
