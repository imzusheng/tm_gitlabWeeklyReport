import React from 'react'
import { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import Pagination from '../Pagination'
import './EventsList.less'

interface EventsListProps {
  events: GitLabEvent[]
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  onSortChange: (sort: SortOptions) => void
  onPageChange: (page: number) => void
  onEventDetail: (event: GitLabEvent) => void
  isLoading: boolean
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  sortOptions,
  paginationOptions,
  onSortChange,
  onPageChange,
  onEventDetail,
  isLoading
}) => {
  const handleSort = (field: SortOptions['field']) => {
    const newOrder = sortOptions.field === field && sortOptions.order === 'desc' ? 'asc' : 'desc'
    onSortChange({ field, order: newOrder })
  }

  const getSortIcon = (field: SortOptions['field']) => {
    if (sortOptions.field !== field) return ''
    return sortOptions.order === 'desc' ? '↓' : '↑'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffDays === 2) {
      return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffDays <= 7) {
      return `${diffDays}天前`
    } else {
      return date.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const getEventTypeIcon = (_actionName: string, targetType: string) => {
    switch (targetType) {
      case 'MergeRequest':
        return '🔀'
      case 'Issue':
        return '🐛'
      case 'Commit':
        return '📝'
      case 'Push':
        return '🚀'
      case 'Note':
        return '💬'
      default:
        return '📋'
    }
  }

  const getEventTitle = (event: GitLabEvent) => {
    if (event.push_data) {
      return `推送到分支 ${event.push_data.ref}`
    }
    
    if (event.note) {
      const noteBody = event.note.body.replace(/\n/g, ' ').substring(0, 50)
      return `评论: ${noteBody}${event.note.body.length > 50 ? '...' : ''}`
    }
    
    return event.title || event.target_title || '无标题'
  }

  const getEventContent = (event: GitLabEvent) => {
    if (event.push_data) {
      return `${event.push_data.commit_count} 个提交: ${event.push_data.commit_title}`
    }
    
    if (event.note && event.target_title) {
      return event.target_title
    }
    
    return event.project?.path_with_namespace || '未知项目'
  }

  const getActionDisplayName = (actionName: string, _targetType: string) => {
    const actionMap: Record<string, string> = {
      'opened': '开启',
      'closed': '关闭',
      'merged': '合并',
      'pushed new': '推送新分支',
      'pushed to': '推送',
      'commented on': '评论'
    }
    
    return actionMap[actionName] || actionName
  }

  const getSourceUrl = (event: GitLabEvent) => {
    if (!event.project) return ''
    
    const baseUrl = 'https://www.lejuhub.com'
    const projectPath = event.project.path_with_namespace
    
    switch (event.target_type) {
      case 'MergeRequest':
        return `${baseUrl}/${projectPath}/-/merge_requests/${event.target_iid}`
      case 'Issue':
        return `${baseUrl}/${projectPath}/-/issues/${event.target_iid}`
      case 'Note':
        if (event.note?.noteable_type === 'Issue') {
          return `${baseUrl}/${projectPath}/-/issues/${event.note.noteable_iid}`
        } else if (event.note?.noteable_type === 'MergeRequest') {
          return `${baseUrl}/${projectPath}/-/merge_requests/${event.note.noteable_iid}`
        }
        return `${baseUrl}/${projectPath}`
      default:
        return `${baseUrl}/${projectPath}`
    }
  }

  if (isLoading) {
    return (
      <div className="events-list-loading">
        <div className="loading-spinner"></div>
        <p>正在加载事件数据...</p>
      </div>
    )
  }

  return (
    <div className="events-list">
      {/* 表头 */}
      <div className="events-list-header">
        <div className="header-cell content-cell" onClick={() => handleSort('title')}>
          <span>标题和内容</span>
          <span className="sort-icon">{getSortIcon('title')}</span>
        </div>
        <div className="header-cell action-cell" onClick={() => handleSort('action_name')}>
          <span>操作</span>
          <span className="sort-icon">{getSortIcon('action_name')}</span>
        </div>
        <div className="header-cell time-cell" onClick={() => handleSort('created_at')}>
          <span>时间</span>
          <span className="sort-icon">{getSortIcon('created_at')}</span>
        </div>
        <div className="header-cell detail-cell">
          详情
        </div>
      </div>

      {/* 事件列表 */}
      <div className="events-list-body">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>暂无事件数据</p>
            <span>请检查筛选条件或GitLab配置</span>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="event-row">
              <div className="cell content-cell">
                <div className="event-icon">
                  {getEventTypeIcon(event.action_name, event.target_type)}
                </div>
                <div className="event-content">
                  <div className="event-title">{getEventTitle(event)}</div>
                  <div className="event-description">{getEventContent(event)}</div>
                </div>
              </div>
              <div className="cell action-cell">
                <span className="action-tag">
                  {getActionDisplayName(event.action_name, event.target_type)}
                </span>
              </div>
              <div className="cell time-cell">
                <span className="event-time">{formatDate(event.created_at)}</span>
              </div>
              <div className="cell detail-cell">
                <button 
                  className="detail-btn"
                  onClick={() => onEventDetail(event)}
                  title="查看详情"
                >
                  <span className="detail-icon">🔍</span>
                </button>
                {getSourceUrl(event) && (
                  <a 
                    href={getSourceUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-btn"
                    title="打开源页面"
                  >
                    <span className="source-icon">🔗</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 分页器 */}
      <div className="events-list-footer">
        <Pagination
          current={paginationOptions.page}
          pageSize={paginationOptions.pageSize}
          total={paginationOptions.total}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default EventsList 