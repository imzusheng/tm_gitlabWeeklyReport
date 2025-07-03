import React, { useCallback, useMemo, useEffect, useRef } from 'react'
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
  currentPageEvents,
  selectedEventIds,
  totalCount,
  onSelectionChange,
  loading = false,
}) => {
  // 用于跟踪是否是用户主动清空的标记
  const userClearedRef = useRef(false)
  // 用于跟踪是否已经初始化过的标记
  const hasInitializedRef = useRef(false)

  // 当前页面的事件ID
  const currentPageEventIds = useMemo(() => {
    return currentPageEvents.map(event => event.id)
  }, [currentPageEvents])

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

  // 自动选中当前页（仅在真正的初始化时）
  useEffect(() => {
    if (currentPageEventIds.length > 0 && !isFullSelection && !loading) {
      const filteredSelectedIds = selectedEventIds.filter(id => id !== -1)

      // 只有在以下情况下才自动选中当前页：
      // 1. 从未初始化过
      // 2. 选择列表为空
      // 3. 不是用户主动清空的
      if (
        !hasInitializedRef.current &&
        filteredSelectedIds.length === 0 &&
        !userClearedRef.current
      ) {
        console.log('SelectionManager: 初始化自动选择当前页')
        const newSelectedIds = [...currentPageEventIds]
        onSelectionChange(newSelectedIds, false)
        hasInitializedRef.current = true
      }
    }
  }, [
    currentPageEventIds,
    selectedEventIds,
    isFullSelection,
    loading,
    onSelectionChange,
  ])

  // 监听selectedEventIds的变化，重置用户清空标记
  useEffect(() => {
    if (selectedEventIds.length > 0) {
      userClearedRef.current = false
    }
  }, [selectedEventIds])

  // 全选
  const handleSelectAll = useCallback(() => {
    console.log('SelectionManager: 点击全选按钮')
    userClearedRef.current = false // 重置清空标记
    onSelectionChange([-1], true) // 使用-1作为全选标记
  }, [onSelectionChange])

  // 取消全选
  const handleClearAll = useCallback(() => {
    console.log('SelectionManager: 点击清空按钮')
    userClearedRef.current = true // 设置用户清空标记
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
