import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppState } from '@/hooks/useAppState'
import { useAbortableRequest } from '@/hooks/useAbortableRequest'
import { createGitLabApiService } from '@/services/gitlab-api'
import EventsList from '../EventsList'
import ProjectSelector from '@/components/ProjectSelector'
import type { GitLabEvent, SortOptions, PaginationOptions } from '@/types'
import { errorUtils } from '@/utils'
import styles from './index.module.less'

// 本地存储键名
const SELECTED_PROJECT_KEY = 'gitlab-changelog-selected-project'

const ChangelogPanel: React.FC = () => {
  const { state, isConfigValid } = useAppState()
  const { createRequest, isRequestCancelled, cleanupRequest, isAbortError } =
    useAbortableRequest()

  const gitlabService = useMemo(() => {
    return createGitLabApiService(
      state.config.gitlabUrl,
      state.config.gitlabToken,
    )
  }, [state.config.gitlabUrl, state.config.gitlabToken])

  // 从 localStorage 读取上次选中的项目
  const [selectedProject, setSelectedProject] = useState<number | null>(() => {
    const saved = localStorage.getItem(SELECTED_PROJECT_KEY)
    return saved ? parseInt(saved, 10) : null
  })
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

  // 项目选择处理函数
  const handleProjectSelect = useCallback((projectId: number | null) => {
    setSelectedProject(projectId)
    // 保存到 localStorage
    if (projectId) {
      localStorage.setItem(SELECTED_PROJECT_KEY, projectId.toString())
    } else {
      localStorage.removeItem(SELECTED_PROJECT_KEY)
    }
    // 重置分页到第一页
    setPaginationOptions(prev => ({ ...prev, page: 1 }))
  }, [])

  const fetchEvents = useCallback(async () => {
    if (!isConfigValid() || !selectedProject) {
      setEvents([])
      setTotalCount(0)
      return
    }

    const abortController = createRequest()
    setLoading(true)

    try {
      await gitlabService.init()
      const params = {
        page: paginationOptions.page,
        per_page: paginationOptions.pageSize,
        sort: sortOptions.order,
        signal: abortController.signal,
      }

      const { events, total } = await gitlabService.getProjectEventsWithTotal(
        selectedProject,
        params,
      )

      if (isRequestCancelled(abortController)) return

      setEvents(events)
      setSelectedEventIds(events.map(event => event.id))
      setTotalCount(total)
    } catch (error) {
      if (isAbortError(error)) return

      console.error(
        '❌ [ChangelogPanel] Failed to fetch events:',
        errorUtils.formatErrorMessage(error),
      )
      setEvents([])
      setTotalCount(0)
    } finally {
      if (!isRequestCancelled(abortController)) {
        setLoading(false)
      }
      cleanupRequest(abortController)
    }
  }, [
    isConfigValid,
    gitlabService,
    selectedProject,
    paginationOptions,
    sortOptions,
    createRequest,
    isRequestCancelled,
    isAbortError,
    cleanupRequest,
  ])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

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
    <div className={styles.changelogPanel}>
      <div className={styles.projectSelectorContainer}>
        <ProjectSelector
          gitlabService={gitlabService}
          selectedProjectId={selectedProject}
          onProjectSelect={handleProjectSelect}
          isConfigValid={isConfigValid}
          autoLoad={true}
        />
      </div>
      <div className={styles.eventsListContainer}>
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
      </div>
    </div>
  )
}

export default ChangelogPanel
