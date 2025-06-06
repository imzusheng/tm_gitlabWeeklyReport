/**
 * GitLab 周报生成器 - 类型定义
 * 定义项目中使用的所有 TypeScript 类型
 */

// ============= GitLab API 相关类型 =============

/** GitLab 事件类型 */
export interface GitLabEvent {
  id: number;
  title: string;
  project_id: number;
  action_name: string;
  target_id: number;
  target_iid: number;
  target_type: string;
  target_title: string;
  created_at: string;
  author: {
    id: number;
    name: string;
    username: string;
    avatar_url: string;
  };
  // 添加缺少的 project 属性
  project?: {
    id: number;
    name: string;
    path_with_namespace: string;
  };
  push_data?: {
    commit_count: number;
    action: string;
    ref_type: string;
    commit_from: string;
    commit_to: string;
    ref: string;
    commit_title: string;
  };
}

/** GitLab API 响应类型 */
export type GitLabEventsResponse = GitLabEvent[];

// ============= DeepSeek API 相关类型 =============

/** DeepSeek API 消息类型 */
export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** DeepSeek API 请求类型 */
export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  max_tokens: number;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}

/** DeepSeek API 响应类型 */
export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/** DeepSeek 用户余额信息 */
export interface DeepSeekBalance {
  is_available: boolean;
  balance_infos: Array<{
    currency: string;
    total_balance: string;
    granted_balance: string;
    topped_up_balance: string;
  }>;
}

/** DeepSeek 模型信息 */
export interface DeepSeekModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

// ============= 配置相关类型 =============

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** 主题颜色配置 */
export interface ThemeColors {
  background: string;
  cardBg: string;
  border: string;
  borderLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  success: string;
  warning: string;
  error: string;
  buttonBg: string;
  hoverBg: string;
  shadow: string;
  shadowLarge: string;
}

/** 应用配置类型 */
export interface AppConfig {
  // 修改为嵌套结构以匹配实际使用
  gitlab: {
    baseUrl: string;
    token: string;
    projectId: string;
  };
  deepseek: {
    apiKey: string;
    model: string;
    maxTokens: number;
  };
  themeMode: ThemeMode;
  deepseekMaxTokens?: number;
}

// ============= 组件相关类型 =============

/** 通知类型 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/** 通知配置 */
export interface NotificationConfig {
  message: string;
  type: NotificationType;
  duration?: number;
}

/** 日期范围 */
export interface DateRange {
  startDate: string;
  endDate: string;
}

/** 事件表格行数据 */
export interface EventTableRow {
  id: string;
  index: number;
  time: string;
  title: string;
  isSelected: boolean;
  event: GitLabEvent;
}

/** 周报生成结果 */
export interface ReportResult {
  content: string;
  events: GitLabEvent[];
  generatedAt: Date;
  eventCount: number;
  duration: number;
  additionalPrompt?: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ============= Hook 相关类型 =============

/** useConfig Hook 返回类型 */
export interface UseConfigReturn {
  config: AppConfig;
  isLoading: boolean;
  error: string | null;
  updateConfig: (newConfig: Partial<AppConfig>) => Promise<void>;
  resetConfig: () => Promise<void>;
  testConnection: () => Promise<{ gitlab: boolean; deepseek: boolean }>;
  isConfigured: () => boolean;
}

/** useTheme Hook 返回类型 */
export interface UseThemeReturn {
  themeMode: ThemeMode;
  currentTheme: 'light' | 'dark';
  themeColors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  applyTheme: () => void;
}

/** useEvents Hook 返回类型 */
export interface UseEventsReturn {
  events: GitLabEvent[];
  selectedEvents: Set<string>;
  isLoading: boolean;
  error: string | null;
  dateRange: DateRange;
  progress: { current: number; total: number };
  tableRows: EventTableRow[];
  stats: {
    total: number;
    selected: number;
    isAllSelected: boolean;
    hasSelection: boolean;
  };
  fetchEvents: (range?: DateRange) => Promise<void>;
  updateDateRange: (range: DateRange) => void;
  toggleEventSelection: (eventId: string) => void;
  toggleSelectAll: () => void;
  clearSelection: () => void;
  getSelectedEvents: () => GitLabEvent[];
}

/** useReport Hook 返回类型 */
export interface UseReportReturn {
  report: string;
  isGenerating: boolean;
  error: string | null;
  lastResult: ReportResult | null;
  generateReport: (events: GitLabEvent[], additionalPrompt?: string, model?: string) => Promise<ReportResult>;
  exportReport: (result: ReportResult) => void;
  exportEvents: (events: GitLabEvent[]) => void;
  clearError: () => void;
  clearResult: () => void;
}

// ============= 工具函数相关类型 =============

/** 导出数据格式 */
export type ExportFormat = 'csv' | 'json' | 'txt';

/** 导出选项 */
export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  includeHeaders?: boolean;
}

// ============= 全局类型扩展 =============

/** 扩展 Window 对象，添加油猴脚本 API */
declare global {
  interface Window {
    GM_xmlhttpRequest: (details: {
      method: string;
      url: string;
      headers?: Record<string, string>;
      data?: string;
      onload: (response: {
        status: number;
        statusText: string;
        responseText: string;
        responseHeaders: string;
      }) => void;
      onerror: (error: any) => void;
      ontimeout?: () => void;
      timeout?: number;
    }) => void;
    GM_setValue: (key: string, value: any) => void;
    GM_getValue: (key: string, defaultValue?: any) => any;
    GM_deleteValue: (key: string) => void;
  }
}

// ============= 常量类型 =============

/** 预设日期范围类型 */
export type PresetDateRange = 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth';

/** API 状态类型 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

/** 面板状态类型 */
export type PanelState = 'hidden' | 'minimized' | 'expanded';