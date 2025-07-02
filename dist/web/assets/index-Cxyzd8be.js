const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-BWwTTebD.js', 'assets/utils-Du_70uOm.js']),
) => i.map(i => d[i])
var e = Object.defineProperty,
  t = (t, a, s) =>
    ((t, a, s) =>
      a in t
        ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: s })
        : (t[a] = s))(t, 'symbol' != typeof a ? a + '' : a, s)
import { r as a, a as s, R as n } from './vendor-DtYzeC-x.js'
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
} from './utils-Du_70uOm.js'
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
function k(e, t, a) {
  var s,
    n = {},
    l = null,
    i = null
  for (s in (void 0 !== a && (l = '' + a),
  void 0 !== t.key && (l = '' + t.key),
  void 0 !== t.ref && (i = t.ref),
  t))
    f.call(t, s) && !C.hasOwnProperty(s) && (n[s] = t[s])
  if (e && e.defaultProps)
    for (s in (t = e.defaultProps)) void 0 === n[s] && (n[s] = t[s])
  return { $$typeof: j, type: e, key: l, ref: i, props: n, _owner: N.current }
}
;(g.Fragment = b), (g.jsx = k), (g.jsxs = k), (x.exports = g)
var y = x.exports,
  E = {},
  w = s
;(E.createRoot = w.createRoot), (E.hydrateRoot = w.hydrateRoot)
const S = {},
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
function $() {
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
  const s = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, ...e }
        try {
          r.saveConfig(a)
        } catch (s) {
          console.error('Failed to save config:', s)
        }
        return { ...t, config: a }
      })
    }, []),
    n = a.useCallback(e => {
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
          r.saveConfig(a)
        } catch (s) {
          console.error('Failed to save theme:', s)
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
        } catch (s) {
          console.error('Failed to save theme:', s)
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
        deepseekApiKey: s,
        defaultPrompt: n,
      } = e.config
      return !!(t.trim() && a.trim() && s.trim() && n.trim())
    }, [e.config]),
    k = a.useCallback(() => {
      const t = new Date(),
        a = e.filterConditions.timeRange,
        s = 864e5,
        n = new Date(t.getTime() + s)
      if ('week' === a) {
        const e = t.getDay()
        let a = 0 === e ? 6 : e - 1
        1 === e && (a += 1)
        return {
          startDate: new Date(t.getTime() - a * s).toISOString().split('T')[0],
          endDate: n.toISOString().split('T')[0],
        }
      }
      let l = 7
      l = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[a] || 7
      return {
        startDate: new Date(t.getTime() - l * s).toISOString().split('T')[0],
        endDate: n.toISOString().split('T')[0],
      }
    }, [e.filterConditions.timeRange])
  return {
    state: e,
    updateConfig: s,
    setActivePanel: n,
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
    getTimeRange: k,
  }
}
const I = () => {
    const e = a.useRef(null),
      t = a.useCallback(() => {
        e.current && e.current.abort()
        const t = new AbortController()
        return (e.current = t), t
      }, []),
      s = a.useCallback(() => {
        e.current && (e.current.abort(), (e.current = null))
      }, []),
      n = a.useCallback(e => e.signal.aborted, []),
      l = a.useCallback(t => {
        e.current === t && (e.current = null)
      }, []),
      i = a.useCallback(e => e instanceof Error && 'AbortError' === e.name, [])
    return (
      a.useEffect(
        () => () => {
          s()
        },
        [s],
      ),
      {
        createRequest: t,
        cancelRequest: s,
        isRequestCancelled: n,
        cleanupRequest: l,
        isAbortError: i,
      }
    )
  },
  M = 'index-module__filter-section-content__y5rEz',
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
    const a = (a, s) => {
        t({ ...e, [a]: s })
      },
      s = [
        { key: 'targetType', label: '目标类型', options: U },
        { key: 'action', label: '操作类型', options: G },
      ]
    return y.jsxs('div', {
      className: M,
      children: [
        y.jsxs('div', {
          className: D,
          children: [
            y.jsx('label', { className: A, children: '时间范围' }),
            y.jsx('div', {
              className: L,
              children: R.map(({ value: t, label: s }) =>
                y.jsx(
                  'button',
                  {
                    className: `${O} ${e.timeRange === t ? P : ''}`,
                    onClick: () => a('timeRange', t),
                    children: s,
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
        s.map(({ key: t, label: s, options: n }) =>
          y.jsxs(
            'div',
            {
              className: D,
              children: [
                y.jsx('label', { className: A, children: s }),
                y.jsxs('div', {
                  className: L,
                  children: [
                    y.jsx('button', {
                      className: `${O} ${0 === e[t].length ? P : ''}`,
                      onClick: () => a(t, []),
                      children: '全部',
                    }),
                    n.map(({ value: s, label: n }) =>
                      y.jsx(
                        'button',
                        {
                          className: `${O} ${Array.isArray(e[t]) && e[t].includes(s) ? P : ''}`,
                          onClick: () =>
                            ((t, s, n) => {
                              const l = e[t],
                                i = n ? [...l, s] : l.filter(e => e !== s)
                              a(t, i)
                            })(t, s, !e[t].includes(s)),
                          children: n,
                        },
                        s,
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
  V = n.memo(
    ({
      current: e,
      pageSize: t,
      total: a,
      onChange: s,
      showSizeChanger: l = !0,
      pageSizeOptions: i = [20, 50, 100, 200],
      onShowSizeChange: o,
      selectedCount: d = 0,
    }) => {
      const r = Math.ceil(a / t),
        c = (e - 1) * t + 1,
        _ = Math.min(e * t, a),
        m = t => {
          t >= 1 && t <= r && t !== e && s(t)
        }
      return 0 === a
        ? y.jsx('div', {
            className: B.pagination,
            children: y.jsx('div', {
              className: B.info,
              children: y.jsx('span', { children: '暂无数据' }),
            }),
          })
        : y.jsxs('div', {
            className: B.pagination,
            children: [
              y.jsxs('div', {
                className: B.paginationInfo,
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
                className: B.paginationControls,
                children: [
                  y.jsx('button', {
                    className: `${B.paginationBtn} ${1 === e ? B.disabled : ''}`,
                    onClick: () => m(e - 1),
                    disabled: 1 === e,
                    children: y.jsx('span', { children: '‹' }),
                  }),
                  (() => {
                    if (r <= 7)
                      return Array.from({ length: r }, (e, t) => t + 1)
                    const t = [1],
                      a = Math.max(2, e - 2),
                      s = Math.min(r - 1, e + 2)
                    e > 4 && t.push('...')
                    for (let e = a; e <= s; e++) t.push(e)
                    return e < r - 2 - 1 && t.push('...'), t.push(r), t
                  })().map((t, a) =>
                    y.jsx(
                      n.Fragment,
                      {
                        children:
                          'number' == typeof t
                            ? y.jsx('button', {
                                className: `${B.paginationBtn} ${e === t ? B.active : ''}`,
                                onClick: () => m(t),
                                children: t,
                              })
                            : y.jsx('span', {
                                className: B.paginationEllipsis,
                                children: t,
                              }),
                      },
                      a,
                    ),
                  ),
                  y.jsx('button', {
                    className: `${B.paginationBtn} ${e === r ? B.disabled : ''}`,
                    onClick: () => m(e + 1),
                    disabled: e === r,
                    children: y.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              l &&
                y.jsxs('div', {
                  className: B.paginationSizeChanger,
                  children: [
                    y.jsx('span', { children: '每页' }),
                    y.jsx('select', {
                      value: t,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (o && o(1, t))
                        var t
                      },
                      className: B.paginationSelect,
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
  ),
  q = 'index-module__events-list__-m-9O',
  z = 'index-module__events-list-header__IFdcr',
  H = 'index-module__header-cell__Q50BV',
  X = 'index-module__checkbox-cell__fFp2c',
  K = 'index-module__content-cell__XX9h3',
  Q = 'index-module__action-cell__cQC45',
  Y = 'index-module__time-cell__MQe22',
  Z = 'index-module__detail-cell__zq1IN',
  J = 'index-module__sort-icon__tSSwt',
  W = 'index-module__events-list-body__QknuZ',
  ee = 'index-module__event-row__nD7Rz',
  te = 'index-module__selected__QNHpl',
  ae = 'index-module__cell__KsOts',
  se = 'index-module__event-icon__9UCQ3',
  ne = 'index-module__event-content__YCPED',
  le = 'index-module__event-title__530MV',
  ie = 'index-module__event-description__C3Fjc',
  oe = 'index-module__action-tag__GZU05',
  de = 'index-module__event-time__1VIXa',
  re = 'index-module__detail-btn__Q5YpF',
  ce = 'index-module__detail-icon__E5Shy',
  _e = 'index-module__empty-state__ohnRa',
  me = 'index-module__empty-icon__OXdkI',
  ue = 'index-module__events-list-footer__bR9Gm',
  pe = 'index-module__events-list-loading__e6mCh',
  he = 'index-module__loading-spinner__C04N8',
  xe = 'index-module__checkbox-container__UxYEH',
  ge = 'index-module__checkmark__-Dj1c',
  ve = n.memo(
    ({
      events: e,
      totalCount: t,
      loading: s,
      sortOptions: n,
      onSortChange: l,
      paginationOptions: i,
      onPaginationChange: o,
      selectedEventIds: d,
      onEventSelect: r,
      onSelectAll: _,
      onEventDetail: m,
    }) => {
      const u = a.useCallback(
          e => {
            if ('created_at' !== e) return
            const t = n.field === e && 'desc' === n.order ? 'asc' : 'desc'
            l({ field: e, order: t })
          },
          [n.field, n.order, l],
        ),
        p = a.useCallback(
          e => (n.field !== e ? '' : 'desc' === n.order ? '↓' : '↑'),
          [n.field, n.order],
        ),
        h = a.useMemo(
          () => e.length > 0 && e.every(e => d.includes(e.id)),
          [e, d],
        ),
        x = a.useMemo(() => d.length > 0 && !h, [d.length, h]),
        g = a.useCallback(() => {
          _(!h)
        }, [_, h]),
        v = a.useCallback(
          e => {
            const t = d.includes(e)
            r(e, !t)
          },
          [d, r],
        ),
        j = a.useCallback(e => {
          const t = new Date(e),
            a = new Date(),
            s =
              new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() -
              new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
            n = Math.floor(s / 864e5),
            l = t.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          return 0 === n
            ? `今天 ${l}`
            : 1 === n
              ? `昨天 ${l}`
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
            const s = e.title || e.target_title || '无标题',
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
              l = (a && n[a]) || (t && n[t])
            return l
              ? { ...l, title: s }
              : { icon: '📋', actionType: a || t || '未知操作', title: b(e) }
          },
          [b],
        ),
        N = a.useCallback(e => {
          var t
          return e.push_data
            ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
            : e.note && e.target_title
              ? e.target_title
              : (null == (t = e.project) ? void 0 : t.path_with_namespace) ||
                `项目ID: ${e.project_id}` ||
                '未知项目'
        }, [])
      return y.jsxs('div', {
        className: q,
        children: [
          y.jsxs('div', {
            className: z,
            children: [
              y.jsx('div', {
                className: `${H} ${X}`,
                children: y.jsxs('label', {
                  className: xe,
                  children: [
                    y.jsx('input', {
                      type: 'checkbox',
                      checked: h,
                      ref: e => {
                        e && (e.indeterminate = x)
                      },
                      onChange: g,
                      title: h ? '取消全选' : '全选',
                    }),
                    y.jsx('span', { className: ge }),
                  ],
                }),
              }),
              y.jsx('div', {
                className: `${H} ${K}`,
                children: y.jsx('span', { children: '标题和内容' }),
              }),
              y.jsx('div', {
                className: `${H} ${Q}`,
                children: y.jsx('span', { children: '操作' }),
              }),
              y.jsxs('div', {
                className: `${H} ${Y}`,
                onClick: () => u('created_at'),
                children: [
                  y.jsx('span', { children: '时间' }),
                  y.jsx('span', { className: J, children: p('created_at') }),
                ],
              }),
              y.jsx('div', { className: `${H} ${Z}`, children: '详情' }),
            ],
          }),
          y.jsx('div', {
            className: W,
            children: s
              ? y.jsxs('div', {
                  className: pe,
                  children: [
                    y.jsx('div', { className: he }),
                    y.jsx('p', { children: '正在加载事件数据...' }),
                  ],
                })
              : 0 === e.length
                ? y.jsxs('div', {
                    className: _e,
                    children: [
                      y.jsx('div', { className: me, children: '📄' }),
                      y.jsx('p', { children: '暂无事件数据' }),
                      y.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
                    ],
                  })
                : e.map(e => {
                    const t = d.includes(e.id),
                      { icon: a, title: s, actionType: n } = f(e)
                    return y.jsxs(
                      'div',
                      {
                        className: `${ee} ${t ? te : ''}`,
                        children: [
                          y.jsx('div', {
                            className: `${ae} ${X}`,
                            children: y.jsxs('label', {
                              className: xe,
                              children: [
                                y.jsx('input', {
                                  type: 'checkbox',
                                  checked: t,
                                  onChange: () => v(e.id),
                                  title: t ? '取消选择' : '选择此事件',
                                }),
                                y.jsx('span', { className: ge }),
                              ],
                            }),
                          }),
                          y.jsxs('div', {
                            className: `${ae} ${K}`,
                            children: [
                              y.jsx('div', { className: se, children: a }),
                              y.jsxs('div', {
                                className: ne,
                                children: [
                                  y.jsx('div', { className: le, children: s }),
                                  y.jsx('div', {
                                    className: ie,
                                    children: N(e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          y.jsx('div', {
                            className: `${ae} ${Q}`,
                            children: y.jsx('span', {
                              className: oe,
                              children: n,
                            }),
                          }),
                          y.jsx('div', {
                            className: `${ae} ${Y}`,
                            children: y.jsx('span', {
                              className: de,
                              children: j(e.created_at),
                            }),
                          }),
                          y.jsx('div', {
                            className: `${ae} ${Z}`,
                            children: y.jsx('button', {
                              className: re,
                              onClick: () => m(e),
                              title: '查看详情',
                              children: y.jsx('span', {
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
          y.jsx('div', {
            className: ue,
            children: y.jsx(V, {
              current: i.page,
              pageSize: i.pageSize,
              total: t,
              onChange: e => o({ ...i, page: e }),
              showSizeChanger: !0,
              onShowSizeChange: (e, a) => o({ page: e, pageSize: a, total: t }),
              selectedCount: d.length,
            }),
          }),
        ],
      })
    },
  )
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
      s = {
        method: t.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        body: t.body,
      },
      n = await _(a, s)
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
      s = `${this.baseUrl}${a}`,
      n = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
      },
      l = await _(s, n)
    if (!l.ok) {
      const e = await l.text()
      throw m.createApiError(l.status, e || l.statusText, 'GitLab API')
    }
    const i = await l.json()
    let o = 0,
      d = ''
    if (l.headers instanceof Headers)
      (d =
        l.headers.get('x-total') ||
        l.headers.get('X-Total') ||
        l.headers.get('x-total-count') ||
        l.headers.get('X-Total-Count') ||
        ''),
        (o = parseInt(d || '0', 10))
    else {
      if ('string' == typeof l.headers) {
        const e = l.headers.split('\n')
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
      o = parseInt(d || '0', 10)
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
    const s = `/users/${e}/events?${a.toString()}`,
      n = await this.request(s, { method: 'GET' })
    return { events: n, total: n.length }
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
    const s = a.toString(),
      n = s ? `/projects/${e}/events?${s}` : `/projects/${e}/events`,
      l = `${this.baseUrl}${n}`,
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
    getCacheKey(e, t, a, s, n) {
      return `${e}_${t}_${JSON.stringify(a)}_${s}_${n}`
    }
    get(e, t, a, s, n) {
      const l = this.getCacheKey(e, t, a, s, n),
        i = this.cache.get(l)
      return i && Date.now() - i.timestamp < this.CACHE_DURATION
        ? i
        : (this.cache.delete(l), null)
    }
    set(e, t, a, s, n, l, i) {
      const o = this.getCacheKey(e, t, a, s, n)
      this.cache.set(o, {
        projects: l,
        totalCount: i,
        timestamp: Date.now(),
        filters: a,
        sortBy: s,
        searchValue: n,
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
const ke = ({
    gitlabService: e,
    selectedProjectId: t,
    onProjectSelect: s,
    isConfigValid: n,
    disabled: l = !1,
    autoLoad: i = !1,
  }) => {
    const { state: o } = $(),
      [d, r] = a.useState(!1),
      [c, _] = a.useState([]),
      [u, p] = a.useState(!1),
      [h, x] = a.useState(''),
      [g, v] = a.useState('last_activity_at'),
      [j, b] = a.useState({ starred: !1, membership: !0 }),
      [f, N] = a.useState(1),
      [C, k] = a.useState(0),
      [E, w] = a.useState(null),
      S = a.useRef(null),
      T = a.useRef(null),
      I = a.useRef(Ce.getInstance()),
      M = a.useRef(null),
      D = a.useCallback(
        async (a, l) => {
          if (!n()) return
          const i = a || h || '',
            d = j,
            r = g,
            c = I.current.get(o.config.gitlabUrl, o.config.gitlabToken, d, r, i)
          if (c && 1 === (l || f))
            return (
              _(c.projects),
              k(c.totalCount),
              void (!t && c.projects.length > 0 && s(c.projects[0].id))
            )
          p(!0), w(null)
          try {
            await e.init()
            const a = {
                membership: d.membership || void 0,
                starred: d.starred || void 0,
                simple: !0,
                order_by: r,
                search: i || void 0,
                page: l || f,
                per_page: 20,
              },
              { projects: n, total: c } = await e.getProjectsWithTotal(a)
            1 === (l || f) &&
              I.current.set(
                o.config.gitlabUrl,
                o.config.gitlabToken,
                d,
                r,
                i,
                n,
                c,
              ),
              _(n),
              k(c),
              !t && n.length > 0 && s(n[0].id)
          } catch (u) {
            console.error('Failed to fetch projects:', m.formatErrorMessage(u)),
              w('获取项目列表失败'),
              _([]),
              k(0)
          } finally {
            p(!1)
          }
        },
        [n, e, j, g, h, f, t, s, o.config.gitlabUrl, o.config.gitlabToken],
      ),
      A = a.useMemo(
        () => e => {
          M.current && clearTimeout(M.current),
            (M.current = setTimeout(() => {
              N(1), D(e, 1)
            }, 300))
        },
        [D],
      )
    a.useEffect(() => {
      d && D()
    }, [d, j, g, f, D]),
      a.useEffect(() => {
        i && n() && D()
      }, [i, n, D])
    const L = a.useCallback(
        e => {
          const t = e.target.value
          x(t), A(t)
        },
        [A],
      ),
      O = a.useCallback(e => {
        v(e), N(1)
      }, []),
      P = a.useCallback((e, t) => {
        b(a => ({ ...a, [e]: t })), N(1)
      }, []),
      R = a.useCallback(
        e => {
          s(e), r(!1)
        },
        [s],
      ),
      U = a.useCallback(e => {
        N(e)
      }, [])
    a.useEffect(() => {
      const e = e => {
        S.current && !S.current.contains(e.target) && r(!1)
      }
      return (
        document.addEventListener('mousedown', e),
        () => {
          document.removeEventListener('mousedown', e)
        }
      )
    }, []),
      a.useEffect(() => {
        d && T.current && T.current.focus()
      }, [d])
    const G = a.useMemo(() => c.find(e => e.id === t), [c, t]),
      F = Math.ceil(C / 20)
    return y.jsxs('div', {
      className: fe.projectSelector,
      ref: S,
      children: [
        y.jsxs('div', {
          className: `${fe.selectorTrigger} ${d ? fe.open : ''} ${l ? fe.disabled : ''}`,
          onClick: () => !l && r(!d),
          children: [
            y.jsx('span', {
              className: fe.selectedText,
              children: G ? G.path_with_namespace : '请选择项目',
            }),
            y.jsx('span', {
              className: `${fe.arrow} ${d ? fe.up : fe.down}`,
              children: '▼',
            }),
          ],
        }),
        d &&
          !l &&
          y.jsxs('div', {
            className: fe.dropdown,
            children: [
              y.jsxs('div', {
                className: fe.searchSection,
                children: [
                  y.jsxs('div', {
                    className: fe.searchInput,
                    children: [
                      y.jsx('span', {
                        className: fe.searchIcon,
                        children: '🔍',
                      }),
                      y.jsx('input', {
                        ref: T,
                        type: 'text',
                        placeholder: '搜索项目...',
                        value: h,
                        onChange: L,
                      }),
                    ],
                  }),
                  y.jsxs('div', {
                    className: fe.filtersSection,
                    children: [
                      y.jsxs('div', {
                        className: fe.filterOptions,
                        children: [
                          y.jsxs('label', {
                            className: fe.filterOption,
                            children: [
                              y.jsx('input', {
                                type: 'checkbox',
                                checked: j.membership,
                                onChange: e =>
                                  P('membership', e.target.checked),
                              }),
                              '我的项目',
                            ],
                          }),
                          y.jsxs('label', {
                            className: fe.filterOption,
                            children: [
                              y.jsx('input', {
                                type: 'checkbox',
                                checked: j.starred,
                                onChange: e => P('starred', e.target.checked),
                              }),
                              '已收藏',
                            ],
                          }),
                        ],
                      }),
                      y.jsxs('div', {
                        className: fe.sortOptions,
                        children: [
                          y.jsx('label', { children: '排序：' }),
                          y.jsxs('select', {
                            value: g,
                            onChange: e => O(e.target.value),
                            children: [
                              y.jsx('option', {
                                value: 'last_activity_at',
                                children: '按活跃度排序',
                              }),
                              y.jsx('option', {
                                value: 'name',
                                children: '按名称排序',
                              }),
                              y.jsx('option', {
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
              y.jsx('div', {
                className: fe.projectList,
                children: u
                  ? y.jsxs('div', {
                      className: fe.loading,
                      children: [
                        y.jsx('div', { className: fe.spinner }),
                        '加载中...',
                      ],
                    })
                  : E
                    ? y.jsx('div', { className: fe.error, children: E })
                    : 0 === c.length
                      ? y.jsxs('div', {
                          className: fe.emptyState,
                          children: [
                            y.jsx('div', {
                              className: fe.emptyIcon,
                              children: '📄',
                            }),
                            y.jsx('div', {
                              className: fe.emptyText,
                              children: '暂无项目',
                            }),
                            y.jsx('div', {
                              className: fe.emptyHint,
                              children: '请检查筛选条件或搜索关键词',
                            }),
                          ],
                        })
                      : c.map(e =>
                          y.jsxs(
                            'div',
                            {
                              className: `${fe.projectItem} ${e.id === t ? fe.selected : ''}`,
                              onClick: () => R(e.id),
                              children: [
                                y.jsxs('div', {
                                  className: fe.projectInfo,
                                  children: [
                                    y.jsx('div', {
                                      className: fe.projectName,
                                      children: e.name,
                                    }),
                                    y.jsx('div', {
                                      className: fe.projectPath,
                                      children: e.path_with_namespace,
                                    }),
                                    e.description &&
                                      y.jsx('div', {
                                        className: fe.projectDescription,
                                        children: e.description,
                                      }),
                                  ],
                                }),
                                e.starred &&
                                  y.jsx('span', {
                                    className: fe.starIcon,
                                    children: '⭐',
                                  }),
                                e.id === t &&
                                  y.jsx('span', {
                                    className: fe.checkIcon,
                                    children: '✓',
                                  }),
                              ],
                            },
                            e.id,
                          ),
                        ),
              }),
              F > 1 &&
                y.jsxs('div', {
                  className: fe.pagination,
                  children: [
                    y.jsx('button', {
                      className: fe.pageButton,
                      disabled: f <= 1,
                      onClick: () => U(f - 1),
                      children: '上一页',
                    }),
                    y.jsxs('div', {
                      className: fe.pageInfo,
                      children: [
                        y.jsxs('span', { children: [f, ' / ', F] }),
                        y.jsxs('div', {
                          className: fe.totalCount,
                          children: ['共 ', C, ' 个项目'],
                        }),
                      ],
                    }),
                    y.jsx('button', {
                      className: fe.pageButton,
                      disabled: f >= F,
                      onClick: () => U(f + 1),
                      children: '下一页',
                    }),
                  ],
                }),
            ],
          }),
      ],
    })
  },
  ye = 'index-module__changelogPanel__bsoH5',
  Ee = 'index-module__projectSelectorContainer__DVUJQ',
  we = 'index-module__eventsListContainer__JlSig',
  Se = 'gitlab-changelog-selected-project',
  Te = () => {
    const { state: e, isConfigValid: t } = $(),
      {
        createRequest: s,
        isRequestCancelled: n,
        cleanupRequest: l,
        isAbortError: i,
      } = I(),
      o = a.useMemo(
        () => be(e.config.gitlabUrl, e.config.gitlabToken),
        [e.config.gitlabUrl, e.config.gitlabToken],
      ),
      [d, r] = a.useState(() => {
        const e = localStorage.getItem(Se)
        return e ? parseInt(e, 10) : null
      }),
      [c, _] = a.useState([]),
      [u, p] = a.useState(0),
      [h, x] = a.useState(!1),
      [g, v] = a.useState({ field: 'created_at', order: 'desc' }),
      [j, b] = a.useState({ page: 1, pageSize: 20, total: 0 }),
      [f, N] = a.useState([]),
      C = a.useCallback(e => {
        r(e),
          e
            ? localStorage.setItem(Se, e.toString())
            : localStorage.removeItem(Se),
          b(e => ({ ...e, page: 1 }))
      }, []),
      k = a.useCallback(async () => {
        if (!t() || !d) return _([]), void p(0)
        const e = s()
        x(!0)
        try {
          await o.init()
          const t = {
              page: j.page,
              per_page: j.pageSize,
              sort: g.order,
              signal: e.signal,
            },
            { events: a, total: s } = await o.getProjectEventsWithTotal(d, t)
          if (n(e)) return
          _(a), N(a.map(e => e.id)), p(s)
        } catch (a) {
          if (i(a)) return
          console.error(
            '❌ [ChangelogPanel] Failed to fetch events:',
            m.formatErrorMessage(a),
          ),
            _([]),
            p(0)
        } finally {
          n(e) || x(!1), l(e)
        }
      }, [t, o, d, j, g, s, n, i, l])
    a.useEffect(() => {
      k()
    }, [k])
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
    return y.jsxs('div', {
      className: ye,
      children: [
        y.jsx('div', {
          className: Ee,
          children: y.jsx(ke, {
            gitlabService: o,
            selectedProjectId: d,
            onProjectSelect: C,
            isConfigValid: t,
            autoLoad: !0,
          }),
        }),
        y.jsx('div', {
          className: we,
          children: y.jsx(ve, {
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
  $e = 'index-module__action-btn__To7Ms',
  Ie = 'index-module__checking__QepNt',
  Me = 'index-module__version-btn__8d3di',
  De = 'index-module__has-update__tNkZZ',
  Ae = 'index-module__icon__EhhVu',
  Le = 'index-module__text__4iX-h',
  Oe = 'index-module__notification-overlay__E4dh-',
  Pe = 'index-module__notification__ckX1l',
  Re = 'index-module__notification-header__nJZ3Q',
  Ue = 'index-module__close-btn__9uULv',
  Ge = 'index-module__notification-body__nnab7',
  Fe = 'index-module__version-info__-pyIP',
  Be = 'index-module__release-notes__iU2jG',
  Ve = 'index-module__notes-content__ZpxxA',
  qe = 'index-module__notification-footer__La-ia',
  ze = 'index-module__later-btn__Q40Lc',
  He = 'index-module__update-btn__lD1V2',
  Xe = ({ currentVersion: e }) => {
    const [t, s] = a.useState(null),
      [n, l] = a.useState(!1),
      [i, o] = a.useState(!1),
      [d, r] = a.useState(!1),
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
          s = t.split('.').map(Number),
          n = Math.max(a.length, s.length)
        for (let l = 0; l < n; l++) {
          const e = a[l] || 0,
            t = s[l] || 0
          if (t > e) return !0
          if (t < e) return !1
        }
        return !1
      }, []),
      b = a.useCallback(
        async (a = !0) => {
          if (!n)
            if (h && t && i && a)
              (!a && g.has(t.version)) ||
                (r(!0), console.log(`使用缓存结果显示新版本 ${t.version}`))
            else {
              l(!0), p(null)
              try {
                const t = new AbortController(),
                  n = setTimeout(() => t.abort(), 1e4),
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
                if ((clearTimeout(n), !c.ok))
                  throw new Error(`HTTP ${c.status}: ${c.statusText}`)
                const u = await c.json()
                console.log('获取到版本信息:', u)
                const p = {
                  version: u.version,
                  downloadUrl:
                    'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                  releaseNotes: `版本 ${u.version} 已发布，请及时更新以获得最新功能和修复。`,
                }
                s(p), m(new Date()), x(!0)
                const h = j(e, p.version)
                o(h),
                  h
                    ? a || !g.has(p.version)
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
        [n, j, e, g, h, t, i],
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
        v(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      C = a.useCallback(() => {
        if ((r(!1), t)) {
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
          n
            ? '检查中...'
            : u
              ? '检查失败'
              : i
                ? '有更新'
                : h && !i
                  ? '已是最新版本 🎉'
                  : '检查更新',
        [n, u, i, h],
      ),
      w = a.useCallback(
        () => (n ? '🔄' : u ? '⚠️' : i ? '🔴' : '🔍'),
        [n, u, i],
      )
    return (
      a.useEffect(() => {}, [N]),
      y.jsxs(y.Fragment, {
        children: [
          y.jsxs('button', {
            className: `${$e} ${Me} ${n ? Ie : ''} ${i ? De : ''}`,
            onClick: () => b(!0),
            disabled: n,
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
                        className: Ue,
                        onClick: C,
                        children: '×',
                      }),
                    ],
                  }),
                  y.jsxs('div', {
                    className: Ge,
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
                          className: Be,
                          children: [
                            y.jsx('h4', { children: '更新说明:' }),
                            y.jsx('div', {
                              className: Ve,
                              children: t.releaseNotes,
                            }),
                          ],
                        }),
                    ],
                  }),
                  y.jsxs('div', {
                    className: qe,
                    children: [
                      y.jsx('button', {
                        className: ze,
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
  Ke = 'index-module__main-panel__82FLm',
  Qe = 'index-module__panel-header__kyx4p',
  Ye = 'index-module__header-left__xT1T5',
  Ze = 'index-module__header-right__7F8Bo',
  Je = 'index-module__mode-toggle__9yafG',
  We = 'index-module__toggle-track__82VKI',
  et = 'index-module__toggle-slider__tkY4o',
  tt = 'index-module__slide-right__qPOZu',
  at = 'index-module__toggle-option__ZhXXU',
  st = 'index-module__active__Mr5KU',
  nt = 'index-module__toggle-icon__AI6K7',
  lt = 'index-module__toggle-label__1qZLz',
  it = 'index-module__divider__QXSgp',
  ot = 'index-module__action-buttons__xGRHl',
  dt = 'index-module__action-btn__x4IAP',
  rt = 'index-module__btn-icon__ZaYHk',
  ct = 'index-module__btn-label__tM2Rz',
  _t = 'index-module__ai-btn__5kAV3',
  mt = 'index-module__config-incomplete__bLEHk',
  ut = 'index-module__config-badge__0znDE',
  pt = 'index-module__changelog-section__afcqm',
  ht = 'index-module__filter-section__gMBIz',
  xt = 'index-module__events-section__gJwdk',
  gt = ({
    appMode: e,
    events: t,
    totalCount: a,
    loading: s,
    filterConditions: l,
    sortOptions: i,
    paginationOptions: o,
    selectedEventIds: d,
    onModeChange: r,
    onFilterChange: c,
    onSortChange: _,
    onPaginationChange: m,
    onEventSelect: u,
    onSelectAll: h,
    onEventDetail: x,
    onOpenSettings: g,
    onOpenAI: v,
  }) => {
    const { state: j } = $(),
      b = n.useMemo(() => {
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
    return y.jsxs('div', {
      className: Ke,
      children: [
        y.jsxs('div', {
          className: Qe,
          children: [
            y.jsx('div', {
              className: Ye,
              children: y.jsx('div', {
                className: Je,
                children: y.jsxs('div', {
                  className: We,
                  children: [
                    y.jsx('div', {
                      className: `${et} ${'changelog' === e ? tt : ''}`,
                    }),
                    y.jsxs('button', {
                      className: `${at} ${'events' === e ? st : ''}`,
                      onClick: () => r('events'),
                      children: [
                        y.jsx('span', { className: nt, children: '📋' }),
                        y.jsx('span', { className: lt, children: 'Events' }),
                      ],
                    }),
                    y.jsxs('button', {
                      className: `${at} ${'changelog' === e ? st : ''}`,
                      onClick: () => r('changelog'),
                      children: [
                        y.jsx('span', { className: nt, children: '📝' }),
                        y.jsx('span', { className: lt, children: 'Changelog' }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            y.jsxs('div', {
              className: Ze,
              children: [
                y.jsx(Xe, { currentVersion: p }),
                y.jsx('div', { className: it }),
                y.jsxs('div', {
                  className: ot,
                  children: [
                    y.jsxs('button', {
                      className: `${dt} ${b.isValid ? '' : mt}`,
                      onClick: g,
                      title: b.isValid
                        ? '设置'
                        : `配置未完成 (${b.completedCount}/${b.totalCount})`,
                      children: [
                        y.jsx('span', {
                          className: rt,
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
                        y.jsxs('span', {
                          className: ct,
                          children: [
                            '设置',
                            !b.isValid &&
                              y.jsxs('span', {
                                className: ut,
                                children: [b.completedCount, '/', b.totalCount],
                              }),
                          ],
                        }),
                      ],
                    }),
                    y.jsxs('button', {
                      className: `${dt} ${_t}`,
                      onClick: v,
                      title: 'AI 周报',
                      children: [
                        y.jsx('span', {
                          className: rt,
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
                        y.jsx('span', { className: ct, children: 'AI 周报' }),
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
                  className: ht,
                  children: y.jsx(F, {
                    filterConditions: l,
                    onFilterChange: c,
                  }),
                }),
                y.jsx('div', {
                  className: xt,
                  children: y.jsx(ve, {
                    events: t,
                    totalCount: a,
                    loading: s,
                    sortOptions: i,
                    onSortChange: _,
                    paginationOptions: o,
                    onPaginationChange: m,
                    selectedEventIds: d,
                    onEventSelect: u,
                    onSelectAll: h,
                    onEventDetail: x,
                  }),
                }),
              ],
            })
          : y.jsx('div', { className: pt, children: y.jsx(Te, {}) }),
      ],
    })
  },
  vt = 'index-module__modal-mask__XYxyO',
  jt = 'index-module__modal-wrapper__bVZip',
  bt = 'index-module__modal__QQS3u',
  ft = 'index-module__modal-header__GdUjX',
  Nt = 'index-module__modal-title__cafB-',
  Ct = 'index-module__modal-close__ZuUgf',
  kt = 'index-module__modal-body__j5X3U',
  yt = 'index-module__modal-footer__3q-wn',
  Et = ({
    visible: e,
    title: t,
    width: s = 520,
    maxHeight: n = window.innerHeight - 180,
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
      className: vt,
      onClick: e => {
        e.target === e.currentTarget && d && o()
      },
      children: y.jsx('div', {
        className: jt,
        children: y.jsxs('div', {
          className: bt,
          style: { width: s, maxHeight: n },
          children: [
            y.jsxs('div', {
              className: ft,
              children: [
                y.jsx('div', { className: Nt, children: t }),
                y.jsx('button', {
                  className: Ct,
                  onClick: o,
                  children: y.jsx('span', { children: '×' }),
                }),
              ],
            }),
            y.jsx('div', { className: kt, children: l }),
            i && y.jsx('div', { className: yt, children: i }),
          ],
        }),
      }),
    })
  },
  wt = 'index-module__config-status__0q8ZM',
  St = 'index-module__clickable__pZ86X',
  Tt = 'index-module__compact__-QN-s',
  $t = 'index-module__compact-content__wSrCk',
  It = 'index-module__status-icon__7jFiQ',
  Mt = 'index-module__compact-text__7OyGG',
  Dt = 'index-module__expand-button__NusWg',
  At = 'index-module__expanded-content__Hih4c',
  Lt = 'index-module__config-items__quryV',
  Ot = 'index-module__compact-item__UCAOc',
  Pt = 'index-module__item-label__24FVq',
  Rt = 'index-module__item-icon__4yYRW',
  Ut = 'index-module__valid__Xyroo',
  Gt = 'index-module__invalid__Fn-hL',
  Ft = 'index-module__status-header__AORn-',
  Bt = 'index-module__status-title__6hAD6',
  Vt = 'index-module__status-text__llRfw',
  qt = 'index-module__progress-container__ofPka',
  zt = 'index-module__progress-bar__CFedX',
  Ht = 'index-module__progress-fill__w-23-',
  Xt = 'index-module__complete__L0-gl',
  Kt = 'index-module__progress-text__uoYK9',
  Qt = 'index-module__config-item__m6pYF',
  Yt = 'index-module__item-info__BhIr5',
  Zt = 'index-module__item-status__3ppNU',
  Jt = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ].filter(e => e.required),
  Wt = Jt.length,
  ea = ({
    config: e,
    className: t = '',
    showDetails: s = !0,
    onClick: l,
    compact: i = !1,
  }) => {
    const o = a.useMemo(() => {
        const t = Jt.map(t => {
            const a = e[t.key],
              s = 'string' == typeof a ? '' !== a.trim() : !!a
            return { ...t, isValid: s, value: s ? '已配置' : '未配置' }
          }),
          a = t.filter(e => e.isValid).length
        return {
          isValid: a === Wt,
          itemsStatus: t,
          completedCount: a,
          totalCount: Wt,
          progress: (a / Wt) * 100,
        }
      }, [e]),
      [d, r] = n.useState(!o.isValid)
    return i && o.isValid
      ? y.jsxs('div', {
          className: `${wt} ${Tt} ${t} ${l ? St : ''}`,
          onClick: l,
          children: [
            y.jsxs('div', {
              className: $t,
              children: [
                y.jsx('span', { className: It, children: '✅' }),
                y.jsx('span', { className: Mt, children: '配置已完成' }),
                s &&
                  y.jsx('button', {
                    className: Dt,
                    onClick: e => {
                      e.stopPropagation(), r(!d)
                    },
                    children: d ? '收起' : '详情',
                  }),
              ],
            }),
            s &&
              d &&
              y.jsx('div', {
                className: At,
                children: y.jsx('div', {
                  className: Lt,
                  children: o.itemsStatus.map(e =>
                    y.jsxs(
                      'div',
                      {
                        className: `${Qt} ${Ot} ${e.isValid ? Ut : Gt}`,
                        children: [
                          y.jsx('span', { className: Pt, children: e.label }),
                          y.jsx('span', {
                            className: Rt,
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
      : y.jsxs('div', {
          className: `${wt} ${t} ${l ? St : ''}`,
          onClick: l,
          children: [
            y.jsxs('div', {
              className: Ft,
              children: [
                y.jsxs('div', {
                  className: Bt,
                  children: [
                    y.jsx('span', {
                      className: It,
                      children: o.isValid ? '✅' : '⚠️',
                    }),
                    y.jsxs('span', {
                      className: Vt,
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
                y.jsxs('div', {
                  className: qt,
                  children: [
                    y.jsx('div', {
                      className: zt,
                      children: y.jsx('div', {
                        className: `${Ht} ${o.isValid ? Xt : ''}`,
                        style: { width: `${o.progress}%` },
                      }),
                    }),
                    y.jsxs('span', {
                      className: Kt,
                      children: [Math.round(o.progress), '%'],
                    }),
                  ],
                }),
              ],
            }),
            s &&
              y.jsx('div', {
                className: Lt,
                children: o.itemsStatus.map(e =>
                  y.jsxs(
                    'div',
                    {
                      className: `${Qt} ${e.isValid ? Ut : Gt}`,
                      children: [
                        y.jsxs('div', {
                          className: Yt,
                          children: [
                            y.jsx('span', { className: Pt, children: e.label }),
                            y.jsx('span', { className: Zt, children: e.value }),
                          ],
                        }),
                        y.jsx('span', {
                          className: Rt,
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
  ta = 'index-module__settings-panel__UCg3H',
  aa = 'index-module__settings-tabs__vPH-t',
  sa = 'index-module__tab-button__FG9Nc',
  na = 'index-module__tab-icon__rBe-o',
  la = 'index-module__active__bsBC1',
  ia = 'index-module__settings-content__TqQPH',
  oa = 'index-module__tab-panel__Q2QUI',
  da = 'index-module__form-group__zKwiA',
  ra = 'index-module__form-label__pwe7O',
  ca = 'index-module__required__2vuyW',
  _a = 'index-module__form-input__jGbRP',
  ma = 'index-module__form-select__jbXdq',
  ua = 'index-module__form-textarea__fAVMw',
  pa = 'index-module__form-hint__F0dFQ',
  ha = 'index-module__version-info__y0NZv',
  xa = 'index-module__version-text__bx0HU',
  ga = 'index-module__settings-footer__qA44X',
  va = 'index-module__footer-right__bslDg',
  ja = 'index-module__btn-primary__ZzzFI',
  ba = 'index-module__switch-container__5xk1J',
  fa = 'index-module__switch-input__V-8fl',
  Na = 'index-module__switch-label__xrOeQ',
  Ca = 'index-module__switch-slider__dG-6J',
  ka = 'index-module__btn-secondary__cRCpD',
  ya = ({ isOpen: e, onClose: t, config: s, onSave: n, theme: l }) => {
    const [i, o] = a.useState(s),
      [d, r] = a.useState(l),
      [c, _] = a.useState('gitlab')
    a.useEffect(() => {
      o(s)
    }, [s]),
      a.useEffect(() => {
        r(l)
      }, [l]),
      a.useEffect(() => {
        e && (o(s), r(l))
      }, [e, s, l])
    const m = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return y.jsx(Et, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: y.jsxs('div', {
        className: ga,
        children: [
          y.jsx('button', {
            className: ka,
            onClick: () => {
              o(s), r(l)
            },
            children: '重置',
          }),
          y.jsxs('div', {
            className: va,
            children: [
              y.jsx('button', { className: ka, onClick: t, children: '取消' }),
              y.jsx('button', {
                className: ja,
                onClick: () => {
                  n(i, d), t()
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
        className: ta,
        children: [
          y.jsx(ea, { config: i, showDetails: !0, compact: !0 }),
          y.jsxs('div', {
            className: aa,
            children: [
              y.jsxs('button', {
                className: `${sa} ${'gitlab' === c ? la : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  y.jsx('span', { className: na, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              y.jsxs('button', {
                className: `${sa} ${'deepseek' === c ? la : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  y.jsx('span', { className: na, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              y.jsxs('button', {
                className: `${sa} ${'appearance' === c ? la : ''}`,
                onClick: () => _('appearance'),
                children: [
                  y.jsx('span', { className: na, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          y.jsxs('div', {
            className: ia,
            children: [
              'gitlab' === c &&
                y.jsxs('div', {
                  className: oa,
                  children: [
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsxs('label', {
                          className: ra,
                          children: [
                            'GitLab 项目地址 ',
                            y.jsx('span', { className: ca, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: _a,
                          placeholder: h.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => m('gitlabUrl', e.target.value),
                        }),
                        y.jsx('div', {
                          className: pa,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsxs('label', {
                          className: ra,
                          children: [
                            '个人访问令牌 ',
                            y.jsx('span', { className: ca, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: _a,
                          placeholder: h.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => m('gitlabToken', e.target.value),
                        }),
                        y.jsx('div', {
                          className: pa,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                y.jsxs('div', {
                  className: oa,
                  children: [
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsxs('label', {
                          className: ra,
                          children: [
                            'DeepSeek API Key ',
                            y.jsx('span', { className: ca, children: '*' }),
                          ],
                        }),
                        y.jsx('input', {
                          type: 'text',
                          className: _a,
                          placeholder: h.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => m('deepseekApiKey', e.target.value),
                        }),
                        y.jsx('div', {
                          className: pa,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsx('label', {
                          className: ra,
                          children: '使用的模型',
                        }),
                        y.jsxs('select', {
                          className: ma,
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
                      className: da,
                      children: [
                        y.jsx('label', {
                          className: ra,
                          children: 'Token 数量限制',
                        }),
                        y.jsx('input', {
                          type: 'number',
                          className: _a,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            m('tokenLimit', parseInt(e.target.value)),
                        }),
                        y.jsx('div', {
                          className: pa,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsxs('label', {
                          className: ra,
                          children: [
                            '默认提示词 ',
                            y.jsx('span', { className: ca, children: '*' }),
                          ],
                        }),
                        y.jsx('textarea', {
                          className: ua,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => m('defaultPrompt', e.target.value),
                        }),
                        y.jsx('div', {
                          className: pa,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                y.jsxs('div', {
                  className: oa,
                  children: [
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsx('label', { className: ra, children: '主题模式' }),
                        y.jsxs('select', {
                          className: ma,
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
                          className: pa,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsx('label', {
                          className: ra,
                          children: '自动检查更新',
                        }),
                        y.jsxs('div', {
                          className: ba,
                          children: [
                            y.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: fa,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                m('autoCheckUpdate', e.target.checked),
                            }),
                            y.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: Na,
                              children: y.jsx('span', { className: Ca }),
                            }),
                          ],
                        }),
                        y.jsx('div', {
                          className: pa,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: da,
                      children: [
                        y.jsx('label', {
                          className: ra,
                          children: '检查更新间隔',
                        }),
                        y.jsxs('select', {
                          className: ma,
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
                          className: pa,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          y.jsx('div', {
            className: ha,
            children: y.jsxs('span', { className: xa, children: ['v', p] }),
          }),
        ],
      }),
    })
  },
  Ea = {
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
  wa = ({
    visible: e,
    config: t,
    defaultPrompt: s,
    onClose: n,
    onGenerate: l,
    isLoading: i,
    selectedEventsCount: o = 0,
    dateRange: d,
  }) => {
    const [r, c] = a.useState(s),
      [_, m] = a.useState(!1),
      [u, p] = a.useState(!1)
    a.useEffect(() => {
      c(s)
    }, [s])
    return y.jsx(Et, {
      visible: e,
      title: 'AI 周报生成',
      width: 800,
      onClose: n,
      maskClosable: !i,
      children: y.jsxs('div', {
        className: Ea.aiPanel,
        children: [
          y.jsxs('div', {
            className: Ea.dataOverview,
            children: [
              y.jsx('div', {
                className: Ea.overviewHeader,
                children: y.jsx('h4', { children: '📊 数据概览' }),
              }),
              y.jsxs('div', {
                className: Ea.overviewContent,
                children: [
                  y.jsxs('div', {
                    className: Ea.overviewItem,
                    children: [
                      y.jsx('span', {
                        className: Ea.overviewLabel,
                        children: '选中事件：',
                      }),
                      y.jsxs('span', {
                        className: Ea.overviewValue,
                        children: [o, ' 条'],
                      }),
                    ],
                  }),
                  d &&
                    y.jsxs('div', {
                      className: Ea.overviewItem,
                      children: [
                        y.jsx('span', {
                          className: Ea.overviewLabel,
                          children: '日期范围：',
                        }),
                        y.jsxs('span', {
                          className: Ea.overviewValue,
                          children: [d.startDate, ' 至 ', d.endDate],
                        }),
                      ],
                    }),
                  y.jsxs('div', {
                    className: Ea.overviewItem,
                    children: [
                      y.jsx('span', {
                        className: Ea.overviewLabel,
                        children: '状态：',
                      }),
                      y.jsx('span', {
                        className: `${Ea.overviewValue} ${o > 0 ? Ea.ready : Ea.waiting}`,
                        children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          y.jsxs('div', {
            className: Ea.promptSection,
            children: [
              y.jsxs('div', {
                className: Ea.sectionHeader,
                children: [
                  y.jsx('h3', { children: '提示词' }),
                  y.jsxs('div', {
                    className: Ea.headerActions,
                    children: [
                      y.jsx('button', {
                        className: Ea.btnText,
                        onClick: () => m(!_),
                        children: _ ? '收起' : '展开',
                      }),
                      y.jsx('button', {
                        className: Ea.btnText,
                        onClick: () => {
                          c(s)
                        },
                        children: '重置',
                      }),
                    ],
                  }),
                ],
              }),
              y.jsxs('div', {
                className: `${Ea.promptEditor} ${_ ? Ea.expanded : ''}`,
                children: [
                  y.jsx('textarea', {
                    className: Ea.promptTextarea,
                    value: r,
                    onChange: e => c(e.target.value),
                    placeholder: '请输入用于生成周报的提示词...',
                    rows: _ ? 15 : 6,
                    disabled: i,
                  }),
                  y.jsxs('div', {
                    className: Ea.promptFooter,
                    children: [
                      y.jsxs('span', {
                        className: Ea.charCount,
                        children: [r.length, ' 字符'],
                      }),
                      y.jsx('button', {
                        className: `${Ea.btnPrimary} ${(null == t ? void 0 : t.result) ? Ea.regenerate : ''}`,
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
              className: Ea.loadingSection,
              children: [
                y.jsx('div', { className: Ea.loadingSpinner }),
                y.jsx('p', { children: 'AI 正在分析事件数据，生成周报中...' }),
                y.jsx('div', {
                  className: Ea.loadingTips,
                  children: y.jsx('span', {
                    children: '💡 生成时间通常为 10-30 秒',
                  }),
                }),
              ],
            }),
          (null == t ? void 0 : t.result) &&
            y.jsxs('div', {
              className: Ea.resultSection,
              children: [
                y.jsxs('div', {
                  className: Ea.resultHeader,
                  children: [
                    y.jsxs('h3', {
                      className: Ea.resultTitle,
                      children: [
                        y.jsx('span', {
                          className: Ea.titleIcon,
                          children: '✨',
                        }),
                        '生成结果',
                      ],
                    }),
                    y.jsx('div', {
                      className: Ea.resultActions,
                      children: y.jsxs('button', {
                        className: `${Ea.actionBtn} ${u ? Ea.copied : ''}`,
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
                            className: Ea.btnIcon,
                            children: u ? '✅' : '📋',
                          }),
                          u ? '已复制' : '复制',
                        ],
                      }),
                    }),
                  ],
                }),
                y.jsx('div', {
                  className: Ea.resultContent,
                  children: y.jsx('div', {
                    className: Ea.resultText,
                    children: t.result,
                  }),
                }),
                y.jsx('div', {
                  className: Ea.resultMeta,
                  children: y.jsxs('div', {
                    className: Ea.metaLeft,
                    children: [
                      y.jsx('div', {
                        className: Ea.metaItem,
                        children: y.jsxs('span', {
                          children: [t.result.split('\n').length, ' 行'],
                        }),
                      }),
                      y.jsx('div', {
                        className: Ea.metaItem,
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
              className: Ea.emptyResult,
              children: [
                y.jsx('div', { className: Ea.emptyIcon, children: '🤖' }),
                y.jsx('h3', { children: '准备生成 AI 周报' }),
                y.jsx('p', {
                  children:
                    '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                }),
                y.jsxs('div', {
                  className: Ea.emptyFeatures,
                  children: [
                    y.jsxs('div', {
                      className: Ea.featureItem,
                      children: [
                        y.jsx('span', {
                          className: Ea.featureIcon,
                          children: '📊',
                        }),
                        y.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ea.featureItem,
                      children: [
                        y.jsx('span', {
                          className: Ea.featureIcon,
                          children: '📝',
                        }),
                        y.jsx('span', { children: '自动生成周报内容' }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: Ea.featureItem,
                      children: [
                        y.jsx('span', {
                          className: Ea.featureIcon,
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
  Sa = {
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
  Ta = ({ event: e, visible: t, onClose: a }) => {
    if (!t || !e) return null
    const s = e =>
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
        const s = 'https://www.lejuhub.com'
        if (!e.project) return s
        const n = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${s}/${n}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${s}/${n}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${s}/${n}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${s}/${n}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (a = e.note) ? void 0 : a.noteable_type)
                ? `${s}/${n}/-/merge_requests/${e.note.noteable_iid}`
                : `${s}/${n}`
          default:
            return `${s}/${n}`
        }
      }
    return y.jsx('div', {
      className: Sa.eventDetailModalOverlay,
      onClick: a,
      children: y.jsxs('div', {
        className: Sa.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          y.jsxs('div', {
            className: Sa.modalHeader,
            children: [
              y.jsx('h2', { children: '事件详情' }),
              y.jsx('button', {
                className: Sa.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          y.jsxs('div', {
            className: Sa.modalContent,
            children: [
              y.jsxs('div', {
                className: `${Sa.detailSection} ${Sa.compact}`,
                children: [
                  y.jsx('h3', { children: '基本信息' }),
                  y.jsxs('div', {
                    className: `${Sa.detailGrid} ${Sa.compactGrid}`,
                    children: [
                      y.jsxs('div', {
                        className: Sa.detailItem,
                        children: [
                          y.jsx('span', {
                            className: Sa.label,
                            children: 'ID:',
                          }),
                          y.jsx('span', {
                            className: Sa.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      y.jsxs('div', {
                        className: Sa.detailItem,
                        children: [
                          y.jsx('span', {
                            className: Sa.label,
                            children: '类型:',
                          }),
                          y.jsx('span', {
                            className: Sa.value,
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
                        className: Sa.detailItem,
                        children: [
                          y.jsx('span', {
                            className: Sa.label,
                            children: '操作:',
                          }),
                          y.jsx('span', {
                            className: `${Sa.value} ${Sa.actionBadge}`,
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
                        className: Sa.detailItem,
                        children: [
                          y.jsx('span', {
                            className: Sa.label,
                            children: '时间:',
                          }),
                          y.jsx('span', {
                            className: Sa.value,
                            children: s(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        y.jsxs('div', {
                          className: Sa.detailItem,
                          children: [
                            y.jsx('span', {
                              className: Sa.label,
                              children: '状态:',
                            }),
                            y.jsx('span', {
                              className: `${Sa.value} ${Sa.statusBadge} ${Sa[`status-${e.state}`]}`,
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
                  className: `${Sa.detailSection} ${Sa.compact}`,
                  children: [
                    y.jsx('h3', { children: '内容' }),
                    y.jsxs('div', {
                      className: `${Sa.detailContent} ${Sa.compactContent}`,
                      children: [
                        e.title &&
                          y.jsxs('div', {
                            className: Sa.detailItem,
                            children: [
                              y.jsx('span', {
                                className: Sa.label,
                                children: '标题:',
                              }),
                              y.jsx('span', {
                                className: Sa.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          y.jsxs('div', {
                            className: Sa.detailItem,
                            children: [
                              y.jsx('span', {
                                className: Sa.label,
                                children: '目标:',
                              }),
                              y.jsx('span', {
                                className: Sa.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          y.jsxs('div', {
                            className: Sa.detailItem,
                            children: [
                              y.jsx('span', {
                                className: Sa.label,
                                children: '标签:',
                              }),
                              y.jsx('div', {
                                className: Sa.labels,
                                children: e.labels.map((e, t) =>
                                  y.jsx(
                                    'span',
                                    { className: Sa.labelTag, children: e },
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
                  className: `${Sa.detailSection} ${Sa.compact}`,
                  children: [
                    y.jsx('h3', { children: '作者' }),
                    y.jsxs('div', {
                      className: `${Sa.authorInfo} ${Sa.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          y.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: Sa.authorAvatar,
                          }),
                        y.jsxs('div', {
                          className: Sa.authorDetails,
                          children: [
                            y.jsx('div', {
                              className: Sa.authorName,
                              children: e.author.name,
                            }),
                            y.jsxs('div', {
                              className: Sa.authorUsername,
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
                  className: `${Sa.detailSection} ${Sa.compact}`,
                  children: [
                    y.jsx('h3', { children: '项目' }),
                    y.jsx('div', {
                      className: `${Sa.projectInfo} ${Sa.compactProject}`,
                      children: e.project
                        ? y.jsxs(y.Fragment, {
                            children: [
                              y.jsxs('div', {
                                className: Sa.detailItem,
                                children: [
                                  y.jsx('span', {
                                    className: Sa.label,
                                    children: '名称:',
                                  }),
                                  y.jsx('span', {
                                    className: Sa.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              y.jsxs('div', {
                                className: Sa.detailItem,
                                children: [
                                  y.jsx('span', {
                                    className: Sa.label,
                                    children: '路径:',
                                  }),
                                  y.jsx('span', {
                                    className: Sa.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : y.jsxs('div', {
                            className: Sa.detailItem,
                            children: [
                              y.jsx('span', {
                                className: Sa.label,
                                children: '项目ID:',
                              }),
                              y.jsx('span', {
                                className: Sa.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                y.jsxs('div', {
                  className: Sa.detailSection,
                  children: [
                    y.jsx('h3', { children: '推送信息' }),
                    y.jsxs('div', {
                      className: Sa.pushInfo,
                      children: [
                        y.jsxs('div', {
                          className: Sa.detailItem,
                          children: [
                            y.jsx('span', {
                              className: Sa.label,
                              children: '分支:',
                            }),
                            y.jsx('span', {
                              className: Sa.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: Sa.detailItem,
                          children: [
                            y.jsx('span', {
                              className: Sa.label,
                              children: '提交数量:',
                            }),
                            y.jsx('span', {
                              className: Sa.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: Sa.detailItem,
                          children: [
                            y.jsx('span', {
                              className: Sa.label,
                              children: '提交标题:',
                            }),
                            y.jsx('span', {
                              className: Sa.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        y.jsxs('div', {
                          className: Sa.detailItem,
                          children: [
                            y.jsx('span', {
                              className: Sa.label,
                              children: '提交哈希:',
                            }),
                            y.jsx('span', {
                              className: `${Sa.value} ${Sa.commitHash}`,
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
                  className: Sa.detailSection,
                  children: [
                    y.jsx('h3', { children: '评论信息' }),
                    y.jsxs('div', {
                      className: Sa.noteInfo,
                      children: [
                        y.jsx('div', {
                          className: Sa.noteBody,
                          children: e.note.body,
                        }),
                        y.jsxs('div', {
                          className: Sa.noteMeta,
                          children: [
                            y.jsxs('span', {
                              children: ['创建时间: ', s(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              y.jsxs('span', {
                                children: ['更新时间: ', s(e.note.updated_at)],
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
            className: Sa.modalFooter,
            children: [
              n() &&
                y.jsx('a', {
                  href: n(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: Sa.sourceLinkBtn,
                  children: '打开源页面',
                }),
              y.jsx('button', {
                className: Sa.closeModalBtn,
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
  $a = {
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
  Ia = ({ isUserscript: e = !1 }) => {
    const {
        state: t,
        updateConfig: s,
        setTheme: n,
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
        setError: g,
        isConfigValid: v,
        getTimeRange: j,
      } = $(),
      {
        createRequest: b,
        isRequestCancelled: f,
        cleanupRequest: N,
        isAbortError: C,
      } = I(),
      k = a.useMemo(
        () => be(t.config.gitlabUrl, t.config.gitlabToken),
        [t.config.gitlabUrl, t.config.gitlabToken],
      ),
      [E, w] = a.useState(null),
      [T, M] = a.useState(!1),
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
        var a, s
        if (!v()) return void g(c.INVALID_FILTER_OR_CONFIG)
        const n = b()
        x(!0), g(null)
        try {
          await k.init()
          const { startDate: l, endDate: i } = j(),
            o = e || t.filterConditions,
            d =
              (null == (a = o.targetType) ? void 0 : a.length) > 0
                ? o.targetType
                : void 0,
            r =
              (null == (s = o.action) ? void 0 : s.length) > 0
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
              signal: n.signal,
            },
            { events: h, total: x } = await k.getUserEventsWithTotal(_.id, m)
          if (f(n)) return
          u(h), A(h.map(e => e.id)), p(x)
        } catch (l) {
          if (C(l)) return
          const e = m.formatErrorMessage(l)
          g(e), u([]), p(0)
        } finally {
          f(n) || x(!1), N(n)
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
        k,
        b,
        f,
        C,
        N,
      ],
    )
    a.useEffect(() => {
      v() && O()
    }, [v, O])
    const P = a.useCallback(() => {
        l('settings')
      }, [l]),
      R = a.useCallback(() => {
        l('main')
      }, [l]),
      U = a.useCallback(
        (e, t) => {
          s(e), n(t)
        },
        [s, n],
      ),
      G = a.useCallback(() => {
        v() ? l('ai') : g(c.INCOMPLETE_GITLAB_DEEPSEEK)
      }, [v, g, l]),
      F = a.useCallback(() => {
        l('main')
      }, [l]),
      B = a.useCallback(
        async e => {
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
                  { createDeepSeekApiService: s } = await (function (e, t) {
                    let a = Promise.resolve()
                    if (t && t.length > 0) {
                      document.getElementsByTagName('link')
                      const e = document.querySelector(
                          'meta[property=csp-nonce]',
                        ),
                        s =
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
                          const n = document.createElement('link')
                          return (
                            (n.rel = t ? 'stylesheet' : 'modulepreload'),
                            t || (n.as = 'script'),
                            (n.crossOrigin = ''),
                            (n.href = e),
                            s && n.setAttribute('nonce', s),
                            document.head.appendChild(n),
                            t
                              ? new Promise((t, a) => {
                                  n.addEventListener('load', t),
                                    n.addEventListener('error', () =>
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
                    function s(e) {
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
                        'rejected' === e.status && s(e.reason)
                      return e().catch(s)
                    })
                  })(
                    async () => {
                      const { createDeepSeekApiService: e } = await import(
                        './deepseek-api-BWwTTebD.js'
                      )
                      return { createDeepSeekApiService: e }
                    },
                    __vite__mapDeps([0, 1]),
                  ),
                  n = s(t.config.deepseekApiKey),
                  l = await n.generateWeeklyReport(
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
        [
          v,
          D,
          t.events,
          t.config.deepseekApiKey,
          t.config.model,
          t.config.tokenLimit,
          g,
          x,
          h,
        ],
      ),
      V = a.useCallback(
        e => {
          _(e)
        },
        [_],
      ),
      q = a.useCallback(
        e => {
          d(e), O(e)
        },
        [d, O],
      ),
      z = a.useCallback(
        e => {
          r(e)
        },
        [r],
      ),
      H = a.useCallback((e, t) => {
        A(a => (t ? [...a, e] : a.filter(t => t !== e)))
      }, []),
      X = a.useCallback(
        e => {
          A(e ? t.events.map(e => e.id) : [])
        },
        [t.events],
      ),
      K = a.useCallback(e => {
        w(e), M(!0)
      }, []),
      Q = a.useCallback(() => {
        M(!1), w(null)
      }, []),
      Y = a.useCallback(async () => {
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
            const t = m.formatErrorMessage(e)
            g(t), o([])
          } finally {
            x(!1)
          }
        } else g(c.INVALID_FILTER_OR_CONFIG)
      }, [k, v, o, x, g]),
      Z = a.useCallback(
        async e => {
          i(e), 'changelog' === e ? await Y() : v() && O()
        },
        [i, Y, v, O],
      )
    return y.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${$a.app} ${e ? $a.userscriptMode : $a.webMode} ${$a[L]}`,
      children: [
        y.jsx(gt, {
          appMode: t.appMode,
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: D,
          onModeChange: Z,
          onFilterChange: q,
          onSortChange: z,
          onPaginationChange: V,
          onEventSelect: H,
          onSelectAll: X,
          onEventDetail: K,
          onOpenSettings: P,
          onOpenAI: G,
        }),
        y.jsx(Ta, { event: E, visible: T, onClose: Q }),
        y.jsx(ya, {
          isOpen: 'settings' === t.activePanel,
          config: t.config,
          theme: t.theme,
          onClose: R,
          onSave: U,
        }),
        y.jsx(wa, {
          visible: 'ai' === t.activePanel,
          config: t.aiGenerationConfig,
          defaultPrompt: t.config.defaultPrompt,
          onClose: F,
          onGenerate: B,
          isLoading: t.isLoading,
          selectedEventsCount: D.length,
          dateRange: j(),
        }),
      ],
    })
  }
E.createRoot(document.getElementById('root')).render(
  y.jsx(n.StrictMode, { children: y.jsx(Ia, {}) }),
)
