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
      throw errorUtils.createApiError(response.status, errorText || response.statusText, 'GitLab API')
    }

    return response.json()
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
      console.error('GitLab服务初始化失败:', error)
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
      after?: string        // 开始日期
      before?: string       // 结束日期
      action?: string[]     // 操作类型筛选
      target_type?: string[] // 目标类型筛选
      sort?: 'asc' | 'desc' // 排序方式
      page?: number         // 页码
      per_page?: number     // 每页数量
    } = {}
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
    const endpoint = queryString ? 
      `/users/${userId}/events?${queryString}` : 
      `/users/${userId}/events`

    return this.request(endpoint)
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
