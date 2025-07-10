import React, { useCallback } from 'react'
import { GitLabEvent } from '@/types'
import { eventUtils } from '@/utils'
import styles from './index.module.less'

export interface EventRowProps {
  event: GitLabEvent
  isSelected: boolean
  onSelect: (eventId: number) => void
  onDetail: (event: GitLabEvent) => void
}

/**
 * 事件行组件
 * 负责单条事件的渲染
 */
const EventRow: React.FC<EventRowProps> = ({
  event,
  isSelected,
  onSelect,
  onDetail,
}) => {
  const handleSelect = useCallback(() => {
    onSelect(event.id)
  }, [onSelect, event.id])

  const handleDetail = useCallback(() => {
    onDetail(event)
  }, [onDetail, event])

  const { icon, title, actionType } = eventUtils.getEventDisplayInfo(event)
  const content = eventUtils.getEventContent(event)
  const formattedTime = eventUtils.formatEventDate(event.created_at)

  return (
    <div className={`${styles.eventRow} ${isSelected ? styles.selected : ''}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            title={isSelected ? '取消选择' : '选择此事件'}
          />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div className={`${styles.cell} ${styles.contentCell}`}>
        <div className={styles.eventIcon}>{icon}</div>
        <div className={styles.eventContent}>
          <div className={styles.eventTitle}>{title}</div>
          <div className={styles.eventDescription}>{content}</div>
        </div>
      </div>
      <div className={`${styles.cell} ${styles.actionCell}`}>
        <span className={styles.actionTag}>{actionType}</span>
      </div>
      <div className={`${styles.cell} ${styles.timeCell}`}>
        <span className={styles.eventTime}>{formattedTime}</span>
      </div>
      <div className={`${styles.cell} ${styles.detailCell}`}>
        <button
          className={styles.detailBtn}
          onClick={handleDetail}
          title="查看详情"
        >
          <span className={styles.detailIcon}>🔍</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(EventRow)
