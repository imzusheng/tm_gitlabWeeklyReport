import type {
  DeepSeekMessage,
  DeepSeekRequest,
  DeepSeekResponse,
  DeepSeekBalance,
  DeepSeekModel,
  GitLabEvent
} from '../types';
import { STORAGE_KEYS, API_ENDPOINTS, DEFAULT_CONFIG } from '../utils/constants';
import { getStorageValue } from '../utils/storage';
import { formatTime } from '../utils';

/**
 * DeepSeek API 服务类
 */
export class DeepSeekService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = getStorageValue(STORAGE_KEYS.DEEPSEEK_API_KEY, '') as string;
    this.baseUrl = API_ENDPOINTS.DEEPSEEK_BASE;
  }

  /**
   * 更新 API Key
   */
  updateApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * 检查配置是否完整
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * 生成周报
   * @param events GitLab 事件列表
   * @param additionalPrompt 附加提示
   * @param model 使用的模型
   */
  async generateReport(
    events: GitLabEvent[],
    additionalPrompt = '',
    model = DEFAULT_CONFIG.deepseek.model
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('DeepSeek API Key 未配置');
    }

    if (events.length === 0) {
      throw new Error('没有可用的事件数据');
    }

    // 构建事件列表文本
    const eventsText = events
      .map((event, index) => 
        `${index + 1}. ${formatTime(event.created_at)} - ${event.target_title || '未知提交'}`
      )
      .join('\n');

    // 构建消息
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: '你是一个专业的周报生成助手，请根据提供的GitLab提交记录，生成一份结构清晰、内容专业的工作周报。'
      },
      {
        role: 'user',
        content: `请根据以下 GitLab 提交记录生成周报：\n\n${eventsText}\n\n${additionalPrompt ? `附加要求：${additionalPrompt}` : ''}`
      }
    ];

    const requestData: DeepSeekRequest = {
      model,
      messages,
      max_tokens: 2000,
      temperature: 0.7,
      stream: false
    };

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'POST',
        url: `${this.baseUrl}${API_ENDPOINTS.DEEPSEEK_CHAT}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestData),
        timeout: 60000,
        onload: (response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              const result: DeepSeekResponse = JSON.parse(response.responseText);
              const content = result.choices?.[0]?.message?.content;
              
              if (content) {
                resolve(content.trim());
              } else {
                reject(new Error('DeepSeek API 返回的内容为空'));
              }
            } else {
              const errorData = JSON.parse(response.responseText);
              reject(new Error(`DeepSeek API 请求失败: ${errorData.error?.message || response.statusText}`));
            }
          } catch (error) {
            reject(new Error(`解析 DeepSeek API 响应失败: ${error instanceof Error ? error.message : '未知错误'}`));
          }
        },
        onerror: () => {
          reject(new Error('DeepSeek API 请求失败，请检查网络连接'));
        },
        ontimeout: () => {
          reject(new Error('DeepSeek API 请求超时，请稍后重试'));
        }
      });
    });
  }

  /**
   * 获取账户余额
   */
  async getBalance(): Promise<DeepSeekBalance> {
    if (!this.isConfigured()) {
      throw new Error('DeepSeek API Key 未配置');
    }

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${this.baseUrl}${API_ENDPOINTS.DEEPSEEK_BALANCE}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000,
        onload: (response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              const balance: DeepSeekBalance = JSON.parse(response.responseText);
              resolve(balance);
            } else {
              const errorData = JSON.parse(response.responseText);
              reject(new Error(`获取余额失败: ${errorData.error?.message || response.statusText}`));
            }
          } catch (error) {
            reject(new Error(`解析余额响应失败: ${error instanceof Error ? error.message : '未知错误'}`));
          }
        },
        onerror: () => {
          reject(new Error('获取余额失败，请检查网络连接'));
        },
        ontimeout: () => {
          reject(new Error('获取余额超时，请稍后重试'));
        }
      });
    });
  }

  /**
   * 获取可用模型列表
   */
  async getModels(): Promise<DeepSeekModel[]> {
    if (!this.isConfigured()) {
      throw new Error('DeepSeek API Key 未配置');
    }

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${this.baseUrl}${API_ENDPOINTS.DEEPSEEK_MODELS}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000,
        onload: (response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              const result = JSON.parse(response.responseText);
              resolve(result.data || []);
            } else {
              const errorData = JSON.parse(response.responseText);
              reject(new Error(`获取模型列表失败: ${errorData.error?.message || response.statusText}`));
            }
          } catch (error) {
            reject(new Error(`解析模型列表响应失败: ${error instanceof Error ? error.message : '未知错误'}`));
          }
        },
        onerror: () => {
          reject(new Error('获取模型列表失败，请检查网络连接'));
        },
        ontimeout: () => {
          reject(new Error('获取模型列表超时，请稍后重试'));
        }
      });
    });
  }

  /**
   * 测试 API 连接
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getModels();
      return true;
    } catch {
      return false;
    }
  }
}

// 导出单例实例
export const deepseekService = new DeepSeekService();