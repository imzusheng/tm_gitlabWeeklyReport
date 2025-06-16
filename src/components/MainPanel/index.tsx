import React from 'react'
import { FilterConditions, SortOptions, PaginationOptions, GitLabEvent } from '@/types'
import FilterSection from './FilterSection'
import EventsList from './EventsList'
import './index.less'

interface MainPanelProps {
  events: GitLabEvent[]
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  theme: 'light' | 'dark' | 'system'
  onFilterChange: (filters: FilterConditions) => void
  onSortChange: (sort: SortOptions) => void
  onPageChange: (page: number) => void
  onEventDetail: (event: GitLabEvent) => void
  onOpenSettings: () => void
  onOpenAI: () => void
  onToggleTheme: () => void
  isLoading: boolean
}

const MainPanel: React.FC<MainPanelProps> = ({
  events,
  filterConditions,
  sortOptions,
  paginationOptions,
  theme,
  onFilterChange,
  onSortChange,
  onPageChange,
  onEventDetail,
  onOpenSettings,
  onOpenAI,
  onToggleTheme,
  isLoading
}) => {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      default: return '🔄'
    }
  }

  const getThemeText = () => {
    switch (theme) {
      case 'light': return '浅色'
      case 'dark': return '深色'
      default: return '系统'
    }
  }

  return (
    <div className="main-panel">
      {/* 标题栏 */}
      <div className="panel-header">
        <div className="header-left">
          <h1>GitLab Events</h1>
          <span className="event-count">{paginationOptions.total} 个事件</span>
        </div>
        <div className="header-right">
          <button className="action-btn theme-btn" onClick={onToggleTheme} title={`当前: ${getThemeText()}`}>
            <span className="icon">{getThemeIcon()}</span>
            {getThemeText()}
          </button>
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
          sortOptions={sortOptions}
          paginationOptions={paginationOptions}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          onEventDetail={onEventDetail}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MainPanel 