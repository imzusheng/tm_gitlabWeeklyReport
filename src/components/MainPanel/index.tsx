import React from 'react'
import { useAppState } from '@/hooks/useAppState'
import type {
  GitLabEvent,
  FilterConditions,
  SortOptions,
  PaginationOptions,
} from '@/types'
import { APP_VERSION } from '@/constants'
import FilterSection from './FilterSection'
import EventsList from './EventsList'
import VersionUpdateNotification from '@/components/VersionUpdateNotification'
import ConfigStatus from '@/components/ConfigStatus'
import styles from './index.module.less'

interface MainPanelProps {
  events: GitLabEvent[]
  totalCount: number
  loading: boolean
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  selectedEventIds: number[]
  onFilterChange: (filters: FilterConditions) => void
  onSortChange: (sort: SortOptions) => void
  onPaginationChange: (paginationOptions: PaginationOptions) => void
  onEventSelect: (eventId: number, selected: boolean) => void
  onSelectAll: (selected: boolean) => void | Promise<void>
  onEventDetail: (event: GitLabEvent) => void
  onOpenSettings: () => void
  onOpenAI: () => void
}

const MainPanel: React.FC<MainPanelProps> = ({
  events,
  totalCount,
  loading,
  filterConditions,
  sortOptions,
  paginationOptions,
  selectedEventIds,
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
          <h1>GitLab Events</h1>
          {/* 配置状态显示 */}
          <ConfigStatus 
            config={state.config}
            onClick={onOpenSettings}
          />
        </div>
        <div className={styles.headerRight}>
          <VersionUpdateNotification currentVersion={APP_VERSION} />
          <button
            className={`${styles.actionBtn} ${styles.settingsBtn}`}
            onClick={onOpenSettings}
          >
            <span className={styles.icon}>⚙️</span>
            设置
          </button>
          <button
            className={`${styles.actionBtn} ${styles.aiBtn}`}
            onClick={onOpenAI}
          >
            <span className={styles.icon}>🤖</span>
            AI 周报
          </button>
        </div>
      </div>

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
    </div>
  )
}

export default MainPanel
