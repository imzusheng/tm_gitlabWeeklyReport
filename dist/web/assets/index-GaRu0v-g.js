const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-Dzze1tj0.js', 'assets/utils-Bueodsek.js']),
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
  A as m,
  C as u,
  E as p,
  e as h,
} from './utils-Bueodsek.js'
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
  x = {},
  g = a,
  j = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  f = Object.prototype.hasOwnProperty,
  N = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  y = { key: !0, ref: !0, __self: !0, __source: !0 }
function E(e, t, a) {
  var s,
    n = {},
    l = null,
    i = null
  for (s in (void 0 !== a && (l = '' + a),
  void 0 !== t.key && (l = '' + t.key),
  void 0 !== t.ref && (i = t.ref),
  t))
    f.call(t, s) && !y.hasOwnProperty(s) && (n[s] = t[s])
  if (e && e.defaultProps)
    for (s in (t = e.defaultProps)) void 0 === n[s] && (n[s] = t[s])
  return { $$typeof: j, type: e, key: l, ref: i, props: n, _owner: N.current }
}
;(x.Fragment = b), (x.jsx = E), (x.jsxs = E), (v.exports = x)
var C = v.exports,
  k = {},
  w = s
;(k.createRoot = w.createRoot), (k.hydrateRoot = w.hydrateRoot)
const T = {},
  $ = {
    config: d,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: d.theme,
    activePanel: 'main',
    filterConditions: o,
    sortOptions: i,
    paginationOptions: l,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
  }
