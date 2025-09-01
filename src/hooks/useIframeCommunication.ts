import { useEffect, useCallback } from 'react'
import { useAppStore } from '@/stores/app-store'

interface IframeMessage {
  type: 'theme-change' | 'visibility-change' | 'close-panel' | 'ready'
  theme?: 'light' | 'dark'
  visible?: boolean
}

/**
 * iframe 通信管理 Hook
 * 处理与父页面的消息通信
 */
export const useIframeCommunication = () => {
  const { setTheme } = useAppStore()

  // 检测是否在 iframe 中运行
  const isIframe = useCallback(() => {
    try {
      return window.self !== window.top
    } catch (e) {
      // 如果跨域，无法访问 window.top，说明在 iframe 中
      return true
    }
  }, [])

  // 发送消息到父页面
  const sendMessageToParent = useCallback(
    (message: IframeMessage) => {
      if (isIframe()) {
        try {
          window.parent.postMessage(message, '*')
        } catch (error) {
          console.warn('无法发送消息到父页面:', error)
        }
      }
    },
    [isIframe],
  )

  // 监听来自父页面的消息
  useEffect(() => {
    if (!isIframe()) return

    const handleMessage = (event: MessageEvent) => {
      // 验证消息来源（可选的安全措施）
      // if (event.origin !== expectedOrigin) return

      const message = event.data as IframeMessage

      switch (message.type) {
        case 'theme-change':
          if (message.theme) {
            setTheme(message.theme)
          }
          break
        case 'visibility-change':
          // 可以在这里处理可见性变化逻辑
          console.log('iframe 可见性变化:', message.visible)
          break
      }
    }

    window.addEventListener('message', handleMessage)

    // 通知父页面 iframe 已准备好
    sendMessageToParent({ type: 'ready' })

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [setTheme, sendMessageToParent, isIframe])

  return {
    isIframe: isIframe(),
    sendMessageToParent,
    closePanel: () => sendMessageToParent({ type: 'close-panel' }),
  }
}
