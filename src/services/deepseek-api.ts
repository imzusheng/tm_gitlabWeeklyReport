import { DeepSeekMessage, DeepSeekResponse, GitLabEvent } from '@/types'
import { API_CONFIG, DEFAULT_PROMPT } from '@/constants'

export class DeepSeekApiService {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request(messages: DeepSeekMessage[]): Promise<DeepSeekResponse> {
    const response = await fetch(`${API_CONFIG.DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * 格式化GitLab事件数据为文本
   */
  private formatEventsToText(events: GitLabEvent[]): string {
    if (events.length === 0) {
      return '本周期内没有GitLab活动记录。'
    }

    const eventsByProject = events.reduce((acc, event) => {
      const projectName = event.project?.path_with_namespace || '未知项目'
      if (!acc[projectName]) {
        acc[projectName] = []
      }
      acc[projectName].push(event)
      return acc
    }, {} as Record<string, GitLabEvent[]>)

    let formattedText = `=== GitLab 活动数据汇总 ===\n\n`
    formattedText += `统计时间范围：${events[events.length - 1]?.created_at?.split('T')[0]} 至 ${events[0]?.created_at?.split('T')[0]}\n`
    formattedText += `总活动数：${events.length} 个\n\n`

    Object.entries(eventsByProject).forEach(([projectName, projectEvents]) => {
      formattedText += `## 项目：${projectName}\n`
      formattedText += `活动数量：${projectEvents.length}\n\n`

      const eventsByType = projectEvents.reduce((acc, event) => {
        const type = event.action_name || event.target_type || '其他'
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      formattedText += `活动分类统计：\n`
      Object.entries(eventsByType).forEach(([type, count]) => {
        formattedText += `- ${type}: ${count} 次\n`
      })

      formattedText += `\n详细活动列表：\n`
      projectEvents.slice(0, 20).forEach((event, index) => {
        const date = event.created_at?.split('T')[0]
        const title = event.title || event.target_title || '无标题'
        formattedText += `${index + 1}. [${date}] ${event.action_name}: ${title}\n`
      })

      if (projectEvents.length > 20) {
        formattedText += `... 还有 ${projectEvents.length - 20} 个活动\n`
      }

      formattedText += `\n`
    })

    return formattedText
  }

  /**
   * 生成周报
   */
  async generateWeeklyReport(
    events: GitLabEvent[], 
    customPrompt?: string
  ): Promise<{ report: string; tokensUsed: number }> {
    const prompt = customPrompt || DEFAULT_PROMPT
    const eventsText = this.formatEventsToText(events)

    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: eventsText,
      },
    ]

    try {
      const response = await this.request(messages)
      
      return {
        report: response.choices[0]?.message?.content || '生成失败',
        tokensUsed: response.usage?.total_tokens || 0,
      }
    } catch (error) {
      console.error('DeepSeek API 调用失败:', error)
      throw new Error('周报生成失败，请检查API配置或重试')
    }
  }

  /**
   * 验证API Key有效性
   */
  async validateApiKey(): Promise<boolean> {
    try {
      const testMessages: DeepSeekMessage[] = [
        {
          role: 'user',
          content: '请回复"测试成功"',
        },
      ]
      
      await this.request(testMessages)
      return true
    } catch (error) {
      console.error('DeepSeek API Key验证失败:', error)
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