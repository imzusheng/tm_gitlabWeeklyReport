import React from 'react'
import EventsList from '../EventsList'
import ChangelogFilter from './ChangelogFilter'
import { useAppContext } from '@/context/AppContext'
import { FilterConditions } from '@/types'
import styles from './index.module.less'

/**
 * 简单的项目选择器组件
 */
const SimpleProjectSelector: React.FC = () => {
  const { state, setSelectedProjectId, loadProjects } = useAppContext()

  // 在组件挂载时加载项目列表
  React.useEffect(() => {
    if (state.projects.length === 0 && !state.isLoading) {
      loadProjects()
    }
  }, [state.projects.length, state.isLoading, loadProjects])

  const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value ? Number(event.target.value) : null
    setSelectedProjectId(projectId)
  }

  return (
    <div className={styles.projectSelector}>
      <label className={styles.label}>选择项目：</label>
      <select
        className={styles.select}
        value={state.selectedProjectId || ''}
        onChange={handleProjectSelect}
        disabled={state.isLoading}
      >
        <option value="">请选择项目</option>
        {state.projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.path_with_namespace}
          </option>
        ))}
      </select>
      {state.isLoading && <span className={styles.loading}>加载中...</span>}
    </div>
  )
}

/**
 * Changelog 模式视图组件
 * 负责 Changelog 模式下的项目选择、筛选和事件展示
 */
const ChangelogView: React.FC = () => {
  const { setChangelogFilterConditions } = useAppContext()

  const handleFilterChange = React.useCallback(
    (filters: FilterConditions) => {
      const timeRange = filters.timeRange
      const changelogFilters = {
        startDate: typeof timeRange === 'object' ? timeRange.startDate : '',
        endDate: typeof timeRange === 'object' ? timeRange.endDate : '',
        actionTypes: filters.action || [],
        targetTypes: filters.targetType || [],
      }
      setChangelogFilterConditions(changelogFilters)
    },
    [setChangelogFilterConditions],
  )

  return (
    <div className={styles.changelogView}>
      {/* 项目选择部分 */}
      <div className={styles.projectSection}>
        <SimpleProjectSelector />
      </div>

      {/* 筛选器部分 */}
      <div className={styles.filterSection}>
        <ChangelogFilter onFilterChange={handleFilterChange} />
      </div>

      {/* 事件列表部分 */}
      <div className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <EventsList />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChangelogView)
