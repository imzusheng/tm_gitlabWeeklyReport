import React, { useCallback } from 'react'
import { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import { configErrors } from '@/utils'
import Pagination from '@/components/Pagination'
import SelectionManager from '@/components/SelectionManager'
import styles from './index.module.less'

interface EventsListProps {
  events: GitLabEvent[]
  totalCount: number
  loading: boolean
  sortOptions: SortOptions
  onSortChange: (sortOptions: SortOptions) => void
  paginationOptions: PaginationOptions
  onPaginationChange: (paginationOptions: PaginationOptions) => void
  selectedEventIds: number[] // 选中的事件ID列表
  isFullSelection: boolean // 是否全选状态
  onSelectionChange: (selectedIds: number[], isFullSelection: boolean) => void // 选择状态变更回调
  onEventSelect: (eventId: number) => void // 单个事件选择切换
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
  isFullSelection,
  onSelectionChange,
  onEventSelect,
  onEventDetail,
}) => {
  const handleSort = useCallback(
    (field: SortOptions['field']) => {
      // 只允许对时间字段进行排序
      if (field !== 'created_at') return

      const newOrder =
        sortOptions.field === field && sortOptions.order === 'desc'
          ? 'asc'
          : 'desc'
      onSortChange({ field, order: newOrder })
    },
    [sortOptions.field, sortOptions.order, onSortChange],
  )

  const getSortIcon = useCallback(
    (field: SortOptions['field']) => {
      if (sortOptions.field !== field) return ''
      return sortOptions.order === 'desc' ? '↓' : '↑'
    },
    [sortOptions.field, sortOptions.order],
  )

  /**
   * 处理单个事件选择
   */
  const handleEventSelect = useCallback(
    (eventId: number) => {
      onEventSelect(eventId)
    },
    [onEventSelect],
  )

  const formatDate = useCallback((dateString: string) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const diffTime =
      today.getTime() -
      new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
      ).getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const timeStr = eventDate.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })

    if (diffDays === 0) {
      return `今天 ${timeStr}`
    }
    if (diffDays === 1) {
      return `昨天 ${timeStr}`
    }
    if (diffDays > 1 && diffDays <= 7) {
      return `${diffDays}天前`
    }
    return eventDate.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }, [])

  /**
   * 根据事件类型获取标题
   */
  const getEventTitleByType = useCallback((event: GitLabEvent) => {
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
  }, [])

  /**
   * 统一的事件显示信息获取方案
   * 综合考虑 target_type、action_name、push_data 等信息
   * 返回包含图标、操作类型和标题的统一对象
   */
  const getEventDisplayInfo = useCallback(
    (event: GitLabEvent) => {
      const { action_name: actionName, target_type: targetType } = event

      // 1. 推送事件特殊处理
      if (event.push_data) {
        const { ref, commit_count: commitCount } = event.push_data
        const title = `推送到分支 ${ref} (${commitCount} 个提交)`
        return { icon: '⬆️', actionType: '推送', title }
      }

      // 2. 评论事件特殊处理
      if (event.note) {
        const MAX_NOTE_LENGTH = 50
        const noteBody = event.note.body
          .replace(/\n/g, ' ')
          .substring(0, MAX_NOTE_LENGTH)
        const title = `评论: ${noteBody}${event.note.body.length > MAX_NOTE_LENGTH ? '...' : ''}`
        return { icon: '💬', actionType: '评论', title }
      }

      // 3. 通用事件处理
      const title = event.title || event.target_title || '无标题'

      const configMap: Record<string, { icon: string; actionType: string }> = {
        // TargetType based
        Issue: { icon: '🐛', actionType: '问题' },
        MergeRequest: { icon: '🔀', actionType: '合并请求' },
        WikiPage: { icon: '📖', actionType: 'Wiki' },
        Project: { icon: '📁', actionType: '项目' },
        Milestone: { icon: '🎯', actionType: '里程碑' },
        Epic: { icon: '🎪', actionType: 'Epic' },
        Snippet: { icon: '✂️', actionType: '代码片段' },
        User: { icon: '👤', actionType: '用户' },
        // ActionName based
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

      const config =
        (targetType && configMap[targetType]) ||
        (actionName && configMap[actionName])

      if (config) {
        return { ...config, title }
      }

      // 4. 兜底情况
      return {
        icon: '📋',
        actionType: targetType || actionName || '未知操作',
        title: getEventTitleByType(event),
      }
    },
    [getEventTitleByType],
  )

  const getEventContent = useCallback((event: GitLabEvent) => {
    if (event.push_data) {
      return `${event.push_data.commit_count} 个提交: ${event.push_data.commit_title}`
    }
    if (event.note && event.target_title) {
      return event.target_title
    }
    if (event.project?.path_with_namespace) {
      return event.project.path_with_namespace
    }
    if (event.project_id !== undefined && event.project_id !== null) {
      return `项目ID: ${event.project_id}`
    }
    return '未知项目'
  }, [])

  return (
    <div className={styles.eventsList}>
      {/* 选择管理器 */}
      <SelectionManager
        currentPageEvents={events}
        selectedEventIds={selectedEventIds}
        totalCount={totalCount}
        onSelectionChange={onSelectionChange}
        loading={loading}
      />

      {/* 表头 */}
      <div className={styles.eventsListHeader}>
        <div className={`${styles.headerCell} ${styles.checkboxCell}`}>
          <span>选择</span>
        </div>
        <div className={`${styles.headerCell} ${styles.contentCell}`}>
          <span>标题和内容</span>
        </div>
        <div className={`${styles.headerCell} ${styles.actionCell}`}>
          <span>操作</span>
        </div>
        <div
          className={`${styles.headerCell} ${styles.timeCell}`}
          onClick={() => handleSort('created_at')}
        >
          <span>时间</span>
          <span className={styles.sortIcon}>{getSortIcon('created_at')}</span>
        </div>
        <div className={`${styles.headerCell} ${styles.detailCell}`}>详情</div>
      </div>

      {/* 事件列表 */}
      <div className={styles.eventsListBody}>
        {loading ? (
          <div className={styles.eventsListLoading}>
            <div className={styles.loadingSpinner}></div>
            <p>正在加载事件数据...</p>
          </div>
        ) : events.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📄</div>
            <p>暂无事件数据</p>
            <span>{configErrors.INVALID_FILTER_OR_CONFIG}</span>
          </div>
        ) : (
          events.map(event => {
            const isSelected =
              isFullSelection || selectedEventIds.includes(event.id)
            const { icon, title, actionType } = getEventDisplayInfo(event)
            return (
              <div
                key={event.id}
                className={`${styles.eventRow} ${isSelected ? styles.selected : ''}`}
              >
                <div className={`${styles.cell} ${styles.checkboxCell}`}>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleEventSelect(event.id)}
                      title={isSelected ? '取消选择' : '选择此事件'}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
                <div className={`${styles.cell} ${styles.contentCell}`}>
                  <div className={styles.eventIcon}>{icon}</div>
                  <div className={styles.eventContent}>
                    <div className={styles.eventTitle}>{title}</div>
                    <div className={styles.eventDescription}>
                      {getEventContent(event)}
                    </div>
                  </div>
                </div>
                <div className={`${styles.cell} ${styles.actionCell}`}>
                  <span className={styles.actionTag}>{actionType}</span>
                </div>
                <div className={`${styles.cell} ${styles.timeCell}`}>
                  <span className={styles.eventTime}>
                    {formatDate(event.created_at)}
                  </span>
                </div>
                <div className={`${styles.cell} ${styles.detailCell}`}>
                  <button
                    className={styles.detailBtn}
                    onClick={() => onEventDetail(event)}
                    title="查看详情"
                  >
                    <span className={styles.detailIcon}>🔍</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 分页器 */}
      <div className={styles.eventsListFooter}>
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

export default React.memo(EventsList)
