var e = Object.defineProperty,
  t = (t, s, a) =>
    ((t, s, a) =>
      s in t
        ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (t[s] = a))(t, 'symbol' != typeof s ? s + '' : s, a)
import { r as s, a, R as r } from './vendor-DtYzeC-x.js'
import {
  D as n,
  a as l,
  b as o,
  c as i,
  s as d,
  r as c,
  E as _,
  A as g,
  d as m,
  e as u,
  f as p,
  C as h,
  U as w,
} from './utils-DTtobJEW.js'
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
  v = {},
  b = s,
  f = Symbol.for('react.element'),
  j = Symbol.for('react.fragment'),
  y = Object.prototype.hasOwnProperty,
  N = b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  C = { key: !0, ref: !0, __self: !0, __source: !0 }
function k(e, t, s) {
  var a,
    r = {},
    n = null,
    l = null
  for (a in (void 0 !== s && (n = '' + s),
  void 0 !== t.key && (n = '' + t.key),
  void 0 !== t.ref && (l = t.ref),
  t))
    y.call(t, a) && !C.hasOwnProperty(a) && (r[a] = t[a])
  if (e && e.defaultProps)
    for (a in (t = e.defaultProps)) void 0 === r[a] && (r[a] = t[a])
  return { $$typeof: f, type: e, key: n, ref: l, props: r, _owner: N.current }
}
;(v.Fragment = j), (v.jsx = k), (v.jsxs = k), (x.exports = v)
var E = x.exports,
  S = {},
  T = a
;(S.createRoot = T.createRoot), (S.hydrateRoot = T.hydrateRoot)
const $ = e => {
    let t
    const s = new Set(),
      a = (e, a) => {
        const r = 'function' == typeof e ? e(t) : e
        if (!Object.is(r, t)) {
          const e = t
          ;(t = (null != a ? a : 'object' != typeof r || null === r)
            ? r
            : Object.assign({}, t, r)),
            s.forEach(s => s(t, e))
        }
      },
      r = () => t,
      n = {
        setState: a,
        getState: r,
        getInitialState: () => l,
        subscribe: e => (s.add(e), () => s.delete(e)),
      },
      l = (t = e(a, r, n))
    return n
  },
  M = e => e
