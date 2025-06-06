/**
 * GitLab 周报生成器 - 常量定义
 * 定义项目中使用的所有常量
 */

import type { AppConfig } from '@/types';

/** 应用版本 */
export const APP_VERSION = '2.0.0';

/** 本地存储键名 */
export const STORAGE_KEYS = {
  CONFIG: 'gitlab-weekly-report-config-v2',
  THEME: 'gitlab-weekly-report-theme',
  PANEL_STATE: 'gitlab-weekly-report-panel-state',
  // 添加缺少的键
  GITLAB_URL: 'https://www.lejuhub.com',
  GITLAB_TOKEN: 'gitlab-token', 
  GITLAB_PROJECT_ID: 'gitlab-project-id',
  DEEPSEEK_API_KEY: 'deepseek-api-key',
  DEEPSEEK_MODEL: 'deepseek-model',
  DEEPSEEK_BASE_URL: 'deepseek-base-url',
  DEEPSEEK_MAX_TOKENS: 'deepseek-max-tokens',
  SYSTEM_PROMPT: 'system-prompt',
  DEFAULT_ADDITIONAL_PROMPT: 'default-additional-prompt',
  THEME_MODE: 'theme-mode'
} as const;

/** 默认配置 */
export const DEFAULT_CONFIG: AppConfig = {
  gitlab: {
    baseUrl: 'https://www.lejuhub.com/api/v4',
    token: '',
    projectId: ''
  },
  deepseek: {
    apiKey: '',
    model: 'deepseek-chat',
    maxTokens: 1000
  },
  themeMode: 'auto'
};

/** 验证规则 */
export const VALIDATION_RULES = {
  TOKEN_MIN_LENGTH: 10,
  URL_PATTERN: /^https?:\/\/.+/,
  MAX_TOKENS_MIN: 100,
  MAX_TOKENS_MAX: 8000
} as const;

/** API 端点 */
export const API_ENDPOINTS = {
  GITLAB_EVENTS: '/projects/:id/events',
  DEEPSEEK_BASE: 'https://api.deepseek.com',
  DEEPSEEK_CHAT: '/v1/chat/completions',
  DEEPSEEK_BALANCE: '/v1/user/balance',
  DEEPSEEK_MODELS: '/v1/models'
} as const;

/** 主题颜色配置 */
export const THEME_COLORS = {
  light: {
    background: '#ffffff',
    cardBg: '#ffffff',
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    text: '#333333',
    textSecondary: '#666666',
    textMuted: '#999999',
    primary: '#1976d2',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    buttonBg: '#f5f5f5',
    hoverBg: '#eeeeee',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLarge: 'rgba(0, 0, 0, 0.2)'
  },
  dark: {
    background: '#121212',
    cardBg: '#1e1e1e',
    border: '#333333',
    borderLight: '#404040',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#666666',
    primary: '#90caf9',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',
    buttonBg: '#2d2d2d',
    hoverBg: '#404040',
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowLarge: 'rgba(0, 0, 0, 0.5)'
  }
} as const;

/** 表格配置 */
export const TABLE_CONFIG = {
  PAGE_SIZE: 50,
  MAX_ROWS: 1000
} as const;