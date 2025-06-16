import { STORAGE_KEYS } from '@/constants'
import { AppConfig } from '@/types'

/**
 * 日期工具函数
 */
export const dateUtils = {
  /**
   * 获取当前日期的字符串表示 (YYYY-MM-DD)
   */
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]
  },

  /**
   * 获取一周前的日期
   */
  getWeekAgo(): string {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date.toISOString().split('T')[0]
  },

  /**
   * 格式化日期为可读格式
   */
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('zh-CN')
  },

  /**
   * 验证日期格式
   */
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null
  },
}

/**
 * 存储工具函数
 */
export const storageUtils = {
  /**
   * 保存配置到存储
   */
  saveConfig(config: AppConfig): void {
    if (typeof window !== 'undefined') {
      try {
        if (typeof GM_setValue !== 'undefined') {
          // 油猴脚本环境
          GM_setValue(STORAGE_KEYS.CONFIG, JSON.stringify(config))
        } else {
          // Web环境
          localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
        }
      } catch (error) {
        console.error('保存配置失败:', error)
      }
    }
  },

  /**
   * 从存储读取配置
   */
  loadConfig(): AppConfig | null {
    if (typeof window !== 'undefined') {
      try {
        let configStr: string | null = null
        
        if (typeof GM_getValue !== 'undefined') {
          // 油猴脚本环境
          configStr = GM_getValue(STORAGE_KEYS.CONFIG, null)
        } else {
          // Web环境
          configStr = localStorage.getItem(STORAGE_KEYS.CONFIG)
        }

        return configStr ? JSON.parse(configStr) : null
      } catch (error) {
        console.error('读取配置失败:', error)
        return null
      }
    }
    return null
  },

  /**
   * 清除存储的配置
   */
  clearConfig(): void {
    if (typeof window !== 'undefined') {
      try {
        if (typeof GM_deleteValue !== 'undefined') {
          // 油猴脚本环境
          GM_deleteValue(STORAGE_KEYS.CONFIG)
        } else {
          // Web环境
          localStorage.removeItem(STORAGE_KEYS.CONFIG)
        }
      } catch (error) {
        console.error('清除配置失败:', error)
      }
    }
  },
}

/**
 * URL验证工具
 */
export const urlUtils = {
  /**
   * 验证GitLab URL格式
   */
  isValidGitLabUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url)
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
    } catch {
      return false
    }
  },

  /**
   * 标准化GitLab URL（移除末尾斜杠）
   */
  normalizeGitLabUrl(url: string): string {
    return url.replace(/\/$/, '')
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