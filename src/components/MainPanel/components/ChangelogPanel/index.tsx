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

interface ChangelogPanelProps {
  onStateChange?: (state: {
    selectedEventIds: number[]
    isAllEventsSelected: boolean
    totalCount: number
    events: GitLabEvent[]
  }) => void
}

const ChangelogPanel: React.FC<ChangelogPanelProps> = ({ onStateChange }) => {
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

  // 检查是否选择了全部数据
  const isAllEventsSelected = useMemo(() => {
    return (
      selectedEventIds.length === 1 &&
      selectedEventIds[0] === 0 &&
      totalCount > 0
    )
  }, [selectedEventIds, totalCount])

  // 当状态变化时通知父组件
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        selectedEventIds,
        isAllEventsSelected,
        totalCount,
        events,
      })
    }
  }, [selectedEventIds, isAllEventsSelected, totalCount, events, onStateChange])

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
    // 重置选中状态
    setSelectedEventIds([])
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
      // 如果不是全选状态，则清空选中事件（翻页时保持全选状态）
      setSelectedEventIds(prev => {
        // 如果当前是全选状态（[0]），保持全选状态
        if (prev.length === 1 && prev[0] === 0) {
          return prev
        }
        // 否则清空选中状态
        return []
      })
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

  // 暂时注释掉，使用内联逻辑
  // const onEventSelect = useCallback((eventId: number, selected: boolean) => {
  //   if (isAllEventsSelected && !selected) {
  //     // 如果是全选状态且要取消选择某个事件，则退出全选状态，选中当前页面除了该事件的所有事件
  //     const currentPageEventIds = events
  //       .filter(event => event.id !== eventId)
  //       .map(event => event.id)
  //     setSelectedEventIds(currentPageEventIds)
  //   } else if (isAllEventsSelected && selected) {
  //     // 如果是全选状态且要选择某个事件，保持全选状态（不需要操作）
  //     return
  //   } else {
  //     // 正常的选择/取消选择逻辑
  //     setSelectedEventIds(prev =>
  //       selected ? [...prev, eventId] : prev.filter(id => id !== eventId),
  //     )
  //   }
  // }, [isAllEventsSelected, events])

  // const onSelectAll = useCallback(
  //   (selected: boolean) => {
  //     if (selected) {
  //       // 全选 - 设置选中数量为总数，但不实际获取所有事件ID
  //       setSelectedEventIds([0]) // 使用一个占位符表示全选状态
  //     } else {
  //       // 取消选中所有事件
  //       setSelectedEventIds([])
  //     }
  //   },
  //   [],
  // )

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
          onSelectionChange={(selectedIds, isFullSelection) => {
            // 暂时兼容，使用内部状态管理
            setSelectedEventIds(selectedIds)
            // 如果是全选状态，设置特殊标记
            if (isFullSelection) {
              setSelectedEventIds([0]) // 使用0作为全选状态标记
            }
          }}
          isFullSelection={isAllEventsSelected}
          onEventSelect={eventId => {
            // 切换选择状态
            const isSelected = selectedEventIds.includes(eventId)
            if (isAllEventsSelected && !isSelected) {
              // 如果是全选状态且要取消选择某个事件，则退出全选状态，选中当前页面除了该事件的所有事件
              const currentPageEventIds = events
                .filter(event => event.id !== eventId)
                .map(event => event.id)
              setSelectedEventIds(currentPageEventIds)
            } else if (isAllEventsSelected && isSelected) {
              // 如果是全选状态且要选择某个事件，保持全选状态（不需要操作）
              return
            } else {
              // 正常的选择/取消选择逻辑
              setSelectedEventIds(prev =>
                isSelected
                  ? prev.filter(id => id !== eventId)
                  : [...prev, eventId],
              )
            }
          }}
          onEventDetail={() => {}}
          mode="changelog"
        />
      </div>
    </div>
  )
}

export default ChangelogPanel
