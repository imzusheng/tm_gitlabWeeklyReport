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
    headers: a = {},
    body: n,
    timeout: i = 3e4,
    signal: c,
  } = t
  if (r())
    return new Promise((t, r) => {
      if (null == c ? void 0 : c.aborted) return r(new Error('Request aborted'))
      const l = new AbortController(),
        u = i > 0 ? setTimeout(() => l.abort(), i) : void 0,
        m = () => {
          clearTimeout(u), l.abort(), r(new Error('Request aborted'))
        }
      null == c || c.addEventListener('abort', m),
        GM_xmlhttpRequest({
          method: o.toUpperCase(),
          url: e,
          headers: { 'Content-Type': 'application/json', ...a },
          data: n,
          timeout: i,
          onload: e => {
            clearTimeout(u),
              null == c || c.removeEventListener('abort', m),
              t({
                ok: e.status >= 200 && e.status < 300,
                status: e.status,
                statusText: e.statusText,
                headers: s(e.responseHeaders),
                json: () => Promise.resolve(JSON.parse(e.responseText)),
                text: () => Promise.resolve(e.responseText),
              })
          },
          onerror: e => {
            clearTimeout(u),
              null == c || c.removeEventListener('abort', m),
              r(new Error(`Network error: ${e.error || 'Unknown error'}`))
          },
          ontimeout: () => {
            null == c || c.removeEventListener('abort', m),
              r(new Error('Request timeout'))
          },
        })
    })
  {
    const t = {
      method: o,
      headers: { 'Content-Type': 'application/json', ...a },
      body: n,
      signal: c,
    }
    i > 0 && !c && (t.signal = AbortSignal.timeout(i))
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
    } catch (l) {
      if (l instanceof Error) throw l
      throw new Error('Network request failed')
    }
  }
}
const s = e => {
    const t = {}
    return e
      ? (e.split('\n').forEach(e => {
          const r = e.split(': ')
          2 === r.length && (t[r[0].toLowerCase()] = r[1])
        }),
        t)
      : t
  },
  a = {
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
  n = '1.7.1',
  i = {
    DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
    REQUEST_TIMEOUT: 3e4,
  },
  c = {
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
  l = {
    gitlabUrl: 'https://gitlab.example.com',
    gitlabToken: '请输入您的GitLab Personal Access Token',
    deepseekApiKey: '请输入您的DeepSeek API Key',
    defaultPrompt: '请根据以下GitLab事件数据生成工作周报...',
  },
  u = { timeRange: 'week', targetType: [], action: [] },
  m = { field: 'created_at', order: 'desc' },
  d = { page: 1, pageSize: 50, total: 0 },
  E = 'gitlab_weekly_report_config'
class p extends Error {
  constructor(e, r, o) {
    super(`[${o}] ${r}`),
      t(this, 'status'),
      t(this, 'service'),
      (this.name = 'ApiError'),
      (this.status = e),
      (this.service = o)
  }
}
class f extends Error {
  constructor(e, r) {
    super(`[${r}] ${e}`),
      t(this, 'service'),
      (this.name = 'ResponseError'),
      (this.service = r)
  }
}
class g {
  static createApiError(e, t, r) {
    return new p(e, t, r)
  }
  static createResponseError(e, t) {
    return new f(e, t)
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
const h = e => {
    try {
      return e(a)
    } catch (t) {
      if ('undefined' != typeof localStorage)
        try {
          return e(localStorage)
        } catch (r) {}
    }
  },
  w = {
    saveConfig: e => {
      h(t => t.setItem(E, JSON.stringify(e)))
    },
    loadConfig: () => {
      const e = h(e => e.getItem(E))
      return e ? JSON.parse(e) : null
    },
    clearConfig: () => {
      h(e => e.removeItem(E))
    },
  },
  y = {
    INCOMPLETE_GITLAB_DEEPSEEK: '请先完善GitLab和DeepSeek配置信息',
    INCOMPLETE_CONFIG: '请先完善配置信息',
    NO_EVENTS_SELECTED: '请至少选择一个事件来生成周报',
    INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置',
  }
export {
  i as A,
  l as C,
  d as D,
  g as E,
  m as a,
  u as b,
  c,
  y as d,
  n as e,
  o as r,
  w as s,
}
