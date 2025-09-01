var e = Object.defineProperty,
  t = (t, s, a) =>
    ((t, s, a) =>
      s in t
        ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (t[s] = a))(t, 'symbol' != typeof s ? s + '' : s, a)
import { r as s, a, R as n } from './vendor-DtYzeC-x.js'
import {
  D as r,
  a as o,
  b as l,
  c as i,
  s as d,
  r as c,
  E as _,
  A as g,
  d as m,
  e as u,
  f as p,
  C as h,
} from './utils-CacuJIMj.js'
!(function () {
  const e = document.createElement('link').relList
  if (!(e && e.supports && e.supports('modulepreload'))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e)
    new MutationObserver(e => {
      for (const s of e)
        if ('childList' === s.type)
          for (const e of s.addedNodes)
            'LINK' === e.tagName && 'modulepreload' === e.rel && t(e)
    }).observe(document, { childList: !0, subtree: !0 })
  }
  function t(e) {
    if (e.ep) return
    e.ep = !0
    const t = (function (e) {
      const t = {}
      return (
        e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        'use-credentials' === e.crossOrigin
          ? (t.credentials = 'include')
          : 'anonymous' === e.crossOrigin
            ? (t.credentials = 'omit')
            : (t.credentials = 'same-origin'),
        t
      )
    })(e)
    fetch(e.href, t)
  }
})()
var x = { exports: {} },
  w = {},
  v = s,
  b = Symbol.for('react.element'),
  f = Symbol.for('react.fragment'),
  j = Object.prototype.hasOwnProperty,
  N = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  y = { key: !0, ref: !0, __self: !0, __source: !0 }
function C(e, t, s) {
  var a,
    n = {},
    r = null,
    o = null
  for (a in (void 0 !== s && (r = '' + s),
  void 0 !== t.key && (r = '' + t.key),
  void 0 !== t.ref && (o = t.ref),
  t))
    j.call(t, a) && !y.hasOwnProperty(a) && (n[a] = t[a])
  if (e && e.defaultProps)
    for (a in (t = e.defaultProps)) void 0 === n[a] && (n[a] = t[a])
  return { $$typeof: b, type: e, key: r, ref: o, props: n, _owner: N.current }
}
;(w.Fragment = f), (w.jsx = C), (w.jsxs = C), (x.exports = w)
var k = x.exports,
  E = {},
  S = a
;(E.createRoot = S.createRoot), (E.hydrateRoot = S.hydrateRoot)
const T = e => {
    let t
    const s = new Set(),
      a = (e, a) => {
        const n = 'function' == typeof e ? e(t) : e
        if (!Object.is(n, t)) {
          const e = t
          ;(t = (null != a ? a : 'object' != typeof n || null === n)
            ? n
            : Object.assign({}, t, n)),
            s.forEach(s => s(t, e))
        }
      },
      n = () => t,
      r = {
        setState: a,
        getState: n,
        getInitialState: () => o,
        subscribe: e => (s.add(e), () => s.delete(e)),
      },
      o = (t = e(a, n, r))
    return r
  },
  I = e => e
function M(e, t) {
  let s
  try {
    s = e()
  } catch (a) {
    return
  }
  return {
    getItem: e => {
      var t
      const a = e => (null === e ? null : JSON.parse(e, void 0)),
        n = null != (t = s.getItem(e)) ? t : null
      return n instanceof Promise ? n.then(a) : a(n)
    },
    setItem: (e, t) => s.setItem(e, JSON.stringify(t, void 0)),
    removeItem: e => s.removeItem(e),
  }
}
const $ = e => t => {
    try {
      const s = e(t)
      return s instanceof Promise
        ? s
        : {
            then: e => $(e)(s),
            catch(e) {
              return this
            },
          }
    } catch (s) {
      return {
        then(e) {
          return this
        },
        catch: e => $(e)(s),
      }
    }
  },
  D = {
    config: i,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: 'system',
    activePanel: 'main',
    appMode: 'events',
    filterConditions: l,
    sortOptions: o,
    paginationOptions: r,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
    projects: [],
    selectedProjectId: null,
    commits: [],
  },
  A = (e => {
    const t = (e => (e ? T(e) : T))(e),
      s = e =>
        (function (e, t = I) {
          const s = n.useSyncExternalStore(
            e.subscribe,
            () => t(e.getState()),
            () => t(e.getInitialState()),
          )
          return n.useDebugValue(s), s
        })(t, e)
    return Object.assign(s, t), s
  })(
    ((e, t) => (s, a, n) => {
      let r = {
          storage: M(() => localStorage),
          partialize: e => e,
          version: 0,
          merge: (e, t) => ({ ...t, ...e }),
          ...t,
        },
        o = !1
      const l = new Set(),
        i = new Set()
      let d = r.storage
      if (!d)
        return e(
          (...e) => {
            console.warn(
              `[zustand persist middleware] Unable to update item '${r.name}', the given storage is currently unavailable.`,
            ),
              s(...e)
          },
          a,
          n,
        )
      const c = () => {
          const e = r.partialize({ ...a() })
          return d.setItem(r.name, { state: e, version: r.version })
        },
        _ = n.setState
      n.setState = (e, t) => {
        _(e, t), c()
      }
      const g = e(
        (...e) => {
          s(...e), c()
        },
        a,
        n,
      )
      let m
      n.getInitialState = () => g
      const u = () => {
        var e, t
        if (!d) return
        ;(o = !1),
          l.forEach(e => {
            var t
            return e(null != (t = a()) ? t : g)
          })
        const n =
          (null == (t = r.onRehydrateStorage)
            ? void 0
            : t.call(r, null != (e = a()) ? e : g)) || void 0
        return $(d.getItem.bind(d))(r.name)
          .then(e => {
            if (e) {
              if ('number' != typeof e.version || e.version === r.version)
                return [!1, e.state]
              if (r.migrate) {
                const t = r.migrate(e.state, e.version)
                return t instanceof Promise ? t.then(e => [!0, e]) : [!0, t]
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              )
            }
            return [!1, void 0]
          })
          .then(e => {
            var t
            const [n, o] = e
            if (((m = r.merge(o, null != (t = a()) ? t : g)), s(m, !0), n))
              return c()
          })
          .then(() => {
            null == n || n(m, void 0), (m = a()), (o = !0), i.forEach(e => e(m))
          })
          .catch(e => {
            null == n || n(void 0, e)
          })
      }
      return (
        (n.persist = {
          setOptions: e => {
            ;(r = { ...r, ...e }), e.storage && (d = e.storage)
          },
          clearStorage: () => {
            null == d || d.removeItem(r.name)
          },
          getOptions: () => r,
          rehydrate: () => u(),
          hasHydrated: () => o,
          onHydrate: e => (
            l.add(e),
            () => {
              l.delete(e)
            }
          ),
          onFinishHydration: e => (
            i.add(e),
            () => {
              i.delete(e)
            }
          ),
        }),
        r.skipHydration || u(),
        m || g
      )
    })(
      (e, t) => ({
        ...D,
        updateConfig: t => {
          e(e => {
            const s = { ...e.config, ...t }
            return d.saveConfig(s), { config: s }
          })
        },
        resetConfig: () => {
          e({ config: i }), d.clearConfig()
        },
        setActivePanel: t => e({ activePanel: t }),
        setAppMode: t => e({ appMode: t }),
        setTheme: t => e({ theme: t }),
        setLoading: t => e({ isLoading: t }),
        setError: t => e({ error: t }),
        setProjects: t => e({ projects: t }),
        setSelectedProjectId: t => e({ selectedProjectId: t }),
        setCommits: t => e({ commits: t }),
        setEvents: t => e({ events: t }),
        setTotalCount: t => e({ totalCount: t }),
        setFilterConditions: t => {
          e(e => ({ filterConditions: { ...e.filterConditions, ...t } }))
        },
        setSortOptions: t => {
          e(e => ({ sortOptions: { ...e.sortOptions, ...t } }))
        },
        setPaginationOptions: t => {
          e(e => ({ paginationOptions: { ...e.paginationOptions, ...t } }))
        },
        setAIGenerationConfig: t => e({ aiGenerationConfig: t }),
        setReportData: t => e({ reportData: t }),
        resetState: () => {
          e(D), d.clearConfig()
        },
        getTimeRange: () => {
          const { filterConditions: e } = t()
          return (e => {
            const t = new Date(),
              s = new Date(t),
              a = new Date(t)
            switch (e) {
              case 'week': {
                const e = t.getDay(),
                  s = 0 === e ? 6 : e - 1
                a.setDate(t.getDate() - s)
                break
              }
              case '7d':
              default:
                a.setDate(t.getDate() - 7)
                break
              case '30d':
                a.setDate(t.getDate() - 30)
                break
              case '90d':
                a.setDate(t.getDate() - 90)
                break
              case '180d':
                a.setDate(t.getDate() - 180)
                break
              case '365d':
                a.setDate(t.getDate() - 365)
            }
            return (
              a.setHours(0, 0, 0, 0),
              s.setHours(23, 59, 59, 999),
              { startDate: a, endDate: s }
            )
          })(e.timeRange)
        },
        validateConfig: () => {
          const { config: e } = t()
          return (e => {
            var t, s, a
            return !!(
              (null == (t = e.gitlabUrl) ? void 0 : t.trim()) &&
              (null == (s = e.gitlabToken) ? void 0 : s.trim()) &&
              (null == (a = e.deepseekApiKey) ? void 0 : a.trim())
            )
          })(e)
        },
      }),
      {
        name: 'gitlab-weekly-report-store',
        partialize: e => ({
          config: e.config,
          theme: e.theme,
          appMode: e.appMode,
          filterConditions: e.filterConditions,
          sortOptions: e.sortOptions,
        }),
      },
    ),
  ),
  L = () => {
    const e = s.useRef(null),
      t = s.useCallback(() => {
        e.current && e.current.abort()
        const t = new AbortController()
        return (e.current = t), t
      }, []),
      a = s.useCallback(() => {
        e.current && (e.current.abort(), (e.current = null))
      }, []),
      n = s.useCallback(e => e.signal.aborted, []),
      r = s.useCallback(t => {
        e.current === t && (e.current = null)
      }, []),
      o = s.useCallback(e => e instanceof Error && 'AbortError' === e.name, [])
    return (
      s.useEffect(
        () => () => {
          a()
        },
        [a],
      ),
      {
        createRequest: t,
        cancelRequest: a,
        isRequestCancelled: n,
        cleanupRequest: r,
        isAbortError: o,
      }
    )
  }