function D() {
  const [e, t] = a.useState($)
  a.useEffect(() => {
    ;(async () => {
      try {
        const e = await r.loadConfig()
        t(t => {
          const a = e ? { ...d, ...e } : d
          return { ...t, config: a, theme: a.theme || d.theme }
        })
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
      t(t => ({
        ...t,
        filterConditions: e,
        paginationOptions: { ...t.paginationOptions, page: 1 },
      }))
    }, []),
    i = a.useCallback(e => {
      t(t => ({ ...t, sortOptions: e }))
    }, []),
    o = a.useCallback(e => {
      t(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
    }, []),
    c = a.useCallback(e => {
      t(t => ({ ...t, events: e }))
    }, []),
    _ = a.useCallback(e => {
      t(t => ({
        ...t,
        totalCount: e,
        paginationOptions: { ...t.paginationOptions, total: e },
      }))
    }, []),
    m = a.useCallback(e => {
      t(t => ({ ...t, aiGenerationConfig: e }))
    }, []),
    u = a.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    p = a.useCallback(e => {
      t(t => ({ ...t, error: e }))
    }, []),
    h = a.useCallback(e => {
      t(t => ({ ...t, reportData: e }))
    }, []),
    v = a.useCallback(e => {
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
    x = a.useCallback(() => {
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
    g = a.useCallback(() => {
      t($), r.clearConfig()
    }, []),
    j = a.useCallback(() => {
      const {
        gitlabUrl: t,
        gitlabToken: a,
        deepseekApiKey: s,
        defaultPrompt: n,
      } = e.config
      return !!(t.trim() && a.trim() && s.trim() && n.trim())
    }, [e.config]),
    b = a.useCallback(() => {
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
    updateFilterConditions: l,
    updateSortOptions: i,
    updatePaginationOptions: o,
    setEvents: c,
    setTotal: _,
    setAIGenerationConfig: m,
    setLoading: u,
    setError: p,
    setReportData: h,
    setTheme: v,
    toggleTheme: x,
    resetState: g,
    isConfigValid: j,
    getTimeRange: b,
  }
}
const M = 'index-module__main-panel__82FLm',
  S = 'index-module__panel-header__kyx4p',
  A = 'index-module__header-left__xT1T5',
  L = 'index-module__config-status__CgP3u',
  I = 'index-module__status-indicator__-GO2B',
  O = 'index-module__status-icon__fpfqN',
  P = 'index-module__config-valid__3xaIL',
  G = 'index-module__config-invalid__-eGA8',
  R = 'index-module__header-right__7F8Bo',
  U = 'index-module__action-btn__x4IAP',
  F = 'index-module__icon__tX8wX',
  q = 'index-module__settings-btn__vsg3u',
  B = 'index-module__ai-btn__5kAV3',
  z = 'index-module__filter-section__gMBIz',
  H = 'index-module__filter-section-content__A3AOe',
  Y = 'index-module__filter-group__hk7qq',
  K = 'index-module__filter-label__TDZ3H',
  J = 'index-module__filter-options__4AUEQ',
  X = 'index-module__filter-option__-CSf1',
  Z = 'index-module__active__Mr5KU',
  Q = 'index-module__events-section__gJwdk',
  V = [
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
  ee = [
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
  te = ({ filterConditions: e, onFilterChange: t }) =>
    C.jsxs('div', {
      className: H,
      children: [
        C.jsxs('div', {
          className: Y,
          children: [
            C.jsx('label', { className: K, children: '时间范围' }),
            C.jsx('div', {
              className: J,
              children: V.map(a =>
                C.jsx(
                  'button',
                  {
                    className: `${X} ${e.timeRange === a.value ? Z : ''}`,
                    onClick: () => {
                      return (s = a.value), void t({ ...e, timeRange: s })
                      var s
                    },
                    children: a.label,
                  },
                  a.value,
                ),
              ),
            }),
          ],
        }),
        C.jsxs('div', {
          className: Y,
          children: [
            C.jsx('label', { className: K, children: '目标类型' }),
            C.jsxs('div', {
              className: J,
              children: [
                C.jsx('button', {
                  className: `${X} ${0 === e.targetType.length ? Z : ''}`,
                  onClick: () => t({ ...e, targetType: [] }),
                  children: '全部',
                }),
                W.map(a =>
                  C.jsx(
                    'button',
                    {
                      className: `${X} ${e.targetType.includes(a.value) ? Z : ''}`,
                      onClick: () =>
                        ((a, s) => {
                          const n = s
                            ? [...e.targetType, a]
                            : e.targetType.filter(e => e !== a)
                          t({ ...e, targetType: n })
                        })(a.value, !e.targetType.includes(a.value)),
                      children: a.label,
                    },
                    a.value,
                  ),
                ),
              ],
            }),
          ],
        }),
        C.jsxs('div', {
          className: Y,
          children: [
            C.jsx('label', { className: K, children: '操作类型' }),
            C.jsxs('div', {
              className: J,
              children: [
                C.jsx('button', {
                  className: `${X} ${0 === e.action.length ? Z : ''}`,
                  onClick: () => t({ ...e, action: [] }),
                  children: '全部',
                }),
                ee.map(a =>
                  C.jsx(
                    'button',
                    {
                      className: `${X} ${e.action.includes(a.value) ? Z : ''}`,
                      onClick: () =>
                        ((a, s) => {
                          const n = s
                            ? [...e.action, a]
                            : e.action.filter(e => e !== a)
                          t({ ...e, action: n })
                        })(a.value, !e.action.includes(a.value)),
                      children: a.label,
                    },
                    a.value,
                  ),
                ),
              ],
            }),
          ],
        }),
      ],
    }),
  ae = 'index-module__pagination__5dauU',
  se = 'index-module__pagination-info__xbUbw',
  ne = 'index-module__pagination-controls__q2hqL',
  le = 'index-module__pagination-btn__P1OCG',
  ie = 'index-module__disabled__BywdX',
  oe = 'index-module__active__lSJu-',
  de = 'index-module__pagination-ellipsis__gQnax',
  re = 'index-module__pagination-size-changer__SufyI',
  ce = 'index-module__pagination-select__JwvbH',
  _e = ({
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
      ? C.jsx('div', {
          className: ae,
          children: C.jsx('div', { className: se, children: '暂无数据' }),
        })
      : C.jsxs('div', {
          className: ae,
          children: [
            C.jsxs('div', {
              className: se,
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
            C.jsxs('div', {
              className: ne,
              children: [
                C.jsx('button', {
                  className: `${le} ${1 === e ? ie : ''}`,
                  onClick: () => m(e - 1),
                  disabled: 1 === e,
                  children: C.jsx('span', { children: '‹' }),
                }),
                (() => {
                  const t = []
                  if (r <= 7)
                    t.push(...Array.from({ length: r }, (e, t) => t + 1))
                  else {
                    t.push(1), e > 4 && t.push('...')
                    const a = Math.max(2, e - 2),
                      s = Math.min(r - 1, e + 2)
                    t.push(
                      ...Array.from({ length: s - a + 1 }, (e, t) => a + t),
                    ),
                      e < r - 2 - 1 && t.push('...'),
                      r > 1 && t.push(r)
                  }
                  return t
                })().map((t, a) =>
                  C.jsx(
                    n.Fragment,
                    {
                      children:
                        'number' == typeof t
                          ? C.jsx('button', {
                              className: `${le} ${e === t ? oe : ''}`,
                              onClick: () => m(t),
                              children: t,
                            })
                          : C.jsx('span', { className: de, children: t }),
                    },
                    a,
                  ),
                ),
                C.jsx('button', {
                  className: `${le} ${e === r ? ie : ''}`,
                  onClick: () => m(e + 1),
                  disabled: e === r,
                  children: C.jsx('span', { children: '›' }),
                }),
              ],
            }),
            l &&
              C.jsxs('div', {
                className: re,
                children: [
                  C.jsx('span', { children: '每页' }),
                  C.jsx('select', {
                    value: t,
                    onChange: e => {
                      return (t = Number(e.target.value)), void (o && o(1, t))
                      var t
                    },
                    className: ce,
                    children: i.map(e =>
                      C.jsx('option', { value: e, children: e }, e),
                    ),
                  }),
                  C.jsx('span', { children: '条' }),
                ],
              }),
          ],
        })
  },
  me = 'EventsList-module__events-list__Z2gnl',
  ue = 'EventsList-module__events-list-header__i8ZCs',
  pe = 'EventsList-module__header-cell__tSGKU',
  he = 'EventsList-module__checkbox-cell__YvmEK',
  ve = 'EventsList-module__content-cell__aiH0X',
  xe = 'EventsList-module__action-cell__BBBS7',
  ge = 'EventsList-module__time-cell__F02or',
  je = 'EventsList-module__detail-cell__soty-',
  be = 'EventsList-module__sort-icon__OkgLv',
  fe = 'EventsList-module__events-list-body__Pcosk',
  Ne = 'EventsList-module__event-row__ka77Q',
  ye = 'EventsList-module__selected__YUioo',
  Ee = 'EventsList-module__cell__5Y8iC',
  Ce = 'EventsList-module__event-icon__52LqG',
  ke = 'EventsList-module__event-content__I8le1',
  we = 'EventsList-module__event-title__wVvqr',
  Te = 'EventsList-module__event-description__GZfW0',
  $e = 'EventsList-module__action-tag__IBpm0',
  De = 'EventsList-module__event-time__RCPoO',
  Me = 'EventsList-module__detail-btn__PLLL4',
  Se = 'EventsList-module__detail-icon__eATZo',
  Ae = 'EventsList-module__empty-state__Z-gwH',
  Le = 'EventsList-module__empty-icon__R7-ij',
  Ie = 'EventsList-module__events-list-footer__7LiRc',
  Oe = 'EventsList-module__events-list-loading__pcl-h',
  Pe = 'EventsList-module__loading-spinner__rJ-Jy',
  Ge = 'EventsList-module__checkbox-container__L1if8',
  Re = 'EventsList-module__checkmark__-GyO9',
  Ue = ({
    events: e,
    totalCount: t,
    loading: a,
    sortOptions: s,
    onSortChange: n,
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
          s = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
          n = new Date(s.getTime() - 864e5),
          l = new Date(t.getFullYear(), t.getMonth(), t.getDate())
        if (l.getTime() === s.getTime())
          return `今天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
        if (l.getTime() === n.getTime())
          return `昨天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
        {
          const e = s.getTime() - l.getTime(),
            a = Math.floor(e / 864e5)
          return a > 0 && a <= 7
            ? `${a}天前`
            : t.toLocaleDateString('zh-CN', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
        }
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
      v = e => {
        var t
        return e.push_data
          ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
          : e.note && e.target_title
            ? e.target_title
            : (null == (t = e.project) ? void 0 : t.path_with_namespace)
              ? e.project.path_with_namespace
              : e.project_id
                ? `项目ID: ${e.project_id}`
                : '未知项目'
      }
    return a
      ? C.jsxs('div', {
          className: Oe,
          children: [
            C.jsx('div', { className: Pe }),
            C.jsx('p', { children: '正在加载事件数据...' }),
          ],
        })
      : C.jsxs('div', {
          className: me,
          children: [
            C.jsxs('div', {
              className: ue,
              children: [
                C.jsx('div', {
                  className: `${pe} ${he}`,
                  children: C.jsxs('label', {
                    className: Ge,
                    children: [
                      C.jsx('input', {
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
                      C.jsx('span', { className: Re }),
                    ],
                  }),
                }),
                C.jsx('div', {
                  className: `${pe} ${ve}`,
                  children: C.jsx('span', { children: '标题和内容' }),
                }),
                C.jsx('div', {
                  className: `${pe} ${xe}`,
                  children: C.jsx('span', { children: '操作' }),
                }),
                C.jsxs('div', {
                  className: `${pe} ${ge}`,
                  onClick: () =>
                    (e => {
                      const t =
                        s.field === e && 'desc' === s.order ? 'asc' : 'desc'
                      n({ field: e, order: t })
                    })('created_at'),
                  children: [
                    C.jsx('span', { children: '时间' }),
                    C.jsx('span', {
                      className: be,
                      children:
                        ((x = 'created_at'),
                        s.field !== x ? '' : 'desc' === s.order ? '↓' : '↑'),
                    }),
                  ],
                }),
                C.jsx('div', { className: `${pe} ${je}`, children: '详情' }),
              ],
            }),
            C.jsx('div', {
              className: fe,
              children:
                0 === e.length
                  ? C.jsxs('div', {
                      className: Ae,
                      children: [
                        C.jsx('div', { className: Le, children: '📄' }),
                        C.jsx('p', { children: '暂无事件数据' }),
                        C.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
                      ],
                    })
                  : e.map(e => {
                      const t = o.includes(e.id),
                        {
                          icon: a,
                          title: s,
                          actionType: n,
                        } = (e => {
                          const { action_name: t, target_type: a } = e
                          if (e.push_data) {
                            const { action: t, ref_type: a } = e.push_data
                            return 'pushed' === t && 'branch' === a
                              ? {
                                  icon: '⬆️',
                                  actionType: '分支推送',
                                  title: `推送到分支 ${e.push_data.ref}`,
                                }
                              : 'pushed' === t && 'tag' === a
                                ? {
                                    icon: '🏷️',
                                    actionType: '标签推送',
                                    title: `推送标签 ${e.push_data.ref}`,
                                  }
                                : {
                                    icon: '📤',
                                    actionType: '推送',
                                    title: `推送到分支 ${e.push_data.ref}`,
                                  }
                          }
                          if (a && '' !== a.trim()) {
                            const t = {
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
                            }[a]
                            if (t)
                              return {
                                icon: t.icon,
                                actionType: t.actionType,
                                title: h(e),
                              }
                          }
                          const s = {
                            'pushed to': { icon: '⬆️', actionType: '推送' },
                            'pushed new': {
                              icon: '⬆️',
                              actionType: '推送新分支',
                            },
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
                          }[t]
                          return s
                            ? {
                                icon: s.icon,
                                actionType: s.actionType,
                                title: h(e),
                              }
                            : {
                                icon: '📋',
                                actionType: a || t || '未知操作',
                                title: h(e),
                              }
                        })(e)
                      return C.jsxs(
                        'div',
                        {
                          className: `${Ne} ${t ? ye : ''}`,
                          children: [
                            C.jsx('div', {
                              className: `${Ee} ${he}`,
                              children: C.jsxs('label', {
                                className: Ge,
                                children: [
                                  C.jsx('input', {
                                    type: 'checkbox',
                                    checked: t,
                                    onChange: () =>
                                      (e => {
                                        const t = o.includes(e)
                                        d(e, !t)
                                      })(e.id),
                                    title: t ? '取消选择' : '选择此事件',
                                  }),
                                  C.jsx('span', { className: Re }),
                                ],
                              }),
                            }),
                            C.jsxs('div', {
                              className: `${Ee} ${ve}`,
                              children: [
                                C.jsx('div', { className: Ce, children: a }),
                                C.jsxs('div', {
                                  className: ke,
                                  children: [
                                    C.jsx('div', {
                                      className: we,
                                      children: s,
                                    }),
                                    C.jsx('div', {
                                      className: Te,
                                      children: v(e),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            C.jsx('div', {
                              className: `${Ee} ${xe}`,
                              children: C.jsx('span', {
                                className: $e,
                                children: n,
                              }),
                            }),
                            C.jsx('div', {
                              className: `${Ee} ${ge}`,
                              children: C.jsx('span', {
                                className: De,
                                children: p(e.created_at),
                              }),
                            }),
                            C.jsx('div', {
                              className: `${Ee} ${je}`,
                              children: C.jsx('button', {
                                className: Me,
                                onClick: () => _(e),
                                title: '查看详情',
                                children: C.jsx('span', {
                                  className: Se,
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
            C.jsx('div', {
              className: Ie,
              children: C.jsx(_e, {
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
    var x
  },
  Fe = 'index-module__action-btn__To7Ms',
  qe = 'index-module__checking__QepNt',
  Be = 'index-module__version-btn__8d3di',
  ze = 'index-module__has-update__tNkZZ',
  He = 'index-module__icon__EhhVu',
  Ye = 'index-module__text__4iX-h',
  Ke = 'index-module__notification-overlay__E4dh-',
  Je = 'index-module__notification__ckX1l',
  Xe = 'index-module__notification-header__nJZ3Q',
  Ze = 'index-module__close-btn__9uULv',
  Qe = 'index-module__notification-body__nnab7',
  Ve = 'index-module__version-info__-pyIP',
  We = 'index-module__release-notes__iU2jG',
  et = 'index-module__notes-content__ZpxxA',
  tt = 'index-module__notification-footer__La-ia',
  at = 'index-module__later-btn__Q40Lc',
  st = 'index-module__update-btn__lD1V2',
  nt = ({ currentVersion: e }) => {
    const [t, s] = a.useState(null),
      [n, l] = a.useState(!1),
      [i, o] = a.useState(!1),
      [d, r] = a.useState(!1),
      [c, m] = a.useState(null),
      [u, p] = a.useState(null),
      [h, v] = a.useState(!1),
      [x, g] = a.useState(new Set())
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
              (!a && x.has(t.version)) ||
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
                s(p), m(new Date()), v(!0)
                const h = j(e, p.version)
                o(h),
                  h
                    ? a || !x.has(p.version)
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
        [n, j, e, x, h, t, i],
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
      y = a.useCallback(() => {
        if ((r(!1), t)) {
          const a = new Set(x)
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
      }, [t, x]),
      E = a.useCallback(
        e =>
          e.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        [],
      ),
      k = a.useCallback(
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
      C.jsxs(C.Fragment, {
        children: [
          C.jsxs('button', {
            className: `${Fe} ${Be} ${n ? qe : ''} ${i ? ze : ''}`,
            onClick: () => b(!0),
            disabled: n,
            title: c
              ? `上次检查: ${E(c)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              C.jsx('span', { className: He, children: w() }),
              C.jsx('span', { className: Ye, children: k() }),
            ],
          }),
          d &&
            i &&
            t &&
            C.jsx('div', {
              className: Ke,
              children: C.jsxs('div', {
                className: Je,
                children: [
                  C.jsxs('div', {
                    className: Xe,
                    children: [
                      C.jsx('h3', { children: '🎉 发现新版本' }),
                      C.jsx('button', {
                        className: Ze,
                        onClick: y,
                        children: '×',
                      }),
                    ],
                  }),
                  C.jsxs('div', {
                    className: Qe,
                    children: [
                      C.jsxs('div', {
                        className: Ve,
                        children: [
                          C.jsxs('p', {
                            children: [
                              C.jsx('strong', { children: '当前版本:' }),
                              ' v',
                              e,
                            ],
                          }),
                          C.jsxs('p', {
                            children: [
                              C.jsx('strong', { children: '最新版本:' }),
                              ' v',
                              t.version,
                            ],
                          }),
                        ],
                      }),
                      t.releaseNotes &&
                        C.jsxs('div', {
                          className: We,
                          children: [
                            C.jsx('h4', { children: '更新说明:' }),
                            C.jsx('div', {
                              className: et,
                              children: t.releaseNotes,
                            }),
                          ],
                        }),
                    ],
                  }),
                  C.jsxs('div', {
                    className: tt,
                    children: [
                      C.jsx('button', {
                        className: at,
                        onClick: y,
                        children: '稍后更新',
                      }),
                      C.jsx('button', {
                        className: st,
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
  lt = ({
    events: e,
    totalCount: t,
    loading: a,
    filterConditions: s,
    sortOptions: n,
    paginationOptions: l,
    selectedEventIds: i,
    onFilterChange: o,
    onSortChange: d,
    onPaginationChange: r,
    onEventSelect: c,
    onSelectAll: _,
    onEventDetail: u,
    onOpenSettings: p,
    onOpenAI: h,
  }) => {
    const { isConfigValid: v } = D()
    return C.jsxs('div', {
      className: M,
      children: [
        C.jsxs('div', {
          className: S,
          children: [
            C.jsxs('div', {
              className: A,
              children: [
                C.jsx('h1', { children: 'GitLab Events' }),
                C.jsx('div', {
                  className: L,
                  children: v()
                    ? C.jsxs('span', {
                        className: `${I} ${P}`,
                        children: [
                          C.jsx('span', { className: O, children: '✅' }),
                          '配置完整',
                        ],
                      })
                    : C.jsxs('span', {
                        className: `${I} ${G}`,
                        children: [
                          C.jsx('span', { className: O, children: '❌' }),
                          '配置不完整',
                        ],
                      }),
                }),
              ],
            }),
            C.jsxs('div', {
              className: R,
              children: [
                C.jsx(nt, { currentVersion: m }),
                C.jsxs('button', {
                  className: `${U} ${q}`,
                  onClick: p,
                  children: [
                    C.jsx('span', { className: F, children: '⚙️' }),
                    '设置',
                  ],
                }),
                C.jsxs('button', {
                  className: `${U} ${B}`,
                  onClick: h,
                  children: [
                    C.jsx('span', { className: F, children: '🤖' }),
                    'AI 周报',
                  ],
                }),
              ],
            }),
          ],
        }),
        C.jsx('div', {
          className: z,
          children: C.jsx(te, { filterConditions: s, onFilterChange: o }),
        }),
        C.jsx('div', {
          className: Q,
          children: C.jsx(Ue, {
            events: e,
            totalCount: t,
            loading: a,
            sortOptions: n,
            onSortChange: d,
            paginationOptions: l,
            onPaginationChange: r,
            selectedEventIds: i,
            onEventSelect: c,
            onSelectAll: _,
            onEventDetail: u,
          }),
        }),
      ],
    })
  },
  it = 'index-module__modal-mask__XYxyO',
  ot = 'index-module__modal-wrapper__bVZip',
  dt = 'index-module__modal__QQS3u',
  rt = 'index-module__modal-header__GdUjX',
  ct = 'index-module__modal-title__cafB-',
  _t = 'index-module__modal-close__ZuUgf',
  mt = 'index-module__modal-body__j5X3U',
  ut = 'index-module__modal-footer__3q-wn',
  pt = ({
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
    return C.jsx('div', {
      id: 'gitlab-weekly-report-container',
      className: it,
      onClick: e => {
        e.target === e.currentTarget && d && o()
      },
      children: C.jsx('div', {
        className: ot,
        children: C.jsxs('div', {
          className: dt,
          style: { width: s, maxHeight: n },
          children: [
            C.jsxs('div', {
              className: rt,
              children: [
                C.jsx('div', { className: ct, children: t }),
                C.jsx('button', {
                  className: _t,
                  onClick: o,
                  children: C.jsx('span', { children: '×' }),
                }),
              ],
            }),
            C.jsx('div', { className: mt, children: l }),
            i && C.jsx('div', { className: ut, children: i }),
          ],
        }),
      }),
    })
  },
  ht = 'index-module__settings-panel__UCg3H',
  vt = 'index-module__settings-tabs__vPH-t',
  xt = 'index-module__tab-button__FG9Nc',
  gt = 'index-module__tab-icon__rBe-o',
  jt = 'index-module__active__bsBC1',
  bt = 'index-module__settings-content__TqQPH',
  ft = 'index-module__tab-panel__Q2QUI',
  Nt = 'index-module__form-group__zKwiA',
  yt = 'index-module__form-label__pwe7O',
  Et = 'index-module__required__2vuyW',
  Ct = 'index-module__form-input__jGbRP',
  kt = 'index-module__form-select__jbXdq',
  wt = 'index-module__form-textarea__fAVMw',
  Tt = 'index-module__form-hint__F0dFQ',
  $t = 'index-module__version-info__y0NZv',
  Dt = 'index-module__version-text__bx0HU',
  Mt = 'index-module__settings-footer__qA44X',
  St = 'index-module__footer-right__bslDg',
  At = 'index-module__btn-primary__ZzzFI',
  Lt = 'index-module__switch-container__5xk1J',
  It = 'index-module__switch-input__V-8fl',
  Ot = 'index-module__switch-label__xrOeQ',
  Pt = 'index-module__switch-slider__dG-6J',
  Gt = 'index-module__btn-secondary__cRCpD',
  Rt = ({ isOpen: e, onClose: t, config: s, onSave: n, theme: l }) => {
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
    const p = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return C.jsx(pt, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: C.jsxs('div', {
        className: Mt,
        children: [
          C.jsx('button', {
            className: Gt,
            onClick: () => {
              o(s), r(l)
            },
            children: '重置',
          }),
          C.jsxs('div', {
            className: St,
            children: [
              C.jsx('button', { className: Gt, onClick: t, children: '取消' }),
              C.jsx('button', {
                className: At,
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
      children: C.jsxs('div', {
        className: ht,
        children: [
          C.jsxs('div', {
            className: vt,
            children: [
              C.jsxs('button', {
                className: `${xt} ${'gitlab' === c ? jt : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  C.jsx('span', { className: gt, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              C.jsxs('button', {
                className: `${xt} ${'deepseek' === c ? jt : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  C.jsx('span', { className: gt, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              C.jsxs('button', {
                className: `${xt} ${'appearance' === c ? jt : ''}`,
                onClick: () => _('appearance'),
                children: [
                  C.jsx('span', { className: gt, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          C.jsxs('div', {
            className: bt,
            children: [
              'gitlab' === c &&
                C.jsxs('div', {
                  className: ft,
                  children: [
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsxs('label', {
                          className: yt,
                          children: [
                            'GitLab 项目地址 ',
                            C.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        C.jsx('input', {
                          type: 'text',
                          className: Ct,
                          placeholder: u.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => p('gitlabUrl', e.target.value),
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsxs('label', {
                          className: yt,
                          children: [
                            '个人访问令牌 ',
                            C.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        C.jsx('input', {
                          type: 'text',
                          className: Ct,
                          placeholder: u.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => p('gitlabToken', e.target.value),
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                C.jsxs('div', {
                  className: ft,
                  children: [
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsxs('label', {
                          className: yt,
                          children: [
                            'DeepSeek API Key ',
                            C.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        C.jsx('input', {
                          type: 'text',
                          className: Ct,
                          placeholder: u.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => p('deepseekApiKey', e.target.value),
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsx('label', {
                          className: yt,
                          children: '使用的模型',
                        }),
                        C.jsxs('select', {
                          className: kt,
                          value: i.model,
                          onChange: e => p('model', e.target.value),
                          children: [
                            C.jsx('option', {
                              value: 'deepseek-chat',
                              children: 'deepseek-chat',
                            }),
                            C.jsx('option', {
                              value: 'deepseek-coder',
                              children: 'deepseek-coder',
                            }),
                          ],
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsx('label', {
                          className: yt,
                          children: 'Token 数量限制',
                        }),
                        C.jsx('input', {
                          type: 'number',
                          className: Ct,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            p('tokenLimit', parseInt(e.target.value)),
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsxs('label', {
                          className: yt,
                          children: [
                            '默认提示词 ',
                            C.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        C.jsx('textarea', {
                          className: wt,
                          rows: 6,
                          placeholder: u.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => p('defaultPrompt', e.target.value),
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                C.jsxs('div', {
                  className: ft,
                  children: [
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsx('label', { className: yt, children: '主题模式' }),
                        C.jsxs('select', {
                          className: kt,
                          value: d,
                          onChange: e => r(e.target.value),
                          children: [
                            C.jsx('option', {
                              value: 'system',
                              children: '🔄 跟随系统',
                            }),
                            C.jsx('option', {
                              value: 'light',
                              children: '☀️ 浅色模式',
                            }),
                            C.jsx('option', {
                              value: 'dark',
                              children: '🌙 深色模式',
                            }),
                          ],
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsx('label', {
                          className: yt,
                          children: '自动检查更新',
                        }),
                        C.jsxs('div', {
                          className: Lt,
                          children: [
                            C.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: It,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                p('autoCheckUpdate', e.target.checked),
                            }),
                            C.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: Ot,
                              children: C.jsx('span', { className: Pt }),
                            }),
                          ],
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: Nt,
                      children: [
                        C.jsx('label', {
                          className: yt,
                          children: '检查更新间隔',
                        }),
                        C.jsxs('select', {
                          className: kt,
                          value: i.updateCheckInterval ?? 3e5,
                          onChange: e =>
                            p('updateCheckInterval', parseInt(e.target.value)),
                          disabled: !(i.autoCheckUpdate ?? 1),
                          children: [
                            C.jsx('option', { value: 6e4, children: '1分钟' }),
                            C.jsx('option', { value: 3e5, children: '5分钟' }),
                            C.jsx('option', { value: 6e5, children: '10分钟' }),
                            C.jsx('option', {
                              value: 18e5,
                              children: '30分钟',
                            }),
                            C.jsx('option', { value: 36e5, children: '1小时' }),
                          ],
                        }),
                        C.jsx('div', {
                          className: Tt,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          C.jsx('div', {
            className: $t,
            children: C.jsxs('span', { className: Dt, children: ['v', m] }),
          }),
        ],
      }),
    })
  },
  Ut = 'index-module__ai-panel__R0K19',
  Ft = 'index-module__data-overview__J-ZoM',
  qt = 'index-module__overview-header__ae0e8',
  Bt = 'index-module__overview-content__dhjh6',
  zt = 'index-module__overview-item__20Ilu',
  Ht = 'index-module__overview-label__k3QHX',
  Yt = 'index-module__overview-value__gbEnJ',
  Kt = 'index-module__ready__f4MXX',
  Jt = 'index-module__waiting__orgl9',
  Xt = 'index-module__result-section__esrDe',
  Zt = 'index-module__result-header__-sHRM',
  Qt = 'index-module__result-title__GYp3Q',
  Vt = 'index-module__title-icon__w1Z58',
  Wt = 'index-module__result-actions__Lwz6b',
  ea = 'index-module__action-btn__X81KS',
  ta = 'index-module__btn-icon__bBkUh',
  aa = 'index-module__result-content__NBmXz',
  sa = 'index-module__result-text__WX-aI',
  na = 'index-module__result-meta__zAR0J',
  la = 'index-module__meta-left__G7E6i',
  ia = 'index-module__meta-item__Mikx5',
  oa = 'index-module__prompt-section__Y1L-1',
  da = 'index-module__section-header__WEXG-',
  ra = 'index-module__header-actions__phC5-',
  ca = 'index-module__prompt-editor__N6csy',
  _a = 'index-module__prompt-textarea__ZeYSC',
  ma = 'index-module__prompt-footer__NhJb8',
  ua = 'index-module__char-count__qSePr',
  pa = 'index-module__expanded__VY5Zd',
  ha = 'index-module__loading-section__qmhp-',
  va = 'index-module__loading-spinner__FhbKe',
  xa = 'index-module__loading-tips__TN0F6',
  ga = 'index-module__empty-result__D1DxK',
  ja = 'index-module__empty-icon__RFmRa',
  ba = 'index-module__empty-features__Y-XeR',
  fa = 'index-module__feature-item__zmC1K',
  Na = 'index-module__feature-icon__aCith',
  ya = 'index-module__btn-primary__NTwQw',
  Ea = 'index-module__regenerate__MPpEF',
  Ca = 'index-module__btn-text__f3PZM',
  ka = ({
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
      [_, m] = a.useState(!1)
    a.useEffect(() => {
      c(s)
    }, [s])
    return C.jsx(pt, {
      visible: e,
      title: 'AI 周报生成',
      width: 800,
      onClose: n,
      maskClosable: !i,
      children: C.jsxs('div', {
        className: Ut,
        children: [
          C.jsxs('div', {
            className: Ft,
            children: [
              C.jsx('div', {
                className: qt,
                children: C.jsx('h4', { children: '📊 数据概览' }),
              }),
              C.jsxs('div', {
                className: Bt,
                children: [
                  C.jsxs('div', {
                    className: zt,
                    children: [
                      C.jsx('span', { className: Ht, children: '选中事件：' }),
                      C.jsxs('span', { className: Yt, children: [o, ' 条'] }),
                    ],
                  }),
                  d &&
                    C.jsxs('div', {
                      className: zt,
                      children: [
                        C.jsx('span', {
                          className: Ht,
                          children: '日期范围：',
                        }),
                        C.jsxs('span', {
                          className: Yt,
                          children: [d.startDate, ' 至 ', d.endDate],
                        }),
                      ],
                    }),
                  C.jsxs('div', {
                    className: zt,
                    children: [
                      C.jsx('span', { className: Ht, children: '状态：' }),
                      C.jsx('span', {
                        className: `${Yt} ${o > 0 ? Kt : Jt}`,
                        children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          C.jsxs('div', {
            className: oa,
            children: [
              C.jsxs('div', {
                className: da,
                children: [
                  C.jsx('h3', { children: '提示词' }),
                  C.jsxs('div', {
                    className: ra,
                    children: [
                      C.jsx('button', {
                        className: Ca,
                        onClick: () => m(!_),
                        children: _ ? '收起' : '展开',
                      }),
                      C.jsx('button', {
                        className: Ca,
                        onClick: () => {
                          c(s)
                        },
                        children: '重置',
                      }),
                    ],
                  }),
                ],
              }),
              C.jsxs('div', {
                className: `${ca} ${_ ? pa : ''}`,
                children: [
                  C.jsx('textarea', {
                    className: _a,
                    value: r,
                    onChange: e => c(e.target.value),
                    placeholder: '请输入用于生成周报的提示词...',
                    rows: _ ? 15 : 6,
                    disabled: i,
                  }),
                  C.jsxs('div', {
                    className: ma,
                    children: [
                      C.jsxs('span', {
                        className: ua,
                        children: [r.length, ' 字符'],
                      }),
                      C.jsx('button', {
                        className: `${ya} ${(null == t ? void 0 : t.result) ? Ea : ''}`,
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
            C.jsxs('div', {
              className: ha,
              children: [
                C.jsx('div', { className: va }),
                C.jsx('p', { children: 'AI 正在分析事件数据，生成周报中...' }),
                C.jsx('div', {
                  className: xa,
                  children: C.jsx('span', {
                    children: '💡 生成时间通常为 10-30 秒',
                  }),
                }),
              ],
            }),
          (null == t ? void 0 : t.result) &&
            C.jsxs('div', {
              className: Xt,
              children: [
                C.jsxs('div', {
                  className: Zt,
                  children: [
                    C.jsxs('h3', {
                      className: Qt,
                      children: [
                        C.jsx('span', { className: Vt, children: '✨' }),
                        '生成结果',
                      ],
                    }),
                    C.jsx('div', {
                      className: Wt,
                      children: C.jsxs('button', {
                        className: ea,
                        onClick: () => {
                          ;(null == t ? void 0 : t.result) &&
                            navigator.clipboard.writeText(t.result)
                        },
                        title: '一键复制',
                        children: [
                          C.jsx('span', { className: ta, children: '📋' }),
                          '复制',
                        ],
                      }),
                    }),
                  ],
                }),
                C.jsx('div', {
                  className: aa,
                  children: C.jsx('div', { className: sa, children: t.result }),
                }),
                C.jsx('div', {
                  className: na,
                  children: C.jsxs('div', {
                    className: la,
                    children: [
                      C.jsx('div', {
                        className: ia,
                        children: C.jsxs('span', {
                          children: [t.result.split('\n').length, ' 行'],
                        }),
                      }),
                      C.jsx('div', {
                        className: ia,
                        children: C.jsxs('span', {
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
            C.jsxs('div', {
              className: ga,
              children: [
                C.jsx('div', { className: ja, children: '🤖' }),
                C.jsx('h3', { children: '准备生成 AI 周报' }),
                C.jsx('p', {
                  children:
                    '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                }),
                C.jsxs('div', {
                  className: ba,
                  children: [
                    C.jsxs('div', {
                      className: fa,
                      children: [
                        C.jsx('span', { className: Na, children: '📊' }),
                        C.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: fa,
                      children: [
                        C.jsx('span', { className: Na, children: '📝' }),
                        C.jsx('span', { children: '自动生成周报内容' }),
                      ],
                    }),
                    C.jsxs('div', {
                      className: fa,
                      children: [
                        C.jsx('span', { className: Na, children: '🎯' }),
                        C.jsx('span', { children: '突出重点工作成果' }),
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
  wa = {
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
    return C.jsx('div', {
      className: wa.eventDetailModalOverlay,
      onClick: a,
      children: C.jsxs('div', {
        className: wa.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          C.jsxs('div', {
            className: wa.modalHeader,
            children: [
              C.jsx('h2', { children: '事件详情' }),
              C.jsx('button', {
                className: wa.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          C.jsxs('div', {
            className: wa.modalContent,
            children: [
              C.jsxs('div', {
                className: `${wa.detailSection} ${wa.compact}`,
                children: [
                  C.jsx('h3', { children: '基本信息' }),
                  C.jsxs('div', {
                    className: `${wa.detailGrid} ${wa.compactGrid}`,
                    children: [
                      C.jsxs('div', {
                        className: wa.detailItem,
                        children: [
                          C.jsx('span', {
                            className: wa.label,
                            children: 'ID:',
                          }),
                          C.jsx('span', {
                            className: wa.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      C.jsxs('div', {
                        className: wa.detailItem,
                        children: [
                          C.jsx('span', {
                            className: wa.label,
                            children: '类型:',
                          }),
                          C.jsx('span', {
                            className: wa.value,
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
                      C.jsxs('div', {
                        className: wa.detailItem,
                        children: [
                          C.jsx('span', {
                            className: wa.label,
                            children: '操作:',
                          }),
                          C.jsx('span', {
                            className: `${wa.value} ${wa.actionBadge}`,
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
                      C.jsxs('div', {
                        className: wa.detailItem,
                        children: [
                          C.jsx('span', {
                            className: wa.label,
                            children: '时间:',
                          }),
                          C.jsx('span', {
                            className: wa.value,
                            children: s(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        C.jsxs('div', {
                          className: wa.detailItem,
                          children: [
                            C.jsx('span', {
                              className: wa.label,
                              children: '状态:',
                            }),
                            C.jsx('span', {
                              className: `${wa.value} ${wa.statusBadge} ${wa[`status-${e.state}`]}`,
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
                C.jsxs('div', {
                  className: `${wa.detailSection} ${wa.compact}`,
                  children: [
                    C.jsx('h3', { children: '内容' }),
                    C.jsxs('div', {
                      className: `${wa.detailContent} ${wa.compactContent}`,
                      children: [
                        e.title &&
                          C.jsxs('div', {
                            className: wa.detailItem,
                            children: [
                              C.jsx('span', {
                                className: wa.label,
                                children: '标题:',
                              }),
                              C.jsx('span', {
                                className: wa.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          C.jsxs('div', {
                            className: wa.detailItem,
                            children: [
                              C.jsx('span', {
                                className: wa.label,
                                children: '目标:',
                              }),
                              C.jsx('span', {
                                className: wa.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          C.jsxs('div', {
                            className: wa.detailItem,
                            children: [
                              C.jsx('span', {
                                className: wa.label,
                                children: '标签:',
                              }),
                              C.jsx('div', {
                                className: wa.labels,
                                children: e.labels.map((e, t) =>
                                  C.jsx(
                                    'span',
                                    { className: wa.labelTag, children: e },
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
                C.jsxs('div', {
                  className: `${wa.detailSection} ${wa.compact}`,
                  children: [
                    C.jsx('h3', { children: '作者' }),
                    C.jsxs('div', {
                      className: `${wa.authorInfo} ${wa.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          C.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: wa.authorAvatar,
                          }),
                        C.jsxs('div', {
                          className: wa.authorDetails,
                          children: [
                            C.jsx('div', {
                              className: wa.authorName,
                              children: e.author.name,
                            }),
                            C.jsxs('div', {
                              className: wa.authorUsername,
                              children: ['@', e.author.username],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              (e.project || e.project_id) &&
                C.jsxs('div', {
                  className: `${wa.detailSection} ${wa.compact}`,
                  children: [
                    C.jsx('h3', { children: '项目' }),
                    C.jsx('div', {
                      className: `${wa.projectInfo} ${wa.compactProject}`,
                      children: e.project
                        ? C.jsxs(C.Fragment, {
                            children: [
                              C.jsxs('div', {
                                className: wa.detailItem,
                                children: [
                                  C.jsx('span', {
                                    className: wa.label,
                                    children: '名称:',
                                  }),
                                  C.jsx('span', {
                                    className: wa.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              C.jsxs('div', {
                                className: wa.detailItem,
                                children: [
                                  C.jsx('span', {
                                    className: wa.label,
                                    children: '路径:',
                                  }),
                                  C.jsx('span', {
                                    className: wa.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : C.jsxs('div', {
                            className: wa.detailItem,
                            children: [
                              C.jsx('span', {
                                className: wa.label,
                                children: '项目ID:',
                              }),
                              C.jsx('span', {
                                className: wa.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                C.jsxs('div', {
                  className: wa.detailSection,
                  children: [
                    C.jsx('h3', { children: '推送信息' }),
                    C.jsxs('div', {
                      className: wa.pushInfo,
                      children: [
                        C.jsxs('div', {
                          className: wa.detailItem,
                          children: [
                            C.jsx('span', {
                              className: wa.label,
                              children: '分支:',
                            }),
                            C.jsx('span', {
                              className: wa.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        C.jsxs('div', {
                          className: wa.detailItem,
                          children: [
                            C.jsx('span', {
                              className: wa.label,
                              children: '提交数量:',
                            }),
                            C.jsx('span', {
                              className: wa.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        C.jsxs('div', {
                          className: wa.detailItem,
                          children: [
                            C.jsx('span', {
                              className: wa.label,
                              children: '提交标题:',
                            }),
                            C.jsx('span', {
                              className: wa.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        C.jsxs('div', {
                          className: wa.detailItem,
                          children: [
                            C.jsx('span', {
                              className: wa.label,
                              children: '提交哈希:',
                            }),
                            C.jsx('span', {
                              className: `${wa.value} ${wa.commitHash}`,
                              children: e.push_data.commit_to,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              e.note &&
                C.jsxs('div', {
                  className: wa.detailSection,
                  children: [
                    C.jsx('h3', { children: '评论信息' }),
                    C.jsxs('div', {
                      className: wa.noteInfo,
                      children: [
                        C.jsx('div', {
                          className: wa.noteBody,
                          children: e.note.body,
                        }),
                        C.jsxs('div', {
                          className: wa.noteMeta,
                          children: [
                            C.jsxs('span', {
                              children: ['创建时间: ', s(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              C.jsxs('span', {
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
          C.jsxs('div', {
            className: wa.modalFooter,
            children: [
              n() &&
                C.jsx('a', {
                  href: n(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: wa.sourceLinkBtn,
                  children: '打开源页面',
                }),
              C.jsx('button', {
                className: wa.closeModalBtn,
                onClick: a,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var l
  }
class $a {
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
        timeout: h.REQUEST_TIMEOUT,
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
      let t = e || n.statusText
      switch (n.status) {
        case 401:
          t = 'GitLab认证失败，请检查Token是否有效'
          break
        case 403:
          t = 'GitLab访问权限不足，请检查Token权限'
          break
        case 404:
          t = 'GitLab资源不存在，请检查URL或项目权限'
          break
        case 429:
          t = 'GitLab API请求频率过高，请稍后重试'
          break
        case 500:
        case 502:
        case 503:
        case 504:
          t = 'GitLab服务器错误，请稍后重试'
      }
      throw p.createApiError(n.status, t, 'GitLab API')
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
      throw p.createResponseError('Token格式无效', 'GitLab API')
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
  async getUserProjects() {
    return this.request('/projects?membership=true&per_page=100')
  }
  async getUserEvents(e, t = {}) {
    const a = new URLSearchParams()
    t.after && a.set('after', t.after),
      t.before && a.set('before', t.before),
      t.sort && a.set('sort', t.sort),
      t.page && a.set('page', t.page.toString()),
      t.per_page && a.set('per_page', t.per_page.toString()),
      t.action && t.action.forEach(e => a.append('action', e)),
      t.target_type && t.target_type.forEach(e => a.append('target_type', e))
    const s = a.toString(),
      n = s ? `/users/${e}/events?${s}` : `/users/${e}/events`
    return this.request(n)
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
    const s = a.toString(),
      n = s ? `/users/${e}/events?${s}` : `/users/${e}/events`,
      l = `${this.baseUrl}${n}`,
      i = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: h.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(l, i)
    if (!o.ok) {
      const e = await o.text()
      throw p.createApiError(o.status, e || o.statusText, 'GitLab API')
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
  async getProject(e) {
    return this.request(`/projects/${e}`)
  }
  getCachedUser() {
    return this.currentUser
  }
}
const Da = {
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
  Ma = ({ isUserscript: e = !1 }) => {
    const {
        state: t,
        updateConfig: s,
        setTheme: n,
        setActivePanel: l,
        updateFilterConditions: i,
        updateSortOptions: o,
        updatePaginationOptions: d,
        setEvents: r,
        setTotal: _,
        setAIGenerationConfig: m,
        setLoading: u,
        setError: h,
        isConfigValid: v,
        getTimeRange: x,
      } = D(),
      {
        createRequest: g,
        isRequestCancelled: j,
        cleanupRequest: b,
        isAbortError: f,
      } = (() => {
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
          i = a.useCallback(
            e => e instanceof Error && 'AbortError' === e.name,
            [],
          )
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
      })(),
      N = a.useMemo(() => {
        return (
          (e = t.config.gitlabUrl), (a = t.config.gitlabToken), new $a(e, a)
        )
        var e, a
      }, [t.config.gitlabUrl, t.config.gitlabToken]),
      [y, E] = a.useState(null),
      [k, w] = a.useState(!1),
      [$, M] = a.useState([]),
      S = a.useMemo(
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
    const A = a.useCallback(
      async e => {
        var a, s
        if (!v()) return void h(c.INVALID_FILTER_OR_CONFIG)
        const n = g()
        u(!0), h(null)
        try {
          await N.init()
          const { startDate: l, endDate: i } = x(),
            o = e || t.filterConditions,
            d =
              (null == (a = o.targetType) ? void 0 : a.length) > 0
                ? o.targetType
                : void 0,
            c =
              (null == (s = o.action) ? void 0 : s.length) > 0
                ? o.action
                : void 0,
            m = t.sortOptions.order || 'desc',
            u = await N.getCurrentUser(),
            p = {
              after: l,
              before: i,
              target_type: d,
              action: c,
              page: t.paginationOptions.page,
              per_page: t.paginationOptions.pageSize,
              sort: m,
              signal: n.signal,
            },
            { events: h, total: v } = await N.getUserEventsWithTotal(u.id, p)
          if (j(n)) return
          r(h), M(h.map(e => e.id)), _(v)
        } catch (l) {
          if (f(l)) return
          const e = p.formatErrorMessage(l)
          h(e), r([]), _(0)
        } finally {
          j(n) || u(!1), b(n)
        }
      },
      [
        t.paginationOptions.page,
        t.paginationOptions.pageSize,
        t.sortOptions,
        t.filterConditions,
        x,
        r,
        _,
        u,
        h,
        v,
        N,
        g,
        j,
        f,
        b,
      ],
    )
    a.useEffect(() => {
      v() && A()
    }, [v, A])
    return C.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${Da.app} ${e ? Da.userscriptMode : Da.webMode} ${Da[S]}`,
      children: [
        C.jsx(lt, {
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: $,
          onFilterChange: e => {
            i(e), A(e)
          },
          onSortChange: e => {
            o(e)
          },
          onPaginationChange: e => {
            d(e)
          },
          onEventSelect: (e, t) => {
            M(a => (t ? [...a, e] : a.filter(t => t !== e)))
          },
          onSelectAll: e => {
            M(e ? t.events.map(e => e.id) : [])
          },
          onEventDetail: e => {
            E(e), w(!0)
          },
          onOpenSettings: () => {
            l('settings')
          },
          onOpenAI: () => {
            v() ? l('ai') : h(c.INCOMPLETE_GITLAB_DEEPSEEK)
          },
        }),
        C.jsx(Ta, {
          event: y,
          visible: k,
          onClose: () => {
            w(!1), E(null)
          },
        }),
        C.jsx(Rt, {
          isOpen: 'settings' === t.activePanel,
          config: t.config,
          theme: t.theme,
          onClose: () => {
            l('main')
          },
          onSave: (e, t) => {
            s(e), n(t)
          },
        }),
        C.jsx(ka, {
          visible: 'ai' === t.activePanel,
          config: t.aiGenerationConfig,
          defaultPrompt: t.config.defaultPrompt,
          onClose: () => {
            l('main')
          },
          onGenerate: async e => {
            if (v())
              if (0 !== $.length) {
                u(!0), h(null)
                try {
                  const a = t.events
                      .filter(e => $.includes(e.id))
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
                              })(e)) in T
                            )
                              return
                            T[e] = !0
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
                          './deepseek-api-Dzze1tj0.js'
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
                  m({ prompt: e, tokensUsed: l.tokensUsed, result: l.content }),
                    u(!1)
                } catch (a) {
                  const e = p.formatErrorMessage(a)
                  h(e), u(!1)
                }
              } else h(c.NO_EVENTS_SELECTED)
            else h(c.INCOMPLETE_CONFIG)
          },
          isLoading: t.isLoading,
          selectedEventsCount: $.length,
          dateRange: x(),
        }),
      ],
    })
  }
k.createRoot(document.getElementById('root')).render(
  C.jsx(n.StrictMode, { children: C.jsx(Ma, {}) }),
)
