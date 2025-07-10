import React from 'react'
import { useAppContext } from '@/context/AppContext'
import { APP_VERSION } from '@/constants'
import ModeToggle from './components/ModeToggle'
import ActionButtons from './components/ActionButtons'
import EventsView from './components/EventsView'
import ChangelogView from './components/ChangelogView'
import PlanView from './components/PlanView'
import VersionUpdateNotification from '@/components/VersionUpdateNotification'
import styles from './index.module.less'

const MainPanel: React.FC = () => {
  const { state, handleModeChange, setActivePanel } = useAppContext()
  const { appMode, config } = state

  const onOpenSettings = () => setActivePanel('settings')
  const onOpenAI = () => setActivePanel('ai')

  return (
    <div className={styles.mainPanel}>
      {/* 标题栏 */}
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <ModeToggle currentMode={appMode} onModeChange={handleModeChange} />
        </div>
        <div className={styles.headerRight}>
          <VersionUpdateNotification currentVersion={APP_VERSION} />

          {/* 分隔线 */}
          <div className={styles.divider} />

          <ActionButtons
            config={config}
            appMode={appMode}
            onOpenSettings={onOpenSettings}
            onOpenAI={onOpenAI}
          />
        </div>
      </div>

      {/* 根据模式显示不同内容 */}
      <div className={styles.panelContent}>
        {appMode === 'events' && <EventsView />}
        {appMode === 'changelog' && <ChangelogView />}
        {appMode === 'plan' && <PlanView />}
      </div>
    </div>
  )
}

export default MainPanel
