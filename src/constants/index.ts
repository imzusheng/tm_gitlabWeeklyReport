import type { AITaskType, AITaskConfig } from '@/types'

// 应用版本信息
// 从 package.json 读取版本号
import packageJson from '../../package.json'
export const APP_VERSION = packageJson.version

// API配置
export const API_CONFIG = {
  DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
  REQUEST_TIMEOUT: 30 * 1000, // 30秒
  MAX_RETRY_ATTEMPTS: 3,
}

// 默认配置
export const DEFAULT_CONFIG = {
  gitlabUrl: 'https://www.lejuhub.com/api/v4',
  gitlabToken: '',
  deepseekApiKey: '',
  defaultPrompt:
    '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
  tokenLimit: 4000, // 默认token限制
  model: 'deepseek-chat',
  customPrompt: '',
  theme: 'system' as const,
}

// 配置占位符
export const CONFIG_PLACEHOLDERS = {
  gitlabUrl: 'https://gitlab.example.com',
  gitlabToken: '请输入您的GitLab Personal Access Token',
  deepseekApiKey: '请输入您的DeepSeek API Key',
  defaultPrompt: '请根据以下GitLab事件数据生成工作周报...',
}

// 筛选条件默认值
export const DEFAULT_FILTER_CONDITIONS = {
  timeRange: 'week' as const,
  targetType: [],
  action: [],
}

// 排序选项默认值
export const DEFAULT_SORT_OPTIONS = {
  field: 'created_at' as const,
  order: 'desc' as const,
}

// 分页选项默认值
export const DEFAULT_PAGINATION_OPTIONS = {
  page: 1,
  pageSize: 50, // 每页显示数量
  total: 0,
}

// 存储键名
export const STORAGE_KEYS = {
  CONFIG: 'gitlab_weekly_report_config',
  THEME: 'gitlab_weekly_report_theme',
  LAST_REPORT: 'gitlab_weekly_report_last',
} as const

// 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD'

// 错误消息
export const ERROR_MESSAGES = {
  INVALID_GITLAB_URL: 'GitLab地址格式不正确',
  INVALID_TOKEN: 'Token格式不正确或已过期',
  NETWORK_ERROR: '网络连接错误，请检查网络设置',
  API_RATE_LIMIT: 'API调用频率超限，请稍后重试',
  INSUFFICIENT_DATA: '数据不足，无法生成周报',
  GENERATION_FAILED: '周报生成失败，请重试',
}

// AI任务配置常量
export const AI_TASK_CONFIGS: Record<AITaskType, AITaskConfig> = {
  'weekly-report': {
    type: 'weekly-report',
    title: 'AI 周报生成',
    buttonText: 'AI 周报',
    defaultPrompt:
      '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
    description: '基于选中的GitLab事件数据生成专业的工作周报',
    placeholder: '请输入用于生成周报的提示词...',
    loadingText: 'AI 正在分析事件数据，生成周报中...',
    emptyTitle: '准备生成 AI 周报',
    emptyDescription:
      '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
    generateButtonText: '生成周报',
    regenerateButtonText: '重新生成',
  },
  custom: {
    type: 'custom',
    title: 'AI 内容生成',
    buttonText: 'AI 生成',
    defaultPrompt: '请根据提供的数据生成相应的内容...',
    description: '基于数据使用自定义提示词生成内容',
    placeholder: '请输入自定义提示词...',
    loadingText: 'AI 正在处理数据，生成内容中...',
    emptyTitle: '准备生成 AI 内容',
    emptyDescription: '点击"生成内容"按钮，AI 将基于您的自定义提示词生成内容',
    generateButtonText: '生成内容',
    regenerateButtonText: '重新生成',
  },
}
