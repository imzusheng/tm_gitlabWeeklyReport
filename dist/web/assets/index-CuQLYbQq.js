const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-CULIwh4S.js', 'assets/utils-CSGFSRgp.js']),
) => i.map(i => d[i])
var e = Object.defineProperty,
  t = (t, a, n) =>
    ((t, a, n) =>
      a in t
        ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[a] = n))(t, 'symbol' != typeof a ? a + '' : a, n)
import { r as a, a as n, R as s } from './vendor-DtYzeC-x.js'
import {
  D as l,
  a as i,
  b as o,
  c as r,
  s as d,
  d as c,
  r as _,
  E as u,
  A as m,
  e as h,
  f as p,
  C as x,
} from './utils-CSGFSRgp.js'
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
var g = { exports: {} },
  v = {},
  j = a,
  f = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  N = Object.prototype.hasOwnProperty,
  C = j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  k = { key: !0, ref: !0, __self: !0, __source: !0 }
function y(e, t, a) {
  var n,
    s = {},
    l = null,
    i = null
  for (n in (void 0 !== a && (l = '' + a),
  void 0 !== t.key && (l = '' + t.key),
  void 0 !== t.ref && (i = t.ref),
  t))
    N.call(t, n) && !k.hasOwnProperty(n) && (s[n] = t[n])
  if (e && e.defaultProps)
    for (n in (t = e.defaultProps)) void 0 === s[n] && (s[n] = t[n])
  return { $$typeof: f, type: e, key: l, ref: i, props: s, _owner: C.current }
}
;(v.Fragment = b), (v.jsx = y), (v.jsxs = y), (g.exports = v)
var E = g.exports,
  w = {},
  S = n
;(w.createRoot = S.createRoot), (w.hydrateRoot = S.hydrateRoot)
const T = {},
  I = function (e, t, a) {
    let n = Promise.resolve()
    if (t && t.length > 0) {
      document.getElementsByTagName('link')
      const e = document.querySelector('meta[property=csp-nonce]'),
        a =
          (null == e ? void 0 : e.nonce) ||
          (null == e ? void 0 : e.getAttribute('nonce'))
      n = Promise.allSettled(
        t.map(e => {
          if (
            (e = (function (e) {
              return '/' + e
            })(e)) in T
          )
            return
          T[e] = !0
          const t = e.endsWith('.css'),
            n = t ? '[rel="stylesheet"]' : ''
          if (document.querySelector(`link[href="${e}"]${n}`)) return
          const s = document.createElement('link')
          return (
            (s.rel = t ? 'stylesheet' : 'modulepreload'),
            t || (s.as = 'script'),
            (s.crossOrigin = ''),
            (s.href = e),
            a && s.setAttribute('nonce', a),
            document.head.appendChild(s),
            t
              ? new Promise((t, a) => {
                  s.addEventListener('load', t),
                    s.addEventListener('error', () =>
                      a(new Error(`Unable to preload CSS for ${e}`)),
                    )
                })
              : void 0
          )
        }),
      )
    }
    function s(e) {
      const t = new Event('vite:preloadError', { cancelable: !0 })
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e
    }
    return n.then(t => {
      for (const e of t || []) 'rejected' === e.status && s(e.reason)
      return e().catch(s)
    })
  },
  M = {
    config: r,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: r.theme,
    activePanel: 'main',
    appMode: 'events',
    filterConditions: o,
    sortOptions: i,
    paginationOptions: l,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
    projects: [],
    selectedProjectId: null,
    commits: [],
  }
