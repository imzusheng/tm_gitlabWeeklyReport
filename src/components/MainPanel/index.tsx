import React from 'react'
import { useAppState } from '@/hooks/useAppState'
import type { GitLabEvent, FilterConditions, SortOptions, PaginationOptions } from '@/types'
import FilterSection from './FilterSection'
import EventsList from './EventsList'
import './index.less'

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
  onOpenAI
}) => {
  const { isConfigValid } = useAppState()


  return (
    <div className="main-panel">
      {/* 标题栏 */}
      <div className="panel-header">
        <div className="header-left">
          <h1>GitLab Events</h1>
          <span className="event-count">
            {selectedEventIds.length}/{paginationOptions.total} 个事件
          </span>
          {/* 配置状态显示 */}
          <div className="config-status">
            {isConfigValid() ? (
              <span className="status-indicator config-valid">
                <span className="status-icon">✅</span>
                配置完整
              </span>
            ) : (
              <span className="status-indicator config-invalid">
                <span className="status-icon">❌</span>
                配置不完整
              </span>
            )}
          </div>
        </div>
        <div className="header-right">
          <button className="action-btn settings-btn" onClick={onOpenSettings}>
            <span className="icon">⚙️</span>
            设置
          </button>
          <button className="action-btn ai-btn" onClick={onOpenAI}>
            <span className="icon">🤖</span>
            AI 周报
          </button>
        </div>
      </div>

      {/* 筛选条件部分 */}
      <div className="filter-section">
        <FilterSection
          filterConditions={filterConditions}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* 事件列表部分 */}
      <div className="events-section">
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