function I(e, t) {
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
        r = null != (t = s.getItem(e)) ? t : null
      return r instanceof Promise ? r.then(a) : a(r)
    },
    setItem: (e, t) => s.setItem(e, JSON.stringify(t, void 0)),
    removeItem: e => s.removeItem(e),
  }
}
const D = e => t => {
    try {
      const s = e(t)
      return s instanceof Promise
        ? s
        : {
            then: e => D(e)(s),
            catch(e) {
              return this
            },
          }
    } catch (s) {
      return {
        then(e) {
          return this
        },
        catch: e => D(e)(s),
      }
    }
  },
  A = {
    config: i,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: 'system',
    activePanel: 'main',
    filterConditions: o,
    sortOptions: l,
    paginationOptions: n,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
  },
  L = (e => {
    const t = (e => (e ? $(e) : $))(e),
      s = e =>
        (function (e, t = M) {
          const s = r.useSyncExternalStore(
            e.subscribe,
            () => t(e.getState()),
            () => t(e.getInitialState()),
          )
          return r.useDebugValue(s), s
        })(t, e)
    return Object.assign(s, t), s
  })(
    ((e, t) => (s, a, r) => {
      let n = {
          storage: I(() => localStorage),
          partialize: e => e,
          version: 0,
          merge: (e, t) => ({ ...t, ...e }),
          ...t,
        },
        l = !1
      const o = new Set(),
        i = new Set()
      let d = n.storage
      if (!d)
        return e(
          (...e) => {
            console.warn(
              `[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`,
            ),
              s(...e)
          },
          a,
          r,
        )
      const c = () => {
          const e = n.partialize({ ...a() })
          return d.setItem(n.name, { state: e, version: n.version })
        },
        _ = r.setState
      r.setState = (e, t) => {
        _(e, t), c()
      }
      const g = e(
        (...e) => {
          s(...e), c()
        },
        a,
        r,
      )
      let m
      r.getInitialState = () => g
      const u = () => {
        var e, t
        if (!d) return
        ;(l = !1),
          o.forEach(e => {
            var t
            return e(null != (t = a()) ? t : g)
          })
        const r =
          (null == (t = n.onRehydrateStorage)
            ? void 0
            : t.call(n, null != (e = a()) ? e : g)) || void 0
        return D(d.getItem.bind(d))(n.name)
          .then(e => {
            if (e) {
              if ('number' != typeof e.version || e.version === n.version)
                return [!1, e.state]
              if (n.migrate) {
                const t = n.migrate(e.state, e.version)
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
            const [r, l] = e
            if (((m = n.merge(l, null != (t = a()) ? t : g)), s(m, !0), r))
              return c()
          })
          .then(() => {
            null == r || r(m, void 0), (m = a()), (l = !0), i.forEach(e => e(m))
          })
          .catch(e => {
            null == r || r(void 0, e)
          })
      }
      return (
        (r.persist = {
          setOptions: e => {
            ;(n = { ...n, ...e }), e.storage && (d = e.storage)
          },
          clearStorage: () => {
            null == d || d.removeItem(n.name)
          },
          getOptions: () => n,
          rehydrate: () => u(),
          hasHydrated: () => l,
          onHydrate: e => (
            o.add(e),
            () => {
              o.delete(e)
            }
          ),
          onFinishHydration: e => (
            i.add(e),
            () => {
              i.delete(e)
            }
          ),
        }),
        n.skipHydration || u(),
        m || g
      )
    })(
      (e, t) => ({
        ...A,
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
          e(A), d.clearConfig()
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
          filterConditions: e.filterConditions,
          sortOptions: e.sortOptions,
        }),
      },
    ),
  )
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
      r = await c(s, a)
    if (!r.ok) {
      let e
      try {
        e = await r.text()
      } catch {
        e = r.statusText
      }
      console.error(`GitLab API Error [${r.status}]:`, e)
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
        }[r.status] ||
        e ||
        r.statusText
      throw _.createApiError(r.status, t, 'GitLab API')
    }
    return r.json()
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
      r = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
      },
      n = await c(a, r)
    if (!n.ok) {
      const e = await n.text()
      throw _.createApiError(n.status, e || n.statusText, 'GitLab API')
    }
    const l = await n.json()
    let o = 0,
      i = ''
    if (n.headers instanceof Headers)
      (i =
        n.headers.get('x-total') ||
        n.headers.get('X-Total') ||
        n.headers.get('x-total-count') ||
        n.headers.get('X-Total-Count') ||
        ''),
        (o = parseInt(i || '0', 10))
    else {
      if ('string' == typeof n.headers) {
        const e = n.headers.split('\n')
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
        const e = n.headers
        i =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      o = parseInt(i || '0', 10)
    }
    return !o && l.length > 0 && (o = l.length), { projects: l, total: o }
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
      r = `${this.baseUrl}${a}`,
      n = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      l = await c(r, n)
    if (!l.ok) {
      const e = await l.text()
      throw _.createApiError(l.status, e || l.statusText, 'GitLab API')
    }
    const o = await l.json()
    let i = 0,
      d = ''
    if (l.headers instanceof Headers)
      (d =
        l.headers.get('x-total') ||
        l.headers.get('X-Total') ||
        l.headers.get('x-total-count') ||
        l.headers.get('X-Total-Count') ||
        ''),
        (i = parseInt(d || '0', 10))
    else {
      if ('string' == typeof l.headers) {
        const e = l.headers.split('\n')
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
        const e = l.headers
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
    return !i && o.length > 0 && (i = o.length), { events: o, total: i }
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
      r = a ? `/projects/${e}/events?${a}` : `/projects/${e}/events`,
      n = `${this.baseUrl}${r}`,
      l = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: g.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await c(n, l)
    if (!o.ok) {
      const e = await o.text()
      throw _.createApiError(o.status, e || o.statusText, 'GitLab API')
    }
    const i = await o.json()
    let d = 0,
      m = ''
    if (o.headers instanceof Headers)
      (m =
        o.headers.get('x-total') ||
        o.headers.get('X-Total') ||
        o.headers.get('x-total-count') ||
        o.headers.get('X-Total-Count') ||
        ''),
        (d = parseInt(m || '0', 10))
    else {
      if ('string' == typeof o.headers) {
        const e = o.headers.split('\n')
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
        const e = o.headers
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
        isHeadersInstance: o.headers instanceof Headers,
        headersType: typeof o.headers,
        allHeaders:
          o.headers instanceof Headers
            ? Object.fromEntries(o.headers.entries())
            : 'string' == typeof o.headers
              ? o.headers.split('\n').slice(0, 10).join('; ')
              : o.headers,
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
const O = () => {
    const {
        config: e,
        filterConditions: t,
        sortOptions: a,
        paginationOptions: r,
        setEvents: n,
        setTotalCount: l,
        setLoading: o,
        setError: i,
        validateConfig: d,
        getTimeRange: c,
      } = L(),
      { createRequest: _, isRequestCancelled: g } = (() => {
        const e = s.useRef(null),
          t = s.useCallback(() => {
            e.current && e.current.abort()
            const t = new AbortController()
            return (e.current = t), t
          }, []),
          a = s.useCallback(() => {
            e.current && (e.current.abort(), (e.current = null))
          }, []),
          r = s.useCallback(e => e.signal.aborted, []),
          n = s.useCallback(t => {
            e.current === t && (e.current = null)
          }, []),
          l = s.useCallback(
            e => e instanceof Error && 'AbortError' === e.name,
            [],
          )
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
            isRequestCancelled: r,
            cleanupRequest: n,
            isAbortError: l,
          }
        )
      })(),
      u = s.useCallback(async () => {
        var s, u
        if (!d()) return void i(m.INVALID_FILTER_OR_CONFIG)
        const p = _()
        o(!0), i(null)
        try {
          const o = ((h = e.gitlabUrl), (w = e.gitlabToken), new P(h, w))
          await o.init()
          const { startDate: i, endDate: d } = c(),
            _ =
              (null == (s = t.targetType) ? void 0 : s.length) > 0
                ? t.targetType
                : void 0,
            m =
              (null == (u = t.action) ? void 0 : u.length) > 0
                ? t.action
                : void 0,
            x = a.order || 'desc',
            v = await o.getCurrentUser(),
            b = {
              after: i.toISOString(),
              before: d.toISOString(),
              target_type: _,
              action: m,
              page: r.page,
              per_page: r.pageSize,
              sort: x,
              signal: p.signal,
            },
            { events: f, total: j } = await o.getUserEventsWithTotal(v.id, b)
          if (g(p)) return
          n(f), l(j)
        } catch (x) {
          if (g(p)) return
          console.error('Failed to load events:', x),
            i(x instanceof Error ? x.message : '加载事件数据失败')
        } finally {
          o(!1)
        }
        var h, w
      }, [
        e.gitlabUrl,
        e.gitlabToken,
        t,
        a.order,
        r.page,
        r.pageSize,
        d,
        c,
        n,
        l,
        o,
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
            L.getState()
          t(e), s({ page: 1 }), setTimeout(u, 0)
        },
        [u],
      ),
      w = s.useCallback(
        e => {
          const { setSortOptions: t, setPaginationOptions: s } = L.getState()
          t(e), s({ page: 1 }), setTimeout(u, 0)
        },
        [u],
      ),
      x = s.useCallback(
        e => {
          const { setPaginationOptions: t } = L.getState()
          t(e), setTimeout(u, 0)
        },
        [u],
      )
    return {
      loadEvents: u,
      reloadEvents: p,
      handleFilterChange: h,
      handleSortChange: w,
      handlePaginationChange: x,
    }
  },
  R = 'gwrs-index-module__filter-section-content__y5rEz',
  U = 'gwrs-index-module__filter-group__5B49Z',
  B = 'gwrs-index-module__filter-label__kgsrz',
  G = 'gwrs-index-module__filter-options__83wOv',
  F = 'gwrs-index-module__filter-option__SG0B9',
  q = 'gwrs-index-module__active__IQgMz',
  z = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  H = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  V = [
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
    const s = (s, a) => {
        t({ ...e, [s]: a })
      },
      a = [
        { key: 'targetType', label: '目标类型', options: H },
        { key: 'action', label: '操作类型', options: V },
      ]
    return E.jsxs('div', {
      className: R,
      children: [
        E.jsxs('div', {
          className: U,
          children: [
            E.jsx('label', { className: B, children: '时间范围' }),
            E.jsx('div', {
              className: G,
              children: z.map(({ value: t, label: a }) =>
                E.jsx(
                  'button',
                  {
                    className: `${F} ${e.timeRange === t ? q : ''}`,
                    onClick: () => s('timeRange', t),
                    children: a,
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
        a.map(({ key: t, label: a, options: r }) =>
          E.jsxs(
            'div',
            {
              className: U,
              children: [
                E.jsx('label', { className: B, children: a }),
                E.jsxs('div', {
                  className: G,
                  children: [
                    E.jsx('button', {
                      className: `${F} ${0 === e[t].length ? q : ''}`,
                      onClick: () => s(t, []),
                      children: '全部',
                    }),
                    r.map(({ value: a, label: r }) =>
                      E.jsx(
                        'button',
                        {
                          className: `${F} ${Array.isArray(e[t]) && e[t].includes(a) ? q : ''}`,
                          onClick: () =>
                            ((t, a, r) => {
                              const n = e[t],
                                l = r ? [...n, a] : n.filter(e => e !== a)
                              s(t, l)
                            })(t, a, !e[t].includes(a)),
                          children: r,
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
  K = {
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
  Q = r.memo(
    ({
      current: e,
      pageSize: t,
      total: s,
      onChange: a,
      showSizeChanger: n = !0,
      pageSizeOptions: l = [20, 50, 100, 200],
      onShowSizeChange: o,
    }) => {
      const i = Math.ceil(s / t),
        d = (e - 1) * t + 1,
        c = Math.min(e * t, s),
        _ = t => {
          t >= 1 && t <= i && t !== e && a(t)
        }
      return 0 === s
        ? E.jsx('div', {
            className: K.pagination,
            children: E.jsx('div', {
              className: K.info,
              children: E.jsx('span', { children: '暂无数据' }),
            }),
          })
        : E.jsxs('div', {
            className: K.pagination,
            children: [
              E.jsx('div', {
                className: K.paginationInfo,
                children: E.jsxs('span', {
                  children: ['显示 ', d, '-', c, ' 条，共 ', s, ' 条'],
                }),
              }),
              E.jsxs('div', {
                className: K.paginationControls,
                children: [
                  E.jsx('button', {
                    className: `${K.paginationBtn} ${1 === e ? K.disabled : ''}`,
                    onClick: () => _(e - 1),
                    disabled: 1 === e,
                    children: E.jsx('span', { children: '‹' }),
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
                    E.jsx(
                      r.Fragment,
                      {
                        children:
                          'number' == typeof t
                            ? E.jsx('button', {
                                className: `${K.paginationBtn} ${e === t ? K.active : ''}`,
                                onClick: () => _(t),
                                children: t,
                              })
                            : E.jsx('span', {
                                className: K.paginationEllipsis,
                                children: t,
                              }),
                      },
                      s,
                    ),
                  ),
                  E.jsx('button', {
                    className: `${K.paginationBtn} ${e === i ? K.disabled : ''}`,
                    onClick: () => _(e + 1),
                    disabled: e === i,
                    children: E.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              n &&
                E.jsxs('div', {
                  className: K.paginationSizeChanger,
                  children: [
                    E.jsx('span', { children: '每页' }),
                    E.jsx('select', {
                      value: t,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (o && o(1, t))
                        var t
                      },
                      className: K.paginationSelect,
                      children: l.map(e =>
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
  Y = 'gwrs-index-module__selectionManager__BVUt4',
  Z = 'gwrs-index-module__selectionInfo__xzOCm',
  J = 'gwrs-index-module__selectionCount__C1Iwo',
  W = 'gwrs-index-module__selectionActions__Apagf',
  ee = 'gwrs-index-module__actionGroup__E-C1y',
  te = 'gwrs-index-module__groupLabel__x-jJZ',
  se = 'gwrs-index-module__actionBtn__421Xy',
  ae = 'gwrs-index-module__selectAllBtn__bMAjm',
  re = 'gwrs-index-module__clearBtn__atjK2',
  ne = r.memo(
    ({
      currentPageEvents: e,
      selectedEventIds: t,
      totalCount: a,
      onSelectionChange: r,
      loading: n = !1,
    }) => {
      const l = s.useRef(!1),
        o = s.useRef(!1),
        i = s.useMemo(() => e.map(e => e.id), [e]),
        d = s.useMemo(() => t.includes(-1), [t]),
        c = s.useMemo(() => {
          if (d) return { count: a, text: `已全选 ${a} 条` }
          const e = t.filter(e => -1 !== e).length
          return { count: e, text: `已选中 ${e} 条` }
        }, [d, a, t])
      s.useEffect(() => {
        if (i.length > 0 && !d && !n) {
          const e = t.filter(e => -1 !== e)
          if (!o.current && 0 === e.length && !l.current) {
            console.log('SelectionManager: 初始化自动选择当前页')
            const e = [...i]
            r(e, !1), (o.current = !0)
          }
        }
      }, [i, t, d, n, r]),
        s.useEffect(() => {
          t.length > 0 && (l.current = !1)
        }, [t])
      const _ = s.useCallback(() => {
          console.log('SelectionManager: 点击全选按钮'),
            (l.current = !1),
            r([-1], !0)
        }, [r]),
        g = s.useCallback(() => {
          console.log('SelectionManager: 点击清空按钮'),
            (l.current = !0),
            r([], !1)
        }, [r])
      return E.jsxs('div', {
        className: Y,
        children: [
          E.jsx('div', {
            className: Z,
            children: E.jsx('span', { className: J, children: c.text }),
          }),
          E.jsx('div', {
            className: W,
            children: E.jsxs('div', {
              className: ee,
              children: [
                E.jsx('span', { className: te, children: '全部:' }),
                E.jsx('button', {
                  className: `${se} ${ae}`,
                  onClick: _,
                  disabled: n || d,
                  title: '选择所有数据',
                  children: '全选',
                }),
                E.jsx('button', {
                  className: `${se} ${re}`,
                  onClick: g,
                  disabled: n || 0 === c.count,
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
  le = {
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
  oe = r.memo(
    ({
      events: e,
      totalCount: t,
      loading: a,
      sortOptions: r,
      onSortChange: n,
      paginationOptions: l,
      onPaginationChange: o,
      selectedEventIds: i,
      isFullSelection: d,
      onSelectionChange: c,
      onEventSelect: _,
      onEventDetail: g,
    }) => {
      const u = s.useCallback(
          e => {
            if ('created_at' !== e) return
            const t = r.field === e && 'desc' === r.order ? 'asc' : 'desc'
            n({ field: e, order: t })
          },
          [r.field, r.order, n],
        ),
        p = s.useCallback(
          e => (r.field !== e ? '' : 'desc' === r.order ? '↓' : '↑'),
          [r.field, r.order],
        ),
        h = s.useCallback(
          e => {
            _(e)
          },
          [_],
        ),
        w = s.useCallback(e => {
          const t = new Date(e),
            s = new Date(),
            a =
              new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime() -
              new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
            r = Math.floor(a / 864e5),
            n = t.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          return 0 === r
            ? `今天 ${n}`
            : 1 === r
              ? `昨天 ${n}`
              : r > 1 && r <= 7
                ? `${r}天前`
                : t.toLocaleDateString('zh-CN', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
        }, []),
        x = s.useCallback(e => {
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
              r = {
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
              n = (s && r[s]) || (t && r[t])
            return n
              ? { ...n, title: a }
              : { icon: '📋', actionType: s || t || '未知操作', title: x(e) }
          },
          [x],
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
      return E.jsxs('div', {
        className: le.eventsList,
        children: [
          E.jsx(ne, {
            currentPageEvents: e,
            selectedEventIds: i,
            totalCount: t,
            onSelectionChange: c,
            loading: a,
          }),
          E.jsxs('div', {
            className: le.eventsListHeader,
            children: [
              E.jsx('div', {
                className: `${le.headerCell} ${le.checkboxCell}`,
                children: E.jsx('span', { children: '选择' }),
              }),
              E.jsx('div', {
                className: `${le.headerCell} ${le.contentCell}`,
                children: E.jsx('span', { children: '标题和内容' }),
              }),
              E.jsx('div', {
                className: `${le.headerCell} ${le.actionCell}`,
                children: E.jsx('span', { children: '操作' }),
              }),
              E.jsxs('div', {
                className: `${le.headerCell} ${le.timeCell}`,
                onClick: () => u('created_at'),
                children: [
                  E.jsx('span', { children: '时间' }),
                  E.jsx('span', {
                    className: le.sortIcon,
                    children: p('created_at'),
                  }),
                ],
              }),
              E.jsx('div', {
                className: `${le.headerCell} ${le.detailCell}`,
                children: '详情',
              }),
            ],
          }),
          E.jsx('div', {
            className: le.eventsListBody,
            children: a
              ? E.jsxs('div', {
                  className: le.eventsListLoading,
                  children: [
                    E.jsx('div', { className: le.loadingSpinner }),
                    E.jsx('p', { children: '正在加载事件数据...' }),
                  ],
                })
              : 0 === e.length
                ? E.jsxs('div', {
                    className: le.emptyState,
                    children: [
                      E.jsx('div', { className: le.emptyIcon, children: '📄' }),
                      E.jsx('p', { children: '暂无事件数据' }),
                      E.jsx('span', { children: m.INVALID_FILTER_OR_CONFIG }),
                    ],
                  })
                : e.map(e => {
                    const t = d || i.includes(e.id),
                      { icon: s, title: a, actionType: r } = v(e)
                    return E.jsxs(
                      'div',
                      {
                        className: `${le.eventRow} ${t ? le.selected : ''}`,
                        children: [
                          E.jsx('div', {
                            className: `${le.cell} ${le.checkboxCell}`,
                            children: E.jsxs('label', {
                              className: le.checkboxContainer,
                              children: [
                                E.jsx('input', {
                                  type: 'checkbox',
                                  checked: t,
                                  onChange: () => h(e.id),
                                  title: t ? '取消选择' : '选择此事件',
                                }),
                                E.jsx('span', { className: le.checkmark }),
                              ],
                            }),
                          }),
                          E.jsxs('div', {
                            className: `${le.cell} ${le.contentCell}`,
                            children: [
                              E.jsx('div', {
                                className: le.eventIcon,
                                children: s,
                              }),
                              E.jsxs('div', {
                                className: le.eventContent,
                                children: [
                                  E.jsx('div', {
                                    className: le.eventTitle,
                                    children: a,
                                  }),
                                  E.jsx('div', {
                                    className: le.eventDescription,
                                    children: b(e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          E.jsx('div', {
                            className: `${le.cell} ${le.actionCell}`,
                            children: E.jsx('span', {
                              className: le.actionTag,
                              children: r,
                            }),
                          }),
                          E.jsx('div', {
                            className: `${le.cell} ${le.timeCell}`,
                            children: E.jsx('span', {
                              className: le.eventTime,
                              children: w(e.created_at),
                            }),
                          }),
                          E.jsx('div', {
                            className: `${le.cell} ${le.detailCell}`,
                            children: E.jsx('button', {
                              className: le.detailBtn,
                              onClick: () => g(e),
                              title: '查看详情',
                              children: E.jsx('span', {
                                className: le.detailIcon,
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
            className: le.eventsListFooter,
            children: E.jsx(Q, {
              current: l.page,
              pageSize: l.pageSize,
              total: t,
              onChange: e => o({ ...l, page: e }),
              showSizeChanger: !0,
              onShowSizeChange: (e, s) => o({ page: e, pageSize: s, total: t }),
            }),
          }),
        ],
      })
    },
  ),
  ie = {
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
  de = ({ currentVersion: e }) => {
    const [t, r] = s.useState(null),
      [n, l] = s.useState(!1),
      [o, i] = s.useState(!1),
      [d, _] = s.useState(!1),
      [g, m] = s.useState(null),
      [u, p] = s.useState(null),
      [h, w] = s.useState(!1),
      [x, v] = s.useState(new Set())
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
          r = Math.max(s.length, a.length)
        for (let n = 0; n < r; n++) {
          const e = s[n] || 0,
            t = a[n] || 0
          if (t > e) return !0
          if (t < e) return !1
        }
        return !1
      }, []),
      f = s.useCallback(
        async (s = !0) => {
          if (!n)
            if (h && t && o && s)
              (!s && x.has(t.version)) ||
                (_(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              l(!0), p(null)
              try {
                const t = new AbortController(),
                  a = setTimeout(() => t.abort(), 1e4),
                  n = Math.floor(Date.now() / 36e5),
                  l = 'undefined' != typeof GM_xmlhttpRequest,
                  o =
                    !1 && !l
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  d = await c(`${o}?t=${n}`, {
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
                r(u), m(new Date()), w(!0)
                const p = b(e, u.version)
                i(p),
                  p
                    ? s || !x.has(u.version)
                      ? (_(!0),
                        console.log(`发现新版本 ${u.version}，建议及时更新！`))
                      : console.log(`发现新版本 ${u.version}，但已被忽略`)
                    : console.log('当前已是最新版本')
              } catch (a) {
                console.error('检查版本更新失败:', a)
                const e = a instanceof Error ? a.message : '检查更新失败'
                p(e), console.error(`检查更新失败: ${e}`)
              } finally {
                l(!1)
              }
            }
        },
        [n, b, e, x, h, t, o],
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
      y = s.useCallback(() => {
        v(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      N = s.useCallback(() => {
        if ((_(!1), t)) {
          const s = new Set(x)
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
      }, [t, x]),
      C = s.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      k = s.useCallback(
        () =>
          n
            ? '检查中...'
            : u
              ? '检查失败'
              : o
                ? '有更新'
                : h && !o
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [n, u, o, h],
      ),
      S = s.useCallback(() => (n ? '🔄' : u ? '⚠️' : o ? '🔴' : ''), [n, u, o])
    s.useEffect(() => {}, [y])
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
      E.jsxs(E.Fragment, {
        children: [
          E.jsxs('button', {
            className: `${ie.actionBtn} ${ie.versionBtn} ${n ? ie.checking : ''} ${o ? ie.hasUpdate : ''}`,
            onClick: () => f(!0),
            disabled: n,
            title: g
              ? `上次检查: ${C(g)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              E.jsx('span', { className: ie.icon, children: S() }),
              E.jsx('span', { className: ie.text, children: k() }),
            ],
          }),
          d &&
            o &&
            t &&
            a.createPortal(
              E.jsx('div', {
                className: ie.notificationOverlay,
                children: E.jsxs('div', {
                  className: ie.notification,
                  children: [
                    E.jsxs('div', {
                      className: ie.notificationHeader,
                      children: [
                        E.jsx('h3', { children: '发现新版本' }),
                        E.jsx('button', {
                          className: ie.closeBtn,
                          onClick: N,
                          children: '×',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ie.notificationBody,
                      children: [
                        E.jsxs('div', {
                          className: ie.versionInfo,
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
                            className: ie.releaseNotes,
                            children: [
                              E.jsx('h4', { children: '更新说明:' }),
                              E.jsx('div', {
                                className: ie.notesContent,
                                children: t.releaseNotes,
                              }),
                            ],
                          }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ie.notificationFooter,
                      children: [
                        E.jsx('button', {
                          className: ie.laterBtn,
                          onClick: N,
                          children: '稍后更新',
                        }),
                        E.jsx('button', {
                          className: ie.updateBtn,
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
  ce = 'gwrs-index-module__main-panel__82FLm',
  _e = 'gwrs-index-module__panel-header__kyx4p',
  ge = 'gwrs-index-module__header-right__7F8Bo',
  me = 'gwrs-index-module__divider__QXSgp',
  ue = 'gwrs-index-module__action-buttons__xGRHl',
  pe = 'gwrs-index-module__action-btn__x4IAP',
  he = 'gwrs-index-module__btn-icon__ZaYHk',
  we = 'gwrs-index-module__btn-label__tM2Rz',
  xe = 'gwrs-index-module__ai-btn__5kAV3',
  ve = 'gwrs-index-module__config-incomplete__bLEHk',
  be = 'gwrs-index-module__config-badge__0znDE',
  fe = 'gwrs-index-module__filter-section__gMBIz',
  je = 'gwrs-index-module__events-section__gJwdk',
  ye = ({
    events: e,
    totalCount: t,
    loading: s,
    filterConditions: a,
    sortOptions: n,
    paginationOptions: l,
    selectedEventIds: o,
    onFilterChange: i,
    onSortChange: d,
    onPaginationChange: c,
    onEventSelect: _,
    onSelectionChange: g,
    onEventDetail: m,
    onOpenSettings: h,
    onOpenAI: w,
    isAllEventsSelected: x = !1,
  }) => {
    const { config: v } = L(),
      b = r.useMemo(() => {
        const e = [
            'gitlabUrl',
            'gitlabToken',
            'deepseekApiKey',
            'defaultPrompt',
          ],
          t = e.filter(e => {
            const t = v[e]
            return 'string' == typeof t ? '' !== t.trim() : !!t
          }).length
        return {
          isValid: t === e.length,
          completedCount: t,
          totalCount: e.length,
        }
      }, [v])
    return E.jsxs('div', {
      className: ce,
      children: [
        E.jsx('div', {
          className: _e,
          children: E.jsxs('div', {
            className: ge,
            children: [
              E.jsx(de, { currentVersion: u }),
              E.jsx('div', { className: me }),
              E.jsxs('div', {
                className: ue,
                children: [
                  E.jsxs('button', {
                    className: `${pe} ${b.isValid ? '' : ve}`,
                    onClick: h,
                    title: b.isValid
                      ? '设置'
                      : `配置未完成 (${b.completedCount}/${b.totalCount})`,
                    children: [
                      E.jsx('span', {
                        className: he,
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
                        className: we,
                        children: [
                          '设置',
                          !b.isValid &&
                            E.jsxs('span', {
                              className: be,
                              children: [b.completedCount, '/', b.totalCount],
                            }),
                        ],
                      }),
                    ],
                  }),
                  E.jsxs('button', {
                    className: `${pe} ${xe}`,
                    onClick: w,
                    title: p['weekly-report'].title,
                    children: [
                      E.jsx('span', {
                        className: he,
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
                        className: we,
                        children: p['weekly-report'].buttonText,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        E.jsx('div', {
          className: fe,
          children: E.jsx(X, { filterConditions: a, onFilterChange: i }),
        }),
        E.jsx('div', {
          className: je,
          children: E.jsx(oe, {
            events: e,
            totalCount: t,
            loading: s,
            sortOptions: n,
            onSortChange: d,
            paginationOptions: l,
            onPaginationChange: c,
            selectedEventIds: o,
            onSelectionChange: g,
            isFullSelection: x,
            onEventSelect: _,
            onEventDetail: m,
          }),
        }),
      ],
    })
  },
  Ne = 'gwrs-index-module__modal-mask__XYxyO',
  Ce = 'gwrs-index-module__modal-wrapper__bVZip',
  ke = 'gwrs-index-module__modal__QQS3u',
  Ee = 'gwrs-index-module__modal-header__GdUjX',
  Se = 'gwrs-index-module__modal-title__cafB-',
  Te = 'gwrs-index-module__modal-close__ZuUgf',
  $e = 'gwrs-index-module__modal-body__j5X3U',
  Me = 'gwrs-index-module__modal-footer__3q-wn',
  Ie = ({
    visible: e,
    title: t,
    width: r = 520,
    maxHeight: n = window.innerHeight - 180,
    children: l,
    footer: o,
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
    const c = E.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: Ne,
      onClick: e => {
        e.target === e.currentTarget && d && i()
      },
      children: E.jsx('div', {
        className: Ce,
        children: E.jsxs('div', {
          className: ke,
          style: { width: r, maxHeight: n },
          children: [
            E.jsxs('div', {
              className: Ee,
              children: [
                E.jsx('div', { className: Se, children: t }),
                E.jsx('button', {
                  className: Te,
                  onClick: i,
                  children: E.jsx('span', { children: '×' }),
                }),
              ],
            }),
            E.jsx('div', { className: $e, children: l }),
            o && E.jsx('div', { className: Me, children: o }),
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
  De = 'gwrs-index-module__config-status__0q8ZM',
  Ae = 'gwrs-index-module__clickable__pZ86X',
  Le = 'gwrs-index-module__compact__-QN-s',
  Pe = 'gwrs-index-module__compact-content__wSrCk',
  Oe = 'gwrs-index-module__status-icon__7jFiQ',
  Re = 'gwrs-index-module__compact-text__7OyGG',
  Ue = 'gwrs-index-module__expand-button__NusWg',
  Be = 'gwrs-index-module__expanded-content__Hih4c',
  Ge = 'gwrs-index-module__config-items__quryV',
  Fe = 'gwrs-index-module__compact-item__UCAOc',
  qe = 'gwrs-index-module__item-label__24FVq',
  ze = 'gwrs-index-module__item-icon__4yYRW',
  He = 'gwrs-index-module__valid__Xyroo',
  Ve = 'gwrs-index-module__invalid__Fn-hL',
  Xe = 'gwrs-index-module__status-header__AORn-',
  Ke = 'gwrs-index-module__status-title__6hAD6',
  Qe = 'gwrs-index-module__status-text__llRfw',
  Ye = 'gwrs-index-module__progress-container__ofPka',
  Ze = 'gwrs-index-module__progress-bar__CFedX',
  Je = 'gwrs-index-module__progress-fill__w-23-',
  We = 'gwrs-index-module__complete__L0-gl',
  et = 'gwrs-index-module__progress-text__uoYK9',
  tt = 'gwrs-index-module__config-item__m6pYF',
  st = 'gwrs-index-module__item-info__BhIr5',
  at = 'gwrs-index-module__item-status__3ppNU',
  rt = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  nt = rt.length,
  lt = ({
    config: e,
    className: t = '',
    showDetails: a = !0,
    onClick: n,
    compact: l = !1,
  }) => {
    const o = s.useMemo(() => {
        const t = rt.map(t => {
            const s = e[t.key],
              a = 'string' == typeof s ? '' !== s.trim() : !!s
            return { ...t, isValid: a, value: a ? '已配置' : '未配置' }
          }),
          s = t.filter(e => e.isValid).length
        return {
          isValid: s === nt,
          itemsStatus: t,
          completedCount: s,
          totalCount: nt,
          progress: (s / nt) * 100,
        }
      }, [e]),
      [i, d] = r.useState(!o.isValid)
    return l && o.isValid
      ? E.jsxs('div', {
          className: `${De} ${Le} ${t} ${n ? Ae : ''}`,
          onClick: n,
          children: [
            E.jsxs('div', {
              className: Pe,
              children: [
                E.jsx('span', { className: Oe, children: '✅' }),
                E.jsx('span', { className: Re, children: '配置已完成' }),
                a &&
                  E.jsx('button', {
                    className: Ue,
                    onClick: e => {
                      e.stopPropagation(), d(!i)
                    },
                    children: i ? '收起' : '详情',
                  }),
              ],
            }),
            a &&
              i &&
              E.jsx('div', {
                className: Be,
                children: E.jsx('div', {
                  className: Ge,
                  children: o.itemsStatus.map(e =>
                    E.jsxs(
                      'div',
                      {
                        className: `${tt} ${Fe} ${e.isValid ? He : Ve}`,
                        children: [
                          E.jsx('span', { className: qe, children: e.label }),
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
          className: `${De} ${t} ${n ? Ae : ''}`,
          onClick: n,
          children: [
            E.jsxs('div', {
              className: Xe,
              children: [
                E.jsxs('div', {
                  className: Ke,
                  children: [
                    E.jsx('span', {
                      className: Oe,
                      children: o.isValid ? '✅' : '⚠️',
                    }),
                    E.jsxs('span', {
                      className: Qe,
                      children: [
                        '配置状态 (',
                        o.completedCount,
                        '/',
                        o.totalCount,
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
                        className: `${Je} ${o.isValid ? We : ''}`,
                        style: { width: `${o.progress}%` },
                      }),
                    }),
                    E.jsxs('span', {
                      className: et,
                      children: [Math.round(o.progress), '%'],
                    }),
                  ],
                }),
              ],
            }),
            a &&
              E.jsx('div', {
                className: Ge,
                children: o.itemsStatus.map(e =>
                  E.jsxs(
                    'div',
                    {
                      className: `${tt} ${e.isValid ? He : Ve}`,
                      children: [
                        E.jsxs('div', {
                          className: st,
                          children: [
                            E.jsx('span', { className: qe, children: e.label }),
                            E.jsx('span', { className: at, children: e.value }),
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
  ot = 'gwrs-index-module__settings-panel__UCg3H',
  it = 'gwrs-index-module__settings-tabs__vPH-t',
  dt = 'gwrs-index-module__tab-button__FG9Nc',
  ct = 'gwrs-index-module__tab-icon__rBe-o',
  _t = 'gwrs-index-module__active__bsBC1',
  gt = 'gwrs-index-module__settings-content__TqQPH',
  mt = 'gwrs-index-module__tab-panel__Q2QUI',
  ut = 'gwrs-index-module__form-group__zKwiA',
  pt = 'gwrs-index-module__form-label__pwe7O',
  ht = 'gwrs-index-module__required__2vuyW',
  wt = 'gwrs-index-module__form-input__jGbRP',
  xt = 'gwrs-index-module__form-select__jbXdq',
  vt = 'gwrs-index-module__form-textarea__fAVMw',
  bt = 'gwrs-index-module__form-hint__F0dFQ',
  ft = 'gwrs-index-module__version-info__y0NZv',
  jt = 'gwrs-index-module__version-text__bx0HU',
  yt = 'gwrs-index-module__settings-footer__qA44X',
  Nt = 'gwrs-index-module__footer-right__bslDg',
  Ct = 'gwrs-index-module__btn-primary__ZzzFI',
  kt = 'gwrs-index-module__switch-container__5xk1J',
  Et = 'gwrs-index-module__switch-input__V-8fl',
  St = 'gwrs-index-module__switch-label__xrOeQ',
  Tt = 'gwrs-index-module__switch-slider__dG-6J',
  $t = 'gwrs-index-module__btn-secondary__cRCpD',
  Mt = ({ isOpen: e, onClose: t, config: a, onSave: r, theme: n }) => {
    const [l, o] = s.useState(a),
      [i, d] = s.useState(n),
      [c, _] = s.useState('gitlab')
    s.useEffect(() => {
      o(a)
    }, [a]),
      s.useEffect(() => {
        d(n)
      }, [n]),
      s.useEffect(() => {
        e && (o(a), d(n))
      }, [e, a, n])
    const g = (e, t) => {
      o(s => ({ ...s, [e]: t }))
    }
    return E.jsx(Ie, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: E.jsxs('div', {
        className: yt,
        children: [
          E.jsx('button', {
            className: $t,
            onClick: () => {
              o(a), d(n)
            },
            children: '重置',
          }),
          E.jsxs('div', {
            className: Nt,
            children: [
              E.jsx('button', { className: $t, onClick: t, children: '取消' }),
              E.jsx('button', {
                className: Ct,
                onClick: () => {
                  r(l, i), t()
                },
                disabled: !(
                  l.gitlabUrl.trim() &&
                  l.gitlabToken.trim() &&
                  l.deepseekApiKey.trim() &&
                  l.defaultPrompt.trim()
                ),
                children: '保存',
              }),
            ],
          }),
        ],
      }),
      children: E.jsxs('div', {
        className: ot,
        children: [
          E.jsx(lt, { config: l, showDetails: !0, compact: !0 }),
          E.jsxs('div', {
            className: it,
            children: [
              E.jsxs('button', {
                className: `${dt} ${'gitlab' === c ? _t : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  E.jsx('span', { className: ct, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              E.jsxs('button', {
                className: `${dt} ${'deepseek' === c ? _t : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  E.jsx('span', { className: ct, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              E.jsxs('button', {
                className: `${dt} ${'appearance' === c ? _t : ''}`,
                onClick: () => _('appearance'),
                children: [
                  E.jsx('span', { className: ct, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          E.jsxs('div', {
            className: gt,
            children: [
              'gitlab' === c &&
                E.jsxs('div', {
                  className: mt,
                  children: [
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsxs('label', {
                          className: pt,
                          children: [
                            'GitLab 项目地址 ',
                            E.jsx('span', { className: ht, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.gitlabUrl,
                          value: l.gitlabUrl,
                          onChange: e => g('gitlabUrl', e.target.value),
                        }),
                        E.jsx('div', {
                          className: bt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsxs('label', {
                          className: pt,
                          children: [
                            '个人访问令牌 ',
                            E.jsx('span', { className: ht, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.gitlabToken,
                          value: l.gitlabToken,
                          onChange: e => g('gitlabToken', e.target.value),
                        }),
                        E.jsx('div', {
                          className: bt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                E.jsxs('div', {
                  className: mt,
                  children: [
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsxs('label', {
                          className: pt,
                          children: [
                            'DeepSeek API Key ',
                            E.jsx('span', { className: ht, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.deepseekApiKey,
                          value: l.deepseekApiKey,
                          onChange: e => g('deepseekApiKey', e.target.value),
                        }),
                        E.jsx('div', {
                          className: bt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsx('label', {
                          className: pt,
                          children: '使用的模型',
                        }),
                        E.jsxs('select', {
                          className: xt,
                          value: l.model,
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
                      className: ut,
                      children: [
                        E.jsx('label', {
                          className: pt,
                          children: 'Token 数量限制',
                        }),
                        E.jsx('input', {
                          type: 'number',
                          className: wt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: l.tokenLimit,
                          onChange: e =>
                            g('tokenLimit', parseInt(e.target.value)),
                        }),
                        E.jsx('div', {
                          className: bt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsxs('label', {
                          className: pt,
                          children: [
                            '默认提示词 ',
                            E.jsx('span', { className: ht, children: '*' }),
                          ],
                        }),
                        E.jsx('textarea', {
                          className: vt,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: l.defaultPrompt,
                          onChange: e => g('defaultPrompt', e.target.value),
                        }),
                        E.jsx('div', {
                          className: bt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                E.jsxs('div', {
                  className: mt,
                  children: [
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsx('label', { className: pt, children: '主题模式' }),
                        E.jsxs('select', {
                          className: xt,
                          value: i,
                          onChange: e => d(e.target.value),
                          children: [
                            E.jsx('option', {
                              value: 'system',
                              children: '🔄 跟随系统',
                            }),
                            E.jsx('option', {
                              value: 'light',
                              children: '☀️ 浅色模式',
                            }),
                            E.jsx('option', {
                              value: 'dark',
                              children: '🌙 深色模式',
                            }),
                          ],
                        }),
                        E.jsx('div', {
                          className: bt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsx('label', {
                          className: pt,
                          children: '自动检查更新',
                        }),
                        E.jsxs('div', {
                          className: kt,
                          children: [
                            E.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: Et,
                              checked: l.autoCheckUpdate ?? !0,
                              onChange: e =>
                                g('autoCheckUpdate', e.target.checked),
                            }),
                            E.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: St,
                              children: E.jsx('span', { className: Tt }),
                            }),
                          ],
                        }),
                        E.jsx('div', {
                          className: bt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: ut,
                      children: [
                        E.jsx('label', {
                          className: pt,
                          children: '检查更新间隔',
                        }),
                        E.jsxs('select', {
                          className: xt,
                          value: l.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            g('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(l.autoCheckUpdate ?? 1),
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
                          className: bt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          E.jsx('div', {
            className: ft,
            children: E.jsxs('span', { className: jt, children: ['v', u] }),
          }),
        ],
      }),
    })
  },
  It = {
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
  Dt = r.memo(
    ({
      visible: e,
      config: t,
      taskType: a,
      onClose: r,
      onGenerate: n,
      isLoading: l,
      selectedEventsCount: o = 0,
      allEventsCount: i = 0,
      dateRange: d,
      onFetchAllEvents: c,
      isAllSelected: _ = !1,
    }) => {
      const g = s.useMemo(() => p[a], [a]),
        [m, u] = s.useState(g.defaultPrompt),
        [h, w] = s.useState(!1),
        [x, v] = s.useState(!1),
        [b, f] = s.useState(!1),
        [j, y] = s.useState(0),
        [N, C] = s.useState(null),
        [k, S] = s.useState(!1),
        [T, $] = s.useState('')
      s.useEffect(() => {
        u(g.defaultPrompt)
      }, [g.defaultPrompt])
      const M = s.useCallback(async () => {
        if (c && !b) {
          f(!0), y(0), $('正在初始化数据获取...'), S(!0)
          try {
            let e
            const t = () => {
              y(t => {
                if (t >= 85) return clearTimeout(e), t
                const s = t + 8 * Math.random()
                return (
                  $(
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
              y(100),
              $(`数据获取完成！共获取 ${s.length} 条事件`),
              C(s),
              setTimeout(() => {
                f(!1), $('')
              }, 1e3)
          } catch (e) {
            console.error('Failed to fetch all events:', e),
              f(!1),
              y(0),
              $('数据获取失败，请稍后重试'),
              setTimeout(() => $(''), 3e3)
          }
        }
      }, [c, b])
      s.useEffect(() => {
        e && _ && !k && c && M()
      }, [e, _, k, c, M])
      const I = s.useMemo(
          () => !(l || !m.trim()) && (_ && o !== i ? !b && null !== N : o > 0),
          [l, m, _, o, i, b, N],
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
      return E.jsx(Ie, {
        visible: e,
        title: g.title,
        width: 800,
        onClose: r,
        maskClosable: !l,
        children: E.jsxs('div', {
          className: It.aiPanel,
          children: [
            E.jsxs('div', {
              className: It.dataOverview,
              children: [
                E.jsx('div', {
                  className: It.overviewHeader,
                  children: E.jsx('h4', { children: '📊 数据概览' }),
                }),
                E.jsxs('div', {
                  className: It.overviewContent,
                  children: [
                    E.jsxs('div', {
                      className: It.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: It.overviewLabel,
                          children: '已选择事件：',
                        }),
                        E.jsxs('span', {
                          className: It.overviewValue,
                          children: [_ && N ? N.length : o, ' ', '条'],
                        }),
                      ],
                    }),
                    d &&
                      E.jsxs('div', {
                        className: It.overviewItem,
                        children: [
                          E.jsx('span', {
                            className: It.overviewLabel,
                            children: '时间范围：',
                          }),
                          E.jsxs('span', {
                            className: It.overviewValue,
                            children: [d.startDate, ' 至 ', d.endDate],
                          }),
                        ],
                      }),
                    E.jsxs('div', {
                      className: It.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: It.overviewLabel,
                          children: '状态：',
                        }),
                        E.jsx('span', {
                          className: `${It.overviewValue} ${o > 0 ? It.ready : It.waiting}`,
                          children: b
                            ? '🔄 获取数据中...'
                            : N
                              ? '✅ 数据已就绪'
                              : o > 0
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
              E.jsxs('div', {
                className: It.fetchProgress,
                children: [
                  E.jsxs('div', {
                    className: It.progressHeader,
                    children: [
                      E.jsx('span', { children: T }),
                      E.jsxs('span', { children: [Math.round(j), '%'] }),
                    ],
                  }),
                  E.jsx('div', {
                    className: It.progressBar,
                    children: E.jsx('div', {
                      className: It.progressFill,
                      style: { width: `${j}%` },
                    }),
                  }),
                  E.jsx('p', {
                    className: It.progressTip,
                    children:
                      '正在分批获取事件数据（每批最多100条），请稍候...',
                  }),
                ],
              }),
            E.jsxs('div', {
              className: It.promptSection,
              children: [
                E.jsxs('div', {
                  className: It.sectionHeader,
                  children: [
                    E.jsx('h3', { children: '提示词' }),
                    E.jsxs('div', {
                      className: It.headerActions,
                      children: [
                        E.jsx('button', {
                          className: It.btnText,
                          onClick: () => w(!h),
                          children: h ? '收起' : '展开',
                        }),
                        E.jsx('button', {
                          className: It.btnText,
                          onClick: A,
                          children: '重置',
                        }),
                      ],
                    }),
                  ],
                }),
                E.jsxs('div', {
                  className: `${It.promptEditor} ${h ? It.expanded : ''}`,
                  children: [
                    E.jsx('textarea', {
                      className: It.promptTextarea,
                      value: m,
                      onChange: e => u(e.target.value),
                      placeholder: g.placeholder,
                      rows: h ? 15 : 6,
                      disabled: l,
                    }),
                    E.jsxs('div', {
                      className: It.promptFooter,
                      children: [
                        E.jsxs('span', {
                          className: It.charCount,
                          children: [m.length, ' 字符'],
                        }),
                        E.jsx('button', {
                          className: `${It.btnPrimary} ${(null == t ? void 0 : t.result) ? It.regenerate : ''}`,
                          onClick: () => {
                            I && n(m)
                          },
                          disabled: l || !m.trim() || 0 === o,
                          children: l
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
            l &&
              E.jsxs('div', {
                className: It.loadingSection,
                children: [
                  E.jsx('div', { className: It.loadingSpinner }),
                  E.jsx('p', { children: g.loadingText }),
                  E.jsx('div', {
                    className: It.loadingTips,
                    children: E.jsx('span', {
                      children: '💡 生成时间通常为 10-30 秒',
                    }),
                  }),
                ],
              }),
            (null == t ? void 0 : t.result) &&
              E.jsxs('div', {
                className: It.resultSection,
                children: [
                  E.jsxs('div', {
                    className: It.resultHeader,
                    children: [
                      E.jsxs('h3', {
                        className: It.resultTitle,
                        children: [
                          E.jsx('span', {
                            className: It.titleIcon,
                            children: '✨',
                          }),
                          '生成结果',
                        ],
                      }),
                      E.jsx('div', {
                        className: It.resultActions,
                        children: E.jsxs('button', {
                          className: `${It.actionBtn} ${x ? It.copied : ''}`,
                          onClick: D,
                          title: '一键复制',
                          disabled: x,
                          children: [
                            E.jsx('span', {
                              className: It.btnIcon,
                              children: x ? '✅' : '📋',
                            }),
                            x ? '已复制' : '复制',
                          ],
                        }),
                      }),
                    ],
                  }),
                  E.jsx('div', {
                    className: It.resultContent,
                    children: E.jsx('div', {
                      className: It.resultText,
                      children: t.result,
                    }),
                  }),
                  E.jsx('div', {
                    className: It.resultMeta,
                    children: E.jsxs('div', {
                      className: It.metaLeft,
                      children: [
                        E.jsx('div', {
                          className: It.metaItem,
                          children: E.jsxs('span', {
                            children: [t.result.split('\n').length, ' 行'],
                          }),
                        }),
                        E.jsx('div', {
                          className: It.metaItem,
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
              className: It.emptyResult,
              children: [
                E.jsx('div', { className: It.emptyIcon, children: '🤖' }),
                E.jsx('h3', { children: g.emptyTitle }),
                E.jsx('p', { children: g.emptyDescription }),
                E.jsxs('div', {
                  className: It.emptyFeatures,
                  children: [
                    E.jsxs('div', {
                      className: It.featureItem,
                      children: [
                        E.jsx('span', {
                          className: It.featureIcon,
                          children: '📊',
                        }),
                        E.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: It.featureItem,
                      children: [
                        E.jsx('span', {
                          className: It.featureIcon,
                          children: '📝',
                        }),
                        E.jsx('span', { children: '自动生成专业内容' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: It.featureItem,
                      children: [
                        E.jsx('span', {
                          className: It.featureIcon,
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
  At = {
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
  Lt = ({ event: e, visible: t, onClose: s }) => {
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
      r = () => {
        var t, s
        if (!e.project && !e.project_id) return ''
        const a = 'https://www.lejuhub.com'
        if (!e.project) return a
        const r = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${a}/${r}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${a}/${r}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${a}/${r}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${a}/${r}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (s = e.note) ? void 0 : s.noteable_type)
                ? `${a}/${r}/-/merge_requests/${e.note.noteable_iid}`
                : `${a}/${r}`
          default:
            return `${a}/${r}`
        }
      }
    return E.jsx('div', {
      className: At.eventDetailModalOverlay,
      onClick: s,
      children: E.jsxs('div', {
        className: At.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          E.jsxs('div', {
            className: At.modalHeader,
            children: [
              E.jsx('h2', { children: '事件详情' }),
              E.jsx('button', {
                className: At.closeBtn,
                onClick: s,
                children: '×',
              }),
            ],
          }),
          E.jsxs('div', {
            className: At.modalContent,
            children: [
              E.jsxs('div', {
                className: `${At.detailSection} ${At.compact}`,
                children: [
                  E.jsx('h3', { children: '基本信息' }),
                  E.jsxs('div', {
                    className: `${At.detailGrid} ${At.compactGrid}`,
                    children: [
                      E.jsxs('div', {
                        className: At.detailItem,
                        children: [
                          E.jsx('span', {
                            className: At.label,
                            children: 'ID:',
                          }),
                          E.jsx('span', {
                            className: At.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: At.detailItem,
                        children: [
                          E.jsx('span', {
                            className: At.label,
                            children: '类型:',
                          }),
                          E.jsx('span', {
                            className: At.value,
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
                        className: At.detailItem,
                        children: [
                          E.jsx('span', {
                            className: At.label,
                            children: '操作:',
                          }),
                          E.jsx('span', {
                            className: `${At.value} ${At.actionBadge}`,
                            children:
                              ((n = e.action_name),
                              {
                                opened: '开启',
                                closed: '关闭',
                                merged: '合并',
                                'pushed new': '推送新分支',
                                'pushed to': '推送到分支',
                                'commented on': '评论',
                                joined: '加入',
                              }[n] || n),
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: At.detailItem,
                        children: [
                          E.jsx('span', {
                            className: At.label,
                            children: '时间:',
                          }),
                          E.jsx('span', {
                            className: At.value,
                            children: a(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        E.jsxs('div', {
                          className: At.detailItem,
                          children: [
                            E.jsx('span', {
                              className: At.label,
                              children: '状态:',
                            }),
                            E.jsx('span', {
                              className: `${At.value} ${At.statusBadge} ${At[`status-${e.state}`]}`,
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
                  className: `${At.detailSection} ${At.compact}`,
                  children: [
                    E.jsx('h3', { children: '内容' }),
                    E.jsxs('div', {
                      className: `${At.detailContent} ${At.compactContent}`,
                      children: [
                        e.title &&
                          E.jsxs('div', {
                            className: At.detailItem,
                            children: [
                              E.jsx('span', {
                                className: At.label,
                                children: '标题:',
                              }),
                              E.jsx('span', {
                                className: At.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          E.jsxs('div', {
                            className: At.detailItem,
                            children: [
                              E.jsx('span', {
                                className: At.label,
                                children: '目标:',
                              }),
                              E.jsx('span', {
                                className: At.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          E.jsxs('div', {
                            className: At.detailItem,
                            children: [
                              E.jsx('span', {
                                className: At.label,
                                children: '标签:',
                              }),
                              E.jsx('div', {
                                className: At.labels,
                                children: e.labels.map((e, t) =>
                                  E.jsx(
                                    'span',
                                    { className: At.labelTag, children: e },
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
                  className: `${At.detailSection} ${At.compact}`,
                  children: [
                    E.jsx('h3', { children: '作者' }),
                    E.jsxs('div', {
                      className: `${At.authorInfo} ${At.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          E.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: At.authorAvatar,
                          }),
                        E.jsxs('div', {
                          className: At.authorDetails,
                          children: [
                            E.jsx('div', {
                              className: At.authorName,
                              children: e.author.name,
                            }),
                            E.jsxs('div', {
                              className: At.authorUsername,
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
                  className: `${At.detailSection} ${At.compact}`,
                  children: [
                    E.jsx('h3', { children: '项目' }),
                    E.jsx('div', {
                      className: `${At.projectInfo} ${At.compactProject}`,
                      children: e.project
                        ? E.jsxs(E.Fragment, {
                            children: [
                              E.jsxs('div', {
                                className: At.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: At.label,
                                    children: '名称:',
                                  }),
                                  E.jsx('span', {
                                    className: At.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              E.jsxs('div', {
                                className: At.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: At.label,
                                    children: '路径:',
                                  }),
                                  E.jsx('span', {
                                    className: At.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : E.jsxs('div', {
                            className: At.detailItem,
                            children: [
                              E.jsx('span', {
                                className: At.label,
                                children: '项目ID:',
                              }),
                              E.jsx('span', {
                                className: At.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                E.jsxs('div', {
                  className: At.detailSection,
                  children: [
                    E.jsx('h3', { children: '推送信息' }),
                    E.jsxs('div', {
                      className: At.pushInfo,
                      children: [
                        E.jsxs('div', {
                          className: At.detailItem,
                          children: [
                            E.jsx('span', {
                              className: At.label,
                              children: '分支:',
                            }),
                            E.jsx('span', {
                              className: At.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: At.detailItem,
                          children: [
                            E.jsx('span', {
                              className: At.label,
                              children: '提交数量:',
                            }),
                            E.jsx('span', {
                              className: At.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: At.detailItem,
                          children: [
                            E.jsx('span', {
                              className: At.label,
                              children: '提交标题:',
                            }),
                            E.jsx('span', {
                              className: At.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: At.detailItem,
                          children: [
                            E.jsx('span', {
                              className: At.label,
                              children: '提交哈希:',
                            }),
                            E.jsx('span', {
                              className: `${At.value} ${At.commitHash}`,
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
                  className: At.detailSection,
                  children: [
                    E.jsx('h3', { children: '评论信息' }),
                    E.jsxs('div', {
                      className: At.noteInfo,
                      children: [
                        E.jsx('div', {
                          className: At.noteBody,
                          children: e.note.body,
                        }),
                        E.jsxs('div', {
                          className: At.noteMeta,
                          children: [
                            E.jsxs('span', {
                              children: ['创建时间: ', a(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              E.jsxs('span', {
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
          E.jsxs('div', {
            className: At.modalFooter,
            children: [
              r() &&
                E.jsx('a', {
                  href: r(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: At.sourceLinkBtn,
                  children: '打开源页面',
                }),
              E.jsx('button', {
                className: At.closeModalBtn,
                onClick: s,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var n
  }
class Pt {
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
    const r = await a.json()
    if (!r.choices || 0 === r.choices.length)
      throw _.createResponseError('空的响应', 'DeepSeek API')
    return r
  }
  async generateChat(e, t = 'deepseek-chat', s = 4e3) {
    return (await this.chatRequest(e, t, s)).choices[0].message.content
  }
  async generateWeeklyReport(e, t, s = 'deepseek-chat', a = 4e3) {
    var r
    const n = [
        { role: 'system', content: t },
        {
          role: 'user',
          content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
        },
      ],
      l = await this.chatRequest(n, s, a)
    return {
      content: l.choices[0].message.content,
      tokensUsed: (null == (r = l.usage) ? void 0 : r.total_tokens) || 0,
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
const Ot = {
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
  Rt = ({ isUserscript: e = !1 }) => {
    const { isIframe: t, closePanel: a } = (() => {
        const { setTheme: e } = L(),
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
        config: r,
        activePanel: n,
        isLoading: l,
        events: o,
        aiGenerationConfig: i,
        setActivePanel: d,
        updateConfig: c,
        setAIGenerationConfig: _,
        setReportData: g,
        setLoading: m,
        setError: u,
      } = L(),
      { actualTheme: p } = (() => {
        const { theme: e, setTheme: t } = L(),
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
        loadEvents: h,
        handleFilterChange: w,
        handleSortChange: x,
        handlePaginationChange: v,
      } = O(),
      {
        selectedEvents: b,
        toggleEventSelection: f,
        clearSelection: j,
      } = (() => {
        const { events: e } = L(),
          [t, a] = s.useState([]),
          r = s.useMemo(() => e.filter(e => t.includes(e.id)), [e, t]),
          n = s.useCallback(e => t.includes(e), [t]),
          l = s.useCallback(e => {
            a(t => (t.includes(e) ? t.filter(t => t !== e) : [...t, e]))
          }, []),
          o = s.useCallback(() => {
            a(e.map(e => e.id))
          }, [e]),
          i = s.useCallback(() => {
            a([])
          }, []),
          d = s.useMemo(
            () => e.length > 0 && t.length === e.length,
            [e.length, t.length],
          ),
          c = s.useMemo(
            () => t.length > 0 && t.length < e.length,
            [t.length, e.length],
          ),
          _ = s.useCallback(() => {
            d ? i() : o()
          }, [d, o, i]),
          g = s.useCallback(e => {
            a(e)
          }, []),
          m = t.length,
          u = s.useCallback(() => {
            a([])
          }, [])
        return {
          selectedEventIds: t,
          selectedEvents: r,
          selectedCount: m,
          isEventSelected: n,
          toggleEventSelection: l,
          selectAllEvents: o,
          deselectAllEvents: i,
          isAllSelected: d,
          isIndeterminate: c,
          toggleSelectAll: _,
          selectEvents: g,
          clearSelection: u,
        }
      })(),
      [y, N] = s.useState(null),
      [C, k] = s.useState(!1)
    s.useEffect(() => {
      const e = new URLSearchParams(window.location.search),
        t = e.get('mode'),
        s = e.get('theme')
      'iframe' !== t ||
        ('light' !== s && 'dark' !== s) ||
        L.getState().setTheme(s)
    }, []),
      s.useEffect(() => {
        h()
      }, [h]),
      s.useEffect(() => {
        j()
      }, [j])
    const S = async e => {
      if (0 !== b.length) {
        m(!0), u(null), _(e)
        try {
          const s = ((t = r.deepseekApiKey), new Pt(t)),
            a = b
              .map(e => {
                var t
                const s =
                    (null == (t = e.project) ? void 0 : t.name) || '未知项目',
                  a = e.target_title || e.title || '无标题'
                return `- [${s}] ${e.action_name || '未知操作'}: ${a} (${new Date(e.created_at).toLocaleString('zh-CN')})`
              })
              .join('\n'),
            n = await s.generateWeeklyReport(
              a,
              e.prompt,
              r.model || 'deepseek-chat',
              r.tokenLimit || 4e3,
            ),
            l = {
              events: b,
              generatedReport: n.content,
              tokensUsed: n.tokensUsed || 0,
              generatedAt: new Date().toISOString(),
            }
          g(l), d('ai')
        } catch (s) {
          console.error('AI 报告生成失败:', s),
            u(s instanceof Error ? s.message : 'AI 报告生成失败')
        } finally {
          m(!1)
        }
        var t
      } else u('请先选择要生成报告的事件')
    }
    return E.jsx('div', {
      className: `${Ot.app} ${Ot[p]} ${t ? Ot.iframeMode : ''}`,
      'data-theme': p,
      children: E.jsxs('div', {
        className: Ot.container,
        children: [
          'main' === n &&
            E.jsx(ye, {
              events: o,
              totalCount: L.getState().totalCount,
              loading: l,
              filterConditions: L.getState().filterConditions,
              sortOptions: L.getState().sortOptions,
              paginationOptions: L.getState().paginationOptions,
              selectedEventIds: b.map(e => e.id),
              onFilterChange: w,
              onSortChange: x,
              onPaginationChange: v,
              onEventSelect: f,
              onSelectionChange: () => {},
              onEventDetail: e => {
                N(e), k(!0)
              },
              onOpenSettings: () => d('settings'),
              onOpenAI: () => d('ai'),
            }),
          'settings' === n &&
            E.jsx(Mt, {
              isOpen: !0,
              config: r,
              theme: L.getState().theme,
              onClose: () => d('main'),
              onSave: (e, t) => {
                c(e), L.getState().setTheme(t)
              },
            }),
          t &&
            E.jsx('button', {
              className: Ot.iframeCloseButton,
              onClick: a,
              title: '关闭面板',
              children: '×',
            }),
          'ai' === n &&
            E.jsx(Dt, {
              visible: !0,
              config: i,
              taskType: 'weekly-report',
              onClose: () => d('main'),
              onGenerate: e => {
                i && S({ ...i, prompt: e })
              },
              isLoading: l,
              selectedEventsCount: b.length,
            }),
          E.jsx(Lt, {
            event: y,
            visible: C,
            onClose: () => {
              k(!1), N(null)
            },
          }),
        ],
      }),
    })
  },
  Ut = {
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
  Bt = {
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
function Gt(e, t) {
  Object.entries(t).forEach(([t, s]) => {
    e.style.setProperty(t, s)
  })
}
function Ft(e) {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Bt : Ut
}
const qt = document.getElementById('root')
qt.classList.contains(w.SCOPE_CLASS) || qt.classList.add(w.SCOPE_CLASS),
  Gt(qt, Ft())
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    Gt(qt, Ft())
  }),
  S.createRoot(qt).render(E.jsx(r.StrictMode, { children: E.jsx(Rt, {}) }))
