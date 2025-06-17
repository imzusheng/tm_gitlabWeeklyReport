

import { storageAdapter } from './request'

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

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

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
  saveConfig: (config: any): void => {
    try {
      storageAdapter.setItem('gitlab-weekly-config', JSON.stringify(config))
    } catch (error) {
      console.error('保存配置失败:', error)
      // 降级到 localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('gitlab-weekly-config', JSON.stringify(config))
      }
    }
  },

  /**
   * 加载配置
   */
  loadConfig: (): any | null => {
    try {
      const config = storageAdapter.getItem('gitlab-weekly-config')
      return config ? JSON.parse(config) : null
    } catch (error) {
      console.error('加载配置失败:', error)
      // 降级到 localStorage
      try {
        if (typeof localStorage !== 'undefined') {
          const config = localStorage.getItem('gitlab-weekly-config')
          return config ? JSON.parse(config) : null
        }
      } catch (fallbackError) {
        console.error('降级存储加载失败:', fallbackError)
      }
      return null
    }
  },

  /**
   * 清除配置
   */
  clearConfig: (): void => {
    try {
      storageAdapter.removeItem('gitlab-weekly-config')
    } catch (error) {
      console.error('清除配置失败:', error)
      // 降级到 localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('gitlab-weekly-config')
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
  exportTextAsFile(content: string, filename: string, mimeType = 'text/plain'): void {
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
    return message.includes('network') || 
           message.includes('fetch') || 
           message.includes('timeout') ||
           message.includes('连接')
  },
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
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
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
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

 