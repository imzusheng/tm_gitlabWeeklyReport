import { useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/stores/app-store'

/**
 * 事件选择管理 Hook
 */
export const useEventSelection = () => {
  const { events } = useAppStore()

  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])

  const selectedEvents = useMemo(() => {
    return events.filter(event => selectedEventIds.includes(event.id))
  }, [events, selectedEventIds])

  const isEventSelected = useCallback(
    (eventId: number) => selectedEventIds.includes(eventId),
    [selectedEventIds],
  )

  const toggleEventSelection = useCallback((eventId: number) => {
    setSelectedEventIds(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId],
    )
  }, [])

  const selectAllEvents = useCallback(() => {
    setSelectedEventIds(events.map(event => event.id))
  }, [events])

  const deselectAllEvents = useCallback(() => {
    setSelectedEventIds([])
  }, [])

  const isAllSelected = useMemo(() => {
    return events.length > 0 && selectedEventIds.length === events.length
  }, [events.length, selectedEventIds.length])

  const isIndeterminate = useMemo(() => {
    return (
      selectedEventIds.length > 0 && selectedEventIds.length < events.length
    )
  }, [selectedEventIds.length, events.length])

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      deselectAllEvents()
    } else {
      selectAllEvents()
    }
  }, [isAllSelected, selectAllEvents, deselectAllEvents])

  const selectEvents = useCallback((eventIds: number[]) => {
    setSelectedEventIds(eventIds)
  }, [])

  const selectedCount = selectedEventIds.length

  const clearSelection = useCallback(() => {
    setSelectedEventIds([])
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