class P {
  constructor(e, s) {
    t(this, 'baseUrl'),
      t(this, 'token'),
      t(this, 'currentUser', null),
      (this.baseUrl = e.replace(/\/$/, '')),
      (this.token = s)
  }
  async request(e, t = {}) {
    const s = `${this.baseUrl}${e}`,
      a = {
        method: t.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
        body: t.body,
      },
      n = await c(s, a)
    if (!n.ok) {
      let e
      try {
        e = await n.text()
      } catch {
        e = n.statusText
      }
      console.error(`GitLab API Error [${n.status}]:`, e)
      const t =
        {
          401: 'GitLab认证失败，请检查Token是否有效',
          403: 'GitLab访问权限不足，请检查Token权限',
          404: 'GitLab资源不存在，请检查URL或项目权限',
          429: 'GitLab API请求频率过高，请稍后重试',
          500: 'GitLab服务器错误，请稍后重试',
          502: 'GitLab服务器错误，请稍后重试',
          503: 'GitLab服务器错误，请稍后重试',
          504: 'GitLab服务器错误，请稍后重试',
        }[n.status] ||
        e ||
        n.statusText
      throw _.createApiError(n.status, t, 'GitLab API')
    }
    return n.json()
  }
  validateToken() {
    if (!this.token) throw new Error('GitLab Token为空')
    if ((this.token.startsWith('glpat-'), this.token.length < 20))
      throw new Error('GitLab Token长度太短')
    return !0
  }
  async getCurrentUser() {
    if (this.currentUser) return this.currentUser
    if (!this.validateToken())
      throw _.createResponseError('Token格式无效', 'GitLab API')
    const e = await this.request('/user')
    return (this.currentUser = e), e
  }
  async init() {
    try {
      await this.getCurrentUser()
    } catch (e) {
      if (
        (console.error('GitLab service initialization failed:', e),
        e instanceof Error)
      ) {
        if (e.message.includes('401'))
          throw new Error('GitLab Token无效或已过期，请检查Token是否正确')
        if (e.message.includes('403'))
          throw new Error('GitLab Token权限不足，请检查Token权限设置')
        if (e.message.includes('404'))
          throw new Error('GitLab URL无效，请检查GitLab服务器地址是否正确')
        if (e.message.includes('timeout'))
          throw new Error('GitLab服务器连接超时，请检查网络连接或稍后重试')
      }
      throw new Error('GitLab服务初始化失败，请检查GitLab URL和Token是否正确')
    }
  }
  async getProjects(e = {}) {
    const t = new URLSearchParams(
        Object.entries(e)
          .filter(([, e]) => void 0 !== e)
          .reduce((e, [t, s]) => ({ ...e, [t]: String(s) }), {}),
      ).toString(),
      s = t ? `/projects?${t}` : '/projects'
    return this.request(s)
  }
  async getProjectsWithTotal(e = {}) {
    const t = new URLSearchParams(
        Object.entries(e)
          .filter(([, e]) => void 0 !== e)
          .reduce((e, [t, s]) => ({ ...e, [t]: String(s) }), {}),
      ).toString(),
      s = t ? `/projects?${t}` : '/projects',
      a = `${this.baseUrl}${s}`,
      n = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
      },
      r = await c(a, n)
    if (!r.ok) {
      const e = await r.text()
      throw _.createApiError(r.status, e || r.statusText, 'GitLab API')
    }
    const o = await r.json()
    let l = 0,
      i = ''
    if (r.headers instanceof Headers)
      (i =
        r.headers.get('x-total') ||
        r.headers.get('X-Total') ||
        r.headers.get('x-total-count') ||
        r.headers.get('X-Total-Count') ||
        ''),
        (l = parseInt(i || '0', 10))
    else {
      if ('string' == typeof r.headers) {
        const e = r.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              s = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              i = s
              break
            }
          }
        }
      } else {
        const e = r.headers
        i =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      l = parseInt(i || '0', 10)
    }
    return !l && o.length > 0 && (l = o.length), { projects: o, total: l }
  }
  async getUserEventsWithTotal(e, t = {}) {
    const s = new URLSearchParams()
    t.after && s.set('after', t.after),
      t.before && s.set('before', t.before),
      t.sort && s.set('sort', t.sort),
      t.page && s.set('page', t.page.toString()),
      t.per_page && s.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => s.append('action', e)),
      t.target_type && t.target_type.forEach(e => s.append('target_type', e))
    const a = `/users/${e}/events?${s.toString()}`,
      n = `${this.baseUrl}${a}`,
      r = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await c(n, r)
    if (!o.ok) {
      const e = await o.text()
      throw _.createApiError(o.status, e || o.statusText, 'GitLab API')
    }
    const l = await o.json()
    let i = 0,
      d = ''
    if (o.headers instanceof Headers)
      (d =
        o.headers.get('x-total') ||
        o.headers.get('X-Total') ||
        o.headers.get('x-total-count') ||
        o.headers.get('X-Total-Count') ||
        ''),
        (i = parseInt(d || '0', 10))
    else {
      if ('string' == typeof o.headers) {
        const e = o.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              s = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              d = s
              break
            }
          }
        }
      } else {
        const e = o.headers
        d =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      i = parseInt(d || '0', 10)
    }
    return !i && l.length > 0 && (i = l.length), { events: l, total: i }
  }
  async getProjectEventsWithTotal(e, t = {}) {
    const s = new URLSearchParams()
    t.after && s.set('after', t.after),
      t.before && s.set('before', t.before),
      t.sort && s.set('sort', t.sort),
      t.page && s.set('page', t.page.toString()),
      t.per_page && s.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => s.append('action', e)),
      t.target_type && t.target_type.forEach(e => s.append('target_type', e))
    const a = s.toString(),
      n = a ? `/projects/${e}/events?${a}` : `/projects/${e}/events`,
      r = `${this.baseUrl}${n}`,
      o = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      l = await c(r, o)
    if (!l.ok) {
      const e = await l.text()
      throw _.createApiError(l.status, e || l.statusText, 'GitLab API')
    }
    const i = await l.json()
    let d = 0,
      m = ''
    if (l.headers instanceof Headers)
      (m =
        l.headers.get('x-total') ||
        l.headers.get('X-Total') ||
        l.headers.get('x-total-count') ||
        l.headers.get('X-Total-Count') ||
        ''),
        (d = parseInt(m || '0', 10))
    else {
      if ('string' == typeof l.headers) {
        const e = l.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              s = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              m = s
              break
            }
          }
        }
      } else {
        const e = l.headers
        m =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      d = parseInt(m || '0', 10)
    }
    return (
      console.log('GitLab API Response:', {
        eventsCount: i.length,
        totalHeader: m,
        calculatedTotal: d,
        isHeadersInstance: l.headers instanceof Headers,
        headersType: typeof l.headers,
        allHeaders:
          l.headers instanceof Headers
            ? Object.fromEntries(l.headers.entries())
            : 'string' == typeof l.headers
              ? l.headers.split('\n').slice(0, 10).join('; ')
              : l.headers,
      }),
      0 === d &&
        i.length > 0 &&
        ((d = i.length),
        console.warn(
          'No total count in response headers, using events array length as fallback',
        )),
      { events: i, total: d }
    )
  }
  getCachedUser() {
    return this.currentUser
  }
}
function O(e, t) {
  return new P(e, t)
}
const R = {
  config: i,
  reportData: null,
  isLoading: !1,
  error: null,
  theme: i.theme,
  activePanel: 'main',
  appMode: 'events',
  filterConditions: l,
  sortOptions: o,
  paginationOptions: r,
  events: [],
  totalCount: 0,
  aiGenerationConfig: null,
  projects: [],
  selectedProjectId: null,
  commits: [],
}
function U() {
  const [e, t] = s.useState(R)
  s.useEffect(() => {
    ;(async () => {
      try {
        const e = await d.loadConfig(),
          s = e ? { ...i, ...e } : i
        t(e => ({ ...e, config: s, theme: s.theme || i.theme }))
      } catch (e) {
        console.error('Failed to load saved config:', e),
          t(e => ({ ...e, config: i, theme: i.theme }))
      }
    })()
  }, [])
  const a = s.useCallback(e => {
      t(t => {
        const s = { ...t.config, ...e }
        try {
          d.saveConfig(s)
        } catch (a) {
          console.error('Failed to save config:', a)
        }
        return { ...t, config: s }
      })
    }, []),
    n = s.useCallback(e => {
      t(t => ({ ...t, activePanel: e }))
    }, []),
    r = s.useCallback(e => {
      t(t => ({ ...t, appMode: e }))
    }, []),
    o = s.useCallback(e => {
      t(t => ({ ...t, projects: e }))
    }, []),
    l = s.useCallback(e => {
      t(t => ({ ...t, selectedProjectId: e }))
    }, []),
    c = s.useCallback(e => {
      t(t => ({ ...t, commits: e }))
    }, []),
    _ = s.useCallback(e => {
      t(t => ({
        ...t,
        filterConditions: e,
        paginationOptions: { ...t.paginationOptions, page: 1 },
      }))
    }, []),
    g = s.useCallback(e => {
      t(t => ({ ...t, sortOptions: e }))
    }, []),
    m = s.useCallback(e => {
      t(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
    }, []),
    u = s.useCallback(e => {
      t(t => ({ ...t, events: e }))
    }, []),
    p = s.useCallback(e => {
      t(t => ({
        ...t,
        totalCount: e,
        paginationOptions: { ...t.paginationOptions, total: e },
      }))
    }, []),
    h = s.useCallback(e => {
      t(t => ({ ...t, aiGenerationConfig: e }))
    }, []),
    x = s.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    w = s.useCallback(e => {
      t(t => ({ ...t, error: e }))
    }, []),
    v = s.useCallback(e => {
      t(t => ({ ...t, reportData: e }))
    }, []),
    b = s.useCallback(e => {
      t(t => {
        const s = { ...t.config, theme: e }
        try {
          d.saveConfig(s)
        } catch (a) {
          console.error('Failed to save theme:', a)
        }
        return { ...t, config: s, theme: e }
      })
    }, []),
    f = s.useCallback(() => {
      t(e => {
        let t
        switch (e.theme) {
          case 'light':
            t = 'dark'
            break
          case 'dark':
            t = 'system'
            break
          default:
            t = 'light'
        }
        const s = { ...e.config, theme: t }
        try {
          d.saveConfig(s)
        } catch (a) {
          console.error('Failed to save theme:', a)
        }
        return { ...e, config: s, theme: t }
      })
    }, []),
    j = s.useCallback(() => {
      t(R), d.clearConfig()
    }, []),
    N = s.useCallback(() => {
      const {
        gitlabUrl: t,
        gitlabToken: s,
        deepseekApiKey: a,
        defaultPrompt: n,
      } = e.config
      return !!(t.trim() && s.trim() && a.trim() && n.trim())
    }, [e.config]),
    y = s.useCallback(() => {
      const t = new Date(),
        s = e.filterConditions.timeRange,
        a = 864e5,
        n = new Date(t.getTime() + a)
      if ('week' === s) {
        const e = t.getDay()
        let s = 0 === e ? 6 : e - 1
        1 === e && (s += 1)
        return {
          startDate: new Date(t.getTime() - s * a).toISOString().split('T')[0],
          endDate: n.toISOString().split('T')[0],
        }
      }
      let r = 7
      r = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[s] || 7
      return {
        startDate: new Date(t.getTime() - r * a).toISOString().split('T')[0],
        endDate: n.toISOString().split('T')[0],
      }
    }, [e.filterConditions.timeRange])
  return {
    state: e,
    updateConfig: a,
    setActivePanel: n,
    setAppMode: r,
    setProjects: o,
    setSelectedProjectId: l,
    setCommits: c,
    updateFilterConditions: _,
    updateSortOptions: g,
    updatePaginationOptions: m,
    setEvents: u,
    setTotal: p,
    setAIGenerationConfig: h,
    setLoading: x,
    setError: w,
    setReportData: v,
    setTheme: b,
    toggleTheme: f,
    resetState: j,
    isConfigValid: N,
    getTimeRange: y,
  }
}
const B = 'gwrs-index-module__filter-section-content__y5rEz',
  G = 'gwrs-index-module__filter-group__5B49Z',
  F = 'gwrs-index-module__filter-label__kgsrz',
  q = 'gwrs-index-module__filter-options__83wOv',
  H = 'gwrs-index-module__filter-option__SG0B9',
  z = 'gwrs-index-module__active__IQgMz',
  V = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  X = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  K = [
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
    { value: 'closed', label: 'Closed' },
    { value: 'reopened', label: 'Reopened' },
    { value: 'pushed', label: 'Pushed' },
    { value: 'commented', label: 'Commented' },
    { value: 'merged', label: 'Merged' },
    { value: 'approved', label: 'Approved' },
    { value: 'joined', label: 'Joined' },
    { value: 'left', label: 'Left' },
    { value: 'deleted', label: 'Deleted' },
  ],
  Q = ({ filterConditions: e, onFilterChange: t }) => {
    const s = (s, a) => {
        t({ ...e, [s]: a })
      },
      a = [
        { key: 'targetType', label: '目标类型', options: X },
        { key: 'action', label: '操作类型', options: K },
      ]
    return k.jsxs('div', {
      className: B,
      children: [
        k.jsxs('div', {
          className: G,
          children: [
            k.jsx('label', { className: F, children: '时间范围' }),
            k.jsx('div', {
              className: q,
              children: V.map(({ value: t, label: a }) =>
                k.jsx(
                  'button',
                  {
                    className: `${H} ${e.timeRange === t ? z : ''}`,
                    onClick: () => s('timeRange', t),
                    children: a,
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
        a.map(({ key: t, label: a, options: n }) =>
          k.jsxs(
            'div',
            {
              className: G,
              children: [
                k.jsx('label', { className: F, children: a }),
                k.jsxs('div', {
                  className: q,
                  children: [
                    k.jsx('button', {
                      className: `${H} ${0 === e[t].length ? z : ''}`,
                      onClick: () => s(t, []),
                      children: '全部',
                    }),
                    n.map(({ value: a, label: n }) =>
                      k.jsx(
                        'button',
                        {
                          className: `${H} ${Array.isArray(e[t]) && e[t].includes(a) ? z : ''}`,
                          onClick: () =>
                            ((t, a, n) => {
                              const r = e[t],
                                o = n ? [...r, a] : r.filter(e => e !== a)
                              s(t, o)
                            })(t, a, !e[t].includes(a)),
                          children: n,
                        },
                        a,
                      ),
                    ),
                  ],
                }),
              ],
            },
            t,
          ),
        ),
      ],
    })
  },
  Z = {
    pagination: 'gwrs-index-module__pagination__5dauU',
    paginationInfo: 'gwrs-index-module__pagination-info__xbUbw',
    paginationControls: 'gwrs-index-module__pagination-controls__q2hqL',
    paginationBtn: 'gwrs-index-module__pagination-btn__P1OCG',
    disabled: 'gwrs-index-module__disabled__BywdX',
    active: 'gwrs-index-module__active__lSJu-',
    paginationEllipsis: 'gwrs-index-module__pagination-ellipsis__gQnax',
    paginationSizeChanger: 'gwrs-index-module__pagination-size-changer__SufyI',
    paginationSelect: 'gwrs-index-module__pagination-select__JwvbH',
  },
  Y = n.memo(
    ({
      current: e,
      pageSize: t,
      total: s,
      onChange: a,
      showSizeChanger: r = !0,
      pageSizeOptions: o = [20, 50, 100, 200],
      onShowSizeChange: l,
    }) => {
      const i = Math.ceil(s / t),
        d = (e - 1) * t + 1,
        c = Math.min(e * t, s),
        _ = t => {
          t >= 1 && t <= i && t !== e && a(t)
        }
      return 0 === s
        ? k.jsx('div', {
            className: Z.pagination,
            children: k.jsx('div', {
              className: Z.info,
              children: k.jsx('span', { children: '暂无数据' }),
            }),
          })
        : k.jsxs('div', {
            className: Z.pagination,
            children: [
              k.jsx('div', {
                className: Z.paginationInfo,
                children: k.jsxs('span', {
                  children: ['显示 ', d, '-', c, ' 条，共 ', s, ' 条'],
                }),
              }),
              k.jsxs('div', {
                className: Z.paginationControls,
                children: [
                  k.jsx('button', {
                    className: `${Z.paginationBtn} ${1 === e ? Z.disabled : ''}`,
                    onClick: () => _(e - 1),
                    disabled: 1 === e,
                    children: k.jsx('span', { children: '‹' }),
                  }),
                  (() => {
                    if (i <= 7)
                      return Array.from({ length: i }, (e, t) => t + 1)
                    const t = [1],
                      s = Math.max(2, e - 2),
                      a = Math.min(i - 1, e + 2)
                    e > 4 && t.push('...')
                    for (let e = s; e <= a; e++) t.push(e)
                    return e < i - 2 - 1 && t.push('...'), t.push(i), t
                  })().map((t, s) =>
                    k.jsx(
                      n.Fragment,
                      {
                        children:
                          'number' == typeof t
                            ? k.jsx('button', {
                                className: `${Z.paginationBtn} ${e === t ? Z.active : ''}`,
                                onClick: () => _(t),
                                children: t,
                              })
                            : k.jsx('span', {
                                className: Z.paginationEllipsis,
                                children: t,
                              }),
                      },
                      s,
                    ),
                  ),
                  k.jsx('button', {
                    className: `${Z.paginationBtn} ${e === i ? Z.disabled : ''}`,
                    onClick: () => _(e + 1),
                    disabled: e === i,
                    children: k.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              r &&
                k.jsxs('div', {
                  className: Z.paginationSizeChanger,
                  children: [
                    k.jsx('span', { children: '每页' }),
                    k.jsx('select', {
                      value: t,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (l && l(1, t))
                        var t
                      },
                      className: Z.paginationSelect,
                      children: o.map(e =>
                        k.jsx('option', { value: e, children: e }, e),
                      ),
                    }),
                    k.jsx('span', { children: '条' }),
                  ],
                }),
            ],
          })
    },
  ),
  J = 'gwrs-index-module__selectionManager__BVUt4',
  W = 'gwrs-index-module__selectionInfo__xzOCm',
  ee = 'gwrs-index-module__selectionCount__C1Iwo',
  te = 'gwrs-index-module__selectionActions__Apagf',
  se = 'gwrs-index-module__actionGroup__E-C1y',
  ae = 'gwrs-index-module__groupLabel__x-jJZ',
  ne = 'gwrs-index-module__actionBtn__421Xy',
  re = 'gwrs-index-module__selectAllBtn__bMAjm',
  oe = 'gwrs-index-module__clearBtn__atjK2',
  le = n.memo(
    ({
      currentPageEvents: e,
      selectedEventIds: t,
      totalCount: a,
      onSelectionChange: n,
      loading: r = !1,
    }) => {
      const o = s.useRef(!1),
        l = s.useRef(!1),
        i = s.useMemo(() => e.map(e => e.id), [e]),
        d = s.useMemo(() => t.includes(-1), [t]),
        c = s.useMemo(() => {
          if (d) return { count: a, text: `已全选 ${a} 条` }
          const e = t.filter(e => -1 !== e).length
          return { count: e, text: `已选中 ${e} 条` }
        }, [d, a, t])
      s.useEffect(() => {
        if (i.length > 0 && !d && !r) {
          const e = t.filter(e => -1 !== e)
          if (!l.current && 0 === e.length && !o.current) {
            console.log('SelectionManager: 初始化自动选择当前页')
            const e = [...i]
            n(e, !1), (l.current = !0)
          }
        }
      }, [i, t, d, r, n]),
        s.useEffect(() => {
          t.length > 0 && (o.current = !1)
        }, [t])
      const _ = s.useCallback(() => {
          console.log('SelectionManager: 点击全选按钮'),
            (o.current = !1),
            n([-1], !0)
        }, [n]),
        g = s.useCallback(() => {
          console.log('SelectionManager: 点击清空按钮'),
            (o.current = !0),
            n([], !1)
        }, [n])
      return k.jsxs('div', {
        className: J,
        children: [
          k.jsx('div', {
            className: W,
            children: k.jsx('span', { className: ee, children: c.text }),
          }),
          k.jsx('div', {
            className: te,
            children: k.jsxs('div', {
              className: se,
              children: [
                k.jsx('span', { className: ae, children: '全部:' }),
                k.jsx('button', {
                  className: `${ne} ${re}`,
                  onClick: _,
                  disabled: r || d,
                  title: '选择所有数据',
                  children: '全选',
                }),
                k.jsx('button', {
                  className: `${ne} ${oe}`,
                  onClick: g,
                  disabled: r || 0 === c.count,
                  title: '清空选择',
                  children: '清空',
                }),
              ],
            }),
          }),
        ],
      })
    },
  ),
  ie = {
    eventsList: 'gwrs-index-module__events-list__-m-9O',
    eventsListHeader: 'gwrs-index-module__events-list-header__IFdcr',
    headerCell: 'gwrs-index-module__header-cell__Q50BV',
    checkboxCell: 'gwrs-index-module__checkbox-cell__fFp2c',
    contentCell: 'gwrs-index-module__content-cell__XX9h3',
    actionCell: 'gwrs-index-module__action-cell__cQC45',
    timeCell: 'gwrs-index-module__time-cell__MQe22',
    detailCell: 'gwrs-index-module__detail-cell__zq1IN',
    sortIcon: 'gwrs-index-module__sort-icon__tSSwt',
    eventsListBody: 'gwrs-index-module__events-list-body__QknuZ',
    eventRow: 'gwrs-index-module__event-row__nD7Rz',
    selected: 'gwrs-index-module__selected__QNHpl',
    cell: 'gwrs-index-module__cell__KsOts',
    eventIcon: 'gwrs-index-module__event-icon__9UCQ3',
    eventContent: 'gwrs-index-module__event-content__YCPED',
    eventTitle: 'gwrs-index-module__event-title__530MV',
    eventDescription: 'gwrs-index-module__event-description__C3Fjc',
    actionTag: 'gwrs-index-module__action-tag__GZU05',
    eventTime: 'gwrs-index-module__event-time__1VIXa',
    detailBtn: 'gwrs-index-module__detail-btn__Q5YpF',
    detailIcon: 'gwrs-index-module__detail-icon__E5Shy',
    emptyState: 'gwrs-index-module__empty-state__ohnRa',
    emptyIcon: 'gwrs-index-module__empty-icon__OXdkI',
    eventsListLoading: 'gwrs-index-module__events-list-loading__e6mCh',
    loadingSpinner: 'gwrs-index-module__loading-spinner__C04N8',
    checkboxContainer: 'gwrs-index-module__checkbox-container__UxYEH',
    checkmark: 'gwrs-index-module__checkmark__-Dj1c',
  },
  de = n.memo(
    ({
      events: e,
      totalCount: t,
      loading: a,
      sortOptions: n,
      onSortChange: r,
      paginationOptions: o,
      onPaginationChange: l,
      selectedEventIds: i,
      isFullSelection: d,
      onSelectionChange: c,
      onEventSelect: _,
      onEventDetail: g,
    }) => {
      const u = s.useCallback(
          e => {
            if ('created_at' !== e) return
            const t = n.field === e && 'desc' === n.order ? 'asc' : 'desc'
            r({ field: e, order: t })
          },
          [n.field, n.order, r],
        ),
        p = s.useCallback(
          e => (n.field !== e ? '' : 'desc' === n.order ? '↓' : '↑'),
          [n.field, n.order],
        ),
        h = s.useCallback(
          e => {
            _(e)
          },
          [_],
        ),
        x = s.useCallback(e => {
          const t = new Date(e),
            s = new Date(),
            a =
              new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime() -
              new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
            n = Math.floor(a / 864e5),
            r = t.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          return 0 === n
            ? `今天 ${r}`
            : 1 === n
              ? `昨天 ${r}`
              : n > 1 && n <= 7
                ? `${n}天前`
                : t.toLocaleDateString('zh-CN', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
        }, []),
        w = s.useCallback(e => {
          if (e.push_data) return `推送到分支 ${e.push_data.ref}`
          if (e.note) {
            const t = 50
            return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
          }
          return 'joined' === e.action_name
            ? '加入项目'
            : e.title || e.target_title || '无标题'
        }, []),
        v = s.useCallback(
          e => {
            const { action_name: t, target_type: s } = e
            if (e.push_data) {
              const { ref: t, commit_count: s } = e.push_data
              return {
                icon: '⬆️',
                actionType: '推送',
                title: `推送到分支 ${t} (${s} 个提交)`,
              }
            }
            if (e.note) {
              const t = 50
              return {
                icon: '💬',
                actionType: '评论',
                title: `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`,
              }
            }
            const a = e.title || e.target_title || '无标题',
              n = {
                Issue: { icon: '🐛', actionType: '问题' },
                MergeRequest: { icon: '🔀', actionType: '合并请求' },
                WikiPage: { icon: '📖', actionType: 'Wiki' },
                Project: { icon: '📁', actionType: '项目' },
                Milestone: { icon: '🎯', actionType: '里程碑' },
                Epic: { icon: '🎪', actionType: 'Epic' },
                Snippet: { icon: '✂️', actionType: '代码片段' },
                User: { icon: '👤', actionType: '用户' },
                'pushed to': { icon: '⬆️', actionType: '推送' },
                'pushed new': { icon: '⬆️', actionType: '推送新分支' },
                opened: { icon: '🆕', actionType: '开启' },
                closed: { icon: '✅', actionType: '关闭' },
                merged: { icon: '🔀', actionType: '合并' },
                'commented on': { icon: '💬', actionType: '评论' },
                joined: { icon: '👋', actionType: '加入' },
                left: { icon: '👋', actionType: '离开' },
                created: { icon: '✨', actionType: '创建' },
                updated: { icon: '🔄', actionType: '更新' },
                deleted: { icon: '🗑️', actionType: '删除' },
                approved: { icon: '✅', actionType: '批准' },
                unapproved: { icon: '❌', actionType: '取消批准' },
              },
              r = (s && n[s]) || (t && n[t])
            return r
              ? { ...r, title: a }
              : { icon: '📋', actionType: s || t || '未知操作', title: w(e) }
          },
          [w],
        ),
        b = s.useCallback(e => {
          var t
          return e.push_data
            ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
            : e.note && e.target_title
              ? e.target_title
              : (null == (t = e.project) ? void 0 : t.path_with_namespace) ||
                `项目ID: ${e.project_id}` ||
                '未知项目'
        }, [])
      return k.jsxs('div', {
        className: ie.eventsList,
        children: [
          k.jsx(le, {
            currentPageEvents: e,
            selectedEventIds: i,
            totalCount: t,
            onSelectionChange: c,
            loading: a,
          }),
          k.jsxs('div', {
            className: ie.eventsListHeader,
            children: [
              k.jsx('div', {
                className: `${ie.headerCell} ${ie.checkboxCell}`,
                children: k.jsx('span', { children: '选择' }),
              }),
              k.jsx('div', {
                className: `${ie.headerCell} ${ie.contentCell}`,
                children: k.jsx('span', { children: '标题和内容' }),
              }),
              k.jsx('div', {
                className: `${ie.headerCell} ${ie.actionCell}`,
                children: k.jsx('span', { children: '操作' }),
              }),
              k.jsxs('div', {
                className: `${ie.headerCell} ${ie.timeCell}`,
                onClick: () => u('created_at'),
                children: [
                  k.jsx('span', { children: '时间' }),
                  k.jsx('span', {
                    className: ie.sortIcon,
                    children: p('created_at'),
                  }),
                ],
              }),
              k.jsx('div', {
                className: `${ie.headerCell} ${ie.detailCell}`,
                children: '详情',
              }),
            ],
          }),
          k.jsx('div', {
            className: ie.eventsListBody,
            children: a
              ? k.jsxs('div', {
                  className: ie.eventsListLoading,
                  children: [
                    k.jsx('div', { className: ie.loadingSpinner }),
                    k.jsx('p', { children: '正在加载事件数据...' }),
                  ],
                })
              : 0 === e.length
                ? k.jsxs('div', {
                    className: ie.emptyState,
                    children: [
                      k.jsx('div', { className: ie.emptyIcon, children: '📄' }),
                      k.jsx('p', { children: '暂无事件数据' }),
                      k.jsx('span', { children: m.INVALID_FILTER_OR_CONFIG }),
                    ],
                  })
                : e.map(e => {
                    const t = d || i.includes(e.id),
                      { icon: s, title: a, actionType: n } = v(e)
                    return k.jsxs(
                      'div',
                      {
                        className: `${ie.eventRow} ${t ? ie.selected : ''}`,
                        children: [
                          k.jsx('div', {
                            className: `${ie.cell} ${ie.checkboxCell}`,
                            children: k.jsxs('label', {
                              className: ie.checkboxContainer,
                              children: [
                                k.jsx('input', {
                                  type: 'checkbox',
                                  checked: t,
                                  onChange: () => h(e.id),
                                  title: t ? '取消选择' : '选择此事件',
                                }),
                                k.jsx('span', { className: ie.checkmark }),
                              ],
                            }),
                          }),
                          k.jsxs('div', {
                            className: `${ie.cell} ${ie.contentCell}`,
                            children: [
                              k.jsx('div', {
                                className: ie.eventIcon,
                                children: s,
                              }),
                              k.jsxs('div', {
                                className: ie.eventContent,
                                children: [
                                  k.jsx('div', {
                                    className: ie.eventTitle,
                                    children: a,
                                  }),
                                  k.jsx('div', {
                                    className: ie.eventDescription,
                                    children: b(e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          k.jsx('div', {
                            className: `${ie.cell} ${ie.actionCell}`,
                            children: k.jsx('span', {
                              className: ie.actionTag,
                              children: n,
                            }),
                          }),
                          k.jsx('div', {
                            className: `${ie.cell} ${ie.timeCell}`,
                            children: k.jsx('span', {
                              className: ie.eventTime,
                              children: x(e.created_at),
                            }),
                          }),
                          k.jsx('div', {
                            className: `${ie.cell} ${ie.detailCell}`,
                            children: k.jsx('button', {
                              className: ie.detailBtn,
                              onClick: () => g(e),
                              title: '查看详情',
                              children: k.jsx('span', {
                                className: ie.detailIcon,
                                children: '🔍',
                              }),
                            }),
                          }),
                        ],
                      },
                      e.id,
                    )
                  }),
          }),
          k.jsx('div', {
            className: ie.eventsListFooter,
            children: k.jsx(Y, {
              current: o.page,
              pageSize: o.pageSize,
              total: t,
              onChange: e => l({ ...o, page: e }),
              showSizeChanger: !0,
              onShowSizeChange: (e, s) => l({ page: e, pageSize: s, total: t }),
            }),
          }),
        ],
      })
    },
  ),
  ce = {
    projectSelector: 'gwrs-index-module__project-selector__1-CU4',
    selectorTrigger: 'gwrs-index-module__selector-trigger__p6K8D',
    open: 'gwrs-index-module__open__eBdQd',
    disabled: 'gwrs-index-module__disabled__wVRd6',
    projectName: 'gwrs-index-module__project-name__zeNO2',
    projectPath: 'gwrs-index-module__project-path__c0VnB',
    arrow: 'gwrs-index-module__arrow__SO96I',
    down: 'gwrs-index-module__down__fc2yF',
    up: 'gwrs-index-module__up__X13CX',
    dropdown: 'gwrs-index-module__dropdown__yr22p',
    searchSection: 'gwrs-index-module__search-section__EHsZZ',
    filtersSection: 'gwrs-index-module__filters-section__yQbV5',
    searchInput: 'gwrs-index-module__search-input__G0qdM',
    searchIcon: 'gwrs-index-module__search-icon__6sNjM',
    filterOptions: 'gwrs-index-module__filter-options__DtiKx',
    filterOption: 'gwrs-index-module__filter-option__-schj',
    sortOptions: 'gwrs-index-module__sort-options__drMrx',
    projectList: 'gwrs-index-module__project-list__wMLbm',
    loading: 'gwrs-index-module__loading__Jo9tk',
    error: 'gwrs-index-module__error__xjbeu',
    spinner: 'gwrs-index-module__spinner__tkI8a',
    projectItem: 'gwrs-index-module__project-item__UY9Nn',
    selected: 'gwrs-index-module__selected__LX5fz',
    projectInfo: 'gwrs-index-module__project-info__lH-Bx',
    projectDescription: 'gwrs-index-module__project-description__lwCNx',
    starIcon: 'gwrs-index-module__star-icon__KOGRH',
    checkIcon: 'gwrs-index-module__check-icon__eEeX-',
    emptyState: 'gwrs-index-module__empty-state__BkXac',
    emptyIcon: 'gwrs-index-module__empty-icon__W0Opg',
    emptyText: 'gwrs-index-module__empty-text__-QIhF',
    emptyHint: 'gwrs-index-module__empty-hint__pdwSU',
    pagination: 'gwrs-index-module__pagination__AFW-U',
    pageButton: 'gwrs-index-module__page-button__dDr90',
    pageInfo: 'gwrs-index-module__page-info__81boc',
    totalCount: 'gwrs-index-module__total-count__ix0Nf',
  },
  _e = class e {
    constructor() {
      t(this, 'cache', new Map()), t(this, 'CACHE_DURATION', 3e5)
    }
    static getInstance() {
      return e.instance || (e.instance = new e()), e.instance
    }
    getCacheKey(e, t, s, a, n) {
      return `${e}_${t}_${JSON.stringify(s)}_${a}_${n}`
    }
    get(e, t, s, a, n) {
      const r = this.getCacheKey(e, t, s, a, n),
        o = this.cache.get(r)
      return o && Date.now() - o.timestamp < this.CACHE_DURATION
        ? o
        : (this.cache.delete(r), null)
    }
    set(e, t, s, a, n, r, o) {
      const l = this.getCacheKey(e, t, s, a, n)
      this.cache.set(l, {
        projects: r,
        totalCount: o,
        timestamp: Date.now(),
        filters: s,
        sortBy: a,
        searchValue: n,
      })
    }
    clear() {
      this.cache.clear()
    }
    cleanup() {
      const e = Date.now()
      for (const [t, s] of this.cache.entries())
        e - s.timestamp >= this.CACHE_DURATION && this.cache.delete(t)
    }
  }
t(_e, 'instance')
let ge = _e
const me = ({
    gitlabService: e,
    selectedProjectId: t,
    onProjectSelect: a,
    isConfigValid: n,
    disabled: r = !1,
    autoLoad: o = !1,
  }) => {
    const { state: l } = U(),
      [i, d] = s.useState(!1),
      [c, g] = s.useState([]),
      [m, u] = s.useState(!1),
      [p, h] = s.useState(''),
      [x, w] = s.useState('last_activity_at'),
      [v, b] = s.useState({ starred: !1, membership: !0 }),
      [f, j] = s.useState(1),
      [N, y] = s.useState(0),
      [C, E] = s.useState(null),
      S = s.useRef(null),
      T = s.useRef(null),
      I = s.useRef(ge.getInstance()),
      M = s.useRef(null),
      $ = s.useCallback(
        async (s, r) => {
          if (!n()) return
          const o = s || p || '',
            i = v,
            d = x,
            c = I.current.get(l.config.gitlabUrl, l.config.gitlabToken, i, d, o)
          if (c && 1 === (r || f))
            return (
              g(c.projects),
              y(c.totalCount),
              void (!t && c.projects.length > 0 && a(c.projects[0].id))
            )
          u(!0), E(null)
          try {
            await e.init()
            const s = {
                membership: i.membership || void 0,
                starred: i.starred || void 0,
                simple: !0,
                order_by: d,
                search: o || void 0,
                page: r || f,
                per_page: 20,
              },
              { projects: n, total: c } = await e.getProjectsWithTotal(s)
            1 === (r || f) &&
              I.current.set(
                l.config.gitlabUrl,
                l.config.gitlabToken,
                i,
                d,
                o,
                n,
                c,
              ),
              g(n),
              y(c),
              !t && n.length > 0 && a(n[0].id)
          } catch (m) {
            console.error('Failed to fetch projects:', _.formatErrorMessage(m)),
              E('获取项目列表失败'),
              g([]),
              y(0)
          } finally {
            u(!1)
          }
        },
        [n, e, v, x, p, f, t, a, l.config.gitlabUrl, l.config.gitlabToken],
      ),
      D = s.useMemo(
        () => e => {
          M.current && clearTimeout(M.current),
            (M.current = setTimeout(() => {
              j(1), $(e, 1)
            }, 300))
        },
        [$],
      )
    s.useEffect(() => {
      i && $()
    }, [i, v, x, f, $]),
      s.useEffect(() => {
        o && n() && $()
      }, [o, n, $])
    const A = s.useCallback(
        e => {
          const t = e.target.value
          h(t), D(t)
        },
        [D],
      ),
      L = s.useCallback(e => {
        w(e), j(1)
      }, []),
      P = s.useCallback((e, t) => {
        b(s => ({ ...s, [e]: t })), j(1)
      }, []),
      O = s.useCallback(
        e => {
          a(e), d(!1)
        },
        [a],
      ),
      R = s.useCallback(e => {
        j(e)
      }, [])
    s.useEffect(() => {
      const e = e => {
        S.current && !S.current.contains(e.target) && d(!1)
      }
      return (
        document.addEventListener('mousedown', e),
        () => {
          document.removeEventListener('mousedown', e)
        }
      )
    }, []),
      s.useEffect(() => {
        i && T.current && T.current.focus()
      }, [i])
    const B = s.useMemo(() => c.find(e => e.id === t), [c, t]),
      G = Math.ceil(N / 20)
    return k.jsxs('div', {
      className: ce.projectSelector,
      ref: S,
      children: [
        k.jsxs('div', {
          className: `${ce.selectorTrigger} ${i ? ce.open : ''} ${r ? ce.disabled : ''}`,
          onClick: () => !r && d(!i),
          children: [
            k.jsx('span', {
              className: ce.selectedText,
              children: B ? B.path_with_namespace : '请选择项目',
            }),
            k.jsx('span', {
              className: `${ce.arrow} ${i ? ce.up : ce.down}`,
              children: '▼',
            }),
          ],
        }),
        i &&
          !r &&
          k.jsxs('div', {
            className: ce.dropdown,
            children: [
              k.jsxs('div', {
                className: ce.searchSection,
                children: [
                  k.jsxs('div', {
                    className: ce.searchInput,
                    children: [
                      k.jsx('span', {
                        className: ce.searchIcon,
                        children: '🔍',
                      }),
                      k.jsx('input', {
                        ref: T,
                        type: 'text',
                        placeholder: '搜索项目...',
                        value: p,
                        onChange: A,
                      }),
                    ],
                  }),
                  k.jsxs('div', {
                    className: ce.filtersSection,
                    children: [
                      k.jsxs('div', {
                        className: ce.filterOptions,
                        children: [
                          k.jsxs('label', {
                            className: ce.filterOption,
                            children: [
                              k.jsx('input', {
                                type: 'checkbox',
                                checked: v.membership,
                                onChange: e =>
                                  P('membership', e.target.checked),
                              }),
                              '我的项目',
                            ],
                          }),
                          k.jsxs('label', {
                            className: ce.filterOption,
                            children: [
                              k.jsx('input', {
                                type: 'checkbox',
                                checked: v.starred,
                                onChange: e => P('starred', e.target.checked),
                              }),
                              '已收藏',
                            ],
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: ce.sortOptions,
                        children: [
                          k.jsx('label', { children: '排序：' }),
                          k.jsxs('select', {
                            value: x,
                            onChange: e => L(e.target.value),
                            children: [
                              k.jsx('option', {
                                value: 'last_activity_at',
                                children: '按活跃度排序',
                              }),
                              k.jsx('option', {
                                value: 'name',
                                children: '按名称排序',
                              }),
                              k.jsx('option', {
                                value: 'created_at',
                                children: '按创建时间排序',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              k.jsx('div', {
                className: ce.projectList,
                children: m
                  ? k.jsxs('div', {
                      className: ce.loading,
                      children: [
                        k.jsx('div', { className: ce.spinner }),
                        '加载中...',
                      ],
                    })
                  : C
                    ? k.jsx('div', { className: ce.error, children: C })
                    : 0 === c.length
                      ? k.jsxs('div', {
                          className: ce.emptyState,
                          children: [
                            k.jsx('div', {
                              className: ce.emptyIcon,
                              children: '📄',
                            }),
                            k.jsx('div', {
                              className: ce.emptyText,
                              children: '暂无项目',
                            }),
                            k.jsx('div', {
                              className: ce.emptyHint,
                              children: '请检查筛选条件或搜索关键词',
                            }),
                          ],
                        })
                      : c.map(e =>
                          k.jsxs(
                            'div',
                            {
                              className: `${ce.projectItem} ${e.id === t ? ce.selected : ''}`,
                              onClick: () => O(e.id),
                              children: [
                                k.jsxs('div', {
                                  className: ce.projectInfo,
                                  children: [
                                    k.jsx('div', {
                                      className: ce.projectName,
                                      children: e.name,
                                    }),
                                    k.jsx('div', {
                                      className: ce.projectPath,
                                      children: e.path_with_namespace,
                                    }),
                                    e.description &&
                                      k.jsx('div', {
                                        className: ce.projectDescription,
                                        children: e.description,
                                      }),
                                  ],
                                }),
                                e.starred &&
                                  k.jsx('span', {
                                    className: ce.starIcon,
                                    children: '⭐',
                                  }),
                                e.id === t &&
                                  k.jsx('span', {
                                    className: ce.checkIcon,
                                    children: '✓',
                                  }),
                              ],
                            },
                            e.id,
                          ),
                        ),
              }),
              G > 1 &&
                k.jsxs('div', {
                  className: ce.pagination,
                  children: [
                    k.jsx('button', {
                      className: ce.pageButton,
                      disabled: f <= 1,
                      onClick: () => R(f - 1),
                      children: '上一页',
                    }),
                    k.jsxs('div', {
                      className: ce.pageInfo,
                      children: [
                        k.jsxs('span', { children: [f, ' / ', G] }),
                        k.jsxs('div', {
                          className: ce.totalCount,
                          children: ['共 ', N, ' 个项目'],
                        }),
                      ],
                    }),
                    k.jsx('button', {
                      className: ce.pageButton,
                      disabled: f >= G,
                      onClick: () => R(f + 1),
                      children: '下一页',
                    }),
                  ],
                }),
            ],
          }),
      ],
    })
  },
  ue = 'gwrs-index-module__changelogPanel__bsoH5',
  pe = 'gwrs-index-module__projectSelectorContainer__DVUJQ',
  he = 'gwrs-index-module__eventsListContainer__JlSig',
  xe = 'gitlab-changelog-selected-project',
  we = ({ onStateChange: e }) => {
    const { state: t, isConfigValid: a } = U(),
      {
        createRequest: n,
        isRequestCancelled: r,
        cleanupRequest: o,
        isAbortError: l,
      } = L(),
      i = s.useMemo(
        () => O(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [d, c] = s.useState(() => {
        const e = localStorage.getItem(xe)
        return e ? parseInt(e, 10) : null
      }),
      [g, m] = s.useState([]),
      [u, p] = s.useState(0),
      [h, x] = s.useState(!1),
      [w, v] = s.useState({ field: 'created_at', order: 'desc' }),
      [b, f] = s.useState({ page: 1, pageSize: 20, total: 0 }),
      [j, N] = s.useState([]),
      y = s.useMemo(() => 1 === j.length && 0 === j[0] && u > 0, [j, u])
    s.useEffect(() => {
      e &&
        e({
          selectedEventIds: j,
          isAllEventsSelected: y,
          totalCount: u,
          events: g,
        })
    }, [j, y, u, g, e])
    const C = s.useCallback(e => {
        c(e),
          e
            ? localStorage.setItem(xe, e.toString())
            : localStorage.removeItem(xe),
          f(e => ({ ...e, page: 1 })),
          N([])
      }, []),
      E = s.useCallback(async () => {
        if (!a() || !d) return m([]), void p(0)
        const e = n()
        x(!0)
        try {
          await i.init()
          const t = {
              page: b.page,
              per_page: b.pageSize,
              sort: w.order,
              signal: e.signal,
            },
            { events: s, total: a } = await i.getProjectEventsWithTotal(d, t)
          if (r(e)) return
          m(s), N(e => (1 === e.length && 0 === e[0] ? e : [])), p(a)
        } catch (t) {
          if (l(t)) return
          console.error(
            '❌ [ChangelogPanel] Failed to fetch events:',
            _.formatErrorMessage(t),
          ),
            m([]),
            p(0)
        } finally {
          r(e) || x(!1), o(e)
        }
      }, [a, i, d, b, w, n, r, l, o])
    s.useEffect(() => {
      E()
    }, [E])
    const S = s.useCallback(e => {
        v(e)
      }, []),
      T = s.useCallback(e => {
        f(e)
      }, [])
    return k.jsxs('div', {
      className: ue,
      children: [
        k.jsx('div', {
          className: pe,
          children: k.jsx(me, {
            gitlabService: i,
            selectedProjectId: d,
            onProjectSelect: C,
            isConfigValid: a,
            autoLoad: !0,
          }),
        }),
        k.jsx('div', {
          className: he,
          children: k.jsx(de, {
            events: g,
            totalCount: u,
            loading: h,
            sortOptions: w,
            onSortChange: S,
            paginationOptions: b,
            onPaginationChange: T,
            selectedEventIds: j,
            onSelectionChange: (e, t) => {
              N(e), t && N([0])
            },
            isFullSelection: y,
            onEventSelect: e => {
              const t = j.includes(e)
              if (y && !t) {
                const t = g.filter(t => t.id !== e).map(e => e.id)
                N(t)
              } else {
                if (y && t) return
                N(s => (t ? s.filter(t => t !== e) : [...s, e]))
              }
            },
            onEventDetail: () => {},
            mode: 'changelog',
          }),
        }),
      ],
    })
  },
  ve = {
    actionBtn: 'gwrs-index-module__action-btn__To7Ms',
    versionBtn: 'gwrs-index-module__version-btn__8d3di',
    hasUpdate: 'gwrs-index-module__has-update__tNkZZ',
    icon: 'gwrs-index-module__icon__EhhVu',
    text: 'gwrs-index-module__text__4iX-h',
    notificationOverlay: 'gwrs-index-module__notification-overlay__E4dh-',
    notification: 'gwrs-index-module__notification__ckX1l',
    notificationHeader: 'gwrs-index-module__notification-header__nJZ3Q',
    closeBtn: 'gwrs-index-module__close-btn__9uULv',
    notificationBody: 'gwrs-index-module__notification-body__nnab7',
    versionInfo: 'gwrs-index-module__version-info__-pyIP',
    releaseNotes: 'gwrs-index-module__release-notes__iU2jG',
    notesContent: 'gwrs-index-module__notes-content__ZpxxA',
    notificationFooter: 'gwrs-index-module__notification-footer__La-ia',
    laterBtn: 'gwrs-index-module__later-btn__Q40Lc',
    updateBtn: 'gwrs-index-module__update-btn__lD1V2',
  },
  be = ({ currentVersion: e }) => {
    const [t, n] = s.useState(null),
      [r, o] = s.useState(!1),
      [l, i] = s.useState(!1),
      [d, _] = s.useState(!1),
      [g, m] = s.useState(null),
      [u, p] = s.useState(null),
      [h, x] = s.useState(!1),
      [w, v] = s.useState(new Set())
    s.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && v(new Set(JSON.parse(e)))
      } catch (e) {
        console.warn('无法读取忽略版本信息:', e)
      }
    }, [])
    const b = s.useCallback((e, t) => {
        const s = e.split('.').map(Number),
          a = t.split('.').map(Number),
          n = Math.max(s.length, a.length)
        for (let r = 0; r < n; r++) {
          const e = s[r] || 0,
            t = a[r] || 0
          if (t > e) return !0
          if (t < e) return !1
        }
        return !1
      }, []),
      f = s.useCallback(
        async (s = !0) => {
          if (!r)
            if (h && t && l && s)
              (!s && w.has(t.version)) ||
                (_(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              o(!0), p(null)
              try {
                const t = new AbortController(),
                  a = setTimeout(() => t.abort(), 1e4),
                  r = Math.floor(Date.now() / 36e5),
                  o = 'undefined' != typeof GM_xmlhttpRequest,
                  l =
                    !1 && !o
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  d = await c(`${l}?t=${r}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    signal: t.signal,
                    timeout: 1e4,
                  })
                if ((clearTimeout(a), !d.ok))
                  throw new Error(`HTTP ${d.status}: ${d.statusText}`)
                const g = await d.json()
                console.log('获取到版本信息:', g)
                const u = {
                  version: g.version,
                  downloadUrl:
                    'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                  releaseNotes: `版本 ${g.version} 已发布，请及时更新以获得最新功能和修复。`,
                }
                n(u), m(new Date()), x(!0)
                const p = b(e, u.version)
                i(p),
                  p
                    ? s || !w.has(u.version)
                      ? (_(!0),
                        console.log(`发现新版本 ${u.version}，建议及时更新！`))
                      : console.log(`发现新版本 ${u.version}，但已被忽略`)
                    : console.log('当前已是最新版本')
              } catch (a) {
                console.error('检查版本更新失败:', a)
                const e = a instanceof Error ? a.message : '检查更新失败'
                p(e), console.error(`检查更新失败: ${e}`)
              } finally {
                o(!1)
              }
            }
        },
        [r, b, e, w, h, t, l],
      )
    s.useEffect(() => {
      const e = setTimeout(() => {
        f(!1)
      }, 1e3)
      return () => clearTimeout(e)
    }, [])
    const j = s.useCallback(async () => {
        ;(null == t ? void 0 : t.downloadUrl) &&
          (window.open(t.downloadUrl, '_blank'),
          _(!1),
          setTimeout(async () => {
            await f(!1)
            !b(e, t.version)
              ? console.log('当前已是最新版本！')
              : console.log(
                  `检测到新版本 ${t.version}，请手动刷新页面或重新安装脚本。`,
                )
          }, 1e3))
      }, [t, f, b, e]),
      N = s.useCallback(() => {
        v(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      y = s.useCallback(() => {
        if ((_(!1), t)) {
          const s = new Set(w)
          s.add(t.version), v(s)
          try {
            localStorage.setItem(
              'gitlab-weekly-report-dismissed-versions',
              JSON.stringify(Array.from(s)),
            )
          } catch (e) {
            console.warn('无法保存忽略版本信息:', e)
          }
        }
      }, [t, w]),
      C = s.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      E = s.useCallback(
        () =>
          r
            ? '检查中...'
            : u
              ? '检查失败'
              : l
                ? '有更新'
                : h && !l
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [r, u, l, h],
      ),
      S = s.useCallback(() => (r ? '🔄' : u ? '⚠️' : l ? '🔴' : ''), [r, u, l])
    s.useEffect(() => {}, [N])
    const T = s.useCallback(() => {
      const e = 'version-notification-root'
      let t = document.getElementById(e)
      return (
        t ||
          ((t = document.createElement('div')),
          (t.id = e),
          document.body.appendChild(t)),
        t
      )
    }, [])
    return (
      s.useEffect(
        () => () => {
          const e = document.getElementById('version-notification-root')
          e && 0 === e.children.length && document.body.removeChild(e)
        },
        [],
      ),
      k.jsxs(k.Fragment, {
        children: [
          k.jsxs('button', {
            className: `${ve.actionBtn} ${ve.versionBtn} ${r ? ve.checking : ''} ${l ? ve.hasUpdate : ''}`,
            onClick: () => f(!0),
            disabled: r,
            title: g
              ? `上次检查: ${C(g)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              k.jsx('span', { className: ve.icon, children: S() }),
              k.jsx('span', { className: ve.text, children: E() }),
            ],
          }),
          d &&
            l &&
            t &&
            a.createPortal(
              k.jsx('div', {
                className: ve.notificationOverlay,
                children: k.jsxs('div', {
                  className: ve.notification,
                  children: [
                    k.jsxs('div', {
                      className: ve.notificationHeader,
                      children: [
                        k.jsx('h3', { children: '发现新版本' }),
                        k.jsx('button', {
                          className: ve.closeBtn,
                          onClick: y,
                          children: '×',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: ve.notificationBody,
                      children: [
                        k.jsxs('div', {
                          className: ve.versionInfo,
                          children: [
                            k.jsxs('p', {
                              children: [
                                k.jsx('strong', { children: '当前版本:' }),
                                ' v',
                                e,
                              ],
                            }),
                            k.jsxs('p', {
                              children: [
                                k.jsx('strong', { children: '最新版本:' }),
                                ' v',
                                t.version,
                              ],
                            }),
                          ],
                        }),
                        t.releaseNotes &&
                          k.jsxs('div', {
                            className: ve.releaseNotes,
                            children: [
                              k.jsx('h4', { children: '更新说明:' }),
                              k.jsx('div', {
                                className: ve.notesContent,
                                children: t.releaseNotes,
                              }),
                            ],
                          }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: ve.notificationFooter,
                      children: [
                        k.jsx('button', {
                          className: ve.laterBtn,
                          onClick: y,
                          children: '稍后更新',
                        }),
                        k.jsx('button', {
                          className: ve.updateBtn,
                          onClick: j,
                          children: '立即更新',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              T(),
            ),
        ],
      })
    )
  },
  fe = 'gwrs-index-module__main-panel__82FLm',
  je = 'gwrs-index-module__panel-header__kyx4p',
  Ne = 'gwrs-index-module__header-left__xT1T5',
  ye = 'gwrs-index-module__header-right__7F8Bo',
  Ce = 'gwrs-index-module__mode-toggle__9yafG',
  ke = 'gwrs-index-module__toggle-track__82VKI',
  Ee = 'gwrs-index-module__toggle-slider__tkY4o',
  Se = 'gwrs-index-module__slide-right__qPOZu',
  Te = 'gwrs-index-module__toggle-option__ZhXXU',
  Ie = 'gwrs-index-module__active__Mr5KU',
  Me = 'gwrs-index-module__toggle-icon__AI6K7',
  $e = 'gwrs-index-module__toggle-label__1qZLz',
  De = 'gwrs-index-module__divider__QXSgp',
  Ae = 'gwrs-index-module__action-buttons__xGRHl',
  Le = 'gwrs-index-module__action-btn__x4IAP',
  Pe = 'gwrs-index-module__btn-icon__ZaYHk',
  Oe = 'gwrs-index-module__btn-label__tM2Rz',
  Re = 'gwrs-index-module__ai-btn__5kAV3',
  Ue = 'gwrs-index-module__config-incomplete__bLEHk',
  Be = 'gwrs-index-module__config-badge__0znDE',
  Ge = 'gwrs-index-module__changelog-section__afcqm',
  Fe = 'gwrs-index-module__filter-section__gMBIz',
  qe = 'gwrs-index-module__events-section__gJwdk',
  He = ({
    appMode: e,
    events: t,
    totalCount: s,
    loading: a,
    filterConditions: r,
    sortOptions: o,
    paginationOptions: l,
    selectedEventIds: i,
    onModeChange: d,
    onFilterChange: c,
    onSortChange: _,
    onPaginationChange: g,
    onEventSelect: m,
    onSelectionChange: h,
    onEventDetail: x,
    onOpenSettings: w,
    onOpenAI: v,
    isAllEventsSelected: b = !1,
    onChangelogStateChange: f,
  }) => {
    const { state: j } = U(),
      N = n.useMemo(() => {
        const e = [
            'gitlabUrl',
            'gitlabToken',
            'deepseekApiKey',
            'defaultPrompt',
          ],
          t = e.filter(e => {
            const t = j.config[e]
            return 'string' == typeof t ? '' !== t.trim() : !!t
          }).length
        return {
          isValid: t === e.length,
          completedCount: t,
          totalCount: e.length,
        }
      }, [j.config])
    return k.jsxs('div', {
      className: fe,
      children: [
        k.jsxs('div', {
          className: je,
          children: [
            k.jsx('div', {
              className: Ne,
              children: k.jsx('div', {
                className: Ce,
                children: k.jsxs('div', {
                  className: ke,
                  children: [
                    k.jsx('div', {
                      className: `${Ee} ${'changelog' === e ? Se : ''}`,
                    }),
                    k.jsxs('button', {
                      className: `${Te} ${'events' === e ? Ie : ''}`,
                      onClick: () => d('events'),
                      children: [
                        k.jsx('span', { className: Me, children: '📋' }),
                        k.jsx('span', { className: $e, children: 'Events' }),
                      ],
                    }),
                    k.jsxs('button', {
                      className: `${Te} ${'changelog' === e ? Ie : ''}`,
                      onClick: () => d('changelog'),
                      children: [
                        k.jsx('span', { className: Me, children: '📝' }),
                        k.jsx('span', { className: $e, children: 'Changelog' }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            k.jsxs('div', {
              className: ye,
              children: [
                k.jsx(be, { currentVersion: u }),
                k.jsx('div', { className: De }),
                k.jsxs('div', {
                  className: Ae,
                  children: [
                    k.jsxs('button', {
                      className: `${Le} ${N.isValid ? '' : Ue}`,
                      onClick: w,
                      title: N.isValid
                        ? '设置'
                        : `配置未完成 (${N.completedCount}/${N.totalCount})`,
                      children: [
                        k.jsx('span', {
                          className: Pe,
                          children: k.jsxs('svg', {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            children: [
                              k.jsx('path', {
                                d: 'M12 15a3 3 0 100-6 3 3 0 000 6z',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                              }),
                              k.jsx('path', {
                                d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                              }),
                            ],
                          }),
                        }),
                        k.jsxs('span', {
                          className: Oe,
                          children: [
                            '设置',
                            !N.isValid &&
                              k.jsxs('span', {
                                className: Be,
                                children: [N.completedCount, '/', N.totalCount],
                              }),
                          ],
                        }),
                      ],
                    }),
                    k.jsxs('button', {
                      className: `${Le} ${Re}`,
                      onClick: v,
                      title:
                        'changelog' === e
                          ? p.changelog.title
                          : p['weekly-report'].title,
                      children: [
                        k.jsx('span', {
                          className: Pe,
                          children: k.jsxs('svg', {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            children: [
                              k.jsx('path', {
                                d: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
                                fill: 'currentColor',
                              }),
                              k.jsx('path', {
                                d: 'M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z',
                                fill: 'currentColor',
                              }),
                              k.jsx('path', {
                                d: 'M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z',
                                fill: 'currentColor',
                              }),
                            ],
                          }),
                        }),
                        k.jsx('span', {
                          className: Oe,
                          children:
                            'changelog' === e
                              ? p.changelog.buttonText
                              : p['weekly-report'].buttonText,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        'events' === e
          ? k.jsxs(k.Fragment, {
              children: [
                k.jsx('div', {
                  className: Fe,
                  children: k.jsx(Q, {
                    filterConditions: r,
                    onFilterChange: c,
                  }),
                }),
                k.jsx('div', {
                  className: qe,
                  children: k.jsx(de, {
                    events: t,
                    totalCount: s,
                    loading: a,
                    sortOptions: o,
                    onSortChange: _,
                    paginationOptions: l,
                    onPaginationChange: g,
                    selectedEventIds: i,
                    onSelectionChange: h,
                    isFullSelection: b,
                    onEventSelect: m,
                    onEventDetail: x,
                    mode: e,
                  }),
                }),
              ],
            })
          : k.jsx('div', {
              className: Ge,
              children: k.jsx(we, { onStateChange: f }),
            }),
      ],
    })
  },
  ze = 'gwrs-index-module__modal-mask__XYxyO',
  Ve = 'gwrs-index-module__modal-wrapper__bVZip',
  Xe = 'gwrs-index-module__modal__QQS3u',
  Ke = 'gwrs-index-module__modal-header__GdUjX',
  Qe = 'gwrs-index-module__modal-title__cafB-',
  Ze = 'gwrs-index-module__modal-close__ZuUgf',
  Ye = 'gwrs-index-module__modal-body__j5X3U',
  Je = 'gwrs-index-module__modal-footer__3q-wn',
  We = ({
    visible: e,
    title: t,
    width: n = 520,
    maxHeight: r = window.innerHeight - 180,
    children: o,
    footer: l,
    onClose: i,
    maskClosable: d = !0,
  }) => {
    if (
      (s.useEffect(() => {
        const t = t => {
          'Escape' === t.key && e && i()
        }
        return (
          e &&
            (document.addEventListener('keydown', t),
            (document.body.style.overflow = 'hidden')),
          () => {
            document.removeEventListener('keydown', t),
              (document.body.style.overflow = 'unset')
          }
        )
      }, [e, i]),
      s.useEffect(
        () => () => {
          const e = document.getElementById('gitlab-weekly-report-modal-root')
          e && 0 === e.children.length && document.body.removeChild(e)
        },
        [],
      ),
      !e)
    )
      return null
    const c = k.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: ze,
      onClick: e => {
        e.target === e.currentTarget && d && i()
      },
      children: k.jsx('div', {
        className: Ve,
        children: k.jsxs('div', {
          className: Xe,
          style: { width: n, maxHeight: r },
          children: [
            k.jsxs('div', {
              className: Ke,
              children: [
                k.jsx('div', { className: Qe, children: t }),
                k.jsx('button', {
                  className: Ze,
                  onClick: i,
                  children: k.jsx('span', { children: '×' }),
                }),
              ],
            }),
            k.jsx('div', { className: Ye, children: o }),
            l && k.jsx('div', { className: Je, children: l }),
          ],
        }),
      }),
    })
    return a.createPortal(
      c,
      (() => {
        let e = document.getElementById('gitlab-weekly-report-modal-root')
        return (
          e ||
            ((e = document.createElement('div')),
            (e.id = 'gitlab-weekly-report-modal-root'),
            document.body.appendChild(e)),
          e
        )
      })(),
    )
  },
  et = 'gwrs-index-module__config-status__0q8ZM',
  tt = 'gwrs-index-module__clickable__pZ86X',
  st = 'gwrs-index-module__compact__-QN-s',
  at = 'gwrs-index-module__compact-content__wSrCk',
  nt = 'gwrs-index-module__status-icon__7jFiQ',
  rt = 'gwrs-index-module__compact-text__7OyGG',
  ot = 'gwrs-index-module__expand-button__NusWg',
  lt = 'gwrs-index-module__expanded-content__Hih4c',
  it = 'gwrs-index-module__config-items__quryV',
  dt = 'gwrs-index-module__compact-item__UCAOc',
  ct = 'gwrs-index-module__item-label__24FVq',
  _t = 'gwrs-index-module__item-icon__4yYRW',
  gt = 'gwrs-index-module__valid__Xyroo',
  mt = 'gwrs-index-module__invalid__Fn-hL',
  ut = 'gwrs-index-module__status-header__AORn-',
  pt = 'gwrs-index-module__status-title__6hAD6',
  ht = 'gwrs-index-module__status-text__llRfw',
  xt = 'gwrs-index-module__progress-container__ofPka',
  wt = 'gwrs-index-module__progress-bar__CFedX',
  vt = 'gwrs-index-module__progress-fill__w-23-',
  bt = 'gwrs-index-module__complete__L0-gl',
  ft = 'gwrs-index-module__progress-text__uoYK9',
  jt = 'gwrs-index-module__config-item__m6pYF',
  Nt = 'gwrs-index-module__item-info__BhIr5',
  yt = 'gwrs-index-module__item-status__3ppNU',
  Ct = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  kt = Ct.length,
  Et = ({
    config: e,
    className: t = '',
    showDetails: a = !0,
    onClick: r,
    compact: o = !1,
  }) => {
    const l = s.useMemo(() => {
        const t = Ct.map(t => {
            const s = e[t.key],
              a = 'string' == typeof s ? '' !== s.trim() : !!s
            return { ...t, isValid: a, value: a ? '已配置' : '未配置' }
          }),
          s = t.filter(e => e.isValid).length
        return {
          isValid: s === kt,
          itemsStatus: t,
          completedCount: s,
          totalCount: kt,
          progress: (s / kt) * 100,
        }
      }, [e]),
      [i, d] = n.useState(!l.isValid)
    return o && l.isValid
      ? k.jsxs('div', {
          className: `${et} ${st} ${t} ${r ? tt : ''}`,
          onClick: r,
          children: [
            k.jsxs('div', {
              className: at,
              children: [
                k.jsx('span', { className: nt, children: '✅' }),
                k.jsx('span', { className: rt, children: '配置已完成' }),
                a &&
                  k.jsx('button', {
                    className: ot,
                    onClick: e => {
                      e.stopPropagation(), d(!i)
                    },
                    children: i ? '收起' : '详情',
                  }),
              ],
            }),
            a &&
              i &&
              k.jsx('div', {
                className: lt,
                children: k.jsx('div', {
                  className: it,
                  children: l.itemsStatus.map(e =>
                    k.jsxs(
                      'div',
                      {
                        className: `${jt} ${dt} ${e.isValid ? gt : mt}`,
                        children: [
                          k.jsx('span', { className: ct, children: e.label }),
                          k.jsx('span', {
                            className: _t,
                            children: e.isValid ? '✓' : '✗',
                          }),
                        ],
                      },
                      e.key,
                    ),
                  ),
                }),
              }),
          ],
        })
      : k.jsxs('div', {
          className: `${et} ${t} ${r ? tt : ''}`,
          onClick: r,
          children: [
            k.jsxs('div', {
              className: ut,
              children: [
                k.jsxs('div', {
                  className: pt,
                  children: [
                    k.jsx('span', {
                      className: nt,
                      children: l.isValid ? '✅' : '⚠️',
                    }),
                    k.jsxs('span', {
                      className: ht,
                      children: [
                        '配置状态 (',
                        l.completedCount,
                        '/',
                        l.totalCount,
                        ')',
                      ],
                    }),
                  ],
                }),
                k.jsxs('div', {
                  className: xt,
                  children: [
                    k.jsx('div', {
                      className: wt,
                      children: k.jsx('div', {
                        className: `${vt} ${l.isValid ? bt : ''}`,
                        style: { width: `${l.progress}%` },
                      }),
                    }),
                    k.jsxs('span', {
                      className: ft,
                      children: [Math.round(l.progress), '%'],
                    }),
                  ],
                }),
              ],
            }),
            a &&
              k.jsx('div', {
                className: it,
                children: l.itemsStatus.map(e =>
                  k.jsxs(
                    'div',
                    {
                      className: `${jt} ${e.isValid ? gt : mt}`,
                      children: [
                        k.jsxs('div', {
                          className: Nt,
                          children: [
                            k.jsx('span', { className: ct, children: e.label }),
                            k.jsx('span', { className: yt, children: e.value }),
                          ],
                        }),
                        k.jsx('span', {
                          className: _t,
                          children: e.isValid ? '✓' : '✗',
                        }),
                      ],
                    },
                    e.key,
                  ),
                ),
              }),
          ],
        })
  },
  St = 'gwrs-index-module__settings-panel__UCg3H',
  Tt = 'gwrs-index-module__settings-tabs__vPH-t',
  It = 'gwrs-index-module__tab-button__FG9Nc',
  Mt = 'gwrs-index-module__tab-icon__rBe-o',
  $t = 'gwrs-index-module__active__bsBC1',
  Dt = 'gwrs-index-module__settings-content__TqQPH',
  At = 'gwrs-index-module__tab-panel__Q2QUI',
  Lt = 'gwrs-index-module__form-group__zKwiA',
  Pt = 'gwrs-index-module__form-label__pwe7O',
  Ot = 'gwrs-index-module__required__2vuyW',
  Rt = 'gwrs-index-module__form-input__jGbRP',
  Ut = 'gwrs-index-module__form-select__jbXdq',
  Bt = 'gwrs-index-module__form-textarea__fAVMw',
  Gt = 'gwrs-index-module__form-hint__F0dFQ',
  Ft = 'gwrs-index-module__version-info__y0NZv',
  qt = 'gwrs-index-module__version-text__bx0HU',
  Ht = 'gwrs-index-module__settings-footer__qA44X',
  zt = 'gwrs-index-module__footer-right__bslDg',
  Vt = 'gwrs-index-module__btn-primary__ZzzFI',
  Xt = 'gwrs-index-module__switch-container__5xk1J',
  Kt = 'gwrs-index-module__switch-input__V-8fl',
  Qt = 'gwrs-index-module__switch-label__xrOeQ',
  Zt = 'gwrs-index-module__switch-slider__dG-6J',
  Yt = 'gwrs-index-module__btn-secondary__cRCpD',
  Jt = ({ isOpen: e, onClose: t, config: a, onSave: n, theme: r }) => {
    const [o, l] = s.useState(a),
      [i, d] = s.useState(r),
      [c, _] = s.useState('gitlab')
    s.useEffect(() => {
      l(a)
    }, [a]),
      s.useEffect(() => {
        d(r)
      }, [r]),
      s.useEffect(() => {
        e && (l(a), d(r))
      }, [e, a, r])
    const g = (e, t) => {
      l(s => ({ ...s, [e]: t }))
    }
    return k.jsx(We, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: k.jsxs('div', {
        className: Ht,
        children: [
          k.jsx('button', {
            className: Yt,
            onClick: () => {
              l(a), d(r)
            },
            children: '重置',
          }),
          k.jsxs('div', {
            className: zt,
            children: [
              k.jsx('button', { className: Yt, onClick: t, children: '取消' }),
              k.jsx('button', {
                className: Vt,
                onClick: () => {
                  n(o, i), t()
                },
                disabled: !(
                  o.gitlabUrl.trim() &&
                  o.gitlabToken.trim() &&
                  o.deepseekApiKey.trim() &&
                  o.defaultPrompt.trim()
                ),
                children: '保存',
              }),
            ],
          }),
        ],
      }),
      children: k.jsxs('div', {
        className: St,
        children: [
          k.jsx(Et, { config: o, showDetails: !0, compact: !0 }),
          k.jsxs('div', {
            className: Tt,
            children: [
              k.jsxs('button', {
                className: `${It} ${'gitlab' === c ? $t : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  k.jsx('span', { className: Mt, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${It} ${'deepseek' === c ? $t : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  k.jsx('span', { className: Mt, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${It} ${'appearance' === c ? $t : ''}`,
                onClick: () => _('appearance'),
                children: [
                  k.jsx('span', { className: Mt, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          k.jsxs('div', {
            className: Dt,
            children: [
              'gitlab' === c &&
                k.jsxs('div', {
                  className: At,
                  children: [
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsxs('label', {
                          className: Pt,
                          children: [
                            'GitLab 项目地址 ',
                            k.jsx('span', { className: Ot, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Rt,
                          placeholder: h.gitlabUrl,
                          value: o.gitlabUrl,
                          onChange: e => g('gitlabUrl', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsxs('label', {
                          className: Pt,
                          children: [
                            '个人访问令牌 ',
                            k.jsx('span', { className: Ot, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Rt,
                          placeholder: h.gitlabToken,
                          value: o.gitlabToken,
                          onChange: e => g('gitlabToken', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                k.jsxs('div', {
                  className: At,
                  children: [
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsxs('label', {
                          className: Pt,
                          children: [
                            'DeepSeek API Key ',
                            k.jsx('span', { className: Ot, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Rt,
                          placeholder: h.deepseekApiKey,
                          value: o.deepseekApiKey,
                          onChange: e => g('deepseekApiKey', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsx('label', {
                          className: Pt,
                          children: '使用的模型',
                        }),
                        k.jsxs('select', {
                          className: Ut,
                          value: o.model,
                          onChange: e => g('model', e.target.value),
                          children: [
                            k.jsx('option', {
                              value: 'deepseek-chat',
                              children: 'deepseek-chat',
                            }),
                            k.jsx('option', {
                              value: 'deepseek-coder',
                              children: 'deepseek-coder',
                            }),
                          ],
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsx('label', {
                          className: Pt,
                          children: 'Token 数量限制',
                        }),
                        k.jsx('input', {
                          type: 'number',
                          className: Rt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: o.tokenLimit,
                          onChange: e =>
                            g('tokenLimit', parseInt(e.target.value)),
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsxs('label', {
                          className: Pt,
                          children: [
                            '默认提示词 ',
                            k.jsx('span', { className: Ot, children: '*' }),
                          ],
                        }),
                        k.jsx('textarea', {
                          className: Bt,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: o.defaultPrompt,
                          onChange: e => g('defaultPrompt', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                k.jsxs('div', {
                  className: At,
                  children: [
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsx('label', { className: Pt, children: '主题模式' }),
                        k.jsxs('select', {
                          className: Ut,
                          value: i,
                          onChange: e => d(e.target.value),
                          children: [
                            k.jsx('option', {
                              value: 'system',
                              children: '🔄 跟随系统',
                            }),
                            k.jsx('option', {
                              value: 'light',
                              children: '☀️ 浅色模式',
                            }),
                            k.jsx('option', {
                              value: 'dark',
                              children: '🌙 深色模式',
                            }),
                          ],
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsx('label', {
                          className: Pt,
                          children: '自动检查更新',
                        }),
                        k.jsxs('div', {
                          className: Xt,
                          children: [
                            k.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: Kt,
                              checked: o.autoCheckUpdate ?? !0,
                              onChange: e =>
                                g('autoCheckUpdate', e.target.checked),
                            }),
                            k.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: Qt,
                              children: k.jsx('span', { className: Zt }),
                            }),
                          ],
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Lt,
                      children: [
                        k.jsx('label', {
                          className: Pt,
                          children: '检查更新间隔',
                        }),
                        k.jsxs('select', {
                          className: Ut,
                          value: o.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            g('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(o.autoCheckUpdate ?? 1),
                          children: [
                            k.jsx('option', { value: 6e4, children: '1分钟' }),
                            k.jsx('option', { value: 3e5, children: '5分钟' }),
                            k.jsx('option', { value: 6e5, children: '10分钟' }),
                            k.jsx('option', {
                              value: 18e5,
                              children: '30分钟',
                            }),
                            k.jsx('option', { value: 36e5, children: '1小时' }),
                          ],
                        }),
                        k.jsx('div', {
                          className: Gt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          k.jsx('div', {
            className: Ft,
            children: k.jsxs('span', { className: qt, children: ['v', u] }),
          }),
        ],
      }),
    })
  },
  Wt = {
    aiPanel: 'gwrs-index-module__ai-panel__R0K19',
    dataOverview: 'gwrs-index-module__data-overview__J-ZoM',
    overviewHeader: 'gwrs-index-module__overview-header__ae0e8',
    overviewContent: 'gwrs-index-module__overview-content__dhjh6',
    overviewItem: 'gwrs-index-module__overview-item__20Ilu',
    overviewLabel: 'gwrs-index-module__overview-label__k3QHX',
    overviewValue: 'gwrs-index-module__overview-value__gbEnJ',
    ready: 'gwrs-index-module__ready__f4MXX',
    waiting: 'gwrs-index-module__waiting__orgl9',
    resultSection: 'gwrs-index-module__result-section__esrDe',
    resultHeader: 'gwrs-index-module__result-header__-sHRM',
    resultTitle: 'gwrs-index-module__result-title__GYp3Q',
    titleIcon: 'gwrs-index-module__title-icon__w1Z58',
    resultActions: 'gwrs-index-module__result-actions__Lwz6b',
    actionBtn: 'gwrs-index-module__action-btn__X81KS',
    btnIcon: 'gwrs-index-module__btn-icon__bBkUh',
    resultContent: 'gwrs-index-module__result-content__NBmXz',
    resultText: 'gwrs-index-module__result-text__WX-aI',
    resultMeta: 'gwrs-index-module__result-meta__zAR0J',
    metaLeft: 'gwrs-index-module__meta-left__G7E6i',
    metaItem: 'gwrs-index-module__meta-item__Mikx5',
    promptSection: 'gwrs-index-module__prompt-section__Y1L-1',
    sectionHeader: 'gwrs-index-module__section-header__WEXG-',
    headerActions: 'gwrs-index-module__header-actions__phC5-',
    promptEditor: 'gwrs-index-module__prompt-editor__N6csy',
    promptTextarea: 'gwrs-index-module__prompt-textarea__ZeYSC',
    promptFooter: 'gwrs-index-module__prompt-footer__NhJb8',
    charCount: 'gwrs-index-module__char-count__qSePr',
    expanded: 'gwrs-index-module__expanded__VY5Zd',
    loadingSection: 'gwrs-index-module__loading-section__qmhp-',
    loadingSpinner: 'gwrs-index-module__loading-spinner__FhbKe',
    loadingTips: 'gwrs-index-module__loading-tips__TN0F6',
    emptyResult: 'gwrs-index-module__empty-result__D1DxK',
    emptyIcon: 'gwrs-index-module__empty-icon__RFmRa',
    emptyFeatures: 'gwrs-index-module__empty-features__Y-XeR',
    featureItem: 'gwrs-index-module__feature-item__zmC1K',
    featureIcon: 'gwrs-index-module__feature-icon__aCith',
    fetchProgress: 'gwrs-index-module__fetch-progress__u65Rg',
    progressHeader: 'gwrs-index-module__progress-header__hilxF',
    progressBar: 'gwrs-index-module__progress-bar__upGJZ',
    progressFill: 'gwrs-index-module__progress-fill__qzGhB',
    progressTip: 'gwrs-index-module__progress-tip__SZdKA',
    btnPrimary: 'gwrs-index-module__btn-primary__NTwQw',
    regenerate: 'gwrs-index-module__regenerate__MPpEF',
    btnText: 'gwrs-index-module__btn-text__f3PZM',
  },
  es = n.memo(
    ({
      visible: e,
      config: t,
      taskType: a,
      onClose: n,
      onGenerate: r,
      isLoading: o,
      selectedEventsCount: l = 0,
      allEventsCount: i = 0,
      dateRange: d,
      onFetchAllEvents: c,
      isAllSelected: _ = !1,
    }) => {
      const g = s.useMemo(() => p[a], [a]),
        [m, u] = s.useState(g.defaultPrompt),
        [h, x] = s.useState(!1),
        [w, v] = s.useState(!1),
        [b, f] = s.useState(!1),
        [j, N] = s.useState(0),
        [y, C] = s.useState(null),
        [E, S] = s.useState(!1),
        [T, I] = s.useState('')
      s.useEffect(() => {
        u(g.defaultPrompt)
      }, [g.defaultPrompt])
      const M = s.useCallback(async () => {
        if (c && !b) {
          f(!0), N(0), I('正在初始化数据获取...'), S(!0)
          try {
            let e
            const t = () => {
              N(t => {
                if (t >= 85) return clearTimeout(e), t
                const s = t + 8 * Math.random()
                return (
                  I(
                    s < 30
                      ? '正在连接GitLab API...'
                      : s < 60
                        ? '正在分批获取事件数据...'
                        : '正在处理数据...',
                  ),
                  s
                )
              }),
                (e = setTimeout(t, 400))
            }
            t()
            const s = await c()
            clearTimeout(e),
              N(100),
              I(`数据获取完成！共获取 ${s.length} 条事件`),
              C(s),
              setTimeout(() => {
                f(!1), I('')
              }, 1e3)
          } catch (e) {
            console.error('Failed to fetch all events:', e),
              f(!1),
              N(0),
              I('数据获取失败，请稍后重试'),
              setTimeout(() => I(''), 3e3)
          }
        }
      }, [c, b])
      s.useEffect(() => {
        e && _ && !E && c && M()
      }, [e, _, E, c, M])
      const $ = s.useMemo(
          () => !(o || !m.trim()) && (_ && l !== i ? !b && null !== y : l > 0),
          [o, m, _, l, i, b, y],
        ),
        D = s.useCallback(async () => {
          if (null == t ? void 0 : t.result)
            try {
              await navigator.clipboard.writeText(t.result),
                v(!0),
                setTimeout(() => v(!1), 2e3)
            } catch (e) {
              console.error('Failed to copy result:', e)
              const a = document.createElement('textarea')
              ;(a.value = t.result), document.body.appendChild(a), a.select()
              try {
                document.execCommand('copy'),
                  v(!0),
                  setTimeout(() => v(!1), 2e3)
              } catch (s) {
                console.error('Fallback copy also failed:', s)
              }
              document.body.removeChild(a)
            }
        }, [null == t ? void 0 : t.result]),
        A = s.useCallback(() => {
          u(g.defaultPrompt)
        }, [g.defaultPrompt])
      return k.jsx(We, {
        visible: e,
        title: g.title,
        width: 800,
        onClose: n,
        maskClosable: !o,
        children: k.jsxs('div', {
          className: Wt.aiPanel,
          children: [
            k.jsxs('div', {
              className: Wt.dataOverview,
              children: [
                k.jsx('div', {
                  className: Wt.overviewHeader,
                  children: k.jsx('h4', { children: '📊 数据概览' }),
                }),
                k.jsxs('div', {
                  className: Wt.overviewContent,
                  children: [
                    k.jsxs('div', {
                      className: Wt.overviewItem,
                      children: [
                        k.jsx('span', {
                          className: Wt.overviewLabel,
                          children: '已选择事件：',
                        }),
                        k.jsxs('span', {
                          className: Wt.overviewValue,
                          children: [_ && y ? y.length : l, ' ', '条'],
                        }),
                      ],
                    }),
                    d &&
                      k.jsxs('div', {
                        className: Wt.overviewItem,
                        children: [
                          k.jsx('span', {
                            className: Wt.overviewLabel,
                            children: '时间范围：',
                          }),
                          k.jsxs('span', {
                            className: Wt.overviewValue,
                            children: [d.startDate, ' 至 ', d.endDate],
                          }),
                        ],
                      }),
                    k.jsxs('div', {
                      className: Wt.overviewItem,
                      children: [
                        k.jsx('span', {
                          className: Wt.overviewLabel,
                          children: '状态：',
                        }),
                        k.jsx('span', {
                          className: `${Wt.overviewValue} ${l > 0 ? Wt.ready : Wt.waiting}`,
                          children: b
                            ? '🔄 获取数据中...'
                            : y
                              ? '✅ 数据已就绪'
                              : l > 0
                                ? '✅ 数据就绪'
                                : '⏳ 等待选择事件',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            b &&
              k.jsxs('div', {
                className: Wt.fetchProgress,
                children: [
                  k.jsxs('div', {
                    className: Wt.progressHeader,
                    children: [
                      k.jsx('span', { children: T }),
                      k.jsxs('span', { children: [Math.round(j), '%'] }),
                    ],
                  }),
                  k.jsx('div', {
                    className: Wt.progressBar,
                    children: k.jsx('div', {
                      className: Wt.progressFill,
                      style: { width: `${j}%` },
                    }),
                  }),
                  k.jsx('p', {
                    className: Wt.progressTip,
                    children:
                      '正在分批获取事件数据（每批最多100条），请稍候...',
                  }),
                ],
              }),
            k.jsxs('div', {
              className: Wt.promptSection,
              children: [
                k.jsxs('div', {
                  className: Wt.sectionHeader,
                  children: [
                    k.jsx('h3', { children: '提示词' }),
                    k.jsxs('div', {
                      className: Wt.headerActions,
                      children: [
                        k.jsx('button', {
                          className: Wt.btnText,
                          onClick: () => x(!h),
                          children: h ? '收起' : '展开',
                        }),
                        k.jsx('button', {
                          className: Wt.btnText,
                          onClick: A,
                          children: '重置',
                        }),
                      ],
                    }),
                  ],
                }),
                k.jsxs('div', {
                  className: `${Wt.promptEditor} ${h ? Wt.expanded : ''}`,
                  children: [
                    k.jsx('textarea', {
                      className: Wt.promptTextarea,
                      value: m,
                      onChange: e => u(e.target.value),
                      placeholder: g.placeholder,
                      rows: h ? 15 : 6,
                      disabled: o,
                    }),
                    k.jsxs('div', {
                      className: Wt.promptFooter,
                      children: [
                        k.jsxs('span', {
                          className: Wt.charCount,
                          children: [m.length, ' 字符'],
                        }),
                        k.jsx('button', {
                          className: `${Wt.btnPrimary} ${(null == t ? void 0 : t.result) ? Wt.regenerate : ''}`,
                          onClick: () => {
                            $ && r(m)
                          },
                          disabled: o || !m.trim() || 0 === l,
                          children: o
                            ? '生成中...'
                            : (null == t ? void 0 : t.result)
                              ? g.regenerateButtonText
                              : g.generateButtonText,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            o &&
              k.jsxs('div', {
                className: Wt.loadingSection,
                children: [
                  k.jsx('div', { className: Wt.loadingSpinner }),
                  k.jsx('p', { children: g.loadingText }),
                  k.jsx('div', {
                    className: Wt.loadingTips,
                    children: k.jsx('span', {
                      children: '💡 生成时间通常为 10-30 秒',
                    }),
                  }),
                ],
              }),
            (null == t ? void 0 : t.result) &&
              k.jsxs('div', {
                className: Wt.resultSection,
                children: [
                  k.jsxs('div', {
                    className: Wt.resultHeader,
                    children: [
                      k.jsxs('h3', {
                        className: Wt.resultTitle,
                        children: [
                          k.jsx('span', {
                            className: Wt.titleIcon,
                            children: '✨',
                          }),
                          '生成结果',
                        ],
                      }),
                      k.jsx('div', {
                        className: Wt.resultActions,
                        children: k.jsxs('button', {
                          className: `${Wt.actionBtn} ${w ? Wt.copied : ''}`,
                          onClick: D,
                          title: '一键复制',
                          disabled: w,
                          children: [
                            k.jsx('span', {
                              className: Wt.btnIcon,
                              children: w ? '✅' : '📋',
                            }),
                            w ? '已复制' : '复制',
                          ],
                        }),
                      }),
                    ],
                  }),
                  k.jsx('div', {
                    className: Wt.resultContent,
                    children: k.jsx('div', {
                      className: Wt.resultText,
                      children: t.result,
                    }),
                  }),
                  k.jsx('div', {
                    className: Wt.resultMeta,
                    children: k.jsxs('div', {
                      className: Wt.metaLeft,
                      children: [
                        k.jsx('div', {
                          className: Wt.metaItem,
                          children: k.jsxs('span', {
                            children: [t.result.split('\n').length, ' 行'],
                          }),
                        }),
                        k.jsx('div', {
                          className: Wt.metaItem,
                          children: k.jsxs('span', {
                            children: [t.result.length, ' 字符'],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            k.jsxs('div', {
              className: Wt.emptyResult,
              children: [
                k.jsx('div', { className: Wt.emptyIcon, children: '🤖' }),
                k.jsx('h3', { children: g.emptyTitle }),
                k.jsx('p', { children: g.emptyDescription }),
                k.jsxs('div', {
                  className: Wt.emptyFeatures,
                  children: [
                    k.jsxs('div', {
                      className: Wt.featureItem,
                      children: [
                        k.jsx('span', {
                          className: Wt.featureIcon,
                          children: '📊',
                        }),
                        k.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Wt.featureItem,
                      children: [
                        k.jsx('span', {
                          className: Wt.featureIcon,
                          children: '📝',
                        }),
                        k.jsx('span', { children: '自动生成专业内容' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Wt.featureItem,
                      children: [
                        k.jsx('span', {
                          className: Wt.featureIcon,
                          children: '🎯',
                        }),
                        k.jsx('span', { children: '突出重点信息' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      })
    },
  ),
  ts = {
    'event-detail-modal-overlay':
      'gwrs-EventDetailModal-module__event-detail-modal-overlay__kSKR4',
    eventDetailModalOverlay:
      'gwrs-EventDetailModal-module__event-detail-modal-overlay__kSKR4',
    'fade-in': 'gwrs-EventDetailModal-module__fade-in__gcFok',
    fadeIn: 'gwrs-EventDetailModal-module__fade-in__gcFok',
    'event-detail-modal':
      'gwrs-EventDetailModal-module__event-detail-modal__mBc4j',
    eventDetailModal: 'gwrs-EventDetailModal-module__event-detail-modal__mBc4j',
    'modal-slide-in': 'gwrs-EventDetailModal-module__modal-slide-in__wtFi2',
    modalSlideIn: 'gwrs-EventDetailModal-module__modal-slide-in__wtFi2',
    'modal-header': 'gwrs-EventDetailModal-module__modal-header__YHEvM',
    modalHeader: 'gwrs-EventDetailModal-module__modal-header__YHEvM',
    'close-btn': 'gwrs-EventDetailModal-module__close-btn__0KmQE',
    closeBtn: 'gwrs-EventDetailModal-module__close-btn__0KmQE',
    'modal-content': 'gwrs-EventDetailModal-module__modal-content__V4tyk',
    modalContent: 'gwrs-EventDetailModal-module__modal-content__V4tyk',
    'detail-section': 'gwrs-EventDetailModal-module__detail-section__09YJG',
    detailSection: 'gwrs-EventDetailModal-module__detail-section__09YJG',
    compact: 'gwrs-EventDetailModal-module__compact__GlU0K',
    'detail-grid': 'gwrs-EventDetailModal-module__detail-grid__lP-Rl',
    detailGrid: 'gwrs-EventDetailModal-module__detail-grid__lP-Rl',
    'detail-content': 'gwrs-EventDetailModal-module__detail-content__b-wBI',
    detailContent: 'gwrs-EventDetailModal-module__detail-content__b-wBI',
    'project-info': 'gwrs-EventDetailModal-module__project-info__BF-ji',
    projectInfo: 'gwrs-EventDetailModal-module__project-info__BF-ji',
    'push-info': 'gwrs-EventDetailModal-module__push-info__CiBtf',
    pushInfo: 'gwrs-EventDetailModal-module__push-info__CiBtf',
    'compact-content': 'gwrs-EventDetailModal-module__compact-content__Zl-xn',
    compactContent: 'gwrs-EventDetailModal-module__compact-content__Zl-xn',
    'compact-project': 'gwrs-EventDetailModal-module__compact-project__W-Pxu',
    compactProject: 'gwrs-EventDetailModal-module__compact-project__W-Pxu',
    'compact-author': 'gwrs-EventDetailModal-module__compact-author__bJeyL',
    compactAuthor: 'gwrs-EventDetailModal-module__compact-author__bJeyL',
    'detail-item': 'gwrs-EventDetailModal-module__detail-item__gTUiL',
    detailItem: 'gwrs-EventDetailModal-module__detail-item__gTUiL',
    label: 'gwrs-EventDetailModal-module__label__q-vpJ',
    value: 'gwrs-EventDetailModal-module__value__U4voT',
    'action-badge': 'gwrs-EventDetailModal-module__action-badge__Bxghx',
    actionBadge: 'gwrs-EventDetailModal-module__action-badge__Bxghx',
    'status-badge': 'gwrs-EventDetailModal-module__status-badge__mP8CY',
    statusBadge: 'gwrs-EventDetailModal-module__status-badge__mP8CY',
    'status-opened': 'gwrs-EventDetailModal-module__status-opened__0o3-j',
    statusOpened: 'gwrs-EventDetailModal-module__status-opened__0o3-j',
    'status-closed': 'gwrs-EventDetailModal-module__status-closed__axB54',
    statusClosed: 'gwrs-EventDetailModal-module__status-closed__axB54',
    'status-merged': 'gwrs-EventDetailModal-module__status-merged__jrAZc',
    statusMerged: 'gwrs-EventDetailModal-module__status-merged__jrAZc',
    'commit-hash': 'gwrs-EventDetailModal-module__commit-hash__T82Gy',
    commitHash: 'gwrs-EventDetailModal-module__commit-hash__T82Gy',
    labels: 'gwrs-EventDetailModal-module__labels__FfkpP',
    'label-tag': 'gwrs-EventDetailModal-module__label-tag__1eJTi',
    labelTag: 'gwrs-EventDetailModal-module__label-tag__1eJTi',
    'author-info': 'gwrs-EventDetailModal-module__author-info__QU8GM',
    authorInfo: 'gwrs-EventDetailModal-module__author-info__QU8GM',
    'author-avatar': 'gwrs-EventDetailModal-module__author-avatar__UktK4',
    authorAvatar: 'gwrs-EventDetailModal-module__author-avatar__UktK4',
    'author-details': 'gwrs-EventDetailModal-module__author-details__CSNcN',
    authorDetails: 'gwrs-EventDetailModal-module__author-details__CSNcN',
    'author-name': 'gwrs-EventDetailModal-module__author-name__Aop-h',
    authorName: 'gwrs-EventDetailModal-module__author-name__Aop-h',
    'author-username': 'gwrs-EventDetailModal-module__author-username__7f29y',
    authorUsername: 'gwrs-EventDetailModal-module__author-username__7f29y',
    'author-link': 'gwrs-EventDetailModal-module__author-link__qdJ8G',
    authorLink: 'gwrs-EventDetailModal-module__author-link__qdJ8G',
    'note-info': 'gwrs-EventDetailModal-module__note-info__xsh-2',
    noteInfo: 'gwrs-EventDetailModal-module__note-info__xsh-2',
    'note-body': 'gwrs-EventDetailModal-module__note-body__h5kYR',
    noteBody: 'gwrs-EventDetailModal-module__note-body__h5kYR',
    'note-meta': 'gwrs-EventDetailModal-module__note-meta__CSOAr',
    noteMeta: 'gwrs-EventDetailModal-module__note-meta__CSOAr',
    'modal-footer': 'gwrs-EventDetailModal-module__modal-footer__bMVTG',
    modalFooter: 'gwrs-EventDetailModal-module__modal-footer__bMVTG',
    'source-link-btn': 'gwrs-EventDetailModal-module__source-link-btn__lCMP7',
    sourceLinkBtn: 'gwrs-EventDetailModal-module__source-link-btn__lCMP7',
    'close-modal-btn': 'gwrs-EventDetailModal-module__close-modal-btn__u4I23',
    closeModalBtn: 'gwrs-EventDetailModal-module__close-modal-btn__u4I23',
    app: 'gwrs-EventDetailModal-module__app__GneYG',
    dark: 'gwrs-EventDetailModal-module__dark__4O-jE',
  },
  ss = ({ event: e, visible: t, onClose: s }) => {
    if (!t || !e) return null
    const a = e =>
        new Date(e).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      n = () => {
        var t, s
        if (!e.project && !e.project_id) return ''
        const a = 'https://www.lejuhub.com'
        if (!e.project) return a
        const n = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${a}/${n}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${a}/${n}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${a}/${n}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${a}/${n}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (s = e.note) ? void 0 : s.noteable_type)
                ? `${a}/${n}/-/merge_requests/${e.note.noteable_iid}`
                : `${a}/${n}`
          default:
            return `${a}/${n}`
        }
      }
    return k.jsx('div', {
      className: ts.eventDetailModalOverlay,
      onClick: s,
      children: k.jsxs('div', {
        className: ts.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          k.jsxs('div', {
            className: ts.modalHeader,
            children: [
              k.jsx('h2', { children: '事件详情' }),
              k.jsx('button', {
                className: ts.closeBtn,
                onClick: s,
                children: '×',
              }),
            ],
          }),
          k.jsxs('div', {
            className: ts.modalContent,
            children: [
              k.jsxs('div', {
                className: `${ts.detailSection} ${ts.compact}`,
                children: [
                  k.jsx('h3', { children: '基本信息' }),
                  k.jsxs('div', {
                    className: `${ts.detailGrid} ${ts.compactGrid}`,
                    children: [
                      k.jsxs('div', {
                        className: ts.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ts.label,
                            children: 'ID:',
                          }),
                          k.jsx('span', {
                            className: ts.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: ts.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ts.label,
                            children: '类型:',
                          }),
                          k.jsx('span', {
                            className: ts.value,
                            children: (e => {
                              if (!e || '' === e.trim()) return '未知类型'
                              return (
                                {
                                  MergeRequest: 'Merge Request',
                                  Issue: 'Issue',
                                  Push: '代码推送',
                                  Note: '评论',
                                  DiscussionNote: '讨论-评论',
                                  DiffNote: '代码-评论',
                                  Commit: '提交',
                                }[e] || e
                              )
                            })(e.target_type),
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: ts.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ts.label,
                            children: '操作:',
                          }),
                          k.jsx('span', {
                            className: `${ts.value} ${ts.actionBadge}`,
                            children:
                              ((r = e.action_name),
                              {
                                opened: '开启',
                                closed: '关闭',
                                merged: '合并',
                                'pushed new': '推送新分支',
                                'pushed to': '推送到分支',
                                'commented on': '评论',
                                joined: '加入',
                              }[r] || r),
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: ts.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ts.label,
                            children: '时间:',
                          }),
                          k.jsx('span', {
                            className: ts.value,
                            children: a(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        k.jsxs('div', {
                          className: ts.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ts.label,
                              children: '状态:',
                            }),
                            k.jsx('span', {
                              className: `${ts.value} ${ts.statusBadge} ${ts[`status-${e.state}`]}`,
                              children: e.state,
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              (e.title ||
                e.target_title ||
                (e.labels && e.labels.length > 0)) &&
                k.jsxs('div', {
                  className: `${ts.detailSection} ${ts.compact}`,
                  children: [
                    k.jsx('h3', { children: '内容' }),
                    k.jsxs('div', {
                      className: `${ts.detailContent} ${ts.compactContent}`,
                      children: [
                        e.title &&
                          k.jsxs('div', {
                            className: ts.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ts.label,
                                children: '标题:',
                              }),
                              k.jsx('span', {
                                className: ts.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          k.jsxs('div', {
                            className: ts.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ts.label,
                                children: '目标:',
                              }),
                              k.jsx('span', {
                                className: ts.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          k.jsxs('div', {
                            className: ts.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ts.label,
                                children: '标签:',
                              }),
                              k.jsx('div', {
                                className: ts.labels,
                                children: e.labels.map((e, t) =>
                                  k.jsx(
                                    'span',
                                    { className: ts.labelTag, children: e },
                                    t,
                                  ),
                                ),
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              e.author &&
                k.jsxs('div', {
                  className: `${ts.detailSection} ${ts.compact}`,
                  children: [
                    k.jsx('h3', { children: '作者' }),
                    k.jsxs('div', {
                      className: `${ts.authorInfo} ${ts.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          k.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: ts.authorAvatar,
                          }),
                        k.jsxs('div', {
                          className: ts.authorDetails,
                          children: [
                            k.jsx('div', {
                              className: ts.authorName,
                              children: e.author.name,
                            }),
                            k.jsxs('div', {
                              className: ts.authorUsername,
                              children: ['@', e.author.username],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              (e.project || e.project_id) &&
                k.jsxs('div', {
                  className: `${ts.detailSection} ${ts.compact}`,
                  children: [
                    k.jsx('h3', { children: '项目' }),
                    k.jsx('div', {
                      className: `${ts.projectInfo} ${ts.compactProject}`,
                      children: e.project
                        ? k.jsxs(k.Fragment, {
                            children: [
                              k.jsxs('div', {
                                className: ts.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: ts.label,
                                    children: '名称:',
                                  }),
                                  k.jsx('span', {
                                    className: ts.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              k.jsxs('div', {
                                className: ts.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: ts.label,
                                    children: '路径:',
                                  }),
                                  k.jsx('span', {
                                    className: ts.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : k.jsxs('div', {
                            className: ts.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ts.label,
                                children: '项目ID:',
                              }),
                              k.jsx('span', {
                                className: ts.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                k.jsxs('div', {
                  className: ts.detailSection,
                  children: [
                    k.jsx('h3', { children: '推送信息' }),
                    k.jsxs('div', {
                      className: ts.pushInfo,
                      children: [
                        k.jsxs('div', {
                          className: ts.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ts.label,
                              children: '分支:',
                            }),
                            k.jsx('span', {
                              className: ts.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ts.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ts.label,
                              children: '提交数量:',
                            }),
                            k.jsx('span', {
                              className: ts.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ts.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ts.label,
                              children: '提交标题:',
                            }),
                            k.jsx('span', {
                              className: ts.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ts.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ts.label,
                              children: '提交哈希:',
                            }),
                            k.jsx('span', {
                              className: `${ts.value} ${ts.commitHash}`,
                              children: e.push_data.commit_to,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              e.note &&
                k.jsxs('div', {
                  className: ts.detailSection,
                  children: [
                    k.jsx('h3', { children: '评论信息' }),
                    k.jsxs('div', {
                      className: ts.noteInfo,
                      children: [
                        k.jsx('div', {
                          className: ts.noteBody,
                          children: e.note.body,
                        }),
                        k.jsxs('div', {
                          className: ts.noteMeta,
                          children: [
                            k.jsxs('span', {
                              children: ['创建时间: ', a(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              k.jsxs('span', {
                                children: ['更新时间: ', a(e.note.updated_at)],
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          k.jsxs('div', {
            className: ts.modalFooter,
            children: [
              n() &&
                k.jsx('a', {
                  href: n(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: ts.sourceLinkBtn,
                  children: '打开源页面',
                }),
              k.jsx('button', {
                className: ts.closeModalBtn,
                onClick: s,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var r
  }
class as {
  constructor(e) {
    t(this, 'apiKey'),
      t(this, 'baseUrl'),
      (this.apiKey = e),
      (this.baseUrl = g.DEEPSEEK_BASE_URL)
  }
  async chatRequest(e, t, s) {
    const a = await c(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: t,
        messages: e,
        max_tokens: s,
        temperature: 0.7,
      }),
      timeout: g.REQUEST_TIMEOUT,
    })
    if (!a.ok) throw _.createApiError(a.status, a.statusText, 'DeepSeek API')
    const n = await a.json()
    if (!n.choices || 0 === n.choices.length)
      throw _.createResponseError('空的响应', 'DeepSeek API')
    return n
  }
  async generateChat(e, t = 'deepseek-chat', s = 4e3) {
    return (await this.chatRequest(e, t, s)).choices[0].message.content
  }
  async generateWeeklyReport(e, t, s = 'deepseek-chat', a = 4e3) {
    var n
    const r = [
        { role: 'system', content: t },
        {
          role: 'user',
          content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
        },
      ],
      o = await this.chatRequest(r, s, a)
    return {
      content: o.choices[0].message.content,
      tokensUsed: (null == (n = o.usage) ? void 0 : n.total_tokens) || 0,
    }
  }
  async validateApiKey() {
    try {
      return (
        await this.generateChat(
          [{ role: 'user', content: 'Hello' }],
          'deepseek-chat',
          10,
        ),
        !0
      )
    } catch (e) {
      return !1
    }
  }
}
const ns = {
    app: 'gwrs-App-module__app__ZYOJd',
    'web-mode': 'gwrs-App-module__web-mode__2hnFp',
    webMode: 'gwrs-App-module__web-mode__2hnFp',
    'userscript-mode': 'gwrs-App-module__userscript-mode__5Dbvp',
    userscriptMode: 'gwrs-App-module__userscript-mode__5Dbvp',
    'events-list-footer': 'gwrs-App-module__events-list-footer__M6fFx',
    eventsListFooter: 'gwrs-App-module__events-list-footer__M6fFx',
    pagination: 'gwrs-App-module__pagination__8MYcc',
    'iframe-mode': 'gwrs-App-module__iframe-mode__rll70',
    iframeMode: 'gwrs-App-module__iframe-mode__rll70',
    container: 'gwrs-App-module__container__JMLdu',
    light: 'gwrs-App-module__light__-2YM7',
    dark: 'gwrs-App-module__dark__zl6FN',
    'fade-in': 'gwrs-App-module__fade-in__hmOGT',
    fadeIn: 'gwrs-App-module__fade-in__hmOGT',
    'slide-in-up': 'gwrs-App-module__slide-in-up__3G2dj',
    slideInUp: 'gwrs-App-module__slide-in-up__3G2dj',
    'slide-in-down': 'gwrs-App-module__slide-in-down__yp8xa',
    slideInDown: 'gwrs-App-module__slide-in-down__yp8xa',
    'userscript-header': 'gwrs-App-module__userscript-header__Gd9rb',
    userscriptHeader: 'gwrs-App-module__userscript-header__Gd9rb',
    'toggle-btn': 'gwrs-App-module__toggle-btn__1QXY6',
    toggleBtn: 'gwrs-App-module__toggle-btn__1QXY6',
    'app-content': 'gwrs-App-module__app-content__41BC0',
    appContent: 'gwrs-App-module__app-content__41BC0',
    collapsed: 'gwrs-App-module__collapsed__-W0B6',
    expanded: 'gwrs-App-module__expanded__4oZSa',
    'app-header': 'gwrs-App-module__app-header__uzDwt',
    appHeader: 'gwrs-App-module__app-header__uzDwt',
    'app-main': 'gwrs-App-module__app-main__Vb-mE',
    appMain: 'gwrs-App-module__app-main__Vb-mE',
    'error-banner': 'gwrs-App-module__error-banner__lzzyc',
    errorBanner: 'gwrs-App-module__error-banner__lzzyc',
    'config-form': 'gwrs-App-module__config-form__3qfiF',
    configForm: 'gwrs-App-module__config-form__3qfiF',
    'form-group': 'gwrs-App-module__form-group__HjqOW',
    formGroup: 'gwrs-App-module__form-group__HjqOW',
    'date-range': 'gwrs-App-module__date-range__a4twt',
    dateRange: 'gwrs-App-module__date-range__a4twt',
    'action-section': 'gwrs-App-module__action-section__PNqvo',
    actionSection: 'gwrs-App-module__action-section__PNqvo',
    'primary-btn': 'gwrs-App-module__primary-btn__7Yh0h',
    primaryBtn: 'gwrs-App-module__primary-btn__7Yh0h',
    'secondary-btn': 'gwrs-App-module__secondary-btn__rYZob',
    secondaryBtn: 'gwrs-App-module__secondary-btn__rYZob',
    'preview-area': 'gwrs-App-module__preview-area__eSphl',
    previewArea: 'gwrs-App-module__preview-area__eSphl',
    placeholder: 'gwrs-App-module__placeholder__64NFK',
    loading: 'gwrs-App-module__loading__nhcml',
    spinner: 'gwrs-App-module__spinner__DX3IN',
    spin: 'gwrs-App-module__spin__cTQvR',
    'report-content': 'gwrs-App-module__report-content__qtrdb',
    reportContent: 'gwrs-App-module__report-content__qtrdb',
    'report-meta': 'gwrs-App-module__report-meta__Jmys5',
    reportMeta: 'gwrs-App-module__report-meta__Jmys5',
    'report-text': 'gwrs-App-module__report-text__DiDz5',
    reportText: 'gwrs-App-module__report-text__DiDz5',
    iframeCloseButton: 'gwrs-App-module__iframeCloseButton__Coen1',
  },
  rs = ({ isUserscript: e = !1 }) => {
    const { isIframe: t, closePanel: a } = (() => {
        const { setTheme: e } = A(),
          t = s.useCallback(() => {
            try {
              return window.self !== window.top
            } catch (e) {
              return !0
            }
          }, []),
          a = s.useCallback(
            e => {
              if (t())
                try {
                  window.parent.postMessage(e, '*')
                } catch (s) {
                  console.warn('无法发送消息到父页面:', s)
                }
            },
            [t],
          )
        return (
          s.useEffect(() => {
            if (!t()) return
            const s = t => {
              const s = t.data
              switch (s.type) {
                case 'theme-change':
                  s.theme && e(s.theme)
                  break
                case 'visibility-change':
                  console.log('iframe 可见性变化:', s.visible)
              }
            }
            return (
              window.addEventListener('message', s),
              a({ type: 'ready' }),
              () => {
                window.removeEventListener('message', s)
              }
            )
          }, [e, a, t]),
          {
            isIframe: t(),
            sendMessageToParent: a,
            closePanel: () => a({ type: 'close-panel' }),
          }
        )
      })(),
      {
        config: n,
        activePanel: r,
        appMode: o,
        isLoading: l,
        events: i,
        aiGenerationConfig: d,
        setActivePanel: c,
        setAppMode: _,
        updateConfig: g,
        setAIGenerationConfig: u,
        setReportData: p,
        setLoading: h,
        setError: x,
      } = A(),
      { actualTheme: w } = (() => {
        const { theme: e, setTheme: t } = A(),
          a = s.useMemo(
            () =>
              'system' === e
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'dark'
                  : 'light'
                : e,
            [e],
          )
        return (
          s.useEffect(() => {
            if (
              ((document.body.className = document.body.className
                .replace(/\b(light|dark)\b/g, '')
                .trim()),
              document.body.classList.add(a),
              'system' === e)
            ) {
              const e = window.matchMedia('(prefers-color-scheme: dark)'),
                t = () => {
                  window.dispatchEvent(new Event('resize'))
                }
              return (
                e.addEventListener('change', t),
                () => {
                  e.removeEventListener('change', t)
                }
              )
            }
          }, [e, a]),
          { theme: e, actualTheme: a, setTheme: t }
        )
      })(),
      {
        loadEvents: v,
        handleFilterChange: b,
        handleSortChange: f,
        handlePaginationChange: j,
      } = (() => {
        const {
            config: e,
            filterConditions: t,
            sortOptions: a,
            paginationOptions: n,
            setEvents: r,
            setTotalCount: o,
            setLoading: l,
            setError: i,
            validateConfig: d,
            getTimeRange: c,
          } = A(),
          { createRequest: _, isRequestCancelled: g } = L(),
          u = s.useCallback(async () => {
            var s, u
            if (!d()) return void i(m.INVALID_FILTER_OR_CONFIG)
            const p = _()
            l(!0), i(null)
            try {
              const l = O(e.gitlabUrl, e.gitlabToken)
              await l.init()
              const { startDate: i, endDate: d } = c(),
                _ =
                  (null == (s = t.targetType) ? void 0 : s.length) > 0
                    ? t.targetType
                    : void 0,
                m =
                  (null == (u = t.action) ? void 0 : u.length) > 0
                    ? t.action
                    : void 0,
                h = a.order || 'desc',
                x = await l.getCurrentUser(),
                w = {
                  after: i.toISOString(),
                  before: d.toISOString(),
                  target_type: _,
                  action: m,
                  page: n.page,
                  per_page: n.pageSize,
                  sort: h,
                  signal: p.signal,
                },
                { events: v, total: b } = await l.getUserEventsWithTotal(
                  x.id,
                  w,
                )
              if (g(p)) return
              r(v), o(b)
            } catch (h) {
              if (g(p)) return
              console.error('Failed to load events:', h),
                i(h instanceof Error ? h.message : '加载事件数据失败')
            } finally {
              l(!1)
            }
          }, [
            e.gitlabUrl,
            e.gitlabToken,
            t,
            a.order,
            n.page,
            n.pageSize,
            d,
            c,
            r,
            o,
            l,
            i,
            _,
            g,
          ]),
          p = s.useCallback(() => {
            u()
          }, [u]),
          h = s.useCallback(
            e => {
              const { setFilterConditions: t, setPaginationOptions: s } =
                A.getState()
              t(e), s({ page: 1 }), setTimeout(u, 0)
            },
            [u],
          ),
          x = s.useCallback(
            e => {
              const { setSortOptions: t, setPaginationOptions: s } =
                A.getState()
              t(e), s({ page: 1 }), setTimeout(u, 0)
            },
            [u],
          ),
          w = s.useCallback(
            e => {
              const { setPaginationOptions: t } = A.getState()
              t(e), setTimeout(u, 0)
            },
            [u],
          )
        return {
          loadEvents: u,
          reloadEvents: p,
          handleFilterChange: h,
          handleSortChange: x,
          handlePaginationChange: w,
        }
      })(),
      {
        selectedEvents: N,
        toggleEventSelection: y,
        clearSelection: C,
      } = (() => {
        const { events: e, appMode: t } = A(),
          [a, n] = s.useState([]),
          [r, o] = s.useState([]),
          l = s.useMemo(() => ('events' === t ? a : r), [t, a, r]),
          i = s.useCallback(
            e => {
              'events' === t ? n(e) : o(e)
            },
            [t],
          ),
          d = s.useMemo(() => e.filter(e => l.includes(e.id)), [e, l]),
          c = s.useCallback(e => l.includes(e), [l]),
          _ = s.useCallback(
            e => {
              i(t => (t.includes(e) ? t.filter(t => t !== e) : [...t, e]))
            },
            [i],
          ),
          g = s.useCallback(() => {
            i(e.map(e => e.id))
          }, [e, i]),
          m = s.useCallback(() => {
            i([])
          }, [i]),
          u = s.useMemo(
            () => e.length > 0 && l.length === e.length,
            [e.length, l.length],
          ),
          p = s.useMemo(
            () => l.length > 0 && l.length < e.length,
            [l.length, e.length],
          ),
          h = s.useCallback(() => {
            u ? m() : g()
          }, [u, g, m]),
          x = s.useCallback(
            e => {
              i(e)
            },
            [i],
          ),
          w = l.length,
          v = s.useCallback(() => {
            n([]), o([])
          }, [])
        return {
          selectedEventIds: l,
          selectedEvents: d,
          selectedCount: w,
          isEventSelected: c,
          toggleEventSelection: _,
          selectAllEvents: g,
          deselectAllEvents: m,
          isAllSelected: u,
          isIndeterminate: p,
          toggleSelectAll: h,
          selectEvents: x,
          clearSelection: v,
        }
      })(),
      { loadProjects: E } = (() => {
        const {
            config: e,
            projects: t,
            selectedProjectId: a,
            setProjects: n,
            setSelectedProjectId: r,
            setLoading: o,
            setError: l,
            validateConfig: i,
          } = A(),
          d = s.useCallback(async () => {
            if (i()) {
              o(!0), l(null)
              try {
                const t = O(e.gitlabUrl, e.gitlabToken)
                await t.init()
                const { projects: s } = await t.getProjectsWithTotal({
                  membership: !0,
                  per_page: 100,
                  order_by: 'last_activity_at',
                })
                n(s)
              } catch (t) {
                console.error('Failed to load projects:', t),
                  l(t instanceof Error ? t.message : '加载项目列表失败')
              } finally {
                o(!1)
              }
            } else l('GitLab 配置无效，请检查配置')
          }, [e.gitlabUrl, e.gitlabToken, i, n, o, l]),
          c = s.useCallback(
            e => {
              r(e)
            },
            [r],
          ),
          _ = s.useCallback(
            () => (a && t.find(e => e.id === a)) || null,
            [a, t],
          )
        return {
          projects: t,
          selectedProjectId: a,
          loadProjects: d,
          selectProject: c,
          getSelectedProject: _,
        }
      })(),
      [S, T] = s.useState(null),
      [I, M] = s.useState(!1)
    s.useEffect(() => {
      const e = new URLSearchParams(window.location.search),
        t = e.get('mode'),
        s = e.get('theme')
      'iframe' !== t ||
        ('light' !== s && 'dark' !== s) ||
        A.getState().setTheme(s)
    }, []),
      s.useEffect(() => {
        v(), E()
      }, [v, E]),
      s.useEffect(() => {
        C()
      }, [o, C])
    const $ = async e => {
      if (0 !== N.length) {
        h(!0), x(null), u(e)
        try {
          const s = ((t = n.deepseekApiKey), new as(t)),
            a = N.map(e => {
              var t
              const s =
                  (null == (t = e.project) ? void 0 : t.name) || '未知项目',
                a = e.target_title || e.title || '无标题'
              return `- [${s}] ${e.action_name || '未知操作'}: ${a} (${new Date(e.created_at).toLocaleString('zh-CN')})`
            }).join('\n'),
            r = await s.generateWeeklyReport(
              a,
              e.prompt,
              n.model || 'deepseek-chat',
              n.tokenLimit || 4e3,
            ),
            o = {
              events: N,
              generatedReport: r.content,
              tokensUsed: r.tokensUsed || 0,
              generatedAt: new Date().toISOString(),
            }
          p(o), c('ai')
        } catch (s) {
          console.error('AI 报告生成失败:', s),
            x(s instanceof Error ? s.message : 'AI 报告生成失败')
        } finally {
          h(!1)
        }
        var t
      } else x('请先选择要生成报告的事件')
    }
    return k.jsx('div', {
      className: `${ns.app} ${ns[w]} ${t ? ns.iframeMode : ''}`,
      'data-theme': w,
      children: k.jsxs('div', {
        className: ns.container,
        children: [
          'main' === r &&
            k.jsx(He, {
              appMode: o,
              events: i,
              totalCount: A.getState().totalCount,
              loading: l,
              filterConditions: A.getState().filterConditions,
              sortOptions: A.getState().sortOptions,
              paginationOptions: A.getState().paginationOptions,
              selectedEventIds: N.map(e => e.id),
              onModeChange: e => {
                _(e)
              },
              onFilterChange: b,
              onSortChange: f,
              onPaginationChange: j,
              onEventSelect: y,
              onSelectAll: () => {},
              onSelectionChange: () => {},
              onEventDetail: e => {
                T(e), M(!0)
              },
              onOpenSettings: () => c('settings'),
              onOpenAI: () => c('ai'),
            }),
          'settings' === r &&
            k.jsx(Jt, {
              isOpen: !0,
              config: n,
              theme: A.getState().theme,
              onClose: () => c('main'),
              onSave: (e, t) => {
                g(e), A.getState().setTheme(t)
              },
            }),
          t &&
            k.jsx('button', {
              className: ns.iframeCloseButton,
              onClick: a,
              title: '关闭面板',
              children: '×',
            }),
          'ai' === r &&
            k.jsx(es, {
              visible: !0,
              config: d,
              taskType: 'changelog' === o ? 'changelog' : 'weekly-report',
              onClose: () => c('main'),
              onGenerate: e => {
                d && $({ ...d, prompt: e })
              },
              isLoading: l,
              selectedEventsCount: N.length,
            }),
          k.jsx(ss, {
            event: S,
            visible: I,
            onClose: () => {
              M(!1), T(null)
            },
          }),
        ],
      }),
    })
  },
  os = {
    '--gwrs-bg-primary': '#fff',
    '--gwrs-bg-secondary': '#f5f5f7',
    '--gwrs-bg-tertiary': '#f8f9fa',
    '--gwrs-bg-quaternary': 'rgb(248 248 248 / 80%)',
    '--gwrs-bg-disabled': '#f0f0f0',
    '--gwrs-bg-color': '#fff',
    '--gwrs-bg-hover-color': '#f5f5f7',
    '--gwrs-bg-secondary-color': '#f5f5f7',
    '--gwrs-text-primary': '#1d1d1f',
    '--gwrs-text-secondary': '#86868b',
    '--gwrs-text-tertiary': '#666',
    '--gwrs-text-quaternary': '#8e8e93',
    '--gwrs-text-disabled': '#c7c7cc',
    '--gwrs-text-color': '#1d1d1f',
    '--gwrs-text-secondary-color': '#86868b',
    '--gwrs-border-primary': 'rgb(0 0 0 / 8%)',
    '--gwrs-border-secondary': 'rgb(0 0 0 / 5%)',
    '--gwrs-border-tertiary': '#e5e5e7',
    '--gwrs-border-quaternary': '#d2d2d7',
    '--gwrs-border-light': 'rgb(0 0 0 / 5%)',
    '--gwrs-border-color': 'rgb(0 0 0 / 8%)',
    '--gwrs-color-primary': '#007aff',
    '--gwrs-color-primary-hover': '#0051d5',
    '--gwrs-color-primary-dark': '#0051d5',
    '--gwrs-color-primary-light': 'rgb(0 122 255 / 10%)',
    '--gwrs-color-primary-lighter': 'rgb(0 122 255 / 5%)',
    '--gwrs-primary-rgb': '0, 122, 255',
    '--gwrs-primary-hover': 'rgb(0 81 213 / 10%)',
    '--gwrs-primary-shadow': 'rgb(74 158 255 / 25%)',
    '--gwrs-color-success': '#34c759',
    '--gwrs-color-success-light': 'rgb(52 199 89 / 10%)',
    '--gwrs-color-success-lighter': 'rgb(52 199 89 / 5%)',
    '--gwrs-success-color': '#34c759',
    '--gwrs-color-warning': '#ff9500',
    '--gwrs-color-warning-light': 'rgb(255 149 0 / 10%)',
    '--gwrs-color-warning-lighter': 'rgb(255 149 0 / 5%)',
    '--gwrs-color-warning-dark': '#e6850e',
    '--gwrs-warning-color': '#ff9500',
    '--gwrs-color-error': '#ff3b30',
    '--gwrs-color-error-bg': '#f8d7da',
    '--gwrs-color-error-border': '#f5c6cb',
    '--gwrs-color-error-text': '#721c24',
    '--gwrs-color-error-light': 'rgb(255 59 48 / 10%)',
    '--gwrs-error-color': '#ff3b30',
    '--gwrs-error-hover-color': '#ff1507',
    '--gwrs-color-danger': '#ff3b30',
    '--gwrs-color-danger-light': 'rgb(255 59 48 / 10%)',
    '--gwrs-color-danger-lighter': 'rgb(255 59 48 / 5%)',
    '--gwrs-color-info': '#5856d6',
    '--gwrs-color-info-light': 'rgb(88 86 214 / 10%)',
    '--gwrs-shadow-xs': '0 1px 4px rgb(0 0 0 / 4%)',
    '--gwrs-shadow-sm': '0 2px 8px rgb(0 0 0 / 6%)',
    '--gwrs-shadow-md': '0 4px 16px rgb(0 0 0 / 10%)',
    '--gwrs-shadow-lg': '0 8px 32px rgb(0 0 0 / 15%)',
    '--gwrs-shadow-xl': '0 20px 60px rgb(0 0 0 / 15%)',
    '--gwrs-scrollbar-thumb': '#d1d1d6',
    '--gwrs-scrollbar-thumb-hover': '#b4b4b9',
    '--gwrs-overlay': 'rgb(0 0 0 / 50%)',
    '--gwrs-overlay-light': 'rgb(0 0 0 / 50%)',
    '--gwrs-overlay-heavy': 'rgb(0 0 0 / 60%)',
    '--gwrs-btn-bg': '#f9f9f9',
    '--gwrs-btn-text': '#213547',
    '--gwrs-btn-primary-text': '#fff',
    '--gwrs-btn-border': 'rgb(0 0 0 / 10%)',
    '--gwrs-btn-hover-bg': 'rgb(0 0 0 / 6%)',
    '--gwrs-bg-hover': 'rgb(0 0 0 / 4%)',
    '--gwrs-primary-bg-hover': 'rgb(74 158 255 / 10%)',
    '--gwrs-input-bg': '#fff',
    '--gwrs-input-border': '#ddd',
    '--gwrs-input-focus-border': '#007bff',
    '--gwrs-input-focus-shadow': 'rgb(0 123 255 / 10%)',
    '--gwrs-header-bg': '#f8f9fa',
    '--gwrs-header-border': '#e5e5e7',
    '--gwrs-footer-bg': '#f8f9fa',
    '--gwrs-footer-border': '#e5e5e7',
    '--gwrs-section-bg': '#fff',
    '--gwrs-section-border': '#e5e5e7',
    '--gwrs-section-hover-bg': '#f5f5f7',
    '--gwrs-section-hover-border': '#d2d2d7',
    '--gwrs-item-border': '#e5e5e7',
    '--gwrs-close-btn-bg': '#f5f5f7',
    '--gwrs-close-btn-hover-bg': '#e5e5e7',
    '--gwrs-close-modal-bg': 'transparent',
    '--gwrs-close-modal-border': '#ddd',
    '--gwrs-close-modal-hover-bg': '#f5f5f7',
    '--gwrs-close-modal-hover-border': '#bbb',
  },
  ls = {
    '--gwrs-bg-primary': '#1a1a1a',
    '--gwrs-bg-secondary': '#1c1c1e',
    '--gwrs-bg-tertiary': '#2c2c2e',
    '--gwrs-bg-quaternary': 'rgb(28 28 30 / 80%)',
    '--gwrs-bg-disabled': '#2c2c2e',
    '--gwrs-bg-color': '#1a1a1a',
    '--gwrs-bg-hover-color': '#1c1c1e',
    '--gwrs-bg-secondary-color': '#1c1c1e',
    '--gwrs-text-primary': '#fff',
    '--gwrs-text-secondary': '#8e8e93',
    '--gwrs-text-tertiary': '#98989d',
    '--gwrs-text-quaternary': '#636366',
    '--gwrs-text-disabled': '#48484a',
    '--gwrs-text-color': '#fff',
    '--gwrs-text-secondary-color': '#8e8e93',
    '--gwrs-border-primary': 'rgb(255 255 255 / 10%)',
    '--gwrs-border-secondary': 'rgb(255 255 255 / 8%)',
    '--gwrs-border-tertiary': '#424245',
    '--gwrs-border-quaternary': '#48484a',
    '--gwrs-border-light': 'rgb(255 255 255 / 8%)',
    '--gwrs-border-color': 'rgb(255 255 255 / 10%)',
    '--gwrs-color-primary': '#4a9eff',
    '--gwrs-color-primary-hover': '#64b5f6',
    '--gwrs-color-primary-dark': '#3a8eef',
    '--gwrs-color-primary-light': 'rgb(74 158 255 / 20%)',
    '--gwrs-color-primary-lighter': 'rgb(74 158 255 / 10%)',
    '--gwrs-primary-rgb': '74, 158, 255',
    '--gwrs-primary-hover': 'rgb(100 181 246 / 20%)',
    '--gwrs-primary-shadow': 'rgb(74 158 255 / 30%)',
    '--gwrs-color-success': '#32d74b',
    '--gwrs-color-success-light': 'rgb(52 199 89 / 20%)',
    '--gwrs-color-success-lighter': 'rgb(52 199 89 / 10%)',
    '--gwrs-success-color': '#32d74b',
    '--gwrs-color-warning': '#ff9f0a',
    '--gwrs-color-warning-light': 'rgb(255 149 0 / 20%)',
    '--gwrs-color-warning-lighter': 'rgb(255 149 0 / 10%)',
    '--gwrs-color-warning-dark': '#cc7f08',
    '--gwrs-warning-color': '#ff9f0a',
    '--gwrs-color-error': '#ff453a',
    '--gwrs-color-error-bg': '#5c2122',
    '--gwrs-color-error-border': '#7c2e2f',
    '--gwrs-color-error-text': '#f8d7da',
    '--gwrs-color-error-light': 'rgb(255 69 58 / 20%)',
    '--gwrs-error-color': '#ff453a',
    '--gwrs-error-hover-color': '#ff6b60',
    '--gwrs-color-danger': '#ff453a',
    '--gwrs-color-danger-light': 'rgb(255 69 58 / 20%)',
    '--gwrs-color-danger-lighter': 'rgb(255 69 58 / 10%)',
    '--gwrs-color-info': '#5e5ce6',
    '--gwrs-color-info-light': 'rgb(88 86 214 / 20%)',
    '--gwrs-shadow-xs': '0 1px 4px rgb(0 0 0 / 10%)',
    '--gwrs-shadow-sm': '0 2px 8px rgb(0 0 0 / 20%)',
    '--gwrs-shadow-md': '0 4px 16px rgb(0 0 0 / 30%)',
    '--gwrs-shadow-lg': '0 8px 32px rgb(0 0 0 / 40%)',
    '--gwrs-shadow-xl': '0 20px 60px rgb(0 0 0 / 50%)',
    '--gwrs-scrollbar-thumb': '#48484a',
    '--gwrs-scrollbar-thumb-hover': '#636366',
    '--gwrs-overlay': 'rgb(0 0 0 / 60%)',
    '--gwrs-overlay-light': 'rgb(0 0 0 / 60%)',
    '--gwrs-overlay-heavy': 'rgb(0 0 0 / 80%)',
    '--gwrs-btn-bg': '#1a1a1a',
    '--gwrs-btn-text': 'rgb(255 255 255 / 87%)',
    '--gwrs-btn-primary-text': '#fff',
    '--gwrs-btn-border': 'rgb(255 255 255 / 20%)',
    '--gwrs-btn-hover-bg': 'rgb(255 255 255 / 10%)',
    '--gwrs-bg-hover': 'rgb(255 255 255 / 6%)',
    '--gwrs-primary-bg-hover': 'rgb(74 158 255 / 20%)',
    '--gwrs-input-bg': '#2c2c2e',
    '--gwrs-input-border': '#48484a',
    '--gwrs-input-focus-border': '#64b5f6',
    '--gwrs-input-focus-shadow': 'rgb(100 181 246 / 10%)',
    '--gwrs-header-bg': '#2c2c2e',
    '--gwrs-header-border': '#424245',
    '--gwrs-footer-bg': '#2c2c2e',
    '--gwrs-footer-border': '#424245',
    '--gwrs-section-bg': '#1a1a1a',
    '--gwrs-section-border': '#424245',
    '--gwrs-section-hover-bg': '#1c1c1e',
    '--gwrs-section-hover-border': '#48484a',
    '--gwrs-item-border': '#424245',
    '--gwrs-close-btn-bg': '#1c1c1e',
    '--gwrs-close-btn-hover-bg': '#424245',
    '--gwrs-close-modal-bg': 'transparent',
    '--gwrs-close-modal-border': '#48484a',
    '--gwrs-close-modal-hover-bg': '#1c1c1e',
    '--gwrs-close-modal-hover-border': '#636366',
  }
function is(e, t) {
  Object.entries(t).forEach(([t, s]) => {
    e.style.setProperty(t, s)
  })
}
function ds(e) {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? ls : os
}
const cs = document.getElementById('root')
is(cs, ds())
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    is(cs, ds())
  }),
  E.createRoot(cs).render(k.jsx(n.StrictMode, { children: k.jsx(rs, {}) }))
