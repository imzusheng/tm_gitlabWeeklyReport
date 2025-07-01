const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-C_n0SEmw.js', 'assets/utils-pgl7yu4t.js']),
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
  c as d,
  s as r,
  d as c,
  r as _,
  E as m,
  A as u,
  e as p,
  C as h,
} from './utils-pgl7yu4t.js'
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
var x = { exports: {} },
  v = {},
  g = a,
  j = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  f = Object.prototype.hasOwnProperty,
  N = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  C = { key: !0, ref: !0, __self: !0, __source: !0 }
function k(e, t, a) {
  var n,
    s = {},
    l = null,
    i = null
  for (n in (void 0 !== a && (l = '' + a),
  void 0 !== t.key && (l = '' + t.key),
  void 0 !== t.ref && (i = t.ref),
  t))
    f.call(t, n) && !C.hasOwnProperty(n) && (s[n] = t[n])
  if (e && e.defaultProps)
    for (n in (t = e.defaultProps)) void 0 === s[n] && (s[n] = t[n])
  return { $$typeof: j, type: e, key: l, ref: i, props: s, _owner: N.current }
}
;(v.Fragment = b), (v.jsx = k), (v.jsxs = k), (x.exports = v)
var y = x.exports,
  E = {},
  w = n
;(E.createRoot = w.createRoot), (E.hydrateRoot = w.hydrateRoot)
const M = {},
  T = {
    config: d,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: d.theme,
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
function D() {
  const [e, t] = a.useState(T)
  a.useEffect(() => {
    ;(async () => {
      try {
        const e = await r.loadConfig(),
          a = e ? { ...d, ...e } : d
        t(e => ({ ...e, config: a, theme: a.theme || d.theme }))
      } catch (e) {
        console.error('Failed to load saved config:', e),
          t(e => ({ ...e, config: d, theme: d.theme }))
      }
    })()
  }, [])
  const n = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, ...e }
        try {
          r.saveConfig(a)
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
    m = a.useCallback(e => {
      t(t => ({ ...t, sortOptions: e }))
    }, []),
    u = a.useCallback(e => {
      t(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
    }, []),
    p = a.useCallback(e => {
      t(t => ({ ...t, events: e }))
    }, []),
    h = a.useCallback(e => {
      t(t => ({
        ...t,
        totalCount: e,
        paginationOptions: { ...t.paginationOptions, total: e },
      }))
    }, []),
    x = a.useCallback(e => {
      t(t => ({ ...t, aiGenerationConfig: e }))
    }, []),
    v = a.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    g = a.useCallback(e => {
      t(t => ({ ...t, error: e }))
    }, []),
    j = a.useCallback(e => {
      t(t => ({ ...t, reportData: e }))
    }, []),
    b = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, theme: e }
        try {
          r.saveConfig(a)
        } catch (n) {
          console.error('Failed to save theme:', n)
        }
        return { ...t, config: a, theme: e }
      })
    }, []),
    f = a.useCallback(() => {
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
          r.saveConfig(a)
        } catch (n) {
          console.error('Failed to save theme:', n)
        }
        return { ...e, config: a, theme: t }
      })
    }, []),
    N = a.useCallback(() => {
      t(T), r.clearConfig()
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
    updateSortOptions: m,
    updatePaginationOptions: u,
    setEvents: p,
    setTotal: h,
    setAIGenerationConfig: x,
    setLoading: v,
    setError: g,
    setReportData: j,
    setTheme: b,
    toggleTheme: f,
    resetState: N,
    isConfigValid: C,
    getTimeRange: k,
  }
}
const S = () => {
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
  $ = 'index-module__filter-section-content__y5rEz',
  I = 'index-module__filter-group__5B49Z',
  A = 'index-module__filter-label__kgsrz',
  L = 'index-module__filter-options__83wOv',
  O = 'index-module__filter-option__SG0B9',
  P = 'index-module__active__IQgMz',
  R = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  G = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  U = [
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
  F = ({ filterConditions: e, onFilterChange: t }) => {
    const a = (a, n) => {
        t({ ...e, [a]: n })
      },
      n = [
        { key: 'targetType', label: '目标类型', options: G },
        { key: 'action', label: '操作类型', options: U },
      ]
    return y.jsxs('div', {
      className: $,
      children: [
        y.jsxs('div', {
          className: I,
          children: [
            y.jsx('label', { className: A, children: '时间范围' }),
            y.jsx('div', {
              className: L,
              children: R.map(({ value: t, label: n }) =>
                y.jsx(
                  'button',
                  {
                    className: `${O} ${e.timeRange === t ? P : ''}`,
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
          y.jsxs(
            'div',
            {
              className: I,
              children: [
                y.jsx('label', { className: A, children: n }),
                y.jsxs('div', {
                  className: L,
                  children: [
                    y.jsx('button', {
                      className: `${O} ${0 === e[t].length ? P : ''}`,
                      onClick: () => a(t, []),
                      children: '全部',
                    }),
                    s.map(({ value: n, label: s }) =>
                      y.jsx(
                        'button',
                        {
                          className: `${O} ${Array.isArray(e[t]) && e[t].includes(n) ? P : ''}`,
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
  q = 'index-module__pagination__5dauU',
  z = 'index-module__pagination-info__xbUbw',
  B = 'index-module__pagination-controls__q2hqL',
  V = 'index-module__pagination-btn__P1OCG',
  H = 'index-module__disabled__BywdX',
  X = 'index-module__active__lSJu-',
  Q = 'index-module__pagination-ellipsis__gQnax',
  Z = 'index-module__pagination-size-changer__SufyI',
  K = 'index-module__pagination-select__JwvbH',
  Y = ({
    current: e,
    pageSize: t,
    total: a,
    onChange: n,
    showSizeChanger: l = !0,
    pageSizeOptions: i = [20, 50, 100, 200],
    onShowSizeChange: o,
    selectedCount: d = 0,
  }) => {
    const r = Math.ceil(a / t),
      c = (e - 1) * t + 1,
      _ = Math.min(e * t, a),
      m = t => {
        t >= 1 && t <= r && t !== e && n(t)
      }
    return 0 === a
      ? y.jsx('div', {
          className: q,
          children: y.jsx('div', { className: z, children: '暂无数据' }),
        })
      : y.jsxs('div', {
          className: q,
          children: [
            y.jsxs('div', {
              className: z,
              children: [
                '显示 ',
                c,
                '-',
                _,
                ' 条，共 ',
                a,
                ' 条',
                d > 0 ? `，已选中 ${d} 条` : '',
              ],
            }),
            y.jsxs('div', {
              className: B,
              children: [
                y.jsx('button', {
                  className: `${V} ${1 === e ? H : ''}`,
                  onClick: () => m(e - 1),
                  disabled: 1 === e,
                  children: y.jsx('span', { children: '‹' }),
                }),
                (() => {
                  if (r <= 7) return Array.from({ length: r }, (e, t) => t + 1)
                  const t = [1],
                    a = Math.max(2, e - 2),
                    n = Math.min(r - 1, e + 2)
                  e > 4 && t.push('...')
                  for (let e = a; e <= n; e++) t.push(e)
                  return e < r - 2 - 1 && t.push('...'), t.push(r), t
                })().map((t, a) =>
                  y.jsx(
                    s.Fragment,
                    {
                      children:
                        'number' == typeof t
                          ? y.jsx('button', {
                              className: `${V} ${e === t ? X : ''}`,
                              onClick: () => m(t),
                              children: t,
                            })
                          : y.jsx('span', { className: Q, children: t }),
                    },
                    a,
                  ),
                ),
                y.jsx('button', {
                  className: `${V} ${e === r ? H : ''}`,
                  onClick: () => m(e + 1),
                  disabled: e === r,
                  children: y.jsx('span', { children: '›' }),
                }),
              ],
            }),
            l &&
              y.jsxs('div', {
                className: Z,
                children: [
                  y.jsx('span', { children: '每页' }),
                  y.jsx('select', {
                    value: t,
                    onChange: e => {
                      return (t = Number(e.target.value)), void (o && o(1, t))
                      var t
                    },
                    className: K,
                    children: i.map(e =>
                      y.jsx('option', { value: e, children: e }, e),
                    ),
                  }),
                  y.jsx('span', { children: '条' }),
                ],
              }),
          ],
        })
  },
  J = 'index-module__events-list__-m-9O',
  W = 'index-module__events-list-header__IFdcr',
  ee = 'index-module__header-cell__Q50BV',
  te = 'index-module__checkbox-cell__fFp2c',
  ae = 'index-module__content-cell__XX9h3',
  ne = 'index-module__action-cell__cQC45',
  se = 'index-module__time-cell__MQe22',
  le = 'index-module__detail-cell__zq1IN',
  ie = 'index-module__sort-icon__tSSwt',
  oe = 'index-module__events-list-body__QknuZ',
  de = 'index-module__event-row__nD7Rz',
  re = 'index-module__selected__QNHpl',
  ce = 'index-module__cell__KsOts',
  _e = 'index-module__event-icon__9UCQ3',
  me = 'index-module__event-content__YCPED',
  ue = 'index-module__event-title__530MV',
  pe = 'index-module__event-description__C3Fjc',
  he = 'index-module__action-tag__GZU05',
  xe = 'index-module__event-time__1VIXa',
  ve = 'index-module__detail-btn__Q5YpF',
  ge = 'index-module__detail-icon__E5Shy',
  je = 'index-module__empty-state__ohnRa',
  be = 'index-module__empty-icon__OXdkI',
  fe = 'index-module__events-list-footer__bR9Gm',
  Ne = 'index-module__events-list-loading__e6mCh',
  Ce = 'index-module__loading-spinner__C04N8',
  ke = 'index-module__checkbox-container__UxYEH',
  ye = 'index-module__checkmark__-Dj1c',
  Ee = ({
    events: e,
    totalCount: t,
    loading: a,
    sortOptions: n,
    onSortChange: s,
    paginationOptions: l,
    onPaginationChange: i,
    selectedEventIds: o,
    onEventSelect: d,
    onSelectAll: r,
    onEventDetail: _,
  }) => {
    const m = e.length > 0 && e.every(e => o.includes(e.id)),
      u = o.length > 0 && !m,
      p = e => {
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
      },
      h = e => {
        if (e.push_data) return `推送到分支 ${e.push_data.ref}`
        if (e.note) {
          const t = 50
          return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
        }
        return 'joined' === e.action_name
          ? '加入项目'
          : e.title || e.target_title || '无标题'
      },
      x = e => {
        var t
        return e.push_data
          ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
          : e.note && e.target_title
            ? e.target_title
            : (null == (t = e.project) ? void 0 : t.path_with_namespace) ||
              `项目ID: ${e.project_id}` ||
              '未知项目'
      }
    return a
      ? y.jsxs('div', {
          className: Ne,
          children: [
            y.jsx('div', { className: Ce }),
            y.jsx('p', { children: '正在加载事件数据...' }),
          ],
        })
      : y.jsxs('div', {
          className: J,
          children: [
            y.jsxs('div', {
              className: W,
              children: [
                y.jsx('div', {
                  className: `${ee} ${te}`,
                  children: y.jsxs('label', {
                    className: ke,
                    children: [
                      y.jsx('input', {
                        type: 'checkbox',
                        checked: m,
                        ref: e => {
                          e && (e.indeterminate = u)
                        },
                        onChange: () => {
                          r(!m)
                        },
                        title: m ? '取消全选' : '全选',
                      }),
                      y.jsx('span', { className: ye }),
                    ],
                  }),
                }),
                y.jsx('div', {
                  className: `${ee} ${ae}`,
                  children: y.jsx('span', { children: '标题和内容' }),
                }),
                y.jsx('div', {
                  className: `${ee} ${ne}`,
                  children: y.jsx('span', { children: '操作' }),
                }),
                y.jsxs('div', {
                  className: `${ee} ${se}`,
                  onClick: () =>
                    (e => {
                      const t =
                        n.field === e && 'desc' === n.order ? 'asc' : 'desc'
                      s({ field: e, order: t })
                    })('created_at'),
                  children: [
                    y.jsx('span', { children: '时间' }),
                    y.jsx('span', {
                      className: ie,
                      children:
                        ((v = 'created_at'),
                        n.field !== v ? '' : 'desc' === n.order ? '↓' : '↑'),
                    }),
                  ],
                }),
                y.jsx('div', { className: `${ee} ${le}`, children: '详情' }),
              ],
            }),
            y.jsx('div', {
              className: oe,
              children:
                0 === e.length
                  ? y.jsxs('div', {
                      className: je,
                      children: [
                        y.jsx('div', { className: be, children: '📄' }),
                        y.jsx('p', { children: '暂无事件数据' }),
                        y.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
                      ],
                    })
                  : e.map(e => {
                      const t = o.includes(e.id),
                        {
                          icon: a,
                          title: n,
                          actionType: s,
                        } = (e => {
                          const { action_name: t, target_type: a } = e
                          if (e.push_data) {
                            const {
                              action: t,
                              ref_type: a,
                              ref: n,
                            } = e.push_data
                            if ('pushed' === t) {
                              if ('branch' === a)
                                return {
                                  icon: '⬆️',
                                  actionType: '分支推送',
                                  title: `推送到分支 ${n}`,
                                }
                              if ('tag' === a)
                                return {
                                  icon: '🏷️',
                                  actionType: '标签推送',
                                  title: `推送标签 ${n}`,
                                }
                            }
                            return {
                              icon: '📤',
                              actionType: '推送',
                              title: `推送到分支 ${n}`,
                            }
                          }
                          const n = h(e),
                            s = {
                              MergeRequest: { icon: '⤴️', actionType: 'MR' },
                              Issue: { icon: '⚠️', actionType: 'Issue' },
                              Commit: { icon: '💾', actionType: '提交' },
                              Note: { icon: '💬', actionType: '评论' },
                              DiscussionNote: {
                                icon: '🗣️',
                                actionType: '讨论-评论',
                              },
                              DiffNote: { icon: '📝', actionType: '代码-评论' },
                              Project: { icon: '📁', actionType: '项目' },
                              Milestone: { icon: '🎯', actionType: '里程碑' },
                              Epic: { icon: '🎪', actionType: 'Epic' },
                              Snippet: { icon: '✂️', actionType: '代码片段' },
                              User: { icon: '👤', actionType: '用户' },
                              'pushed to': { icon: '⬆️', actionType: '推送' },
                              'pushed new': {
                                icon: '⬆️',
                                actionType: '推送新分支',
                              },
                              opened: { icon: '🆕', actionType: '开启' },
                              closed: { icon: '✅', actionType: '关闭' },
                              merged: { icon: '🔀', actionType: '合并' },
                              'commented on': {
                                icon: '💬',
                                actionType: '评论',
                              },
                              joined: { icon: '👋', actionType: '加入' },
                              left: { icon: '👋', actionType: '离开' },
                              created: { icon: '✨', actionType: '创建' },
                              updated: { icon: '🔄', actionType: '更新' },
                              deleted: { icon: '🗑️', actionType: '删除' },
                              approved: { icon: '✅', actionType: '批准' },
                              unapproved: {
                                icon: '❌',
                                actionType: '取消批准',
                              },
                            },
                            l = (a && s[a]) || (t && s[t])
                          return l
                            ? { ...l, title: n }
                            : {
                                icon: '📋',
                                actionType: a || t || '未知操作',
                                title: h(e),
                              }
                        })(e)
                      return y.jsxs(
                        'div',
                        {
                          className: `${de} ${t ? re : ''}`,
                          children: [
                            y.jsx('div', {
                              className: `${ce} ${te}`,
                              children: y.jsxs('label', {
                                className: ke,
                                children: [
                                  y.jsx('input', {
                                    type: 'checkbox',
                                    checked: t,
                                    onChange: () =>
                                      (e => {
                                        const t = o.includes(e)
                                        d(e, !t)
                                      })(e.id),
                                    title: t ? '取消选择' : '选择此事件',
                                  }),
                                  y.jsx('span', { className: ye }),
                                ],
                              }),
                            }),
                            y.jsxs('div', {
                              className: `${ce} ${ae}`,
                              children: [
                                y.jsx('div', { className: _e, children: a }),
                                y.jsxs('div', {
                                  className: me,
                                  children: [
                                    y.jsx('div', {
                                      className: ue,
                                      children: n,
                                    }),
                                    y.jsx('div', {
                                      className: pe,
                                      children: x(e),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            y.jsx('div', {
                              className: `${ce} ${ne}`,
                              children: y.jsx('span', {
                                className: he,
                                children: s,
                              }),
                            }),
                            y.jsx('div', {
                              className: `${ce} ${se}`,
                              children: y.jsx('span', {
                                className: xe,
                                children: p(e.created_at),
                              }),
                            }),
                            y.jsx('div', {
                              className: `${ce} ${le}`,
                              children: y.jsx('button', {
                                className: ve,
                                onClick: () => _(e),
                                title: '查看详情',
                                children: y.jsx('span', {
                                  className: ge,
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
            y.jsx('div', {
              className: fe,
              children: y.jsx(Y, {
                current: l.page,
                pageSize: l.pageSize,
                total: t,
                onChange: e => i({ ...l, page: e }),
                showSizeChanger: !0,
                onShowSizeChange: (e, a) =>
                  i({ page: e, pageSize: a, total: t }),
                selectedCount: o.length,
              }),
            }),
          ],
        })
    var v
  }
class we {
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
        timeout: u.REQUEST_TIMEOUT,
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
      throw m.createApiError(s.status, t, 'GitLab API')
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
      throw m.createResponseError('Token格式无效', 'GitLab API')
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
  async getUserEventsWithTotal(e, t = {}) {
    const a = new URLSearchParams()
    t.after && a.set('after', t.after),
      t.before && a.set('before', t.before),
      t.sort && a.set('sort', t.sort),
      t.page && a.set('page', t.page.toString()),
      t.per_page && a.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => a.append('action', e)),
      t.target_type && t.target_type.forEach(e => a.append('target_type', e))
    const n = a.toString(),
      s = n ? `/users/${e}/events?${n}` : `/users/${e}/events`,
      l = `${this.baseUrl}${s}`,
      i = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(l, i)
    if (!o.ok) {
      const e = await o.text()
      throw m.createApiError(o.status, e || o.statusText, 'GitLab API')
    }
    const d = await o.json()
    let r = 0,
      c = ''
    if (o.headers instanceof Headers)
      (c =
        o.headers.get('x-total') ||
        o.headers.get('X-Total') ||
        o.headers.get('x-total-count') ||
        o.headers.get('X-Total-Count') ||
        ''),
        (r = parseInt(c || '0', 10))
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
      r = parseInt(c || '0', 10)
    }
    return (
      console.log('GitLab API Response:', {
        eventsCount: d.length,
        totalHeader: c,
        calculatedTotal: r,
        isHeadersInstance: o.headers instanceof Headers,
        headersType: typeof o.headers,
        allHeaders:
          o.headers instanceof Headers
            ? Object.fromEntries(o.headers.entries())
            : 'string' == typeof o.headers
              ? o.headers.split('\n').slice(0, 10).join('; ')
              : o.headers,
      }),
      0 === r &&
        d.length > 0 &&
        ((r = d.length),
        console.warn(
          'No total count in response headers, using events array length as fallback',
        )),
      { events: d, total: r }
    )
  }
  getCachedUser() {
    return this.currentUser
  }
}
function Me(e, t) {
  return new we(e, t)
}
const Te = () => {
    const { state: e, isConfigValid: t } = D(),
      {
        createRequest: n,
        isRequestCancelled: s,
        cleanupRequest: l,
        isAbortError: i,
      } = S(),
      o = a.useMemo(
        () => Me(e.config.gitlabUrl, e.config.gitlabToken),
        [e.config.gitlabUrl, e.config.gitlabToken],
      ),
      [d, r] = a.useState([]),
      [c, _] = a.useState(0),
      [u, p] = a.useState(!1),
      [h, x] = a.useState({ field: 'created_at', order: 'desc' }),
      [v, g] = a.useState({ page: 1, pageSize: 20, total: 0 }),
      [j, b] = a.useState([]),
      f = a.useCallback(async () => {
        if (!t()) return void console.error('GitLab configuration is invalid')
        const e = n()
        p(!0)
        try {
          await o.init()
          const t = await o.getCurrentUser(),
            a = {
              page: v.page,
              per_page: v.pageSize,
              sort: h.order,
              signal: e.signal,
            },
            { events: n, total: l } = await o.getUserEventsWithTotal(t.id, a)
          if (s(e)) return
          r(n), b(n.map(e => e.id)), _(l)
        } catch (a) {
          if (i(a)) return
          const e = m.formatErrorMessage(a)
          console.error('Failed to fetch events:', e), r([]), _(0)
        } finally {
          s(e) || p(!1), l(e)
        }
      }, [t, o, v.page, v.pageSize, h.order, n, s, i, l])
    a.useEffect(() => {
      t() && f()
    }, [t, f])
    const N = a.useCallback(e => {
        x(e)
      }, []),
      C = a.useCallback(e => {
        g(e)
      }, []),
      k = a.useCallback((e, t) => {
        b(a => (t ? [...a, e] : a.filter(t => t !== e)))
      }, []),
      E = a.useCallback(
        e => {
          b(e ? d.map(e => e.id) : [])
        },
        [d],
      )
    return y.jsx(Ee, {
      events: d,
      totalCount: c,
      loading: u,
      sortOptions: h,
      onSortChange: N,
      paginationOptions: v,
      onPaginationChange: C,
      selectedEventIds: j,
      onEventSelect: k,
      onSelectAll: E,
      onEventDetail: () => {},
    })
  },
  De = 'index-module__action-btn__To7Ms',
  Se = 'index-module__checking__QepNt',
  $e = 'index-module__version-btn__8d3di',
  Ie = 'index-module__has-update__tNkZZ',
  Ae = 'index-module__icon__EhhVu',
  Le = 'index-module__text__4iX-h',
  Oe = 'index-module__notification-overlay__E4dh-',
  Pe = 'index-module__notification__ckX1l',
  Re = 'index-module__notification-header__nJZ3Q',
  Ge = 'index-module__close-btn__9uULv',
  Ue = 'index-module__notification-body__nnab7',
  Fe = 'index-module__version-info__-pyIP',
  qe = 'index-module__release-notes__iU2jG',
  ze = 'index-module__notes-content__ZpxxA',
  Be = 'index-module__notification-footer__La-ia',
  Ve = 'index-module__later-btn__Q40Lc',
  He = 'index-module__update-btn__lD1V2',
  Xe = ({ currentVersion: e }) => {
    const [t, n] = a.useState(null),
      [s, l] = a.useState(!1),
      [i, o] = a.useState(!1),
      [d, r] = a.useState(!1),
      [c, m] = a.useState(null),
      [u, p] = a.useState(null),
      [h, x] = a.useState(!1),
      [v, g] = a.useState(new Set())
    a.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && g(new Set(JSON.parse(e)))
      } catch (e) {
        console.warn('无法读取忽略版本信息:', e)
      }
    }, [])
    const j = a.useCallback((e, t) => {
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
          if (!s)
            if (h && t && i && a)
              (!a && v.has(t.version)) ||
                (r(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              l(!0), p(null)
              try {
                const t = new AbortController(),
                  s = setTimeout(() => t.abort(), 1e4),
                  l = Date.now(),
                  i = 'undefined' != typeof GM_xmlhttpRequest,
                  d =
                    !1 && !i
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  c = await _(`${d}?t=${l}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                    signal: t.signal,
                    timeout: 1e4,
                  })
                if ((clearTimeout(s), !c.ok))
                  throw new Error(`HTTP ${c.status}: ${c.statusText}`)
                const u = await c.json()
                console.log('获取到版本信息:', u)
                const p = {
                  version: u.version,
                  downloadUrl:
                    'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                  releaseNotes: `版本 ${u.version} 已发布，请及时更新以获得最新功能和修复。`,
                }
                n(p), m(new Date()), x(!0)
                const h = j(e, p.version)
                o(h),
                  h
                    ? a || !v.has(p.version)
                      ? (r(!0),
                        console.log(`发现新版本 ${p.version}，建议及时更新！`))
                      : console.log(`发现新版本 ${p.version}，但已被忽略`)
                    : console.log('当前已是最新版本')
              } catch (d) {
                console.error('检查版本更新失败:', d)
                const e = d instanceof Error ? d.message : '检查更新失败'
                p(e), console.error(`检查更新失败: ${e}`)
              } finally {
                l(!1)
              }
            }
        },
        [s, j, e, v, h, t, i],
      )
    a.useEffect(() => {
      const e = setTimeout(() => {
        b(!1)
      }, 1e3)
      return () => clearTimeout(e)
    }, [])
    const f = a.useCallback(async () => {
        ;(null == t ? void 0 : t.downloadUrl) &&
          (window.open(t.downloadUrl, '_blank'),
          r(!1),
          setTimeout(async () => {
            await b(!1)
            !j(e, t.version)
              ? console.log('当前已是最新版本！')
              : console.log(
                  `检测到新版本 ${t.version}，请手动刷新页面或重新安装脚本。`,
                )
          }, 1e3))
      }, [t, b, j, e]),
      N = a.useCallback(() => {
        g(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      C = a.useCallback(() => {
        if ((r(!1), t)) {
          const a = new Set(v)
          a.add(t.version), g(a)
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
      k = a.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      E = a.useCallback(
        () =>
          s
            ? '检查中...'
            : u
              ? '检查失败'
              : i
                ? '有更新'
                : h && !i
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [s, u, i, h],
      ),
      w = a.useCallback(
        () => (s ? '🔄' : u ? '⚠️' : i ? '🔴' : '🔍'),
        [s, u, i],
      )
    return (
      a.useEffect(() => {}, [N]),
      y.jsxs(y.Fragment, {
        children: [
          y.jsxs('button', {
            className: `${De} ${$e} ${s ? Se : ''} ${i ? Ie : ''}`,
            onClick: () => b(!0),
            disabled: s,
            title: c
              ? `上次检查: ${k(c)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              y.jsx('span', { className: Ae, children: w() }),
              y.jsx('span', { className: Le, children: E() }),
            ],
          }),
          d &&
            i &&
            t &&
            y.jsx('div', {
              className: Oe,
              children: y.jsxs('div', {
                className: Pe,
                children: [
                  y.jsxs('div', {
                    className: Re,
                    children: [
                      y.jsx('h3', { children: '🎉 发现新版本' }),
                      y.jsx('button', {
                        className: Ge,
                        onClick: C,
                        children: '×',
                      }),
                    ],
                  }),
                  y.jsxs('div', {
                    className: Ue,
                    children: [
                      y.jsxs('div', {
                        className: Fe,
                        children: [
                          y.jsxs('p', {
                            children: [
                              y.jsx('strong', { children: '当前版本:' }),
                              ' v',
                              e,
                            ],
                          }),
                          y.jsxs('p', {
                            children: [
                              y.jsx('strong', { children: '最新版本:' }),
                              ' v',
                              t.version,
                            ],
                          }),
                        ],
                      }),
                      t.releaseNotes &&
                        y.jsxs('div', {
                          className: qe,
                          children: [
                            y.jsx('h4', { children: '更新说明:' }),
                            y.jsx('div', {
                              className: ze,
                              children: t.releaseNotes,
                            }),
                          ],
                        }),
                    ],
                  }),
                  y.jsxs('div', {
                    className: Be,
                    children: [
                      y.jsx('button', {
                        className: Ve,
                        onClick: C,
                        children: '稍后更新',
                      }),
                      y.jsx('button', {
                        className: He,
                        onClick: f,
                        children: '立即更新',
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      })
    )
  },
  Qe = 'index-module__config-status__0q8ZM',
  Ze = 'index-module__clickable__pZ86X',
  Ke = 'index-module__status-indicator__MeBgW',
  Ye = 'index-module__status-icon__7jFiQ',
  Je = 'index-module__status-text__llRfw',
  We = 'index-module__progress-bar__CFedX',
  et = 'index-module__progress-fill__w-23-',
  tt = 'index-module__valid__Xyroo',
  at = 'index-module__invalid__Fn-hL',
  nt = 'index-module__status-details__E1JnL',
  st = 'index-module__missing-items__8Wn0w',
  lt = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  it = lt.length,
  ot = ({ config: e, className: t = '', showDetails: n = !1, onClick: s }) => {
    const l = a.useMemo(() => {
      const t = [],
        a = []
      lt.forEach(n => {
        const s = e[n.key]
        ;('string' == typeof s ? '' !== s.trim() : !!s)
          ? a.push(n.label)
          : t.push(n.label)
      })
      const n = a.length
      return {
        isValid: 0 === t.length,
        missingItems: t,
        completedItems: a,
        completedCount: n,
        totalCount: it,
        progress: (n / it) * 100,
      }
    }, [e])
    return y.jsxs('div', {
      className: `${Qe} ${t} ${s ? Ze : ''}`,
      onClick: s,
      children: [
        y.jsxs('div', {
          className: `${Ke} ${l.isValid ? tt : at}`,
          children: [
            y.jsx('span', { className: Ye, children: l.isValid ? '✅' : '⚠️' }),
            y.jsx('span', {
              className: Je,
              children: l.isValid
                ? '就绪'
                : `${l.completedCount}/${l.totalCount}`,
            }),
            !l.isValid &&
              y.jsx('div', {
                className: We,
                children: y.jsx('div', {
                  className: et,
                  style: { width: `${l.progress}%` },
                }),
              }),
          ],
        }),
        n &&
          !l.isValid &&
          y.jsx('div', {
            className: nt,
            children: y.jsx('div', {
              className: st,
              children: l.missingItems.join(' · '),
            }),
          }),
      ],
    })
  },
  dt = 'index-module__main-panel__82FLm',
  rt = 'index-module__panel-header__kyx4p',
  ct = 'index-module__header-left__xT1T5',
  _t = 'index-module__header-right__7F8Bo',
  mt = 'index-module__mode-toggle__9yafG',
  ut = 'index-module__toggle-track__82VKI',
  pt = 'index-module__toggle-slider__tkY4o',
  ht = 'index-module__slide-right__qPOZu',
  xt = 'index-module__toggle-option__ZhXXU',
  vt = 'index-module__active__Mr5KU',
  gt = 'index-module__toggle-icon__AI6K7',
  jt = 'index-module__toggle-label__1qZLz',
  bt = 'index-module__divider__QXSgp',
  ft = 'index-module__action-buttons__xGRHl',
  Nt = 'index-module__action-btn__x4IAP',
  Ct = 'index-module__btn-icon__ZaYHk',
  kt = 'index-module__btn-label__tM2Rz',
  yt = 'index-module__ai-btn__5kAV3',
  Et = 'index-module__filter-section__gMBIz',
  wt = 'index-module__events-section__gJwdk',
  Mt = ({
    appMode: e,
    events: t,
    totalCount: a,
    loading: n,
    filterConditions: s,
    sortOptions: l,
    paginationOptions: i,
    selectedEventIds: o,
    onModeChange: d,
    onFilterChange: r,
    onSortChange: c,
    onPaginationChange: _,
    onEventSelect: m,
    onSelectAll: u,
    onEventDetail: h,
    onOpenSettings: x,
    onOpenAI: v,
  }) => {
    const { state: g } = D()
    return y.jsxs('div', {
      className: dt,
      children: [
        y.jsxs('div', {
          className: rt,
          children: [
            y.jsxs('div', {
              className: ct,
              children: [
                y.jsx('h1', {
                  children:
                    'events' === e ? 'GitLab Events' : 'GitLab Changelog',
                }),
                y.jsx(ot, { config: g.config, onClick: x }),
              ],
            }),
            y.jsxs('div', {
              className: _t,
              children: [
                y.jsx(Xe, { currentVersion: p }),
                y.jsx('div', {
                  className: mt,
                  children: y.jsxs('div', {
                    className: ut,
                    children: [
                      y.jsx('div', {
                        className: `${pt} ${'changelog' === e ? ht : ''}`,
                      }),
                      y.jsxs('button', {
                        className: `${xt} ${'events' === e ? vt : ''}`,
                        onClick: () => d('events'),
                        children: [
                          y.jsx('span', { className: gt, children: '📋' }),
                          y.jsx('span', { className: jt, children: 'Events' }),
                        ],
                      }),
                      y.jsxs('button', {
                        className: `${xt} ${'changelog' === e ? vt : ''}`,
                        onClick: () => d('changelog'),
                        children: [
                          y.jsx('span', { className: gt, children: '📝' }),
                          y.jsx('span', {
                            className: jt,
                            children: 'Changelog',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                y.jsx('div', { className: bt }),
                y.jsxs('div', {
                  className: ft,
                  children: [
                    y.jsxs('button', {
                      className: Nt,
                      onClick: x,
                      title: '设置',
                      children: [
                        y.jsx('span', {
                          className: Ct,
                          children: y.jsxs('svg', {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            children: [
                              y.jsx('path', {
                                d: 'M12 15a3 3 0 100-6 3 3 0 000 6z',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                              }),
                              y.jsx('path', {
                                d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                              }),
                            ],
                          }),
                        }),
                        y.jsx('span', { className: kt, children: '设置' }),
                      ],
                    }),
                    y.jsxs('button', {
                      className: `${Nt} ${yt}`,
                      onClick: v,
                      title: 'AI 周报',
                      children: [
                        y.jsx('span', {
                          className: Ct,
                          children: y.jsxs('svg', {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            children: [
                              y.jsx('path', {
                                d: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
                                fill: 'currentColor',
                              }),
                              y.jsx('path', {
                                d: 'M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z',
                                fill: 'currentColor',
                              }),
                              y.jsx('path', {
                                d: 'M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z',
                                fill: 'currentColor',
                              }),
                            ],
                          }),
                        }),
                        y.jsx('span', { className: kt, children: 'AI 周报' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        'events' === e
          ? y.jsxs(y.Fragment, {
              children: [
                y.jsx('div', {
                  className: Et,
                  children: y.jsx(F, {
                    filterConditions: s,
                    onFilterChange: r,
                  }),
                }),
                y.jsx('div', {
                  className: wt,
                  children: y.jsx(Ee, {
                    events: t,
                    totalCount: a,
                    loading: n,
                    sortOptions: l,
                    onSortChange: c,
                    paginationOptions: i,
                    onPaginationChange: _,
                    selectedEventIds: o,
                    onEventSelect: m,
                    onSelectAll: u,
                    onEventDetail: h,
                  }),
                }),
              ],
            })
          : y.jsx(Te, {}),
      ],
    })
  },
  Tt = 'index-module__modal-mask__XYxyO',
  Dt = 'index-module__modal-wrapper__bVZip',
  St = 'index-module__modal__QQS3u',
  $t = 'index-module__modal-header__GdUjX',
  It = 'index-module__modal-title__cafB-',
  At = 'index-module__modal-close__ZuUgf',
  Lt = 'index-module__modal-body__j5X3U',
  Ot = 'index-module__modal-footer__3q-wn',
  Pt = ({
    visible: e,
    title: t,
    width: n = 520,
    maxHeight: s = window.innerHeight - 180,
    children: l,
    footer: i,
    onClose: o,
    maskClosable: d = !0,
  }) => {
    if (
      (a.useEffect(() => {
        const t = t => {
          'Escape' === t.key && e && o()
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
      }, [e, o]),
      !e)
    )
      return null
    return y.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: Tt,
      onClick: e => {
        e.target === e.currentTarget && d && o()
      },
      children: y.jsx('div', {
        className: Dt,
        children: y.jsxs('div', {
          className: St,
          style: { width: n, maxHeight: s },
          children: [
            y.jsxs('div', {
              className: $t,
              children: [
                y.jsx('div', { className: It, children: t }),
                y.jsx('button', {
                  className: At,
                  onClick: o,
                  children: y.jsx('span', { children: '×' }),
                }),
              ],
            }),
            y.jsx('div', { className: Lt, children: l }),
            i && y.jsx('div', { className: Ot, children: i }),
          ],
        }),
      }),
    })
  },
  Rt = 'index-module__settings-panel__UCg3H',
  Gt = 'index-module__config-overview__kaSMo',
  Ut = 'index-module__settings-tabs__vPH-t',
  Ft = 'index-module__tab-button__FG9Nc',
  qt = 'index-module__tab-icon__rBe-o',
  zt = 'index-module__active__bsBC1',
  Bt = 'index-module__settings-content__TqQPH',
  Vt = 'index-module__tab-panel__Q2QUI',
  Ht = 'index-module__form-group__zKwiA',
  Xt = 'index-module__form-label__pwe7O',
  Qt = 'index-module__required__2vuyW',
  Zt = 'index-module__form-input__jGbRP',
  Kt = 'index-module__form-select__jbXdq',
  Yt = 'index-module__form-textarea__fAVMw',
  Jt = 'index-module__form-hint__F0dFQ',
  Wt = 'index-module__version-info__y0NZv',
  ea = 'index-module__version-text__bx0HU',
  ta = 'index-module__settings-footer__qA44X',
  aa = 'index-module__footer-right__bslDg',
  na = 'index-module__btn-primary__ZzzFI',
  sa = 'index-module__switch-container__5xk1J',
  la = 'index-module__switch-input__V-8fl',
  ia = 'index-module__switch-label__xrOeQ',
  oa = 'index-module__switch-slider__dG-6J',
  da = 'index-module__btn-secondary__cRCpD',
  ra = ({ isOpen: e, onClose: t, config: n, onSave: s, theme: l }) => {
    const [i, o] = a.useState(n),
      [d, r] = a.useState(l),
      [c, _] = a.useState('gitlab')
    a.useEffect(() => {
      o(n)
    }, [n]),
      a.useEffect(() => {
        r(l)
      }, [l]),
      a.useEffect(() => {
        e && (o(n), r(l))
      }, [e, n, l])
    const m = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return y.jsx(Pt, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: y.jsxs('div', {
        className: ta,
        children: [
          y.jsx('button', {
            className: da,
            onClick: () => {
              o(n), r(l)
            },
            children: '重置',
          }),
          y.jsxs('div', {
            className: aa,
            children: [
              y.jsx('button', { className: da, onClick: t, children: '取消' }),
              y.jsx('button', {
                className: na,
                onClick: () => {
                  s(i, d), t()
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
      children: y.jsxs('div', {
        className: Rt,
        children: [
          y.jsx('div', {
            className: Gt,
            children: y.jsx(ot, { config: i, showDetails: !0 }),
          }),
          y.jsxs('div', {
            className: Ut,
            children: [
              y.jsxs('button', {
                className: `${Ft} ${'gitlab' === c ? zt : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  y.jsx('span', { className: qt, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              y.jsxs('button', {
                className: `${Ft} ${'deepseek' === c ? zt : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  y.jsx('span', { className: qt, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              y.jsxs('button', {
                className: `${Ft} ${'appearance' === c ? zt : ''}`,
                onClick: () => _('appearance'),
                children: [
                  y.jsx('span', { className: qt, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          y.jsxs('div', {
            className: Bt,
            children: [
              'gitlab' === c &&
                y.jsxs('div', {
                  className: Vt,
                  children: [
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsxs('label', {
                          className: Xt,
                          children: [
                            'GitLab 项目地址 ',
                            y.jsx('span', { className: Qt, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: Zt,
                          placeholder: h.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => m('gitlabUrl', e.target.value),
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsxs('label', {
                          className: Xt,
                          children: [
                            '个人访问令牌 ',
                            y.jsx('span', { className: Qt, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: Zt,
                          placeholder: h.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => m('gitlabToken', e.target.value),
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                y.jsxs('div', {
                  className: Vt,
                  children: [
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsxs('label', {
                          className: Xt,
                          children: [
                            'DeepSeek API Key ',
                            y.jsx('span', { className: Qt, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: Zt,
                          placeholder: h.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => m('deepseekApiKey', e.target.value),
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsx('label', {
                          className: Xt,
                          children: '使用的模型',
                        }),
                        y.jsxs('select', {
                          className: Kt,
                          value: i.model,
                          onChange: e => m('model', e.target.value),
                          children: [
                            y.jsx('option', {
                              value: 'deepseek-chat',
                              children: 'deepseek-chat',
                            }),
                            y.jsx('option', {
                              value: 'deepseek-coder',
                              children: 'deepseek-coder',
                            }),
                          ],
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsx('label', {
                          className: Xt,
                          children: 'Token 数量限制',
                        }),
                        y.jsx('input', {
                          type: 'number',
                          className: Zt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            m('tokenLimit', parseInt(e.target.value)),
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsxs('label', {
                          className: Xt,
                          children: [
                            '默认提示词 ',
                            y.jsx('span', { className: Qt, children: '*' }),
                          ],
                        }),
                        y.jsx('textarea', {
                          className: Yt,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => m('defaultPrompt', e.target.value),
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                y.jsxs('div', {
                  className: Vt,
                  children: [
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsx('label', { className: Xt, children: '主题模式' }),
                        y.jsxs('select', {
                          className: Kt,
                          value: d,
                          onChange: e => r(e.target.value),
                          children: [
                            y.jsx('option', {
                              value: 'system',
                              children: '🔄 跟随系统',
                            }),
                            y.jsx('option', {
                              value: 'light',
                              children: '☀️ 浅色模式',
                            }),
                            y.jsx('option', {
                              value: 'dark',
                              children: '🌙 深色模式',
                            }),
                          ],
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsx('label', {
                          className: Xt,
                          children: '自动检查更新',
                        }),
                        y.jsxs('div', {
                          className: sa,
                          children: [
                            y.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: la,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                m('autoCheckUpdate', e.target.checked),
                            }),
                            y.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: ia,
                              children: y.jsx('span', { className: oa }),
                            }),
                          ],
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ht,
                      children: [
                        y.jsx('label', {
                          className: Xt,
                          children: '检查更新间隔',
                        }),
                        y.jsxs('select', {
                          className: Kt,
                          value: i.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            m('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(i.autoCheckUpdate ?? 1),
                          children: [
                            y.jsx('option', { value: 6e4, children: '1分钟' }),
                            y.jsx('option', { value: 3e5, children: '5分钟' }),
                            y.jsx('option', { value: 6e5, children: '10分钟' }),
                            y.jsx('option', {
                              value: 18e5,
                              children: '30分钟',
                            }),
                            y.jsx('option', { value: 36e5, children: '1小时' }),
                          ],
                        }),
                        y.jsx('div', {
                          className: Jt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          y.jsx('div', {
            className: Wt,
            children: y.jsxs('span', { className: ea, children: ['v', p] }),
          }),
        ],
      }),
    })
  },
  ca = {
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
    btnPrimary: 'index-module__btn-primary__NTwQw',
    regenerate: 'index-module__regenerate__MPpEF',
    btnText: 'index-module__btn-text__f3PZM',
  },
  _a = ({
    visible: e,
    config: t,
    defaultPrompt: n,
    onClose: s,
    onGenerate: l,
    isLoading: i,
    selectedEventsCount: o = 0,
    dateRange: d,
  }) => {
    const [r, c] = a.useState(n),
      [_, m] = a.useState(!1),
      [u, p] = a.useState(!1)
    a.useEffect(() => {
      c(n)
    }, [n])
    return y.jsx(Pt, {
      visible: e,
      title: 'AI 周报生成',
      width: 800,
      onClose: s,
      maskClosable: !i,
      children: y.jsxs('div', {
        className: ca.aiPanel,
        children: [
          y.jsxs('div', {
            className: ca.dataOverview,
            children: [
              y.jsx('div', {
                className: ca.overviewHeader,
                children: y.jsx('h4', { children: '📊 数据概览' }),
              }),
              y.jsxs('div', {
                className: ca.overviewContent,
                children: [
                  y.jsxs('div', {
                    className: ca.overviewItem,
                    children: [
                      y.jsx('span', {
                        className: ca.overviewLabel,
                        children: '选中事件：',
                      }),
                      y.jsxs('span', {
                        className: ca.overviewValue,
                        children: [o, ' 条'],
                      }),
                    ],
                  }),
                  d &&
                    y.jsxs('div', {
                      className: ca.overviewItem,
                      children: [
                        y.jsx('span', {
                          className: ca.overviewLabel,
                          children: '日期范围：',
                        }),
                        y.jsxs('span', {
                          className: ca.overviewValue,
                          children: [d.startDate, ' 至 ', d.endDate],
                        }),
                      ],
                    }),
                  y.jsxs('div', {
                    className: ca.overviewItem,
                    children: [
                      y.jsx('span', {
                        className: ca.overviewLabel,
                        children: '状态：',
                      }),
                      y.jsx('span', {
                        className: `${ca.overviewValue} ${o > 0 ? ca.ready : ca.waiting}`,
                        children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          y.jsxs('div', {
            className: ca.promptSection,
            children: [
              y.jsxs('div', {
                className: ca.sectionHeader,
                children: [
                  y.jsx('h3', { children: '提示词' }),
                  y.jsxs('div', {
                    className: ca.headerActions,
                    children: [
                      y.jsx('button', {
                        className: ca.btnText,
                        onClick: () => m(!_),
                        children: _ ? '收起' : '展开',
                      }),
                      y.jsx('button', {
                        className: ca.btnText,
                        onClick: () => {
                          c(n)
                        },
                        children: '重置',
                      }),
                    ],
                  }),
                ],
              }),
              y.jsxs('div', {
                className: `${ca.promptEditor} ${_ ? ca.expanded : ''}`,
                children: [
                  y.jsx('textarea', {
                    className: ca.promptTextarea,
                    value: r,
                    onChange: e => c(e.target.value),
                    placeholder: '请输入用于生成周报的提示词...',
                    rows: _ ? 15 : 6,
                    disabled: i,
                  }),
                  y.jsxs('div', {
                    className: ca.promptFooter,
                    children: [
                      y.jsxs('span', {
                        className: ca.charCount,
                        children: [r.length, ' 字符'],
                      }),
                      y.jsx('button', {
                        className: `${ca.btnPrimary} ${(null == t ? void 0 : t.result) ? ca.regenerate : ''}`,
                        onClick: () => {
                          l(r)
                        },
                        disabled: i || !r.trim(),
                        children: i
                          ? '生成中...'
                          : (null == t ? void 0 : t.result)
                            ? '重新生成'
                            : '生成周报',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          i &&
            y.jsxs('div', {
              className: ca.loadingSection,
              children: [
                y.jsx('div', { className: ca.loadingSpinner }),
                y.jsx('p', { children: 'AI 正在分析事件数据，生成周报中...' }),
                y.jsx('div', {
                  className: ca.loadingTips,
                  children: y.jsx('span', {
                    children: '💡 生成时间通常为 10-30 秒',
                  }),
                }),
              ],
            }),
          (null == t ? void 0 : t.result) &&
            y.jsxs('div', {
              className: ca.resultSection,
              children: [
                y.jsxs('div', {
                  className: ca.resultHeader,
                  children: [
                    y.jsxs('h3', {
                      className: ca.resultTitle,
                      children: [
                        y.jsx('span', {
                          className: ca.titleIcon,
                          children: '✨',
                        }),
                        '生成结果',
                      ],
                    }),
                    y.jsx('div', {
                      className: ca.resultActions,
                      children: y.jsxs('button', {
                        className: `${ca.actionBtn} ${u ? ca.copied : ''}`,
                        onClick: () => {
                          ;(null == t ? void 0 : t.result) &&
                            navigator.clipboard.writeText(t.result).then(() => {
                              p(!0), setTimeout(() => p(!1), 2e3)
                            })
                        },
                        title: '一键复制',
                        disabled: u,
                        children: [
                          y.jsx('span', {
                            className: ca.btnIcon,
                            children: u ? '✅' : '📋',
                          }),
                          u ? '已复制' : '复制',
                        ],
                      }),
                    }),
                  ],
                }),
                y.jsx('div', {
                  className: ca.resultContent,
                  children: y.jsx('div', {
                    className: ca.resultText,
                    children: t.result,
                  }),
                }),
                y.jsx('div', {
                  className: ca.resultMeta,
                  children: y.jsxs('div', {
                    className: ca.metaLeft,
                    children: [
                      y.jsx('div', {
                        className: ca.metaItem,
                        children: y.jsxs('span', {
                          children: [t.result.split('\n').length, ' 行'],
                        }),
                      }),
                      y.jsx('div', {
                        className: ca.metaItem,
                        children: y.jsxs('span', {
                          children: [t.result.length, ' 字符'],
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          !t &&
            !i &&
            y.jsxs('div', {
              className: ca.emptyResult,
              children: [
                y.jsx('div', { className: ca.emptyIcon, children: '🤖' }),
                y.jsx('h3', { children: '准备生成 AI 周报' }),
                y.jsx('p', {
                  children:
                    '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                }),
                y.jsxs('div', {
                  className: ca.emptyFeatures,
                  children: [
                    y.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        y.jsx('span', {
                          className: ca.featureIcon,
                          children: '📊',
                        }),
                        y.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        y.jsx('span', {
                          className: ca.featureIcon,
                          children: '📝',
                        }),
                        y.jsx('span', { children: '自动生成周报内容' }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        y.jsx('span', {
                          className: ca.featureIcon,
                          children: '🎯',
                        }),
                        y.jsx('span', { children: '突出重点工作成果' }),
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
  ma = {
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
  ua = ({ event: e, visible: t, onClose: a }) => {
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
    return y.jsx('div', {
      className: ma.eventDetailModalOverlay,
      onClick: a,
      children: y.jsxs('div', {
        className: ma.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          y.jsxs('div', {
            className: ma.modalHeader,
            children: [
              y.jsx('h2', { children: '事件详情' }),
              y.jsx('button', {
                className: ma.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          y.jsxs('div', {
            className: ma.modalContent,
            children: [
              y.jsxs('div', {
                className: `${ma.detailSection} ${ma.compact}`,
                children: [
                  y.jsx('h3', { children: '基本信息' }),
                  y.jsxs('div', {
                    className: `${ma.detailGrid} ${ma.compactGrid}`,
                    children: [
                      y.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          y.jsx('span', {
                            className: ma.label,
                            children: 'ID:',
                          }),
                          y.jsx('span', {
                            className: ma.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      y.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          y.jsx('span', {
                            className: ma.label,
                            children: '类型:',
                          }),
                          y.jsx('span', {
                            className: ma.value,
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
                      y.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          y.jsx('span', {
                            className: ma.label,
                            children: '操作:',
                          }),
                          y.jsx('span', {
                            className: `${ma.value} ${ma.actionBadge}`,
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
                      y.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          y.jsx('span', {
                            className: ma.label,
                            children: '时间:',
                          }),
                          y.jsx('span', {
                            className: ma.value,
                            children: n(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        y.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            y.jsx('span', {
                              className: ma.label,
                              children: '状态:',
                            }),
                            y.jsx('span', {
                              className: `${ma.value} ${ma.statusBadge} ${ma[`status-${e.state}`]}`,
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
                y.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    y.jsx('h3', { children: '内容' }),
                    y.jsxs('div', {
                      className: `${ma.detailContent} ${ma.compactContent}`,
                      children: [
                        e.title &&
                          y.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              y.jsx('span', {
                                className: ma.label,
                                children: '标题:',
                              }),
                              y.jsx('span', {
                                className: ma.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          y.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              y.jsx('span', {
                                className: ma.label,
                                children: '目标:',
                              }),
                              y.jsx('span', {
                                className: ma.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          y.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              y.jsx('span', {
                                className: ma.label,
                                children: '标签:',
                              }),
                              y.jsx('div', {
                                className: ma.labels,
                                children: e.labels.map((e, t) =>
                                  y.jsx(
                                    'span',
                                    { className: ma.labelTag, children: e },
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
                y.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    y.jsx('h3', { children: '作者' }),
                    y.jsxs('div', {
                      className: `${ma.authorInfo} ${ma.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          y.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: ma.authorAvatar,
                          }),
                        y.jsxs('div', {
                          className: ma.authorDetails,
                          children: [
                            y.jsx('div', {
                              className: ma.authorName,
                              children: e.author.name,
                            }),
                            y.jsxs('div', {
                              className: ma.authorUsername,
                              children: ['@', e.author.username],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              (e.project || e.project_id) &&
                y.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    y.jsx('h3', { children: '项目' }),
                    y.jsx('div', {
                      className: `${ma.projectInfo} ${ma.compactProject}`,
                      children: e.project
                        ? y.jsxs(y.Fragment, {
                            children: [
                              y.jsxs('div', {
                                className: ma.detailItem,
                                children: [
                                  y.jsx('span', {
                                    className: ma.label,
                                    children: '名称:',
                                  }),
                                  y.jsx('span', {
                                    className: ma.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              y.jsxs('div', {
                                className: ma.detailItem,
                                children: [
                                  y.jsx('span', {
                                    className: ma.label,
                                    children: '路径:',
                                  }),
                                  y.jsx('span', {
                                    className: ma.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : y.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              y.jsx('span', {
                                className: ma.label,
                                children: '项目ID:',
                              }),
                              y.jsx('span', {
                                className: ma.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                y.jsxs('div', {
                  className: ma.detailSection,
                  children: [
                    y.jsx('h3', { children: '推送信息' }),
                    y.jsxs('div', {
                      className: ma.pushInfo,
                      children: [
                        y.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            y.jsx('span', {
                              className: ma.label,
                              children: '分支:',
                            }),
                            y.jsx('span', {
                              className: ma.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            y.jsx('span', {
                              className: ma.label,
                              children: '提交数量:',
                            }),
                            y.jsx('span', {
                              className: ma.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            y.jsx('span', {
                              className: ma.label,
                              children: '提交标题:',
                            }),
                            y.jsx('span', {
                              className: ma.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            y.jsx('span', {
                              className: ma.label,
                              children: '提交哈希:',
                            }),
                            y.jsx('span', {
                              className: `${ma.value} ${ma.commitHash}`,
                              children: e.push_data.commit_to,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              e.note &&
                y.jsxs('div', {
                  className: ma.detailSection,
                  children: [
                    y.jsx('h3', { children: '评论信息' }),
                    y.jsxs('div', {
                      className: ma.noteInfo,
                      children: [
                        y.jsx('div', {
                          className: ma.noteBody,
                          children: e.note.body,
                        }),
                        y.jsxs('div', {
                          className: ma.noteMeta,
                          children: [
                            y.jsxs('span', {
                              children: ['创建时间: ', n(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              y.jsxs('span', {
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
          y.jsxs('div', {
            className: ma.modalFooter,
            children: [
              s() &&
                y.jsx('a', {
                  href: s(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: ma.sourceLinkBtn,
                  children: '打开源页面',
                }),
              y.jsx('button', {
                className: ma.closeModalBtn,
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
  pa = {
    app: 'App-module__app__ZYOJd',
    'web-mode': 'App-module__web-mode__2hnFp',
    webMode: 'App-module__web-mode__2hnFp',
    'userscript-mode': 'App-module__userscript-mode__5Dbvp',
    userscriptMode: 'App-module__userscript-mode__5Dbvp',
    'events-list-footer': 'App-module__events-list-footer__M6fFx',
    eventsListFooter: 'App-module__events-list-footer__M6fFx',
    pagination: 'App-module__pagination__8MYcc',
    light: 'App-module__light__-2YM7',
    dark: 'App-module__dark__zl6FN',
    'fade-in': 'App-module__fade-in__hmOGT',
    fadeIn: 'App-module__fade-in__hmOGT',
    'slide-in-up': 'App-module__slide-in-up__3G2dj',
    slideInUp: 'App-module__slide-in-up__3G2dj',
    'slide-in-down': 'App-module__slide-in-down__yp8xa',
    slideInDown: 'App-module__slide-in-down__yp8xa',
    'userscript-header': 'App-module__userscript-header__Gd9rb',
    userscriptHeader: 'App-module__userscript-header__Gd9rb',
    'toggle-btn': 'App-module__toggle-btn__1QXY6',
    toggleBtn: 'App-module__toggle-btn__1QXY6',
    'app-content': 'App-module__app-content__41BC0',
    appContent: 'App-module__app-content__41BC0',
    collapsed: 'App-module__collapsed__-W0B6',
    expanded: 'App-module__expanded__4oZSa',
    'app-header': 'App-module__app-header__uzDwt',
    appHeader: 'App-module__app-header__uzDwt',
    'app-main': 'App-module__app-main__Vb-mE',
    appMain: 'App-module__app-main__Vb-mE',
    'error-banner': 'App-module__error-banner__lzzyc',
    errorBanner: 'App-module__error-banner__lzzyc',
    'config-form': 'App-module__config-form__3qfiF',
    configForm: 'App-module__config-form__3qfiF',
    'form-group': 'App-module__form-group__HjqOW',
    formGroup: 'App-module__form-group__HjqOW',
    'date-range': 'App-module__date-range__a4twt',
    dateRange: 'App-module__date-range__a4twt',
    'action-section': 'App-module__action-section__PNqvo',
    actionSection: 'App-module__action-section__PNqvo',
    'primary-btn': 'App-module__primary-btn__7Yh0h',
    primaryBtn: 'App-module__primary-btn__7Yh0h',
    'secondary-btn': 'App-module__secondary-btn__rYZob',
    secondaryBtn: 'App-module__secondary-btn__rYZob',
    'preview-area': 'App-module__preview-area__eSphl',
    previewArea: 'App-module__preview-area__eSphl',
    placeholder: 'App-module__placeholder__64NFK',
    loading: 'App-module__loading__nhcml',
    spinner: 'App-module__spinner__DX3IN',
    spin: 'App-module__spin__cTQvR',
    'report-content': 'App-module__report-content__qtrdb',
    reportContent: 'App-module__report-content__qtrdb',
    'report-meta': 'App-module__report-meta__Jmys5',
    reportMeta: 'App-module__report-meta__Jmys5',
    'report-text': 'App-module__report-text__DiDz5',
    reportText: 'App-module__report-text__DiDz5',
  },
  ha = ({ isUserscript: e = !1 }) => {
    const {
        state: t,
        updateConfig: n,
        setTheme: s,
        setActivePanel: l,
        setAppMode: i,
        setProjects: o,
        updateFilterConditions: d,
        updateSortOptions: r,
        updatePaginationOptions: _,
        setEvents: u,
        setTotal: p,
        setAIGenerationConfig: h,
        setLoading: x,
        setError: v,
        isConfigValid: g,
        getTimeRange: j,
      } = D(),
      {
        createRequest: b,
        isRequestCancelled: f,
        cleanupRequest: N,
        isAbortError: C,
      } = S(),
      k = a.useMemo(
        () => Me(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [E, w] = a.useState(null),
      [T, $] = a.useState(!1),
      [I, A] = a.useState([]),
      L = a.useMemo(
        () =>
          'system' === t.theme
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : t.theme,
        [t.theme],
      )
    a.useEffect(() => {
      if ('system' === t.theme) {
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
    }, [t.theme])
    const O = a.useCallback(
      async e => {
        var a, n
        if (!g()) return void v(c.INVALID_FILTER_OR_CONFIG)
        const s = b()
        x(!0), v(null)
        try {
          await k.init()
          const { startDate: l, endDate: i } = j(),
            o = e || t.filterConditions,
            d =
              (null == (a = o.targetType) ? void 0 : a.length) > 0
                ? o.targetType
                : void 0,
            r =
              (null == (n = o.action) ? void 0 : n.length) > 0
                ? o.action
                : void 0,
            c = t.sortOptions.order || 'desc',
            _ = await k.getCurrentUser(),
            m = {
              after: l,
              before: i,
              target_type: d,
              action: r,
              page: t.paginationOptions.page,
              per_page: t.paginationOptions.pageSize,
              sort: c,
              signal: s.signal,
            },
            { events: h, total: x } = await k.getUserEventsWithTotal(_.id, m)
          if (f(s)) return
          u(h), A(h.map(e => e.id)), p(x)
        } catch (l) {
          if (C(l)) return
          const e = m.formatErrorMessage(l)
          v(e), u([]), p(0)
        } finally {
          f(s) || x(!1), N(s)
        }
      },
      [
        t.paginationOptions.page,
        t.paginationOptions.pageSize,
        t.sortOptions,
        t.filterConditions,
        j,
        u,
        p,
        x,
        v,
        g,
        k,
        b,
        f,
        C,
        N,
      ],
    )
    a.useEffect(() => {
      g() && O()
    }, [g, O])
    const P = a.useCallback(async () => {
      if (g()) {
        x(!0), v(null)
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
          const t = m.formatErrorMessage(e)
          v(t), o([])
        } finally {
          x(!1)
        }
      } else v(c.INVALID_FILTER_OR_CONFIG)
    }, [k, g, o, x, v])
    return y.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${pa.app} ${e ? pa.userscriptMode : pa.webMode} ${pa[L]}`,
      children: [
        y.jsx(Mt, {
          appMode: t.appMode,
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: I,
          onModeChange: async e => {
            i(e), 'changelog' === e ? await P() : g() && O()
          },
          onFilterChange: e => {
            d(e), O(e)
          },
          onSortChange: e => {
            r(e)
          },
          onPaginationChange: e => {
            _(e)
          },
          onEventSelect: (e, t) => {
            A(a => (t ? [...a, e] : a.filter(t => t !== e)))
          },
          onSelectAll: e => {
            A(e ? t.events.map(e => e.id) : [])
          },
          onEventDetail: e => {
            w(e), $(!0)
          },
          onOpenSettings: () => {
            l('settings')
          },
          onOpenAI: () => {
            g() ? l('ai') : v(c.INCOMPLETE_GITLAB_DEEPSEEK)
          },
        }),
        y.jsx(ua, {
          event: E,
          visible: T,
          onClose: () => {
            $(!1), w(null)
          },
        }),
        y.jsx(ra, {
          isOpen: 'settings' === t.activePanel,
          config: t.config,
          theme: t.theme,
          onClose: () => {
            l('main')
          },
          onSave: (e, t) => {
            n(e), s(t)
          },
        }),
        y.jsx(_a, {
          visible: 'ai' === t.activePanel,
          config: t.aiGenerationConfig,
          defaultPrompt: t.config.defaultPrompt,
          onClose: () => {
            l('main')
          },
          onGenerate: async e => {
            if (g())
              if (0 !== I.length) {
                x(!0), v(null)
                try {
                  const a = t.events
                      .filter(e => I.includes(e.id))
                      .map(e => {
                        var t
                        return `${new Date(e.created_at).toLocaleDateString('zh-CN')} - ${e.action_name}: ${e.target_title || (null == (t = e.push_data) ? void 0 : t.commit_title) || '无标题'}`
                      })
                      .join('\n'),
                    { createDeepSeekApiService: n } = await (function (e, t) {
                      let a = Promise.resolve()
                      if (t && t.length > 0) {
                        document.getElementsByTagName('link')
                        const e = document.querySelector(
                            'meta[property=csp-nonce]',
                          ),
                          n =
                            (null == e ? void 0 : e.nonce) ||
                            (null == e ? void 0 : e.getAttribute('nonce'))
                        a = Promise.allSettled(
                          t.map(e => {
                            if (
                              (e = (function (e) {
                                return '/' + e
                              })(e)) in M
                            )
                              return
                            M[e] = !0
                            const t = e.endsWith('.css'),
                              a = t ? '[rel="stylesheet"]' : ''
                            if (document.querySelector(`link[href="${e}"]${a}`))
                              return
                            const s = document.createElement('link')
                            return (
                              (s.rel = t ? 'stylesheet' : 'modulepreload'),
                              t || (s.as = 'script'),
                              (s.crossOrigin = ''),
                              (s.href = e),
                              n && s.setAttribute('nonce', n),
                              document.head.appendChild(s),
                              t
                                ? new Promise((t, a) => {
                                    s.addEventListener('load', t),
                                      s.addEventListener('error', () =>
                                        a(
                                          new Error(
                                            `Unable to preload CSS for ${e}`,
                                          ),
                                        ),
                                      )
                                  })
                                : void 0
                            )
                          }),
                        )
                      }
                      function n(e) {
                        const t = new Event('vite:preloadError', {
                          cancelable: !0,
                        })
                        if (
                          ((t.payload = e),
                          window.dispatchEvent(t),
                          !t.defaultPrevented)
                        )
                          throw e
                      }
                      return a.then(t => {
                        for (const e of t || [])
                          'rejected' === e.status && n(e.reason)
                        return e().catch(n)
                      })
                    })(
                      async () => {
                        const { createDeepSeekApiService: e } = await import(
                          './deepseek-api-C_n0SEmw.js'
                        )
                        return { createDeepSeekApiService: e }
                      },
                      __vite__mapDeps([0, 1]),
                    ),
                    s = n(t.config.deepseekApiKey),
                    l = await s.generateWeeklyReport(
                      a,
                      e,
                      t.config.model,
                      t.config.tokenLimit,
                    )
                  h({ prompt: e, tokensUsed: l.tokensUsed, result: l.content }),
                    x(!1)
                } catch (a) {
                  const e = m.formatErrorMessage(a)
                  v(e), x(!1)
                }
              } else v(c.NO_EVENTS_SELECTED)
            else v(c.INCOMPLETE_CONFIG)
          },
          isLoading: t.isLoading,
          selectedEventsCount: I.length,
          dateRange: j(),
        }),
      ],
    })
  }
E.createRoot(document.getElementById('root')).render(
  y.jsx(s.StrictMode, { children: y.jsx(ha, {}) }),
)
