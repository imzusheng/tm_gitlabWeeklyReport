/**
 * 错误处理工具类
 * 提供统一的错误处理和用户友好的错误信息
 */

export interface AppError {
  code: string
  message: string
  details?: string
  timestamp: number
}

export class ErrorHandler {
  /**
   * 创建API错误
   */
  static createApiError(status: number, message: string, service: string): Error {
    const error = new Error(`[${service}] ${message}`)
    error.name = 'ApiError'
    ;(error as any).status = status
    ;(error as any).service = service
    return error
  }

  /**
   * 创建响应错误
   */
  static createResponseError(message: string, service: string): Error {
    const error = new Error(`[${service}] ${message}`)
    error.name = 'ResponseError'
    ;(error as any).service = service
    return error
  }

  /**
   * 创建网络错误
   */
  static createNetworkError(message: string): Error {
    const error = new Error(`网络错误: ${message}`)
    error.name = 'NetworkError'
    return error
  }

  /**
   * 创建配置错误
   */
  static createConfigError(message: string): Error {
    const error = new Error(`配置错误: ${message}`)
    error.name = 'ConfigError'
    return error
  }

  /**
   * 格式化错误信息为用户友好的格式
   */
  static formatErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      // 处理已知的错误类型
      if (error.name === 'ApiError') {
        return error.message
      }
      if (error.name === 'NetworkError') {
        return error.message
      }
      if (error.name === 'ConfigError') {
        return error.message
      }
      
      // 处理常见的错误模式
      if (error.message.includes('fetch')) {
        return '网络连接失败，请检查网络连接后重试'
      }
      if (error.message.includes('timeout')) {
        return '请求超时，请稍后重试'
      }
      if (error.message.includes('CORS')) {
        return '跨域请求被阻止，请检查服务器配置'
      }
      
      return error.message
    }
    
    if (typeof error === 'string') {
      return error
    }
    
    return '发生未知错误，请稍后重试'
  }

  /**
   * 记录错误日志
   */
  static logError(error: unknown, context?: string): void {
    const timestamp = new Date().toISOString()
    const contextInfo = context ? `[${context}] ` : ''
    
    if (error instanceof Error) {
      console.error(`${timestamp} ${contextInfo}${error.name}: ${error.message}`, error.stack)
    } else {
      console.error(`${timestamp} ${contextInfo}Unknown error:`, error)
    }
  }

  /**
   * 安全地执行异步操作，自动处理错误
   */
  static async safeAsync<T>(
    operation: () => Promise<T>,
    fallback?: T,
    context?: string
  ): Promise<T | undefined> {
    try {
      return await operation()
    } catch (error) {
      this.logError(error, context)
      return fallback
    }
  }

  /**
   * 安全地执行同步操作，自动处理错误
   */
  static safeSync<T>(
    operation: () => T,
    fallback?: T,
    context?: string
  ): T | undefined {
    try {
      return operation()
    } catch (error) {
      this.logError(error, context)
      return fallback
    }
  }

  /**
   * 创建应用错误对象
   */
  static createAppError(
    code: string,
    message: string,
    details?: string
  ): AppError {
    return {
      code,
      message,
      details,
      timestamp: Date.now(),
    }
  }

  /**
   * 判断是否为取消错误
   */
  static isAbortError(error: unknown): boolean {
    return error instanceof Error && error.name === 'AbortError'
  }

  /**
   * 判断是否为网络错误
   */
  static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return (
        error.name === 'NetworkError' ||
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('timeout')
      )
    }
    return false
  }
}

// 导出常用的错误处理函数
export const {
  createApiError,
  createResponseError,
  createNetworkError,
  createConfigError,
  formatErrorMessage,
  logError,
  safeAsync,
  safeSync,
  createAppError,
  isAbortError,
  isNetworkError,
} = ErrorHandler