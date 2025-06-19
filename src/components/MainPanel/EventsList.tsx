import { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import { errorUtils } from '@/utils'
import Pagination from '../Pagination'
import './EventsList.less'

interface EventsListProps {
  events: GitLabEvent[]
  totalCount: number
  loading: boolean
  sortOptions: SortOptions
  onSortChange: (sortOptions: SortOptions) => void
  paginationOptions: PaginationOptions
  onPaginationChange: (paginationOptions: PaginationOptions) => void
  selectedEventIds: number[] // 选中的事件ID列表
  onEventSelect: (eventId: number, selected: boolean) => void // 事件选择回调
  onSelectAll: (selected: boolean) => void | Promise<void> // 全选/取消全选回调
  onEventDetail: (event: GitLabEvent) => void // 查看事件详情回调
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  totalCount,
  loading,
  sortOptions,
  onSortChange,
  paginationOptions,
  onPaginationChange,
  selectedEventIds,
  onEventSelect,
  onSelectAll,
  onEventDetail,
}) => {
  const handleSort = (field: SortOptions['field']) => {
    const newOrder =
      sortOptions.field === field && sortOptions.order === 'desc'
        ? 'asc'
        : 'desc'
    onSortChange({ field, order: newOrder })
  }

  const getSortIcon = (field: SortOptions['field']) => {
    if (sortOptions.field !== field) return ''
    return sortOptions.order === 'desc' ? '↓' : '↑'
  }

  /**
   * 检查是否全选
   */
  const isAllSelected =
    events.length > 0 &&
    events.every(event => selectedEventIds.includes(event.id))

  /**
   * 检查是否部分选中
   */
  const isIndeterminate = selectedEventIds.length > 0 && !isAllSelected

  /**
   * 处理全选/取消全选
   */
  const handleSelectAll = () => {
    onSelectAll(!isAllSelected)
  }

  /**
   * 处理单个事件选择
   */
  const handleEventSelect = (eventId: number) => {
    const isSelected = selectedEventIds.includes(eventId)
    onEventSelect(eventId, !isSelected)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY)

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
        minute: '2-digit',
      })
    }
  }

  const getEventTypeIcon = (_actionName: string, targetType: string | null) => {
    // 处理空值情况
    if (!targetType || targetType.trim() === '') {
      return '❓'
    }

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
      case 'DiscussionNote':
        return '💭'
      case 'DiffNote':
        return '📄'
      default:
        return '📋'
    }
  }

  const getEventTitle = (event: GitLabEvent) => {
    if (event.push_data) {
      return `推送到分支 ${event.push_data.ref}`
    }

    if (event.note) {
      const MAX_NOTE_LENGTH = 50
      const noteBody = event.note.body
        .replace(/\n/g, ' ')
        .substring(0, MAX_NOTE_LENGTH)
      return `评论: ${noteBody}${event.note.body.length > MAX_NOTE_LENGTH ? '...' : ''}`
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

  const getActionDisplayName = (
    actionName: string,
    _targetType: string | null,
  ) => {
    const actionMap: Record<string, string> = {
      opened: '开启',
      closed: '关闭',
      merged: '合并',
      'pushed new': '推送新分支',
      'pushed to': '推送',
      'commented on': '评论',
      joined: '加入',
    }

    return actionMap[actionName] || actionName
  }

  const getTargetTypeDisplayName = (targetType: string | null) => {
    // 处理空值情况
    if (!targetType || targetType.trim() === '') {
      return '未知'
    }

    const typeMap: Record<string, string> = {
      MergeRequest: 'MR',
      Issue: 'Issue',
      Commit: '提交',
      Push: '推送',
      Note: '评论',
      DiscussionNote: '讨论评论',
      DiffNote: '代码评论',
      Project: '项目',
      Milestone: '里程碑',
      Epic: 'Epic',
      Snippet: '代码片段',
      User: '用户',
    }

    return typeMap[targetType] || targetType
  }

  const getSourceUrl = (event: GitLabEvent) => {
    if (!event.project) return ''

    const baseUrl = 'https://www.lejuhub.com'
    const projectPath = event.project.path_with_namespace

    // 处理空值情况
    if (!event.target_type || event.target_type.trim() === '') {
      return `${baseUrl}/${projectPath}`
    }

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

  if (loading) {
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
        <div className="header-cell checkbox-cell">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={input => {
                if (input) input.indeterminate = isIndeterminate
              }}
              onChange={handleSelectAll}
              title={isAllSelected ? '取消全选' : '全选'}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div
          className="header-cell content-cell"
          onClick={() => handleSort('title')}
        >
          <span>标题和内容</span>
          <span className="sort-icon">{getSortIcon('title')}</span>
        </div>
        <div
          className="header-cell action-cell"
          onClick={() => handleSort('action_name')}
        >
          <span>操作</span>
          <span className="sort-icon">{getSortIcon('action_name')}</span>
        </div>
        <div
          className="header-cell target-type-cell"
          onClick={() => handleSort('target_type')}
        >
          <span>目标类型</span>
          <span className="sort-icon">{getSortIcon('target_type')}</span>
        </div>
        <div
          className="header-cell time-cell"
          onClick={() => handleSort('created_at')}
        >
          <span>时间</span>
          <span className="sort-icon">{getSortIcon('created_at')}</span>
        </div>
        <div className="header-cell detail-cell">详情</div>
      </div>

      {/* 事件列表 */}
      <div className="events-list-body">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>暂无事件数据</p>
            <span>{errorUtils.configErrors.INVALID_FILTER_OR_CONFIG}</span>
          </div>
        ) : (
          events.map(event => {
            const isSelected = selectedEventIds.includes(event.id)
            return (
              <div
                key={event.id}
                className={`event-row ${isSelected ? 'selected' : ''}`}
              >
                <div className="cell checkbox-cell">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleEventSelect(event.id)}
                      title={isSelected ? '取消选择' : '选择此事件'}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="cell content-cell">
                  <div className="event-icon">
                    {getEventTypeIcon(event.action_name, event.target_type)}
                  </div>
                  <div className="event-content">
                    <div className="event-title">{getEventTitle(event)}</div>
                    <div className="event-description">
                      {getEventContent(event)}
                    </div>
                  </div>
                </div>
                <div className="cell action-cell">
                  <span className="action-tag">
                    {getActionDisplayName(event.action_name, event.target_type)}
                  </span>
                </div>
                <div className="cell target-type-cell">
                  <span className="target-type-tag">
                    {getTargetTypeDisplayName(event.target_type)}
                  </span>
                </div>
                <div className="cell time-cell">
                  <span className="event-time">
                    {formatDate(event.created_at)}
                  </span>
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
            )
          })
        )}
      </div>

      {/* 分页器 */}
      <div className="events-list-footer">
        <Pagination
          current={paginationOptions.page}
          pageSize={paginationOptions.pageSize}
          total={totalCount}
          onChange={page => onPaginationChange({ ...paginationOptions, page })}
          showSizeChanger={true}
          onShowSizeChange={(page, pageSize) =>
            onPaginationChange({ page, pageSize, total: totalCount })
          }
        />
      </div>
    </div>
  )
}

export default EventsList
