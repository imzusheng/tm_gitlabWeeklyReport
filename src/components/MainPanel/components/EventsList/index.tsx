import React, { useCallback } from 'react'
import { GitLabEvent, SortOptions, PaginationOptions, AppMode } from '@/types'
import { useAppContext } from '@/context/AppContext'
import { configErrors } from '@/utils'
import Pagination from '../../../Pagination'
import SelectionManager from '../../../SelectionManager'
import EventRow from '../EventRow'
import styles from './index.module.less'

export interface EventsListProps {
  events?: GitLabEvent[]
  totalCount?: number
  isLoading?: boolean
  sortOptions?: SortOptions
  onSortChange?: (options: SortOptions) => void
  paginationOptions?: PaginationOptions
  onPaginationChange?: (options: PaginationOptions) => void
  selectedEventIds?: number[]
  isFullSelection?: boolean
  onSelectionChange?: (selectedIds: number[], isFullSelection: boolean) => void
  onEventSelect?: (eventId: number) => void
  onEventDetail?: (event: GitLabEvent) => void
  mode?: AppMode
}

const EventsList: React.FC<EventsListProps> = props => {
  const {
    state: contextState,
    updateSortOptions: contextUpdateSortOptions,
    setEventsSelectedIds: contextSetEventsSelectedIds,
    handleEventDetail: contextHandleEventDetail,
    isAllEventsSelected: contextIsAllEventsSelected,
  } = useAppContext()

  // Props-over-context pattern
  const events = props.events ?? contextState.events
  const isLoading = props.isLoading ?? contextState.isLoading
  const sortOptions = props.sortOptions ?? contextState.sortOptions
  const onSortChange = props.onSortChange ?? contextUpdateSortOptions
  const eventsSelectedIds =
    props.selectedEventIds ?? contextState.eventsSelectedIds
  const onEventDetail = props.onEventDetail ?? contextHandleEventDetail
  const isAllEventsSelected =
    props.isFullSelection ?? contextIsAllEventsSelected

  const handleEventSelectCallback = useCallback(
    (eventId: number) => {
      contextSetEventsSelectedIds(prev =>
        prev.includes(eventId)
          ? prev.filter(id => id !== eventId)
          : [...prev, eventId],
      )
    },
    [contextSetEventsSelectedIds],
  )
  const handleEventSelect = props.onEventSelect ?? handleEventSelectCallback

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.eventsListLoading}>
          <div className={styles.loadingSpinner}></div>
          <p>正在加载事件数据...</p>
        </div>
      )
    }
    if (events.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <p>暂无事件数据</p>
          <span>{configErrors.INVALID_FILTER_OR_CONFIG}</span>
        </div>
      )
    }
    return events.map(event => {
      const isSelected =
        isAllEventsSelected || eventsSelectedIds.includes(event.id)

      return (
        <EventRow
          key={event.id}
          event={event}
          isSelected={isSelected}
          onSelect={handleEventSelect}
          onDetail={onEventDetail}
        />
      )
    })
  }

  return (
    <div className={styles.eventsList}>
      {/* 选择管理器 */}
      <SelectionManager
        // @ts-expect-error Temporarily ignoring prop type errors until SelectionManager is refactored.
        selectedEventIds={eventsSelectedIds}
        isFullSelection={isAllEventsSelected}
        onSelectionChange={props.onSelectionChange}
        totalCount={props.totalCount}
        events={events}
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
      <div className={styles.eventsListBody}>{renderContent()}</div>

      {/* 分页器 */}
      <div className={styles.eventsListFooter}>
        <Pagination
          // @ts-expect-error Temporarily ignoring prop type errors until Pagination is refactored.
          paginationOptions={props.paginationOptions}
          onPaginationChange={props.onPaginationChange}
        />
      </div>
    </div>
  )
}

export default React.memo(EventsList)
