import React from 'react'
import { useAppState } from '@/hooks/useAppState'
import type {
  GitLabEvent,
  FilterConditions,
  SortOptions,
  PaginationOptions,
  AppMode,
} from '@/types'
import { APP_VERSION } from '@/constants'
import FilterSection from './components/FilterSection'
import EventsList from './components/EventsList'
import ChangelogPanel from './components/ChangelogPanel'
import VersionUpdateNotification from '@/components/VersionUpdateNotification'
import ConfigStatus from '@/components/ConfigStatus'
import styles from './index.module.less'

interface MainPanelProps {
  appMode: AppMode
  events: GitLabEvent[]
  totalCount: number
  loading: boolean
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  selectedEventIds: number[]
  onModeChange: (mode: AppMode) => void
  onFilterChange: (filters: FilterConditions) => void
  onSortChange: (sort: SortOptions) => void
  onPaginationChange: (pagination: PaginationOptions) => void
  onEventSelect: (eventId: number, selected: boolean) => void
  onSelectAll: (selected: boolean) => void
  onEventDetail: (event: GitLabEvent) => void
  onOpenSettings: () => void
  onOpenAI: () => void
}

const MainPanel: React.FC<MainPanelProps> = ({
  appMode,
  events,
  totalCount,
  loading,
  filterConditions,
  sortOptions,
  paginationOptions,
  selectedEventIds,
  onModeChange,
  onFilterChange,
  onSortChange,
  onPaginationChange,
  onEventSelect,
  onSelectAll,
  onEventDetail,
  onOpenSettings,
  onOpenAI,
}) => {
  const { state } = useAppState()

  return (
    <div className={styles.mainPanel}>
      {/* 标题栏 */}
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.modeToggle}>
            <div className={styles.toggleTrack}>
              <div
                className={`${styles.toggleSlider} ${
                  appMode === 'changelog' ? styles.slideRight : ''
                }`}
              />
              <button
                className={`${styles.toggleOption} ${
                  appMode === 'events' ? styles.active : ''
                }`}
                onClick={() => onModeChange('events')}
              >
                <span className={styles.toggleIcon}>📋</span>
                <span className={styles.toggleLabel}>Events</span>
              </button>
              <button
                className={`${styles.toggleOption} ${
                  appMode === 'changelog' ? styles.active : ''
                }`}
                onClick={() => onModeChange('changelog')}
              >
                <span className={styles.toggleIcon}>📝</span>
                <span className={styles.toggleLabel}>Changelog</span>
              </button>
            </div>
          </div>
          {/* 配置状态显示 */}
          <ConfigStatus config={state.config} onClick={onOpenSettings} />
        </div>
        <div className={styles.headerRight}>
          <VersionUpdateNotification currentVersion={APP_VERSION} />

          {/* 分隔线 */}
          <div className={styles.divider} />

          <div className={styles.actionButtons}>
            <button
              className={styles.actionBtn}
              onClick={onOpenSettings}
              title="设置"
            >
              <span className={styles.btnIcon}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.btnLabel}>设置</span>
            </button>

            <button
              className={`${styles.actionBtn} ${styles.aiBtn}`}
              onClick={onOpenAI}
              title="AI 周报"
            >
              <span className={styles.btnIcon}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className={styles.btnLabel}>AI 周报</span>
            </button>
          </div>
        </div>
      </div>

      {/* 根据模式显示不同内容 */}
      {appMode === 'events' ? (
        <>
          {/* 筛选条件部分 */}
          <div className={styles.filterSection}>
            <FilterSection
              filterConditions={filterConditions}
              onFilterChange={onFilterChange}
            />
          </div>

          {/* 事件列表部分 */}
          <div className={styles.eventsSection}>
            <EventsList
              events={events}
              totalCount={totalCount}
              loading={loading}
              sortOptions={sortOptions}
              onSortChange={onSortChange}
              paginationOptions={paginationOptions}
              onPaginationChange={onPaginationChange}
              selectedEventIds={selectedEventIds}
              onEventSelect={onEventSelect}
              onSelectAll={onSelectAll}
              onEventDetail={onEventDetail}
            />
          </div>
        </>
      ) : (
        <div className={styles.changelogSection}>
          <ChangelogPanel />
        </div>
      )}
    </div>
  )
}

export default MainPanel
