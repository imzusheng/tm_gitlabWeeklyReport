import { GitLabEvent, GitLabProject } from '@/types'
import { API_CONFIG } from '@/constants'

export class GitLabApiService {
  private baseUrl: string
  private token: string

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '') // 移除末尾斜杠
    this.token = token
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/api/${API_CONFIG.GITLAB_API_VERSION}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT),
    })

    if (!response.ok) {
      throw new Error(`GitLab API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * 获取用户信息
   */
  async getCurrentUser() {
    return this.request('/user')
  }

  /**
   * 获取用户的项目列表
   */
  async getUserProjects(): Promise<GitLabProject[]> {
    return this.request('/projects?membership=true&per_page=100')
  }

  /**
   * 获取用户的活动事件
   */
  async getUserEvents(
    startDate: string,
    endDate: string,
    page = 1,
    perPage = 100
  ): Promise<GitLabEvent[]> {
    const params = new URLSearchParams({
      after: startDate,
      before: endDate,
      page: page.toString(),
      per_page: perPage.toString(),
      sort: 'desc',
    })

    return this.request(`/events?${params}`)
  }

  /**
   * 获取所有相关事件（分页处理）
   */
  async getAllUserEvents(startDate: string, endDate: string): Promise<GitLabEvent[]> {
    const allEvents: GitLabEvent[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        const events = await this.getUserEvents(startDate, endDate, page, 100)
        
        if (events.length === 0) {
          hasMore = false
        } else {
          allEvents.push(...events)
          page++
          
          // 防止无限循环，最多获取10页
          if (page > 10) {
            hasMore = false
          }
        }
      } catch (error) {
        console.error(`获取第${page}页事件失败:`, error)
        hasMore = false
      }
    }

    return allEvents
  }

  /**
   * 验证连接和Token有效性
   */
  async validateConnection(): Promise<boolean> {
    try {
      await this.getCurrentUser()
      return true
    } catch (error) {
      console.error('GitLab连接验证失败:', error)
      return false
    }
  }

  /**
   * 获取项目详情
   */
  async getProject(projectId: number): Promise<GitLabProject> {
    return this.request(`/projects/${projectId}`)
  }
}

/**
 * 创建GitLab API服务实例
 */
export function createGitLabApiService(baseUrl: string, token: string): GitLabApiService {
  return new GitLabApiService(baseUrl, token)
} 