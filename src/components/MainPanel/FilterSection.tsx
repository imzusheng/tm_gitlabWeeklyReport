import React from 'react'
import { FilterConditions } from '@/types'

interface FilterSectionProps {
  filterConditions: FilterConditions
  onFilterChange: (filters: FilterConditions) => void
}

const timeRangeOptions = [
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: '90d', label: '最近90天' },
  { value: '180d', label: '最近180天' },
  { value: '365d', label: '最近365天' }
]

const eventTypeOptions = [
  { value: 'MergeRequest', label: 'Merge Request' },
  { value: 'Issue', label: 'Issue' },
  { value: 'Commit', label: 'Commit' },
  { value: 'Push', label: 'Push' },
  { value: 'Note', label: 'Comment' }
]

const eventStatusOptions = [
  { value: 'opened', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'merged', label: 'Merged' }
]



const FilterSection: React.FC<FilterSectionProps> = ({
  filterConditions,
  onFilterChange
}) => {
  const handleTimeRangeChange = (timeRange: FilterConditions['timeRange']) => {
    onFilterChange({
      ...filterConditions,
      timeRange
    })
  }

  const handleEventTypesChange = (eventType: string, checked: boolean) => {
    const newEventTypes = checked
      ? [...filterConditions.eventTypes, eventType]
      : filterConditions.eventTypes.filter(type => type !== eventType)
    
    onFilterChange({
      ...filterConditions,
      eventTypes: newEventTypes
    })
  }

  const handleEventStatusChange = (status: string, checked: boolean) => {
    const newEventStatus = checked
      ? [...filterConditions.eventStatus, status]
      : filterConditions.eventStatus.filter(s => s !== status)
    
    onFilterChange({
      ...filterConditions,
      eventStatus: newEventStatus
    })
  }

  return (
    <div className="filter-section-content">
      {/* 时间范围 */}
      <div className="filter-group">
        <label className="filter-label">时间范围</label>
        <div className="filter-options">
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filterConditions.timeRange === option.value ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange(option.value as FilterConditions['timeRange'])}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 事件类型 */}
      <div className="filter-group">
        <label className="filter-label">事件类型</label>
        <div className="filter-options">
          <button
            className={`filter-option ${filterConditions.eventTypes.length === 0 ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filterConditions, eventTypes: [] })}
          >
            全部
          </button>
          {eventTypeOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filterConditions.eventTypes.includes(option.value) ? 'active' : ''}`}
              onClick={() => handleEventTypesChange(option.value, !filterConditions.eventTypes.includes(option.value))}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 事件状态 */}
      <div className="filter-group">
        <label className="filter-label">事件状态</label>
        <div className="filter-options">
          <button
            className={`filter-option ${filterConditions.eventStatus.length === 0 ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filterConditions, eventStatus: [] })}
          >
            全部
          </button>
          {eventStatusOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filterConditions.eventStatus.includes(option.value) ? 'active' : ''}`}
              onClick={() => handleEventStatusChange(option.value, !filterConditions.eventStatus.includes(option.value))}
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