import { GitLabEvent, GitLabProject, GitLabUser } from '@/types'
import { API_CONFIG } from '@/constants'
import { request, isUserscriptEnvironment } from '@/utils/request'
import { errorUtils } from '@/utils'

export class GitLabApiService {
  private baseUrl: string
  private token: string
  private currentUser: GitLabUser | null = null

  constructor(baseUrl: string, token: string) {
    // 在开发环境中且不是油猴脚本环境时，使用代理URL
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev && !isUserscriptEnvironment()) {
      // 将GitLab URL转换为代理URL
      this.baseUrl = '/proxy/api/v4'
    } else {
      this.baseUrl = baseUrl.replace(/\/$/, '') // 移除末尾斜杠
    }
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: { method?: string; body?: string } = {},
  ): Promise<T> {
    // 构建URL
    const url = `${this.baseUrl}${endpoint}`

    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': this.token,
      },
      timeout: API_CONFIG.REQUEST_TIMEOUT,
      body: options.body,
    }

    const response = await request(url, requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      throw errorUtils.createApiError(
        response.status,
        errorText || response.statusText,
        'GitLab API',
      )
    }

    return response.json() as Promise<T>
  }

  /**
   * 验证Token格式
   */
  private validateToken(): boolean {
    if (!this.token) {
      throw new Error('GitLab Token为空')
    }

    if (!this.token.startsWith('glpat-')) {
      // Token格式可能不正确，但仍然尝试使用
    }

    if (this.token.length < 20) {
      throw new Error('GitLab Token长度太短')
    }

    return true
  }

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(): Promise<GitLabUser> {
    if (this.currentUser) {
      return this.currentUser
    }

    // 验证Token格式
    if (!this.validateToken()) {
      throw errorUtils.createResponseError('Token格式无效', 'GitLab API')
    }

    const user = await this.request<GitLabUser>('/user')
    this.currentUser = user
    return user
  }

  /**
   * 初始化GitLab服务
   */
  async init(): Promise<void> {
    try {
      // 验证当前配置是否有效
      await this.getCurrentUser()
    } catch (error) {
      throw new Error('GitLab服务初始化失败，请检查GitLab URL和Token是否正确')
    }
  }

  /**
   * 获取用户项目列表
   */
  async getUserProjects(): Promise<GitLabProject[]> {
    return this.request('/projects?membership=true&per_page=100')
  }

  /**
   * 获取用户事件（统一使用 /users/:id/events 接口）
   * @param userId 用户ID
   * @param options 筛选和分页选项（由后端处理）
   */
  async getUserEvents(
    userId: number,
    options: {
      after?: string // 开始日期
      before?: string // 结束日期
      action?: string[] // 操作类型筛选
      target_type?: string[] // 目标类型筛选
      sort?: 'asc' | 'desc' // 排序方式
      page?: number // 页码
      per_page?: number // 每页数量
    } = {},
  ): Promise<GitLabEvent[]> {
    const params = new URLSearchParams()

    // 添加所有筛选参数，交给后端处理
    if (options.after) params.set('after', options.after)
    if (options.before) params.set('before', options.before)
    if (options.sort) params.set('sort', options.sort)
    if (options.page) params.set('page', options.page.toString())
    if (options.per_page) params.set('per_page', options.per_page.toString())

    // 添加数组类型的筛选参数
    if (options.action) {
      options.action.forEach(action => params.append('action', action))
    }
    if (options.target_type) {
      options.target_type.forEach(type => params.append('target_type', type))
    }

    const queryString = params.toString()
    const endpoint = queryString
      ? `/users/${userId}/events?${queryString}`
      : `/users/${userId}/events`

    return this.request(endpoint)
  }

  /**
   * 获取用户事件并返回总数信息
   * @param userId 用户ID
   * @param options 筛选和分页选项
   * @returns 包含事件数据和总数的对象
   */
  async getUserEventsWithTotal(
    userId: number,
    options: {
      after?: string // 开始日期
      before?: string // 结束日期
      action?: string[] // 操作类型筛选
      target_type?: string[] // 目标类型筛选
      sort?: 'asc' | 'desc' // 排序方式
      page?: number // 页码
      per_page?: number // 每页数量
      signal?: AbortSignal // 取消信号
    } = {},
  ): Promise<{ events: GitLabEvent[]; total: number }> {
    const params = new URLSearchParams()

    // 添加所有筛选参数，交给后端处理
    if (options.after) params.set('after', options.after)
    if (options.before) params.set('before', options.before)
    if (options.sort) params.set('sort', options.sort)
    if (options.page) params.set('page', options.page.toString())
    if (options.per_page) params.set('per_page', options.per_page.toString())

    // 添加数组类型的筛选参数
    if (options.action) {
      options.action.forEach(action => params.append('action', action))
    }
    if (options.target_type) {
      options.target_type.forEach(type => params.append('target_type', type))
    }

    const queryString = params.toString()
    const endpoint = queryString
      ? `/users/${userId}/events?${queryString}`
      : `/users/${userId}/events`

    // 构建URL
    const url = `${this.baseUrl}${endpoint}`

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': this.token,
      },
      timeout: API_CONFIG.REQUEST_TIMEOUT,
      signal: options.signal, // 传递取消信号
    }

    const response = await request(url, requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      throw errorUtils.createApiError(
        response.status,
        errorText || response.statusText,
        'GitLab API',
      )
    }

    const events = await response.json() as GitLabEvent[]
    
    // 从响应头获取总数
    let total = 0
    let totalHeader = ''
    
    if (response.headers instanceof Headers) {
      // Web环境：使用Headers对象
      totalHeader = response.headers.get('x-total') || 
                   response.headers.get('X-Total') || 
                   response.headers.get('x-total-count') || 
                   response.headers.get('X-Total-Count') || ''
      total = parseInt(totalHeader || '0', 10)
    } else {
      // 油猴脚本环境：响应头可能是字符串格式，需要特殊处理
      if (typeof response.headers === 'string') {
        // 如果是字符串格式（GM_xmlhttpRequest返回的responseHeaders），需要解析
        const headerString = response.headers as string;
        const headerLines = headerString.split('\n');
        
        // 尝试从各种可能的header名称中找到total值
        for (const line of headerLines) {
          const parts = line.split(': ');
          if (parts.length === 2) {
            const headerName = parts[0].toLowerCase();
            const headerValue = parts[1];
            
            if (headerName === 'x-total' || 
                headerName === 'x-total-count' || 
                headerName === 'x_total') {
              totalHeader = headerValue;
              break;
            }
          }
        }
      } else {
        // 如果是对象格式
        const headers = response.headers as Record<string, string>;
        totalHeader = headers['x-total'] || 
                     headers['X-Total'] || 
                     headers['x-total-count'] || 
                     headers['X-Total-Count'] || 
                     headers['x_total'] || 
                     headers['X_TOTAL'] || '';
      }
      
      total = parseInt(totalHeader || '0', 10)
    }
    
    // 调试信息
    console.log('GitLab API Response:', {
      eventsCount: events.length,
      totalHeader,
      calculatedTotal: total,
      isHeadersInstance: response.headers instanceof Headers,
      headersType: typeof response.headers,
      allHeaders: response.headers instanceof Headers 
        ? Object.fromEntries(response.headers.entries())
        : (typeof response.headers === 'string' 
           ? (response.headers as string).split('\n').slice(0, 10).join('; ') // 显示前10行响应头
           : response.headers)
    })
    
    // 如果响应头中没有总数信息，使用事件数组长度作为fallback
    // 注意：GitLab API可能不总是返回x-total头，特别是在分页查询时
    if (total === 0 && events.length > 0) {
      total = events.length
      console.warn('No total count in response headers, using events array length as fallback')
    }

    return { events, total }
  }

  /**
   * 获取项目详情
   */
  async getProject(projectId: number): Promise<GitLabProject> {
    return this.request(`/projects/${projectId}`)
  }

  /**
   * 获取缓存的用户信息
   */
  getCachedUser(): GitLabUser | null {
    return this.currentUser
  }
}

/**
 * 创建GitLab API服务实例
 */
export function createGitLabApiService(
  baseUrl: string,
  token: string,
): GitLabApiService {
  return new GitLabApiService(baseUrl, token)
}
