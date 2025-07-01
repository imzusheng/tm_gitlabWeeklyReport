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
  const handleFilterChange = <K extends keyof FilterConditions>(
    key: K,
    value: FilterConditions[K],
  ) => {
    onFilterChange({ ...filterConditions, [key]: value })
  }

  const handleMultiSelectChange = (
    key: 'targetType' | 'action',
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filterConditions[key]
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value)
    handleFilterChange(
      key,
      newValues as FilterConditions['targetType'] & FilterConditions['action'],
    )
  }

  return (
    <div className={styles.filterSectionContent}>
      {/* 时间范围 */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>时间范围</label>
        <div className={styles.filterOptions}>
          {timeRangeOptions.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.filterOption} ${filterConditions.timeRange === value ? styles.active : ''}`}
              onClick={() =>
                handleFilterChange(
                  'timeRange',
                  value as FilterConditions['timeRange'],
                )
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {[
        { key: 'targetType', label: '目标类型', options: targetTypeOptions },
        { key: 'action', label: '操作类型', options: actionOptions },
      ].map(({ key, label, options }) => (
        <div className={styles.filterGroup} key={key}>
          <label className={styles.filterLabel}>{label}</label>
          <div className={styles.filterOptions}>
            <button
              className={`${styles.filterOption} ${filterConditions[key].length === 0 ? styles.active : ''}`}
              onClick={() => handleFilterChange(key, [])}
            >
              全部
            </button>
            {options.map(({ value, label: optionLabel }) => (
              <button
                key={value}
                className={`${styles.filterOption} ${filterConditions[key].includes(value) ? styles.active : ''}`}
                onClick={() =>
                  handleMultiSelectChange(
                    key,
                    value,
                    !filterConditions[key].includes(value),
                  )
                }
              >
                {optionLabel}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FilterSection
