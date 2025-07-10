import React from 'react'
import { AppMode } from '@/types'
import styles from './index.module.less'

interface ModeToggleProps {
  currentMode: AppMode
  onModeChange: (mode: AppMode) => void
}

/**
 * 模式切换组件
 * 负责 Events 和 Changelog 模式之间的切换
 */
const ModeToggle: React.FC<ModeToggleProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className={styles.modeToggle}>
      <div
        className={`${styles.toggleTrack} ${currentMode === 'events' ? styles.eventsActive : currentMode === 'changelog' ? styles.changelogActive : styles.planActive}`}
      >
        <div className={styles.toggleSlider} />
        <button
          className={`${styles.toggleOption} ${styles.eventsOption} ${
            currentMode === 'events' ? styles.active : ''
          }`}
          onClick={() => onModeChange('events')}
        >
          <span className={styles.toggleIcon}>📋</span>
          <span className={styles.toggleLabel}>Events</span>
        </button>
        <button
          className={`${styles.toggleOption} ${styles.changelogOption} ${
            currentMode === 'changelog' ? styles.active : ''
          }`}
          onClick={() => onModeChange('changelog')}
        >
          <span className={styles.toggleIcon}>📝</span>
          <span className={styles.toggleLabel}>Changelog</span>
        </button>
        <button
          className={`${styles.toggleOption} ${styles.planOption} ${
            currentMode === 'plan' ? styles.active : ''
          }`}
          onClick={() => onModeChange('plan')}
        >
          <span className={styles.toggleIcon}>📊</span>
          <span className={styles.toggleLabel}>Plan</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(ModeToggle)
