// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/your-username/gitlab-weekly-report
// @version      1.0.0
// @description  基于 DeepSeek AI 的 GitLab 工作周报自动生成工具
// @author       Your Name
// @match        *://*/*gitlab*/*
// @match        *://gitlab.*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/react@18/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
// @updateURL    https://github.com/your-username/gitlab-weekly-report/raw/main/dist/gitlab-weekly-report.user.js
// @downloadURL  https://github.com/your-username/gitlab-weekly-report/raw/main/dist/gitlab-weekly-report.user.js
// ==/UserScript==

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.less'

// 等待页面加载完成后注入应用
function initUserscript() {
  // 检查是否已经注入过
  if (document.getElementById('gitlab-weekly-report-container')) {
    return
  }

  // 创建应用容器
  const container = document.createElement('div')
  container.id = 'gitlab-weekly-report-container'
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 300px;
    max-width: 400px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `
  
  document.body.appendChild(container)
  
  // 渲染React应用
  const root = ReactDOM.createRoot(container)
  root.render(
    React.createElement(App, { isUserscript: true })
  )
}

// 检查是否在GitLab页面
function isGitLabPage(): boolean {
  return (
    window.location.hostname.includes('gitlab') || 
    window.location.pathname.includes('gitlab') ||
    document.querySelector('meta[content*="GitLab"]') !== null ||
    document.querySelector('[data-page*="gitlab"]') !== null
  )
}

// 初始化函数
function init() {
  if (!isGitLabPage()) {
    console.log('GitLab 周报生成器: 当前页面不是GitLab页面，跳过注入')
    return
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserscript)
  } else {
    initUserscript()
  }
}

// 启动脚本
init()

// 监听页面变化（SPA路由变化）
let lastUrl = location.href
new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    setTimeout(init, 1000) // 延迟1秒等待页面加载
  }
}).observe(document, { subtree: true, childList: true }) 