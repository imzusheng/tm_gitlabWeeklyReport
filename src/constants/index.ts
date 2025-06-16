// API 配置
export const API_CONFIG = {
  DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
  GITLAB_API_VERSION: 'v4',
  REQUEST_TIMEOUT: 30000,
  MAX_RETRY_ATTEMPTS: 3,
}

// 默认提示词
export const DEFAULT_PROMPT = `
请根据以下GitLab活动数据生成一份专业的工作周报。要求：

1. **工作总结**：整理本周的主要工作内容和成果
2. **项目进展**：按项目分类展示具体进展
3. **代码贡献**：统计提交、合并请求等代码相关活动
4. **问题处理**：总结处理的问题和bug修复情况
5. **下周计划**：基于当前进展制定下周工作重点

请用中文输出，格式清晰，重点突出。
`

// 存储键名
export const STORAGE_KEYS = {
  CONFIG: 'gitlab_weekly_report_config',
  THEME: 'gitlab_weekly_report_theme',
  LAST_REPORT: 'gitlab_weekly_report_last',
}

// 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD'

// 油猴脚本配置
export const USERSCRIPT_CONFIG = {
  CONTAINER_ID: 'gitlab-weekly-report-container',
  TRIGGER_SELECTOR: '.navbar-nav',
  INJECT_DELAY: 1000,
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