// GitLab API 相关类型
export interface GitLabEvent {
  id: number
  project_id?: number
  title?: string
  action_name: string
  target_id?: number
  target_iid?: number
  target_type: string | null
  target_title?: string
  author_id?: number
  created_at: string
  author: {
    id?: number
    name: string
    username: string
    state?: string
    avatar_url?: string
    web_url?: string
  }
  author_username?: string
  project?: {
    name: string
    path_with_namespace: string
  }
  state?: string
  labels?: string[]
  // 评论相关
  note?: {
    id: number
    type?: string
    body: string
    attachment?: any
    author: {
      id: number
      username: string
      name: string
      state: string
      avatar_url: string
      web_url: string
    }
    created_at: string
    updated_at: string
    system: boolean
    noteable_id?: number
    noteable_type?: string
    project_id?: number
    resolvable?: boolean
    resolved?: boolean
    resolved_by?: any
    resolved_at?: string
    confidential?: boolean
    internal?: boolean
    noteable_iid?: number
    commands_changes?: any
    position?: any
  }
  // 推送相关
  push_data?: {
    commit_count: number
    action: string
    ref_type: string
    commit_from?: string
    commit_to: string
    ref: string
    commit_title: string
    ref_count?: number
  }
}

export interface GitLabProject {
  id: number
  name: string
  path: string
  path_with_namespace: string
  description: string
  web_url: string
}

// DeepSeek API 相关类型
export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// 筛选条件类型
export interface FilterConditions {
  timeRange: '7d' | '30d' | '90d' | '180d' | '365d'
  targetType: (
    | 'epic'
    | 'issue'
    | 'merge_request'
    | 'milestone'
    | 'note'
    | 'project'
    | 'snippet'
    | 'user'
  )[]
  action: (
    | 'created'
    | 'updated'
    | 'closed'
    | 'reopened'
    | 'pushed'
    | 'commented'
    | 'merged'
    | 'approved'
    | 'joined'
    | 'left'
    | 'deleted'
  )[]
}

// 排序类型
export interface SortOptions {
  field: 'created_at'
  order: 'asc' | 'desc'
}

// 分页类型
export interface PaginationOptions {
  page: number
  pageSize: number
  total: number
}

// 应用配置类型
export interface AppConfig {
  gitlabUrl: string
  gitlabToken: string
  deepseekApiKey: string
  defaultPrompt: string
  tokenLimit: number
  model: string
  customPrompt?: string
  theme?: 'light' | 'dark' | 'system'
}

// AI生成配置类型
export interface AIGenerationConfig {
  prompt: string
  tokensUsed: number
  result: string
}

// 周报数据类型
export interface WeeklyReportData {
  events: GitLabEvent[]
  generatedReport: string
  tokensUsed: number
  generatedAt: string
}

// 环境类型
export type Environment = 'web' | 'userscript'

// 面板类型
export type PanelType = 'main' | 'settings' | 'ai'

// 应用状态类型
export interface AppState {
  config: AppConfig
  reportData: WeeklyReportData | null
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark' | 'system'
  activePanel: PanelType
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  events: GitLabEvent[]
  totalCount: number
  aiGenerationConfig: AIGenerationConfig | null
}

// GitLab 用户事件获取选项
export interface UserEventsOptions {
  startDate: string
  endDate: string
  userId?: string | number
  targetTypes?: string[]
  actions?: string[]
  sort?: 'asc' | 'desc'
  page?: number
  perPage?: number
  useUserIdApi?: boolean // 是否强制使用 /users/:id/events 接口
}

// 用户信息类型
export interface GitLabUser {
  id: number
  username: string
  name: string
  state: string
  avatar_url: string
  web_url: string
  created_at?: string
  bio?: string
  location?: string
  public_email?: string
  skype?: string
  linkedin?: string
  twitter?: string
  website_url?: string
  organization?: string
}
