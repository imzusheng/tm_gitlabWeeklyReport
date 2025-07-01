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

export class ApiError extends Error {
  status: number
  service: string

  constructor(status: number, message: string, service: string) {
    super(`[${service}] ${message}`)
    this.name = 'ApiError'
    this.status = status
    this.service = service
  }
}

export class ResponseError extends Error {
  service: string

  constructor(message: string, service: string) {
    super(`[${service}] ${message}`)
    this.name = 'ResponseError'
    this.service = service
  }
}

export class ErrorHandler {
  /**
   * 创建API错误
   */
  static createApiError(
    status: number,
    message: string,
    service: string,
  ): ApiError {
    return new ApiError(status, message, service)
  }

  /**
   * 创建响应错误
   */
  static createResponseError(message: string, service: string): ResponseError {
    return new ResponseError(message, service)
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
    if (typeof error === 'string') {
      return error
    }

    if (error instanceof Error) {
      const errorMessages: Record<string, string> = {
        ApiError: error.message,
        NetworkError: error.message,
        ConfigError: error.message,
      }

      if (errorMessages[error.name]) {
        return errorMessages[error.name]
      }

      const messageChecks: { [key: string]: string } = {
        fetch: '网络连接失败，请检查网络连接后重试',
        timeout: '请求超时，请稍后重试',
        CORS: '跨域请求被阻止，请检查服务器配置',
      }

      for (const key in messageChecks) {
        if (error.message.includes(key)) {
          return messageChecks[key]
        }
      }

      return error.message
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
      console.error(
        `${timestamp} ${contextInfo}${error.name}: ${error.message}`,
        error.stack,
      )
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
    context?: string,
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
    context?: string,
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
    details?: string,
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
    if (!(error instanceof Error)) {
      return false
    }
    const networkErrorSignatures = [
      'NetworkError',
      'fetch',
      'network',
      'timeout',
    ]
    return (
      networkErrorSignatures.some(sig => error.message.includes(sig)) ||
      error.name === 'NetworkError'
    )
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
