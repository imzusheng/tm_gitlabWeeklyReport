import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/stores/app-store'

/**
 * 事件选择管理 Hook
 * 负责管理事件的选择状态
 */
export const useEventSelection = () => {
  const { events, appMode } = useAppStore()

  // Events 模式的选择状态
  const [eventsSelectedIds, setEventsSelectedIds] = useState<number[]>([])

  // Changelog 模式的选择状态
  const [changelogSelectedIds, setChangelogSelectedIds] = useState<number[]>([])

  // 根据当前模式获取选中的事件 ID
  const selectedEventIds = useMemo(() => {
    return appMode === 'events' ? eventsSelectedIds : changelogSelectedIds
  }, [appMode, eventsSelectedIds, changelogSelectedIds])

  // 根据当前模式设置选中的事件 ID
  const setSelectedEventIds = useCallback(
    (updater: number[] | ((prev: number[]) => number[])) => {
      if (appMode === 'events') {
        setEventsSelectedIds(updater)
      } else {
        setChangelogSelectedIds(updater)
      }
    },
    [appMode],
  )

  // 获取选中的事件对象
  const selectedEvents = useMemo(() => {
    return events.filter(event => selectedEventIds.includes(event.id))
  }, [events, selectedEventIds])

  // 检查事件是否被选中
  const isEventSelected = useCallback(
    (eventId: number) => {
      return selectedEventIds.includes(eventId)
    },
    [selectedEventIds],
  )

  // 切换事件选择状态
  const toggleEventSelection = useCallback(
    (eventId: number) => {
      setSelectedEventIds(prev => {
        if (prev.includes(eventId)) {
          return prev.filter(id => id !== eventId)
        } else {
          return [...prev, eventId]
        }
      })
    },
    [setSelectedEventIds],
  )

  // 选择所有事件
  const selectAllEvents = useCallback(() => {
    setSelectedEventIds(events.map(event => event.id))
  }, [events, setSelectedEventIds])

  // 取消选择所有事件
  const deselectAllEvents = useCallback(() => {
    setSelectedEventIds([])
  }, [setSelectedEventIds])

  // 检查是否全选
  const isAllSelected = useMemo(() => {
    return events.length > 0 && selectedEventIds.length === events.length
  }, [events.length, selectedEventIds.length])

  // 检查是否部分选择
  const isIndeterminate = useMemo(() => {
    return (
      selectedEventIds.length > 0 && selectedEventIds.length < events.length
    )
  }, [selectedEventIds.length, events.length])

  // 切换全选状态
  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      deselectAllEvents()
    } else {
      selectAllEvents()
    }
  }, [isAllSelected, selectAllEvents, deselectAllEvents])

  // 批量选择事件
  const selectEvents = useCallback(
    (eventIds: number[]) => {
      setSelectedEventIds(eventIds)
    },
    [setSelectedEventIds],
  )

  // 获取选中事件数量
  const selectedCount = selectedEventIds.length

  // 清空选择（在模式切换时使用）
  const clearSelection = useCallback(() => {
    setEventsSelectedIds([])
    setChangelogSelectedIds([])
  }, [])

  return {
    selectedEventIds,
    selectedEvents,
    selectedCount,
    isEventSelected,
    toggleEventSelection,
    selectAllEvents,
    deselectAllEvents,
    isAllSelected,
    isIndeterminate,
    toggleSelectAll,
    selectEvents,
    clearSelection,
  }
}
