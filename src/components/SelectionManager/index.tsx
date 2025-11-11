import React, { useCallback, useMemo } from 'react'
import { GitLabEvent } from '@/types'
import styles from './index.module.less'

interface SelectionManagerProps {
  currentPageEvents: GitLabEvent[]
  selectedEventIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  loading?: boolean
}

const SelectionManager: React.FC<SelectionManagerProps> = ({
  currentPageEvents,
  selectedEventIds,
  totalCount,
  onSelectAll,
  onClearSelection,
  loading = false,
}) => {
  const currentPageIds = useMemo(
    () => currentPageEvents.map(event => event.id),
    [currentPageEvents],
  )

  const currentPageSelected = useMemo(() => {
    return (
      currentPageIds.length > 0 &&
      currentPageIds.every(id => selectedEventIds.includes(id))
    )
  }, [currentPageIds, selectedEventIds])

  const selectionInfo = useMemo(() => {
    return {
      count: selectedEventIds.length,
      text: `已选中 ${selectedEventIds.length} 条`,
    }
  }, [selectedEventIds.length])

  const handleSelectAll = useCallback(() => {
    if (!currentPageSelected) {
      onSelectAll()
    }
  }, [currentPageSelected, onSelectAll])

  const handleClearAll = useCallback(() => {
    if (selectedEventIds.length > 0) {
      onClearSelection()
    }
  }, [onClearSelection, selectedEventIds.length])

  return (
    <div className={styles.selectionManager}>
      <div className={styles.selectionInfo}>
        <span className={styles.selectionCount}>
          {selectionInfo.text}
          {totalCount > 0 ? ` / 共 ${totalCount} 条` : ''}
        </span>
      </div>

      <div className={styles.selectionActions}>
        {/* 全局操作 */}
        <div className={styles.actionGroup}>
          <span className={styles.groupLabel}>全部:</span>
          <button
            className={`${styles.actionBtn} ${styles.selectAllBtn}`}
            onClick={handleSelectAll}
            disabled={
              loading || currentPageSelected || currentPageIds.length === 0
            }
            title="选择当前页全部事件"
          >
            全选
          </button>
          <button
            className={`${styles.actionBtn} ${styles.clearBtn}`}
            onClick={handleClearAll}
            disabled={loading || selectionInfo.count === 0}
            title="清空选择"
          >
            清空
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SelectionManager)
