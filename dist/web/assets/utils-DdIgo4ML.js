var e = Object.defineProperty,
  t = (t, r, o) =>
    ((t, r, o) =>
      r in t
        ? e(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
        : (t[r] = o))(t, 'symbol' != typeof r ? r + '' : r, o)
async function r(e, t = {}) {
  const {
    method: r = 'GET',
    headers: o = {},
    body: a,
    timeout: s = 3e4,
    signal: n,
  } = t
  let i = null,
    c = null,
    l = n
  ;(s > 0 || n) &&
    ((i = new AbortController()),
    (l = i.signal),
    s > 0 &&
      (c = setTimeout(() => {
        null == i || i.abort()
      }, s)),
    n &&
      n.addEventListener('abort', () => {
        null == i || i.abort(), c && clearTimeout(c)
      }))
  const u = {
    method: r,
    headers: { 'Content-Type': 'application/json', ...o },
    body: a,
    signal: l,
    cache: 'no-store',
  }
  try {
    const t = await fetch(e, u)
    return (
      c && clearTimeout(c),
      {
        ok: t.ok,
        status: t.status,
        statusText: t.statusText,
        headers: t.headers,
        json: () => t.json(),
        text: () => t.text(),
      }
    )
  } catch (m) {
    if ((c && clearTimeout(c), m instanceof Error)) throw m
    throw new Error('Network request failed')
  }
}
const o = {
    setItem: (e, t) => {
      try {
        'undefined' != typeof localStorage && localStorage.setItem(e, t)
      } catch (r) {}
    },
    getItem: e => {
      try {
        return 'undefined' != typeof localStorage
          ? localStorage.getItem(e)
          : null
      } catch (t) {
        return null
      }
    },
    removeItem: e => {
      try {
        'undefined' != typeof localStorage && localStorage.removeItem(e)
      } catch (t) {}
    },
  },
  a = '1.10.7',
  s = {
    DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
    REQUEST_TIMEOUT: 3e4,
  },
  n = {
    gitlabUrl: 'https://www.lejuhub.com/api/v4',
    gitlabToken: '',
    deepseekApiKey: '',
    defaultPrompt:
      '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
    tokenLimit: 4e3,
    model: 'deepseek-chat',
    customPrompt: '',
    theme: 'system',
  },
  i = {
    gitlabUrl: 'https://gitlab.example.com',
    gitlabToken: '请输入您的GitLab Personal Access Token',
    deepseekApiKey: '请输入您的DeepSeek API Key',
    defaultPrompt: '请根据以下GitLab事件数据生成工作周报...',
  },
  c = { timeRange: 'week', targetType: [], action: [] },
  l = { field: 'created_at', order: 'desc' },
  u = { page: 1, pageSize: 50, total: 0 },
  m = 'gitlab_weekly_report_config',
  p = {
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
class g extends Error {
  constructor(e, r, o) {
    super(`[${o}] ${r}`),
      t(this, 'status'),
      t(this, 'service'),
      (this.name = 'ApiError'),
      (this.status = e),
      (this.service = o)
  }
}
class d extends Error {
  constructor(e, r) {
    super(`[${r}] ${e}`),
      t(this, 'service'),
      (this.name = 'ResponseError'),
      (this.service = r)
  }
}
class f {
  static createApiError(e, t, r) {
    return new g(e, t, r)
  }
  static createResponseError(e, t) {
    return new d(e, t)
  }
  static createNetworkError(e) {
    const t = new Error(`网络错误: ${e}`)
    return (t.name = 'NetworkError'), t
  }
  static createConfigError(e) {
    const t = new Error(`配置错误: ${e}`)
    return (t.name = 'ConfigError'), t
  }
  static formatErrorMessage(e) {
    if ('string' == typeof e) return e
    if (e instanceof Error) {
      const t = {
        ApiError: e.message,
        NetworkError: e.message,
        ConfigError: e.message,
      }
      if (t[e.name]) return t[e.name]
      const r = {
        fetch: '网络连接失败，请检查网络连接后重试',
        timeout: '请求超时，请稍后重试',
        CORS: '跨域请求被阻止，请检查服务器配置',
      }
      for (const o in r) if (e.message.includes(o)) return r[o]
      return e.message
    }
    return '发生未知错误，请稍后重试'
  }
  static logError(e, t) {
    new Date().toISOString()
    Error
  }
  static async safeAsync(e, t, r) {
    try {
      return await e()
    } catch (o) {
      return this.logError(o, r), t
    }
  }
  static safeSync(e, t, r) {
    try {
      return e()
    } catch (o) {
      return this.logError(o, r), t
    }
  }
  static createAppError(e, t, r) {
    return { code: e, message: t, details: r, timestamp: Date.now() }
  }
  static isAbortError(e) {
    return e instanceof Error && 'AbortError' === e.name
  }
  static isNetworkError(e) {
    if (!(e instanceof Error)) return !1
    return (
      ['NetworkError', 'fetch', 'network', 'timeout'].some(t =>
        e.message.includes(t),
      ) || 'NetworkError' === e.name
    )
  }
}
const E = e => {
    try {
      return e(o)
    } catch (t) {
      if ('undefined' != typeof localStorage)
        try {
          return e(localStorage)
        } catch (r) {}
    }
  },
  h = {
    saveConfig: e => {
      E(t => t.setItem(m, JSON.stringify(e)))
    },
    loadConfig: () => {
      const e = E(e => e.getItem(m))
      return e ? JSON.parse(e) : null
    },
    clearConfig: () => {
      E(e => e.removeItem(m))
    },
  },
  y = { INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置' }
export {
  s as A,
  i as C,
  u as D,
  f as E,
  l as a,
  c as b,
  n as c,
  y as d,
  a as e,
  p as f,
  r,
  h as s,
}
