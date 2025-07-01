import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import type { Root } from 'react-dom/client'
import './index.less'

// 等待页面加载完成后注入应用
const initUserscript = () => {
  // 检查是否已经注入过
  if (document.getElementById('gitlab-weekly-report-userscript-container')) {
    return
  }

  // 创建触发按钮
  const triggerButton = document.createElement('div')
  triggerButton.id = 'gitlab-weekly-report-trigger'
  triggerButton.innerHTML = '📊'
  triggerButton.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 50px;
    width: 50px;
    height: 50px;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999998;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    font-size: 20px;
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `

  // 创建应用容器（默认隐藏）
  const container = document.createElement('div')
  container.id = 'gitlab-weekly-report-userscript-container'
  container.style.cssText = `
    position: fixed;
    top: 60px;
    left: 60px;
    right: 60px;
    bottom: 60px;
    z-index: 999999;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    display: none;
    overflow: hidden;
    isolation: isolate;
  `

  // 创建遮罩层
  const overlay = document.createElement('div')
  overlay.id = 'gitlab-weekly-report-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999997;
    display: none;
  `

  // 显示/隐藏面板的函数
  const togglePanel = () => {
    const isVisible = container.style.display !== 'none'
    if (isVisible) {
      container.style.display = 'none'
      overlay.style.display = 'none'
      triggerButton.style.transform = 'scale(1)'
      // 移除遮罩层的点击事件
      overlay.removeEventListener('click', togglePanel)
    } else {
      container.style.display = 'block'
      overlay.style.display = 'block'
      triggerButton.style.transform = 'scale(0.9)'
      // 添加遮罩层的点击事件
      overlay.addEventListener('click', togglePanel)
    }
  }

  // 按钮悬停效果
  triggerButton.addEventListener('mouseenter', () => {
    if (container.style.display === 'none') {
      triggerButton.style.transform = 'scale(1.1)'
      triggerButton.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)'
    }
  })

  triggerButton.addEventListener('mouseleave', () => {
    if (container.style.display === 'none') {
      triggerButton.style.transform = 'scale(1)'
      triggerButton.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'
    }
  })

  // 绑定触发器按钮的点击事件
  triggerButton.addEventListener('click', togglePanel)

  // 添加到页面
  document.body.appendChild(overlay)
  document.body.appendChild(container)
  document.body.appendChild(triggerButton)

  // 渲染React应用
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(App, { isUserscript: true }))
}

// 检查是否在GitLab页面
const isGitLabPage = (): boolean => {
  return (
    window.location.hostname.includes('gitlab') ||
    window.location.pathname.includes('gitlab') ||
    document.querySelector('meta[content*="GitLab"]') !== null ||
    document.querySelector('[data-page*="gitlab"]') !== null
  )
}

// 初始化函数
const init = () => {
  if (!isGitLabPage()) {
    // 非GitLab页面，跳过注入
    return
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserscript)
  } else {
    initUserscript()
  }
}

// 全局清理函数，用于移除所有事件监听器和观察者
const cleanup = () => {
  const triggerButton = document.getElementById('gitlab-weekly-report-trigger')
  const overlay = document.getElementById('gitlab-weekly-report-overlay')
  const container = document.getElementById(
    'gitlab-weekly-report-userscript-container',
  )

  // 清理React应用实例
  if (container) {
    // React 18 将 root 实例存储在 DOM 节点的内部属性上
    // 为了类型安全，我们在这里进行类型断言
    const internalRoot = (container as { _reactRootContainer?: Root })
      ._reactRootContainer
    if (internalRoot) {
      internalRoot.unmount()
    }
  }

  // 移除DOM元素，这会自动移除所有关联的事件监听器
  if (triggerButton) triggerButton.remove()
  if (overlay) overlay.remove()
  if (container) container.remove()

  // 停止 MutationObserver
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

// 启动脚本
init()

// 监听页面变化（SPA路由变化）
let lastUrl = location.href
let observer: MutationObserver | null = new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    // 在重新初始化前，先清理旧的实例
    cleanup()
    setTimeout(init, 1000) // 延迟1秒等待页面加载
  }
})
observer.observe(document, { subtree: true, childList: true })
