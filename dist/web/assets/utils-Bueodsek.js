const e = () =>
  'undefined' != typeof window && 'undefined' != typeof GM_xmlhttpRequest
async function t(t, o = {}) {
  const {
    method: a = 'GET',
    headers: n = {},
    body: s,
    timeout: i = 3e4,
    signal: c,
  } = o
  if (e())
    return new Promise((e, o) => {
      const l = { 'Content-Type': 'application/json', ...n }
      let u
      if (
        (i > 0 &&
          (u = window.setTimeout(() => {
            o(new Error('Request timeout'))
          }, i)),
        null == c ? void 0 : c.aborted)
      )
        return void o(new Error('Request aborted'))
      const d = () => {
        u && clearTimeout(u), o(new Error('Request aborted'))
      }
      null == c || c.addEventListener('abort', d),
        GM_xmlhttpRequest({
          method: a.toUpperCase(),
          url: t,
          headers: l,
          data: s,
          timeout: i,
          onload: t => {
            u && clearTimeout(u), null == c || c.removeEventListener('abort', d)
            const o = {
              ok: t.status >= 200 && t.status < 300,
              status: t.status,
              statusText: t.statusText,
              headers: r(t.responseHeaders),
              json: async () => {
                try {
                  return JSON.parse(t.responseText)
                } catch (e) {
                  throw new Error('Invalid JSON response')
                }
              },
              text: async () => t.responseText,
            }
            e(o)
          },
          onerror: e => {
            u && clearTimeout(u),
              null == c || c.removeEventListener('abort', d),
              o(new Error(`Network error: ${e.error || 'Unknown error'}`))
          },
          ontimeout: () => {
            u && clearTimeout(u),
              null == c || c.removeEventListener('abort', d),
              o(new Error('Request timeout'))
          },
        })
    })
  {
    const e = {
      method: a,
      headers: { 'Content-Type': 'application/json', ...n },
      body: s,
      signal: c,
    }
    i > 0 && !c && (e.signal = AbortSignal.timeout(i))
    try {
      const r = await fetch(t, e)
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
const r = e => {
    const t = {}
    return e
      ? (e.split('\n').forEach(e => {
          const r = e.split(': ')
          2 === r.length && (t[r[0].toLowerCase()] = r[1])
        }),
        t)
      : t
  },
  o = (t, r) => {
    try {
      e() && 'undefined' != typeof GM_setValue
        ? GM_setValue(t, r)
        : 'undefined' != typeof localStorage
          ? localStorage.setItem(t, r)
          : console.warn('No storage method available')
    } catch (o) {
      console.error('Storage setItem failed:', o)
    }
  },
  a = t => {
    try {
      return e() && 'undefined' != typeof GM_getValue
        ? GM_getValue(t, null)
        : 'undefined' != typeof localStorage
          ? localStorage.getItem(t)
          : (console.warn('No storage method available'), null)
    } catch (r) {
      return console.error('Storage getItem failed:', r), null
    }
  },
  n = t => {
    try {
      e() && 'undefined' != typeof GM_deleteValue
        ? GM_deleteValue(t)
        : 'undefined' != typeof localStorage
          ? localStorage.removeItem(t)
          : console.warn('No storage method available')
    } catch (r) {
      console.error('Storage removeItem failed:', r)
    }
  },
  s = '1.5.2',
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
  d = { field: 'created_at', order: 'desc' },
  m = { page: 1, pageSize: 50, total: 0 },
  E = 'gitlab_weekly_report_config'
class g {
  static createApiError(e, t, r) {
    const o = new Error(`[${r}] ${t}`)
    return (o.name = 'ApiError'), (o.status = e), (o.service = r), o
  }
  static createResponseError(e, t) {
    const r = new Error(`[${t}] ${e}`)
    return (r.name = 'ResponseError'), (r.service = t), r
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
    return e instanceof Error
      ? 'ApiError' === e.name ||
        'NetworkError' === e.name ||
        'ConfigError' === e.name
        ? e.message
        : e.message.includes('fetch')
          ? '网络连接失败，请检查网络连接后重试'
          : e.message.includes('timeout')
            ? '请求超时，请稍后重试'
            : e.message.includes('CORS')
              ? '跨域请求被阻止，请检查服务器配置'
              : e.message
      : 'string' == typeof e
        ? e
        : '发生未知错误，请稍后重试'
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
    return (
      e instanceof Error &&
      ('NetworkError' === e.name ||
        e.message.includes('fetch') ||
        e.message.includes('network') ||
        e.message.includes('timeout'))
    )
  }
}
const p = {
    saveConfig: e => {
      try {
        o(E, JSON.stringify(e))
      } catch (t) {
        'undefined' != typeof localStorage &&
          localStorage.setItem(E, JSON.stringify(e))
      }
    },
    loadConfig: () => {
      try {
        const e = a(E)
        return e ? JSON.parse(e) : null
      } catch (e) {
        try {
          if ('undefined' != typeof localStorage) {
            const e = localStorage.getItem(E)
            return e ? JSON.parse(e) : null
          }
        } catch (t) {}
        return null
      }
    },
    clearConfig: () => {
      try {
        n(E)
      } catch (e) {
        'undefined' != typeof localStorage && localStorage.removeItem(E)
      }
    },
  },
  f = {
    INCOMPLETE_GITLAB_DEEPSEEK: '请先完善GitLab和DeepSeek配置信息',
    INCOMPLETE_CONFIG: '请先完善配置信息',
    NO_EVENTS_SELECTED: '请至少选择一个事件来生成周报',
    INVALID_FILTER_OR_CONFIG: '请检查筛选条件或GitLab配置',
  }
export {
  s as A,
  l as C,
  m as D,
  g as E,
  d as a,
  u as b,
  c,
  f as d,
  i as e,
  t as r,
  p as s,
}
