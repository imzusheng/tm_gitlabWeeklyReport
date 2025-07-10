import React, { useCallback, useMemo, useEffect, useRef } from 'react'
import { useAppContext } from '@/context/AppContext'
import styles from './index.module.less'

const SelectionManager: React.FC = () => {
  const {
    state,
    setEventsSelectedIds,
    isAllEventsSelected: isFullSelection,
  } = useAppContext()
  const { events: currentPageEvents, totalCount, isLoading: loading } = state
  const selectedEventIds = state.eventsSelectedIds

  const onSelectionChange = useCallback(
    (selectedIds: number[], isFullSelection: boolean) => {
      if (isFullSelection) {
        setEventsSelectedIds([0]) // 0 as the full selection flag
      } else {
        setEventsSelectedIds(selectedIds)
      }
    },
    [setEventsSelectedIds],
  )

  // 用于跟踪是否是用户主动清空的标记
  const userClearedRef = useRef(false)
  // 用于跟踪是否已经初始化过的标记
  const hasInitializedRef = useRef(false)

  // 当前页面的事件ID
  const currentPageEventIds = useMemo(() => {
    return currentPageEvents.map(event => event.id)
  }, [currentPageEvents])

  // 计算选中数量显示
  const selectionInfo = useMemo(() => {
    if (isFullSelection) {
      return {
        count: totalCount,
        text: `已全选 ${totalCount} 条`,
      }
    }
    // 排除0标记计算真实的选中数量
    const realSelectedCount = selectedEventIds.filter(id => id !== 0).length
    return {
      count: realSelectedCount,
      text: `已选中 ${realSelectedCount} 条`,
    }
  }, [isFullSelection, totalCount, selectedEventIds])

  // 自动选中当前页（仅在真正的初始化时）
  useEffect(() => {
    if (currentPageEventIds.length > 0 && !isFullSelection && !loading) {
      const filteredSelectedIds = selectedEventIds.filter(id => id !== 0)

      if (
        !hasInitializedRef.current &&
        filteredSelectedIds.length === 0 &&
        !userClearedRef.current
      ) {
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
    userClearedRef.current = false
    onSelectionChange([0], true)
  }, [onSelectionChange])

  // 取消全选
  const handleClearAll = useCallback(() => {
    userClearedRef.current = true
    onSelectionChange([], false)
  }, [onSelectionChange])

  return (
    <div className={styles.selectionManager}>
      <div className={styles.selectionInfo}>
        <span className={styles.selectionCount}>{selectionInfo.text}</span>
      </div>

      <div className={styles.selectionActions}>
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
