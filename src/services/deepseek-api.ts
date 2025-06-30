import { DeepSeekMessage, DeepSeekResponse } from '@/types'
import { API_CONFIG } from '@/constants'
import { request, isUserscriptEnvironment } from '@/utils/request'
import { errorUtils } from '@/utils'

export class DeepSeekApiService {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    // 在开发环境中且不是油猴脚本环境时，使用代理URL
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev && !isUserscriptEnvironment()) {
      this.baseUrl = '/api/deepseek/v1'
    } else {
      this.baseUrl = API_CONFIG.DEEPSEEK_BASE_URL
    }
  }

  /**
   * 生成聊天回复
   */
  async generateChat(
    messages: DeepSeekMessage[],
    model = 'deepseek-chat',
    maxTokens = 4000,
  ): Promise<string> {
    const response = await request(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
      timeout: API_CONFIG.REQUEST_TIMEOUT,
    })

    if (!response.ok) {
      throw errorUtils.createApiError(
        response.status,
        response.statusText,
        'DeepSeek API',
      )
    }

    const data: DeepSeekResponse = (await response.json()) as DeepSeekResponse

    if (!data.choices || data.choices.length === 0) {
      throw errorUtils.createResponseError('空的响应', 'DeepSeek API')
    }

    return data.choices[0].message.content
  }

  /**
   * 生成周报
   */
  async generateWeeklyReport(
    eventsData: string,
    prompt: string,
    model = 'deepseek-chat',
    maxTokens = 4000,
  ): Promise<{ content: string; tokensUsed: number }> {
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: `以下是GitLab事件数据：\n\n${eventsData}\n\n请根据这些数据生成工作周报。`,
      },
    ]

    const response = await request(
      `${API_CONFIG.DEEPSEEK_BASE_URL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
        timeout: API_CONFIG.REQUEST_TIMEOUT,
      },
    )

    if (!response.ok) {
      throw errorUtils.createApiError(
        response.status,
        response.statusText,
        'DeepSeek API',
      )
    }

    const data: DeepSeekResponse = (await response.json()) as DeepSeekResponse

    if (!data.choices || data.choices.length === 0) {
      throw errorUtils.createResponseError('空的响应', 'DeepSeek API')
    }

    return {
      content: data.choices[0].message.content,
      tokensUsed: data.usage?.total_tokens || 0,
    }
  }

  /**
   * 验证API Key有效性
   */
  async validateApiKey(): Promise<boolean> {
    try {
      await this.generateChat(
        [{ role: 'user', content: 'Hello' }],
        'deepseek-chat',
        10,
      )
      return true
    } catch (error) {
      return false
    }
  }
}

/**
 * 创建DeepSeek API服务实例
 */
export function createDeepSeekApiService(apiKey: string): DeepSeekApiService {
  return new DeepSeekApiService(apiKey)
}
