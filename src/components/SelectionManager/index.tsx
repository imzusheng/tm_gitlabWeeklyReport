import React, { useCallback, useMemo } from 'react'
import { GitLabEvent } from '@/types'
import styles from './index.module.less'

interface SelectionManagerProps {
  currentPageEvents: GitLabEvent[]
  selectedEventIds: number[]
  totalCount: number
  onSelectionChange: (selectedIds: number[], isFullSelection: boolean) => void
  loading?: boolean
}

const SelectionManager: React.FC<SelectionManagerProps> = ({
  currentPageEvents: _currentPageEvents,
  selectedEventIds,
  totalCount,
  onSelectionChange,
  loading = false,
}) => {
  // 检查是否全选（使用特殊标记-1表示全选状态）
  const isFullSelection = useMemo(() => {
    return selectedEventIds.includes(-1)
  }, [selectedEventIds])

  // 计算选中数量显示
  const selectionInfo = useMemo(() => {
    if (isFullSelection) {
      return {
        count: totalCount,
        text: `已全选 ${totalCount} 条`,
      }
    }
    // 排除-1标记计算真实的选中数量
    const realSelectedCount = selectedEventIds.filter(id => id !== -1).length
    return {
      count: realSelectedCount,
      text: `已选中 ${realSelectedCount} 条`,
    }
  }, [isFullSelection, totalCount, selectedEventIds])

  // 全选
  const handleSelectAll = useCallback(() => {
    onSelectionChange([-1], true) // 使用-1作为全选标记
  }, [onSelectionChange])

  // 取消全选
  const handleClearAll = useCallback(() => {
    onSelectionChange([], false)
  }, [onSelectionChange])

  return (
    <div className={styles.selectionManager}>
      <div className={styles.selectionInfo}>
        <span className={styles.selectionCount}>{selectionInfo.text}</span>
      </div>

      <div className={styles.selectionActions}>
        {/* 全局操作 */}
        <div className={styles.actionGroup}>
          <span className={styles.groupLabel}>全部:</span>
          <button
            className={`${styles.actionBtn} ${styles.selectAllBtn}`}
            onClick={handleSelectAll}
            disabled={loading || isFullSelection}
            title="选择所有数据"
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
