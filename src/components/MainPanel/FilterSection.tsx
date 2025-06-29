import type { FilterConditions } from '@/types'
import styles from './index.module.less'

interface FilterSectionProps {
  filterConditions: FilterConditions
  onFilterChange: (filters: FilterConditions) => void
}

const timeRangeOptions = [
  { value: 'week', label: '本周' },
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: '90d', label: '最近90天' },
  { value: '180d', label: '最近180天' },
  { value: '365d', label: '最近365天' },
]

const targetTypeOptions = [
  // { value: 'epic', label: 'Epic (需要启用新外观)' },
  { value: 'issue', label: 'Issue' },
  { value: 'merge_request', label: 'Merge Request' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'note', label: 'Note' },
  { value: 'project', label: 'Project' },
  { value: 'snippet', label: 'Snippet' },
  { value: 'user', label: 'User' },
]

const actionOptions = [
  { value: 'created', label: 'Created' },
  { value: 'updated', label: 'Updated' },
  { value: 'closed', label: 'Closed' },
  { value: 'reopened', label: 'Reopened' },
  { value: 'pushed', label: 'Pushed' },
  { value: 'commented', label: 'Commented' },
  { value: 'merged', label: 'Merged' },
  { value: 'approved', label: 'Approved' },
  { value: 'joined', label: 'Joined' },
  { value: 'left', label: 'Left' },
  { value: 'deleted', label: 'Deleted' },
]

const FilterSection: React.FC<FilterSectionProps> = ({
  filterConditions,
  onFilterChange,
}) => {
  const handleTimeRangeChange = (timeRange: FilterConditions['timeRange']) => {
    onFilterChange({
      ...filterConditions,
      timeRange,
    })
  }

  /**
   * 处理目标类型筛选条件变化
   * @param targetType 目标类型值
   * @param checked 是否选中
   */
  const handleTargetTypeChange = (targetType: string, checked: boolean) => {
    const newTargetType = checked
      ? [
          ...filterConditions.targetType,
          targetType as FilterConditions['targetType'][0],
        ]
      : filterConditions.targetType.filter(type => type !== targetType)

    onFilterChange({
      ...filterConditions,
      targetType: newTargetType,
    })
  }

  /**
   * 处理操作类型筛选条件变化
   * @param action 操作类型值
   * @param checked 是否选中
   */
  const handleActionChange = (action: string, checked: boolean) => {
    const newAction = checked
      ? [...filterConditions.action, action as FilterConditions['action'][0]]
      : filterConditions.action.filter(a => a !== action)

    onFilterChange({
      ...filterConditions,
      action: newAction,
    })
  }

  return (
    <div className={styles.filterSectionContent}>
      {/* 时间范围 */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>时间范围</label>
        <div className={styles.filterOptions}>
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.filterOption} ${filterConditions.timeRange === option.value ? styles.active : ''}`}
              onClick={() =>
                handleTimeRangeChange(
                  option.value as FilterConditions['timeRange'],
                )
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 目标类型 */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>目标类型</label>
        <div className={styles.filterOptions}>
          <button
            className={`${styles.filterOption} ${filterConditions.targetType.length === 0 ? styles.active : ''}`}
            onClick={() =>
              onFilterChange({ ...filterConditions, targetType: [] })
            }
          >
            全部
          </button>
          {targetTypeOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.filterOption} ${filterConditions.targetType.includes(option.value as FilterConditions['targetType'][number]) ? styles.active : ''}`}
              onClick={() =>
                handleTargetTypeChange(
                  option.value,
                  !filterConditions.targetType.includes(
                    option.value as FilterConditions['targetType'][number],
                  ),
                )
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 操作类型 */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>操作类型</label>
        <div className={styles.filterOptions}>
          <button
            className={`${styles.filterOption} ${filterConditions.action.length === 0 ? styles.active : ''}`}
            onClick={() => onFilterChange({ ...filterConditions, action: [] })}
          >
            全部
          </button>
          {actionOptions.map(option => (
            <button
              key={option.value}
              className={`${styles.filterOption} ${filterConditions.action.includes(option.value as FilterConditions['action'][number]) ? styles.active : ''}`}
              onClick={() =>
                handleActionChange(
                  option.value,
                  !filterConditions.action.includes(
                    option.value as FilterConditions['action'][number],
                  ),
                )
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSection
