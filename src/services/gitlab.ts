import type { GitLabEvent, GitLabEventsResponse } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants';
import { getStorageValue } from '../utils/storage';

/**
 * GitLab API 服务类
 */
export class GitLabService {
  private baseUrl: string;
  private accessToken: string;
  private projectId: string;

  constructor() {
    this.baseUrl = getStorageValue(STORAGE_KEYS.GITLAB_URL, '') as string;
    this.accessToken = getStorageValue(STORAGE_KEYS.GITLAB_TOKEN, '') as string;
    this.projectId = getStorageValue(STORAGE_KEYS.GITLAB_PROJECT_ID, '') as string;
  }

  /**
   * 更新配置
   */
  updateConfig(baseUrl: string, accessToken: string, projectId: string): void {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.projectId = projectId;
  }

  /**
   * 检查配置是否完整
   */
  isConfigured(): boolean {
    return !!(this.baseUrl && this.accessToken && this.projectId);
  }

  /**
   * 获取用户事件
   * @param after 开始时间
   * @param before 结束时间
   * @param page 页码
   * @param perPage 每页数量
   */
  async getEvents(
    after: string,
    before: string,
    page = 1,
    perPage = 100
  ): Promise<GitLabEventsResponse> {
    if (!this.isConfigured()) {
      throw new Error('GitLab 配置不完整，请先配置 GitLab URL、Access Token 和项目 ID');
    }

    const url = `${this.baseUrl}${API_ENDPOINTS.GITLAB_EVENTS.replace(':id', this.projectId)}
      ?after=${encodeURIComponent(after)}
      &before=${encodeURIComponent(before)}
      &page=${page}
      &per_page=${perPage}
      &action=pushed`;

    return new Promise((resolve, reject) => {
      if (typeof GM_xmlhttpRequest === 'undefined') {
        reject(new Error('GM_xmlhttpRequest 不可用，请确保在油猴脚本环境中运行'));
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url,
        headers: {
          'PRIVATE-TOKEN': this.accessToken,
          'Content-Type': 'application/json'
        },
        timeout: 30000,
        onload: (response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              const events: GitLabEvent[] = JSON.parse(response.responseText);
              const totalPages = parseInt(response.responseHeaders.match(/X-Total-Pages: (\d+)/)?.[1] || '1');
              const totalCount = parseInt(response.responseHeaders.match(/X-Total: (\d+)/)?.[1] || '0');
              
              resolve(events);
            } else {
              reject(new Error(`GitLab API 请求失败: ${response.status} ${response.statusText}`));
            }
          } catch (error) {
            reject(new Error(`解析 GitLab API 响应失败: ${error instanceof Error ? error.message : '未知错误'}`));
          }
        },
        onerror: () => {
          reject(new Error('GitLab API 请求失败，请检查网络连接和配置'));
        },
        ontimeout: () => {
          reject(new Error('GitLab API 请求超时，请稍后重试'));
        }
      });
    });
  }

  /**
   * 获取所有事件（自动分页）
   * @param after 开始时间
   * @param before 结束时间
   * @param onProgress 进度回调
   */
  async getAllEvents(
    after: string,
    before: string,
    onProgress?: (current: number, total: number) => void
  ): Promise<GitLabEvent[]> {
    const allEvents: GitLabEvent[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const events = await this.getEvents(after, before, page, 100);
      allEvents.push(...events);
      
      // 如果返回的事件数量少于每页数量，说明已经是最后一页
      if (events.length < 100) {
        totalPages = page;
      } else {
        totalPages = page + 1; // 假设还有下一页
      }
      
      onProgress?.(page, totalPages);
      page++;
    } while (page <= totalPages && allEvents.length > 0);

    return allEvents;
  }

  /**
   * 测试连接
   */
  async testConnection(): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new Error('GitLab 配置不完整');
    }

    const url = `${this.baseUrl}/api/v4/user`;

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        headers: {
          'PRIVATE-TOKEN': this.accessToken,
          'Content-Type': 'application/json'
        },
        timeout: 10000,
        onload: (response) => {
          resolve(response.status >= 200 && response.status < 300);
        },
        onerror: () => resolve(false),
        ontimeout: () => resolve(false)
      });
    });
  }
}

// 导出单例实例
export const gitlabService = new GitLabService();