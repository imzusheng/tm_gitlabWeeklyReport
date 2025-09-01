import { USERSCRIPT_CONFIG } from '@/constants'

let iframeElement: HTMLIFrameElement | null = null
let containerElement: HTMLElement | null = null

// 创建 iframe 容器
const createAppContainer = (): HTMLElement => {
  const container = document.createElement('div')
  container.id = USERSCRIPT_CONFIG.CONTAINER_ID

  // 容器样式
  container.style.cssText = `
    position: fixed;
    top: 60px;
    left: 60px;
    right: 60px;
    bottom: 60px;
    z-index: 999999;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    display: none;
    overflow: hidden;
    background: transparent;
  `

  return container
}

// 创建触发按钮
const createTriggerButton = (): HTMLElement => {
  const button = document.createElement('div')
  button.id = USERSCRIPT_CONFIG.TRIGGER_BUTTON.ID
  button.innerHTML = USERSCRIPT_CONFIG.TRIGGER_BUTTON.ICON

  // 按钮样式（不需要作用域，因为是独立元素）
  button.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 50px;
    width: 50px;
    height: 50px;
    background: #1976d2;
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

  return button
}

// 创建遮罩层
const createOverlay = (): HTMLElement => {
  const overlay = document.createElement('div')
  overlay.id = USERSCRIPT_CONFIG.OVERLAY_ID
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
  return overlay
}
// 获取系统主题
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// 创建 iframe 元素
const createIframe = (): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')

  // iframe 样式
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
    background: transparent;
  `

  // 设置 iframe 属性
  iframe.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups'
  iframe.allow = 'fullscreen'

  // 构建 iframe URL（添加 iframe 模式参数）
  const iframeUrl = `${USERSCRIPT_CONFIG.IFRAME_URL}?mode=iframe&theme=${getSystemTheme()}`
  iframe.src = iframeUrl

  return iframe
}

// 初始化油猴脚本
const initUserscript = () => {
  // 检查是否已经注入过
  if (document.getElementById(USERSCRIPT_CONFIG.CONTAINER_ID)) {
    return
  }

  // 创建元素
  const triggerButton = createTriggerButton()
  const overlay = createOverlay()
  containerElement = createAppContainer()
  iframeElement = createIframe()

  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleThemeChange = () => {
    if (iframeElement) {
      const newTheme = getSystemTheme()
      iframeElement.contentWindow?.postMessage(
        {
          type: 'theme-change',
          theme: newTheme,
        },
        '*',
      )
    }
  }
  mediaQuery.addEventListener('change', handleThemeChange)

  // 显示/隐藏面板的函数
  const togglePanel = () => {
    const isVisible = containerElement!.style.display !== 'none'
    if (isVisible) {
      containerElement!.style.display = 'none'
      overlay.style.display = 'none'
      triggerButton.style.transform = 'scale(1)'
      // 通知 iframe 隐藏
      iframeElement?.contentWindow?.postMessage(
        {
          type: 'visibility-change',
          visible: false,
        },
        '*',
      )
    } else {
      containerElement!.style.display = 'block'
      overlay.style.display = 'block'
      triggerButton.style.transform = 'scale(0.9)'
      // 通知 iframe 显示
      iframeElement?.contentWindow?.postMessage(
        {
          type: 'visibility-change',
          visible: true,
        },
        '*',
      )
    }
  }

  // 监听来自 iframe 的消息
  const handleMessage = (event: MessageEvent) => {
    // 验证消息来源
    if (event.origin !== new URL(USERSCRIPT_CONFIG.IFRAME_URL).origin) {
      return
    }

    const { type } = event.data

    switch (type) {
      case 'close-panel':
        togglePanel()
        break
      case 'ready':
        // iframe 已准备好，发送当前主题
        iframeElement?.contentWindow?.postMessage(
          {
            type: 'theme-change',
            theme: getSystemTheme(),
          },
          '*',
        )
        break
    }
  }

  window.addEventListener('message', handleMessage)

  // 按钮悬停效果
  triggerButton.addEventListener('mouseenter', () => {
    if (containerElement!.style.display === 'none') {
      triggerButton.style.transform = 'scale(1.1)'
      triggerButton.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)'
    }
  })

  triggerButton.addEventListener('mouseleave', () => {
    if (containerElement!.style.display === 'none') {
      triggerButton.style.transform = 'scale(1)'
      triggerButton.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'
    }
  })

  // 绑定事件
  triggerButton.addEventListener('click', togglePanel)
  overlay.addEventListener('click', togglePanel)

  // 添加元素到页面
  document.body.appendChild(triggerButton)
  document.body.appendChild(overlay)
  document.body.appendChild(containerElement)
  containerElement.appendChild(iframeElement)
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
  const triggerButton = document.getElementById(
    USERSCRIPT_CONFIG.TRIGGER_BUTTON.ID,
  )
  const overlay = document.getElementById(USERSCRIPT_CONFIG.OVERLAY_ID)
  const container = document.getElementById(USERSCRIPT_CONFIG.CONTAINER_ID)

  // 移除DOM元素，这会自动移除所有关联的事件监听器
  if (triggerButton) triggerButton.remove()
  if (overlay) overlay.remove()
  if (container) container.remove()

  // 重置引用
  containerElement = null
  iframeElement = null

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
