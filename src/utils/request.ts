/**
 * 网络请求适配层
 * 使用 Web 环境的 fetch API
 */

// 请求选项接口
export interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: string
  timeout?: number
  signal?: AbortSignal
}

// 响应接口
export interface RequestResponse {
  ok: boolean
  status: number
  statusText: string
  headers: Headers | Record<string, string>
  json: () => Promise<unknown>
  text: () => Promise<string>
}

/**
 * 统一的网络请求函数
 * 使用 fetch API
 */
export async function request(
  url: string,
  options: RequestOptions = {},
): Promise<RequestResponse> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = 30000,
    signal,
  } = options

  // 处理 timeout 和 signal 的合并
  let abortController: AbortController | null = null
  let timeoutId: NodeJS.Timeout | null = null
  let finalSignal = signal

  if (timeout > 0 || signal) {
    abortController = new AbortController()
    finalSignal = abortController.signal

    // 设置超时
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        abortController?.abort()
      }, timeout)
    }

    // 监听外部 signal
    if (signal) {
      signal.addEventListener('abort', () => {
        abortController?.abort()
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      })
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
    signal: finalSignal,
  }

  try {
    const response = await fetch(url, fetchOptions)
    // 成功响应后清理定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      json: () => response.json(),
      text: () => response.text(),
    }
  } catch (error) {
    // 清理定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network request failed')
  }
}

/**
 * 存储适配层
 * 使用 Web localStorage
 */
export const storageAdapter = {
  /**
   * 设置存储值
   */
  setItem: (key: string, value: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value)
      } else {
        console.warn('localStorage is not available')
      }
    } catch (error) {
      console.error('Storage setItem failed:', error)
    }
  },

  /**
   * 获取存储值
   */
  getItem: (key: string): string | null => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      } else {
        console.warn('localStorage is not available')
        return null
      }
    } catch (error) {
      console.error('Storage getItem failed:', error)
      return null
    }
  },

  /**
   * 删除存储值
   */
  removeItem: (key: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
      } else {
        console.warn('localStorage is not available')
      }
    } catch (error) {
      console.error('Storage removeItem failed:', error)
    }
  },
}
