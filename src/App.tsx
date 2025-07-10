import React, { useEffect, useMemo } from 'react'
import { AppContext, useAppContext } from '@/context/AppContext'
import { useAppState } from '@/hooks/useAppState'

import MainPanel from '@/components/MainPanel'
import SettingsPanel from '@/components/SettingsPanel'
import AIPanel from '@/components/AIPanel'
import EventDetailModal from '@/components/Modal/EventDetailModal'

import styles from './App.module.less'

interface AppProps {
  isUserscript?: boolean
}

/**
 * 应用根组件，负责提供全局上下文和渲染主布局
 */
const AppContent: React.FC<AppProps> = ({ isUserscript = false }) => {
  const { state, handleCloseEventDetail } = useAppContext()
  const { theme, selectedEvent, isDetailModalVisible } = state

  // 根据系统设置计算实际主题
  const actualTheme = useMemo(() => {
    if (!theme || theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }, [theme])

  // 监听并应用主题
  useEffect(() => {
    document.body.className = document.body.className
      .replace(/\\b(light|dark)\\b/g, '')
      .trim()
    document.body.classList.add(actualTheme)
  }, [actualTheme])

  return (
    <div
      id="gitlab-weekly-report-app"
      className={`${styles.app} ${isUserscript ? styles.userscriptMode : styles.webMode}`}
    >
      <MainPanel />
      <SettingsPanel />
      <AIPanel />
      <EventDetailModal
        event={selectedEvent}
        visible={isDetailModalVisible}
        onClose={handleCloseEventDetail}
      />
    </div>
  )
}

const App: React.FC<AppProps> = props => {
  const appState = useAppState()
  return (
    <AppContext.Provider value={appState}>
      <AppContent {...props} />
    </AppContext.Provider>
  )
}

export default App
