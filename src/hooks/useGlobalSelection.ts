import { useState, useCallback } from 'react'
import { GitLabEvent } from '@/types'

interface GlobalSelectionState {
  eventsSelection: number[]
  changelogSelection: number[]
  eventsIsFullSelection: boolean
  changelogIsFullSelection: boolean
}

export const useGlobalSelection = () => {
  const [selectionState, setSelectionState] = useState<GlobalSelectionState>({
    eventsSelection: [],
    changelogSelection: [],
    eventsIsFullSelection: false,
    changelogIsFullSelection: false,
  })

  // 获取指定模式的选择状态
  const getSelectionForMode = useCallback(
    (mode: 'events' | 'changelog') => {
      const key = mode === 'events' ? 'eventsSelection' : 'changelogSelection'
      const isFullKey =
        mode === 'events' ? 'eventsIsFullSelection' : 'changelogIsFullSelection'
      return {
        selectedIds: selectionState[key],
        isFullSelection: selectionState[isFullKey],
      }
    },
    [selectionState],
  )

  // 更新指定模式的选择状态
  const updateSelectionForMode = useCallback(
    (
      mode: 'events' | 'changelog',
      selectedIds: number[],
      isFullSelection: boolean,
    ) => {
      setSelectionState(prev => {
        if (mode === 'events') {
          return {
            ...prev,
            eventsSelection: selectedIds,
            eventsIsFullSelection: isFullSelection,
          }
        } else {
          return {
            ...prev,
            changelogSelection: selectedIds,
            changelogIsFullSelection: isFullSelection,
          }
        }
      })
    },
    [],
  )

  // 检查事件是否被选中
  const isEventSelected = useCallback(
    (eventId: number, mode: 'events' | 'changelog') => {
      const { selectedIds, isFullSelection } = getSelectionForMode(mode)
      return isFullSelection || selectedIds.includes(eventId)
    },
    [getSelectionForMode],
  )

  // 获取选中数量
  const getSelectedCount = useCallback(
    (mode: 'events' | 'changelog', totalCount: number) => {
      const { selectedIds, isFullSelection } = getSelectionForMode(mode)
      return isFullSelection ? totalCount : selectedIds.length
    },
    [getSelectionForMode],
  )

  // 单个事件选择切换
  const toggleEventSelection = useCallback(
    (eventId: number, mode: 'events' | 'changelog') => {
      const { selectedIds, isFullSelection } = getSelectionForMode(mode)

      if (isFullSelection) {
        // 如果是全选状态，切换为只选中这个事件（取消全选）
        updateSelectionForMode(mode, [eventId], false)
      } else {
        // 普通状态下的切换
        const isSelected = selectedIds.includes(eventId)
        const newSelectedIds = isSelected
          ? selectedIds.filter(id => id !== eventId)
          : [...selectedIds, eventId]
        updateSelectionForMode(mode, newSelectedIds, false)
      }
    },
    [getSelectionForMode, updateSelectionForMode],
  )

  // 获取实际选中的事件（用于AI生成）
  const getSelectedEvents = useCallback(
    (
      mode: 'events' | 'changelog',
      allEvents: GitLabEvent[],
      fetchAllEventsCallback?: () => Promise<GitLabEvent[]>,
    ) => {
      const { selectedIds, isFullSelection } = getSelectionForMode(mode)

      if (isFullSelection) {
        // 全选状态，需要获取所有事件
        return fetchAllEventsCallback
          ? fetchAllEventsCallback()
          : Promise.resolve(allEvents)
      } else {
        // 部分选择，从当前数据中筛选
        const selectedEvents = allEvents.filter(event =>
          selectedIds.includes(event.id),
        )
        return Promise.resolve(selectedEvents)
      }
    },
    [getSelectionForMode],
  )

  // 清空指定模式的选择
  const clearSelection = useCallback(
    (mode: 'events' | 'changelog') => {
      updateSelectionForMode(mode, [], false)
    },
    [updateSelectionForMode],
  )

  // 清空所有选择
  const clearAllSelections = useCallback(() => {
    setSelectionState({
      eventsSelection: [],
      changelogSelection: [],
      eventsIsFullSelection: false,
      changelogIsFullSelection: false,
    })
  }, [])

  return {
    selectionState,
    getSelectionForMode,
    updateSelectionForMode,
    isEventSelected,
    getSelectedCount,
    toggleEventSelection,
    getSelectedEvents,
    clearSelection,
    clearAllSelections,
  }
}
