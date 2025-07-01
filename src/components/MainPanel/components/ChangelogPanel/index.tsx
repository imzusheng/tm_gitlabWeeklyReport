import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'
import { createGitLabApiService } from '@/services/gitlab-api'
import EventsList from '../EventsList'
import type { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import { errorUtils } from '@/utils'

const ChangelogPanel: React.FC = () => {
  const { state, isConfigValid } = useAppState()

  // 使用可取消请求Hook
  const { createRequest, isRequestCancelled, cleanupRequest, isAbortError } =
    useAbortableRequest()

  const gitlabService = useMemo(() => {
    return createGitLabApiService(
      state.config.gitlabUrl,
      state.config.gitlabToken,
    )
  }, [state.config.gitlabUrl, state.config.gitlabToken])

  const [events, setEvents] = useState<GitLabEvent[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'created_at',
    order: 'desc',
  })
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>(
    { page: 1, pageSize: 20, total: 0 },
  )
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])

  const fetchEvents = useCallback(async () => {
    if (!isConfigValid()) {
      console.error('GitLab configuration is invalid')
      return
    }

    // 创建新请求并取消之前的请求
    const abortController = createRequest()

    setLoading(true)

    try {
      // 确保GitLab服务已初始化
      await gitlabService.init()

      const currentUser = await gitlabService.getCurrentUser()
      const params = {
        page: paginationOptions.page,
        per_page: paginationOptions.pageSize,
        sort: sortOptions.order,
        signal: abortController.signal, // 传递 abort signal
      }

      // 获取用户事件数据和总数
      const { events, total } = await gitlabService.getUserEventsWithTotal(
        currentUser.id,
        params,
      )

      // 检查请求是否被取消
      if (isRequestCancelled(abortController)) {
        return
      }

      setEvents(events)
      setSelectedEventIds(events.map(event => event.id))
      setTotalCount(total)
    } catch (error) {
      // 忽略被取消的请求错误
      if (isAbortError(error)) {
        return
      }

      const errorMessage = errorUtils.formatErrorMessage(error)
      console.error('Failed to fetch events:', errorMessage)
      setEvents([])
      setTotalCount(0)
    } finally {
      // 只有当前请求才设置 loading 为 false
      if (!isRequestCancelled(abortController)) {
        setLoading(false)
      }

      // 清理引用
      cleanupRequest(abortController)
    }
  }, [
    isConfigValid,
    gitlabService,
    paginationOptions.page,
    paginationOptions.pageSize,
    sortOptions.order,
    createRequest,
    isRequestCancelled,
    isAbortError,
    cleanupRequest,
  ])

  useEffect(() => {
    if (isConfigValid()) {
      fetchEvents()
    }
  }, [isConfigValid, fetchEvents])

  const onSortChange = useCallback((newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions)
  }, [])

  const onPaginationChange = useCallback(
    (newPaginationOptions: PaginationOptions) => {
      setPaginationOptions(newPaginationOptions)
    },
    [],
  )

  const onEventSelect = useCallback((eventId: number, selected: boolean) => {
    setSelectedEventIds(prev =>
      selected ? [...prev, eventId] : prev.filter(id => id !== eventId),
    )
  }, [])

  const onSelectAll = useCallback(
    (selected: boolean) => {
      setSelectedEventIds(selected ? events.map(e => e.id) : [])
    },
    [events],
  )

  return (
    <EventsList
      events={events}
      totalCount={totalCount}
      loading={loading}
      sortOptions={sortOptions}
      onSortChange={onSortChange}
      paginationOptions={paginationOptions}
      onPaginationChange={onPaginationChange}
      selectedEventIds={selectedEventIds}
      onEventSelect={onEventSelect}
      onSelectAll={onSelectAll}
      onEventDetail={() => {}}
    />
  )
}

export default ChangelogPanel
