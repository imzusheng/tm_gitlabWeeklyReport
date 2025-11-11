import { useCallback } from 'react'
import { useAppStore } from '@/store'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'
import { createGitLabApiService } from '@/services/gitlab-api'
import { configErrors } from '@/utils'
import type { FilterConditions, SortOptions, PaginationOptions } from '@/types'

/**
 * 事件管理 Hook
 * 负责加载、筛选和管理 GitLab 事件数据
 */
export const useEventManagement = () => {
  const { createRequest, isRequestCancelled, isAbortError } =
    useAbortableRequest()

  /**
   * 加载 GitLab 事件数据
   */
  const loadEvents = useCallback(async () => {
    const {
      config,
      validateConfig,
      setError,
      setLoading,
      getTimeRange,
      filterConditions,
      sortOptions,
      paginationOptions,
      setEvents,
      setTotalCount,
    } = useAppStore.getState()

    if (!validateConfig()) {
      setError(configErrors.INVALID_FILTER_OR_CONFIG)
      return
    }

    const abortController = createRequest()
    setLoading(true)
    setError(null)

    try {
      const gitlabService = createGitLabApiService(
        config.gitlabUrl,
        config.gitlabToken,
      )
      const currentUser = await gitlabService.init()

      const { startDate, endDate } = getTimeRange()
      const targetTypes =
        filterConditions.targetType?.length > 0
          ? filterConditions.targetType
          : undefined
      const actions =
        filterConditions.action?.length > 0
          ? filterConditions.action
          : undefined
      const sort = sortOptions.order || 'desc'

      const params = {
        after: startDate.toISOString(),
        before: endDate.toISOString(),
        target_type: targetTypes,
        action: actions,
        page: paginationOptions.page,
        per_page: paginationOptions.pageSize,
        sort,
        signal: abortController.signal,
      }

      const { events, total } = await gitlabService.getUserEventsWithTotal(
        currentUser.id,
        params,
      )

      if (isRequestCancelled(abortController)) {
        return
      }

      setEvents(events)
      setTotalCount(total)
    } catch (error) {
      if (isRequestCancelled(abortController) || isAbortError(error)) {
        return
      }

      console.error('Failed to load events:', error)
      setError(error instanceof Error ? error.message : '加载事件数据失败')
    } finally {
      setLoading(false)
    }
  }, [createRequest, isRequestCancelled, isAbortError])

  /**
   * 重新加载事件数据
   */
  const reloadEvents = useCallback(() => {
    loadEvents()
  }, [loadEvents])

  /**
   * 处理筛选条件变化
   */
  const handleFilterChange = useCallback(
    (newFilters: Partial<FilterConditions>) => {
      const { setFilterConditions, setPaginationOptions } =
        useAppStore.getState()
      setFilterConditions(newFilters)
      // 重置到第一页
      setPaginationOptions({ page: 1 })
      loadEvents()
    },
    [loadEvents],
  )

  /**
   * 处理排序变化
   */
  const handleSortChange = useCallback(
    (newSort: Partial<SortOptions>) => {
      const { setSortOptions, setPaginationOptions } = useAppStore.getState()
      setSortOptions(newSort)
      // 重置到第一页
      setPaginationOptions({ page: 1 })
      loadEvents()
    },
    [loadEvents],
  )

  /**
   * 处理分页变化
   */
  const handlePaginationChange = useCallback(
    (newPagination: Partial<PaginationOptions>) => {
      const { setPaginationOptions } = useAppStore.getState()
      setPaginationOptions(newPagination)
      loadEvents()
    },
    [loadEvents],
  )

  return {
    loadEvents,
    reloadEvents,
    handleFilterChange,
    handleSortChange,
    handlePaginationChange,
  }
}
