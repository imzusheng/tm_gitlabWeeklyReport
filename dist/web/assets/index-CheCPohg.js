const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-Bw3vL-a0.js', 'assets/utils-C7LPnpoy.js']),
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
  E as m,
  A as u,
  e as p,
  C as h,
} from './utils-C7LPnpoy.js'
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
  g = {},
  v = a,
  j = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  f = Object.prototype.hasOwnProperty,
  N = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  C = { key: !0, ref: !0, __self: !0, __source: !0 }
function y(e, t, a) {
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
;(g.Fragment = b), (g.jsx = y), (g.jsxs = y), (x.exports = g)
var k = x.exports,
  E = {},
  w = n
;(E.createRoot = w.createRoot), (E.hydrateRoot = w.hydrateRoot)
const S = {},
  T = {
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
function I() {
  const [e, t] = a.useState(T)
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
    g = a.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    v = a.useCallback(e => {
      t(t => ({ ...t, error: e }))
    }, []),
    j = a.useCallback(e => {
      t(t => ({ ...t, reportData: e }))
    }, []),
    b = a.useCallback(e => {
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
          d.saveConfig(a)
        } catch (n) {
          console.error('Failed to save theme:', n)
        }
        return { ...e, config: a, theme: t }
      })
    }, []),
    N = a.useCallback(() => {
      t(T), d.clearConfig()
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
    y = a.useCallback(() => {
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
    setLoading: g,
    setError: v,
    setReportData: j,
    setTheme: b,
    toggleTheme: f,
    resetState: N,
    isConfigValid: C,
    getTimeRange: y,
  }
}
const M = () => {
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
  D = 'index-module__filter-group__5B49Z',
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
  U = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  G = [
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
        { key: 'targetType', label: '目标类型', options: U },
        { key: 'action', label: '操作类型', options: G },
      ]
    return k.jsxs('div', {
      className: $,
      children: [
        k.jsxs('div', {
          className: D,
          children: [
            k.jsx('label', { className: A, children: '时间范围' }),
            k.jsx('div', {
              className: L,
              children: R.map(({ value: t, label: n }) =>
                k.jsx(
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
          k.jsxs(
            'div',
            {
              className: D,
              children: [
                k.jsx('label', { className: A, children: n }),
                k.jsxs('div', {
                  className: L,
                  children: [
                    k.jsx('button', {
                      className: `${O} ${0 === e[t].length ? P : ''}`,
                      onClick: () => a(t, []),
                      children: '全部',
                    }),
                    s.map(({ value: n, label: s }) =>
                      k.jsx(
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
  B = {
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
  q = ({
    current: e,
    pageSize: t,
    total: a,
    onChange: n,
    showSizeChanger: l = !0,
    pageSizeOptions: i = [20, 50, 100, 200],
    onShowSizeChange: o,
    selectedCount: r = 0,
  }) => {
    const d = Math.ceil(a / t),
      c = (e - 1) * t + 1,
      _ = Math.min(e * t, a),
      m = t => {
        t >= 1 && t <= d && t !== e && n(t)
      }
    return 0 === a
      ? k.jsx('div', {
          className: B.pagination,
          children: k.jsx('div', {
            className: B.info,
            children: k.jsx('span', { children: '暂无数据' }),
          }),
        })
      : k.jsxs('div', {
          className: B.pagination,
          children: [
            k.jsxs('div', {
              className: B.paginationInfo,
              children: [
                '显示 ',
                c,
                '-',
                _,
                ' 条，共 ',
                a,
                ' 条',
                r > 0 ? `，已选中 ${r} 条` : '',
              ],
            }),
            k.jsxs('div', {
              className: B.paginationControls,
              children: [
                k.jsx('button', {
                  className: `${B.paginationBtn} ${1 === e ? B.disabled : ''}`,
                  onClick: () => m(e - 1),
                  disabled: 1 === e,
                  children: k.jsx('span', { children: '‹' }),
                }),
                (() => {
                  if (d <= 7) return Array.from({ length: d }, (e, t) => t + 1)
                  const t = [1],
                    a = Math.max(2, e - 2),
                    n = Math.min(d - 1, e + 2)
                  e > 4 && t.push('...')
                  for (let e = a; e <= n; e++) t.push(e)
                  return e < d - 2 - 1 && t.push('...'), t.push(d), t
                })().map((t, a) =>
                  k.jsx(
                    s.Fragment,
                    {
                      children:
                        'number' == typeof t
                          ? k.jsx('button', {
                              className: `${B.paginationBtn} ${e === t ? B.active : ''}`,
                              onClick: () => m(t),
                              children: t,
                            })
                          : k.jsx('span', {
                              className: B.paginationEllipsis,
                              children: t,
                            }),
                    },
                    a,
                  ),
                ),
                k.jsx('button', {
                  className: `${B.paginationBtn} ${e === d ? B.disabled : ''}`,
                  onClick: () => m(e + 1),
                  disabled: e === d,
                  children: k.jsx('span', { children: '›' }),
                }),
              ],
            }),
            l &&
              k.jsxs('div', {
                className: B.paginationSizeChanger,
                children: [
                  k.jsx('span', { children: '每页' }),
                  k.jsx('select', {
                    value: t,
                    onChange: e => {
                      return (t = Number(e.target.value)), void (o && o(1, t))
                      var t
                    },
                    className: B.paginationSelect,
                    children: i.map(e =>
                      k.jsx('option', { value: e, children: e }, e),
                    ),
                  }),
                  k.jsx('span', { children: '条' }),
                ],
              }),
          ],
        })
  },
  z = 'index-module__events-list__-m-9O',
  H = 'index-module__events-list-header__IFdcr',
  V = 'index-module__header-cell__Q50BV',
  X = 'index-module__checkbox-cell__fFp2c',
  K = 'index-module__content-cell__XX9h3',
  Q = 'index-module__action-cell__cQC45',
  Z = 'index-module__time-cell__MQe22',
  Y = 'index-module__detail-cell__zq1IN',
  J = 'index-module__sort-icon__tSSwt',
  W = 'index-module__events-list-body__QknuZ',
  ee = 'index-module__event-row__nD7Rz',
  te = 'index-module__selected__QNHpl',
  ae = 'index-module__cell__KsOts',
  ne = 'index-module__event-icon__9UCQ3',
  se = 'index-module__event-content__YCPED',
  le = 'index-module__event-title__530MV',
  ie = 'index-module__event-description__C3Fjc',
  oe = 'index-module__action-tag__GZU05',
  re = 'index-module__event-time__1VIXa',
  de = 'index-module__detail-btn__Q5YpF',
  ce = 'index-module__detail-icon__E5Shy',
  _e = 'index-module__empty-state__ohnRa',
  me = 'index-module__empty-icon__OXdkI',
  ue = 'index-module__events-list-footer__bR9Gm',
  pe = 'index-module__events-list-loading__e6mCh',
  he = 'index-module__loading-spinner__C04N8',
  xe = 'index-module__checkbox-container__UxYEH',
  ge = 'index-module__checkmark__-Dj1c',
  ve = ({
    events: e,
    totalCount: t,
    loading: a,
    sortOptions: n,
    onSortChange: s,
    paginationOptions: l,
    onPaginationChange: i,
    selectedEventIds: o,
    onEventSelect: r,
    onSelectAll: d,
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
      ? k.jsxs('div', {
          className: pe,
          children: [
            k.jsx('div', { className: he }),
            k.jsx('p', { children: '正在加载事件数据...' }),
          ],
        })
      : k.jsxs('div', {
          className: z,
          children: [
            k.jsxs('div', {
              className: H,
              children: [
                k.jsx('div', {
                  className: `${V} ${X}`,
                  children: k.jsxs('label', {
                    className: xe,
                    children: [
                      k.jsx('input', {
                        type: 'checkbox',
                        checked: m,
                        ref: e => {
                          e && (e.indeterminate = u)
                        },
                        onChange: () => {
                          d(!m)
                        },
                        title: m ? '取消全选' : '全选',
                      }),
                      k.jsx('span', { className: ge }),
                    ],
                  }),
                }),
                k.jsx('div', {
                  className: `${V} ${K}`,
                  children: k.jsx('span', { children: '标题和内容' }),
                }),
                k.jsx('div', {
                  className: `${V} ${Q}`,
                  children: k.jsx('span', { children: '操作' }),
                }),
                k.jsxs('div', {
                  className: `${V} ${Z}`,
                  onClick: () =>
                    (e => {
                      const t =
                        n.field === e && 'desc' === n.order ? 'asc' : 'desc'
                      s({ field: e, order: t })
                    })('created_at'),
                  children: [
                    k.jsx('span', { children: '时间' }),
                    k.jsx('span', {
                      className: J,
                      children:
                        ((g = 'created_at'),
                        n.field !== g ? '' : 'desc' === n.order ? '↓' : '↑'),
                    }),
                  ],
                }),
                k.jsx('div', { className: `${V} ${Y}`, children: '详情' }),
              ],
            }),
            k.jsx('div', {
              className: W,
              children:
                0 === e.length
                  ? k.jsxs('div', {
                      className: _e,
                      children: [
                        k.jsx('div', { className: me, children: '📄' }),
                        k.jsx('p', { children: '暂无事件数据' }),
                        k.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
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
                      return k.jsxs(
                        'div',
                        {
                          className: `${ee} ${t ? te : ''}`,
                          children: [
                            k.jsx('div', {
                              className: `${ae} ${X}`,
                              children: k.jsxs('label', {
                                className: xe,
                                children: [
                                  k.jsx('input', {
                                    type: 'checkbox',
                                    checked: t,
                                    onChange: () =>
                                      (e => {
                                        const t = o.includes(e)
                                        r(e, !t)
                                      })(e.id),
                                    title: t ? '取消选择' : '选择此事件',
                                  }),
                                  k.jsx('span', { className: ge }),
                                ],
                              }),
                            }),
                            k.jsxs('div', {
                              className: `${ae} ${K}`,
                              children: [
                                k.jsx('div', { className: ne, children: a }),
                                k.jsxs('div', {
                                  className: se,
                                  children: [
                                    k.jsx('div', {
                                      className: le,
                                      children: n,
                                    }),
                                    k.jsx('div', {
                                      className: ie,
                                      children: x(e),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            k.jsx('div', {
                              className: `${ae} ${Q}`,
                              children: k.jsx('span', {
                                className: oe,
                                children: s,
                              }),
                            }),
                            k.jsx('div', {
                              className: `${ae} ${Z}`,
                              children: k.jsx('span', {
                                className: re,
                                children: p(e.created_at),
                              }),
                            }),
                            k.jsx('div', {
                              className: `${ae} ${Y}`,
                              children: k.jsx('button', {
                                className: de,
                                onClick: () => _(e),
                                title: '查看详情',
                                children: k.jsx('span', {
                                  className: ce,
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
              className: ue,
              children: k.jsx(q, {
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
    var g
  }
class je {
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
        timeout: u.REQUEST_TIMEOUT,
      },
      l = await _(n, s)
    if (!l.ok) {
      const e = await l.text()
      throw m.createApiError(l.status, e || l.statusText, 'GitLab API')
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
      s = await this.request(n, { method: 'GET' })
    return { events: s, total: s.length }
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
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(l, i)
    if (!o.ok) {
      const e = await o.text()
      throw m.createApiError(o.status, e || o.statusText, 'GitLab API')
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
function be(e, t) {
  return new je(e, t)
}
const fe = {
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
  Ne = class e {
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
t(Ne, 'instance')
let Ce = Ne
const ye = ({
    gitlabService: e,
    selectedProjectId: t,
    onProjectSelect: n,
    isConfigValid: s,
    disabled: l = !1,
  }) => {
    const { state: i } = I(),
      [o, r] = a.useState(!1),
      [d, c] = a.useState([]),
      [_, u] = a.useState(!1),
      [p, h] = a.useState(''),
      [x, g] = a.useState('last_activity_at'),
      [v, j] = a.useState({ starred: !1, membership: !0 }),
      [b, f] = a.useState(1),
      [N, C] = a.useState(0),
      [y, E] = a.useState(null),
      w = a.useRef(null),
      S = a.useRef(null),
      T = a.useRef(Ce.getInstance()),
      M = a.useRef(null),
      $ = a.useCallback(
        async (a, l) => {
          if (!s()) return
          const o = a || p || '',
            r = v,
            d = x,
            _ = T.current.get(i.config.gitlabUrl, i.config.gitlabToken, r, d, o)
          if (_ && 1 === (l || b))
            return (
              c(_.projects),
              C(_.totalCount),
              void (!t && _.projects.length > 0 && n(_.projects[0].id))
            )
          u(!0), E(null)
          try {
            await e.init()
            const a = {
                membership: r.membership || void 0,
                starred: r.starred || void 0,
                simple: !0,
                order_by: d,
                search: o || void 0,
                page: l || b,
                per_page: 20,
              },
              { projects: s, total: _ } = await e.getProjectsWithTotal(a)
            1 === (l || b) &&
              T.current.set(
                i.config.gitlabUrl,
                i.config.gitlabToken,
                r,
                d,
                o,
                s,
                _,
              ),
              c(s),
              C(_),
              !t && s.length > 0 && n(s[0].id)
          } catch (h) {
            console.error('Failed to fetch projects:', m.formatErrorMessage(h)),
              E('获取项目列表失败'),
              c([]),
              C(0)
          } finally {
            u(!1)
          }
        },
        [s, e, v, x, p, b, t, n, i.config.gitlabUrl, i.config.gitlabToken],
      ),
      D = a.useMemo(
        () => e => {
          M.current && clearTimeout(M.current),
            (M.current = setTimeout(() => {
              f(1), $(e, 1)
            }, 300))
        },
        [$],
      )
    a.useEffect(() => {
      o && $()
    }, [o, v, x, b, $])
    const A = a.useCallback(
        e => {
          const t = e.target.value
          h(t), D(t)
        },
        [D],
      ),
      L = a.useCallback(e => {
        g(e), f(1)
      }, []),
      O = a.useCallback((e, t) => {
        j(a => ({ ...a, [e]: t })), f(1)
      }, []),
      P = a.useCallback(
        e => {
          n(e), r(!1)
        },
        [n],
      ),
      R = a.useCallback(e => {
        f(e)
      }, [])
    a.useEffect(() => {
      const e = e => {
        w.current && !w.current.contains(e.target) && r(!1)
      }
      return (
        document.addEventListener('mousedown', e),
        () => {
          document.removeEventListener('mousedown', e)
        }
      )
    }, []),
      a.useEffect(() => {
        o && S.current && S.current.focus()
      }, [o])
    const U = a.useMemo(() => d.find(e => e.id === t), [d, t]),
      G = Math.ceil(N / 20)
    return k.jsxs('div', {
      className: fe.projectSelector,
      ref: w,
      children: [
        k.jsxs('div', {
          className: `${fe.selectorTrigger} ${o ? fe.open : ''} ${l ? fe.disabled : ''}`,
          onClick: () => !l && r(!o),
          children: [
            k.jsx('span', {
              className: fe.selectedText,
              children: U ? U.path_with_namespace : '请选择项目',
            }),
            k.jsx('span', {
              className: `${fe.arrow} ${o ? fe.up : fe.down}`,
              children: '▼',
            }),
          ],
        }),
        o &&
          !l &&
          k.jsxs('div', {
            className: fe.dropdown,
            children: [
              k.jsxs('div', {
                className: fe.searchSection,
                children: [
                  k.jsxs('div', {
                    className: fe.searchInput,
                    children: [
                      k.jsx('span', {
                        className: fe.searchIcon,
                        children: '🔍',
                      }),
                      k.jsx('input', {
                        ref: S,
                        type: 'text',
                        placeholder: '搜索项目...',
                        value: p,
                        onChange: A,
                      }),
                    ],
                  }),
                  k.jsxs('div', {
                    className: fe.filtersSection,
                    children: [
                      k.jsxs('div', {
                        className: fe.filterOptions,
                        children: [
                          k.jsxs('label', {
                            className: fe.filterOption,
                            children: [
                              k.jsx('input', {
                                type: 'checkbox',
                                checked: v.membership,
                                onChange: e =>
                                  O('membership', e.target.checked),
                              }),
                              '我的项目',
                            ],
                          }),
                          k.jsxs('label', {
                            className: fe.filterOption,
                            children: [
                              k.jsx('input', {
                                type: 'checkbox',
                                checked: v.starred,
                                onChange: e => O('starred', e.target.checked),
                              }),
                              '已收藏',
                            ],
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: fe.sortOptions,
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
                className: fe.projectList,
                children: _
                  ? k.jsxs('div', {
                      className: fe.loading,
                      children: [
                        k.jsx('div', { className: fe.spinner }),
                        '加载中...',
                      ],
                    })
                  : y
                    ? k.jsx('div', { className: fe.error, children: y })
                    : 0 === d.length
                      ? k.jsxs('div', {
                          className: fe.emptyState,
                          children: [
                            k.jsx('div', {
                              className: fe.emptyIcon,
                              children: '📄',
                            }),
                            k.jsx('div', {
                              className: fe.emptyText,
                              children: '暂无项目',
                            }),
                            k.jsx('div', {
                              className: fe.emptyHint,
                              children: '请检查筛选条件或搜索关键词',
                            }),
                          ],
                        })
                      : d.map(e =>
                          k.jsxs(
                            'div',
                            {
                              className: `${fe.projectItem} ${e.id === t ? fe.selected : ''}`,
                              onClick: () => P(e.id),
                              children: [
                                k.jsxs('div', {
                                  className: fe.projectInfo,
                                  children: [
                                    k.jsx('div', {
                                      className: fe.projectName,
                                      children: e.name,
                                    }),
                                    k.jsx('div', {
                                      className: fe.projectPath,
                                      children: e.path_with_namespace,
                                    }),
                                    e.description &&
                                      k.jsx('div', {
                                        className: fe.projectDescription,
                                        children: e.description,
                                      }),
                                  ],
                                }),
                                e.starred &&
                                  k.jsx('span', {
                                    className: fe.starIcon,
                                    children: '⭐',
                                  }),
                                e.id === t &&
                                  k.jsx('span', {
                                    className: fe.checkIcon,
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
                  className: fe.pagination,
                  children: [
                    k.jsx('button', {
                      className: fe.pageButton,
                      disabled: b <= 1,
                      onClick: () => R(b - 1),
                      children: '上一页',
                    }),
                    k.jsxs('div', {
                      className: fe.pageInfo,
                      children: [
                        k.jsxs('span', { children: [b, ' / ', G] }),
                        k.jsxs('div', {
                          className: fe.totalCount,
                          children: ['共 ', N, ' 个项目'],
                        }),
                      ],
                    }),
                    k.jsx('button', {
                      className: fe.pageButton,
                      disabled: b >= G,
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
  ke = 'index-module__changelogPanel__bsoH5',
  Ee = 'index-module__projectSelectorContainer__DVUJQ',
  we = 'index-module__eventsListContainer__JlSig',
  Se = () => {
    const { state: e, isConfigValid: t } = I(),
      {
        createRequest: n,
        isRequestCancelled: s,
        cleanupRequest: l,
        isAbortError: i,
      } = M(),
      o = a.useMemo(
        () => be(e.config.gitlabUrl, e.config.gitlabToken),
        [e.config.gitlabUrl, e.config.gitlabToken],
      ),
      [r, d] = a.useState(null),
      [c, _] = a.useState([]),
      [u, p] = a.useState(0),
      [h, x] = a.useState(!1),
      [g, v] = a.useState({ field: 'created_at', order: 'desc' }),
      [j, b] = a.useState({ page: 1, pageSize: 20, total: 0 }),
      [f, N] = a.useState([]),
      C = a.useCallback(e => {
        d(e), b(e => ({ ...e, page: 1 }))
      }, []),
      y = a.useCallback(async () => {
        if (!t() || !r) return _([]), void p(0)
        const e = n()
        x(!0)
        try {
          await o.init()
          const t = {
              page: j.page,
              per_page: j.pageSize,
              sort: g.order,
              signal: e.signal,
            },
            { events: a, total: n } = await o.getProjectEventsWithTotal(r, t)
          if (s(e)) return
          _(a), N(a.map(e => e.id)), p(n)
        } catch (a) {
          if (i(a)) return
          console.error(
            '❌ [ChangelogPanel] Failed to fetch events:',
            m.formatErrorMessage(a),
          ),
            _([]),
            p(0)
        } finally {
          s(e) || x(!1), l(e)
        }
      }, [t, o, r, j, g, n, s, i, l])
    a.useEffect(() => {
      y()
    }, [y])
    const E = a.useCallback(e => {
        v(e)
      }, []),
      w = a.useCallback(e => {
        b(e)
      }, []),
      S = a.useCallback((e, t) => {
        N(a => (t ? [...a, e] : a.filter(t => t !== e)))
      }, []),
      T = a.useCallback(
        e => {
          N(e ? c.map(e => e.id) : [])
        },
        [c],
      )
    return k.jsxs('div', {
      className: ke,
      children: [
        k.jsx('div', {
          className: Ee,
          children: k.jsx(ye, {
            gitlabService: o,
            selectedProjectId: r,
            onProjectSelect: C,
            isConfigValid: t,
          }),
        }),
        k.jsx('div', {
          className: we,
          children: k.jsx(ve, {
            events: c,
            totalCount: u,
            loading: h,
            sortOptions: g,
            onSortChange: E,
            paginationOptions: j,
            onPaginationChange: w,
            selectedEventIds: f,
            onEventSelect: S,
            onSelectAll: T,
            onEventDetail: () => {},
          }),
        }),
      ],
    })
  },
  Te = 'index-module__action-btn__To7Ms',
  Ie = 'index-module__checking__QepNt',
  Me = 'index-module__version-btn__8d3di',
  $e = 'index-module__has-update__tNkZZ',
  De = 'index-module__icon__EhhVu',
  Ae = 'index-module__text__4iX-h',
  Le = 'index-module__notification-overlay__E4dh-',
  Oe = 'index-module__notification__ckX1l',
  Pe = 'index-module__notification-header__nJZ3Q',
  Re = 'index-module__close-btn__9uULv',
  Ue = 'index-module__notification-body__nnab7',
  Ge = 'index-module__version-info__-pyIP',
  Fe = 'index-module__release-notes__iU2jG',
  Be = 'index-module__notes-content__ZpxxA',
  qe = 'index-module__notification-footer__La-ia',
  ze = 'index-module__later-btn__Q40Lc',
  He = 'index-module__update-btn__lD1V2',
  Ve = ({ currentVersion: e }) => {
    const [t, n] = a.useState(null),
      [s, l] = a.useState(!1),
      [i, o] = a.useState(!1),
      [r, d] = a.useState(!1),
      [c, m] = a.useState(null),
      [u, p] = a.useState(null),
      [h, x] = a.useState(!1),
      [g, v] = a.useState(new Set())
    a.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && v(new Set(JSON.parse(e)))
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
              (!a && g.has(t.version)) ||
                (d(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              l(!0), p(null)
              try {
                const t = new AbortController(),
                  s = setTimeout(() => t.abort(), 1e4),
                  l = Date.now(),
                  i = 'undefined' != typeof GM_xmlhttpRequest,
                  r =
                    !1 && !i
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  c = await _(`${r}?t=${l}`, {
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
                    ? a || !g.has(p.version)
                      ? (d(!0),
                        console.log(`发现新版本 ${p.version}，建议及时更新！`))
                      : console.log(`发现新版本 ${p.version}，但已被忽略`)
                    : console.log('当前已是最新版本')
              } catch (r) {
                console.error('检查版本更新失败:', r)
                const e = r instanceof Error ? r.message : '检查更新失败'
                p(e), console.error(`检查更新失败: ${e}`)
              } finally {
                l(!1)
              }
            }
        },
        [s, j, e, g, h, t, i],
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
          d(!1),
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
        v(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      C = a.useCallback(() => {
        if ((d(!1), t)) {
          const a = new Set(g)
          a.add(t.version), v(a)
          try {
            localStorage.setItem(
              'gitlab-weekly-report-dismissed-versions',
              JSON.stringify(Array.from(a)),
            )
          } catch (e) {
            console.warn('无法保存忽略版本信息:', e)
          }
        }
      }, [t, g]),
      y = a.useCallback(
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
      k.jsxs(k.Fragment, {
        children: [
          k.jsxs('button', {
            className: `${Te} ${Me} ${s ? Ie : ''} ${i ? $e : ''}`,
            onClick: () => b(!0),
            disabled: s,
            title: c
              ? `上次检查: ${y(c)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              k.jsx('span', { className: De, children: w() }),
              k.jsx('span', { className: Ae, children: E() }),
            ],
          }),
          r &&
            i &&
            t &&
            k.jsx('div', {
              className: Le,
              children: k.jsxs('div', {
                className: Oe,
                children: [
                  k.jsxs('div', {
                    className: Pe,
                    children: [
                      k.jsx('h3', { children: '🎉 发现新版本' }),
                      k.jsx('button', {
                        className: Re,
                        onClick: C,
                        children: '×',
                      }),
                    ],
                  }),
                  k.jsxs('div', {
                    className: Ue,
                    children: [
                      k.jsxs('div', {
                        className: Ge,
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
                          className: Fe,
                          children: [
                            k.jsx('h4', { children: '更新说明:' }),
                            k.jsx('div', {
                              className: Be,
                              children: t.releaseNotes,
                            }),
                          ],
                        }),
                    ],
                  }),
                  k.jsxs('div', {
                    className: qe,
                    children: [
                      k.jsx('button', {
                        className: ze,
                        onClick: C,
                        children: '稍后更新',
                      }),
                      k.jsx('button', {
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
  Xe = 'index-module__config-status__0q8ZM',
  Ke = 'index-module__clickable__pZ86X',
  Qe = 'index-module__status-indicator__MeBgW',
  Ze = 'index-module__status-icon__7jFiQ',
  Ye = 'index-module__status-text__llRfw',
  Je = 'index-module__progress-bar__CFedX',
  We = 'index-module__progress-fill__w-23-',
  et = 'index-module__valid__Xyroo',
  tt = 'index-module__invalid__Fn-hL',
  at = 'index-module__status-details__E1JnL',
  nt = 'index-module__missing-items__8Wn0w',
  st = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  lt = st.length,
  it = ({ config: e, className: t = '', showDetails: n = !1, onClick: s }) => {
    const l = a.useMemo(() => {
      const t = [],
        a = []
      st.forEach(n => {
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
        totalCount: lt,
        progress: (n / lt) * 100,
      }
    }, [e])
    return k.jsxs('div', {
      className: `${Xe} ${t} ${s ? Ke : ''}`,
      onClick: s,
      children: [
        k.jsxs('div', {
          className: `${Qe} ${l.isValid ? et : tt}`,
          children: [
            k.jsx('span', { className: Ze, children: l.isValid ? '✅' : '⚠️' }),
            k.jsx('span', {
              className: Ye,
              children: l.isValid
                ? '就绪'
                : `${l.completedCount}/${l.totalCount}`,
            }),
            !l.isValid &&
              k.jsx('div', {
                className: Je,
                children: k.jsx('div', {
                  className: We,
                  style: { width: `${l.progress}%` },
                }),
              }),
          ],
        }),
        n &&
          !l.isValid &&
          k.jsx('div', {
            className: at,
            children: k.jsx('div', {
              className: nt,
              children: l.missingItems.join(' · '),
            }),
          }),
      ],
    })
  },
  ot = 'index-module__main-panel__82FLm',
  rt = 'index-module__panel-header__kyx4p',
  dt = 'index-module__header-left__xT1T5',
  ct = 'index-module__header-right__7F8Bo',
  _t = 'index-module__mode-toggle__9yafG',
  mt = 'index-module__toggle-track__82VKI',
  ut = 'index-module__toggle-slider__tkY4o',
  pt = 'index-module__slide-right__qPOZu',
  ht = 'index-module__toggle-option__ZhXXU',
  xt = 'index-module__active__Mr5KU',
  gt = 'index-module__toggle-icon__AI6K7',
  vt = 'index-module__toggle-label__1qZLz',
  jt = 'index-module__divider__QXSgp',
  bt = 'index-module__action-buttons__xGRHl',
  ft = 'index-module__action-btn__x4IAP',
  Nt = 'index-module__btn-icon__ZaYHk',
  Ct = 'index-module__btn-label__tM2Rz',
  yt = 'index-module__ai-btn__5kAV3',
  kt = 'index-module__changelog-section__afcqm',
  Et = 'index-module__filter-section__gMBIz',
  wt = 'index-module__events-section__gJwdk',
  St = ({
    appMode: e,
    events: t,
    totalCount: a,
    loading: n,
    filterConditions: s,
    sortOptions: l,
    paginationOptions: i,
    selectedEventIds: o,
    onModeChange: r,
    onFilterChange: d,
    onSortChange: c,
    onPaginationChange: _,
    onEventSelect: m,
    onSelectAll: u,
    onEventDetail: h,
    onOpenSettings: x,
    onOpenAI: g,
  }) => {
    const { state: v } = I()
    return k.jsxs('div', {
      className: ot,
      children: [
        k.jsxs('div', {
          className: rt,
          children: [
            k.jsxs('div', {
              className: dt,
              children: [
                k.jsx('h1', {
                  children:
                    'events' === e ? 'GitLab Events' : 'GitLab Changelog',
                }),
                k.jsx(it, { config: v.config, onClick: x }),
              ],
            }),
            k.jsxs('div', {
              className: ct,
              children: [
                k.jsx(Ve, { currentVersion: p }),
                k.jsx('div', {
                  className: _t,
                  children: k.jsxs('div', {
                    className: mt,
                    children: [
                      k.jsx('div', {
                        className: `${ut} ${'changelog' === e ? pt : ''}`,
                      }),
                      k.jsxs('button', {
                        className: `${ht} ${'events' === e ? xt : ''}`,
                        onClick: () => r('events'),
                        children: [
                          k.jsx('span', { className: gt, children: '📋' }),
                          k.jsx('span', { className: vt, children: 'Events' }),
                        ],
                      }),
                      k.jsxs('button', {
                        className: `${ht} ${'changelog' === e ? xt : ''}`,
                        onClick: () => r('changelog'),
                        children: [
                          k.jsx('span', { className: gt, children: '📝' }),
                          k.jsx('span', {
                            className: vt,
                            children: 'Changelog',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                k.jsx('div', { className: jt }),
                k.jsxs('div', {
                  className: bt,
                  children: [
                    k.jsxs('button', {
                      className: ft,
                      onClick: x,
                      title: '设置',
                      children: [
                        k.jsx('span', {
                          className: Nt,
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
                        k.jsx('span', { className: Ct, children: '设置' }),
                      ],
                    }),
                    k.jsxs('button', {
                      className: `${ft} ${yt}`,
                      onClick: g,
                      title: 'AI 周报',
                      children: [
                        k.jsx('span', {
                          className: Nt,
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
                        k.jsx('span', { className: Ct, children: 'AI 周报' }),
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
                  className: Et,
                  children: k.jsx(F, {
                    filterConditions: s,
                    onFilterChange: d,
                  }),
                }),
                k.jsx('div', {
                  className: wt,
                  children: k.jsx(ve, {
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
          : k.jsx('div', { className: kt, children: k.jsx(Se, {}) }),
      ],
    })
  },
  Tt = 'index-module__modal-mask__XYxyO',
  It = 'index-module__modal-wrapper__bVZip',
  Mt = 'index-module__modal__QQS3u',
  $t = 'index-module__modal-header__GdUjX',
  Dt = 'index-module__modal-title__cafB-',
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
    maskClosable: r = !0,
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
    return k.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: Tt,
      onClick: e => {
        e.target === e.currentTarget && r && o()
      },
      children: k.jsx('div', {
        className: It,
        children: k.jsxs('div', {
          className: Mt,
          style: { width: n, maxHeight: s },
          children: [
            k.jsxs('div', {
              className: $t,
              children: [
                k.jsx('div', { className: Dt, children: t }),
                k.jsx('button', {
                  className: At,
                  onClick: o,
                  children: k.jsx('span', { children: '×' }),
                }),
              ],
            }),
            k.jsx('div', { className: Lt, children: l }),
            i && k.jsx('div', { className: Ot, children: i }),
          ],
        }),
      }),
    })
  },
  Rt = 'index-module__settings-panel__UCg3H',
  Ut = 'index-module__config-overview__kaSMo',
  Gt = 'index-module__settings-tabs__vPH-t',
  Ft = 'index-module__tab-button__FG9Nc',
  Bt = 'index-module__tab-icon__rBe-o',
  qt = 'index-module__active__bsBC1',
  zt = 'index-module__settings-content__TqQPH',
  Ht = 'index-module__tab-panel__Q2QUI',
  Vt = 'index-module__form-group__zKwiA',
  Xt = 'index-module__form-label__pwe7O',
  Kt = 'index-module__required__2vuyW',
  Qt = 'index-module__form-input__jGbRP',
  Zt = 'index-module__form-select__jbXdq',
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
  ra = 'index-module__btn-secondary__cRCpD',
  da = ({ isOpen: e, onClose: t, config: n, onSave: s, theme: l }) => {
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
    const m = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return k.jsx(Pt, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: k.jsxs('div', {
        className: ta,
        children: [
          k.jsx('button', {
            className: ra,
            onClick: () => {
              o(n), d(l)
            },
            children: '重置',
          }),
          k.jsxs('div', {
            className: aa,
            children: [
              k.jsx('button', { className: ra, onClick: t, children: '取消' }),
              k.jsx('button', {
                className: na,
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
      children: k.jsxs('div', {
        className: Rt,
        children: [
          k.jsx('div', {
            className: Ut,
            children: k.jsx(it, { config: i, showDetails: !0 }),
          }),
          k.jsxs('div', {
            className: Gt,
            children: [
              k.jsxs('button', {
                className: `${Ft} ${'gitlab' === c ? qt : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  k.jsx('span', { className: Bt, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${Ft} ${'deepseek' === c ? qt : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  k.jsx('span', { className: Bt, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${Ft} ${'appearance' === c ? qt : ''}`,
                onClick: () => _('appearance'),
                children: [
                  k.jsx('span', { className: Bt, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          k.jsxs('div', {
            className: zt,
            children: [
              'gitlab' === c &&
                k.jsxs('div', {
                  className: Ht,
                  children: [
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsxs('label', {
                          className: Xt,
                          children: [
                            'GitLab 项目地址 ',
                            k.jsx('span', { className: Kt, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Qt,
                          placeholder: h.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => m('gitlabUrl', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsxs('label', {
                          className: Xt,
                          children: [
                            '个人访问令牌 ',
                            k.jsx('span', { className: Kt, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Qt,
                          placeholder: h.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => m('gitlabToken', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                k.jsxs('div', {
                  className: Ht,
                  children: [
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsxs('label', {
                          className: Xt,
                          children: [
                            'DeepSeek API Key ',
                            k.jsx('span', { className: Kt, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: Qt,
                          placeholder: h.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => m('deepseekApiKey', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsx('label', {
                          className: Xt,
                          children: '使用的模型',
                        }),
                        k.jsxs('select', {
                          className: Zt,
                          value: i.model,
                          onChange: e => m('model', e.target.value),
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
                      className: Vt,
                      children: [
                        k.jsx('label', {
                          className: Xt,
                          children: 'Token 数量限制',
                        }),
                        k.jsx('input', {
                          type: 'number',
                          className: Qt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            m('tokenLimit', parseInt(e.target.value)),
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsxs('label', {
                          className: Xt,
                          children: [
                            '默认提示词 ',
                            k.jsx('span', { className: Kt, children: '*' }),
                          ],
                        }),
                        k.jsx('textarea', {
                          className: Yt,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => m('defaultPrompt', e.target.value),
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                k.jsxs('div', {
                  className: Ht,
                  children: [
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsx('label', { className: Xt, children: '主题模式' }),
                        k.jsxs('select', {
                          className: Zt,
                          value: r,
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
                          className: Jt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsx('label', {
                          className: Xt,
                          children: '自动检查更新',
                        }),
                        k.jsxs('div', {
                          className: sa,
                          children: [
                            k.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: la,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                m('autoCheckUpdate', e.target.checked),
                            }),
                            k.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: ia,
                              children: k.jsx('span', { className: oa }),
                            }),
                          ],
                        }),
                        k.jsx('div', {
                          className: Jt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Vt,
                      children: [
                        k.jsx('label', {
                          className: Xt,
                          children: '检查更新间隔',
                        }),
                        k.jsxs('select', {
                          className: Zt,
                          value: i.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            m('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(i.autoCheckUpdate ?? 1),
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
                          className: Jt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          k.jsx('div', {
            className: Wt,
            children: k.jsxs('span', { className: ea, children: ['v', p] }),
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
    dateRange: r,
  }) => {
    const [d, c] = a.useState(n),
      [_, m] = a.useState(!1),
      [u, p] = a.useState(!1)
    a.useEffect(() => {
      c(n)
    }, [n])
    return k.jsx(Pt, {
      visible: e,
      title: 'AI 周报生成',
      width: 800,
      onClose: s,
      maskClosable: !i,
      children: k.jsxs('div', {
        className: ca.aiPanel,
        children: [
          k.jsxs('div', {
            className: ca.dataOverview,
            children: [
              k.jsx('div', {
                className: ca.overviewHeader,
                children: k.jsx('h4', { children: '📊 数据概览' }),
              }),
              k.jsxs('div', {
                className: ca.overviewContent,
                children: [
                  k.jsxs('div', {
                    className: ca.overviewItem,
                    children: [
                      k.jsx('span', {
                        className: ca.overviewLabel,
                        children: '选中事件：',
                      }),
                      k.jsxs('span', {
                        className: ca.overviewValue,
                        children: [o, ' 条'],
                      }),
                    ],
                  }),
                  r &&
                    k.jsxs('div', {
                      className: ca.overviewItem,
                      children: [
                        k.jsx('span', {
                          className: ca.overviewLabel,
                          children: '日期范围：',
                        }),
                        k.jsxs('span', {
                          className: ca.overviewValue,
                          children: [r.startDate, ' 至 ', r.endDate],
                        }),
                      ],
                    }),
                  k.jsxs('div', {
                    className: ca.overviewItem,
                    children: [
                      k.jsx('span', {
                        className: ca.overviewLabel,
                        children: '状态：',
                      }),
                      k.jsx('span', {
                        className: `${ca.overviewValue} ${o > 0 ? ca.ready : ca.waiting}`,
                        children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          k.jsxs('div', {
            className: ca.promptSection,
            children: [
              k.jsxs('div', {
                className: ca.sectionHeader,
                children: [
                  k.jsx('h3', { children: '提示词' }),
                  k.jsxs('div', {
                    className: ca.headerActions,
                    children: [
                      k.jsx('button', {
                        className: ca.btnText,
                        onClick: () => m(!_),
                        children: _ ? '收起' : '展开',
                      }),
                      k.jsx('button', {
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
              k.jsxs('div', {
                className: `${ca.promptEditor} ${_ ? ca.expanded : ''}`,
                children: [
                  k.jsx('textarea', {
                    className: ca.promptTextarea,
                    value: d,
                    onChange: e => c(e.target.value),
                    placeholder: '请输入用于生成周报的提示词...',
                    rows: _ ? 15 : 6,
                    disabled: i,
                  }),
                  k.jsxs('div', {
                    className: ca.promptFooter,
                    children: [
                      k.jsxs('span', {
                        className: ca.charCount,
                        children: [d.length, ' 字符'],
                      }),
                      k.jsx('button', {
                        className: `${ca.btnPrimary} ${(null == t ? void 0 : t.result) ? ca.regenerate : ''}`,
                        onClick: () => {
                          l(d)
                        },
                        disabled: i || !d.trim(),
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
            k.jsxs('div', {
              className: ca.loadingSection,
              children: [
                k.jsx('div', { className: ca.loadingSpinner }),
                k.jsx('p', { children: 'AI 正在分析事件数据，生成周报中...' }),
                k.jsx('div', {
                  className: ca.loadingTips,
                  children: k.jsx('span', {
                    children: '💡 生成时间通常为 10-30 秒',
                  }),
                }),
              ],
            }),
          (null == t ? void 0 : t.result) &&
            k.jsxs('div', {
              className: ca.resultSection,
              children: [
                k.jsxs('div', {
                  className: ca.resultHeader,
                  children: [
                    k.jsxs('h3', {
                      className: ca.resultTitle,
                      children: [
                        k.jsx('span', {
                          className: ca.titleIcon,
                          children: '✨',
                        }),
                        '生成结果',
                      ],
                    }),
                    k.jsx('div', {
                      className: ca.resultActions,
                      children: k.jsxs('button', {
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
                          k.jsx('span', {
                            className: ca.btnIcon,
                            children: u ? '✅' : '📋',
                          }),
                          u ? '已复制' : '复制',
                        ],
                      }),
                    }),
                  ],
                }),
                k.jsx('div', {
                  className: ca.resultContent,
                  children: k.jsx('div', {
                    className: ca.resultText,
                    children: t.result,
                  }),
                }),
                k.jsx('div', {
                  className: ca.resultMeta,
                  children: k.jsxs('div', {
                    className: ca.metaLeft,
                    children: [
                      k.jsx('div', {
                        className: ca.metaItem,
                        children: k.jsxs('span', {
                          children: [t.result.split('\n').length, ' 行'],
                        }),
                      }),
                      k.jsx('div', {
                        className: ca.metaItem,
                        children: k.jsxs('span', {
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
            k.jsxs('div', {
              className: ca.emptyResult,
              children: [
                k.jsx('div', { className: ca.emptyIcon, children: '🤖' }),
                k.jsx('h3', { children: '准备生成 AI 周报' }),
                k.jsx('p', {
                  children:
                    '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                }),
                k.jsxs('div', {
                  className: ca.emptyFeatures,
                  children: [
                    k.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        k.jsx('span', {
                          className: ca.featureIcon,
                          children: '📊',
                        }),
                        k.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        k.jsx('span', {
                          className: ca.featureIcon,
                          children: '📝',
                        }),
                        k.jsx('span', { children: '自动生成周报内容' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: ca.featureItem,
                      children: [
                        k.jsx('span', {
                          className: ca.featureIcon,
                          children: '🎯',
                        }),
                        k.jsx('span', { children: '突出重点工作成果' }),
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
    return k.jsx('div', {
      className: ma.eventDetailModalOverlay,
      onClick: a,
      children: k.jsxs('div', {
        className: ma.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          k.jsxs('div', {
            className: ma.modalHeader,
            children: [
              k.jsx('h2', { children: '事件详情' }),
              k.jsx('button', {
                className: ma.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          k.jsxs('div', {
            className: ma.modalContent,
            children: [
              k.jsxs('div', {
                className: `${ma.detailSection} ${ma.compact}`,
                children: [
                  k.jsx('h3', { children: '基本信息' }),
                  k.jsxs('div', {
                    className: `${ma.detailGrid} ${ma.compactGrid}`,
                    children: [
                      k.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ma.label,
                            children: 'ID:',
                          }),
                          k.jsx('span', {
                            className: ma.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ma.label,
                            children: '类型:',
                          }),
                          k.jsx('span', {
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
                      k.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ma.label,
                            children: '操作:',
                          }),
                          k.jsx('span', {
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
                      k.jsxs('div', {
                        className: ma.detailItem,
                        children: [
                          k.jsx('span', {
                            className: ma.label,
                            children: '时间:',
                          }),
                          k.jsx('span', {
                            className: ma.value,
                            children: n(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        k.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ma.label,
                              children: '状态:',
                            }),
                            k.jsx('span', {
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
                k.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    k.jsx('h3', { children: '内容' }),
                    k.jsxs('div', {
                      className: `${ma.detailContent} ${ma.compactContent}`,
                      children: [
                        e.title &&
                          k.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ma.label,
                                children: '标题:',
                              }),
                              k.jsx('span', {
                                className: ma.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          k.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ma.label,
                                children: '目标:',
                              }),
                              k.jsx('span', {
                                className: ma.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          k.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ma.label,
                                children: '标签:',
                              }),
                              k.jsx('div', {
                                className: ma.labels,
                                children: e.labels.map((e, t) =>
                                  k.jsx(
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
                k.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    k.jsx('h3', { children: '作者' }),
                    k.jsxs('div', {
                      className: `${ma.authorInfo} ${ma.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          k.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: ma.authorAvatar,
                          }),
                        k.jsxs('div', {
                          className: ma.authorDetails,
                          children: [
                            k.jsx('div', {
                              className: ma.authorName,
                              children: e.author.name,
                            }),
                            k.jsxs('div', {
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
                k.jsxs('div', {
                  className: `${ma.detailSection} ${ma.compact}`,
                  children: [
                    k.jsx('h3', { children: '项目' }),
                    k.jsx('div', {
                      className: `${ma.projectInfo} ${ma.compactProject}`,
                      children: e.project
                        ? k.jsxs(k.Fragment, {
                            children: [
                              k.jsxs('div', {
                                className: ma.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: ma.label,
                                    children: '名称:',
                                  }),
                                  k.jsx('span', {
                                    className: ma.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              k.jsxs('div', {
                                className: ma.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: ma.label,
                                    children: '路径:',
                                  }),
                                  k.jsx('span', {
                                    className: ma.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : k.jsxs('div', {
                            className: ma.detailItem,
                            children: [
                              k.jsx('span', {
                                className: ma.label,
                                children: '项目ID:',
                              }),
                              k.jsx('span', {
                                className: ma.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                k.jsxs('div', {
                  className: ma.detailSection,
                  children: [
                    k.jsx('h3', { children: '推送信息' }),
                    k.jsxs('div', {
                      className: ma.pushInfo,
                      children: [
                        k.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ma.label,
                              children: '分支:',
                            }),
                            k.jsx('span', {
                              className: ma.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ma.label,
                              children: '提交数量:',
                            }),
                            k.jsx('span', {
                              className: ma.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ma.label,
                              children: '提交标题:',
                            }),
                            k.jsx('span', {
                              className: ma.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: ma.detailItem,
                          children: [
                            k.jsx('span', {
                              className: ma.label,
                              children: '提交哈希:',
                            }),
                            k.jsx('span', {
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
                k.jsxs('div', {
                  className: ma.detailSection,
                  children: [
                    k.jsx('h3', { children: '评论信息' }),
                    k.jsxs('div', {
                      className: ma.noteInfo,
                      children: [
                        k.jsx('div', {
                          className: ma.noteBody,
                          children: e.note.body,
                        }),
                        k.jsxs('div', {
                          className: ma.noteMeta,
                          children: [
                            k.jsxs('span', {
                              children: ['创建时间: ', n(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              k.jsxs('span', {
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
          k.jsxs('div', {
            className: ma.modalFooter,
            children: [
              s() &&
                k.jsx('a', {
                  href: s(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: ma.sourceLinkBtn,
                  children: '打开源页面',
                }),
              k.jsx('button', {
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
        updateFilterConditions: r,
        updateSortOptions: d,
        updatePaginationOptions: _,
        setEvents: u,
        setTotal: p,
        setAIGenerationConfig: h,
        setLoading: x,
        setError: g,
        isConfigValid: v,
        getTimeRange: j,
      } = I(),
      {
        createRequest: b,
        isRequestCancelled: f,
        cleanupRequest: N,
        isAbortError: C,
      } = M(),
      y = a.useMemo(
        () => be(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [E, w] = a.useState(null),
      [T, $] = a.useState(!1),
      [D, A] = a.useState([]),
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
        if (!v()) return void g(c.INVALID_FILTER_OR_CONFIG)
        const s = b()
        x(!0), g(null)
        try {
          await y.init()
          const { startDate: l, endDate: i } = j(),
            o = e || t.filterConditions,
            r =
              (null == (a = o.targetType) ? void 0 : a.length) > 0
                ? o.targetType
                : void 0,
            d =
              (null == (n = o.action) ? void 0 : n.length) > 0
                ? o.action
                : void 0,
            c = t.sortOptions.order || 'desc',
            _ = await y.getCurrentUser(),
            m = {
              after: l,
              before: i,
              target_type: r,
              action: d,
              page: t.paginationOptions.page,
              per_page: t.paginationOptions.pageSize,
              sort: c,
              signal: s.signal,
            },
            { events: h, total: x } = await y.getUserEventsWithTotal(_.id, m)
          if (f(s)) return
          u(h), A(h.map(e => e.id)), p(x)
        } catch (l) {
          if (C(l)) return
          const e = m.formatErrorMessage(l)
          g(e), u([]), p(0)
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
        g,
        v,
        y,
        b,
        f,
        C,
        N,
      ],
    )
    a.useEffect(() => {
      v() && O()
    }, [v, O])
    const P = a.useCallback(async () => {
      if (v()) {
        x(!0), g(null)
        try {
          await y.init()
          const e = await y.getProjects({
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
          g(t), o([])
        } finally {
          x(!1)
        }
      } else g(c.INVALID_FILTER_OR_CONFIG)
    }, [y, v, o, x, g])
    return k.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${pa.app} ${e ? pa.userscriptMode : pa.webMode} ${pa[L]}`,
      children: [
        k.jsx(St, {
          appMode: t.appMode,
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: D,
          onModeChange: async e => {
            i(e), 'changelog' === e ? await P() : v() && O()
          },
          onFilterChange: e => {
            r(e), O(e)
          },
          onSortChange: e => {
            d(e)
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
            v() ? l('ai') : g(c.INCOMPLETE_GITLAB_DEEPSEEK)
          },
        }),
        k.jsx(ua, {
          event: E,
          visible: T,
          onClose: () => {
            $(!1), w(null)
          },
        }),
        k.jsx(da, {
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
        k.jsx(_a, {
          visible: 'ai' === t.activePanel,
          config: t.aiGenerationConfig,
          defaultPrompt: t.config.defaultPrompt,
          onClose: () => {
            l('main')
          },
          onGenerate: async e => {
            if (v())
              if (0 !== D.length) {
                x(!0), g(null)
                try {
                  const a = t.events
                      .filter(e => D.includes(e.id))
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
                              })(e)) in S
                            )
                              return
                            S[e] = !0
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
                          './deepseek-api-Bw3vL-a0.js'
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
                  g(e), x(!1)
                }
              } else g(c.NO_EVENTS_SELECTED)
            else g(c.INCOMPLETE_CONFIG)
          },
          isLoading: t.isLoading,
          selectedEventsCount: D.length,
          dateRange: j(),
        }),
      ],
    })
  }
E.createRoot(document.getElementById('root')).render(
  k.jsx(s.StrictMode, { children: k.jsx(ha, {}) }),
)
