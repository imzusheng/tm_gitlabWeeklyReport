var e = Object.defineProperty,
  t = (t, r, o) =>
    ((t, r, o) =>
      r in t
        ? e(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
        : (t[r] = o))(t, 'symbol' != typeof r ? r + '' : r, o)
const r = () =>
  'undefined' != typeof window && 'undefined' != typeof GM_xmlhttpRequest
async function o(e, t = {}) {
  const {
    method: o = 'GET',
    headers: s = {},
    body: n,
    timeout: i = 3e4,
    signal: l,
  } = t
  if (r())
    return new Promise((t, r) => {
      if (null == l ? void 0 : l.aborted) return r(new Error('Request aborted'))
      const c = new AbortController(),
        u = i > 0 ? setTimeout(() => c.abort(), i) : void 0,
        m = () => {
          clearTimeout(u), c.abort(), r(new Error('Request aborted'))
        }
      null == l || l.addEventListener('abort', m),
        GM_xmlhttpRequest({
          method: o.toUpperCase(),
          url: e,
          headers: { 'Content-Type': 'application/json', ...s },
          data: n,
          timeout: i,
          onload: e => {
            clearTimeout(u),
              null == l || l.removeEventListener('abort', m),
              t({
                ok: e.status >= 200 && e.status < 300,
                status: e.status,
                statusText: e.statusText,
                headers: a(e.responseHeaders),
                json: () => Promise.resolve(JSON.parse(e.responseText)),
                text: () => Promise.resolve(e.responseText),
              })
          },
          onerror: e => {
            clearTimeout(u),
              null == l || l.removeEventListener('abort', m),
              r(new Error(`Network error: ${e.error || 'Unknown error'}`))
          },
          ontimeout: () => {
            null == l || l.removeEventListener('abort', m),
              r(new Error('Request timeout'))
          },
        })
    })
  {
    const t = {
      method: o,
      headers: { 'Content-Type': 'application/json', ...s },
      body: n,
      signal: l,
    }
    i > 0 && !l && (t.signal = AbortSignal.timeout(i))
    try {
      const r = await fetch(e, t)
      return {
        ok: r.ok,
        status: r.status,
        statusText: r.statusText,
        headers: r.headers,
        json: () => r.json(),
        text: () => r.text(),
      }
    } catch (c) {
      if (c instanceof Error) throw c
      throw new Error('Network request failed')
    }
  }
}
const a = e => {
    const t = {}
    return e
      ? (e.split('\n').forEach(e => {
          const r = e.split(': ')
          2 === r.length && (t[r[0].toLowerCase()] = r[1])
        }),
        t)
      : t
  },
  s = {
    setItem: (e, t) => {
      try {
        r() && 'undefined' != typeof GM_setValue
          ? GM_setValue(e, t)
          : 'undefined' != typeof localStorage
            ? localStorage.setItem(e, t)
            : console.warn('No storage method available')
      } catch (o) {
        console.error('Storage setItem failed:', o)
      }
    },
    getItem: e => {
      try {
        return r() && 'undefined' != typeof GM_getValue
          ? GM_getValue(e, null)
          : 'undefined' != typeof localStorage
            ? localStorage.getItem(e)
            : (console.warn('No storage method available'), null)
      } catch (t) {
        return console.error('Storage getItem failed:', t), null
      }
    },
    removeItem: e => {
      try {
        r() && 'undefined' != typeof GM_deleteValue
          ? GM_deleteValue(e)
          : 'undefined' != typeof localStorage
            ? localStorage.removeItem(e)
            : console.warn('No storage method available')
      } catch (t) {
        console.error('Storage removeItem failed:', t)
      }
    },
  },
  n = '1.10.4',
  i = {
    DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
    REQUEST_TIMEOUT: 3e4,
  },
  l = {
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
  c = {
    gitlabUrl: 'https://gitlab.example.com',
    gitlabToken: '请输入您的GitLab Personal Access Token',
    deepseekApiKey: '请输入您的DeepSeek API Key',
    defaultPrompt: '请根据以下GitLab事件数据生成工作周报...',
  },
  u = { timeRange: 'week', targetType: [], action: [] },
  m = { field: 'created_at', order: 'desc' },
  d = { page: 1, pageSize: 50, total: 0 },
  p = 'gitlab_weekly_report_config',
  g = { SCOPE_CLASS: 'gitlab-weekly-report-scope' },
  f = {
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
class E extends Error {
  constructor(e, r, o) {
    super(`[${o}] ${r}`),
      t(this, 'status'),
      t(this, 'service'),
      (this.name = 'ApiError'),
      (this.status = e),
      (this.service = o)
  }
}
class h extends Error {
  constructor(e, r) {
    super(`[${r}] ${e}`),
      t(this, 'service'),
      (this.name = 'ResponseError'),
      (this.service = r)
  }
}
class w {
  static createApiError(e, t, r) {
    return new E(e, t, r)
  }
  static createResponseError(e, t) {
    return new h(e, t)
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
    const r = new Date().toISOString(),
      o = t ? `[${t}] ` : ''
    e instanceof Error
      ? console.error(`${r} ${o}${e.name}: ${e.message}`, e.stack)
      : console.error(`${r} ${o}Unknown error:`, e)
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
const y = e => {
    try {
      return e(s)
    } catch (t) {
      if ('undefined' != typeof localStorage)
        try {
          return e(localStorage)
        } catch (r) {}
    }
  },
  b = {
    saveConfig: e => {
      y(t => t.setItem(p, JSON.stringify(e)))
    },
    loadConfig: () => {
      const e = y(e => e.getItem(p))
      return e ? JSON.parse(e) : null
    },
    clearConfig: () => {
      y(e => e.removeItem(p))
    },
  },
  k = { INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置' }
export {
  i as A,
  c as C,
  d as D,
  w as E,
  g as U,
  m as a,
  u as b,
  l as c,
  k as d,
  n as e,
  f,
  o as r,
  b as s,
}
