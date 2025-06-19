/**
 * 网络请求适配层
 * 支持 Web 环境的 fetch 和油猴脚本环境的 GM_xmlhttpRequest
 */

// 检测是否在油猴脚本环境中
export const isUserscriptEnvironment = (): boolean => {
  return (
    typeof window !== 'undefined' && typeof GM_xmlhttpRequest !== 'undefined'
  )
}

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
  json: () => Promise<any>
  text: () => Promise<string>
}

/**
 * 统一的网络请求函数
 * 自动检测环境并使用合适的请求方法
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

  if (isUserscriptEnvironment()) {
    // 油猴脚本环境：使用 GM_xmlhttpRequest
    return new Promise((resolve, reject) => {
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      }

      let timeoutId: number | undefined

      if (timeout > 0) {
        timeoutId = window.setTimeout(() => {
          reject(new Error('Request timeout'))
        }, timeout)
      }

      // 检查取消信号
      if (signal?.aborted) {
        reject(new Error('Request aborted'))
        return
      }

      const abortHandler = () => {
        if (timeoutId) clearTimeout(timeoutId)
        reject(new Error('Request aborted'))
      }

      signal?.addEventListener('abort', abortHandler)

      GM_xmlhttpRequest({
        method: method.toUpperCase(),
        url,
        headers: requestHeaders,
        data: body,
        timeout,
        onload: response => {
          if (timeoutId) clearTimeout(timeoutId)
          signal?.removeEventListener('abort', abortHandler)

          const mockResponse: RequestResponse = {
            ok: response.status >= 200 && response.status < 300,
            status: response.status,
            statusText: response.statusText,
            headers: parseResponseHeaders(response.responseHeaders),
            json: async () => {
              try {
                return JSON.parse(response.responseText)
              } catch (error) {
                throw new Error('Invalid JSON response')
              }
            },
            text: async () => response.responseText,
          }

          resolve(mockResponse)
        },
        onerror: error => {
          if (timeoutId) clearTimeout(timeoutId)
          signal?.removeEventListener('abort', abortHandler)
          reject(new Error(`Network error: ${error.error || 'Unknown error'}`))
        },
        ontimeout: () => {
          if (timeoutId) clearTimeout(timeoutId)
          signal?.removeEventListener('abort', abortHandler)
          reject(new Error('Request timeout'))
        },
      })
    })
  } else {
    // Web 环境：使用 fetch
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      signal,
    }

    if (timeout > 0 && !signal) {
      fetchOptions.signal = AbortSignal.timeout(timeout)
    }

    try {
      const response = await fetch(url, fetchOptions)

      return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        json: () => response.json(),
        text: () => response.text(),
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network request failed')
    }
  }
}

/**
 * 解析响应头字符串为对象
 */
const parseResponseHeaders = (headerString: string): Record<string, string> => {
  const headers: Record<string, string> = {}

  if (!headerString) return headers

  headerString.split('\n').forEach(line => {
    const parts = line.split(': ')
    if (parts.length === 2) {
      headers[parts[0].toLowerCase()] = parts[1]
    }
  })

  return headers
}

/**
 * 存储适配层
 * 支持 Web localStorage 和油猴脚本的 GM_setValue/GM_getValue
 */
export const storageAdapter = {
  /**
   * 设置存储值
   */
  setItem: (key: string, value: string): void => {
    try {
      if (isUserscriptEnvironment() && typeof GM_setValue !== 'undefined') {
        GM_setValue(key, value)
      } else if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value)
      } else {
        console.warn('No storage method available')
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
      if (isUserscriptEnvironment() && typeof GM_getValue !== 'undefined') {
        return GM_getValue(key, null)
      } else if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      } else {
        console.warn('No storage method available')
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
      if (isUserscriptEnvironment() && typeof GM_deleteValue !== 'undefined') {
        GM_deleteValue(key)
      } else if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
      } else {
        console.warn('No storage method available')
      }
    } catch (error) {
      console.error('Storage removeItem failed:', error)
    }
  },
}

// 声明油猴脚本的全局函数类型
declare global {
  function GM_xmlhttpRequest(details: {
    method: string
    url: string
    headers?: Record<string, string>
    data?: string
    timeout?: number
    onload: (response: {
      status: number
      statusText: string
      responseText: string
      responseHeaders: string
    }) => void
    onerror: (error: { error?: string }) => void
    ontimeout: () => void
  }): void

  function GM_setValue(key: string, value: string): void
  function GM_getValue(key: string, defaultValue?: string | null): string | null
  function GM_deleteValue(key: string): void
}
