// API 配置
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
  defaultPrompt: '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
  tokenLimit: 1000, // 默认token限制
  model: 'deepseek-chat',
  customPrompt: '',
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
  timeRange: '7d' as const,
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
  pageSize: 20, // 每页显示数量
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

// 油猴脚本配置
export const USERSCRIPT_CONFIG = {
  CONTAINER_ID: 'gitlab-weekly-report-container',
  TRIGGER_SELECTOR: '.navbar-nav',
  INJECT_DELAY: 1000, // 注入延迟时间(ms)
}

// 主题颜色
export const THEME_COLORS = {
  primary: '#007bff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
}

// 错误消息
export const ERROR_MESSAGES = {
  INVALID_GITLAB_URL: 'GitLab地址格式不正确',
  INVALID_TOKEN: 'Token格式不正确或已过期',
  NETWORK_ERROR: '网络连接错误，请检查网络设置',
  API_RATE_LIMIT: 'API调用频率超限，请稍后重试',
  INSUFFICIENT_DATA: '数据不足，无法生成周报',
  GENERATION_FAILED: '周报生成失败，请重试',
}

// 成功消息
export const SUCCESS_MESSAGES = {
  CONFIG_SAVED: '配置保存成功',
  REPORT_GENERATED: '周报生成成功',
  DATA_EXPORTED: '数据导出成功',
}