const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/deepseek-api-CnucE9Cl.js', 'assets/utils-DjihK3HQ.js']),
) => i.map(i => d[i])
var e = Object.defineProperty,
  t = (t, a, l) =>
    ((t, a, l) =>
      a in t
        ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: l })
        : (t[a] = l))(t, 'symbol' != typeof a ? a + '' : a, l)
import { r as a, a as l, R as s } from './vendor-DtYzeC-x.js'
import {
  D as n,
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
} from './utils-DjihK3HQ.js'
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
  g = {},
  x = a,
  j = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  f = Object.prototype.hasOwnProperty,
  N = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  C = { key: !0, ref: !0, __self: !0, __source: !0 }
function y(e, t, a) {
  var l,
    s = {},
    n = null,
    i = null
  for (l in (void 0 !== a && (n = '' + a),
  void 0 !== t.key && (n = '' + t.key),
  void 0 !== t.ref && (i = t.ref),
  t))
    f.call(t, l) && !C.hasOwnProperty(l) && (s[l] = t[l])
  if (e && e.defaultProps)
    for (l in (t = e.defaultProps)) void 0 === s[l] && (s[l] = t[l])
  return { $$typeof: j, type: e, key: n, ref: i, props: s, _owner: N.current }
}
;(g.Fragment = b), (g.jsx = y), (g.jsxs = y), (v.exports = g)
var k = v.exports,
  E = {},
  w = l
;(E.createRoot = w.createRoot), (E.hydrateRoot = w.hydrateRoot)
const T = {},
  L = {
    config: r,
    reportData: null,
    isLoading: !1,
    error: null,
    theme: r.theme,
    activePanel: 'main',
    appMode: 'events',
    filterConditions: o,
    sortOptions: i,
    paginationOptions: n,
    events: [],
    totalCount: 0,
    aiGenerationConfig: null,
    projects: [],
    selectedProjectId: null,
    commits: [],
  }
