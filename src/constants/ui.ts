export const UI_TEXT = {
  NO_MATCHES: {
    title: '没有匹配的事件',
    desc: '试试放宽筛选条件或清空筛选后重试。',
  },
  CONFIG_MISSING: {
    title: '尚未连接 GitLab',
    desc: '请前往设置完成 GitLab 连接与鉴权。',
  },
  CTA: {
    clearFilters: '清空筛选',
    viewSample: '查看示例',
    goSetup: '去配置',
    backToSelect: '返回选择事件',
    generate: '生成周报',
    generating: '正在生成…',
    copy: '复制结果',
    copied: '已复制',
  },
  TOOLTIP: {
    selectEvents: '请先勾选事件',
  },
  PHASES: ['整理事件', '生成文稿', '完成'],
} as const

export type ErrorCode = 'NO_MATCHES' | 'CONFIG_MISSING' | null
