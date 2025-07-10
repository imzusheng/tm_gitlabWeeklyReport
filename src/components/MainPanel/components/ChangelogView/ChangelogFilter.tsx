import React, { useState, useCallback, useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import { FilterConditions } from '@/types'
import styles from './ChangelogFilter.module.less'

/**
 * Changelog筛选器组件
 * 支持日期范围筛选和事件类型筛选
 */
interface ChangelogFilterProps {
  onFilterChange?: (filters: FilterConditions) => void
}

interface ChangelogFilterState {
  startDate: string
  endDate: string
  actionTypes: string[]
  targetTypes: string[]
}

const ChangelogFilter: React.FC<ChangelogFilterProps> = ({
  onFilterChange,
}) => {
  const { state } = useAppContext()

  const [filters, setFilters] = useState<ChangelogFilterState>({
    startDate: '',
    endDate: '',
    actionTypes: [],
    targetTypes: [],
  })

  const [isExpanded, setIsExpanded] = useState(true)

  // 从AppContext同步筛选条件
  useEffect(() => {
    const changelogFilters = state.changelogFilterConditions
    setFilters({
      startDate: changelogFilters.startDate,
      endDate: changelogFilters.endDate,
      actionTypes: changelogFilters.actionTypes,
      targetTypes: changelogFilters.targetTypes,
    })
  }, [state.changelogFilterConditions])

  // 可用的操作类型（基于GitLab Events API文档）
  const actionOptions = [
    { value: 'created', label: '创建' },
    { value: 'updated', label: '更新' },
    { value: 'closed', label: '关闭' },
    { value: 'reopened', label: '重新打开' },
    { value: 'pushed', label: '推送' },
    { value: 'commented', label: '评论' },
    { value: 'merged', label: '合并' },
    { value: 'approved', label: '批准' },
    { value: 'joined', label: '加入' },
    { value: 'left', label: '离开' },
    { value: 'deleted', label: '删除' },
  ]

  // 可用的目标类型（基于GitLab Events API文档）
  const targetTypeOptions = [
    { value: 'issue', label: 'Issue' },
    { value: 'merge_request', label: 'Merge Request' },
    { value: 'milestone', label: '里程碑' },
    { value: 'note', label: '评论' },
    { value: 'project', label: '项目' },
    { value: 'snippet', label: '代码片段' },
    { value: 'user', label: '用户' },
  ]

  const handleDateChange = useCallback(
    (field: 'startDate' | 'endDate', value: string) => {
      setFilters(prev => ({
        ...prev,
        [field]: value,
      }))
    },
    [],
  )

  const handleArrayFilterChange = useCallback(
    (field: 'actionTypes' | 'targetTypes', value: string, checked: boolean) => {
      setFilters(prev => ({
        ...prev,
        [field]: checked
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value),
      }))
    },
    [],
  )

  const handleQuickDateRange = useCallback((days: number) => {
    const end = new Date()
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)

    setFilters(prev => ({
      ...prev,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    }))
  }, [])

  const handleReset = useCallback(() => {
    const today = new Date()
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const resetFilters = {
      startDate: oneWeekAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      actionTypes: [],
      targetTypes: [],
    }

    setFilters(resetFilters)

    // 立即应用重置后的筛选条件
    onFilterChange?.({
      timeRange: {
        startDate: resetFilters.startDate,
        endDate: resetFilters.endDate,
      },
      action: resetFilters.actionTypes as FilterConditions['action'],
      targetType: resetFilters.targetTypes as FilterConditions['targetType'],
    })
  }, [onFilterChange])

  const handleApply = useCallback(() => {
    onFilterChange?.({
      timeRange: {
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
      action: filters.actionTypes as FilterConditions['action'],
      targetType: filters.targetTypes as FilterConditions['targetType'],
    })
  }, [onFilterChange, filters])

  return (
    <div className={styles.changelogFilter}>
      <div className={styles.filterHeader}>
        <h4 className={styles.filterTitle}>
          <span className={styles.filterIcon}>🔍</span>
          事件筛选
        </h4>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '收起' : '展开'}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.filterContent}>
          {/* 日期范围筛选 */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>日期范围</label>
            <div className={styles.dateRange}>
              <div className={styles.dateField}>
                <label className={styles.fieldLabel}>开始日期</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={filters.startDate}
                  onChange={e => handleDateChange('startDate', e.target.value)}
                />
              </div>
              <div className={styles.dateField}>
                <label className={styles.fieldLabel}>结束日期</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={filters.endDate}
                  onChange={e => handleDateChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* 快速日期选择 */}
            <div className={styles.quickDates}>
              <span className={styles.quickLabel}>快速选择：</span>
              <button
                className={styles.quickButton}
                onClick={() => handleQuickDateRange(7)}
              >
                最近7天
              </button>
              <button
                className={styles.quickButton}
                onClick={() => handleQuickDateRange(30)}
              >
                最近30天
              </button>
              <button
                className={styles.quickButton}
                onClick={() => handleQuickDateRange(90)}
              >
                最近90天
              </button>
            </div>
          </div>

          {/* 操作类型筛选 */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>操作类型</label>
            <div className={styles.checkboxGrid}>
              {actionOptions.map(option => (
                <label key={option.value} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.actionTypes.includes(option.value)}
                    onChange={e =>
                      handleArrayFilterChange(
                        'actionTypes',
                        option.value,
                        e.target.checked,
                      )
                    }
                  />
                  <span className={styles.checkboxLabel}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 目标类型筛选 */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>目标类型</label>
            <div className={styles.checkboxGrid}>
              {targetTypeOptions.map(option => (
                <label key={option.value} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.targetTypes.includes(option.value)}
                    onChange={e =>
                      handleArrayFilterChange(
                        'targetTypes',
                        option.value,
                        e.target.checked,
                      )
                    }
                  />
                  <span className={styles.checkboxLabel}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className={styles.filterActions}>
            <button className={styles.resetButton} onClick={handleReset}>
              重置
            </button>
            <button
              className={styles.applyButton}
              onClick={handleApply}
              disabled={state.isLoading}
            >
              {state.isLoading ? '加载中...' : '应用筛选'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(ChangelogFilter)
