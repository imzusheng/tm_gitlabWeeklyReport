// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/imzusheng/tm_gitlabWeeklyReport
// @version      1.10.7
// @description  基于 DeepSeek AI 的 GitLab 工作周报自动生成工具
// @author       lizusheng
// @match        *://www.lejuhub.com/dashboard/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @updateURL    https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// @downloadURL  https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// ==/UserScript==

!(function () {
  'use strict'
  const e = 'gitlab-weekly-report-container',
    n = { ID: 'gitlab-weekly-report-trigger', ICON: '📊' },
    t = 'gitlab-weekly-report-overlay',
    o = 'https://your-deployed-domain.com'
  let s = null,
    l = null
  const i = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    a = () => {
      if (document.getElementById(e)) return
      const a = (() => {
          const e = document.createElement('div')
          return (
            (e.id = n.ID),
            (e.innerHTML = n.ICON),
            (e.style.cssText =
              "\n    position: fixed;\n    bottom: 110px;\n    right: 50px;\n    width: 50px;\n    height: 50px;\n    background: #1976d2;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    z-index: 999998;\n    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);\n    font-size: 20px;\n    transition: all 0.3s ease;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n  "),
            e
          )
        })(),
        d = (() => {
          const e = document.createElement('div')
          return (
            (e.id = t),
            (e.style.cssText =
              '\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 999997;\n    display: none;\n  '),
            e
          )
        })()
      ;(l = (() => {
        const n = document.createElement('div')
        return (
          (n.id = e),
          (n.style.cssText =
            "\n    position: fixed;\n    top: 60px;\n    left: 60px;\n    right: 60px;\n    bottom: 60px;\n    z-index: 999999;\n    border-radius: 12px;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n    display: none;\n    overflow: hidden;\n    background: transparent;\n  "),
          n
        )
      })()),
        (s = (() => {
          const e = document.createElement('iframe')
          ;(e.style.cssText =
            '\n    width: 100%;\n    height: 100%;\n    border: none;\n    border-radius: 12px;\n    background: transparent;\n  '),
            (e.sandbox =
              'allow-same-origin allow-scripts allow-forms allow-popups'),
            (e.allow = 'fullscreen')
          const n = `${o}?mode=iframe&theme=${i()}`
          return (e.src = n), e
        })())
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          var e
          if (s) {
            const n = i()
            null == (e = s.contentWindow) ||
              e.postMessage({ type: 'theme-change', theme: n }, '*')
          }
        })
      const r = () => {
        var e, n
        'none' !== l.style.display
          ? ((l.style.display = 'none'),
            (d.style.display = 'none'),
            (a.style.transform = 'scale(1)'),
            null == (e = null == s ? void 0 : s.contentWindow) ||
              e.postMessage({ type: 'visibility-change', visible: !1 }, '*'))
          : ((l.style.display = 'block'),
            (d.style.display = 'block'),
            (a.style.transform = 'scale(0.9)'),
            null == (n = null == s ? void 0 : s.contentWindow) ||
              n.postMessage({ type: 'visibility-change', visible: !0 }, '*'))
      }
      window.addEventListener('message', e => {
        var n
        if (e.origin !== new URL(o).origin) return
        const { type: t } = e.data
        switch (t) {
          case 'close-panel':
            r()
            break
          case 'ready':
            null == (n = null == s ? void 0 : s.contentWindow) ||
              n.postMessage({ type: 'theme-change', theme: i() }, '*')
        }
      }),
        a.addEventListener('mouseenter', () => {
          'none' === l.style.display &&
            ((a.style.transform = 'scale(1.1)'),
            (a.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)'))
        }),
        a.addEventListener('mouseleave', () => {
          'none' === l.style.display &&
            ((a.style.transform = 'scale(1)'),
            (a.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'))
        }),
        a.addEventListener('click', r),
        d.addEventListener('click', r),
        document.body.appendChild(a),
        document.body.appendChild(d),
        document.body.appendChild(l),
        l.appendChild(s)
    },
    d = () => {
      ;(window.location.hostname.includes('gitlab') ||
        window.location.pathname.includes('gitlab') ||
        null !== document.querySelector('meta[content*="GitLab"]') ||
        null !== document.querySelector('[data-page*="gitlab"]')) &&
        ('loading' === document.readyState
          ? document.addEventListener('DOMContentLoaded', a)
          : a())
    }
  d()
  let r = location.href,
    c = new MutationObserver(() => {
      const o = location.href
      o !== r &&
        ((r = o),
        (() => {
          const o = document.getElementById(n.ID),
            i = document.getElementById(t),
            a = document.getElementById(e)
          o && o.remove(),
            i && i.remove(),
            a && a.remove(),
            (l = null),
            (s = null),
            c && (c.disconnect(), (c = null))
        })(),
        setTimeout(d, 1e3))
    })
  c.observe(document, { subtree: !0, childList: !0 })
})()