function S() {
  const [e, t] = a.useState(L)
  a.useEffect(() => {
    ;(async () => {
      try {
        const e = await d.loadConfig()
        t(t => {
          const a = e ? { ...r, ...e } : r
          return { ...t, config: a, theme: a.theme || r.theme }
        })
      } catch (e) {
        console.error('Failed to load saved config:', e),
          t(e => ({ ...e, config: r, theme: r.theme }))
      }
    })()
  }, [])
  const l = a.useCallback(e => {
      t(t => {
        const a = { ...t.config, ...e }
        try {
          d.saveConfig(a)
        } catch (l) {
          console.error('Failed to save config:', l)
        }
        return { ...t, config: a }
      })
    }, []),
    s = a.useCallback(e => {
      t(t => ({ ...t, activePanel: e }))
    }, []),
    n = a.useCallback(e => {
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
    v = a.useCallback(e => {
      t(t => ({ ...t, aiGenerationConfig: e }))
    }, []),
    g = a.useCallback(e => {
      t(t => ({ ...t, isLoading: e }))
    }, []),
    x = a.useCallback(e => {
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
        } catch (l) {
          console.error('Failed to save theme:', l)
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
        } catch (l) {
          console.error('Failed to save theme:', l)
        }
        return { ...e, config: a, theme: t }
      })
    }, []),
    N = a.useCallback(() => {
      t(L), d.clearConfig()
    }, []),
    C = a.useCallback(() => {
      const {
        gitlabUrl: t,
        gitlabToken: a,
        deepseekApiKey: l,
        defaultPrompt: s,
      } = e.config
      return !!(t.trim() && a.trim() && l.trim() && s.trim())
    }, [e.config]),
    y = a.useCallback(() => {
      const t = new Date(),
        a = e.filterConditions.timeRange,
        l = 864e5,
        s = new Date(t.getTime() + l)
      if ('week' === a) {
        const e = t.getDay()
        let a = 0 === e ? 6 : e - 1
        1 === e && (a += 1)
        return {
          startDate: new Date(t.getTime() - a * l).toISOString().split('T')[0],
          endDate: s.toISOString().split('T')[0],
        }
      }
      let n = 7
      n = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[a] || 7
      return {
        startDate: new Date(t.getTime() - n * l).toISOString().split('T')[0],
        endDate: s.toISOString().split('T')[0],
      }
    }, [e.filterConditions.timeRange])
  return {
    state: e,
    updateConfig: l,
    setActivePanel: s,
    setAppMode: n,
    setProjects: i,
    setSelectedProjectId: o,
    setCommits: c,
    updateFilterConditions: _,
    updateSortOptions: m,
    updatePaginationOptions: u,
    setEvents: p,
    setTotal: h,
    setAIGenerationConfig: v,
    setLoading: g,
    setError: x,
    setReportData: j,
    setTheme: b,
    toggleTheme: f,
    resetState: N,
    isConfigValid: C,
    getTimeRange: y,
  }
}
const $ = () => {
    const e = a.useRef(null),
      t = a.useCallback(() => {
        e.current && e.current.abort()
        const t = new AbortController()
        return (e.current = t), t
      }, []),
      l = a.useCallback(() => {
        e.current && (e.current.abort(), (e.current = null))
      }, []),
      s = a.useCallback(e => e.signal.aborted, []),
      n = a.useCallback(t => {
        e.current === t && (e.current = null)
      }, []),
      i = a.useCallback(e => e instanceof Error && 'AbortError' === e.name, [])
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
        isRequestCancelled: s,
        cleanupRequest: n,
        isAbortError: i,
      }
    )
  },
  M = {
    mainPanel: 'index-module__main-panel__82FLm',
    panelHeader: 'index-module__panel-header__kyx4p',
    headerLeft: 'index-module__header-left__xT1T5',
    headerRight: 'index-module__header-right__7F8Bo',
    modeToggle: 'index-module__mode-toggle__9yafG',
    toggleTrack: 'index-module__toggle-track__82VKI',
    toggleSlider: 'index-module__toggle-slider__tkY4o',
    slideRight: 'index-module__slide-right__qPOZu',
    toggleOption: 'index-module__toggle-option__ZhXXU',
    active: 'index-module__active__Mr5KU',
    toggleIcon: 'index-module__toggle-icon__AI6K7',
    toggleLabel: 'index-module__toggle-label__1qZLz',
    divider: 'index-module__divider__QXSgp',
    actionButtons: 'index-module__action-buttons__xGRHl',
    actionBtn: 'index-module__action-btn__x4IAP',
    btnIcon: 'index-module__btn-icon__ZaYHk',
    btnLabel: 'index-module__btn-label__tM2Rz',
    aiBtn: 'index-module__ai-btn__5kAV3',
    filterSection: 'index-module__filter-section__gMBIz',
    filterSectionContent: 'index-module__filter-section-content__A3AOe',
    filterGroup: 'index-module__filter-group__hk7qq',
    filterLabel: 'index-module__filter-label__TDZ3H',
    filterOptions: 'index-module__filter-options__4AUEQ',
    filterOption: 'index-module__filter-option__-CSf1',
    projectSelect: 'index-module__project-select__cUof-',
    loadingText: 'index-module__loading-text__Cbo-X',
    emptyText: 'index-module__empty-text__rIon9',
    eventsSection: 'index-module__events-section__gJwdk',
  },
  D = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  I = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  A = [
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
  O = ({ filterConditions: e, onFilterChange: t }) =>
    k.jsxs('div', {
      className: M.filterSectionContent,
      children: [
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '时间范围' }),
            k.jsx('div', {
              className: M.filterOptions,
              children: D.map(a =>
                k.jsx(
                  'button',
                  {
                    className: `${M.filterOption} ${e.timeRange === a.value ? M.active : ''}`,
                    onClick: () => {
                      return (l = a.value), void t({ ...e, timeRange: l })
                      var l
                    },
                    children: a.label,
                  },
                  a.value,
                ),
              ),
            }),
          ],
        }),
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '目标类型' }),
            k.jsxs('div', {
              className: M.filterOptions,
              children: [
                k.jsx('button', {
                  className: `${M.filterOption} ${0 === e.targetType.length ? M.active : ''}`,
                  onClick: () => t({ ...e, targetType: [] }),
                  children: '全部',
                }),
                I.map(a =>
                  k.jsx(
                    'button',
                    {
                      className: `${M.filterOption} ${e.targetType.includes(a.value) ? M.active : ''}`,
                      onClick: () =>
                        ((a, l) => {
                          const s = l
                            ? [...e.targetType, a]
                            : e.targetType.filter(e => e !== a)
                          t({ ...e, targetType: s })
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
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '操作类型' }),
            k.jsxs('div', {
              className: M.filterOptions,
              children: [
                k.jsx('button', {
                  className: `${M.filterOption} ${0 === e.action.length ? M.active : ''}`,
                  onClick: () => t({ ...e, action: [] }),
                  children: '全部',
                }),
                A.map(a =>
                  k.jsx(
                    'button',
                    {
                      className: `${M.filterOption} ${e.action.includes(a.value) ? M.active : ''}`,
                      onClick: () =>
                        ((a, l) => {
                          const s = l
                            ? [...e.action, a]
                            : e.action.filter(e => e !== a)
                          t({ ...e, action: s })
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
  P = 'index-module__pagination__5dauU',
  R = 'index-module__pagination-info__xbUbw',
  G = 'index-module__pagination-controls__q2hqL',
  U = 'index-module__pagination-btn__P1OCG',
  q = 'index-module__disabled__BywdX',
  B = 'index-module__active__lSJu-',
  F = 'index-module__pagination-ellipsis__gQnax',
  z = 'index-module__pagination-size-changer__SufyI',
  H = 'index-module__pagination-select__JwvbH',
  X = ({
    current: e,
    pageSize: t,
    total: a,
    onChange: l,
    showSizeChanger: n = !0,
    pageSizeOptions: i = [20, 50, 100, 200],
    onShowSizeChange: o,
    selectedCount: r = 0,
  }) => {
    const d = Math.ceil(a / t),
      c = (e - 1) * t + 1,
      _ = Math.min(e * t, a),
      m = t => {
        t >= 1 && t <= d && t !== e && l(t)
      }
    return 0 === a
      ? k.jsx('div', {
          className: P,
          children: k.jsx('div', { className: R, children: '暂无数据' }),
        })
      : k.jsxs('div', {
          className: P,
          children: [
            k.jsxs('div', {
              className: R,
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
              className: G,
              children: [
                k.jsx('button', {
                  className: `${U} ${1 === e ? q : ''}`,
                  onClick: () => m(e - 1),
                  disabled: 1 === e,
                  children: k.jsx('span', { children: '‹' }),
                }),
                (() => {
                  const t = []
                  if (d <= 7)
                    t.push(...Array.from({ length: d }, (e, t) => t + 1))
                  else {
                    t.push(1), e > 4 && t.push('...')
                    const a = Math.max(2, e - 2),
                      l = Math.min(d - 1, e + 2)
                    t.push(
                      ...Array.from({ length: l - a + 1 }, (e, t) => a + t),
                    ),
                      e < d - 2 - 1 && t.push('...'),
                      d > 1 && t.push(d)
                  }
                  return t
                })().map((t, a) =>
                  k.jsx(
                    s.Fragment,
                    {
                      children:
                        'number' == typeof t
                          ? k.jsx('button', {
                              className: `${U} ${e === t ? B : ''}`,
                              onClick: () => m(t),
                              children: t,
                            })
                          : k.jsx('span', { className: F, children: t }),
                    },
                    a,
                  ),
                ),
                k.jsx('button', {
                  className: `${U} ${e === d ? q : ''}`,
                  onClick: () => m(e + 1),
                  disabled: e === d,
                  children: k.jsx('span', { children: '›' }),
                }),
              ],
            }),
            n &&
              k.jsxs('div', {
                className: z,
                children: [
                  k.jsx('span', { children: '每页' }),
                  k.jsx('select', {
                    value: t,
                    onChange: e => {
                      return (t = Number(e.target.value)), void (o && o(1, t))
                      var t
                    },
                    className: H,
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
  V = 'EventsList-module__events-list__Z2gnl',
  Z = 'EventsList-module__events-list-header__i8ZCs',
  K = 'EventsList-module__header-cell__tSGKU',
  Y = 'EventsList-module__checkbox-cell__YvmEK',
  J = 'EventsList-module__content-cell__aiH0X',
  Q = 'EventsList-module__action-cell__BBBS7',
  W = 'EventsList-module__time-cell__F02or',
  ee = 'EventsList-module__detail-cell__soty-',
  te = 'EventsList-module__sort-icon__OkgLv',
  ae = 'EventsList-module__events-list-body__Pcosk',
  le = 'EventsList-module__event-row__ka77Q',
  se = 'EventsList-module__selected__YUioo',
  ne = 'EventsList-module__cell__5Y8iC',
  ie = 'EventsList-module__event-icon__52LqG',
  oe = 'EventsList-module__event-content__I8le1',
  re = 'EventsList-module__event-title__wVvqr',
  de = 'EventsList-module__event-description__GZfW0',
  ce = 'EventsList-module__action-tag__IBpm0',
  _e = 'EventsList-module__event-time__RCPoO',
  me = 'EventsList-module__detail-btn__PLLL4',
  ue = 'EventsList-module__detail-icon__eATZo',
  pe = 'EventsList-module__empty-state__Z-gwH',
  he = 'EventsList-module__empty-icon__R7-ij',
  ve = 'EventsList-module__events-list-footer__7LiRc',
  ge = 'EventsList-module__events-list-loading__pcl-h',
  xe = 'EventsList-module__loading-spinner__rJ-Jy',
  je = 'EventsList-module__checkbox-container__L1if8',
  be = 'EventsList-module__checkmark__-GyO9',
  fe = ({
    events: e,
    totalCount: t,
    loading: a,
    sortOptions: l,
    onSortChange: s,
    paginationOptions: n,
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
          l = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
          s = new Date(l.getTime() - 864e5),
          n = new Date(t.getFullYear(), t.getMonth(), t.getDate())
        if (n.getTime() === l.getTime())
          return `今天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
        if (n.getTime() === s.getTime())
          return `昨天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
        {
          const e = l.getTime() - n.getTime(),
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
      ? k.jsxs('div', {
          className: ge,
          children: [
            k.jsx('div', { className: xe }),
            k.jsx('p', { children: '正在加载事件数据...' }),
          ],
        })
      : k.jsxs('div', {
          className: V,
          children: [
            k.jsxs('div', {
              className: Z,
              children: [
                k.jsx('div', {
                  className: `${K} ${Y}`,
                  children: k.jsxs('label', {
                    className: je,
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
                      k.jsx('span', { className: be }),
                    ],
                  }),
                }),
                k.jsx('div', {
                  className: `${K} ${J}`,
                  children: k.jsx('span', { children: '标题和内容' }),
                }),
                k.jsx('div', {
                  className: `${K} ${Q}`,
                  children: k.jsx('span', { children: '操作' }),
                }),
                k.jsxs('div', {
                  className: `${K} ${W}`,
                  onClick: () =>
                    (e => {
                      const t =
                        l.field === e && 'desc' === l.order ? 'asc' : 'desc'
                      s({ field: e, order: t })
                    })('created_at'),
                  children: [
                    k.jsx('span', { children: '时间' }),
                    k.jsx('span', {
                      className: te,
                      children:
                        ((g = 'created_at'),
                        l.field !== g ? '' : 'desc' === l.order ? '↓' : '↑'),
                    }),
                  ],
                }),
                k.jsx('div', { className: `${K} ${ee}`, children: '详情' }),
              ],
            }),
            k.jsx('div', {
              className: ae,
              children:
                0 === e.length
                  ? k.jsxs('div', {
                      className: pe,
                      children: [
                        k.jsx('div', { className: he, children: '📄' }),
                        k.jsx('p', { children: '暂无事件数据' }),
                        k.jsx('span', { children: c.INVALID_FILTER_OR_CONFIG }),
                      ],
                    })
                  : e.map(e => {
                      const t = o.includes(e.id),
                        {
                          icon: a,
                          title: l,
                          actionType: s,
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
                          const l = {
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
                          return l
                            ? {
                                icon: l.icon,
                                actionType: l.actionType,
                                title: h(e),
                              }
                            : {
                                icon: '📋',
                                actionType: a || t || '未知操作',
                                title: h(e),
                              }
                        })(e)
                      return k.jsxs(
                        'div',
                        {
                          className: `${le} ${t ? se : ''}`,
                          children: [
                            k.jsx('div', {
                              className: `${ne} ${Y}`,
                              children: k.jsxs('label', {
                                className: je,
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
                                  k.jsx('span', { className: be }),
                                ],
                              }),
                            }),
                            k.jsxs('div', {
                              className: `${ne} ${J}`,
                              children: [
                                k.jsx('div', { className: ie, children: a }),
                                k.jsxs('div', {
                                  className: oe,
                                  children: [
                                    k.jsx('div', {
                                      className: re,
                                      children: l,
                                    }),
                                    k.jsx('div', {
                                      className: de,
                                      children: v(e),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            k.jsx('div', {
                              className: `${ne} ${Q}`,
                              children: k.jsx('span', {
                                className: ce,
                                children: s,
                              }),
                            }),
                            k.jsx('div', {
                              className: `${ne} ${W}`,
                              children: k.jsx('span', {
                                className: _e,
                                children: p(e.created_at),
                              }),
                            }),
                            k.jsx('div', {
                              className: `${ne} ${ee}`,
                              children: k.jsx('button', {
                                className: me,
                                onClick: () => _(e),
                                title: '查看详情',
                                children: k.jsx('span', {
                                  className: ue,
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
              className: ve,
              children: k.jsx(X, {
                current: n.page,
                pageSize: n.pageSize,
                total: t,
                onChange: e => i({ ...n, page: e }),
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
class Ne {
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
      s = await _(a, l)
    if (!s.ok) {
      let e
      try {
        e = await s.text()
      } catch {
        e = s.statusText
      }
      console.error(`GitLab API Error [${s.status}]:`, e)
      let t = e || s.statusText
      switch (s.status) {
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
    const t = new URLSearchParams()
    void 0 !== e.membership && t.set('membership', e.membership.toString()),
      e.per_page && t.set('per_page', e.per_page.toString()),
      void 0 !== e.starred && t.set('starred', e.starred.toString()),
      void 0 !== e.simple && t.set('simple', e.simple.toString()),
      e.order_by && t.set('order_by', e.order_by),
      e.search && t.set('search', e.search),
      e.page && t.set('page', e.page.toString())
    const a = t.toString(),
      l = a ? `/projects?${a}` : '/projects'
    return this.request(l)
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
    const l = a.toString(),
      s = l ? `/users/${e}/events?${l}` : `/users/${e}/events`,
      n = `${this.baseUrl}${s}`,
      i = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(n, i)
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
      s = l ? `/projects/${e}/events?${l}` : `/projects/${e}/events`,
      n = `${this.baseUrl}${s}`,
      i = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': this.token,
        },
        timeout: u.REQUEST_TIMEOUT,
        signal: t.signal,
      },
      o = await _(n, i)
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
      console.log('GitLab Project Events API Response:', {
        projectId: e,
        eventsCount: r.length,
        totalHeader: c,
        calculatedTotal: d,
        isHeadersInstance: o.headers instanceof Headers,
        headersType: typeof o.headers,
      }),
      0 === d &&
        r.length > 0 &&
        ((d = r.length),
        console.warn(
          'No total count in response headers for project events, using events array length as fallback',
        )),
      { events: r, total: d }
    )
  }
  getCachedUser() {
    return this.currentUser
  }
}
const Ce = [
    { value: 'week', label: '本周' },
    { value: '7d', label: '最近7天' },
    { value: '30d', label: '最近30天' },
    { value: '90d', label: '最近90天' },
    { value: '180d', label: '最近180天' },
    { value: '365d', label: '最近365天' },
  ],
  ye = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: 'Milestone' },
    { value: 'note', label: 'Note' },
    { value: 'project', label: 'Project' },
    { value: 'snippet', label: 'Snippet' },
    { value: 'user', label: 'User' },
  ],
  ke = [
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
  Ee = ({ filterConditions: e, onFilterChange: t }) => {
    var l, s
    const { state: n } = S(),
      [i, o] = a.useState([]),
      [r, d] = a.useState(!1),
      {
        createRequest: c,
        isRequestCancelled: _,
        cleanupRequest: m,
        isAbortError: u,
      } = $(),
      p = a.useMemo(() => {
        var e, t
        return (null == (e = n.config) ? void 0 : e.gitlabUrl) &&
          (null == (t = n.config) ? void 0 : t.gitlabToken)
          ? new Ne(n.config.gitlabUrl, n.config.gitlabToken)
          : null
      }, [
        null == (l = n.config) ? void 0 : l.gitlabUrl,
        null == (s = n.config) ? void 0 : s.gitlabToken,
      ]),
      h = a.useCallback(async () => {
        if (!p) return void console.error('GitLab 服务未初始化')
        const e = c()
        d(!0)
        try {
          await p.init()
          const t = await p.getProjects({
            membership: !0,
            per_page: 100,
            simple: !0,
            order_by: 'last_activity_at',
          })
          if (_(e)) return
          o(t)
        } catch (t) {
          u(t) || console.error('获取项目列表失败:', t)
        } finally {
          _(e) || d(!1), m(e)
        }
      }, [p, c, _, u, m])
    a.useEffect(() => {
      p && h()
    }, [p, h])
    const v = a.useCallback(
        a => {
          t({ ...e, timeRange: a })
        },
        [e, t],
      ),
      g = a.useCallback(
        (a, l) => {
          const s = l ? [...e.targetType, a] : e.targetType.filter(e => e !== a)
          t({ ...e, targetType: s })
        },
        [e, t],
      ),
      x = a.useCallback(
        (a, l) => {
          const s = l ? [...e.action, a] : e.action.filter(e => e !== a)
          t({ ...e, action: s })
        },
        [e, t],
      )
    return k.jsxs('div', {
      className: M.filterSectionContent,
      children: [
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', {
              className: M.filterLabel,
              children: '项目选择 *',
            }),
            k.jsx('div', {
              className: M.filterOptions,
              children: r
                ? k.jsx('span', {
                    className: M.loadingText,
                    children: '加载项目中...',
                  })
                : 0 === i.length
                  ? k.jsx('span', {
                      className: M.emptyText,
                      children: '暂无可用项目',
                    })
                  : k.jsxs('select', {
                      className: M.projectSelect,
                      value: e.projectId || '',
                      onChange: a => {
                        const l = a.target.value
                          ? Number(a.target.value)
                          : void 0
                        t({ ...e, projectId: l })
                      },
                      children: [
                        k.jsx('option', { value: '', children: '请选择项目' }),
                        i.map(e =>
                          k.jsx(
                            'option',
                            {
                              value: e.id,
                              children: e.path_with_namespace || e.name,
                            },
                            e.id,
                          ),
                        ),
                      ],
                    }),
            }),
          ],
        }),
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '时间范围' }),
            k.jsx('div', {
              className: M.filterOptions,
              children: Ce.map(t =>
                k.jsx(
                  'button',
                  {
                    className: `${M.filterOption} ${e.timeRange === t.value ? M.active : ''}`,
                    onClick: () => v(t.value),
                    children: t.label,
                  },
                  t.value,
                ),
              ),
            }),
          ],
        }),
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '目标类型' }),
            k.jsxs('div', {
              className: M.filterOptions,
              children: [
                k.jsx('button', {
                  className: `${M.filterOption} ${0 === e.targetType.length ? M.active : ''}`,
                  onClick: () => t({ ...e, targetType: [] }),
                  children: '全部',
                }),
                ye.map(t =>
                  k.jsx(
                    'button',
                    {
                      className: `${M.filterOption} ${e.targetType.includes(t.value) ? M.active : ''}`,
                      onClick: () =>
                        g(t.value, !e.targetType.includes(t.value)),
                      children: t.label,
                    },
                    t.value,
                  ),
                ),
              ],
            }),
          ],
        }),
        k.jsxs('div', {
          className: M.filterGroup,
          children: [
            k.jsx('label', { className: M.filterLabel, children: '操作类型' }),
            k.jsxs('div', {
              className: M.filterOptions,
              children: [
                k.jsx('button', {
                  className: `${M.filterOption} ${0 === e.action.length ? M.active : ''}`,
                  onClick: () => t({ ...e, action: [] }),
                  children: '全部',
                }),
                ke.map(t =>
                  k.jsx(
                    'button',
                    {
                      className: `${M.filterOption} ${e.action.includes(t.value) ? M.active : ''}`,
                      onClick: () => x(t.value, !e.action.includes(t.value)),
                      children: t.label,
                    },
                    t.value,
                  ),
                ),
              ],
            }),
          ],
        }),
      ],
    })
  },
  we = ({
    events: e,
    loading: t,
    total: a,
    currentPage: l,
    onPageChange: s,
  }) => {
    const n = Math.ceil(a / 20)
    return t
      ? k.jsx('div', {
          className: M.eventsContainer,
          children: k.jsxs('div', {
            className: M.loadingContainer,
            children: [
              k.jsx('div', { className: M.loadingSpinner }),
              k.jsx('span', { children: '加载中...' }),
            ],
          }),
        })
      : 0 === e.length
        ? k.jsx('div', {
            className: M.eventsContainer,
            children: k.jsxs('div', {
              className: M.emptyState,
              children: [
                k.jsx('div', { className: M.emptyIcon, children: '📋' }),
                k.jsx('h3', { children: '暂无事件' }),
                k.jsx('p', { children: '请选择项目并调整筛选条件' }),
              ],
            }),
          })
        : k.jsxs('div', {
            className: M.eventsContainer,
            children: [
              k.jsx('div', {
                className: M.eventsHeader,
                children: k.jsxs('h3', { children: ['项目事件 (', a, ')'] }),
              }),
              k.jsxs('div', {
                className: M.eventsTable,
                children: [
                  k.jsxs('div', {
                    className: M.tableHeader,
                    children: [
                      k.jsx('div', {
                        className: M.headerCell,
                        children: '时间',
                      }),
                      k.jsx('div', {
                        className: M.headerCell,
                        children: '操作',
                      }),
                      k.jsx('div', {
                        className: M.headerCell,
                        children: '类型',
                      }),
                      k.jsx('div', {
                        className: M.headerCell,
                        children: '作者',
                      }),
                      k.jsx('div', {
                        className: M.headerCell,
                        children: '描述',
                      }),
                    ],
                  }),
                  k.jsx('div', {
                    className: M.tableBody,
                    children: e.map(e => {
                      var t, a, l, s, n, i
                      return k.jsxs(
                        'div',
                        {
                          className: M.tableRow,
                          children: [
                            k.jsx('div', {
                              className: M.tableCell,
                              children:
                                ((i = e.created_at),
                                new Date(i).toLocaleString('zh-CN', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })),
                            }),
                            k.jsx('div', {
                              className: M.tableCell,
                              children: k.jsx('span', {
                                className: M.actionBadge,
                                children:
                                  ((n = e.action_name),
                                  {
                                    created: '创建',
                                    updated: '更新',
                                    pushed: '推送',
                                    opened: '打开',
                                    closed: '关闭',
                                    merged: '合并',
                                    commented: '评论',
                                    approved: '批准',
                                    joined: '加入',
                                    left: '离开',
                                    destroyed: '删除',
                                  }[n] || n),
                              }),
                            }),
                            k.jsx('div', {
                              className: M.tableCell,
                              children: k.jsx('span', {
                                className: M.typeBadge,
                                children:
                                  ((s = e.target_type || ''),
                                  {
                                    Issue: '议题',
                                    MergeRequest: '合并请求',
                                    Project: '项目',
                                    Milestone: '里程碑',
                                    Note: '评论',
                                    WikiPage: 'Wiki页面',
                                    User: '用户',
                                    Group: '群组',
                                  }[s] || s),
                              }),
                            }),
                            k.jsx('div', {
                              className: M.tableCell,
                              children: k.jsxs('div', {
                                className: M.authorInfo,
                                children: [
                                  (null == (t = e.author)
                                    ? void 0
                                    : t.avatar_url) &&
                                    k.jsx('img', {
                                      src: e.author.avatar_url,
                                      alt: e.author.name,
                                      className: M.authorAvatar,
                                    }),
                                  k.jsx('span', {
                                    className: M.authorName,
                                    children:
                                      (null == (a = e.author)
                                        ? void 0
                                        : a.name) || '未知用户',
                                  }),
                                ],
                              }),
                            }),
                            k.jsx('div', {
                              className: M.tableCell,
                              children: k.jsx('div', {
                                className: M.eventDescription,
                                children:
                                  e.target_title ||
                                  (null == (l = e.push_data)
                                    ? void 0
                                    : l.commit_title) ||
                                  '无描述',
                              }),
                            }),
                          ],
                        },
                        e.id,
                      )
                    }),
                  }),
                ],
              }),
              n > 1 &&
                k.jsx('div', {
                  className: M.paginationContainer,
                  children: k.jsxs('div', {
                    className: M.pagination,
                    children: [
                      k.jsx('button', {
                        className: M.pageButton,
                        disabled: 1 === l,
                        onClick: () => s(l - 1),
                        children: '上一页',
                      }),
                      k.jsxs('span', {
                        className: M.pageInfo,
                        children: ['第 ', l, ' 页，共 ', n, ' 页'],
                      }),
                      k.jsx('button', {
                        className: M.pageButton,
                        disabled: l === n,
                        onClick: () => s(l + 1),
                        children: '下一页',
                      }),
                    ],
                  }),
                }),
            ],
          })
  },
  Te = ({ className: e = '' }) => {
    var t, l
    const { state: s } = S(),
      [n, i] = a.useState([]),
      [o, r] = a.useState(!1),
      [d, c] = a.useState(0),
      [_, m] = a.useState(1),
      [u, p] = a.useState({
        timeRange: '30d',
        targetType: [],
        action: [],
        projectId: void 0,
      }),
      {
        createRequest: h,
        isRequestCancelled: v,
        cleanupRequest: g,
        isAbortError: x,
      } = $(),
      j = a.useMemo(() => {
        var e, t
        return (null == (e = s.config) ? void 0 : e.gitlabUrl) &&
          (null == (t = s.config) ? void 0 : t.gitlabToken)
          ? new Ne(s.config.gitlabUrl, s.config.gitlabToken)
          : null
      }, [
        null == (t = s.config) ? void 0 : t.gitlabUrl,
        null == (l = s.config) ? void 0 : l.gitlabToken,
      ]),
      b = a.useCallback(async () => {
        if (!u.projectId) return i([]), void c(0)
        if (!j) return console.error('GitLab 服务未初始化'), i([]), void c(0)
        const e = h()
        r(!0)
        try {
          await j.init()
          const t = {
              after:
                '7d' === u.timeRange
                  ? new Date(Date.now() - 6048e5).toISOString()
                  : '30d' === u.timeRange
                    ? new Date(Date.now() - 2592e6).toISOString()
                    : '90d' === u.timeRange
                      ? new Date(Date.now() - 7776e6).toISOString()
                      : '180d' === u.timeRange
                        ? new Date(Date.now() - 15552e6).toISOString()
                        : '365d' === u.timeRange
                          ? new Date(Date.now() - 31536e6).toISOString()
                          : void 0,
              before: void 0,
              sort: 'desc',
              page: _,
              per_page: 20,
              action: u.action.length > 0 ? u.action : void 0,
              target_type: u.targetType.length > 0 ? u.targetType : void 0,
              signal: e.signal,
            },
            a = await j.getProjectEventsWithTotal(u.projectId, t)
          if (v(e)) return
          i(a.events), c(a.total)
        } catch (t) {
          x(t) || console.error('获取项目事件失败:', t)
        } finally {
          v(e) || r(!1), g(e)
        }
      }, [j, u, _, h, v, x, g])
    a.useEffect(() => {
      b()
    }, [b])
    const f = a.useCallback(e => {
        p(e), m(1)
      }, []),
      N = a.useCallback(e => {
        m(e)
      }, [])
    return k.jsx('div', {
      className: `${M.changelogPanel} ${e}`,
      children: k.jsxs('div', {
        className: M.panelContent,
        children: [
          k.jsx(Ee, { filterConditions: u, onFilterChange: f }),
          k.jsx('div', {
            className: M.eventsSection,
            children: k.jsx(we, {
              events: n,
              loading: o,
              total: d,
              currentPage: _,
              onPageChange: N,
            }),
          }),
        ],
      }),
    })
  },
  Le = 'index-module__action-btn__To7Ms',
  Se = 'index-module__checking__QepNt',
  $e = 'index-module__version-btn__8d3di',
  Me = 'index-module__has-update__tNkZZ',
  De = 'index-module__icon__EhhVu',
  Ie = 'index-module__text__4iX-h',
  Ae = 'index-module__notification-overlay__E4dh-',
  Oe = 'index-module__notification__ckX1l',
  Pe = 'index-module__notification-header__nJZ3Q',
  Re = 'index-module__close-btn__9uULv',
  Ge = 'index-module__notification-body__nnab7',
  Ue = 'index-module__version-info__-pyIP',
  qe = 'index-module__release-notes__iU2jG',
  Be = 'index-module__notes-content__ZpxxA',
  Fe = 'index-module__notification-footer__La-ia',
  ze = 'index-module__later-btn__Q40Lc',
  He = 'index-module__update-btn__lD1V2',
  Xe = ({ currentVersion: e }) => {
    const [t, l] = a.useState(null),
      [s, n] = a.useState(!1),
      [i, o] = a.useState(!1),
      [r, d] = a.useState(!1),
      [c, m] = a.useState(null),
      [u, p] = a.useState(null),
      [h, v] = a.useState(!1),
      [g, x] = a.useState(new Set())
    a.useEffect(() => {
      try {
        const e = localStorage.getItem(
          'gitlab-weekly-report-dismissed-versions',
        )
        e && x(new Set(JSON.parse(e)))
      } catch (e) {
        console.warn('无法读取忽略版本信息:', e)
      }
    }, [])
    const j = a.useCallback((e, t) => {
        const a = e.split('.').map(Number),
          l = t.split('.').map(Number),
          s = Math.max(a.length, l.length)
        for (let n = 0; n < s; n++) {
          const e = a[n] || 0,
            t = l[n] || 0
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
              n(!0), p(null)
              try {
                const t = new AbortController(),
                  s = setTimeout(() => t.abort(), 1e4),
                  n = Date.now(),
                  i = 'undefined' != typeof GM_xmlhttpRequest,
                  r =
                    !1 && !i
                      ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                      : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                  c = await _(`${r}?t=${n}`, {
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
                l(p), m(new Date()), v(!0)
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
                n(!1)
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
        x(new Set())
        try {
          localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
        } catch (e) {
          console.warn('无法清除忽略版本信息:', e)
        }
      }, []),
      C = a.useCallback(() => {
        if ((d(!1), t)) {
          const a = new Set(g)
          a.add(t.version), x(a)
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
            className: `${Le} ${$e} ${s ? Se : ''} ${i ? Me : ''}`,
            onClick: () => b(!0),
            disabled: s,
            title: c
              ? `上次检查: ${y(c)}${u ? `\n错误: ${u}` : ''}`
              : '点击检查更新',
            children: [
              k.jsx('span', { className: De, children: w() }),
              k.jsx('span', { className: Ie, children: E() }),
            ],
          }),
          r &&
            i &&
            t &&
            k.jsx('div', {
              className: Ae,
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
                    className: Ge,
                    children: [
                      k.jsxs('div', {
                        className: Ue,
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
                          className: qe,
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
                    className: Fe,
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
  Ve = 'index-module__config-status__0q8ZM',
  Ze = 'index-module__clickable__pZ86X',
  Ke = 'index-module__status-indicator__MeBgW',
  Ye = 'index-module__status-icon__7jFiQ',
  Je = 'index-module__status-text__llRfw',
  Qe = 'index-module__progress-bar__CFedX',
  We = 'index-module__progress-fill__w-23-',
  et = 'index-module__valid__Xyroo',
  tt = 'index-module__invalid__Fn-hL',
  at = 'index-module__status-details__E1JnL',
  lt = 'index-module__missing-items__8Wn0w',
  st = [
    { key: 'gitlabUrl', label: 'GitLab', required: !0 },
    { key: 'gitlabToken', label: 'Token', required: !0 },
    { key: 'deepseekApiKey', label: 'API Key', required: !0 },
    { key: 'defaultPrompt', label: 'Prompt', required: !0 },
  ],
  nt = ({ config: e, className: t = '', showDetails: a = !1, onClick: l }) => {
    const s = (() => {
      const t = [],
        a = []
      return (
        st.forEach(l => {
          const s = e[l.key],
            n = 'string' == typeof s ? '' !== s.trim() : !!s
          l.required && (n ? a.push(l.label) : t.push(l.label))
        }),
        {
          isValid: 0 === t.length,
          missingItems: t,
          completedItems: a,
          completedCount: a.length,
          totalCount: st.filter(e => e.required).length,
          progress: (a.length / st.filter(e => e.required).length) * 100,
        }
      )
    })()
    return k.jsxs('div', {
      className: `${Ve} ${t} ${l ? Ze : ''}`,
      onClick: l,
      children: [
        k.jsxs('div', {
          className: `${Ke} ${s.isValid ? et : tt}`,
          children: [
            k.jsx('span', { className: Ye, children: s.isValid ? '✅' : '⚠️' }),
            k.jsx('span', {
              className: Je,
              children: s.isValid
                ? '就绪'
                : `${s.completedCount}/${s.totalCount}`,
            }),
            !s.isValid &&
              k.jsx('div', {
                className: Qe,
                children: k.jsx('div', {
                  className: We,
                  style: { width: `${s.progress}%` },
                }),
              }),
          ],
        }),
        a &&
          !s.isValid &&
          k.jsx('div', {
            className: at,
            children: k.jsx('div', {
              className: lt,
              children: s.missingItems.join(' · '),
            }),
          }),
      ],
    })
  },
  it = ({
    appMode: e,
    events: t,
    totalCount: a,
    loading: l,
    filterConditions: s,
    sortOptions: n,
    paginationOptions: i,
    selectedEventIds: o,
    onModeChange: r,
    onFilterChange: d,
    onSortChange: c,
    onPaginationChange: _,
    onEventSelect: m,
    onSelectAll: u,
    onEventDetail: h,
    onOpenSettings: v,
    onOpenAI: g,
  }) => {
    const { state: x } = S()
    return k.jsxs('div', {
      className: M.mainPanel,
      children: [
        k.jsxs('div', {
          className: M.panelHeader,
          children: [
            k.jsxs('div', {
              className: M.headerLeft,
              children: [
                k.jsx('h1', {
                  children:
                    'events' === e ? 'GitLab Events' : 'GitLab Changelog',
                }),
                k.jsx(nt, { config: x.config, onClick: v }),
              ],
            }),
            k.jsxs('div', {
              className: M.headerRight,
              children: [
                k.jsx(Xe, { currentVersion: p }),
                k.jsx('div', {
                  className: M.modeToggle,
                  children: k.jsxs('div', {
                    className: M.toggleTrack,
                    children: [
                      k.jsx('div', {
                        className: `${M.toggleSlider} ${'changelog' === e ? M.slideRight : ''}`,
                      }),
                      k.jsxs('button', {
                        className: `${M.toggleOption} ${'events' === e ? M.active : ''}`,
                        onClick: () => r('events'),
                        children: [
                          k.jsx('span', {
                            className: M.toggleIcon,
                            children: '📋',
                          }),
                          k.jsx('span', {
                            className: M.toggleLabel,
                            children: 'Events',
                          }),
                        ],
                      }),
                      k.jsxs('button', {
                        className: `${M.toggleOption} ${'changelog' === e ? M.active : ''}`,
                        onClick: () => r('changelog'),
                        children: [
                          k.jsx('span', {
                            className: M.toggleIcon,
                            children: '📝',
                          }),
                          k.jsx('span', {
                            className: M.toggleLabel,
                            children: 'Changelog',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                k.jsx('div', { className: M.divider }),
                k.jsxs('div', {
                  className: M.actionButtons,
                  children: [
                    k.jsxs('button', {
                      className: M.actionBtn,
                      onClick: v,
                      title: '设置',
                      children: [
                        k.jsx('span', {
                          className: M.btnIcon,
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
                        k.jsx('span', {
                          className: M.btnLabel,
                          children: '设置',
                        }),
                      ],
                    }),
                    k.jsxs('button', {
                      className: `${M.actionBtn} ${M.aiBtn}`,
                      onClick: g,
                      title: 'AI 周报',
                      children: [
                        k.jsx('span', {
                          className: M.btnIcon,
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
                          className: M.btnLabel,
                          children: 'AI 周报',
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
                  className: M.filterSection,
                  children: k.jsx(O, {
                    filterConditions: s,
                    onFilterChange: d,
                  }),
                }),
                k.jsx('div', {
                  className: M.eventsSection,
                  children: k.jsx(fe, {
                    events: t,
                    totalCount: a,
                    loading: l,
                    sortOptions: n,
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
          : k.jsx(Te, {}),
      ],
    })
  },
  ot = 'index-module__modal-mask__XYxyO',
  rt = 'index-module__modal-wrapper__bVZip',
  dt = 'index-module__modal__QQS3u',
  ct = 'index-module__modal-header__GdUjX',
  _t = 'index-module__modal-title__cafB-',
  mt = 'index-module__modal-close__ZuUgf',
  ut = 'index-module__modal-body__j5X3U',
  pt = 'index-module__modal-footer__3q-wn',
  ht = ({
    visible: e,
    title: t,
    width: l = 520,
    maxHeight: s = window.innerHeight - 180,
    children: n,
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
      className: ot,
      onClick: e => {
        e.target === e.currentTarget && r && o()
      },
      children: k.jsx('div', {
        className: rt,
        children: k.jsxs('div', {
          className: dt,
          style: { width: l, maxHeight: s },
          children: [
            k.jsxs('div', {
              className: ct,
              children: [
                k.jsx('div', { className: _t, children: t }),
                k.jsx('button', {
                  className: mt,
                  onClick: o,
                  children: k.jsx('span', { children: '×' }),
                }),
              ],
            }),
            k.jsx('div', { className: ut, children: n }),
            i && k.jsx('div', { className: pt, children: i }),
          ],
        }),
      }),
    })
  },
  vt = 'index-module__settings-panel__UCg3H',
  gt = 'index-module__config-overview__kaSMo',
  xt = 'index-module__settings-tabs__vPH-t',
  jt = 'index-module__tab-button__FG9Nc',
  bt = 'index-module__tab-icon__rBe-o',
  ft = 'index-module__active__bsBC1',
  Nt = 'index-module__settings-content__TqQPH',
  Ct = 'index-module__tab-panel__Q2QUI',
  yt = 'index-module__form-group__zKwiA',
  kt = 'index-module__form-label__pwe7O',
  Et = 'index-module__required__2vuyW',
  wt = 'index-module__form-input__jGbRP',
  Tt = 'index-module__form-select__jbXdq',
  Lt = 'index-module__form-textarea__fAVMw',
  St = 'index-module__form-hint__F0dFQ',
  $t = 'index-module__version-info__y0NZv',
  Mt = 'index-module__version-text__bx0HU',
  Dt = 'index-module__settings-footer__qA44X',
  It = 'index-module__footer-right__bslDg',
  At = 'index-module__btn-primary__ZzzFI',
  Ot = 'index-module__switch-container__5xk1J',
  Pt = 'index-module__switch-input__V-8fl',
  Rt = 'index-module__switch-label__xrOeQ',
  Gt = 'index-module__switch-slider__dG-6J',
  Ut = 'index-module__btn-secondary__cRCpD',
  qt = ({ isOpen: e, onClose: t, config: l, onSave: s, theme: n }) => {
    const [i, o] = a.useState(l),
      [r, d] = a.useState(n),
      [c, _] = a.useState('gitlab')
    a.useEffect(() => {
      o(l)
    }, [l]),
      a.useEffect(() => {
        d(n)
      }, [n]),
      a.useEffect(() => {
        e && (o(l), d(n))
      }, [e, l, n])
    const m = (e, t) => {
      o(a => ({ ...a, [e]: t }))
    }
    return k.jsx(ht, {
      visible: e,
      title: '系统设置',
      width: 600,
      onClose: t,
      footer: k.jsxs('div', {
        className: Dt,
        children: [
          k.jsx('button', {
            className: Ut,
            onClick: () => {
              o(l), d(n)
            },
            children: '重置',
          }),
          k.jsxs('div', {
            className: It,
            children: [
              k.jsx('button', { className: Ut, onClick: t, children: '取消' }),
              k.jsx('button', {
                className: At,
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
        className: vt,
        children: [
          k.jsx('div', {
            className: gt,
            children: k.jsx(nt, { config: i, showDetails: !0 }),
          }),
          k.jsxs('div', {
            className: xt,
            children: [
              k.jsxs('button', {
                className: `${jt} ${'gitlab' === c ? ft : ''}`,
                onClick: () => _('gitlab'),
                children: [
                  k.jsx('span', { className: bt, children: '🦊' }),
                  'GitLab 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${jt} ${'deepseek' === c ? ft : ''}`,
                onClick: () => _('deepseek'),
                children: [
                  k.jsx('span', { className: bt, children: '🤖' }),
                  'DeepSeek 配置',
                ],
              }),
              k.jsxs('button', {
                className: `${jt} ${'appearance' === c ? ft : ''}`,
                onClick: () => _('appearance'),
                children: [
                  k.jsx('span', { className: bt, children: '🎨' }),
                  '外观设置',
                ],
              }),
            ],
          }),
          k.jsxs('div', {
            className: Nt,
            children: [
              'gitlab' === c &&
                k.jsxs('div', {
                  className: Ct,
                  children: [
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsxs('label', {
                          className: kt,
                          children: [
                            'GitLab 项目地址 ',
                            k.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.gitlabUrl,
                          value: i.gitlabUrl,
                          onChange: e => m('gitlabUrl', e.target.value),
                        }),
                        k.jsx('div', {
                          className: St,
                          children: '请输入完整的 GitLab 项目 URL',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsxs('label', {
                          className: kt,
                          children: [
                            '个人访问令牌 ',
                            k.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.gitlabToken,
                          value: i.gitlabToken,
                          onChange: e => m('gitlabToken', e.target.value),
                        }),
                        k.jsx('div', {
                          className: St,
                          children:
                            '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                        }),
                      ],
                    }),
                  ],
                }),
              'deepseek' === c &&
                k.jsxs('div', {
                  className: Ct,
                  children: [
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsxs('label', {
                          className: kt,
                          children: [
                            'DeepSeek API Key ',
                            k.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        k.jsx('input', {
                          type: 'text',
                          className: wt,
                          placeholder: h.deepseekApiKey,
                          value: i.deepseekApiKey,
                          onChange: e => m('deepseekApiKey', e.target.value),
                        }),
                        k.jsx('div', {
                          className: St,
                          children: '在 DeepSeek 平台获取 API Key',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsx('label', {
                          className: kt,
                          children: '使用的模型',
                        }),
                        k.jsxs('select', {
                          className: Tt,
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
                      className: yt,
                      children: [
                        k.jsx('label', {
                          className: kt,
                          children: 'Token 数量限制',
                        }),
                        k.jsx('input', {
                          type: 'number',
                          className: wt,
                          min: '1000',
                          max: '10000',
                          placeholder: '4000',
                          value: i.tokenLimit,
                          onChange: e =>
                            m('tokenLimit', parseInt(e.target.value)),
                        }),
                        k.jsx('div', {
                          className: St,
                          children: '单次生成的最大 Token 数量（1000-10000）',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsxs('label', {
                          className: kt,
                          children: [
                            '默认提示词 ',
                            k.jsx('span', { className: Et, children: '*' }),
                          ],
                        }),
                        k.jsx('textarea', {
                          className: Lt,
                          rows: 6,
                          placeholder: h.defaultPrompt,
                          value: i.defaultPrompt,
                          onChange: e => m('defaultPrompt', e.target.value),
                        }),
                        k.jsx('div', {
                          className: St,
                          children: '用于生成周报的默认提示词模板',
                        }),
                      ],
                    }),
                  ],
                }),
              'appearance' === c &&
                k.jsxs('div', {
                  className: Ct,
                  children: [
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsx('label', { className: kt, children: '主题模式' }),
                        k.jsxs('select', {
                          className: Tt,
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
                          className: St,
                          children:
                            '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsx('label', {
                          className: kt,
                          children: '自动检查更新',
                        }),
                        k.jsxs('div', {
                          className: Ot,
                          children: [
                            k.jsx('input', {
                              type: 'checkbox',
                              id: 'autoCheckUpdate',
                              className: Pt,
                              checked: i.autoCheckUpdate ?? !0,
                              onChange: e =>
                                m('autoCheckUpdate', e.target.checked),
                            }),
                            k.jsx('label', {
                              htmlFor: 'autoCheckUpdate',
                              className: Rt,
                              children: k.jsx('span', { className: Gt }),
                            }),
                          ],
                        }),
                        k.jsx('div', {
                          className: St,
                          children: '开启后将自动检查版本更新并提醒',
                        }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: yt,
                      children: [
                        k.jsx('label', {
                          className: kt,
                          children: '检查更新间隔',
                        }),
                        k.jsxs('select', {
                          className: Tt,
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
                          className: St,
                          children: '设置自动检查版本更新的时间间隔',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          k.jsx('div', {
            className: $t,
            children: k.jsxs('span', { className: Mt, children: ['v', p] }),
          }),
        ],
      }),
    })
  },
  Bt = 'index-module__ai-panel__R0K19',
  Ft = 'index-module__data-overview__J-ZoM',
  zt = 'index-module__overview-header__ae0e8',
  Ht = 'index-module__overview-content__dhjh6',
  Xt = 'index-module__overview-item__20Ilu',
  Vt = 'index-module__overview-label__k3QHX',
  Zt = 'index-module__overview-value__gbEnJ',
  Kt = 'index-module__ready__f4MXX',
  Yt = 'index-module__waiting__orgl9',
  Jt = 'index-module__result-section__esrDe',
  Qt = 'index-module__result-header__-sHRM',
  Wt = 'index-module__result-title__GYp3Q',
  ea = 'index-module__title-icon__w1Z58',
  ta = 'index-module__result-actions__Lwz6b',
  aa = 'index-module__action-btn__X81KS',
  la = 'index-module__btn-icon__bBkUh',
  sa = 'index-module__result-content__NBmXz',
  na = 'index-module__result-text__WX-aI',
  ia = 'index-module__result-meta__zAR0J',
  oa = 'index-module__meta-left__G7E6i',
  ra = 'index-module__meta-item__Mikx5',
  da = 'index-module__prompt-section__Y1L-1',
  ca = 'index-module__section-header__WEXG-',
  _a = 'index-module__header-actions__phC5-',
  ma = 'index-module__prompt-editor__N6csy',
  ua = 'index-module__prompt-textarea__ZeYSC',
  pa = 'index-module__prompt-footer__NhJb8',
  ha = 'index-module__char-count__qSePr',
  va = 'index-module__expanded__VY5Zd',
  ga = 'index-module__loading-section__qmhp-',
  xa = 'index-module__loading-spinner__FhbKe',
  ja = 'index-module__loading-tips__TN0F6',
  ba = 'index-module__empty-result__D1DxK',
  fa = 'index-module__empty-icon__RFmRa',
  Na = 'index-module__empty-features__Y-XeR',
  Ca = 'index-module__feature-item__zmC1K',
  ya = 'index-module__feature-icon__aCith',
  ka = 'index-module__btn-primary__NTwQw',
  Ea = 'index-module__regenerate__MPpEF',
  wa = 'index-module__btn-text__f3PZM',
  Ta = ({
    visible: e,
    config: t,
    defaultPrompt: l,
    onClose: s,
    onGenerate: n,
    isLoading: i,
    selectedEventsCount: o = 0,
    dateRange: r,
  }) => {
    const [d, c] = a.useState(l),
      [_, m] = a.useState(!1)
    a.useEffect(() => {
      c(l)
    }, [l])
    return k.jsx(ht, {
      visible: e,
      title: 'AI 周报生成',
      width: 800,
      onClose: s,
      maskClosable: !i,
      children: k.jsxs('div', {
        className: Bt,
        children: [
          k.jsxs('div', {
            className: Ft,
            children: [
              k.jsx('div', {
                className: zt,
                children: k.jsx('h4', { children: '📊 数据概览' }),
              }),
              k.jsxs('div', {
                className: Ht,
                children: [
                  k.jsxs('div', {
                    className: Xt,
                    children: [
                      k.jsx('span', { className: Vt, children: '选中事件：' }),
                      k.jsxs('span', { className: Zt, children: [o, ' 条'] }),
                    ],
                  }),
                  r &&
                    k.jsxs('div', {
                      className: Xt,
                      children: [
                        k.jsx('span', {
                          className: Vt,
                          children: '日期范围：',
                        }),
                        k.jsxs('span', {
                          className: Zt,
                          children: [r.startDate, ' 至 ', r.endDate],
                        }),
                      ],
                    }),
                  k.jsxs('div', {
                    className: Xt,
                    children: [
                      k.jsx('span', { className: Vt, children: '状态：' }),
                      k.jsx('span', {
                        className: `${Zt} ${o > 0 ? Kt : Yt}`,
                        children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          k.jsxs('div', {
            className: da,
            children: [
              k.jsxs('div', {
                className: ca,
                children: [
                  k.jsx('h3', { children: '提示词' }),
                  k.jsxs('div', {
                    className: _a,
                    children: [
                      k.jsx('button', {
                        className: wa,
                        onClick: () => m(!_),
                        children: _ ? '收起' : '展开',
                      }),
                      k.jsx('button', {
                        className: wa,
                        onClick: () => {
                          c(l)
                        },
                        children: '重置',
                      }),
                    ],
                  }),
                ],
              }),
              k.jsxs('div', {
                className: `${ma} ${_ ? va : ''}`,
                children: [
                  k.jsx('textarea', {
                    className: ua,
                    value: d,
                    onChange: e => c(e.target.value),
                    placeholder: '请输入用于生成周报的提示词...',
                    rows: _ ? 15 : 6,
                    disabled: i,
                  }),
                  k.jsxs('div', {
                    className: pa,
                    children: [
                      k.jsxs('span', {
                        className: ha,
                        children: [d.length, ' 字符'],
                      }),
                      k.jsx('button', {
                        className: `${ka} ${(null == t ? void 0 : t.result) ? Ea : ''}`,
                        onClick: () => {
                          n(d)
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
              className: ga,
              children: [
                k.jsx('div', { className: xa }),
                k.jsx('p', { children: 'AI 正在分析事件数据，生成周报中...' }),
                k.jsx('div', {
                  className: ja,
                  children: k.jsx('span', {
                    children: '💡 生成时间通常为 10-30 秒',
                  }),
                }),
              ],
            }),
          (null == t ? void 0 : t.result) &&
            k.jsxs('div', {
              className: Jt,
              children: [
                k.jsxs('div', {
                  className: Qt,
                  children: [
                    k.jsxs('h3', {
                      className: Wt,
                      children: [
                        k.jsx('span', { className: ea, children: '✨' }),
                        '生成结果',
                      ],
                    }),
                    k.jsx('div', {
                      className: ta,
                      children: k.jsxs('button', {
                        className: aa,
                        onClick: () => {
                          ;(null == t ? void 0 : t.result) &&
                            navigator.clipboard.writeText(t.result)
                        },
                        title: '一键复制',
                        children: [
                          k.jsx('span', { className: la, children: '📋' }),
                          '复制',
                        ],
                      }),
                    }),
                  ],
                }),
                k.jsx('div', {
                  className: sa,
                  children: k.jsx('div', { className: na, children: t.result }),
                }),
                k.jsx('div', {
                  className: ia,
                  children: k.jsxs('div', {
                    className: oa,
                    children: [
                      k.jsx('div', {
                        className: ra,
                        children: k.jsxs('span', {
                          children: [t.result.split('\n').length, ' 行'],
                        }),
                      }),
                      k.jsx('div', {
                        className: ra,
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
              className: ba,
              children: [
                k.jsx('div', { className: fa, children: '🤖' }),
                k.jsx('h3', { children: '准备生成 AI 周报' }),
                k.jsx('p', {
                  children:
                    '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                }),
                k.jsxs('div', {
                  className: Na,
                  children: [
                    k.jsxs('div', {
                      className: Ca,
                      children: [
                        k.jsx('span', { className: ya, children: '📊' }),
                        k.jsx('span', { children: '智能分析工作数据' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Ca,
                      children: [
                        k.jsx('span', { className: ya, children: '📝' }),
                        k.jsx('span', { children: '自动生成周报内容' }),
                      ],
                    }),
                    k.jsxs('div', {
                      className: Ca,
                      children: [
                        k.jsx('span', { className: ya, children: '🎯' }),
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
  La = {
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
  Sa = ({ event: e, visible: t, onClose: a }) => {
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
      s = () => {
        var t, a
        if (!e.project && !e.project_id) return ''
        const l = 'https://www.lejuhub.com'
        if (!e.project) return l
        const s = e.project.path_with_namespace
        if (!e.target_type || '' === e.target_type.trim()) return `${l}/${s}`
        switch (e.target_type) {
          case 'MergeRequest':
            return `${l}/${s}/-/merge_requests/${e.target_iid}`
          case 'Issue':
            return `${l}/${s}/-/issues/${e.target_iid}`
          case 'Note':
            return 'Issue' === (null == (t = e.note) ? void 0 : t.noteable_type)
              ? `${l}/${s}/-/issues/${e.note.noteable_iid}`
              : 'MergeRequest' ===
                  (null == (a = e.note) ? void 0 : a.noteable_type)
                ? `${l}/${s}/-/merge_requests/${e.note.noteable_iid}`
                : `${l}/${s}`
          default:
            return `${l}/${s}`
        }
      }
    return k.jsx('div', {
      className: La.eventDetailModalOverlay,
      onClick: a,
      children: k.jsxs('div', {
        className: La.eventDetailModal,
        onClick: e => e.stopPropagation(),
        children: [
          k.jsxs('div', {
            className: La.modalHeader,
            children: [
              k.jsx('h2', { children: '事件详情' }),
              k.jsx('button', {
                className: La.closeBtn,
                onClick: a,
                children: '×',
              }),
            ],
          }),
          k.jsxs('div', {
            className: La.modalContent,
            children: [
              k.jsxs('div', {
                className: `${La.detailSection} ${La.compact}`,
                children: [
                  k.jsx('h3', { children: '基本信息' }),
                  k.jsxs('div', {
                    className: `${La.detailGrid} ${La.compactGrid}`,
                    children: [
                      k.jsxs('div', {
                        className: La.detailItem,
                        children: [
                          k.jsx('span', {
                            className: La.label,
                            children: 'ID:',
                          }),
                          k.jsx('span', {
                            className: La.value,
                            children: e.id,
                          }),
                        ],
                      }),
                      k.jsxs('div', {
                        className: La.detailItem,
                        children: [
                          k.jsx('span', {
                            className: La.label,
                            children: '类型:',
                          }),
                          k.jsx('span', {
                            className: La.value,
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
                        className: La.detailItem,
                        children: [
                          k.jsx('span', {
                            className: La.label,
                            children: '操作:',
                          }),
                          k.jsx('span', {
                            className: `${La.value} ${La.actionBadge}`,
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
                      k.jsxs('div', {
                        className: La.detailItem,
                        children: [
                          k.jsx('span', {
                            className: La.label,
                            children: '时间:',
                          }),
                          k.jsx('span', {
                            className: La.value,
                            children: l(e.created_at),
                          }),
                        ],
                      }),
                      e.state &&
                        k.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            k.jsx('span', {
                              className: La.label,
                              children: '状态:',
                            }),
                            k.jsx('span', {
                              className: `${La.value} ${La.statusBadge} ${La[`status-${e.state}`]}`,
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
                  className: `${La.detailSection} ${La.compact}`,
                  children: [
                    k.jsx('h3', { children: '内容' }),
                    k.jsxs('div', {
                      className: `${La.detailContent} ${La.compactContent}`,
                      children: [
                        e.title &&
                          k.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              k.jsx('span', {
                                className: La.label,
                                children: '标题:',
                              }),
                              k.jsx('span', {
                                className: La.value,
                                children: e.title,
                              }),
                            ],
                          }),
                        e.target_title &&
                          k.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              k.jsx('span', {
                                className: La.label,
                                children: '目标:',
                              }),
                              k.jsx('span', {
                                className: La.value,
                                children: e.target_title,
                              }),
                            ],
                          }),
                        e.labels &&
                          e.labels.length > 0 &&
                          k.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              k.jsx('span', {
                                className: La.label,
                                children: '标签:',
                              }),
                              k.jsx('div', {
                                className: La.labels,
                                children: e.labels.map((e, t) =>
                                  k.jsx(
                                    'span',
                                    { className: La.labelTag, children: e },
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
                  className: `${La.detailSection} ${La.compact}`,
                  children: [
                    k.jsx('h3', { children: '作者' }),
                    k.jsxs('div', {
                      className: `${La.authorInfo} ${La.compactAuthor}`,
                      children: [
                        e.author.avatar_url &&
                          k.jsx('img', {
                            src: `${e.author.avatar_url}?width=100`,
                            alt: e.author.name,
                            className: La.authorAvatar,
                          }),
                        k.jsxs('div', {
                          className: La.authorDetails,
                          children: [
                            k.jsx('div', {
                              className: La.authorName,
                              children: e.author.name,
                            }),
                            k.jsxs('div', {
                              className: La.authorUsername,
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
                  className: `${La.detailSection} ${La.compact}`,
                  children: [
                    k.jsx('h3', { children: '项目' }),
                    k.jsx('div', {
                      className: `${La.projectInfo} ${La.compactProject}`,
                      children: e.project
                        ? k.jsxs(k.Fragment, {
                            children: [
                              k.jsxs('div', {
                                className: La.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: La.label,
                                    children: '名称:',
                                  }),
                                  k.jsx('span', {
                                    className: La.value,
                                    children: e.project.name,
                                  }),
                                ],
                              }),
                              k.jsxs('div', {
                                className: La.detailItem,
                                children: [
                                  k.jsx('span', {
                                    className: La.label,
                                    children: '路径:',
                                  }),
                                  k.jsx('span', {
                                    className: La.value,
                                    children: e.project.path_with_namespace,
                                  }),
                                ],
                              }),
                            ],
                          })
                        : k.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              k.jsx('span', {
                                className: La.label,
                                children: '项目ID:',
                              }),
                              k.jsx('span', {
                                className: La.value,
                                children: e.project_id,
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              e.push_data &&
                k.jsxs('div', {
                  className: La.detailSection,
                  children: [
                    k.jsx('h3', { children: '推送信息' }),
                    k.jsxs('div', {
                      className: La.pushInfo,
                      children: [
                        k.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            k.jsx('span', {
                              className: La.label,
                              children: '分支:',
                            }),
                            k.jsx('span', {
                              className: La.value,
                              children: e.push_data.ref,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            k.jsx('span', {
                              className: La.label,
                              children: '提交数量:',
                            }),
                            k.jsx('span', {
                              className: La.value,
                              children: e.push_data.commit_count,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            k.jsx('span', {
                              className: La.label,
                              children: '提交标题:',
                            }),
                            k.jsx('span', {
                              className: La.value,
                              children: e.push_data.commit_title,
                            }),
                          ],
                        }),
                        k.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            k.jsx('span', {
                              className: La.label,
                              children: '提交哈希:',
                            }),
                            k.jsx('span', {
                              className: `${La.value} ${La.commitHash}`,
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
                  className: La.detailSection,
                  children: [
                    k.jsx('h3', { children: '评论信息' }),
                    k.jsxs('div', {
                      className: La.noteInfo,
                      children: [
                        k.jsx('div', {
                          className: La.noteBody,
                          children: e.note.body,
                        }),
                        k.jsxs('div', {
                          className: La.noteMeta,
                          children: [
                            k.jsxs('span', {
                              children: ['创建时间: ', l(e.note.created_at)],
                            }),
                            e.note.updated_at !== e.note.created_at &&
                              k.jsxs('span', {
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
          k.jsxs('div', {
            className: La.modalFooter,
            children: [
              s() &&
                k.jsx('a', {
                  href: s(),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: La.sourceLinkBtn,
                  children: '打开源页面',
                }),
              k.jsx('button', {
                className: La.closeModalBtn,
                onClick: a,
                children: '关闭',
              }),
            ],
          }),
        ],
      }),
    })
    var n
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
  Ma = ({ isUserscript: e = !1 }) => {
    const {
        state: t,
        updateConfig: l,
        setTheme: s,
        setActivePanel: n,
        setAppMode: i,
        setProjects: o,
        updateFilterConditions: r,
        updateSortOptions: d,
        updatePaginationOptions: _,
        setEvents: u,
        setTotal: p,
        setAIGenerationConfig: h,
        setLoading: v,
        setError: g,
        isConfigValid: x,
        getTimeRange: j,
      } = S(),
      {
        createRequest: b,
        isRequestCancelled: f,
        cleanupRequest: N,
        isAbortError: C,
      } = $(),
      y = a.useMemo(() => {
        return (
          (e = t.config.gitlabUrl), (a = t.config.gitlabToken), new Ne(e, a)
        )
        var e, a
      }, [t.config.gitlabUrl, t.config.gitlabToken]),
      [E, w] = a.useState(null),
      [L, M] = a.useState(!1),
      [D, I] = a.useState([]),
      A = a.useMemo(
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
        var a, l
        if (!x()) return void g(c.INVALID_FILTER_OR_CONFIG)
        const s = b()
        v(!0), g(null)
        try {
          await y.init()
          const { startDate: n, endDate: i } = j(),
            o = e || t.filterConditions,
            r =
              (null == (a = o.targetType) ? void 0 : a.length) > 0
                ? o.targetType
                : void 0,
            d =
              (null == (l = o.action) ? void 0 : l.length) > 0
                ? o.action
                : void 0,
            c = t.sortOptions.order || 'desc',
            _ = await y.getCurrentUser(),
            m = {
              after: n,
              before: i,
              target_type: r,
              action: d,
              page: t.paginationOptions.page,
              per_page: t.paginationOptions.pageSize,
              sort: c,
              signal: s.signal,
            },
            { events: h, total: v } = await y.getUserEventsWithTotal(_.id, m)
          if (f(s)) return
          u(h), I(h.map(e => e.id)), p(v)
        } catch (n) {
          if (C(n)) return
          const e = m.formatErrorMessage(n)
          g(e), u([]), p(0)
        } finally {
          f(s) || v(!1), N(s)
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
        v,
        g,
        x,
        y,
        b,
        f,
        C,
        N,
      ],
    )
    a.useEffect(() => {
      x() && O()
    }, [x, O])
    const P = a.useCallback(async () => {
      if (x()) {
        v(!0), g(null)
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
          v(!1)
        }
      } else g(c.INVALID_FILTER_OR_CONFIG)
    }, [y, x, o, v, g])
    return k.jsxs('div', {
      id: 'gitlab-weekly-report-app',
      className: `${$a.app} ${e ? $a.userscriptMode : $a.webMode} ${$a[A]}`,
      children: [
        k.jsx(it, {
          appMode: t.appMode,
          events: t.events,
          totalCount: t.totalCount,
          loading: t.isLoading,
          filterConditions: t.filterConditions,
          sortOptions: t.sortOptions,
          paginationOptions: t.paginationOptions,
          selectedEventIds: D,
          onModeChange: async e => {
            i(e), 'changelog' === e ? await P() : x() && O()
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
            I(a => (t ? [...a, e] : a.filter(t => t !== e)))
          },
          onSelectAll: e => {
            I(e ? t.events.map(e => e.id) : [])
          },
          onEventDetail: e => {
            w(e), M(!0)
          },
          onOpenSettings: () => {
            n('settings')
          },
          onOpenAI: () => {
            x() ? n('ai') : g(c.INCOMPLETE_GITLAB_DEEPSEEK)
          },
        }),
        k.jsx(Sa, {
          event: E,
          visible: L,
          onClose: () => {
            M(!1), w(null)
          },
        }),
        k.jsx(qt, {
          isOpen: 'settings' === t.activePanel,
          config: t.config,
          theme: t.theme,
          onClose: () => {
            n('main')
          },
          onSave: (e, t) => {
            l(e), s(t)
          },
        }),
        k.jsx(Ta, {
          visible: 'ai' === t.activePanel,
          config: t.aiGenerationConfig,
          defaultPrompt: t.config.defaultPrompt,
          onClose: () => {
            n('main')
          },
          onGenerate: async e => {
            if (x())
              if (0 !== D.length) {
                v(!0), g(null)
                try {
                  const a = t.events
                      .filter(e => D.includes(e.id))
                      .map(e => {
                        var t
                        return `${new Date(e.created_at).toLocaleDateString('zh-CN')} - ${e.action_name}: ${e.target_title || (null == (t = e.push_data) ? void 0 : t.commit_title) || '无标题'}`
                      })
                      .join('\n'),
                    { createDeepSeekApiService: l } = await (function (e, t) {
                      let a = Promise.resolve()
                      if (t && t.length > 0) {
                        document.getElementsByTagName('link')
                        const e = document.querySelector(
                            'meta[property=csp-nonce]',
                          ),
                          l =
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
                            const s = document.createElement('link')
                            return (
                              (s.rel = t ? 'stylesheet' : 'modulepreload'),
                              t || (s.as = 'script'),
                              (s.crossOrigin = ''),
                              (s.href = e),
                              l && s.setAttribute('nonce', l),
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
                      function l(e) {
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
                          'rejected' === e.status && l(e.reason)
                        return e().catch(l)
                      })
                    })(
                      async () => {
                        const { createDeepSeekApiService: e } = await import(
                          './deepseek-api-CnucE9Cl.js'
                        )
                        return { createDeepSeekApiService: e }
                      },
                      __vite__mapDeps([0, 1]),
                    ),
                    s = l(t.config.deepseekApiKey),
                    n = await s.generateWeeklyReport(
                      a,
                      e,
                      t.config.model,
                      t.config.tokenLimit,
                    )
                  h({ prompt: e, tokensUsed: n.tokensUsed, result: n.content }),
                    v(!1)
                } catch (a) {
                  const e = m.formatErrorMessage(a)
                  g(e), v(!1)
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
  k.jsx(s.StrictMode, { children: k.jsx(Ma, {}) }),
)
