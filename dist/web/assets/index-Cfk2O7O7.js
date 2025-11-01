var e = Object.defineProperty,
  t = (t, a, l) =>
    ((t, a, l) =>
      a in t
        ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: l })
        : (t[a] = l))(t, 'symbol' != typeof a ? a + '' : a, l)
import { r as a, a as l, R as n } from './vendor-BEmX_Svj.js'
import {
  D as s,
  a as o,
  b as r,
  c as i,
  s as d,
  r as c,
  E as m,
  A as u,
  d as h,
  e as p,
  f as g,
  C as x,
} from './utils-DY_kOI1d.js'
!(function () {
  const e = document.createElement('link').relList
  if (!(e && e.supports && e.supports('modulepreload'))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e)
    new MutationObserver(e => {
      for (const a of e)
        if ('childList' === a.type)
          for (const e of a.addedNodes)
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
var v = { exports: {} },
  b = {},
  f = a,
  j = Symbol.for('react.element'),
  w = Symbol.for('react.fragment'),
  N = Object.prototype.hasOwnProperty,
  y = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  C = { key: !0, ref: !0, __self: !0, __source: !0 }
function k(e, t, a) {
  var l,
    n = {},
    s = null,
    o = null
  for (l in (void 0 !== a && (s = '' + a),
  void 0 !== t.key && (s = '' + t.key),
  void 0 !== t.ref && (o = t.ref),
  t))
    N.call(t, l) && !C.hasOwnProperty(l) && (n[l] = t[l])
  if (e && e.defaultProps)
    for (l in (t = e.defaultProps)) void 0 === n[l] && (n[l] = t[l])
  return { $$typeof: j, type: e, key: s, ref: o, props: n, _owner: y.current }
}
;(b.Fragment = w), (b.jsx = k), (b.jsxs = k), (v.exports = b)
var E = v.exports,
  S = {},
  T = l
;(S.createRoot = T.createRoot), (S.hydrateRoot = T.hydrateRoot)
const $ = e => {
    let t
    const a = new Set(),
      l = (e, l) => {
        const n = 'function' == typeof e ? e(t) : e
        if (!Object.is(n, t)) {
          const e = t
          ;(t = (null != l ? l : 'object' != typeof n || null === n)
            ? n
            : Object.assign({}, t, n)),
            a.forEach(a => a(t, e))
        }
      },
      n = () => t,
      s = {
        setState: l,
        getState: n,
        getInitialState: () => o,
        subscribe: e => (a.add(e), () => a.delete(e)),
      },
      o = (t = e(l, n, s))
    return s
  },
  D = e => e
function I(e, t) {
  let a
  try {
    a = e()
  } catch (l) {
    return
  }
  return {
    getItem: e => {
      var t
      const l = e => (null === e ? null : JSON.parse(e, void 0)),
        n = null != (t = a.getItem(e)) ? t : null
      return n instanceof Promise ? n.then(l) : l(n)
    },
    setItem: (e, t) => a.setItem(e, JSON.stringify(t, void 0)),
    removeItem: e => a.removeItem(e),
  }
}
const M = e => t => {
    try {
      const a = e(t)
      return a instanceof Promise
        ? a
        : {
            then: e => M(e)(a),
            catch(e) {
              return this
            },
          }
    } catch (a) {
      return {
        then(e) {
          return this
        },
        catch: e => M(e)(a),
      }
    }
  },
  L = {
    config: i,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: 'system',
    activePanel: 'main',
    filterConditions: r,
    sortOptions: o,
    paginationOptions: s,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
  },
  _ = (e => {
    const t = (e => (e ? $(e) : $))(e),
      a = e =>
        (function (e, t = D) {
          const a = n.useSyncExternalStore(
            e.subscribe,
            () => t(e.getState()),
            () => t(e.getInitialState()),
          )
          return n.useDebugValue(a), a
        })(t, e)
    return Object.assign(a, t), a
  })(
    ((e, t) => (a, l, n) => {
      let s = {
          storage: I(() => localStorage),
          partialize: e => e,
          version: 0,
          merge: (e, t) => ({ ...t, ...e }),
          ...t,
        },
        o = !1
      const r = new Set(),
        i = new Set()
      let d = s.storage
      if (!d)
        return e(
          (...e) => {
            a(...e)
          },
          l,
          n,
        )
      const c = () => {
          const e = s.partialize({ ...l() })
          return d.setItem(s.name, { state: e, version: s.version })
        },
        m = n.setState
      n.setState = (e, t) => {
        m(e, t), c()
      }
      const u = e(
        (...e) => {
          a(...e), c()
        },
        l,
        n,
      )
      let h
      n.getInitialState = () => u
      const p = () => {
        var e, t
        if (!d) return
        ;(o = !1),
          r.forEach(e => {
            var t
            return e(null != (t = l()) ? t : u)
          })
        const n =
          (null == (t = s.onRehydrateStorage)
            ? void 0
            : t.call(s, null != (e = l()) ? e : u)) || void 0
        return M(d.getItem.bind(d))(s.name)
          .then(e => {
            if (e) {
              if ('number' != typeof e.version || e.version === s.version)
                return [!1, e.state]
              if (s.migrate) {
                const t = s.migrate(e.state, e.version)
                return t instanceof Promise ? t.then(e => [!0, e]) : [!0, t]
              }
            }
            return [!1, void 0]
          })
          .then(e => {
            var t
            const [n, o] = e
            if (((h = s.merge(o, null != (t = l()) ? t : u)), a(h, !0), n))
              return c()
          })
          .then(() => {
            null == n || n(h, void 0), (h = l()), (o = !0), i.forEach(e => e(h))
          })
          .catch(e => {
            null == n || n(void 0, e)
          })
      }
      return (
        (n.persist = {
          setOptions: e => {
            ;(s = { ...s, ...e }), e.storage && (d = e.storage)
          },
          clearStorage: () => {
            null == d || d.removeItem(s.name)
          },
          getOptions: () => s,
          rehydrate: () => p(),
          hasHydrated: () => o,
          onHydrate: e => (
            r.add(e),
            () => {
              r.delete(e)
            }
          ),
          onFinishHydration: e => (
            i.add(e),
            () => {
              i.delete(e)
            }
          ),
        }),
        s.skipHydration || p(),
        h || u
      )
    })(
      (e, t) => ({
        ...L,
        updateConfig: t => {
          e(e => {
            const a = { ...e.config, ...t }
            return d.saveConfig(a), { config: a }
          })
        },
        resetConfig: () => {
          e({ config: i }), d.clearConfig()
        },
        setActivePanel: t => e({ activePanel: t }),
        setTheme: t => e({ theme: t }),
        setLoading: t => e({ isLoading: t }),
        setError: t => e({ error: t }),
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
          e(L), d.clearConfig()
        },
        getTimeRange: () => {
          const { filterConditions: e } = t()
          return (e => {
            const t = new Date(),
              a = new Date(t),
              l = new Date(t)
            switch (e) {
              case 'week': {
                const e = t.getDay(),
                  n = 0 === e ? 6 : e - 1,
                  s = 0 === e ? 0 : 7 - e
                l.setDate(t.getDate() - n), a.setDate(t.getDate() + s)
                break
              }
              case '7d':
              default:
                l.setDate(t.getDate() - 7)
                break
              case '30d':
                l.setDate(t.getDate() - 30)
                break
              case '90d':
                l.setDate(t.getDate() - 90)
                break
              case '180d':
                l.setDate(t.getDate() - 180)
                break
              case '365d':
                l.setDate(t.getDate() - 365)
            }
            return (
              l.setHours(0, 0, 0, 0),
              a.setHours(23, 59, 59, 999),
              { startDate: l, endDate: a }
            )
          })(e.timeRange)
        },
        validateConfig: () => {
          const { config: e } = t()
          return (e => {
            var t, a, l
            return !!(
              (null == (t = e.gitlabUrl) ? void 0 : t.trim()) &&
              (null == (a = e.gitlabToken) ? void 0 : a.trim()) &&
              (null == (l = e.deepseekApiKey) ? void 0 : l.trim())
            )
          })(e)
        },
      }),
      {
        name: 'gitlab-weekly-report-store',
        partialize: e => ({
          config: e.config,
          theme: e.theme,
          filterConditions: e.filterConditions,
          sortOptions: e.sortOptions,
        }),
      },
    ),
  )
class A {
  constructor(e, a) {
    t(this, 'baseUrl'),
      t(this, 'token'),
      t(this, 'currentUser', null),
      (this.baseUrl = e.replace(/\/$/, '')),
      (this.token = a)
  }
  async request(e, t = {}) {
    const a = `${this.baseUrl}${e}`,
      l = {
        method: t.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        body: t.body,
      },
      n = await c(a, l)
    if (!n.ok) {
      let e
      try {
        e = await n.text()
      } catch {
        e = n.statusText
      }
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
      throw m.createApiError(n.status, t, 'GitLab API')
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
      throw m.createResponseError('Token格式无效', 'GitLab API')
    const e = await this.request('/user')
    return (this.currentUser = e), e
  }
  async init() {
    try {
      await this.getCurrentUser()
    } catch (e) {
      if (e instanceof Error) {
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
          .reduce((e, [t, a]) => ({ ...e, [t]: String(a) }), {}),
      ).toString(),
      a = t ? `/projects?${t}` : '/projects'
    return this.request(a)
  }
  async getProjectsWithTotal(e = {}) {
    const t = new URLSearchParams(
        Object.entries(e)
          .filter(([, e]) => void 0 !== e)
          .reduce((e, [t, a]) => ({ ...e, [t]: String(a) }), {}),
      ).toString(),
      a = t ? `/projects?${t}` : '/projects',
      l = `${this.baseUrl}${a}`,
      n = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
      },
      s = await c(l, n)
    if (!s.ok) {
      const e = await s.text()
      throw m.createApiError(s.status, e || s.statusText, 'GitLab API')
    }
    const o = await s.json()
    let r = null
    if (s.headers instanceof Headers) {
      const e =
        s.headers.get('x-total') ||
        s.headers.get('X-Total') ||
        s.headers.get('x-total-count') ||
        s.headers.get('X-Total-Count') ||
        null
      e && (r = parseInt(e, 10))
    }
    return { projects: o, total: null !== r ? r : o.length }
  }
  async getUserEventsWithTotal(e, t = {}) {
    const a = new URLSearchParams()
    t.after && a.set('after', t.after),
      t.before && a.set('before', t.before),
      t.sort && a.set('sort', t.sort),
      t.page && a.set('page', t.page.toString()),
      t.per_page && a.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => a.append('action', e)),
      t.target_type && t.target_type.forEach(e => a.append('target_type', e))
    const l = `/users/${e}/events?${a.toString()}`,
      n = `${this.baseUrl}${l}`,
      s = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await c(n, s)
    if (!o.ok) {
      const e = await o.text()
      throw m.createApiError(o.status, e || o.statusText, 'GitLab API')
    }
    const r = await o.json()
    let i = null
    if (o.headers instanceof Headers) {
      const e =
        o.headers.get('x-total') ||
        o.headers.get('X-Total') ||
        o.headers.get('x-total-count') ||
        o.headers.get('X-Total-Count') ||
        null
      e && (i = parseInt(e, 10))
    }
    return { events: r, total: null !== i ? i : r.length }
  }
  async getProjectEventsWithTotal(e, t = {}) {
    const a = new URLSearchParams()
    t.after && a.set('after', t.after),
      t.before && a.set('before', t.before),
      t.sort && a.set('sort', t.sort),
      t.page && a.set('page', t.page.toString()),
      t.per_page && a.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => a.append('action', e)),
      t.target_type && t.target_type.forEach(e => a.append('target_type', e))
    const l = a.toString(),
      n = l ? `/projects/${e}/events?${l}` : `/projects/${e}/events`,
      s = `${this.baseUrl}${n}`,
      o = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      r = await c(s, o)
    if (!r.ok) {
      const e = await r.text()
      throw m.createApiError(r.status, e || r.statusText, 'GitLab API')
    }
    const i = await r.json()
    let d = null
    if (r.headers instanceof Headers) {
      const e =
        r.headers.get('x-total') ||
        r.headers.get('X-Total') ||
        r.headers.get('x-total-count') ||
        r.headers.get('X-Total-Count') ||
        null
      e && (d = parseInt(e, 10))
    }
    return { events: i, total: null !== d ? d : i.length }
  }
  getCachedUser() {
    return this.currentUser
  }
}
const P = () => {
    const {
        config: e,
        filterConditions: t,
        sortOptions: l,
        paginationOptions: n,
        setEvents: s,
        setTotalCount: o,
        setLoading: r,
        setError: i,
        validateConfig: d,
        getTimeRange: c,
      } = _(),
      {
        createRequest: m,
        isRequestCancelled: u,
        isAbortError: p,
      } = (() => {
        const e = a.useRef(null),
          t = a.useCallback(() => {
            e.current && e.current.abort()
            const t = new AbortController()
            return (e.current = t), t
          }, []),
          l = a.useCallback(() => {
            e.current && (e.current.abort(), (e.current = null))
          }, []),
          n = a.useCallback(e => e.signal.aborted, []),
          s = a.useCallback(t => {
            e.current === t && (e.current = null)
          }, []),
          o = a.useCallback(
            e => e instanceof Error && 'AbortError' === e.name,
            [],
          )
        return (
          a.useEffect(
            () => () => {
              l()
            },
            [l],
          ),
          {
            createRequest: t,
            cancelRequest: l,
            isRequestCancelled: n,
            cleanupRequest: s,
            isAbortError: o,
          }
        )
      })(),
      g = a.useCallback(async () => {
        var a, g
        if (!d()) return void i(h.INVALID_FILTER_OR_CONFIG)
        const x = m()
        r(!0), i(null)
        try {
          const r = ((v = e.gitlabUrl), (b = e.gitlabToken), new A(v, b))
          await r.init()
          const { startDate: i, endDate: d } = c(),
            m =
              (null == (a = t.targetType) ? void 0 : a.length) > 0
                ? t.targetType
                : void 0,
            h =
              (null == (g = t.action) ? void 0 : g.length) > 0
                ? t.action
                : void 0,
            p = l.order || 'desc',
            f = await r.getCurrentUser(),
            j = {
              after: i.toISOString(),
              before: d.toISOString(),
              target_type: m,
              action: h,
              page: n.page,
              per_page: n.pageSize,
              sort: p,
              signal: x.signal,
            },
            { events: w, total: N } = await r.getUserEventsWithTotal(f.id, j)
          if (u(x)) return
          s(w), o(N)
        } catch (f) {
          if (u(x) || p(f)) return
          i(f instanceof Error ? f.message : '加载事件数据失败')
        } finally {
          r(!1)
        }
        var v, b
      }, [
        e.gitlabUrl,
        e.gitlabToken,
        t,
        l.order,
        n.page,
        n.pageSize,
        d,
        c,
        s,
        o,
        r,
        i,
        m,
        u,
      ]),
      x = a.useCallback(() => {
        g()
      }, [g]),
      v = a.useCallback(
        e => {
          const { setFilterConditions: t, setPaginationOptions: a } =
            _.getState()
          t(e), a({ page: 1 }), setTimeout(g, 0)
        },
        [g],
      ),
      b = a.useCallback(
        e => {
          const { setSortOptions: t, setPaginationOptions: a } = _.getState()
          t(e), a({ page: 1 }), setTimeout(g, 0)
        },
        [g],
      ),
      f = a.useCallback(
        e => {
          const { setPaginationOptions: t } = _.getState()
          t(e), setTimeout(g, 0)
        },
        [g],
      )
    return {
      loadEvents: g,
      reloadEvents: x,
      handleFilterChange: v,
      handleSortChange: b,
      handlePaginationChange: f,
    }
  },
  O = {
    '--glwr-bg-primary': '#fff',
    '--glwr-bg-secondary': '#f2f2f7',
    '--glwr-bg-tertiary': '#f5f5f7',
    '--glwr-bg-quaternary': 'rgba(252, 253, 255, 0.65)',
    '--glwr-bg-disabled': '#f0f0f0',
    '--glwr-bg-color': '#fff',
    '--glwr-bg-hover-color': '#f2f2f7',
    '--glwr-bg-secondary-color': '#f2f2f7',
    '--glwr-text-primary': '#1d1d1f',
    '--glwr-text-secondary': '#86868b',
    '--glwr-text-tertiary': '#666',
    '--glwr-text-quaternary': '#8e8e93',
    '--glwr-text-disabled': '#c7c7cc',
    '--glwr-text-color': '#1d1d1f',
    '--glwr-text-secondary-color': '#86868b',
    '--glwr-border-primary': 'rgb(0 0 0 / 8%)',
    '--glwr-border-secondary': 'rgb(0 0 0 / 5%)',
    '--glwr-border-tertiary': '#e5e5e7',
    '--glwr-border-quaternary': '#d2d2d7',
    '--glwr-border-light': 'rgb(0 0 0 / 5%)',
    '--glwr-border-color': 'rgb(0 0 0 / 8%)',
    '--glwr-color-primary': '#007aff',
    '--glwr-color-primary-hover': '#0051d5',
    '--glwr-color-primary-dark': '#0051d5',
    '--glwr-color-primary-light': 'rgb(0 122 255 / 10%)',
    '--glwr-color-primary-lighter': 'rgb(0 122 255 / 5%)',
    '--glwr-primary-rgb': '0, 122, 255',
    '--glwr-primary-hover': 'rgb(0 81 213 / 10%)',
    '--glwr-primary-shadow': 'rgb(74 158 255 / 25%)',
    '--glwr-color-success': '#34c759',
    '--glwr-color-success-light': 'rgb(52 199 89 / 10%)',
    '--glwr-color-success-lighter': 'rgb(52 199 89 / 5%)',
    '--glwr-success-color': '#34c759',
    '--glwr-color-warning': '#ff9500',
    '--glwr-color-warning-light': 'rgb(255 149 0 / 10%)',
    '--glwr-color-warning-lighter': 'rgb(255 149 0 / 5%)',
    '--glwr-color-warning-dark': '#e6850e',
    '--glwr-warning-color': '#ff9500',
    '--glwr-color-error': '#ff3b30',
    '--glwr-color-error-bg': '#f8d7da',
    '--glwr-color-error-border': '#f5c6cb',
    '--glwr-color-error-text': '#721c24',
    '--glwr-color-error-light': 'rgb(255 59 48 / 10%)',
    '--glwr-error-color': '#ff3b30',
    '--glwr-error-hover-color': '#ff1507',
    '--glwr-color-danger': '#ff3b30',
    '--glwr-color-danger-light': 'rgb(255 59 48 / 10%)',
    '--glwr-color-danger-lighter': 'rgb(255 59 48 / 5%)',
    '--glwr-color-info': '#5856d6',
    '--glwr-color-info-light': 'rgb(88 86 214 / 10%)',
    '--glwr-shadow-xs': '0 1px 4px rgb(0 0 0 / 4%)',
    '--glwr-shadow-sm': '0 2px 8px rgb(0 0 0 / 6%)',
    '--glwr-shadow-md': '0 4px 16px rgb(0 0 0 / 10%)',
    '--glwr-shadow-lg': '0 8px 32px rgb(0 0 0 / 15%)',
    '--glwr-shadow-xl': '0 20px 60px rgb(0 0 0 / 15%)',
    '--glwr-scrollbar-thumb': '#d1d1d6',
    '--glwr-scrollbar-thumb-hover': '#b4b4b9',
    '--glwr-overlay': 'rgba(0, 0, 0, 0.05)',
    '--glwr-overlay-light': 'rgba(0, 0, 0, 0.03)',
    '--glwr-overlay-heavy': 'rgba(0, 0, 0, 0.08)',
    '--glwr-btn-bg': '#f2f2f7',
    '--glwr-btn-text': '#213547',
    '--glwr-btn-primary-text': '#fff',
    '--glwr-btn-border': 'rgb(0 0 0 / 10%)',
    '--glwr-btn-hover-bg': 'rgb(0 0 0 / 6%)',
    '--glwr-bg-hover': 'rgb(0 0 0 / 4%)',
    '--glwr-primary-bg-hover': 'rgb(74 158 255 / 10%)',
    '--glwr-input-bg': '#fff',
    '--glwr-input-border': '#ddd',
    '--glwr-input-focus-border': '#007bff',
    '--glwr-input-focus-shadow': 'rgb(0 123 255 / 10%)',
    '--glwr-header-bg': '#fff',
    '--glwr-header-border': '#e5e5e7',
    '--glwr-footer-bg': '#f2f2f7',
    '--glwr-footer-border': '#e5e5e7',
    '--glwr-section-bg': '#fff',
    '--glwr-section-border': '#e5e5e7',
    '--glwr-section-hover-bg': '#f2f2f7',
    '--glwr-section-hover-border': '#d2d2d7',
    '--glwr-item-border': '#e5e5e7',
    '--glwr-close-btn-bg': '#f2f2f7',
    '--glwr-close-btn-hover-bg': '#e5e5e7',
    '--glwr-close-modal-bg': 'transparent',
    '--glwr-close-modal-border': '#ddd',
    '--glwr-close-modal-hover-bg': '#f2f2f7',
    '--glwr-close-modal-hover-border': '#bbb',
  },
  R = {
    '--glwr-bg-primary': '#1a1a1a',
    '--glwr-bg-secondary': '#1c1c1e',
    '--glwr-bg-tertiary': '#2c2c2e',
    '--glwr-bg-quaternary': 'rgb(28 28 30 / 80%)',
    '--glwr-bg-disabled': '#2c2c2e',
    '--glwr-bg-color': '#1a1a1a',
    '--glwr-bg-hover-color': '#1c1c1e',
    '--glwr-bg-secondary-color': '#1c1c1e',
    '--glwr-text-primary': '#fff',
    '--glwr-text-secondary': '#8e8e93',
    '--glwr-text-tertiary': '#98989d',
    '--glwr-text-quaternary': '#636366',
    '--glwr-text-disabled': '#48484a',
    '--glwr-text-color': '#fff',
    '--glwr-text-secondary-color': '#8e8e93',
    '--glwr-border-primary': 'rgb(255 255 255 / 10%)',
    '--glwr-border-secondary': 'rgb(255 255 255 / 8%)',
    '--glwr-border-tertiary': '#424245',
    '--glwr-border-quaternary': '#48484a',
    '--glwr-border-light': 'rgb(255 255 255 / 8%)',
    '--glwr-border-color': 'rgb(255 255 255 / 10%)',
    '--glwr-color-primary': '#4a9eff',
    '--glwr-color-primary-hover': '#64b5f6',
    '--glwr-color-primary-dark': '#3a8eef',
    '--glwr-color-primary-light': 'rgb(74 158 255 / 20%)',
    '--glwr-color-primary-lighter': 'rgb(74 158 255 / 10%)',
    '--glwr-primary-rgb': '74, 158, 255',
    '--glwr-primary-hover': 'rgb(100 181 246 / 20%)',
    '--glwr-primary-shadow': 'rgb(74 158 255 / 30%)',
    '--glwr-color-success': '#32d74b',
    '--glwr-color-success-light': 'rgb(52 199 89 / 20%)',
    '--glwr-color-success-lighter': 'rgb(52 199 89 / 10%)',
    '--glwr-success-color': '#32d74b',
    '--glwr-color-warning': '#ff9f0a',
    '--glwr-color-warning-light': 'rgb(255 149 0 / 20%)',
    '--glwr-color-warning-lighter': 'rgb(255 149 0 / 10%)',
    '--glwr-color-warning-dark': '#cc7f08',
    '--glwr-warning-color': '#ff9f0a',
    '--glwr-color-error': '#ff453a',
    '--glwr-color-error-bg': '#5c2122',
    '--glwr-color-error-border': '#7c2e2f',
    '--glwr-color-error-text': '#f8d7da',
    '--glwr-color-error-light': 'rgb(255 69 58 / 20%)',
    '--glwr-error-color': '#ff453a',
    '--glwr-error-hover-color': '#ff6b60',
    '--glwr-color-danger': '#ff453a',
    '--glwr-color-danger-light': 'rgb(255 69 58 / 20%)',
    '--glwr-color-danger-lighter': 'rgb(255 69 58 / 10%)',
    '--glwr-color-info': '#5e5ce6',
    '--glwr-color-info-light': 'rgb(88 86 214 / 20%)',
    '--glwr-shadow-xs': '0 1px 4px rgb(0 0 0 / 10%)',
    '--glwr-shadow-sm': '0 2px 8px rgb(0 0 0 / 20%)',
    '--glwr-shadow-md': '0 4px 16px rgb(0 0 0 / 30%)',
    '--glwr-shadow-lg': '0 8px 32px rgb(0 0 0 / 40%)',
    '--glwr-shadow-xl': '0 20px 60px rgb(0 0 0 / 50%)',
    '--glwr-scrollbar-thumb': '#48484a',
    '--glwr-scrollbar-thumb-hover': '#636366',
    '--glwr-overlay': 'rgb(0 0 0 / 60%)',
    '--glwr-overlay-light': 'rgb(0 0 0 / 60%)',
    '--glwr-overlay-heavy': 'rgb(0 0 0 / 80%)',
    '--glwr-btn-bg': '#1a1a1a',
    '--glwr-btn-text': 'rgb(255 255 255 / 87%)',
    '--glwr-btn-primary-text': '#fff',
    '--glwr-btn-border': 'rgb(255 255 255 / 20%)',
    '--glwr-btn-hover-bg': 'rgb(255 255 255 / 10%)',
    '--glwr-bg-hover': 'rgb(255 255 255 / 6%)',
    '--glwr-primary-bg-hover': 'rgb(74 158 255 / 20%)',
    '--glwr-input-bg': '#2c2c2e',
    '--glwr-input-border': '#48484a',
    '--glwr-input-focus-border': '#64b5f6',
    '--glwr-input-focus-shadow': 'rgb(100 181 246 / 10%)',
    '--glwr-header-bg': '#2c2c2e',
    '--glwr-header-border': '#424245',
    '--glwr-footer-bg': '#2c2c2e',
    '--glwr-footer-border': '#424245',
    '--glwr-section-bg': '#1a1a1a',
    '--glwr-section-border': '#424245',
    '--glwr-section-hover-bg': '#1c1c1e',
    '--glwr-section-hover-border': '#48484a',
    '--glwr-item-border': '#424245',
    '--glwr-close-btn-bg': '#1c1c1e',
    '--glwr-close-btn-hover-bg': '#424245',
    '--glwr-close-modal-bg': 'transparent',
    '--glwr-close-modal-border': '#48484a',
    '--glwr-close-modal-hover-bg': '#1c1c1e',
    '--glwr-close-modal-hover-border': '#636366',
  }
function U(e, t) {
  Object.entries(t).forEach(([t, a]) => {
    e.style.setProperty(t, a)
  })
}
function B(e) {
  if ('system' === e) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? R : O
  }
  return 'dark' === e ? R : O
}
const G = 'index-module-filter-section-content-8525c',
  F = 'index-module-filter-group-5cf8a',
  q = 'index-module-filter-label-4629c',
  H = 'index-module-filter-options-a8f3f',
  V = 'index-module-filter-option-58c7c',
  z = 'index-module-active-dbcb9',
  K = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  W = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  J = [
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
  X = ({ filterConditions: e, onFilterChange: t }) => {
    const a = (a, l) => {
        t({ ...e, [a]: l })
      },
      l = [
        { key: 'targetType', label: '目标类型', options: W },
        { key: 'action', label: '操作类型', options: J },
      ]
    return E.jsxs('div', {
      className: G,
      children: [
        E.jsxs('div', {
          className: F,
          children: [
            E.jsx('label', { className: q, children: '时间范围' }),
            E.jsx('div', {
              className: H,
              children: K.map(({ value: t, label: l }) =>
                E.jsx(
                  'button',
                  {
                    className: `${V} ${e.timeRange === t ? z : ''}`,
                    onClick: () => a('timeRange', t),
                    children: l,
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
        l.map(({ key: t, label: l, options: n }) =>
          E.jsxs(
            'div',
            {
              className: F,
              children: [
                E.jsx('label', { className: q, children: l }),
                E.jsxs('div', {
                  className: H,
                  children: [
                    E.jsx('button', {
                      className: `${V} ${0 === e[t].length ? z : ''}`,
                      onClick: () => a(t, []),
                      children: '全部',
                    }),
                    n.map(({ value: l, label: n }) =>
                      E.jsx(
                        'button',
                        {
                          className: `${V} ${Array.isArray(e[t]) && e[t].includes(l) ? z : ''}`,
                          onClick: () =>
                            ((t, l, n) => {
                              const s = e[t],
                                o = n ? [...s, l] : s.filter(e => e !== l)
                              a(t, o)
                            })(t, l, !e[t].includes(l)),
                          children: n,
                        },
                        l,
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
  Q = {
    pagination: 'index-module-pagination-2f71e',
    paginationInfo: 'index-module-pagination-info-3a241',
    paginationControls: 'index-module-pagination-controls-1f07d',
    paginationBtn: 'index-module-pagination-btn-4088d',
    disabled: 'index-module-disabled-ee26e',
    active: 'index-module-active-0a758',
    paginationEllipsis: 'index-module-pagination-ellipsis-aad3c',
    paginationSizeChanger: 'index-module-pagination-size-changer-ea920',
    paginationSelect: 'index-module-pagination-select-25af3',
  },
  Y = n.memo(
    ({
      current: e,
      pageSize: t,
      total: a,
      onChange: l,
      showSizeChanger: s = !0,
      pageSizeOptions: o = [20, 50, 100, 200],
      onShowSizeChange: r,
    }) => {
      const i = Math.ceil(a / t),
        d = (e - 1) * t + 1,
        c = Math.min(e * t, a),
        m = t => {
          t >= 1 && t <= i && t !== e && l(t)
        }
      return 0 === a
        ? E.jsx('div', {
            className: Q.pagination,
            children: E.jsx('div', {
              className: Q.info,
              children: E.jsx('span', { children: '暂无数据' }),
            }),
          })
        : E.jsxs('div', {
            className: Q.pagination,
            children: [
              E.jsx('div', {
                className: Q.paginationInfo,
                children: E.jsxs('span', {
                  children: ['显示 ', d, '-', c, ' 条，共 ', a, ' 条'],
                }),
              }),
              E.jsxs('div', {
                className: Q.paginationControls,
                children: [
                  E.jsx('button', {
                    className: `${Q.paginationBtn} ${1 === e ? Q.disabled : ''}`,
                    onClick: () => m(e - 1),
                    disabled: 1 === e,
                    children: E.jsx('span', { children: '‹' }),
                  }),
                  (() => {
                    if (i <= 7)
                      return Array.from({ length: i }, (e, t) => t + 1)
                    const t = [1],
                      a = Math.max(2, e - 2),
                      l = Math.min(i - 1, e + 2)
                    e > 4 && t.push('...')
                    for (let e = a; e <= l; e++) t.push(e)
                    return e < i - 2 - 1 && t.push('...'), t.push(i), t
                  })().map((t, a) =>
                    E.jsx(
                      n.Fragment,
                      {
                        children:
                          'number' == typeof t
                            ? E.jsx('button', {
                                className: `${Q.paginationBtn} ${e === t ? Q.active : ''}`,
                                onClick: () => m(t),
                                children: t,
                              })
                            : E.jsx('span', {
                                className: Q.paginationEllipsis,
                                children: t,
                              }),
                      },
                      a,
                    ),
                  ),
                  E.jsx('button', {
                    className: `${Q.paginationBtn} ${e === i ? Q.disabled : ''}`,
                    onClick: () => m(e + 1),
                    disabled: e === i,
                    children: E.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              s &&
                E.jsxs('div', {
                  className: Q.paginationSizeChanger,
                  children: [
                    E.jsx('span', { children: '每页' }),
                    E.jsx('select', {
                      value: t,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (r && r(1, t))
                        var t
                      },
                      className: Q.paginationSelect,
                      children: o.map(e =>
                        E.jsx('option', { value: e, children: e }, e),
                      ),
                    }),
                    E.jsx('span', { children: '条' }),
                  ],
                }),
            ],
          })
    },
  ),
  Z = 'index-module-selectionManager-8b344',
  ee = 'index-module-selectionInfo-db6bc',
  te = 'index-module-selectionCount-0c8ab',
  ae = 'index-module-selectionActions-179a8',
  le = 'index-module-actionGroup-eeb2e',
  ne = 'index-module-groupLabel-cb468',
  se = 'index-module-actionBtn-09e74',
  oe = 'index-module-selectAllBtn-997f0',
  re = 'index-module-clearBtn-2abc9',
  ie = n.memo(
    ({
      currentPageEvents: e,
      selectedEventIds: t,
      totalCount: l,
      onSelectionChange: n,
      loading: s = !1,
    }) => {
      a.useMemo(() => e.map(e => e.id), [e])
      const o = a.useMemo(() => t.includes(-1), [t]),
        r = a.useMemo(() => {
          if (o) return { count: l, text: `已全选 ${l} 条` }
          const e = t.filter(e => -1 !== e).length
          return { count: e, text: `已选中 ${e} 条` }
        }, [o, l, t]),
        i = a.useCallback(() => {
          n([-1], !0)
        }, [n]),
        d = a.useCallback(() => {
          n([], !1)
        }, [n])
      return E.jsxs('div', {
        className: Z,
        children: [
          E.jsx('div', {
            className: ee,
            children: E.jsx('span', { className: te, children: r.text }),
          }),
          E.jsx('div', {
            className: ae,
            children: E.jsxs('div', {
              className: le,
              children: [
                E.jsx('span', { className: ne, children: '全部:' }),
                E.jsx('button', {
                  className: `${se} ${oe}`,
                  onClick: i,
                  disabled: s || o,
                  title: '选择所有数据',
                  children: '全选',
                }),
                E.jsx('button', {
                  className: `${se} ${re}`,
                  onClick: d,
                  disabled: s || 0 === r.count,
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
  de = {
    eventsList: 'index-module-events-list-1413b',
    eventsListHeader: 'index-module-events-list-header-59f57',
    headerCell: 'index-module-header-cell-70f90',
    checkboxCell: 'index-module-checkbox-cell-ff7de',
    contentCell: 'index-module-content-cell-e5780',
    actionCell: 'index-module-action-cell-008af',
    timeCell: 'index-module-time-cell-d64a2',
    detailCell: 'index-module-detail-cell-5c5a4',
    sortIcon: 'index-module-sort-icon-222d6',
    eventsListBody: 'index-module-events-list-body-4cc5b',
    eventRow: 'index-module-event-row-1d079',
    selected: 'index-module-selected-495cf',
    cell: 'index-module-cell-ef8c6',
    eventIcon: 'index-module-event-icon-a4628',
    eventContent: 'index-module-event-content-a476c',
    eventTitle: 'index-module-event-title-93269',
    eventDescription: 'index-module-event-description-1a6df',
    actionTag: 'index-module-action-tag-e2ce1',
    eventTime: 'index-module-event-time-99e29',
    detailBtn: 'index-module-detail-btn-4733c',
    detailIcon: 'index-module-detail-icon-c528a',
    emptyState: 'index-module-empty-state-dd5f4',
    emptyIcon: 'index-module-empty-icon-65e5d',
    eventsListLoading: 'index-module-events-list-loading-53051',
    loadingSpinner: 'index-module-loading-spinner-834a4',
    checkboxContainer: 'index-module-checkbox-container-d9d3f',
    checkmark: 'index-module-checkmark-6b6da',
  },
  ce = n.memo(
    ({
      events: e,
      totalCount: t,
      loading: l,
      sortOptions: n,
      onSortChange: s,
      paginationOptions: o,
      onPaginationChange: r,
      selectedEventIds: i,
      isFullSelection: d,
      onSelectionChange: c,
      onEventSelect: m,
      onEventDetail: u,
    }) => {
      const p = a.useCallback(
          e => {
            if ('created_at' !== e) return
            const t = n.field === e && 'desc' === n.order ? 'asc' : 'desc'
            s({ field: e, order: t })
          },
          [n.field, n.order, s],
        ),
        g = a.useCallback(
          e => (n.field !== e ? '' : 'desc' === n.order ? '↓' : '↑'),
          [n.field, n.order],
        ),
        x = a.useCallback(
          e => {
            m(e)
          },
          [m],
        ),
        v = a.useCallback(e => {
          const t = new Date(e),
            a = new Date(),
            l =
              new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() -
              new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
            n = Math.floor(l / 864e5),
            s = t.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          return 0 === n
            ? `今天 ${s}`
            : 1 === n
              ? `昨天 ${s}`
              : n > 1 && n <= 7
                ? `${n}天前`
                : t.toLocaleDateString('zh-CN', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
        }, []),
        b = a.useCallback(e => {
          if (e.push_data) return `推送到分支 ${e.push_data.ref}`
          if (e.note) {
            const t = 50
            return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
          }
          return 'joined' === e.action_name
            ? '加入项目'
            : e.title || e.target_title || '无标题'
        }, []),
        f = a.useCallback(
          e => {
            const { action_name: t, target_type: a } = e
            if (e.push_data) {
              const { ref: t, commit_count: a } = e.push_data
              return {
                icon: '⬆️',
                actionType: '推送',
                title: `推送到分支 ${t} (${a} 个提交)`,
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
            const l = e.title || e.target_title || '无标题',
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
              s = (a && n[a]) || (t && n[t])
            return s
              ? { ...s, title: l }
              : { icon: '📋', actionType: a || t || '未知操作', title: b(e) }
          },
          [b],
        ),
        j = a.useCallback(e => {
          var t
          return e.push_data
            ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
            : e.note && e.target_title
              ? e.target_title
              : (null == (t = e.project) ? void 0 : t.path_with_namespace)
                ? e.project.path_with_namespace
                : void 0 !== e.project_id && null !== e.project_id
                  ? `项目ID: ${e.project_id}`
                  : '未知项目'
        }, [])
      return E.jsxs('div', {
        className: de.eventsList,
        children: [
          E.jsx(ie, {
            currentPageEvents: e,
            selectedEventIds: i,
            totalCount: t,
            onSelectionChange: c,
            loading: l,
          }),
          E.jsxs('div', {
            className: de.eventsListHeader,
            children: [
              E.jsx('div', {
                className: `${de.headerCell} ${de.checkboxCell}`,
                children: E.jsx('span', { children: '选择' }),
              }),
              E.jsx('div', {
                className: `${de.headerCell} ${de.contentCell}`,
                children: E.jsx('span', { children: '标题和内容' }),
              }),
              E.jsx('div', {
                className: `${de.headerCell} ${de.actionCell}`,
                children: E.jsx('span', { children: '操作' }),
              }),
              E.jsxs('div', {
                className: `${de.headerCell} ${de.timeCell}`,
                onClick: () => p('created_at'),
                children: [
                  E.jsx('span', { children: '时间' }),
                  E.jsx('span', {
                    className: de.sortIcon,
                    children: g('created_at'),
                  }),
                ],
              }),
              E.jsx('div', {
                className: `${de.headerCell} ${de.detailCell}`,
                children: '详情',
              }),
            ],
          }),
          E.jsx('div', {
            className: de.eventsListBody,
            children: l
              ? E.jsxs('div', {
                  className: de.eventsListLoading,
                  children: [
                    E.jsx('div', { className: de.loadingSpinner }),
                    E.jsx('p', { children: '正在加载事件数据...' }),
                  ],
                })
              : 0 === e.length
                ? E.jsxs('div', {
                    className: de.emptyState,
                    children: [
                      E.jsx('div', { className: de.emptyIcon, children: '📄' }),
                      E.jsx('p', { children: '暂无事件数据' }),
                      E.jsx('span', { children: h.INVALID_FILTER_OR_CONFIG }),
                    ],
                  })
                : e.map(e => {
                    const t = d || i.includes(e.id),
                      { icon: a, title: l, actionType: n } = f(e)
                    return E.jsxs(
                      'div',
                      {
                        className: `${de.eventRow} ${t ? de.selected : ''}`,
                        children: [
                          E.jsx('div', {
                            className: `${de.cell} ${de.checkboxCell}`,
                            children: E.jsxs('label', {
                              className: de.checkboxContainer,
                              children: [
                                E.jsx('input', {
                                  type: 'checkbox',
                                  checked: t,
                                  onChange: () => x(e.id),
                                  title: t ? '取消选择' : '选择此事件',
                                }),
                                E.jsx('span', { className: de.checkmark }),
                              ],
                            }),
                          }),
                          E.jsxs('div', {
                            className: `${de.cell} ${de.contentCell}`,
                            children: [
                              E.jsx('div', {
                                className: de.eventIcon,
                                children: a,
                              }),
                              E.jsxs('div', {
                                className: de.eventContent,
                                children: [
                                  E.jsx('div', {
                                    className: de.eventTitle,
                                    children: l,
                                  }),
                                  E.jsx('div', {
                                    className: de.eventDescription,
                                    children: j(e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          E.jsx('div', {
                            className: `${de.cell} ${de.actionCell}`,
                            children: E.jsx('span', {
                              className: de.actionTag,
                              children: n,
                            }),
                          }),
                          E.jsx('div', {
                            className: `${de.cell} ${de.timeCell}`,
                            children: E.jsx('span', {
                              className: de.eventTime,
                              children: v(e.created_at),
                            }),
                          }),
                          E.jsx('div', {
                            className: `${de.cell} ${de.detailCell}`,
                            children: E.jsx('button', {
                              className: de.detailBtn,
                              onClick: () => u(e),
                              title: '查看详情',
                              children: E.jsx('span', {
                                className: de.detailIcon,
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
          E.jsx('div', {
            className: de.eventsListFooter,
            children: E.jsx(Y, {
              current: o.page,
              pageSize: o.pageSize,
              total: t,
              onChange: e => r({ ...o, page: e }),
              showSizeChanger: !0,
              onShowSizeChange: (e, a) => r({ page: e, pageSize: a, total: t }),
            }),
          }),
        ],
      })
    },
  ),
  me = {
    actionBtn: 'index-module-action-btn-fcc57',
    versionBtn: 'index-module-version-btn-d52fd',
    hasUpdate: 'index-module-has-update-6a26f',
    icon: 'index-module-icon-063ca',
    text: 'index-module-text-3aa8d',
    notificationOverlay: 'index-module-notification-overlay-edc1f',
    notification: 'index-module-notification-d7f45',
    notificationHeader: 'index-module-notification-header-49a8f',
    closeBtn: 'index-module-close-btn-4e53b',
    notificationBody: 'index-module-notification-body-2d539',
    versionInfo: 'index-module-version-info-d73d8',
    releaseNotes: 'index-module-release-notes-25eef',
    notesContent: 'index-module-notes-content-6a794',
    notificationFooter: 'index-module-notification-footer-8c25c',
    laterBtn: 'index-module-later-btn-6d3bb',
    updateBtn: 'index-module-update-btn-c0c59',
  },
  ue = ({ currentVersion: e }) => {
    const [t, n] = a.useState(null),
      [s, o] = a.useState(!1),
      [r, i] = a.useState(!1),
      [d, m] = a.useState(!1),
      [u, h] = a.useState(null),
      [p, g] = a.useState(null),
      [x, v] = a.useState(!1),
      [b, f] = a.useState(new Set())
    a.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && f(new Set(JSON.parse(e)))
      } catch (e) {}
    }, [])
    const j = a.useCallback((e, t) => {
        const a = e.split('.').map(Number),
          l = t.split('.').map(Number),
          n = Math.max(a.length, l.length)
        for (let s = 0; s < n; s++) {
          const e = a[s] || 0,
            t = l[s] || 0
          if (t > e) return !0
          if (t < e) return !1
        }
        return !1
      }, []),
      w = a.useCallback(
        async (a = !0) => {
          if (!s)
            if (x && t && r && a) (!a && b.has(t.version)) || m(!0)
            else {
              o(!0), g(null)
              try {
                const t = new AbortController(),
                  l = setTimeout(() => t.abort(), 1e4),
                  s = Math.floor(Date.now() / 36e5),
                  o = !1
                    ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                    : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  r = await c(`${o}?t=${s}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    signal: t.signal,
                    timeout: 1e4,
                  })
                if ((clearTimeout(l), !r.ok))
                  throw new Error(`HTTP ${r.status}: ${r.statusText}`)
                const d = await r.json(),
                  u = {
                    version: d.version,
                    downloadUrl:
                      'https://github.com/imzusheng/tm_gitlabWeeklyReport',
                    releaseNotes: `版本 ${d.version} 已发布，请及时更新以获得最新功能和修复。`,
                  }
                n(u), h(new Date()), v(!0)
                const p = j(e, u.version)
                i(p), p && ((!a && b.has(u.version)) || m(!0))
              } catch (l) {
                const e = l instanceof Error ? l.message : '检查更新失败'
                g(e)
              } finally {
                o(!1)
              }
            }
        },
        [s, j, e, b, x, t, r],
      )
    a.useEffect(() => {
      const e = setTimeout(() => {
        w(!1)
      }, 1e3)
      return () => clearTimeout(e)
    }, [])
    const N = a.useCallback(async () => {
        ;(null == t ? void 0 : t.downloadUrl) &&
          (window.open(t.downloadUrl, '_blank'),
          m(!1),
          setTimeout(async () => {
            await w(!1)
            j(e, t.version)
          }, 1e3))
      }, [t, w, j, e]),
      y = a.useCallback(() => {
        f(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {}
      }, []),
      C = a.useCallback(() => {
        if ((m(!1), t)) {
          const a = new Set(b)
          a.add(t.version), f(a)
          try {
            localStorage.setItem(
              'gitlab-weekly-report-dismissed-versions',
              JSON.stringify(Array.from(a)),
            )
          } catch (e) {}
        }
      }, [t, b]),
      k = a.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      S = a.useCallback(
        () =>
          s
            ? '检查中...'
            : p
              ? '检查失败'
              : r
                ? '有更新'
                : x && !r
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [s, p, r, x],
      ),
      T = a.useCallback(() => (s ? '🔄' : p ? '⚠️' : r ? '🔴' : ''), [s, p, r])
    a.useEffect(() => {}, [y])
    const $ = a.useCallback(() => {
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
      a.useEffect(
        () => () => {
          const e = document.getElementById('version-notification-root')
          e && 0 === e.children.length && document.body.removeChild(e)
        },
        [],
      ),
      E.jsxs(E.Fragment, {
        children: [
          E.jsxs('button', {
            className: `${me.actionBtn} ${me.versionBtn} ${s ? me.checking : ''} ${r ? me.hasUpdate : ''}`,
            onClick: () => w(!0),
            disabled: s,
            title: u
              ? `上次检查: ${k(u)}${p ? `\n错误: ${p}` : ''}`
              : '点击检查更新',
            children: [
              E.jsx('span', { className: me.icon, children: T() }),
              E.jsx('span', { className: me.text, children: S() }),
            ],
          }),
          d &&
            r &&
            t &&
            l.createPortal(
              E.jsx('div', {
                className: me.notificationOverlay,
                children: E.jsxs('div', {
                  className: me.notification,
                  children: [
                    E.jsxs('div', {
                      className: me.notificationHeader,
                      children: [
                        E.jsx('h3', { children: '发现新版本' }),
                        E.jsx('button', {
                          className: me.closeBtn,
                          onClick: C,
                          children: '×',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: me.notificationBody,
                      children: [
                        E.jsxs('div', {
                          className: me.versionInfo,
                          children: [
                            E.jsxs('p', {
                              children: [
                                E.jsx('strong', { children: '当前版本:' }),
                                ' v',
                                e,
                              ],
                            }),
                            E.jsxs('p', {
                              children: [
                                E.jsx('strong', { children: '最新版本:' }),
                                ' v',
                                t.version,
                              ],
                            }),
                          ],
                        }),
                        t.releaseNotes &&
                          E.jsxs('div', {
                            className: me.releaseNotes,
                            children: [
                              E.jsx('h4', { children: '更新说明:' }),
                              E.jsx('div', {
                                className: me.notesContent,
                                children: t.releaseNotes,
                              }),
                            ],
                          }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: me.notificationFooter,
                      children: [
                        E.jsx('button', {
                          className: me.laterBtn,
                          onClick: C,
                          children: '稍后更新',
                        }),
                        E.jsx('button', {
                          className: me.updateBtn,
                          onClick: N,
                          children: '立即更新',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              $(),
            ),
        ],
      })
    )
  },
  he = 'index-module-main-panel-0cebf',
  pe = 'index-module-panel-header-b58dd',
  ge = 'index-module-header-right-1ffdf',
  xe = 'index-module-divider-cf986',
  ve = 'index-module-action-buttons-6002e',
  be = 'index-module-action-btn-23f6c',
  fe = 'index-module-btn-icon-2bcf1',
  je = 'index-module-btn-label-8a151',
  we = 'index-module-ai-btn-ff430',
  Ne = 'index-module-config-incomplete-c748b',
  ye = 'index-module-config-badge-73915',
  Ce = 'index-module-filter-section-44f04',
  ke = 'index-module-events-section-88ca7',
  Ee = ({
    events: e,
    totalCount: t,
    loading: a,
    filterConditions: l,
    sortOptions: s,
    paginationOptions: o,
    selectedEventIds: r,
    onFilterChange: i,
    onSortChange: d,
    onPaginationChange: c,
    onEventSelect: m,
    onSelectionChange: u,
    onEventDetail: h,
    onOpenSettings: x,
    onOpenAI: v,
    isAllEventsSelected: b = !1,
  }) => {
    const { config: f } = _(),
      j = n.useMemo(() => {
        const e = [
            'gitlabUrl',
            'gitlabToken',
            'deepseekApiKey',
            'defaultPrompt',
          ],
          t = e.filter(e => {
            const t = f[e]
            return 'string' == typeof t ? '' !== t.trim() : !!t
          }).length
        return {
          isValid: t === e.length,
          completedCount: t,
          totalCount: e.length,
        }
      }, [f])
    return E.jsxs('div', {
      className: he,
      children: [
        E.jsx('div', {
          className: pe,
          children: E.jsxs('div', {
            className: ge,
            children: [
              E.jsx(ue, { currentVersion: p }),
              E.jsx('div', { className: xe }),
              E.jsxs('div', {
                className: ve,
                children: [
                  E.jsxs('button', {
                    className: `${be} ${j.isValid ? '' : Ne}`,
                    onClick: x,
                    title: j.isValid
                      ? '设置'
                      : `配置未完成 (${j.completedCount}/${j.totalCount})`,
                    children: [
                      E.jsx('span', {
                        className: fe,
                        children: E.jsxs('svg', {
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          children: [
                            E.jsx('path', {
                              d: 'M12 15a3 3 0 100-6 3 3 0 000 6z',
                              stroke: 'currentColor',
                              strokeWidth: '2',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                            }),
                            E.jsx('path', {
                              d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
                              stroke: 'currentColor',
                              strokeWidth: '2',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                            }),
                          ],
                        }),
                      }),
                      E.jsxs('span', {
                        className: je,
                        children: [
                          '设置',
                          !j.isValid &&
                            E.jsxs('span', {
                              className: ye,
                              children: [j.completedCount, '/', j.totalCount],
                            }),
                        ],
                      }),
                    ],
                  }),
                  E.jsxs('button', {
                    className: `${be} ${we}`,
                    onClick: v,
                    title: g['weekly-report'].title,
                    children: [
                      E.jsx('span', {
                        className: fe,
                        children: E.jsxs('svg', {
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          children: [
                            E.jsx('path', {
                              d: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
                              fill: 'currentColor',
                            }),
                            E.jsx('path', {
                              d: 'M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z',
                              fill: 'currentColor',
                            }),
                            E.jsx('path', {
                              d: 'M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z',
                              fill: 'currentColor',
                            }),
                          ],
                        }),
                      }),
                      E.jsx('span', {
                        className: je,
                        children: g['weekly-report'].buttonText,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        E.jsx('div', {
          className: Ce,
          children: E.jsx(X, { filterConditions: l, onFilterChange: i }),
        }),
        E.jsx('div', {
          className: ke,
          children: E.jsx(ce, {
            events: e,
            totalCount: t,
            loading: a,
            sortOptions: s,
            onSortChange: d,
            paginationOptions: o,
            onPaginationChange: c,
            selectedEventIds: r,
            onSelectionChange: u,
            isFullSelection: b,
            onEventSelect: m,
            onEventDetail: h,
          }),
        }),
      ],
    })
  },
  Se = 'index-module-modal-mask-2b67e',
  Te = 'index-module-modal-0b442',
  $e = 'index-module-modal-header-9ebeb',
  De = 'index-module-modal-title-67221',
  Ie = 'index-module-modal-close-a0e9a',
  Me = 'index-module-modal-body-e5544',
  Le = 'index-module-modal-footer-6d9a3',
  _e = ({
    visible: e,
    title: t,
    width: n = 520,
    maxHeight: s = window.innerHeight - 180,
    children: o,
    footer: r,
    onClose: i,
    maskClosable: d = !0,
  }) => {
    if (
      (a.useEffect(() => {
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
      a.useEffect(
        () => () => {
          const e = document.getElementById('gitlab-weekly-report-modal-root')
          e && 0 === e.children.length && document.body.removeChild(e)
        },
        [],
      ),
      !e)
    )
      return null
    const c = E.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: Se,
      onClick: e => {
        e.target === e.currentTarget && d && i()
      },
      children: E.jsxs('div', {
        className: Te,
        style: { width: n, maxHeight: s },
        children: [
          E.jsxs('div', {
            className: $e,
            children: [
              E.jsx('div', { className: De, children: t }),
              E.jsx('button', {
                className: Ie,
                onClick: i,
                children: E.jsx('span', { children: '×' }),
              }),
            ],
          }),
          E.jsx('div', { className: Me, children: o }),
          r && E.jsx('div', { className: Le, children: r }),
        ],
      }),
    })
    return l.createPortal(
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
  Ae = 'index-module-config-status-9ef0f',
  Pe = 'index-module-clickable-3bbf4',
  Oe = 'index-module-compact-d4398',
  Re = 'index-module-compact-content-93d4f',
  Ue = 'index-module-status-icon-eb9c8',
  Be = 'index-module-compact-text-adc2b',
  Ge = 'index-module-expand-button-8d5b0',
  Fe = 'index-module-expanded-content-f209c',
  qe = 'index-module-config-items-14961',
  He = 'index-module-compact-item-d0618',
  Ve = 'index-module-item-label-78917',
  ze = 'index-module-item-icon-4196d',
  Ke = 'index-module-valid-26841',
  We = 'index-module-invalid-f7dc7',
  Je = 'index-module-status-header-f4c07',
  Xe = 'index-module-status-title-7047e',
  Qe = 'index-module-status-text-7ac8b',
  Ye = 'index-module-progress-container-b9d7f',
  Ze = 'index-module-progress-bar-3951c',
  et = 'index-module-progress-fill-63172',
  tt = 'index-module-complete-fc16e',
  at = 'index-module-progress-text-63324',
  lt = 'index-module-config-item-a48ac',
  nt = 'index-module-item-info-9094d',
  st = 'index-module-item-status-1545d',
  ot = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  rt = ot.length,
  it = ({
    config: e,
    className: t = '',
    showDetails: l = !0,
    onClick: s,
    compact: o = !1,
  }) => {
    const r = a.useMemo(() => {
        const t = ot.map(t => {
            const a = e[t.key],
              l = 'string' == typeof a ? '' !== a.trim() : !!a
            return { ...t, isValid: l, value: l ? '已配置' : '未配置' }
          }),
          a = t.filter(e => e.isValid).length
        return {
          isValid: a === rt,
          itemsStatus: t,
          completedCount: a,
          totalCount: rt,
          progress: (a / rt) * 100,
        }
      }, [e]),
      [i, d] = n.useState(!r.isValid)
    return o && r.isValid
      ? E.jsxs('div', {
          className: `${Ae} ${Oe} ${t} ${s ? Pe : ''}`,
          onClick: s,
          children: [
            E.jsxs('div', {
              className: Re,
              children: [
                E.jsx('span', { className: Ue, children: '✅' }),
                E.jsx('span', { className: Be, children: '配置已完成' }),
                l &&
                  E.jsx('button', {
                    className: Ge,
                    onClick: e => {
                      e.stopPropagation(), d(!i)
                    },
                    children: i ? '收起' : '详情',
                  }),
              ],
            }),
            l &&
              i &&
              E.jsx('div', {
                className: Fe,
                children: E.jsx('div', {
                  className: qe,
                  children: r.itemsStatus.map(e =>
                    E.jsxs(
                      'div',
                      {
                        className: `${lt} ${He} ${e.isValid ? Ke : We}`,
                        children: [
                          E.jsx('span', { className: Ve, children: e.label }),
                          E.jsx('span', {
                            className: ze,
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
      : E.jsxs('div', {
          className: `${Ae} ${t} ${s ? Pe : ''}`,
          onClick: s,
          children: [
            E.jsxs('div', {
              className: Je,
              children: [
                E.jsxs('div', {
                  className: Xe,
                  children: [
                    E.jsx('span', {
                      className: Ue,
                      children: r.isValid ? '✅' : '⚠️',
                    }),
                    E.jsxs('span', {
                      className: Qe,
                      children: [
                        '配置状态 (',
                        r.completedCount,
                        '/',
                        r.totalCount,
                        ')',
                      ],
                    }),
                  ],
                }),
                E.jsxs('div', {
                  className: Ye,
                  children: [
                    E.jsx('div', {
                      className: Ze,
                      children: E.jsx('div', {
                        className: `${et} ${r.isValid ? tt : ''}`,
                        style: { width: `${r.progress}%` },
                      }),
                    }),
                    E.jsxs('span', {
                      className: at,
                      children: [Math.round(r.progress), '%'],
                    }),
                  ],
                }),
              ],
            }),
            l &&
              E.jsx('div', {
                className: qe,
                children: r.itemsStatus.map(e =>
                  E.jsxs(
                    'div',
                    {
                      className: `${lt} ${e.isValid ? Ke : We}`,
                      children: [
                        E.jsxs('div', {
                          className: nt,
                          children: [
                            E.jsx('span', { className: Ve, children: e.label }),
                            E.jsx('span', { className: st, children: e.value }),
                          ],
                        }),
                        E.jsx('span', {
                          className: ze,
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
  dt = 'index-module-settings-panel-37e8c',
  ct = 'index-module-settings-tabs-13ffd',
  mt = 'index-module-tab-button-72cc2',
  ut = 'index-module-active-88afc',
  ht = 'index-module-settings-content-27852',
  pt = 'index-module-tab-panel-78ed4',
  gt = 'index-module-form-group-5672e',
  xt = 'index-module-form-label-be41d',
  vt = 'index-module-required-6a2a5',
  bt = 'index-module-form-input-f0c8f',
  ft = 'index-module-form-select-e5eaa',
  jt = 'index-module-form-textarea-a0897',
  wt = 'index-module-form-hint-a4ca3',
  Nt = 'index-module-error-message-16069',
  yt = 'index-module-version-info-ade91',
  Ct = 'index-module-version-text-cb226',
  kt = 'index-module-settings-footer-8c678',
  Et = 'index-module-footer-right-a2619',
  St = 'index-module-btn-primary-6df59',
  Tt = 'index-module-switch-container-1295f',
  $t = 'index-module-switch-input-32930',
  Dt = 'index-module-switch-label-f72bd',
  It = 'index-module-switch-slider-e3dd8',
  Mt = 'index-module-btn-secondary-4568f',
  Lt = ({ isOpen: e, onClose: t, config: l, onSave: n, theme: s }) => {
    const [o, r] = a.useState(l),
      [i, d] = a.useState(s),
      [c, m] = a.useState('env'),
      [u, h] = a.useState(null)
    a.useEffect(() => {
      r(l)
    }, [l]),
      a.useEffect(() => {
        d(s)
      }, [s]),
      a.useEffect(() => {
        e && (r(l), d(s))
      }, [e, l, s])
    const g = (e, t) => {
      r(a => ({ ...a, [e]: t }))
    }
    return E.jsx(_e, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: E.jsxs('div', {
        className: kt,
        children: [
          E.jsx('button', {
            className: Mt,
            onClick: () => {
              r(l), d(s), h(null)
            },
            children: '重置',
          }),
          E.jsxs('div', {
            className: Et,
            children: [
              E.jsx('button', { className: Mt, onClick: t, children: '取消' }),
              E.jsx('button', {
                className: St,
                onClick: () => {
                  if ((h(null), 'env' === c)) {
                    if (
                      !(
                        o.gitlabUrl.trim() &&
                        o.gitlabToken.trim() &&
                        o.deepseekApiKey.trim() &&
                        o.defaultPrompt.trim()
                      )
                    )
                      return void h('请填写所有必填的环境配置项')
                    if (
                      o.tokenLimit < 1e3 ||
                      o.tokenLimit > 1e4 ||
                      !Number.isInteger(o.tokenLimit)
                    )
                      return void h(
                        'Token 数量限制必须在 1000-10000 之间且为整数',
                      )
                  }
                  n(o, i), t()
                },
                children: '保存',
              }),
            ],
          }),
        ],
      }),
      children: E.jsxs('div', {
        className: dt,
        children: [
          E.jsx(it, { config: o, showDetails: !0, compact: !0 }),
          E.jsxs('div', {
            className: ct,
            children: [
              E.jsx('button', {
                className: `${mt} ${'env' === c ? ut : ''}`,
                onClick: () => m('env'),
                children: '环境配置',
              }),
              E.jsx('button', {
                className: `${mt} ${'appearance' === c ? ut : ''}`,
                onClick: () => m('appearance'),
                children: '外观设置',
              }),
            ],
          }),
          E.jsxs('div', {
            className: ht,
            children: [
              'env' === c &&
                E.jsxs('div', {
                  className: pt,
                  children: [
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsxs('label', {
                          className: xt,
                          children: [
                            'GitLab 项目地址 ',
                            E.jsx('span', { className: vt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: bt,
                          placeholder: x.gitlabUrl,
                          value: o.gitlabUrl,
                          onChange: e => g('gitlabUrl', e.target.value),
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsxs('label', {
                          className: xt,
                          children: [
                            '个人访问令牌 ',
                            E.jsx('span', { className: vt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: bt,
                          placeholder: x.gitlabToken,
                          value: o.gitlabToken,
                          onChange: e => g('gitlabToken', e.target.value),
                        }),
                        E.jsx('div', {
                          className: wt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsxs('label', {
                          className: xt,
                          children: [
                            'DeepSeek API Key ',
                            E.jsx('span', { className: vt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: bt,
                          placeholder: x.deepseekApiKey,
                          value: o.deepseekApiKey,
                          onChange: e => g('deepseekApiKey', e.target.value),
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsx('label', {
                          className: xt,
                          children: '使用的模型',
                        }),
                        E.jsxs('select', {
                          className: ft,
                          value: o.model,
                          onChange: e => g('model', e.target.value),
                          children: [
                            E.jsx('option', {
                              value: 'deepseek-chat',
                              children: 'deepseek-chat',
                            }),
                            E.jsx('option', {
                              value: 'deepseek-coder',
                              children: 'deepseek-coder',
                            }),
                          ],
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsx('label', {
                          className: xt,
                          children: 'Token 数量限制',
                        }),
                        E.jsx('input', {
                          type: 'number',
                          className: bt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: o.tokenLimit,
                          onChange: e =>
                            g('tokenLimit', parseInt(e.target.value)),
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsxs('label', {
                          className: xt,
                          children: [
                            '默认提示词 ',
                            E.jsx('span', { className: vt, children: '*' }),
                          ],
                        }),
                        E.jsx('textarea', {
                          className: jt,
                          rows: 6,
                          placeholder: x.defaultPrompt,
                          value: o.defaultPrompt,
                          onChange: e => g('defaultPrompt', e.target.value),
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                    u && E.jsx('div', { className: Nt, children: u }),
                  ],
                }),
              'appearance' === c &&
                E.jsxs('div', {
                  className: pt,
                  children: [
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsx('label', { className: xt, children: '主题模式' }),
                        E.jsxs('select', {
                          className: ft,
                          value: i,
                          onChange: e => d(e.target.value),
                          children: [
                            E.jsx('option', {
                              value: 'system',
                              children: '跟随系统',
                            }),
                            E.jsx('option', {
                              value: 'light',
                              children: '浅色模式',
                            }),
                            E.jsx('option', {
                              value: 'dark',
                              children: '深色模式',
                            }),
                          ],
                        }),
                        E.jsx('div', {
                          className: wt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsx('label', {
                          className: xt,
                          children: '自动检查更新',
                        }),
                        E.jsxs('div', {
                          className: Tt,
                          children: [
                            E.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: $t,
                              checked: o.autoCheckUpdate ?? !0,
                              onChange: e =>
                                g('autoCheckUpdate', e.target.checked),
                            }),
                            E.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: Dt,
                              children: E.jsx('span', { className: It }),
                            }),
                          ],
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: gt,
                      children: [
                        E.jsx('label', {
                          className: xt,
                          children: '检查更新间隔',
                        }),
                        E.jsxs('select', {
                          className: ft,
                          value: o.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            g('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(o.autoCheckUpdate ?? 1),
                          children: [
                            E.jsx('option', { value: 6e4, children: '1分钟' }),
                            E.jsx('option', { value: 3e5, children: '5分钟' }),
                            E.jsx('option', { value: 6e5, children: '10分钟' }),
                            E.jsx('option', {
                              value: 18e5,
                              children: '30分钟',
                            }),
                            E.jsx('option', { value: 36e5, children: '1小时' }),
                          ],
                        }),
                        E.jsx('div', {
                          className: wt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          E.jsx('div', {
            className: yt,
            children: E.jsxs('span', { className: Ct, children: ['v', p] }),
          }),
        ],
      }),
    })
  },
  _t = {
    aiPanel: 'index-module-ai-panel-83f0d',
    dataOverview: 'index-module-data-overview-80a69',
    overviewHeader: 'index-module-overview-header-d7c5d',
    overviewContent: 'index-module-overview-content-26e2a',
    overviewItem: 'index-module-overview-item-ea192',
    overviewLabel: 'index-module-overview-label-488d4',
    overviewValue: 'index-module-overview-value-4aaae',
    ready: 'index-module-ready-92947',
    waiting: 'index-module-waiting-d6dbd',
    resultSection: 'index-module-result-section-a54de',
    resultHeader: 'index-module-result-header-e7f52',
    resultTitle: 'index-module-result-title-4bdc2',
    titleIcon: 'index-module-title-icon-31efd',
    resultActions: 'index-module-result-actions-6dae9',
    actionBtn: 'index-module-action-btn-2213f',
    btnIcon: 'index-module-btn-icon-719c6',
    resultContent: 'index-module-result-content-0034e',
    resultText: 'index-module-result-text-98df1',
    resultMeta: 'index-module-result-meta-16b2f',
    metaLeft: 'index-module-meta-left-6fc02',
    metaItem: 'index-module-meta-item-f3765',
    promptSection: 'index-module-prompt-section-9ec6c',
    sectionHeader: 'index-module-section-header-35869',
    headerActions: 'index-module-header-actions-0e5cf',
    promptEditor: 'index-module-prompt-editor-d3353',
    promptTextarea: 'index-module-prompt-textarea-ba4fc',
    promptFooter: 'index-module-prompt-footer-b1c7e',
    charCount: 'index-module-char-count-e5ff3',
    expanded: 'index-module-expanded-f5013',
    loadingSection: 'index-module-loading-section-499ce',
    loadingSpinner: 'index-module-loading-spinner-1cea0',
    loadingTips: 'index-module-loading-tips-622c7',
    emptyResult: 'index-module-empty-result-35189',
    emptyIcon: 'index-module-empty-icon-ea8ae',
    emptyFeatures: 'index-module-empty-features-ba1e6',
    featureItem: 'index-module-feature-item-8d682',
    featureIcon: 'index-module-feature-icon-f5e6c',
    fetchProgress: 'index-module-fetch-progress-2a049',
    progressHeader: 'index-module-progress-header-3044d',
    progressBar: 'index-module-progress-bar-cd1e2',
    progressFill: 'index-module-progress-fill-1deaa',
    progressTip: 'index-module-progress-tip-8fbf8',
    btnPrimary: 'index-module-btn-primary-13a50',
    regenerate: 'index-module-regenerate-dd981',
    btnText: 'index-module-btn-text-041d6',
  },
  At = n.memo(
    ({
      visible: e,
      config: t,
      taskType: l,
      onClose: n,
      onGenerate: s,
      isLoading: o,
      selectedEventsCount: r = 0,
      allEventsCount: i = 0,
      dateRange: d,
      onFetchAllEvents: c,
      isAllSelected: m = !1,
    }) => {
      const u = a.useMemo(() => g[l], [l]),
        [h, p] = a.useState(u.defaultPrompt),
        [x, v] = a.useState(!1),
        [b, f] = a.useState(!1),
        [j, w] = a.useState(!1),
        [N, y] = a.useState(0),
        [C, k] = a.useState(null),
        [S, T] = a.useState(!1),
        [$, D] = a.useState('')
      a.useEffect(() => {
        p(u.defaultPrompt)
      }, [u.defaultPrompt])
      const I = a.useCallback(async () => {
        if (c && !j) {
          w(!0), y(0), D('正在初始化数据获取...'), T(!0)
          try {
            let e
            const t = () => {
              y(t => {
                if (t >= 85) return clearTimeout(e), t
                const a = t + 8 * Math.random()
                return (
                  D(
                    a < 30
                      ? '正在连接GitLab API...'
                      : a < 60
                        ? '正在分批获取事件数据...'
                        : '正在处理数据...',
                  ),
                  a
                )
              }),
                (e = setTimeout(t, 400))
            }
            t()
            const a = await c()
            clearTimeout(e),
              y(100),
              D(`数据获取完成！共获取 ${a.length} 条事件`),
              k(a),
              setTimeout(() => {
                w(!1), D('')
              }, 1e3)
          } catch (e) {
            w(!1),
              y(0),
              D('数据获取失败，请稍后重试'),
              setTimeout(() => D(''), 3e3)
          }
        }
      }, [c, j])
      a.useEffect(() => {
        e && m && !S && c && I()
      }, [e, m, S, c, I])
      const M = a.useMemo(
          () => !(o || !h.trim()) && (m && r !== i ? !j && null !== C : r > 0),
          [o, h, m, r, i, j, C],
        ),
        L = a.useCallback(async () => {
          if (null == t ? void 0 : t.result)
            try {
              await navigator.clipboard.writeText(t.result),
                f(!0),
                setTimeout(() => f(!1), 2e3)
            } catch (e) {
              const l = document.createElement('textarea')
              ;(l.value = t.result), document.body.appendChild(l), l.select()
              try {
                document.execCommand('copy'),
                  f(!0),
                  setTimeout(() => f(!1), 2e3)
              } catch (a) {}
              document.body.removeChild(l)
            }
        }, [null == t ? void 0 : t.result]),
        _ = a.useCallback(() => {
          p(u.defaultPrompt)
        }, [u.defaultPrompt])
      return E.jsx(_e, {
        visible: e,
        title: u.title,
        width: 800,
        onClose: n,
        maskClosable: !o,
        children: E.jsxs('div', {
          className: _t.aiPanel,
          children: [
            E.jsxs('div', {
              className: _t.dataOverview,
              children: [
                E.jsx('div', {
                  className: _t.overviewHeader,
                  children: E.jsx('h4', { children: '📊 数据概览' }),
                }),
                E.jsxs('div', {
                  className: _t.overviewContent,
                  children: [
                    E.jsxs('div', {
                      className: _t.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: _t.overviewLabel,
                          children: '已选择事件：',
                        }),
                        E.jsxs('span', {
                          className: _t.overviewValue,
                          children: [m && C ? C.length : r, ' ', '条'],
                        }),
                      ],
                    }),
                    d &&
                      E.jsxs('div', {
                        className: _t.overviewItem,
                        children: [
                          E.jsx('span', {
                            className: _t.overviewLabel,
                            children: '时间范围：',
                          }),
                          E.jsxs('span', {
                            className: _t.overviewValue,
                            children: [d.startDate, ' 至 ', d.endDate],
                          }),
                        ],
                      }),
                    E.jsxs('div', {
                      className: _t.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: _t.overviewLabel,
                          children: '状态：',
                        }),
                        E.jsx('span', {
                          className: `${_t.overviewValue} ${r > 0 ? _t.ready : _t.waiting}`,
                          children: j
                            ? '🔄 获取数据中...'
                            : C
                              ? '✅ 数据已就绪'
                              : r > 0
                                ? '✅ 数据就绪'
                                : '⏳ 等待选择事件',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            j &&
              E.jsxs('div', {
                className: _t.fetchProgress,
                children: [
                  E.jsxs('div', {
                    className: _t.progressHeader,
                    children: [
                      E.jsx('span', { children: $ }),
                      E.jsxs('span', { children: [Math.round(N), '%'] }),
                    ],
                  }),
                  E.jsx('div', {
                    className: _t.progressBar,
                    children: E.jsx('div', {
                      className: _t.progressFill,
                      style: { width: `${N}%` },
                    }),
                  }),
                  E.jsx('p', {
                    className: _t.progressTip,
                    children:
                      '正在分批获取事件数据（每批最多100条），请稍候...',
                  }),
                ],
              }),
            E.jsxs('div', {
              className: _t.promptSection,
              children: [
                E.jsxs('div', {
                  className: _t.sectionHeader,
                  children: [
                    E.jsx('h3', { children: '提示词' }),
                    E.jsxs('div', {
                      className: _t.headerActions,
                      children: [
                        E.jsx('button', {
                          className: _t.btnText,
                          onClick: () => v(!x),
                          children: x ? '收起' : '展开',
                        }),
                        E.jsx('button', {
                          className: _t.btnText,
                          onClick: _,
                          children: '重置',
                        }),
                      ],
                    }),
                  ],
                }),
                E.jsxs('div', {
                  className: `${_t.promptEditor} ${x ? _t.expanded : ''}`,
                  children: [
                    E.jsx('textarea', {
                      className: _t.promptTextarea,
                      value: h,
                      onChange: e => p(e.target.value),
                      placeholder: u.placeholder,
                      rows: x ? 15 : 6,
                      disabled: o,
                    }),
                    E.jsxs('div', {
                      className: _t.promptFooter,
                      children: [
                        E.jsxs('span', {
                          className: _t.charCount,
                          children: [h.length, ' 字符'],
                        }),
                        E.jsx('button', {
                          className: `${_t.btnPrimary} ${(null == t ? void 0 : t.result) ? _t.regenerate : ''}`,
                          onClick: () => {
                            M && s(h)
                          },
                          disabled: !M,
                          children: o
                            ? '生成中...'
                            : (null == t ? void 0 : t.result)
                              ? u.regenerateButtonText
                              : u.generateButtonText,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            o &&
              E.jsxs('div', {
                className: _t.loadingSection,
                children: [
                  E.jsx('div', { className: _t.loadingSpinner }),
                  E.jsx('p', { children: u.loadingText }),
                  E.jsx('div', {
                    className: _t.loadingTips,
                    children: E.jsx('span', {
                      children: '💡 生成时间通常为 10-30 秒',
                    }),
                  }),
                ],
              }),
            (null == t ? void 0 : t.result) &&
              E.jsxs('div', {
                className: _t.resultSection,
                children: [
                  E.jsxs('div', {
                    className: _t.resultHeader,
                    children: [
                      E.jsxs('h3', {
                        className: _t.resultTitle,
                        children: [
                          E.jsx('span', {
                            className: _t.titleIcon,
                            children: '✨',
                          }),
                          '生成结果',
                        ],
                      }),
                      E.jsx('div', {
                        className: _t.resultActions,
                        children: E.jsxs('button', {
                          className: `${_t.actionBtn} ${b ? _t.copied : ''}`,
                          onClick: L,
                          title: '一键复制',
                          disabled: b,
                          children: [
                            E.jsx('span', {
                              className: _t.btnIcon,
                              children: b ? '✅' : '📋',
                            }),
                            b ? '已复制' : '复制',
                          ],
                        }),
                      }),
                    ],
                  }),
                  E.jsx('div', {
                    className: _t.resultContent,
                    children: E.jsx('div', {
                      className: _t.resultText,
                      children: t.result,
                    }),
                  }),
                  E.jsx('div', {
                    className: _t.resultMeta,
                    children: E.jsxs('div', {
                      className: _t.metaLeft,
                      children: [
                        E.jsx('div', {
                          className: _t.metaItem,
                          children: E.jsxs('span', {
                            children: [t.result.split('\n').length, ' 行'],
                          }),
                        }),
                        E.jsx('div', {
                          className: _t.metaItem,
                          children: E.jsxs('span', {
                            children: [t.result.length, ' 字符'],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            E.jsxs('div', {
              className: _t.emptyResult,
              children: [
                E.jsx('div', { className: _t.emptyIcon, children: '🤖' }),
                E.jsx('h3', { children: u.emptyTitle }),
                E.jsx('p', { children: u.emptyDescription }),
                E.jsxs('div', {
                  className: _t.emptyFeatures,
                  children: [
                    E.jsxs('div', {
                      className: _t.featureItem,
                      children: [
                        E.jsx('span', {
                          className: _t.featureIcon,
                          children: '📊',
                        }),
                        E.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: _t.featureItem,
                      children: [
                        E.jsx('span', {
                          className: _t.featureIcon,
                          children: '📝',
                        }),
                        E.jsx('span', { children: '自动生成专业内容' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: _t.featureItem,
                      children: [
                        E.jsx('span', {
                          className: _t.featureIcon,
                          children: '🎯',
                        }),
                        E.jsx('span', { children: '突出重点信息' }),
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
  Pt = {
    'event-detail-modal-overlay':
      'EventDetailModal-module-event-detail-modal-overlay-68f43',
    eventDetailModalOverlay:
      'EventDetailModal-module-event-detail-modal-overlay-68f43',
    'fade-in': 'EventDetailModal-module-fade-in-a2de5',
    fadeIn: 'EventDetailModal-module-fade-in-a2de5',
    'event-detail-modal': 'EventDetailModal-module-event-detail-modal-90b4e',
    eventDetailModal: 'EventDetailModal-module-event-detail-modal-90b4e',
    'modal-slide-in': 'EventDetailModal-module-modal-slide-in-12242',
    modalSlideIn: 'EventDetailModal-module-modal-slide-in-12242',
    'modal-header': 'EventDetailModal-module-modal-header-919fc',
    modalHeader: 'EventDetailModal-module-modal-header-919fc',
    'close-btn': 'EventDetailModal-module-close-btn-f8179',
    closeBtn: 'EventDetailModal-module-close-btn-f8179',
    'modal-content': 'EventDetailModal-module-modal-content-1018a',
    modalContent: 'EventDetailModal-module-modal-content-1018a',
    'detail-section': 'EventDetailModal-module-detail-section-69ad1',
    detailSection: 'EventDetailModal-module-detail-section-69ad1',
    compact: 'EventDetailModal-module-compact-4bd12',
    'detail-grid': 'EventDetailModal-module-detail-grid-c3037',
    detailGrid: 'EventDetailModal-module-detail-grid-c3037',
    'detail-content': 'EventDetailModal-module-detail-content-19b6d',
    detailContent: 'EventDetailModal-module-detail-content-19b6d',
    'project-info': 'EventDetailModal-module-project-info-aece8',
    projectInfo: 'EventDetailModal-module-project-info-aece8',
    'push-info': 'EventDetailModal-module-push-info-a2777',
    pushInfo: 'EventDetailModal-module-push-info-a2777',
    'compact-content': 'EventDetailModal-module-compact-content-36deb',
    compactContent: 'EventDetailModal-module-compact-content-36deb',
    'compact-project': 'EventDetailModal-module-compact-project-06741',
    compactProject: 'EventDetailModal-module-compact-project-06741',
    'compact-author': 'EventDetailModal-module-compact-author-a31e1',
    compactAuthor: 'EventDetailModal-module-compact-author-a31e1',
    'detail-item': 'EventDetailModal-module-detail-item-39d77',
    detailItem: 'EventDetailModal-module-detail-item-39d77',
    label: 'EventDetailModal-module-label-93079',
    value: 'EventDetailModal-module-value-01696',
    'action-badge': 'EventDetailModal-module-action-badge-04ad3',
    actionBadge: 'EventDetailModal-module-action-badge-04ad3',
    'status-badge': 'EventDetailModal-module-status-badge-8ec02',
    statusBadge: 'EventDetailModal-module-status-badge-8ec02',
    'status-opened': 'EventDetailModal-module-status-opened-1d965',
    statusOpened: 'EventDetailModal-module-status-opened-1d965',
    'status-closed': 'EventDetailModal-module-status-closed-ca6b1',
    statusClosed: 'EventDetailModal-module-status-closed-ca6b1',
    'status-merged': 'EventDetailModal-module-status-merged-4bebe',
    statusMerged: 'EventDetailModal-module-status-merged-4bebe',
    'commit-hash': 'EventDetailModal-module-commit-hash-07060',
    commitHash: 'EventDetailModal-module-commit-hash-07060',
    labels: 'EventDetailModal-module-labels-b17ae',
    'label-tag': 'EventDetailModal-module-label-tag-802a8',
    labelTag: 'EventDetailModal-module-label-tag-802a8',
    'author-info': 'EventDetailModal-module-author-info-c5394',
    authorInfo: 'EventDetailModal-module-author-info-c5394',
    'author-avatar': 'EventDetailModal-module-author-avatar-0b86c',
    authorAvatar: 'EventDetailModal-module-author-avatar-0b86c',
    'author-details': 'EventDetailModal-module-author-details-08a3d',
    authorDetails: 'EventDetailModal-module-author-details-08a3d',
    'author-name': 'EventDetailModal-module-author-name-88b82',
    authorName: 'EventDetailModal-module-author-name-88b82',
    'author-username': 'EventDetailModal-module-author-username-ea7c8',
    authorUsername: 'EventDetailModal-module-author-username-ea7c8',
    'author-link': 'EventDetailModal-module-author-link-0fa4f',
    authorLink: 'EventDetailModal-module-author-link-0fa4f',
    'note-info': 'EventDetailModal-module-note-info-94cc4',
    noteInfo: 'EventDetailModal-module-note-info-94cc4',
    'note-body': 'EventDetailModal-module-note-body-c5ecc',
    noteBody: 'EventDetailModal-module-note-body-c5ecc',
    'note-meta': 'EventDetailModal-module-note-meta-1ec92',
    noteMeta: 'EventDetailModal-module-note-meta-1ec92',
    'modal-footer': 'EventDetailModal-module-modal-footer-1fb96',
    modalFooter: 'EventDetailModal-module-modal-footer-1fb96',
    'source-link-btn': 'EventDetailModal-module-source-link-btn-f305b',
    sourceLinkBtn: 'EventDetailModal-module-source-link-btn-f305b',
    'close-modal-btn': 'EventDetailModal-module-close-modal-btn-09d46',
    closeModalBtn: 'EventDetailModal-module-close-modal-btn-09d46',
    app: 'EventDetailModal-module-app-8ed9f',
    dark: 'EventDetailModal-module-dark-974de',
  },
  Ot = ({ event: e, visible: t, onClose: a }) => {
    if (!t || !e) return null
    const l = e =>
        new Date(e).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      n = () => {
        var t, a
        if (!e.project && !e.project_id) return ''
        const l = 'https://www.lejuhub.com'
        if (!e.project) return l
        const n = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${l}/${n}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${l}/${n}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${l}/${n}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${l}/${n}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (a = e.note) ? void 0 : a.noteable_type)
                ? `${l}/${n}/-/merge_requests/${e.note.noteable_iid}`
                : `${l}/${n}`
          default:
            return `${l}/${n}`
        }
      }
    return E.jsx('div', {
      className: Pt.eventDetailModalOverlay,
      onClick: a,
      children: E.jsxs('div', {
        className: Pt.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          E.jsxs('div', {
            className: Pt.modalHeader,
            children: [
              E.jsx('h2', { children: '事件详情' }),
              E.jsx('button', {
                className: Pt.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          E.jsxs('div', {
            className: Pt.modalContent,
            children: [
              E.jsxs('div', {
                className: `${Pt.detailSection} ${Pt.compact}`,
                children: [
                  E.jsx('h3', { children: '基本信息' }),
                  E.jsxs('div', {
                    className: `${Pt.detailGrid} ${Pt.compactGrid}`,
                    children: [
                      E.jsxs('div', {
                        className: Pt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Pt.label,
                            children: 'ID:',
                          }),
                          E.jsx('span', {
                            className: Pt.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: Pt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Pt.label,
                            children: '类型:',
                          }),
                          E.jsx('span', {
                            className: Pt.value,
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
                      E.jsxs('div', {
                        className: Pt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Pt.label,
                            children: '操作:',
                          }),
                          E.jsx('span', {
                            className: `${Pt.value} ${Pt.actionBadge}`,
                            children:
                              ((s = e.action_name),
                              {
                                opened: '开启',
                                closed: '关闭',
                                merged: '合并',
                                'pushed new': '推送新分支',
                                'pushed to': '推送到分支',
                                'commented on': '评论',
                                joined: '加入',
                              }[s] || s),
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: Pt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Pt.label,
                            children: '时间:',
                          }),
                          E.jsx('span', {
                            className: Pt.value,
                            children: l(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        E.jsxs('div', {
                          className: Pt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Pt.label,
                              children: '状态:',
                            }),
                            E.jsx('span', {
                              className: `${Pt.value} ${Pt.statusBadge} ${Pt[`status-${e.state}`]}`,
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
                E.jsxs('div', {
                  className: `${Pt.detailSection} ${Pt.compact}`,
                  children: [
                    E.jsx('h3', { children: '内容' }),
                    E.jsxs('div', {
                      className: `${Pt.detailContent} ${Pt.compactContent}`,
                      children: [
                        e.title &&
                          E.jsxs('div', {
                            className: Pt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Pt.label,
                                children: '标题:',
                              }),
                              E.jsx('span', {
                                className: Pt.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          E.jsxs('div', {
                            className: Pt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Pt.label,
                                children: '目标:',
                              }),
                              E.jsx('span', {
                                className: Pt.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          E.jsxs('div', {
                            className: Pt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Pt.label,
                                children: '标签:',
                              }),
                              E.jsx('div', {
                                className: Pt.labels,
                                children: e.labels.map((e, t) =>
                                  E.jsx(
                                    'span',
                                    { className: Pt.labelTag, children: e },
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
                E.jsxs('div', {
                  className: `${Pt.detailSection} ${Pt.compact}`,
                  children: [
                    E.jsx('h3', { children: '作者' }),
                    E.jsxs('div', {
                      className: `${Pt.authorInfo} ${Pt.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          E.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: Pt.authorAvatar,
                          }),
                        E.jsxs('div', {
                          className: Pt.authorDetails,
                          children: [
                            E.jsx('div', {
                              className: Pt.authorName,
                              children: e.author.name,
                            }),
                            E.jsxs('div', {
                              className: Pt.authorUsername,
                              children: ['@', e.author.username],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              (e.project || e.project_id) &&
                E.jsxs('div', {
                  className: `${Pt.detailSection} ${Pt.compact}`,
                  children: [
                    E.jsx('h3', { children: '项目' }),
                    E.jsx('div', {
                      className: `${Pt.projectInfo} ${Pt.compactProject}`,
                      children: e.project
                        ? E.jsxs(E.Fragment, {
                            children: [
                              E.jsxs('div', {
                                className: Pt.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: Pt.label,
                                    children: '名称:',
                                  }),
                                  E.jsx('span', {
                                    className: Pt.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              E.jsxs('div', {
                                className: Pt.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: Pt.label,
                                    children: '路径:',
                                  }),
                                  E.jsx('span', {
                                    className: Pt.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : E.jsxs('div', {
                            className: Pt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Pt.label,
                                children: '项目ID:',
                              }),
                              E.jsx('span', {
                                className: Pt.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                E.jsxs('div', {
                  className: Pt.detailSection,
                  children: [
                    E.jsx('h3', { children: '推送信息' }),
                    E.jsxs('div', {
                      className: Pt.pushInfo,
                      children: [
                        E.jsxs('div', {
                          className: Pt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Pt.label,
                              children: '分支:',
                            }),
                            E.jsx('span', {
                              className: Pt.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Pt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Pt.label,
                              children: '提交数量:',
                            }),
                            E.jsx('span', {
                              className: Pt.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Pt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Pt.label,
                              children: '提交标题:',
                            }),
                            E.jsx('span', {
                              className: Pt.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Pt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Pt.label,
                              children: '提交哈希:',
                            }),
                            E.jsx('span', {
                              className: `${Pt.value} ${Pt.commitHash}`,
                              children: e.push_data.commit_to,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              e.note &&
                E.jsxs('div', {
                  className: Pt.detailSection,
                  children: [
                    E.jsx('h3', { children: '评论信息' }),
                    E.jsxs('div', {
                      className: Pt.noteInfo,
                      children: [
                        E.jsx('div', {
                          className: Pt.noteBody,
                          children: e.note.body,
                        }),
                        E.jsxs('div', {
                          className: Pt.noteMeta,
                          children: [
                            E.jsxs('span', {
                              children: ['创建时间: ', l(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              E.jsxs('span', {
                                children: ['更新时间: ', l(e.note.updated_at)],
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          E.jsxs('div', {
            className: Pt.modalFooter,
            children: [
              n() &&
                E.jsx('a', {
                  href: n(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: Pt.sourceLinkBtn,
                  children: '打开源页面',
                }),
              E.jsx('button', {
                className: Pt.closeModalBtn,
                onClick: a,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var s
  }
class Rt {
  constructor(e) {
    t(this, 'apiKey'),
      t(this, 'baseUrl'),
      (this.apiKey = e),
      (this.baseUrl = u.DEEPSEEK_BASE_URL)
  }
  async chatRequest(e, t, a) {
    const l = await c(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: t,
        messages: e,
        max_tokens: a,
        temperature: 0.7,
      }),
      timeout: u.REQUEST_TIMEOUT,
    })
    if (!l.ok) throw m.createApiError(l.status, l.statusText, 'DeepSeek API')
    const n = await l.json()
    if (!n.choices || 0 === n.choices.length)
      throw m.createResponseError('空的响应', 'DeepSeek API')
    return n
  }
  async generateChat(e, t = 'deepseek-chat', a = 4e3) {
    return (await this.chatRequest(e, t, a)).choices[0].message.content
  }
  async generateWeeklyReport(e, t, a = 'deepseek-chat', l = 4e3) {
    var n
    const s = [
        { role: 'system', content: t },
        {
          role: 'user',
          content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
        },
      ],
      o = await this.chatRequest(s, a, l)
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
const Ut = {
    app: 'App-module-app-682bf',
    light: 'App-module-light-82872',
    dark: 'App-module-dark-91da8',
    'app-content': 'App-module-app-content-84a23',
    appContent: 'App-module-app-content-84a23',
    collapsed: 'App-module-collapsed-59c20',
    expanded: 'App-module-expanded-f970a',
    'app-header': 'App-module-app-header-c70cf',
    appHeader: 'App-module-app-header-c70cf',
    'app-main': 'App-module-app-main-3b2e7',
    appMain: 'App-module-app-main-3b2e7',
    'error-banner': 'App-module-error-banner-24c43',
    errorBanner: 'App-module-error-banner-24c43',
    'config-form': 'App-module-config-form-0f19a',
    configForm: 'App-module-config-form-0f19a',
    'form-group': 'App-module-form-group-4b011',
    formGroup: 'App-module-form-group-4b011',
    'date-range': 'App-module-date-range-37204',
    dateRange: 'App-module-date-range-37204',
    'action-section': 'App-module-action-section-b3dcb',
    actionSection: 'App-module-action-section-b3dcb',
    'primary-btn': 'App-module-primary-btn-abef3',
    primaryBtn: 'App-module-primary-btn-abef3',
    'secondary-btn': 'App-module-secondary-btn-68c48',
    secondaryBtn: 'App-module-secondary-btn-68c48',
    'preview-area': 'App-module-preview-area-1ba64',
    previewArea: 'App-module-preview-area-1ba64',
    placeholder: 'App-module-placeholder-3cc3b',
    loading: 'App-module-loading-12a3f',
    spinner: 'App-module-spinner-946ca',
    spin: 'App-module-spin-978c4',
    'report-content': 'App-module-report-content-5cdc8',
    reportContent: 'App-module-report-content-5cdc8',
    'report-meta': 'App-module-report-meta-55393',
    reportMeta: 'App-module-report-meta-55393',
    'report-text': 'App-module-report-text-176d7',
    reportText: 'App-module-report-text-176d7',
  },
  Bt = () => {
    const {
        config: e,
        activePanel: t,
        isLoading: l,
        events: n,
        aiGenerationConfig: s,
        setActivePanel: o,
        updateConfig: r,
        setAIGenerationConfig: i,
        setReportData: d,
        setLoading: c,
        setError: m,
      } = _(),
      { actualTheme: u } = (() => {
        const { theme: e, setTheme: t } = _(),
          l = a.useMemo(
            () =>
              'system' === e
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'dark'
                  : 'light'
                : e,
            [e],
          )
        return (
          a.useEffect(() => {
            if (
              (U(document.documentElement, B(e)),
              (document.body.className = document.body.className
                .replace(/\b(light|dark)\b/g, '')
                .trim()),
              document.body.classList.add(l),
              'system' === e)
            ) {
              const e = window.matchMedia('(prefers-color-scheme: dark)'),
                t = () => {
                  U(document.documentElement, B('system')),
                    window.dispatchEvent(new Event('resize'))
                }
              return (
                e.addEventListener('change', t),
                () => {
                  e.removeEventListener('change', t)
                }
              )
            }
          }, [e, l]),
          { theme: e, actualTheme: l, setTheme: t }
        )
      })(),
      {
        loadEvents: h,
        handleFilterChange: p,
        handleSortChange: g,
        handlePaginationChange: x,
      } = P(),
      { selectedEvents: v, toggleEventSelection: b } = (() => {
        const { events: e } = _(),
          [t, l] = a.useState([]),
          n = a.useMemo(() => e.filter(e => t.includes(e.id)), [e, t]),
          s = a.useCallback(e => t.includes(e), [t]),
          o = a.useCallback(e => {
            l(t => (t.includes(e) ? t.filter(t => t !== e) : [...t, e]))
          }, []),
          r = a.useCallback(() => {
            l(e.map(e => e.id))
          }, [e]),
          i = a.useCallback(() => {
            l([])
          }, []),
          d = a.useMemo(
            () => e.length > 0 && t.length === e.length,
            [e.length, t.length],
          ),
          c = a.useMemo(
            () => t.length > 0 && t.length < e.length,
            [t.length, e.length],
          ),
          m = a.useCallback(() => {
            d ? i() : r()
          }, [d, r, i]),
          u = a.useCallback(e => {
            l(e)
          }, []),
          h = t.length,
          p = a.useCallback(() => {
            l([])
          }, [])
        return {
          selectedEventIds: t,
          selectedEvents: n,
          selectedCount: h,
          isEventSelected: s,
          toggleEventSelection: o,
          selectAllEvents: r,
          deselectAllEvents: i,
          isAllSelected: d,
          isIndeterminate: c,
          toggleSelectAll: m,
          selectEvents: u,
          clearSelection: p,
        }
      })(),
      [f, j] = a.useState(null),
      [w, N] = a.useState(!1)
    a.useEffect(() => {
      h()
    }, [h])
    const y = async t => {
      if (0 !== v.length) {
        c(!0), m(null), i(t)
        try {
          const l = ((a = e.deepseekApiKey), new Rt(a)),
            n = v
              .map(e => {
                var t
                const a =
                    (null == (t = e.project) ? void 0 : t.name) || '未知项目',
                  l = e.target_title || e.title || '无标题'
                return `- [${a}] ${e.action_name || '未知操作'}: ${l} (${new Date(e.created_at).toLocaleString('zh-CN')})`
              })
              .join('\n'),
            s = await l.generateWeeklyReport(
              n,
              t.prompt,
              e.model || 'deepseek-chat',
              e.tokenLimit || 4e3,
            ),
            r = {
              events: v,
              generatedReport: s.content,
              tokensUsed: s.tokensUsed || 0,
              generatedAt: new Date().toISOString(),
            }
          d(r), o('ai')
        } catch (l) {
          m(l instanceof Error ? l.message : 'AI 报告生成失败')
        } finally {
          c(!1)
        }
        var a
      } else m('请先选择要生成报告的事件')
    }
    return E.jsx('div', {
      className: `${Ut.app} ${Ut[u]}`,
      'data-theme': u,
      children: E.jsxs('div', {
        className: Ut.container,
        children: [
          E.jsx(Ee, {
            events: n,
            totalCount: _.getState().totalCount,
            loading: l,
            filterConditions: _.getState().filterConditions,
            sortOptions: _.getState().sortOptions,
            paginationOptions: _.getState().paginationOptions,
            selectedEventIds: v.map(e => e.id),
            onFilterChange: p,
            onSortChange: g,
            onPaginationChange: x,
            onEventSelect: b,
            onSelectionChange: () => {},
            onEventDetail: e => {
              j(e), N(!0)
            },
            onOpenSettings: () => o('settings'),
            onOpenAI: () => o('ai'),
          }),
          'settings' === t &&
            E.jsx(Lt, {
              isOpen: !0,
              config: e,
              theme: _.getState().theme,
              onClose: () => o('main'),
              onSave: (e, t) => {
                r(e), _.getState().setTheme(t)
              },
            }),
          'ai' === t &&
            E.jsx(At, {
              visible: !0,
              config: s,
              taskType: 'weekly-report',
              onClose: () => o('main'),
              onGenerate: e => {
                s && y({ ...s, prompt: e })
              },
              isLoading: l,
              selectedEventsCount: v.length,
            }),
          E.jsx(Ot, {
            event: f,
            visible: w,
            onClose: () => {
              N(!1), j(null)
            },
          }),
        ],
      }),
    })
  },
  Gt = document.documentElement
U(Gt, B('system'))
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    U(Gt, B('system'))
  }),
  S.createRoot(document.getElementById('root')).render(
    E.jsx(n.StrictMode, { children: E.jsx(Bt, {}) }),
  )
