import { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import { errorUtils } from '@/utils'
import Pagination from '../Pagination'
import styles from './EventsList.module.less'

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
    // 只允许对时间字段进行排序
    if (field !== 'created_at') return

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

    // 获取今天的开始时间（00:00:00）
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 获取昨天的开始时间
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    // 获取事件日期的开始时间
    const eventDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    if (eventDate.getTime() === today.getTime()) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    } else if (eventDate.getTime() === yesterday.getTime()) {
      return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      // 计算天数差
      const diffTime = today.getTime() - eventDate.getTime()
      const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 1000))

      if (diffDays > 0 && diffDays <= 7) {
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
  }

  /**
   * 统一的事件显示信息获取方案
   * 综合考虑 target_type、action_name、push_data 等信息
   * 返回包含图标、操作类型和标题的统一对象
   */
  const getEventDisplayInfo = (event: GitLabEvent) => {
    const { action_name: actionName, target_type: targetType } = event

    // 1. 优先处理推送事件
    if (event.push_data) {
      const { action, ref_type } = event.push_data
      if (action === 'pushed' && ref_type === 'branch') {
        return {
          icon: '⬆️',
          actionType: '分支推送',
          title: `推送到分支 ${event.push_data.ref}`,
        }
      }
      if (action === 'pushed' && ref_type === 'tag') {
        return {
          icon: '🏷️',
          actionType: '标签推送',
          title: `推送标签 ${event.push_data.ref}`,
        }
      }
      return {
        icon: '📤',
        actionType: '推送',
        title: `推送到分支 ${event.push_data.ref}`,
      }
    }

    // 2. 根据 target_type 判断目标类型
    if (targetType && targetType.trim() !== '') {
      const targetTypeConfig: Record<
        string,
        { icon: string; actionType: string }
      > = {
        MergeRequest: { icon: '⤴️', actionType: 'MR' },
        Issue: { icon: '⚠️', actionType: 'Issue' },
        Commit: { icon: '💾', actionType: '提交' },
        Note: { icon: '💬', actionType: '评论' },
        DiscussionNote: { icon: '🗣️', actionType: '讨论-评论' },
        DiffNote: { icon: '📝', actionType: '代码-评论' },
        Project: { icon: '📁', actionType: '项目' },
        Milestone: { icon: '🎯', actionType: '里程碑' },
        Epic: { icon: '🎪', actionType: 'Epic' },
        Snippet: { icon: '✂️', actionType: '代码片段' },
        User: { icon: '👤', actionType: '用户' },
      }

      const config = targetTypeConfig[targetType]
      if (config) {
        return {
          icon: config.icon,
          actionType: config.actionType,
          title: getEventTitleByType(event),
        }
      }
    }

    // 3. 根据 action_name 判断操作类型（当 target_type 为空时）
    const actionConfig: Record<string, { icon: string; actionType: string }> = {
      'pushed to': { icon: '⬆️', actionType: '推送' },
      'pushed new': { icon: '⬆️', actionType: '推送新分支' },
      opened: { icon: '🆕', actionType: '开启' },
      closed: { icon: '✅', actionType: '关闭' },
      merged: { icon: '🔀', actionType: '合并' },
      'commented on': { icon: '💬', actionType: '评论' },
      joined: { icon: '👋', actionType: '加入' },
      left: { icon: '👋', actionType: '离开' },
      created: { icon: '✨', actionType: '创建' },
      updated: { icon: '🔄', actionType: '更新' },
      deleted: { icon: '🗑️', actionType: '删除' },
      approved: { icon: '✅', actionType: '批准' },
      unapproved: { icon: '❌', actionType: '取消批准' },
    }

    const config = actionConfig[actionName]
    if (config) {
      return {
        icon: config.icon,
        actionType: config.actionType,
        title: getEventTitleByType(event),
      }
    }

    // 4. 兜底情况
    return {
      icon: '📋',
      actionType: targetType || actionName || '未知操作',
      title: getEventTitleByType(event),
    }
  }

  /**
   * 根据事件类型获取标题
   */
  const getEventTitleByType = (event: GitLabEvent) => {
    // 推送事件的标题在getEventDisplayInfo中已处理
    if (event.push_data) {
      return `推送到分支 ${event.push_data.ref}`
    }

    // 评论事件
    if (event.note) {
      const MAX_NOTE_LENGTH = 50
      const noteBody = event.note.body
        .replace(/\n/g, ' ')
        .substring(0, MAX_NOTE_LENGTH)
      return `评论: ${noteBody}${event.note.body.length > MAX_NOTE_LENGTH ? '...' : ''}`
    }

    // 加入项目事件
    if (event.action_name === 'joined') {
      return '加入项目'
    }

    // 其他事件使用原有标题
    return event.title || event.target_title || '无标题'
  }

  const getEventContent = (event: GitLabEvent) => {
    if (event.push_data) {
      return `${event.push_data.commit_count} 个提交: ${event.push_data.commit_title}`
    }

    if (event.note && event.target_title) {
      return event.target_title
    }

    // 优先使用project对象的path_with_namespace，如果没有则使用project_id
    if (event.project?.path_with_namespace) {
      return event.project.path_with_namespace
    }

    if (event.project_id) {
      return `项目ID: ${event.project_id}`
    }

    return '未知项目'
  }

  if (loading) {
    return (
      <div className={styles['events-list-loading']}>
        <div className={styles['loading-spinner']}></div>
        <p>正在加载事件数据...</p>
      </div>
    )
  }

  return (
    <div className={styles['events-list']}>
      {/* 表头 */}
      <div className={styles['events-list-header']}>
        <div className={`${styles['header-cell']} ${styles['checkbox-cell']}`}>
          <label className={styles['checkbox-container']}>
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={input => {
                if (input) input.indeterminate = isIndeterminate
              }}
              onChange={handleSelectAll}
              title={isAllSelected ? '取消全选' : '全选'}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <div className={`${styles['header-cell']} ${styles['content-cell']}`}>
          <span>标题和内容</span>
        </div>
        <div className={`${styles['header-cell']} ${styles['action-cell']}`}>
          <span>操作</span>
        </div>
        <div
          className={`${styles['header-cell']} ${styles['time-cell']}`}
          onClick={() => handleSort('created_at')}
        >
          <span>时间</span>
          <span className={styles['sort-icon']}>{getSortIcon('created_at')}</span>
        </div>
        <div className={`${styles['header-cell']} ${styles['detail-cell']}`}>详情</div>
      </div>

      {/* 事件列表 */}
      <div className={styles['events-list-body']}>
        {events.length === 0 ? (
          <div className={styles['empty-state']}>
            <div className={styles['empty-icon']}>📄</div>
            <p>暂无事件数据</p>
            <span>{errorUtils.configErrors.INVALID_FILTER_OR_CONFIG}</span>
          </div>
        ) : (
          events.map(event => {
            const isSelected = selectedEventIds.includes(event.id)
            const { icon, title, actionType } = getEventDisplayInfo(event)
            return (
              <div
                key={event.id}
                className={`${styles['event-row']} ${isSelected ? styles.selected : ''}`}
              >
                <div className={`${styles.cell} ${styles['checkbox-cell']}`}>
                  <label className={styles['checkbox-container']}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleEventSelect(event.id)}
                      title={isSelected ? '取消选择' : '选择此事件'}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
                <div className={`${styles.cell} ${styles['content-cell']}`}>
                  <div className={styles['event-icon']}>{icon}</div>
                  <div className={styles['event-content']}>
                    <div className={styles['event-title']}>{title}</div>
                    <div className={styles['event-description']}>
                      {getEventContent(event)}
                    </div>
                  </div>
                </div>
                <div className={`${styles.cell} ${styles['action-cell']}`}>
                  <span className={styles['action-tag']}>{actionType}</span>
                </div>
                <div className={`${styles.cell} ${styles['time-cell']}`}>
                  <span className={styles['event-time']}>
                    {formatDate(event.created_at)}
                  </span>
                </div>
                <div className={`${styles.cell} ${styles['detail-cell']}`}>
                  <button
                    className={styles['detail-btn']}
                    onClick={() => onEventDetail(event)}
                    title="查看详情"
                  >
                    <span className={styles['detail-icon']}>🔍</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 分页器 */}
      <div className={styles['events-list-footer']}>
        <Pagination
          current={paginationOptions.page}
          pageSize={paginationOptions.pageSize}
          total={totalCount}
          onChange={page => onPaginationChange({ ...paginationOptions, page })}
          showSizeChanger={true}
          onShowSizeChange={(page, pageSize) =>
            onPaginationChange({ page, pageSize, total: totalCount })
          }
          selectedCount={selectedEventIds.length}
        />
      </div>
    </div>
  )
}

export default EventsList