function $() {
  const [e, t] = a.useState(M)
  a.useEffect(() => {
    ;(async () => {
      try {
        const e = await d.loadConfig(),
          a = e ? { ...r, ...e } : r
        t(e => ({ ...e, config: a, theme: a.theme || r.theme }))
      } catch (e) {
        console.error('Failed to load saved config:', e),
          t(e => ({ ...e, config: r, theme: r.theme }))
      }
    })()
  }, [])
  const n = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, ...e }
        try {
          d.saveConfig(a)
        } catch (n) {
          console.error('Failed to save config:', n)
        }
        return { ...t, config: a }
      })
    }, []),
    s = a.useCallback(e => {
      t(t => ({ ...t, activePanel: e }))
    }, []),
    l = a.useCallback(e => {
      t(t => ({ ...t, appMode: e }))
    }, []),
    i = a.useCallback(e => {
      t(t => ({ ...t, projects: e }))
    }, []),
    o = a.useCallback(e => {
      t(t => ({ ...t, selectedProjectId: e }))
    }, []),
    c = a.useCallback(e => {
      t(t => ({ ...t, commits: e }))
    }, []),
    _ = a.useCallback(e => {
      t(t => ({
        ...t,
        filterConditions: e,
        paginationOptions: { ...t.paginationOptions, page: 1 },
      }))
    }, []),
    u = a.useCallback(e => {
      t(t => ({ ...t, sortOptions: e }))
    }, []),
    m = a.useCallback(e => {
      t(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
    }, []),
    h = a.useCallback(e => {
      t(t => ({ ...t, events: e }))
    }, []),
    p = a.useCallback(e => {
      t(t => ({
        ...t,
        totalCount: e,
        paginationOptions: { ...t.paginationOptions, total: e },
      }))
    }, []),
    x = a.useCallback(e => {
      t(t => ({ ...t, aiGenerationConfig: e }))
    }, []),
    g = a.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    v = a.useCallback(e => {
      t(t => ({ ...t, error: e }))
    }, []),
    j = a.useCallback(e => {
      t(t => ({ ...t, reportData: e }))
    }, []),
    f = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, theme: e }
        try {
          d.saveConfig(a)
        } catch (n) {
          console.error('Failed to save theme:', n)
        }
        return { ...t, config: a, theme: e }
      })
    }, []),
    b = a.useCallback(() => {
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
        const a = { ...e.config, theme: t }
        try {
          d.saveConfig(a)
        } catch (n) {
          console.error('Failed to save theme:', n)
        }
        return { ...e, config: a, theme: t }
      })
    }, []),
    N = a.useCallback(() => {
      t(M), d.clearConfig()
    }, []),
    C = a.useCallback(() => {
      const {
        gitlabUrl: t,
        gitlabToken: a,
        deepseekApiKey: n,
        defaultPrompt: s,
      } = e.config
      return !!(t.trim() && a.trim() && n.trim() && s.trim())
    }, [e.config]),
    k = a.useCallback(() => {
      const t = new Date(),
        a = e.filterConditions.timeRange,
        n = 864e5,
        s = new Date(t.getTime() + n)
      if ('week' === a) {
        const e = t.getDay()
        let a = 0 === e ? 6 : e - 1
        1 === e && (a += 1)
        return {
          startDate: new Date(t.getTime() - a * n).toISOString().split('T')[0],
          endDate: s.toISOString().split('T')[0],
        }
      }
      let l = 7
      l = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[a] || 7
      return {
        startDate: new Date(t.getTime() - l * n).toISOString().split('T')[0],
        endDate: s.toISOString().split('T')[0],
      }
    }, [e.filterConditions.timeRange])
  return {
    state: e,
    updateConfig: n,
    setActivePanel: s,
    setAppMode: l,
    setProjects: i,
    setSelectedProjectId: o,
    setCommits: c,
    updateFilterConditions: _,
    updateSortOptions: u,
    updatePaginationOptions: m,
    setEvents: h,
    setTotal: p,
    setAIGenerationConfig: x,
    setLoading: g,
    setError: v,
    setReportData: j,
    setTheme: f,
    toggleTheme: b,
    resetState: N,
    isConfigValid: C,
    getTimeRange: k,
  }
}
const D = () => {
    const e = a.useRef(null),
      t = a.useCallback(() => {
        e.current && e.current.abort()
        const t = new AbortController()
        return (e.current = t), t
      }, []),
      n = a.useCallback(() => {
        e.current && (e.current.abort(), (e.current = null))
      }, []),
      s = a.useCallback(e => e.signal.aborted, []),
      l = a.useCallback(t => {
        e.current === t && (e.current = null)
      }, []),
      i = a.useCallback(e => e instanceof Error && 'AbortError' === e.name, [])
    return (
      a.useEffect(
        () => () => {
          n()
        },
        [n],
      ),
      {
        createRequest: t,
        cancelRequest: n,
        isRequestCancelled: s,
        cleanupRequest: l,
        isAbortError: i,
      }
    )
  },
  L = 'index-module__filter-section-content__y5rEz',
  P = 'index-module__filter-group__5B49Z',
  O = 'index-module__filter-label__kgsrz',
  A = 'index-module__filter-options__83wOv',
  U = 'index-module__filter-option__SG0B9',
  R = 'index-module__active__IQgMz',
  G = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  B = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  F = [
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
  V = ({ filterConditions: e, onFilterChange: t }) => {
    const a = (a, n) => {
        t({ ...e, [a]: n })
      },
      n = [
        { key: 'targetType', label: '目标类型', options: B },
        { key: 'action', label: '操作类型', options: F },
      ]
    return E.jsxs('div', {
      className: L,
      children: [
        E.jsxs('div', {
          className: P,
          children: [
            E.jsx('label', { className: O, children: '时间范围' }),
            E.jsx('div', {
              className: A,
              children: G.map(({ value: t, label: n }) =>
                E.jsx(
                  'button',
                  {
                    className: `${U} ${e.timeRange === t ? R : ''}`,
                    onClick: () => a('timeRange', t),
                    children: n,
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
        n.map(({ key: t, label: n, options: s }) =>
          E.jsxs(
            'div',
            {
              className: P,
              children: [
                E.jsx('label', { className: O, children: n }),
                E.jsxs('div', {
                  className: A,
                  children: [
                    E.jsx('button', {
                      className: `${U} ${0 === e[t].length ? R : ''}`,
                      onClick: () => a(t, []),
                      children: '全部',
                    }),
                    s.map(({ value: n, label: s }) =>
                      E.jsx(
                        'button',
                        {
                          className: `${U} ${Array.isArray(e[t]) && e[t].includes(n) ? R : ''}`,
                          onClick: () =>
                            ((t, n, s) => {
                              const l = e[t],
                                i = s ? [...l, n] : l.filter(e => e !== n)
                              a(t, i)
                            })(t, n, !e[t].includes(n)),
                          children: s,
                        },
                        n,
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
  H = {
    pagination: 'index-module__pagination__5dauU',
    paginationInfo: 'index-module__pagination-info__xbUbw',
    paginationControls: 'index-module__pagination-controls__q2hqL',
    paginationBtn: 'index-module__pagination-btn__P1OCG',
    disabled: 'index-module__disabled__BywdX',
    active: 'index-module__active__lSJu-',
    paginationEllipsis: 'index-module__pagination-ellipsis__gQnax',
    paginationSizeChanger: 'index-module__pagination-size-changer__SufyI',
    paginationSelect: 'index-module__pagination-select__JwvbH',
  },
  q = s.memo(
    ({
      current: e,
      pageSize: t,
      total: a,
      onChange: n,
      showSizeChanger: l = !0,
      pageSizeOptions: i = [20, 50, 100, 200],
      onShowSizeChange: o,
    }) => {
      const r = Math.ceil(a / t),
        d = (e - 1) * t + 1,
        c = Math.min(e * t, a),
        _ = t => {
          t >= 1 && t <= r && t !== e && n(t)
        }
      return 0 === a
        ? E.jsx('div', {
            className: H.pagination,
            children: E.jsx('div', {
              className: H.info,
              children: E.jsx('span', { children: '暂无数据' }),
            }),
          })
        : E.jsxs('div', {
            className: H.pagination,
            children: [
              E.jsx('div', {
                className: H.paginationInfo,
                children: E.jsxs('span', {
                  children: ['显示 ', d, '-', c, ' 条，共 ', a, ' 条'],
                }),
              }),
              E.jsxs('div', {
                className: H.paginationControls,
                children: [
                  E.jsx('button', {
                    className: `${H.paginationBtn} ${1 === e ? H.disabled : ''}`,
                    onClick: () => _(e - 1),
                    disabled: 1 === e,
                    children: E.jsx('span', { children: '‹' }),
                  }),
                  (() => {
                    if (r <= 7)
                      return Array.from({ length: r }, (e, t) => t + 1)
                    const t = [1],
                      a = Math.max(2, e - 2),
                      n = Math.min(r - 1, e + 2)
                    e > 4 && t.push('...')
                    for (let e = a; e <= n; e++) t.push(e)
                    return e < r - 2 - 1 && t.push('...'), t.push(r), t
                  })().map((t, a) =>
                    E.jsx(
                      s.Fragment,
                      {
                        children:
                          'number' == typeof t
                            ? E.jsx('button', {
                                className: `${H.paginationBtn} ${e === t ? H.active : ''}`,
                                onClick: () => _(t),
                                children: t,
                              })
                            : E.jsx('span', {
                                className: H.paginationEllipsis,
                                children: t,
                              }),
                      },
                      a,
                    ),
                  ),
                  E.jsx('button', {
                    className: `${H.paginationBtn} ${e === r ? H.disabled : ''}`,
                    onClick: () => _(e + 1),
                    disabled: e === r,
                    children: E.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              l &&
                E.jsxs('div', {
                  className: H.paginationSizeChanger,
                  children: [
                    E.jsx('span', { children: '每页' }),
                    E.jsx('select', {
                      value: t,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (o && o(1, t))
                        var t
                      },
                      className: H.paginationSelect,
                      children: i.map(e =>
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
  z = 'index-module__selectionManager__BVUt4',
  X = 'index-module__selectionInfo__xzOCm',
  K = 'index-module__selectionCount__C1Iwo',
  Q = 'index-module__selectionActions__Apagf',
  Z = 'index-module__actionGroup__E-C1y',
  J = 'index-module__groupLabel__x-jJZ',
  W = 'index-module__actionBtn__421Xy',
  Y = 'index-module__selectAllBtn__bMAjm',
  ee = 'index-module__clearBtn__atjK2',
  te = s.memo(
    ({
      currentPageEvents: e,
      selectedEventIds: t,
      totalCount: n,
      onSelectionChange: s,
      loading: l = !1,
    }) => {
      const i = a.useRef(!1),
        o = a.useRef(!1),
        r = a.useMemo(() => e.map(e => e.id), [e]),
        d = a.useMemo(() => t.includes(-1), [t]),
        c = a.useMemo(() => {
          if (d) return { count: n, text: `已全选 ${n} 条` }
          const e = t.filter(e => -1 !== e).length
          return { count: e, text: `已选中 ${e} 条` }
        }, [d, n, t])
      a.useEffect(() => {
        if (r.length > 0 && !d && !l) {
          const e = t.filter(e => -1 !== e)
          if (!o.current && 0 === e.length && !i.current) {
            console.log('SelectionManager: 初始化自动选择当前页')
            const e = [...r]
            s(e, !1), (o.current = !0)
          }
        }
      }, [r, t, d, l, s]),
        a.useEffect(() => {
          t.length > 0 && (i.current = !1)
        }, [t])
      const _ = a.useCallback(() => {
          console.log('SelectionManager: 点击全选按钮'),
            (i.current = !1),
            s([-1], !0)
        }, [s]),
        u = a.useCallback(() => {
          console.log('SelectionManager: 点击清空按钮'),
            (i.current = !0),
            s([], !1)
        }, [s])
      return E.jsxs('div', {
        className: z,
        children: [
          E.jsx('div', {
            className: X,
            children: E.jsx('span', { className: K, children: c.text }),
          }),
          E.jsx('div', {
            className: Q,
            children: E.jsxs('div', {
              className: Z,
              children: [
                E.jsx('span', { className: J, children: '全部:' }),
                E.jsx('button', {
                  className: `${W} ${Y}`,
                  onClick: _,
                  disabled: l || d,
                  title: '选择所有数据',
                  children: '全选',
                }),
                E.jsx('button', {
                  className: `${W} ${ee}`,
                  onClick: u,
                  disabled: l || 0 === c.count,
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
  ae = {
    eventsList: 'index-module__events-list__-m-9O',
    eventsListHeader: 'index-module__events-list-header__IFdcr',
    headerCell: 'index-module__header-cell__Q50BV',
    checkboxCell: 'index-module__checkbox-cell__fFp2c',
    contentCell: 'index-module__content-cell__XX9h3',
    actionCell: 'index-module__action-cell__cQC45',
    timeCell: 'index-module__time-cell__MQe22',
    detailCell: 'index-module__detail-cell__zq1IN',
    sortIcon: 'index-module__sort-icon__tSSwt',
    eventsListBody: 'index-module__events-list-body__QknuZ',
    eventRow: 'index-module__event-row__nD7Rz',
    selected: 'index-module__selected__QNHpl',
    cell: 'index-module__cell__KsOts',
    eventIcon: 'index-module__event-icon__9UCQ3',
    eventContent: 'index-module__event-content__YCPED',
    eventTitle: 'index-module__event-title__530MV',
    eventDescription: 'index-module__event-description__C3Fjc',
    actionTag: 'index-module__action-tag__GZU05',
    eventTime: 'index-module__event-time__1VIXa',
    detailBtn: 'index-module__detail-btn__Q5YpF',
    detailIcon: 'index-module__detail-icon__E5Shy',
    emptyState: 'index-module__empty-state__ohnRa',
    emptyIcon: 'index-module__empty-icon__OXdkI',
    eventsListLoading: 'index-module__events-list-loading__e6mCh',
    loadingSpinner: 'index-module__loading-spinner__C04N8',
    checkboxContainer: 'index-module__checkbox-container__UxYEH',
    checkmark: 'index-module__checkmark__-Dj1c',
  },
  ne = s.memo(
    ({
      events: e,
      totalCount: t,
      loading: n,
      sortOptions: s,
      onSortChange: l,
      paginationOptions: i,
      onPaginationChange: o,
      selectedEventIds: r,
      isFullSelection: d,
      onSelectionChange: _,
      onEventSelect: u,
      onEventDetail: m,
    }) => {
      const h = a.useCallback(
          e => {
            if ('created_at' !== e) return
            const t = s.field === e && 'desc' === s.order ? 'asc' : 'desc'
            l({ field: e, order: t })
          },
          [s.field, s.order, l],
        ),
        p = a.useCallback(
          e => (s.field !== e ? '' : 'desc' === s.order ? '↓' : '↑'),
          [s.field, s.order],
        ),
        x = a.useCallback(
          e => {
            u(e)
          },
          [u],
        ),
        g = a.useCallback(e => {
          const t = new Date(e),
            a = new Date(),
            n =
              new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() -
              new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
            s = Math.floor(n / 864e5),
            l = t.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          return 0 === s
            ? `今天 ${l}`
            : 1 === s
              ? `昨天 ${l}`
              : s > 1 && s <= 7
                ? `${s}天前`
                : t.toLocaleDateString('zh-CN', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
        }, []),
        v = a.useCallback(e => {
          if (e.push_data) return `推送到分支 ${e.push_data.ref}`
          if (e.note) {
            const t = 50
            return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
          }
          return 'joined' === e.action_name
            ? '加入项目'
            : e.title || e.target_title || '无标题'
        }, []),
        j = a.useCallback(
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
            const n = e.title || e.target_title || '无标题',
              s = {
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
              l = (a && s[a]) || (t && s[t])
            return l
              ? { ...l, title: n }
              : { icon: '📋', actionType: a || t || '未知操作', title: v(e) }
          },
          [v],
        ),
        f = a.useCallback(e => {
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
        className: ae.eventsList,
        children: [
          E.jsx(te, {
            currentPageEvents: e,
            selectedEventIds: r,
            totalCount: t,
            onSelectionChange: _,
            loading: n,
          }),
          E.jsxs('div', {
            className: ae.eventsListHeader,
            children: [
              E.jsx('div', {
                className: `${ae.headerCell} ${ae.checkboxCell}`,
                children: E.jsx('span', { children: '选择' }),
              }),
              E.jsx('div', {
                className: `${ae.headerCell} ${ae.contentCell}`,
                children: E.jsx('span', { children: '标题和内容' }),
              }),
              E.jsx('div', {
                className: `${ae.headerCell} ${ae.actionCell}`,
                children: E.jsx('span', { children: '操作' }),
              }),
              E.jsxs('div', {
                className: `${ae.headerCell} ${ae.timeCell}`,
                onClick: () => h('created_at'),
                children: [
                  E.jsx('span', { children: '时间' }),
                  E.jsx('span', {
                    className: ae.sortIcon,
                    children: p('created_at'),
                  }),
                ],
              }),
              E.jsx('div', {
                className: `${ae.headerCell} ${ae.detailCell}`,
                children: '详情',
              }),
            ],
          }),
          E.jsx('div', {
            className: ae.eventsListBody,
            children: n
              ? E.jsxs('div', {
                  className: ae.eventsListLoading,
                  children: [
                    E.jsx('div', { className: ae.loadingSpinner }),
                    E.jsx('p', { children: '正在加载事件数据...' }),
                  ],
                })
              : 0 === e.length
                ? E.jsxs('div', {
                    className: ae.emptyState,
                    children: [
                      E.jsx('div', { className: ae.emptyIcon, children: '📄' }),
                      E.jsx('p', { children: '暂无事件数据' }),
                      E.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
                    ],
                  })
                : e.map(e => {
                    const t = d || r.includes(e.id),
                      { icon: a, title: n, actionType: s } = j(e)
                    return E.jsxs(
                      'div',
                      {
                        className: `${ae.eventRow} ${t ? ae.selected : ''}`,
                        children: [
                          E.jsx('div', {
                            className: `${ae.cell} ${ae.checkboxCell}`,
                            children: E.jsxs('label', {
                              className: ae.checkboxContainer,
                              children: [
                                E.jsx('input', {
                                  type: 'checkbox',
                                  checked: t,
                                  onChange: () => x(e.id),
                                  title: t ? '取消选择' : '选择此事件',
                                }),
                                E.jsx('span', { className: ae.checkmark }),
                              ],
                            }),
                          }),
                          E.jsxs('div', {
                            className: `${ae.cell} ${ae.contentCell}`,
                            children: [
                              E.jsx('div', {
                                className: ae.eventIcon,
                                children: a,
                              }),
                              E.jsxs('div', {
                                className: ae.eventContent,
                                children: [
                                  E.jsx('div', {
                                    className: ae.eventTitle,
                                    children: n,
                                  }),
                                  E.jsx('div', {
                                    className: ae.eventDescription,
                                    children: f(e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          E.jsx('div', {
                            className: `${ae.cell} ${ae.actionCell}`,
                            children: E.jsx('span', {
                              className: ae.actionTag,
                              children: s,
                            }),
                          }),
                          E.jsx('div', {
                            className: `${ae.cell} ${ae.timeCell}`,
                            children: E.jsx('span', {
                              className: ae.eventTime,
                              children: g(e.created_at),
                            }),
                          }),
                          E.jsx('div', {
                            className: `${ae.cell} ${ae.detailCell}`,
                            children: E.jsx('button', {
                              className: ae.detailBtn,
                              onClick: () => m(e),
                              title: '查看详情',
                              children: E.jsx('span', {
                                className: ae.detailIcon,
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
            className: ae.eventsListFooter,
            children: E.jsx(q, {
              current: i.page,
              pageSize: i.pageSize,
              total: t,
              onChange: e => o({ ...i, page: e }),
              showSizeChanger: !0,
              onShowSizeChange: (e, a) => o({ page: e, pageSize: a, total: t }),
            }),
          }),
        ],
      })
    },
  )
class se {
  constructor(e, a) {
    t(this, 'baseUrl'),
      t(this, 'token'),
      t(this, 'currentUser', null),
      (this.baseUrl = e.replace(/\/$/, '')),
      (this.token = a)
  }
  async request(e, t = {}) {
    const a = `${this.baseUrl}${e}`,
      n = {
        method: t.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: m.REQUEST_TIMEOUT,
        body: t.body,
      },
      s = await _(a, n)
    if (!s.ok) {
      let e
      try {
        e = await s.text()
      } catch {
        e = s.statusText
      }
      console.error(`GitLab API Error [${s.status}]:`, e)
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
        }[s.status] ||
        e ||
        s.statusText
      throw u.createApiError(s.status, t, 'GitLab API')
    }
    return s.json()
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
      throw u.createResponseError('Token格式无效', 'GitLab API')
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
      n = `${this.baseUrl}${a}`,
      s = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: m.REQUEST_TIMEOUT,
      },
      l = await _(n, s)
    if (!l.ok) {
      const e = await l.text()
      throw u.createApiError(l.status, e || l.statusText, 'GitLab API')
    }
    const i = await l.json()
    let o = 0,
      r = ''
    if (l.headers instanceof Headers)
      (r =
        l.headers.get('x-total') ||
        l.headers.get('X-Total') ||
        l.headers.get('x-total-count') ||
        l.headers.get('X-Total-Count') ||
        ''),
        (o = parseInt(r || '0', 10))
    else {
      if ('string' == typeof l.headers) {
        const e = l.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              a = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              r = a
              break
            }
          }
        }
      } else {
        const e = l.headers
        r =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      o = parseInt(r || '0', 10)
    }
    return !o && i.length > 0 && (o = i.length), { projects: i, total: o }
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
    const n = `/users/${e}/events?${a.toString()}`,
      s = `${this.baseUrl}${n}`,
      l = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: m.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      i = await _(s, l)
    if (!i.ok) {
      const e = await i.text()
      throw u.createApiError(i.status, e || i.statusText, 'GitLab API')
    }
    const o = await i.json()
    let r = 0,
      d = ''
    if (i.headers instanceof Headers)
      (d =
        i.headers.get('x-total') ||
        i.headers.get('X-Total') ||
        i.headers.get('x-total-count') ||
        i.headers.get('X-Total-Count') ||
        ''),
        (r = parseInt(d || '0', 10))
    else {
      if ('string' == typeof i.headers) {
        const e = i.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              a = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              d = a
              break
            }
          }
        }
      } else {
        const e = i.headers
        d =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      r = parseInt(d || '0', 10)
    }
    return !r && o.length > 0 && (r = o.length), { events: o, total: r }
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
    const n = a.toString(),
      s = n ? `/projects/${e}/events?${n}` : `/projects/${e}/events`,
      l = `${this.baseUrl}${s}`,
      i = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: m.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(l, i)
    if (!o.ok) {
      const e = await o.text()
      throw u.createApiError(o.status, e || o.statusText, 'GitLab API')
    }
    const r = await o.json()
    let d = 0,
      c = ''
    if (o.headers instanceof Headers)
      (c =
        o.headers.get('x-total') ||
        o.headers.get('X-Total') ||
        o.headers.get('x-total-count') ||
        o.headers.get('X-Total-Count') ||
        ''),
        (d = parseInt(c || '0', 10))
    else {
      if ('string' == typeof o.headers) {
        const e = o.headers.split('\n')
        for (const t of e) {
          const e = t.split(': ')
          if (2 === e.length) {
            const t = e[0].toLowerCase(),
              a = e[1]
            if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
              c = a
              break
            }
          }
        }
      } else {
        const e = o.headers
        c =
          e['x-total'] ||
          e['X-Total'] ||
          e['x-total-count'] ||
          e['X-Total-Count'] ||
          e.x_total ||
          e.X_TOTAL ||
          ''
      }
      d = parseInt(c || '0', 10)
    }
    return (
      console.log('GitLab API Response:', {
        eventsCount: r.length,
        totalHeader: c,
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
        r.length > 0 &&
        ((d = r.length),
        console.warn(
          'No total count in response headers, using events array length as fallback',
        )),
      { events: r, total: d }
    )
  }
  getCachedUser() {
    return this.currentUser
  }
}
function le(e, t) {
  return new se(e, t)
}
const ie = Object.freeze(
    Object.defineProperty(
      { __proto__: null, GitLabApiService: se, createGitLabApiService: le },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  oe = {
    projectSelector: 'index-module__project-selector__1-CU4',
    selectorTrigger: 'index-module__selector-trigger__p6K8D',
    open: 'index-module__open__eBdQd',
    disabled: 'index-module__disabled__wVRd6',
    projectName: 'index-module__project-name__zeNO2',
    projectPath: 'index-module__project-path__c0VnB',
    arrow: 'index-module__arrow__SO96I',
    down: 'index-module__down__fc2yF',
    up: 'index-module__up__X13CX',
    dropdown: 'index-module__dropdown__yr22p',
    searchSection: 'index-module__search-section__EHsZZ',
    filtersSection: 'index-module__filters-section__yQbV5',
    searchInput: 'index-module__search-input__G0qdM',
    searchIcon: 'index-module__search-icon__6sNjM',
    filterOptions: 'index-module__filter-options__DtiKx',
    filterOption: 'index-module__filter-option__-schj',
    sortOptions: 'index-module__sort-options__drMrx',
    projectList: 'index-module__project-list__wMLbm',
    loading: 'index-module__loading__Jo9tk',
    error: 'index-module__error__xjbeu',
    spinner: 'index-module__spinner__tkI8a',
    projectItem: 'index-module__project-item__UY9Nn',
    selected: 'index-module__selected__LX5fz',
    projectInfo: 'index-module__project-info__lH-Bx',
    projectDescription: 'index-module__project-description__lwCNx',
    starIcon: 'index-module__star-icon__KOGRH',
    checkIcon: 'index-module__check-icon__eEeX-',
    emptyState: 'index-module__empty-state__BkXac',
    emptyIcon: 'index-module__empty-icon__W0Opg',
    emptyText: 'index-module__empty-text__-QIhF',
    emptyHint: 'index-module__empty-hint__pdwSU',
    pagination: 'index-module__pagination__AFW-U',
    pageButton: 'index-module__page-button__dDr90',
    pageInfo: 'index-module__page-info__81boc',
    totalCount: 'index-module__total-count__ix0Nf',
  },
  re = class e {
    constructor() {
      t(this, 'cache', new Map()), t(this, 'CACHE_DURATION', 3e5)
    }
    static getInstance() {
      return e.instance || (e.instance = new e()), e.instance
    }
    getCacheKey(e, t, a, n, s) {
      return `${e}_${t}_${JSON.stringify(a)}_${n}_${s}`
    }
    get(e, t, a, n, s) {
      const l = this.getCacheKey(e, t, a, n, s),
        i = this.cache.get(l)
      return i && Date.now() - i.timestamp < this.CACHE_DURATION
        ? i
        : (this.cache.delete(l), null)
    }
    set(e, t, a, n, s, l, i) {
      const o = this.getCacheKey(e, t, a, n, s)
      this.cache.set(o, {
        projects: l,
        totalCount: i,
        timestamp: Date.now(),
        filters: a,
        sortBy: n,
        searchValue: s,
      })
    }
    clear() {
      this.cache.clear()
    }
    cleanup() {
      const e = Date.now()
      for (const [t, a] of this.cache.entries())
        e - a.timestamp >= this.CACHE_DURATION && this.cache.delete(t)
    }
  }
t(re, 'instance')
let de = re
const ce = ({
    gitlabService: e,
    selectedProjectId: t,
    onProjectSelect: n,
    isConfigValid: s,
    disabled: l = !1,
    autoLoad: i = !1,
  }) => {
    const { state: o } = $(),
      [r, d] = a.useState(!1),
      [c, _] = a.useState([]),
      [m, h] = a.useState(!1),
      [p, x] = a.useState(''),
      [g, v] = a.useState('last_activity_at'),
      [j, f] = a.useState({ starred: !1, membership: !0 }),
      [b, N] = a.useState(1),
      [C, k] = a.useState(0),
      [y, w] = a.useState(null),
      S = a.useRef(null),
      T = a.useRef(null),
      I = a.useRef(de.getInstance()),
      M = a.useRef(null),
      D = a.useCallback(
        async (a, l) => {
          if (!s()) return
          const i = a || p || '',
            r = j,
            d = g,
            c = I.current.get(o.config.gitlabUrl, o.config.gitlabToken, r, d, i)
          if (c && 1 === (l || b))
            return (
              _(c.projects),
              k(c.totalCount),
              void (!t && c.projects.length > 0 && n(c.projects[0].id))
            )
          h(!0), w(null)
          try {
            await e.init()
            const a = {
                membership: r.membership || void 0,
                starred: r.starred || void 0,
                simple: !0,
                order_by: d,
                search: i || void 0,
                page: l || b,
                per_page: 20,
              },
              { projects: s, total: c } = await e.getProjectsWithTotal(a)
            1 === (l || b) &&
              I.current.set(
                o.config.gitlabUrl,
                o.config.gitlabToken,
                r,
                d,
                i,
                s,
                c,
              ),
              _(s),
              k(c),
              !t && s.length > 0 && n(s[0].id)
          } catch (m) {
            console.error('Failed to fetch projects:', u.formatErrorMessage(m)),
              w('获取项目列表失败'),
              _([]),
              k(0)
          } finally {
            h(!1)
          }
        },
        [s, e, j, g, p, b, t, n, o.config.gitlabUrl, o.config.gitlabToken],
      ),
      L = a.useMemo(
        () => e => {
          M.current && clearTimeout(M.current),
            (M.current = setTimeout(() => {
              N(1), D(e, 1)
            }, 300))
        },
        [D],
      )
    a.useEffect(() => {
      r && D()
    }, [r, j, g, b, D]),
      a.useEffect(() => {
        i && s() && D()
      }, [i, s, D])
    const P = a.useCallback(
        e => {
          const t = e.target.value
          x(t), L(t)
        },
        [L],
      ),
      O = a.useCallback(e => {
        v(e), N(1)
      }, []),
      A = a.useCallback((e, t) => {
        f(a => ({ ...a, [e]: t })), N(1)
      }, []),
      U = a.useCallback(
        e => {
          n(e), d(!1)
        },
        [n],
      ),
      R = a.useCallback(e => {
        N(e)
      }, [])
    a.useEffect(() => {
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
      a.useEffect(() => {
        r && T.current && T.current.focus()
      }, [r])
    const G = a.useMemo(() => c.find(e => e.id === t), [c, t]),
      B = Math.ceil(C / 20)
    return E.jsxs('div', {
      className: oe.projectSelector,
      ref: S,
      children: [
        E.jsxs('div', {
          className: `${oe.selectorTrigger} ${r ? oe.open : ''} ${l ? oe.disabled : ''}`,
          onClick: () => !l && d(!r),
          children: [
            E.jsx('span', {
              className: oe.selectedText,
              children: G ? G.path_with_namespace : '请选择项目',
            }),
            E.jsx('span', {
              className: `${oe.arrow} ${r ? oe.up : oe.down}`,
              children: '▼',
            }),
          ],
        }),
        r &&
          !l &&
          E.jsxs('div', {
            className: oe.dropdown,
            children: [
              E.jsxs('div', {
                className: oe.searchSection,
                children: [
                  E.jsxs('div', {
                    className: oe.searchInput,
                    children: [
                      E.jsx('span', {
                        className: oe.searchIcon,
                        children: '🔍',
                      }),
                      E.jsx('input', {
                        ref: T,
                        type: 'text',
                        placeholder: '搜索项目...',
                        value: p,
                        onChange: P,
                      }),
                    ],
                  }),
                  E.jsxs('div', {
                    className: oe.filtersSection,
                    children: [
                      E.jsxs('div', {
                        className: oe.filterOptions,
                        children: [
                          E.jsxs('label', {
                            className: oe.filterOption,
                            children: [
                              E.jsx('input', {
                                type: 'checkbox',
                                checked: j.membership,
                                onChange: e =>
                                  A('membership', e.target.checked),
                              }),
                              '我的项目',
                            ],
                          }),
                          E.jsxs('label', {
                            className: oe.filterOption,
                            children: [
                              E.jsx('input', {
                                type: 'checkbox',
                                checked: j.starred,
                                onChange: e => A('starred', e.target.checked),
                              }),
                              '已收藏',
                            ],
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: oe.sortOptions,
                        children: [
                          E.jsx('label', { children: '排序：' }),
                          E.jsxs('select', {
                            value: g,
                            onChange: e => O(e.target.value),
                            children: [
                              E.jsx('option', {
                                value: 'last_activity_at',
                                children: '按活跃度排序',
                              }),
                              E.jsx('option', {
                                value: 'name',
                                children: '按名称排序',
                              }),
                              E.jsx('option', {
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
              E.jsx('div', {
                className: oe.projectList,
                children: m
                  ? E.jsxs('div', {
                      className: oe.loading,
                      children: [
                        E.jsx('div', { className: oe.spinner }),
                        '加载中...',
                      ],
                    })
                  : y
                    ? E.jsx('div', { className: oe.error, children: y })
                    : 0 === c.length
                      ? E.jsxs('div', {
                          className: oe.emptyState,
                          children: [
                            E.jsx('div', {
                              className: oe.emptyIcon,
                              children: '📄',
                            }),
                            E.jsx('div', {
                              className: oe.emptyText,
                              children: '暂无项目',
                            }),
                            E.jsx('div', {
                              className: oe.emptyHint,
                              children: '请检查筛选条件或搜索关键词',
                            }),
                          ],
                        })
                      : c.map(e =>
                          E.jsxs(
                            'div',
                            {
                              className: `${oe.projectItem} ${e.id === t ? oe.selected : ''}`,
                              onClick: () => U(e.id),
                              children: [
                                E.jsxs('div', {
                                  className: oe.projectInfo,
                                  children: [
                                    E.jsx('div', {
                                      className: oe.projectName,
                                      children: e.name,
                                    }),
                                    E.jsx('div', {
                                      className: oe.projectPath,
                                      children: e.path_with_namespace,
                                    }),
                                    e.description &&
                                      E.jsx('div', {
                                        className: oe.projectDescription,
                                        children: e.description,
                                      }),
                                  ],
                                }),
                                e.starred &&
                                  E.jsx('span', {
                                    className: oe.starIcon,
                                    children: '⭐',
                                  }),
                                e.id === t &&
                                  E.jsx('span', {
                                    className: oe.checkIcon,
                                    children: '✓',
                                  }),
                              ],
                            },
                            e.id,
                          ),
                        ),
              }),
              B > 1 &&
                E.jsxs('div', {
                  className: oe.pagination,
                  children: [
                    E.jsx('button', {
                      className: oe.pageButton,
                      disabled: b <= 1,
                      onClick: () => R(b - 1),
                      children: '上一页',
                    }),
                    E.jsxs('div', {
                      className: oe.pageInfo,
                      children: [
                        E.jsxs('span', { children: [b, ' / ', B] }),
                        E.jsxs('div', {
                          className: oe.totalCount,
                          children: ['共 ', C, ' 个项目'],
                        }),
                      ],
                    }),
                    E.jsx('button', {
                      className: oe.pageButton,
                      disabled: b >= B,
                      onClick: () => R(b + 1),
                      children: '下一页',
                    }),
                  ],
                }),
            ],
          }),
      ],
    })
  },
  _e = 'index-module__changelogPanel__bsoH5',
  ue = 'index-module__projectSelectorContainer__DVUJQ',
  me = 'index-module__eventsListContainer__JlSig',
  he = 'gitlab-changelog-selected-project',
  pe = ({ onStateChange: e }) => {
    const { state: t, isConfigValid: n } = $(),
      {
        createRequest: s,
        isRequestCancelled: l,
        cleanupRequest: i,
        isAbortError: o,
      } = D(),
      r = a.useMemo(
        () => le(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [d, c] = a.useState(() => {
        const e = localStorage.getItem(he)
        return e ? parseInt(e, 10) : null
      }),
      [_, m] = a.useState([]),
      [h, p] = a.useState(0),
      [x, g] = a.useState(!1),
      [v, j] = a.useState({ field: 'created_at', order: 'desc' }),
      [f, b] = a.useState({ page: 1, pageSize: 20, total: 0 }),
      [N, C] = a.useState([]),
      k = a.useMemo(() => 1 === N.length && 0 === N[0] && h > 0, [N, h])
    a.useEffect(() => {
      e &&
        e({
          selectedEventIds: N,
          isAllEventsSelected: k,
          totalCount: h,
          events: _,
        })
    }, [N, k, h, _, e])
    const y = a.useCallback(e => {
        c(e),
          e
            ? localStorage.setItem(he, e.toString())
            : localStorage.removeItem(he),
          b(e => ({ ...e, page: 1 })),
          C([])
      }, []),
      w = a.useCallback(async () => {
        if (!n() || !d) return m([]), void p(0)
        const e = s()
        g(!0)
        try {
          await r.init()
          const t = {
              page: f.page,
              per_page: f.pageSize,
              sort: v.order,
              signal: e.signal,
            },
            { events: a, total: n } = await r.getProjectEventsWithTotal(d, t)
          if (l(e)) return
          m(a), C(e => (1 === e.length && 0 === e[0] ? e : [])), p(n)
        } catch (t) {
          if (o(t)) return
          console.error(
            '❌ [ChangelogPanel] Failed to fetch events:',
            u.formatErrorMessage(t),
          ),
            m([]),
            p(0)
        } finally {
          l(e) || g(!1), i(e)
        }
      }, [n, r, d, f, v, s, l, o, i])
    a.useEffect(() => {
      w()
    }, [w])
    const S = a.useCallback(e => {
        j(e)
      }, []),
      T = a.useCallback(e => {
        b(e)
      }, [])
    return E.jsxs('div', {
      className: _e,
      children: [
        E.jsx('div', {
          className: ue,
          children: E.jsx(ce, {
            gitlabService: r,
            selectedProjectId: d,
            onProjectSelect: y,
            isConfigValid: n,
            autoLoad: !0,
          }),
        }),
        E.jsx('div', {
          className: me,
          children: E.jsx(ne, {
            events: _,
            totalCount: h,
            loading: x,
            sortOptions: v,
            onSortChange: S,
            paginationOptions: f,
            onPaginationChange: T,
            selectedEventIds: N,
            onSelectionChange: (e, t) => {
              C(e), t && C([0])
            },
            isFullSelection: k,
            onEventSelect: e => {
              const t = N.includes(e)
              if (k && !t) {
                const t = _.filter(t => t.id !== e).map(e => e.id)
                C(t)
              } else {
                if (k && t) return
                C(a => (t ? a.filter(t => t !== e) : [...a, e]))
              }
            },
            onEventDetail: () => {},
            mode: 'changelog',
          }),
        }),
      ],
    })
  },
  xe = {
    actionBtn: 'index-module__action-btn__To7Ms',
    versionBtn: 'index-module__version-btn__8d3di',
    hasUpdate: 'index-module__has-update__tNkZZ',
    icon: 'index-module__icon__EhhVu',
    text: 'index-module__text__4iX-h',
    notificationOverlay: 'index-module__notification-overlay__E4dh-',
    notification: 'index-module__notification__ckX1l',
    notificationHeader: 'index-module__notification-header__nJZ3Q',
    closeBtn: 'index-module__close-btn__9uULv',
    notificationBody: 'index-module__notification-body__nnab7',
    versionInfo: 'index-module__version-info__-pyIP',
    releaseNotes: 'index-module__release-notes__iU2jG',
    notesContent: 'index-module__notes-content__ZpxxA',
    notificationFooter: 'index-module__notification-footer__La-ia',
    laterBtn: 'index-module__later-btn__Q40Lc',
    updateBtn: 'index-module__update-btn__lD1V2',
  },
  ge = ({ currentVersion: e }) => {
    const [t, s] = a.useState(null),
      [l, i] = a.useState(!1),
      [o, r] = a.useState(!1),
      [d, c] = a.useState(!1),
      [u, m] = a.useState(null),
      [h, p] = a.useState(null),
      [x, g] = a.useState(!1),
      [v, j] = a.useState(new Set())
    a.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && j(new Set(JSON.parse(e)))
      } catch (e) {
        console.warn('无法读取忽略版本信息:', e)
      }
    }, [])
    const f = a.useCallback((e, t) => {
        const a = e.split('.').map(Number),
          n = t.split('.').map(Number),
          s = Math.max(a.length, n.length)
        for (let l = 0; l < s; l++) {
          const e = a[l] || 0,
            t = n[l] || 0
          if (t > e) return !0
          if (t < e) return !1
        }
        return !1
      }, []),
      b = a.useCallback(
        async (a = !0) => {
          if (!l)
            if (x && t && o && a)
              (!a && v.has(t.version)) ||
                (c(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              i(!0), p(null)
              try {
                const t = new AbortController(),
                  n = setTimeout(() => t.abort(), 1e4),
                  l = Math.floor(Date.now() / 36e5),
                  i = 'undefined' != typeof GM_xmlhttpRequest,
                  o =
                    !1 && !i
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  d = await _(`${o}?t=${l}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    signal: t.signal,
                    timeout: 1e4,
                  })
                if ((clearTimeout(n), !d.ok))
                  throw new Error(`HTTP ${d.status}: ${d.statusText}`)
                const u = await d.json()
                console.log('获取到版本信息:', u)
                const h = {
                  version: u.version,
                  downloadUrl:
                    'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                  releaseNotes: `版本 ${u.version} 已发布，请及时更新以获得最新功能和修复。`,
                }
                s(h), m(new Date()), g(!0)
                const p = f(e, h.version)
                r(p),
                  p
                    ? a || !v.has(h.version)
                      ? (c(!0),
                        console.log(`发现新版本 ${h.version}，建议及时更新！`))
                      : console.log(`发现新版本 ${h.version}，但已被忽略`)
                    : console.log('当前已是最新版本')
              } catch (n) {
                console.error('检查版本更新失败:', n)
                const e = n instanceof Error ? n.message : '检查更新失败'
                p(e), console.error(`检查更新失败: ${e}`)
              } finally {
                i(!1)
              }
            }
        },
        [l, f, e, v, x, t, o],
      )
    a.useEffect(() => {
      const e = setTimeout(() => {
        b(!1)
      }, 1e3)
      return () => clearTimeout(e)
    }, [])
    const N = a.useCallback(async () => {
        ;(null == t ? void 0 : t.downloadUrl) &&
          (window.open(t.downloadUrl, '_blank'),
          c(!1),
          setTimeout(async () => {
            await b(!1)
            !f(e, t.version)
              ? console.log('当前已是最新版本！')
              : console.log(
                  `检测到新版本 ${t.version}，请手动刷新页面或重新安装脚本。`,
                )
          }, 1e3))
      }, [t, b, f, e]),
      C = a.useCallback(() => {
        j(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      k = a.useCallback(() => {
        if ((c(!1), t)) {
          const a = new Set(v)
          a.add(t.version), j(a)
          try {
            localStorage.setItem(
              'gitlab-weekly-report-dismissed-versions',
              JSON.stringify(Array.from(a)),
            )
          } catch (e) {
            console.warn('无法保存忽略版本信息:', e)
          }
        }
      }, [t, v]),
      y = a.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      w = a.useCallback(
        () =>
          l
            ? '检查中...'
            : h
              ? '检查失败'
              : o
                ? '有更新'
                : x && !o
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [l, h, o, x],
      ),
      S = a.useCallback(() => (l ? '🔄' : h ? '⚠️' : o ? '🔴' : ''), [l, h, o])
    a.useEffect(() => {}, [C])
    const T = a.useCallback(() => {
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
            className: `${xe.actionBtn} ${xe.versionBtn} ${l ? xe.checking : ''} ${o ? xe.hasUpdate : ''}`,
            onClick: () => b(!0),
            disabled: l,
            title: u
              ? `上次检查: ${y(u)}${h ? `\n错误: ${h}` : ''}`
              : '点击检查更新',
            children: [
              E.jsx('span', { className: xe.icon, children: S() }),
              E.jsx('span', { className: xe.text, children: w() }),
            ],
          }),
          d &&
            o &&
            t &&
            n.createPortal(
              E.jsx('div', {
                className: xe.notificationOverlay,
                children: E.jsxs('div', {
                  className: xe.notification,
                  children: [
                    E.jsxs('div', {
                      className: xe.notificationHeader,
                      children: [
                        E.jsx('h3', { children: '发现新版本' }),
                        E.jsx('button', {
                          className: xe.closeBtn,
                          onClick: k,
                          children: '×',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: xe.notificationBody,
                      children: [
                        E.jsxs('div', {
                          className: xe.versionInfo,
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
                            className: xe.releaseNotes,
                            children: [
                              E.jsx('h4', { children: '更新说明:' }),
                              E.jsx('div', {
                                className: xe.notesContent,
                                children: t.releaseNotes,
                              }),
                            ],
                          }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: xe.notificationFooter,
                      children: [
                        E.jsx('button', {
                          className: xe.laterBtn,
                          onClick: k,
                          children: '稍后更新',
                        }),
                        E.jsx('button', {
                          className: xe.updateBtn,
                          onClick: N,
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
  ve = 'index-module__main-panel__82FLm',
  je = 'index-module__panel-header__kyx4p',
  fe = 'index-module__header-left__xT1T5',
  be = 'index-module__header-right__7F8Bo',
  Ne = 'index-module__mode-toggle__9yafG',
  Ce = 'index-module__toggle-track__82VKI',
  ke = 'index-module__toggle-slider__tkY4o',
  ye = 'index-module__slide-right__qPOZu',
  Ee = 'index-module__toggle-option__ZhXXU',
  we = 'index-module__active__Mr5KU',
  Se = 'index-module__toggle-icon__AI6K7',
  Te = 'index-module__toggle-label__1qZLz',
  Ie = 'index-module__divider__QXSgp',
  Me = 'index-module__action-buttons__xGRHl',
  $e = 'index-module__action-btn__x4IAP',
  De = 'index-module__btn-icon__ZaYHk',
  Le = 'index-module__btn-label__tM2Rz',
  Pe = 'index-module__ai-btn__5kAV3',
  Oe = 'index-module__config-incomplete__bLEHk',
  Ae = 'index-module__config-badge__0znDE',
  Ue = 'index-module__changelog-section__afcqm',
  Re = 'index-module__filter-section__gMBIz',
  Ge = 'index-module__events-section__gJwdk',
  Be = ({
    appMode: e,
    events: t,
    totalCount: a,
    loading: n,
    filterConditions: l,
    sortOptions: i,
    paginationOptions: o,
    selectedEventIds: r,
    onModeChange: d,
    onFilterChange: c,
    onSortChange: _,
    onPaginationChange: u,
    onEventSelect: m,
    onSelectionChange: x,
    onEventDetail: g,
    onOpenSettings: v,
    onOpenAI: j,
    isAllEventsSelected: f = !1,
    onChangelogStateChange: b,
  }) => {
    const { state: N } = $(),
      C = s.useMemo(() => {
        const e = [
            'gitlabUrl',
            'gitlabToken',
            'deepseekApiKey',
            'defaultPrompt',
          ],
          t = e.filter(e => {
            const t = N.config[e]
            return 'string' == typeof t ? '' !== t.trim() : !!t
          }).length
        return {
          isValid: t === e.length,
          completedCount: t,
          totalCount: e.length,
        }
      }, [N.config])
    return E.jsxs('div', {
      className: ve,
      children: [
        E.jsxs('div', {
          className: je,
          children: [
            E.jsx('div', {
              className: fe,
              children: E.jsx('div', {
                className: Ne,
                children: E.jsxs('div', {
                  className: Ce,
                  children: [
                    E.jsx('div', {
                      className: `${ke} ${'changelog' === e ? ye : ''}`,
                    }),
                    E.jsxs('button', {
                      className: `${Ee} ${'events' === e ? we : ''}`,
                      onClick: () => d('events'),
                      children: [
                        E.jsx('span', { className: Se, children: '📋' }),
                        E.jsx('span', { className: Te, children: 'Events' }),
                      ],
                    }),
                    E.jsxs('button', {
                      className: `${Ee} ${'changelog' === e ? we : ''}`,
                      onClick: () => d('changelog'),
                      children: [
                        E.jsx('span', { className: Se, children: '📝' }),
                        E.jsx('span', { className: Te, children: 'Changelog' }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            E.jsxs('div', {
              className: be,
              children: [
                E.jsx(ge, { currentVersion: h }),
                E.jsx('div', { className: Ie }),
                E.jsxs('div', {
                  className: Me,
                  children: [
                    E.jsxs('button', {
                      className: `${$e} ${C.isValid ? '' : Oe}`,
                      onClick: v,
                      title: C.isValid
                        ? '设置'
                        : `配置未完成 (${C.completedCount}/${C.totalCount})`,
                      children: [
                        E.jsx('span', {
                          className: De,
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
                          className: Le,
                          children: [
                            '设置',
                            !C.isValid &&
                              E.jsxs('span', {
                                className: Ae,
                                children: [C.completedCount, '/', C.totalCount],
                              }),
                          ],
                        }),
                      ],
                    }),
                    E.jsxs('button', {
                      className: `${$e} ${Pe}`,
                      onClick: j,
                      title:
                        'changelog' === e
                          ? p.changelog.title
                          : p['weekly-report'].title,
                      children: [
                        E.jsx('span', {
                          className: De,
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
                          className: Le,
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
          ? E.jsxs(E.Fragment, {
              children: [
                E.jsx('div', {
                  className: Re,
                  children: E.jsx(V, {
                    filterConditions: l,
                    onFilterChange: c,
                  }),
                }),
                E.jsx('div', {
                  className: Ge,
                  children: E.jsx(ne, {
                    events: t,
                    totalCount: a,
                    loading: n,
                    sortOptions: i,
                    onSortChange: _,
                    paginationOptions: o,
                    onPaginationChange: u,
                    selectedEventIds: r,
                    onSelectionChange: x,
                    isFullSelection: f,
                    onEventSelect: m,
                    onEventDetail: g,
                    mode: e,
                  }),
                }),
              ],
            })
          : E.jsx('div', {
              className: Ue,
              children: E.jsx(pe, { onStateChange: b }),
            }),
      ],
    })
  },
  Fe = 'index-module__modal-mask__XYxyO',
  Ve = 'index-module__modal-wrapper__bVZip',
  He = 'index-module__modal__QQS3u',
  qe = 'index-module__modal-header__GdUjX',
  ze = 'index-module__modal-title__cafB-',
  Xe = 'index-module__modal-close__ZuUgf',
  Ke = 'index-module__modal-body__j5X3U',
  Qe = 'index-module__modal-footer__3q-wn',
  Ze = ({
    visible: e,
    title: t,
    width: s = 520,
    maxHeight: l = window.innerHeight - 180,
    children: i,
    footer: o,
    onClose: r,
    maskClosable: d = !0,
  }) => {
    if (
      (a.useEffect(() => {
        const t = t => {
          'Escape' === t.key && e && r()
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
      }, [e, r]),
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
      className: Fe,
      onClick: e => {
        e.target === e.currentTarget && d && r()
      },
      children: E.jsx('div', {
        className: Ve,
        children: E.jsxs('div', {
          className: He,
          style: { width: s, maxHeight: l },
          children: [
            E.jsxs('div', {
              className: qe,
              children: [
                E.jsx('div', { className: ze, children: t }),
                E.jsx('button', {
                  className: Xe,
                  onClick: r,
                  children: E.jsx('span', { children: '×' }),
                }),
              ],
            }),
            E.jsx('div', { className: Ke, children: i }),
            o && E.jsx('div', { className: Qe, children: o }),
          ],
        }),
      }),
    })
    return n.createPortal(
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
  Je = 'index-module__config-status__0q8ZM',
  We = 'index-module__clickable__pZ86X',
  Ye = 'index-module__compact__-QN-s',
  et = 'index-module__compact-content__wSrCk',
  tt = 'index-module__status-icon__7jFiQ',
  at = 'index-module__compact-text__7OyGG',
  nt = 'index-module__expand-button__NusWg',
  st = 'index-module__expanded-content__Hih4c',
  lt = 'index-module__config-items__quryV',
  it = 'index-module__compact-item__UCAOc',
  ot = 'index-module__item-label__24FVq',
  rt = 'index-module__item-icon__4yYRW',
  dt = 'index-module__valid__Xyroo',
  ct = 'index-module__invalid__Fn-hL',
  _t = 'index-module__status-header__AORn-',
  ut = 'index-module__status-title__6hAD6',
  mt = 'index-module__status-text__llRfw',
  ht = 'index-module__progress-container__ofPka',
  pt = 'index-module__progress-bar__CFedX',
  xt = 'index-module__progress-fill__w-23-',
  gt = 'index-module__complete__L0-gl',
  vt = 'index-module__progress-text__uoYK9',
  jt = 'index-module__config-item__m6pYF',
  ft = 'index-module__item-info__BhIr5',
  bt = 'index-module__item-status__3ppNU',
  Nt = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  Ct = Nt.length,
  kt = ({
    config: e,
    className: t = '',
    showDetails: n = !0,
    onClick: l,
    compact: i = !1,
  }) => {
    const o = a.useMemo(() => {
        const t = Nt.map(t => {
            const a = e[t.key],
              n = 'string' == typeof a ? '' !== a.trim() : !!a
            return { ...t, isValid: n, value: n ? '已配置' : '未配置' }
          }),
          a = t.filter(e => e.isValid).length
        return {
          isValid: a === Ct,
          itemsStatus: t,
          completedCount: a,
          totalCount: Ct,
          progress: (a / Ct) * 100,
        }
      }, [e]),
      [r, d] = s.useState(!o.isValid)
    return i && o.isValid
      ? E.jsxs('div', {
          className: `${Je} ${Ye} ${t} ${l ? We : ''}`,
          onClick: l,
          children: [
            E.jsxs('div', {
              className: et,
              children: [
                E.jsx('span', { className: tt, children: '✅' }),
                E.jsx('span', { className: at, children: '配置已完成' }),
                n &&
                  E.jsx('button', {
                    className: nt,
                    onClick: e => {
                      e.stopPropagation(), d(!r)
                    },
                    children: r ? '收起' : '详情',
                  }),
              ],
            }),
            n &&
              r &&
              E.jsx('div', {
                className: st,
                children: E.jsx('div', {
                  className: lt,
                  children: o.itemsStatus.map(e =>
                    E.jsxs(
                      'div',
                      {
                        className: `${jt} ${it} ${e.isValid ? dt : ct}`,
                        children: [
                          E.jsx('span', { className: ot, children: e.label }),
                          E.jsx('span', {
                            className: rt,
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
          className: `${Je} ${t} ${l ? We : ''}`,
          onClick: l,
          children: [
            E.jsxs('div', {
              className: _t,
              children: [
                E.jsxs('div', {
                  className: ut,
                  children: [
                    E.jsx('span', {
                      className: tt,
                      children: o.isValid ? '✅' : '⚠️',
                    }),
                    E.jsxs('span', {
                      className: mt,
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
                  className: ht,
                  children: [
                    E.jsx('div', {
                      className: pt,
                      children: E.jsx('div', {
                        className: `${xt} ${o.isValid ? gt : ''}`,
                        style: { width: `${o.progress}%` },
                      }),
                    }),
                    E.jsxs('span', {
                      className: vt,
                      children: [Math.round(o.progress), '%'],
                    }),
                  ],
                }),
              ],
            }),
            n &&
              E.jsx('div', {
                className: lt,
                children: o.itemsStatus.map(e =>
                  E.jsxs(
                    'div',
                    {
                      className: `${jt} ${e.isValid ? dt : ct}`,
                      children: [
                        E.jsxs('div', {
                          className: ft,
                          children: [
                            E.jsx('span', { className: ot, children: e.label }),
                            E.jsx('span', { className: bt, children: e.value }),
                          ],
                        }),
                        E.jsx('span', {
                          className: rt,
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
  yt = 'index-module__settings-panel__UCg3H',
  Et = 'index-module__settings-tabs__vPH-t',
  wt = 'index-module__tab-button__FG9Nc',
  St = 'index-module__tab-icon__rBe-o',
  Tt = 'index-module__active__bsBC1',
  It = 'index-module__settings-content__TqQPH',
  Mt = 'index-module__tab-panel__Q2QUI',
  $t = 'index-module__form-group__zKwiA',
  Dt = 'index-module__form-label__pwe7O',
  Lt = 'index-module__required__2vuyW',
  Pt = 'index-module__form-input__jGbRP',
  Ot = 'index-module__form-select__jbXdq',
  At = 'index-module__form-textarea__fAVMw',
  Ut = 'index-module__form-hint__F0dFQ',
  Rt = 'index-module__version-info__y0NZv',
  Gt = 'index-module__version-text__bx0HU',
  Bt = 'index-module__settings-footer__qA44X',
  Ft = 'index-module__footer-right__bslDg',
  Vt = 'index-module__btn-primary__ZzzFI',
  Ht = 'index-module__switch-container__5xk1J',
  qt = 'index-module__switch-input__V-8fl',
  zt = 'index-module__switch-label__xrOeQ',
  Xt = 'index-module__switch-slider__dG-6J',
  Kt = 'index-module__btn-secondary__cRCpD',
  Qt = ({ isOpen: e, onClose: t, config: n, onSave: s, theme: l }) => {
    const [i, o] = a.useState(n),
      [r, d] = a.useState(l),
      [c, _] = a.useState('gitlab')
    a.useEffect(() => {
      o(n)
    }, [n]),
      a.useEffect(() => {
        d(l)
      }, [l]),
      a.useEffect(() => {
        e && (o(n), d(l))
      }, [e, n, l])
    const u = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return E.jsx(Ze, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: E.jsxs('div', {
        className: Bt,
        children: [
          E.jsx('button', {
            className: Kt,
            onClick: () => {
              o(n), d(l)
            },
            children: '重置',
          }),
          E.jsxs('div', {
            className: Ft,
            children: [
              E.jsx('button', { className: Kt, onClick: t, children: '取消' }),
              E.jsx('button', {
                className: Vt,
                onClick: () => {
                  s(i, r), t()
                },
                disabled: !(
                  i.gitlabUrl.trim() &&
                  i.gitlabToken.trim() &&
                  i.deepseekApiKey.trim() &&
                  i.defaultPrompt.trim()
                ),
                children: '保存',
              }),
            ],
          }),
        ],
      }),
      children: E.jsxs('div', {
        className: yt,
        children: [
          E.jsx(kt, { config: i, showDetails: !0, compact: !0 }),
          E.jsxs('div', {
            className: Et,
            children: [
              E.jsxs('button', {
                className: `${wt} ${'gitlab' === c ? Tt : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  E.jsx('span', { className: St, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              E.jsxs('button', {
                className: `${wt} ${'deepseek' === c ? Tt : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  E.jsx('span', { className: St, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              E.jsxs('button', {
                className: `${wt} ${'appearance' === c ? Tt : ''}`,
                onClick: () => _('appearance'),
                children: [
                  E.jsx('span', { className: St, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          E.jsxs('div', {
            className: It,
            children: [
              'gitlab' === c &&
                E.jsxs('div', {
                  className: Mt,
                  children: [
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsxs('label', {
                          className: Dt,
                          children: [
                            'GitLab 项目地址 ',
                            E.jsx('span', { className: Lt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: Pt,
                          placeholder: x.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => u('gitlabUrl', e.target.value),
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsxs('label', {
                          className: Dt,
                          children: [
                            '个人访问令牌 ',
                            E.jsx('span', { className: Lt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: Pt,
                          placeholder: x.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => u('gitlabToken', e.target.value),
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                E.jsxs('div', {
                  className: Mt,
                  children: [
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsxs('label', {
                          className: Dt,
                          children: [
                            'DeepSeek API Key ',
                            E.jsx('span', { className: Lt, children: '*' }),
                          ],
                        }),
                        E.jsx('input', {
                          type: 'text',
                          className: Pt,
                          placeholder: x.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => u('deepseekApiKey', e.target.value),
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsx('label', {
                          className: Dt,
                          children: '使用的模型',
                        }),
                        E.jsxs('select', {
                          className: Ot,
                          value: i.model,
                          onChange: e => u('model', e.target.value),
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
                      className: $t,
                      children: [
                        E.jsx('label', {
                          className: Dt,
                          children: 'Token 数量限制',
                        }),
                        E.jsx('input', {
                          type: 'number',
                          className: Pt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            u('tokenLimit', parseInt(e.target.value)),
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsxs('label', {
                          className: Dt,
                          children: [
                            '默认提示词 ',
                            E.jsx('span', { className: Lt, children: '*' }),
                          ],
                        }),
                        E.jsx('textarea', {
                          className: At,
                          rows: 6,
                          placeholder: x.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => u('defaultPrompt', e.target.value),
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                E.jsxs('div', {
                  className: Mt,
                  children: [
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsx('label', { className: Dt, children: '主题模式' }),
                        E.jsxs('select', {
                          className: Ot,
                          value: r,
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
                          className: Ut,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsx('label', {
                          className: Dt,
                          children: '自动检查更新',
                        }),
                        E.jsxs('div', {
                          className: Ht,
                          children: [
                            E.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: qt,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                u('autoCheckUpdate', e.target.checked),
                            }),
                            E.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: zt,
                              children: E.jsx('span', { className: Xt }),
                            }),
                          ],
                        }),
                        E.jsx('div', {
                          className: Ut,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: $t,
                      children: [
                        E.jsx('label', {
                          className: Dt,
                          children: '检查更新间隔',
                        }),
                        E.jsxs('select', {
                          className: Ot,
                          value: i.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            u('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(i.autoCheckUpdate ?? 1),
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
                          className: Ut,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          E.jsx('div', {
            className: Rt,
            children: E.jsxs('span', { className: Gt, children: ['v', h] }),
          }),
        ],
      }),
    })
  },
  Zt = {
    aiPanel: 'index-module__ai-panel__R0K19',
    dataOverview: 'index-module__data-overview__J-ZoM',
    overviewHeader: 'index-module__overview-header__ae0e8',
    overviewContent: 'index-module__overview-content__dhjh6',
    overviewItem: 'index-module__overview-item__20Ilu',
    overviewLabel: 'index-module__overview-label__k3QHX',
    overviewValue: 'index-module__overview-value__gbEnJ',
    ready: 'index-module__ready__f4MXX',
    waiting: 'index-module__waiting__orgl9',
    resultSection: 'index-module__result-section__esrDe',
    resultHeader: 'index-module__result-header__-sHRM',
    resultTitle: 'index-module__result-title__GYp3Q',
    titleIcon: 'index-module__title-icon__w1Z58',
    resultActions: 'index-module__result-actions__Lwz6b',
    actionBtn: 'index-module__action-btn__X81KS',
    btnIcon: 'index-module__btn-icon__bBkUh',
    resultContent: 'index-module__result-content__NBmXz',
    resultText: 'index-module__result-text__WX-aI',
    resultMeta: 'index-module__result-meta__zAR0J',
    metaLeft: 'index-module__meta-left__G7E6i',
    metaItem: 'index-module__meta-item__Mikx5',
    promptSection: 'index-module__prompt-section__Y1L-1',
    sectionHeader: 'index-module__section-header__WEXG-',
    headerActions: 'index-module__header-actions__phC5-',
    promptEditor: 'index-module__prompt-editor__N6csy',
    promptTextarea: 'index-module__prompt-textarea__ZeYSC',
    promptFooter: 'index-module__prompt-footer__NhJb8',
    charCount: 'index-module__char-count__qSePr',
    expanded: 'index-module__expanded__VY5Zd',
    loadingSection: 'index-module__loading-section__qmhp-',
    loadingSpinner: 'index-module__loading-spinner__FhbKe',
    loadingTips: 'index-module__loading-tips__TN0F6',
    emptyResult: 'index-module__empty-result__D1DxK',
    emptyIcon: 'index-module__empty-icon__RFmRa',
    emptyFeatures: 'index-module__empty-features__Y-XeR',
    featureItem: 'index-module__feature-item__zmC1K',
    featureIcon: 'index-module__feature-icon__aCith',
    fetchProgress: 'index-module__fetch-progress__u65Rg',
    progressHeader: 'index-module__progress-header__hilxF',
    progressBar: 'index-module__progress-bar__upGJZ',
    progressFill: 'index-module__progress-fill__qzGhB',
    progressTip: 'index-module__progress-tip__SZdKA',
    btnPrimary: 'index-module__btn-primary__NTwQw',
    regenerate: 'index-module__regenerate__MPpEF',
    btnText: 'index-module__btn-text__f3PZM',
  },
  Jt = s.memo(
    ({
      visible: e,
      config: t,
      taskType: n,
      onClose: s,
      onGenerate: l,
      isLoading: i,
      selectedEventsCount: o = 0,
      allEventsCount: r = 0,
      dateRange: d,
      onFetchAllEvents: c,
      isAllSelected: _ = !1,
    }) => {
      const u = a.useMemo(() => p[n], [n]),
        [m, h] = a.useState(u.defaultPrompt),
        [x, g] = a.useState(!1),
        [v, j] = a.useState(!1),
        [f, b] = a.useState(!1),
        [N, C] = a.useState(0),
        [k, y] = a.useState(null),
        [w, S] = a.useState(!1),
        [T, I] = a.useState('')
      a.useEffect(() => {
        h(u.defaultPrompt)
      }, [u.defaultPrompt])
      const M = a.useCallback(async () => {
        if (c && !f) {
          b(!0), C(0), I('正在初始化数据获取...'), S(!0)
          try {
            let e
            const t = () => {
              C(t => {
                if (t >= 85) return clearTimeout(e), t
                const a = t + 8 * Math.random()
                return (
                  I(
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
              C(100),
              I(`数据获取完成！共获取 ${a.length} 条事件`),
              y(a),
              setTimeout(() => {
                b(!1), I('')
              }, 1e3)
          } catch (e) {
            console.error('Failed to fetch all events:', e),
              b(!1),
              C(0),
              I('数据获取失败，请稍后重试'),
              setTimeout(() => I(''), 3e3)
          }
        }
      }, [c, f])
      a.useEffect(() => {
        e && _ && !w && c && M()
      }, [e, _, w, c, M])
      const $ = a.useMemo(
          () => !(i || !m.trim()) && (_ && o !== r ? !f && null !== k : o > 0),
          [i, m, _, o, r, f, k],
        ),
        D = a.useCallback(async () => {
          if (null == t ? void 0 : t.result)
            try {
              await navigator.clipboard.writeText(t.result),
                j(!0),
                setTimeout(() => j(!1), 2e3)
            } catch (e) {
              console.error('Failed to copy result:', e)
              const n = document.createElement('textarea')
              ;(n.value = t.result), document.body.appendChild(n), n.select()
              try {
                document.execCommand('copy'),
                  j(!0),
                  setTimeout(() => j(!1), 2e3)
              } catch (a) {
                console.error('Fallback copy also failed:', a)
              }
              document.body.removeChild(n)
            }
        }, [null == t ? void 0 : t.result]),
        L = a.useCallback(() => {
          h(u.defaultPrompt)
        }, [u.defaultPrompt])
      return E.jsx(Ze, {
        visible: e,
        title: u.title,
        width: 800,
        onClose: s,
        maskClosable: !i,
        children: E.jsxs('div', {
          className: Zt.aiPanel,
          children: [
            E.jsxs('div', {
              className: Zt.dataOverview,
              children: [
                E.jsx('div', {
                  className: Zt.overviewHeader,
                  children: E.jsx('h4', { children: '📊 数据概览' }),
                }),
                E.jsxs('div', {
                  className: Zt.overviewContent,
                  children: [
                    E.jsxs('div', {
                      className: Zt.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: Zt.overviewLabel,
                          children: '已选择事件：',
                        }),
                        E.jsxs('span', {
                          className: Zt.overviewValue,
                          children: [_ && k ? k.length : o, ' ', '条'],
                        }),
                      ],
                    }),
                    d &&
                      E.jsxs('div', {
                        className: Zt.overviewItem,
                        children: [
                          E.jsx('span', {
                            className: Zt.overviewLabel,
                            children: '时间范围：',
                          }),
                          E.jsxs('span', {
                            className: Zt.overviewValue,
                            children: [d.startDate, ' 至 ', d.endDate],
                          }),
                        ],
                      }),
                    E.jsxs('div', {
                      className: Zt.overviewItem,
                      children: [
                        E.jsx('span', {
                          className: Zt.overviewLabel,
                          children: '状态：',
                        }),
                        E.jsx('span', {
                          className: `${Zt.overviewValue} ${o > 0 ? Zt.ready : Zt.waiting}`,
                          children: f
                            ? '🔄 获取数据中...'
                            : k
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
            f &&
              E.jsxs('div', {
                className: Zt.fetchProgress,
                children: [
                  E.jsxs('div', {
                    className: Zt.progressHeader,
                    children: [
                      E.jsx('span', { children: T }),
                      E.jsxs('span', { children: [Math.round(N), '%'] }),
                    ],
                  }),
                  E.jsx('div', {
                    className: Zt.progressBar,
                    children: E.jsx('div', {
                      className: Zt.progressFill,
                      style: { width: `${N}%` },
                    }),
                  }),
                  E.jsx('p', {
                    className: Zt.progressTip,
                    children:
                      '正在分批获取事件数据（每批最多100条），请稍候...',
                  }),
                ],
              }),
            E.jsxs('div', {
              className: Zt.promptSection,
              children: [
                E.jsxs('div', {
                  className: Zt.sectionHeader,
                  children: [
                    E.jsx('h3', { children: '提示词' }),
                    E.jsxs('div', {
                      className: Zt.headerActions,
                      children: [
                        E.jsx('button', {
                          className: Zt.btnText,
                          onClick: () => g(!x),
                          children: x ? '收起' : '展开',
                        }),
                        E.jsx('button', {
                          className: Zt.btnText,
                          onClick: L,
                          children: '重置',
                        }),
                      ],
                    }),
                  ],
                }),
                E.jsxs('div', {
                  className: `${Zt.promptEditor} ${x ? Zt.expanded : ''}`,
                  children: [
                    E.jsx('textarea', {
                      className: Zt.promptTextarea,
                      value: m,
                      onChange: e => h(e.target.value),
                      placeholder: u.placeholder,
                      rows: x ? 15 : 6,
                      disabled: i,
                    }),
                    E.jsxs('div', {
                      className: Zt.promptFooter,
                      children: [
                        E.jsxs('span', {
                          className: Zt.charCount,
                          children: [m.length, ' 字符'],
                        }),
                        E.jsx('button', {
                          className: `${Zt.btnPrimary} ${(null == t ? void 0 : t.result) ? Zt.regenerate : ''}`,
                          onClick: () => {
                            $ && l(m)
                          },
                          disabled: i || !m.trim() || 0 === o,
                          children: i
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
            i &&
              E.jsxs('div', {
                className: Zt.loadingSection,
                children: [
                  E.jsx('div', { className: Zt.loadingSpinner }),
                  E.jsx('p', { children: u.loadingText }),
                  E.jsx('div', {
                    className: Zt.loadingTips,
                    children: E.jsx('span', {
                      children: '💡 生成时间通常为 10-30 秒',
                    }),
                  }),
                ],
              }),
            (null == t ? void 0 : t.result) &&
              E.jsxs('div', {
                className: Zt.resultSection,
                children: [
                  E.jsxs('div', {
                    className: Zt.resultHeader,
                    children: [
                      E.jsxs('h3', {
                        className: Zt.resultTitle,
                        children: [
                          E.jsx('span', {
                            className: Zt.titleIcon,
                            children: '✨',
                          }),
                          '生成结果',
                        ],
                      }),
                      E.jsx('div', {
                        className: Zt.resultActions,
                        children: E.jsxs('button', {
                          className: `${Zt.actionBtn} ${v ? Zt.copied : ''}`,
                          onClick: D,
                          title: '一键复制',
                          disabled: v,
                          children: [
                            E.jsx('span', {
                              className: Zt.btnIcon,
                              children: v ? '✅' : '📋',
                            }),
                            v ? '已复制' : '复制',
                          ],
                        }),
                      }),
                    ],
                  }),
                  E.jsx('div', {
                    className: Zt.resultContent,
                    children: E.jsx('div', {
                      className: Zt.resultText,
                      children: t.result,
                    }),
                  }),
                  E.jsx('div', {
                    className: Zt.resultMeta,
                    children: E.jsxs('div', {
                      className: Zt.metaLeft,
                      children: [
                        E.jsx('div', {
                          className: Zt.metaItem,
                          children: E.jsxs('span', {
                            children: [t.result.split('\n').length, ' 行'],
                          }),
                        }),
                        E.jsx('div', {
                          className: Zt.metaItem,
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
              className: Zt.emptyResult,
              children: [
                E.jsx('div', { className: Zt.emptyIcon, children: '🤖' }),
                E.jsx('h3', { children: u.emptyTitle }),
                E.jsx('p', { children: u.emptyDescription }),
                E.jsxs('div', {
                  className: Zt.emptyFeatures,
                  children: [
                    E.jsxs('div', {
                      className: Zt.featureItem,
                      children: [
                        E.jsx('span', {
                          className: Zt.featureIcon,
                          children: '📊',
                        }),
                        E.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: Zt.featureItem,
                      children: [
                        E.jsx('span', {
                          className: Zt.featureIcon,
                          children: '📝',
                        }),
                        E.jsx('span', { children: '自动生成专业内容' }),
                      ],
                    }),
                    E.jsxs('div', {
                      className: Zt.featureItem,
                      children: [
                        E.jsx('span', {
                          className: Zt.featureIcon,
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
  Wt = {
    'event-detail-modal-overlay':
      'EventDetailModal-module__event-detail-modal-overlay__kSKR4',
    eventDetailModalOverlay:
      'EventDetailModal-module__event-detail-modal-overlay__kSKR4',
    'fade-in': 'EventDetailModal-module__fade-in__gcFok',
    fadeIn: 'EventDetailModal-module__fade-in__gcFok',
    'event-detail-modal': 'EventDetailModal-module__event-detail-modal__mBc4j',
    eventDetailModal: 'EventDetailModal-module__event-detail-modal__mBc4j',
    'modal-slide-in': 'EventDetailModal-module__modal-slide-in__wtFi2',
    modalSlideIn: 'EventDetailModal-module__modal-slide-in__wtFi2',
    'modal-header': 'EventDetailModal-module__modal-header__YHEvM',
    modalHeader: 'EventDetailModal-module__modal-header__YHEvM',
    'close-btn': 'EventDetailModal-module__close-btn__0KmQE',
    closeBtn: 'EventDetailModal-module__close-btn__0KmQE',
    'modal-content': 'EventDetailModal-module__modal-content__V4tyk',
    modalContent: 'EventDetailModal-module__modal-content__V4tyk',
    'detail-section': 'EventDetailModal-module__detail-section__09YJG',
    detailSection: 'EventDetailModal-module__detail-section__09YJG',
    compact: 'EventDetailModal-module__compact__GlU0K',
    'detail-grid': 'EventDetailModal-module__detail-grid__lP-Rl',
    detailGrid: 'EventDetailModal-module__detail-grid__lP-Rl',
    'detail-content': 'EventDetailModal-module__detail-content__b-wBI',
    detailContent: 'EventDetailModal-module__detail-content__b-wBI',
    'project-info': 'EventDetailModal-module__project-info__BF-ji',
    projectInfo: 'EventDetailModal-module__project-info__BF-ji',
    'push-info': 'EventDetailModal-module__push-info__CiBtf',
    pushInfo: 'EventDetailModal-module__push-info__CiBtf',
    'compact-content': 'EventDetailModal-module__compact-content__Zl-xn',
    compactContent: 'EventDetailModal-module__compact-content__Zl-xn',
    'compact-project': 'EventDetailModal-module__compact-project__W-Pxu',
    compactProject: 'EventDetailModal-module__compact-project__W-Pxu',
    'compact-author': 'EventDetailModal-module__compact-author__bJeyL',
    compactAuthor: 'EventDetailModal-module__compact-author__bJeyL',
    'detail-item': 'EventDetailModal-module__detail-item__gTUiL',
    detailItem: 'EventDetailModal-module__detail-item__gTUiL',
    label: 'EventDetailModal-module__label__q-vpJ',
    value: 'EventDetailModal-module__value__U4voT',
    'action-badge': 'EventDetailModal-module__action-badge__Bxghx',
    actionBadge: 'EventDetailModal-module__action-badge__Bxghx',
    'status-badge': 'EventDetailModal-module__status-badge__mP8CY',
    statusBadge: 'EventDetailModal-module__status-badge__mP8CY',
    'status-opened': 'EventDetailModal-module__status-opened__0o3-j',
    statusOpened: 'EventDetailModal-module__status-opened__0o3-j',
    'status-closed': 'EventDetailModal-module__status-closed__axB54',
    statusClosed: 'EventDetailModal-module__status-closed__axB54',
    'status-merged': 'EventDetailModal-module__status-merged__jrAZc',
    statusMerged: 'EventDetailModal-module__status-merged__jrAZc',
    'commit-hash': 'EventDetailModal-module__commit-hash__T82Gy',
    commitHash: 'EventDetailModal-module__commit-hash__T82Gy',
    labels: 'EventDetailModal-module__labels__FfkpP',
    'label-tag': 'EventDetailModal-module__label-tag__1eJTi',
    labelTag: 'EventDetailModal-module__label-tag__1eJTi',
    'author-info': 'EventDetailModal-module__author-info__QU8GM',
    authorInfo: 'EventDetailModal-module__author-info__QU8GM',
    'author-avatar': 'EventDetailModal-module__author-avatar__UktK4',
    authorAvatar: 'EventDetailModal-module__author-avatar__UktK4',
    'author-details': 'EventDetailModal-module__author-details__CSNcN',
    authorDetails: 'EventDetailModal-module__author-details__CSNcN',
    'author-name': 'EventDetailModal-module__author-name__Aop-h',
    authorName: 'EventDetailModal-module__author-name__Aop-h',
    'author-username': 'EventDetailModal-module__author-username__7f29y',
    authorUsername: 'EventDetailModal-module__author-username__7f29y',
    'author-link': 'EventDetailModal-module__author-link__qdJ8G',
    authorLink: 'EventDetailModal-module__author-link__qdJ8G',
    'note-info': 'EventDetailModal-module__note-info__xsh-2',
    noteInfo: 'EventDetailModal-module__note-info__xsh-2',
    'note-body': 'EventDetailModal-module__note-body__h5kYR',
    noteBody: 'EventDetailModal-module__note-body__h5kYR',
    'note-meta': 'EventDetailModal-module__note-meta__CSOAr',
    noteMeta: 'EventDetailModal-module__note-meta__CSOAr',
    'modal-footer': 'EventDetailModal-module__modal-footer__bMVTG',
    modalFooter: 'EventDetailModal-module__modal-footer__bMVTG',
    'source-link-btn': 'EventDetailModal-module__source-link-btn__lCMP7',
    sourceLinkBtn: 'EventDetailModal-module__source-link-btn__lCMP7',
    'close-modal-btn': 'EventDetailModal-module__close-modal-btn__u4I23',
    closeModalBtn: 'EventDetailModal-module__close-modal-btn__u4I23',
    app: 'EventDetailModal-module__app__GneYG',
    dark: 'EventDetailModal-module__dark__4O-jE',
  },
  Yt = ({ event: e, visible: t, onClose: a }) => {
    if (!t || !e) return null
    const n = e =>
        new Date(e).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      s = () => {
        var t, a
        if (!e.project && !e.project_id) return ''
        const n = 'https://www.lejuhub.com'
        if (!e.project) return n
        const s = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${n}/${s}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${n}/${s}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${n}/${s}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${n}/${s}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (a = e.note) ? void 0 : a.noteable_type)
                ? `${n}/${s}/-/merge_requests/${e.note.noteable_iid}`
                : `${n}/${s}`
          default:
            return `${n}/${s}`
        }
      }
    return E.jsx('div', {
      className: Wt.eventDetailModalOverlay,
      onClick: a,
      children: E.jsxs('div', {
        className: Wt.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          E.jsxs('div', {
            className: Wt.modalHeader,
            children: [
              E.jsx('h2', { children: '事件详情' }),
              E.jsx('button', {
                className: Wt.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          E.jsxs('div', {
            className: Wt.modalContent,
            children: [
              E.jsxs('div', {
                className: `${Wt.detailSection} ${Wt.compact}`,
                children: [
                  E.jsx('h3', { children: '基本信息' }),
                  E.jsxs('div', {
                    className: `${Wt.detailGrid} ${Wt.compactGrid}`,
                    children: [
                      E.jsxs('div', {
                        className: Wt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Wt.label,
                            children: 'ID:',
                          }),
                          E.jsx('span', {
                            className: Wt.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: Wt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Wt.label,
                            children: '类型:',
                          }),
                          E.jsx('span', {
                            className: Wt.value,
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
                        className: Wt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Wt.label,
                            children: '操作:',
                          }),
                          E.jsx('span', {
                            className: `${Wt.value} ${Wt.actionBadge}`,
                            children:
                              ((l = e.action_name),
                              {
                                opened: '开启',
                                closed: '关闭',
                                merged: '合并',
                                'pushed new': '推送新分支',
                                'pushed to': '推送到分支',
                                'commented on': '评论',
                                joined: '加入',
                              }[l] || l),
                          }),
                        ],
                      }),
                      E.jsxs('div', {
                        className: Wt.detailItem,
                        children: [
                          E.jsx('span', {
                            className: Wt.label,
                            children: '时间:',
                          }),
                          E.jsx('span', {
                            className: Wt.value,
                            children: n(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        E.jsxs('div', {
                          className: Wt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Wt.label,
                              children: '状态:',
                            }),
                            E.jsx('span', {
                              className: `${Wt.value} ${Wt.statusBadge} ${Wt[`status-${e.state}`]}`,
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
                  className: `${Wt.detailSection} ${Wt.compact}`,
                  children: [
                    E.jsx('h3', { children: '内容' }),
                    E.jsxs('div', {
                      className: `${Wt.detailContent} ${Wt.compactContent}`,
                      children: [
                        e.title &&
                          E.jsxs('div', {
                            className: Wt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Wt.label,
                                children: '标题:',
                              }),
                              E.jsx('span', {
                                className: Wt.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          E.jsxs('div', {
                            className: Wt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Wt.label,
                                children: '目标:',
                              }),
                              E.jsx('span', {
                                className: Wt.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          E.jsxs('div', {
                            className: Wt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Wt.label,
                                children: '标签:',
                              }),
                              E.jsx('div', {
                                className: Wt.labels,
                                children: e.labels.map((e, t) =>
                                  E.jsx(
                                    'span',
                                    { className: Wt.labelTag, children: e },
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
                  className: `${Wt.detailSection} ${Wt.compact}`,
                  children: [
                    E.jsx('h3', { children: '作者' }),
                    E.jsxs('div', {
                      className: `${Wt.authorInfo} ${Wt.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          E.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: Wt.authorAvatar,
                          }),
                        E.jsxs('div', {
                          className: Wt.authorDetails,
                          children: [
                            E.jsx('div', {
                              className: Wt.authorName,
                              children: e.author.name,
                            }),
                            E.jsxs('div', {
                              className: Wt.authorUsername,
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
                  className: `${Wt.detailSection} ${Wt.compact}`,
                  children: [
                    E.jsx('h3', { children: '项目' }),
                    E.jsx('div', {
                      className: `${Wt.projectInfo} ${Wt.compactProject}`,
                      children: e.project
                        ? E.jsxs(E.Fragment, {
                            children: [
                              E.jsxs('div', {
                                className: Wt.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: Wt.label,
                                    children: '名称:',
                                  }),
                                  E.jsx('span', {
                                    className: Wt.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              E.jsxs('div', {
                                className: Wt.detailItem,
                                children: [
                                  E.jsx('span', {
                                    className: Wt.label,
                                    children: '路径:',
                                  }),
                                  E.jsx('span', {
                                    className: Wt.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : E.jsxs('div', {
                            className: Wt.detailItem,
                            children: [
                              E.jsx('span', {
                                className: Wt.label,
                                children: '项目ID:',
                              }),
                              E.jsx('span', {
                                className: Wt.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                E.jsxs('div', {
                  className: Wt.detailSection,
                  children: [
                    E.jsx('h3', { children: '推送信息' }),
                    E.jsxs('div', {
                      className: Wt.pushInfo,
                      children: [
                        E.jsxs('div', {
                          className: Wt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Wt.label,
                              children: '分支:',
                            }),
                            E.jsx('span', {
                              className: Wt.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Wt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Wt.label,
                              children: '提交数量:',
                            }),
                            E.jsx('span', {
                              className: Wt.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Wt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Wt.label,
                              children: '提交标题:',
                            }),
                            E.jsx('span', {
                              className: Wt.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        E.jsxs('div', {
                          className: Wt.detailItem,
                          children: [
                            E.jsx('span', {
                              className: Wt.label,
                              children: '提交哈希:',
                            }),
                            E.jsx('span', {
                              className: `${Wt.value} ${Wt.commitHash}`,
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
                  className: Wt.detailSection,
                  children: [
                    E.jsx('h3', { children: '评论信息' }),
                    E.jsxs('div', {
                      className: Wt.noteInfo,
                      children: [
                        E.jsx('div', {
                          className: Wt.noteBody,
                          children: e.note.body,
                        }),
                        E.jsxs('div', {
                          className: Wt.noteMeta,
                          children: [
                            E.jsxs('span', {
                              children: ['创建时间: ', n(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              E.jsxs('span', {
                                children: ['更新时间: ', n(e.note.updated_at)],
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
            className: Wt.modalFooter,
            children: [
              s() &&
                E.jsx('a', {
                  href: s(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: Wt.sourceLinkBtn,
                  children: '打开源页面',
                }),
              E.jsx('button', {
                className: Wt.closeModalBtn,
                onClick: a,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var l
  },
  ea = 'App-module__app__ZYOJd',
  ta = 'App-module__web-mode__2hnFp',
  aa = 'App-module__userscript-mode__5Dbvp',
  na = ({ isUserscript: e = !1 }) => {
    const {
        state: t,
        updateConfig: n,
        setTheme: s,
        setActivePanel: l,
        setAppMode: i,
        setProjects: o,
        updateFilterConditions: r,
        updateSortOptions: d,
        updatePaginationOptions: _,
        setEvents: m,
        setTotal: h,
        setAIGenerationConfig: p,
        setLoading: x,
        setError: g,
        isConfigValid: v,
        getTimeRange: j,
      } = $(),
      {
        createRequest: f,
        isRequestCancelled: b,
        cleanupRequest: N,
        isAbortError: C,
      } = D(),
      k = a.useMemo(
        () => le(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [y, w] = a.useState(null),
      [S, T] = a.useState(!1),
      [M, L] = a.useState([]),
      [P, O] = a.useState({
        selectedEventIds: [],
        isAllEventsSelected: !1,
        totalCount: 0,
        events: [],
      }),
      A = a.useMemo(
        () => ('events' === t.appMode ? M : P.selectedEventIds),
        [t.appMode, M, P.selectedEventIds],
      ),
      U = a.useCallback(
        e => {
          'events' === t.appMode && L(e)
        },
        [t.appMode],
      ),
      R = a.useMemo(
        () =>
          'system' === t.theme
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : t.theme,
        [t.theme],
      )
    a.useEffect(() => {
      if (
        ((document.body.className = document.body.className
          .replace(/\b(light|dark)\b/g, '')
          .trim()),
        document.body.classList.add(R),
        'system' === t.theme)
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
    }, [t.theme, R])
    const G = a.useCallback(async () => {
      var e, a
      if (!v()) return void g(c.INVALID_FILTER_OR_CONFIG)
      const n = f()
      x(!0), g(null)
      try {
        await k.init()
        const { startDate: s, endDate: l } = j(),
          i =
            (null == (e = t.filterConditions.targetType) ? void 0 : e.length) >
            0
              ? t.filterConditions.targetType
              : void 0,
          o =
            (null == (a = t.filterConditions.action) ? void 0 : a.length) > 0
              ? t.filterConditions.action
              : void 0,
          r = t.sortOptions.order || 'desc',
          d = await k.getCurrentUser(),
          c = {
            after: s,
            before: l,
            target_type: i,
            action: o,
            page: t.paginationOptions.page,
            per_page: t.paginationOptions.pageSize,
            sort: r,
            signal: n.signal,
          },
          { events: _, total: u } = await k.getUserEventsWithTotal(d.id, c)
        if (b(n)) return
        m(_), L(e => (1 === e.length && 0 === e[0] ? e : [])), h(u)
      } catch (s) {
        if (C(s)) return
        const e = u.formatErrorMessage(s)
        g(e), m([]), h(0)
      } finally {
        b(n) || x(!1), N(n)
      }
    }, [
      t.paginationOptions.page,
      t.paginationOptions.pageSize,
      t.sortOptions,
      t.filterConditions,
      j,
      m,
      h,
      x,
      g,
      v,
      k,
      f,
      b,
      C,
      N,
    ])
    a.useEffect(() => {
      v() && G()
    }, [v, G])
    const B = a.useCallback(() => {
        l('settings')
      }, [l]),
      F = a.useCallback(() => {
        l('main')
      }, [l]),
      V = a.useCallback(
        (e, t) => {
          n(e), s(t)
        },
        [n, s],
      ),
      H = a.useCallback(() => {
        v() ? l('ai') : g(c.INCOMPLETE_GITLAB_DEEPSEEK)
      }, [v, g, l]),
      q = a.useCallback(() => {
        l('main')
      }, [l]),
      z = a.useCallback(async () => {
        if (!v()) throw new Error('配置不完整')
        const { createGitLabApiService: e } = await I(
            async () => {
              const { createGitLabApiService: e } =
                await Promise.resolve().then(() => ie)
              return { createGitLabApiService: e }
            },
            void 0,
          ),
          a = e(t.config.gitlabUrl, t.config.gitlabToken)
        await a.init()
        let n = []
        const s = 100
        let l = 1,
          i = !0
        if ('events' === t.appMode) {
          const e = await a.getCurrentUser()
          for (; i; ) {
            const { events: o, total: r } = await a.getUserEventsWithTotal(
              e.id,
              {
                per_page: s,
                page: l,
                after: j().startDate,
                before: j().endDate,
                sort: t.sortOptions.order,
              },
            )
            if (
              ((n = [...n, ...o]),
              (i = o.length === s && n.length < r),
              l++,
              l > 100)
            )
              break
          }
        } else if ('changelog' === t.appMode && t.selectedProjectId)
          for (; i; ) {
            const { events: e, total: o } = await a.getProjectEventsWithTotal(
              t.selectedProjectId,
              { per_page: s, page: l, sort: t.sortOptions.order },
            )
            if (
              ((n = [...n, ...e]),
              (i = e.length === s && n.length < o),
              l++,
              l > 100)
            )
              break
          }
        return n
      }, [
        v,
        t.config.gitlabUrl,
        t.config.gitlabToken,
        t.appMode,
        t.sortOptions.order,
        t.selectedProjectId,
        j,
      ]),
      X = a.useCallback(
        e => {
          U(e ? [0] : [])
        },
        [U],
      ),
      K = a.useMemo(
        () =>
          'events' === t.appMode
            ? M.includes(-1) && t.totalCount > 0
            : P.isAllEventsSelected,
        [t.appMode, M, t.totalCount, P.isAllEventsSelected],
      ),
      Q = a.useMemo(
        () =>
          'events' === t.appMode
            ? M.includes(-1)
              ? t.totalCount
              : M.filter(e => -1 !== e).length
            : P.isAllEventsSelected
              ? P.totalCount
              : P.selectedEventIds.length,
        [t.appMode, M, t.totalCount, P],
      ),
      Z = a.useCallback(
        e => {
          O(e)
        },
        [O],
      ),
      J = a.useCallback(
        async e => {
          if (v())
            if (0 !== A.length) {
              x(!0), g(null)
              try {
                let a
                a = K
                  ? await z()
                  : 'events' === t.appMode
                    ? t.events.filter(e => A.includes(e.id))
                    : P.events.filter(e => A.includes(e.id))
                const n =
                    'changelog' === t.appMode ? 'changelog' : 'weekly-report',
                  s = a
                    .map(e => {
                      var t
                      return `${new Date(e.created_at).toLocaleDateString('zh-CN')} - ${e.action_name}: ${e.target_title || (null == (t = e.push_data) ? void 0 : t.commit_title) || '无标题'}`
                    })
                    .join('\n'),
                  { createDeepSeekApiService: l } = await I(
                    async () => {
                      const { createDeepSeekApiService: e } = await import(
                        './deepseek-api-CULIwh4S.js'
                      )
                      return { createDeepSeekApiService: e }
                    },
                    __vite__mapDeps([0, 1]),
                  ),
                  i = l(t.config.deepseekApiKey),
                  o = await i.generateWeeklyReport(
                    s,
                    e,
                    t.config.model,
                    t.config.tokenLimit,
                  )
                p({
                  taskType: n,
                  prompt: e,
                  tokensUsed: o.tokensUsed,
                  result: o.content,
                }),
                  x(!1)
              } catch (a) {
                const e = u.formatErrorMessage(a)
                g(e), x(!1)
              }
            } else g(c.NO_EVENTS_SELECTED)
          else g(c.INCOMPLETE_CONFIG)
        },
        [
          v,
          A,
          K,
          z,
          t.events,
          t.appMode,
          t.config.deepseekApiKey,
          t.config.model,
          t.config.tokenLimit,
          P.events,
          g,
          x,
          p,
        ],
      ),
      W = a.useCallback(
        e => {
          _(e)
        },
        [_],
      ),
      Y = a.useCallback(
        e => {
          r(e)
        },
        [r],
      ),
      ee = a.useCallback(
        e => {
          d(e)
        },
        [d],
      ),
      te = a.useCallback(
        (e, t) => {
          console.log('App: 处理选择状态变更', {
            selectedIds: e,
            isFullSelection: t,
          }),
            U(t ? [-1] : e)
        },
        [U],
      ),
      ae = a.useCallback(
        e => {
          const a = K || M.includes(e)
          if (K) {
            if (a) {
              const a = t.events.filter(t => t.id !== e).map(e => e.id)
              U(a)
            }
          } else U(t => (a ? t.filter(t => t !== e) : [...t, e]))
        },
        [K, M, t.events, U],
      ),
      ne = a.useCallback(e => {
        w(e), T(!0)
      }, []),
      se = a.useCallback(() => {
        T(!1), w(null)
      }, []),
      oe = a.useCallback(async () => {
        if (v()) {
          x(!0), g(null)
          try {
            await k.init()
            const e = await k.getProjects({
              membership: !0,
              per_page: 100,
              starred: !1,
              simple: !0,
              order_by: 'last_activity_at',
              search: '',
            })
            o(e)
          } catch (e) {
            const t = u.formatErrorMessage(e)
            g(t), o([])
          } finally {
            x(!1)
          }
        } else g(c.INVALID_FILTER_OR_CONFIG)
      }, [k, v, o, x, g]),
      re = a.useCallback(
        async e => {
          i(e), 'changelog' === e ? await oe() : v() && G()
        },
        [i, oe, v, G],
      )
    return E.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${ea} ${e ? aa : ta}`,
      children: [
        E.jsx(Be, {
          appMode: t.appMode,
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: A,
          onModeChange: re,
          onFilterChange: Y,
          onSortChange: ee,
          onPaginationChange: W,
          onEventSelect: ae,
          onSelectAll: X,
          onSelectionChange: te,
          onEventDetail: ne,
          onOpenSettings: B,
          onOpenAI: H,
          isAllEventsSelected: K,
          onChangelogStateChange: Z,
        }),
        E.jsx(Yt, { event: y, visible: S, onClose: se }),
        E.jsx(Qt, {
          isOpen: 'settings' === t.activePanel,
          config: t.config,
          theme: t.theme,
          onClose: F,
          onSave: V,
        }),
        'ai' === t.activePanel &&
          E.jsx(Jt, {
            visible: 'ai' === t.activePanel,
            config: t.aiGenerationConfig,
            taskType: 'changelog' === t.appMode ? 'changelog' : 'weekly-report',
            onClose: q,
            onGenerate: J,
            isLoading: t.isLoading,
            selectedEventsCount: Q,
            allEventsCount:
              'events' === t.appMode ? t.totalCount : P.totalCount,
            dateRange: j(),
            onFetchAllEvents: z,
            isAllSelected: K,
          }),
      ],
    })
  }
w.createRoot(document.getElementById('root')).render(
  E.jsx(s.StrictMode, { children: E.jsx(na, {}) }),
)
