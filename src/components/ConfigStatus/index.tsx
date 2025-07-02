import React, { useMemo } from 'react'
import { AppConfig } from '@/types'
import styles from './index.module.less'

interface ConfigStatusProps {
  config: AppConfig
  className?: string
  showDetails?: boolean
  onClick?: () => void
  compact?: boolean
}

interface ConfigItem {
  key: keyof AppConfig
  label: string
  required: boolean
}

const CONFIG_ITEMS: ConfigItem[] = [
  { key: 'gitlabUrl', label: 'GitLab', required: true },
  { key: 'gitlabToken', label: 'Token', required: true },
  { key: 'deepseekApiKey', label: 'API Key', required: true },
  { key: 'defaultPrompt', label: 'Prompt', required: true },
]

/**
 * 配置状态组件
 * 重新设计用于设置面板，显示详细的配置状态信息
 */
const REQUIRED_CONFIG_ITEMS = CONFIG_ITEMS.filter(item => item.required)
const TOTAL_REQUIRED_COUNT = REQUIRED_CONFIG_ITEMS.length

const ConfigStatus: React.FC<ConfigStatusProps> = ({
  config,
  className = '',
  showDetails = true,
  onClick,
  compact = false,
}) => {
  const status = useMemo(() => {
    const itemsStatus = REQUIRED_CONFIG_ITEMS.map(item => {
      const value = config[item.key]
      const isValid = typeof value === 'string' ? value.trim() !== '' : !!value
      return {
        ...item,
        isValid,
        value: isValid ? '已配置' : '未配置',
      }
    })

    const completedCount = itemsStatus.filter(item => item.isValid).length
    const isValid = completedCount === TOTAL_REQUIRED_COUNT
    const progress = (completedCount / TOTAL_REQUIRED_COUNT) * 100

    return {
      isValid,
      itemsStatus,
      completedCount,
      totalCount: TOTAL_REQUIRED_COUNT,
      progress,
    }
  }, [config])

  const [isExpanded, setIsExpanded] = React.useState(!status.isValid)

  // 如果是紧凑模式且配置完成，只显示简化版本
  if (compact && status.isValid) {
    return (
      <div
        className={`${styles.configStatus} ${styles.compact} ${className} ${onClick ? styles.clickable : ''}`}
        onClick={onClick}
      >
        <div className={styles.compactContent}>
          <span className={styles.statusIcon}>✅</span>
          <span className={styles.compactText}>配置已完成</span>
          {showDetails && (
            <button
              className={styles.expandButton}
              onClick={e => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? '收起' : '详情'}
            </button>
          )}
        </div>

        {/* 展开的详细信息 */}
        {showDetails && isExpanded && (
          <div className={styles.expandedContent}>
            <div className={styles.configItems}>
              {status.itemsStatus.map(item => (
                <div
                  key={item.key}
                  className={`${styles.configItem} ${styles.compactItem} ${item.isValid ? styles.valid : styles.invalid}`}
                >
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemIcon}>
                    {item.isValid ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`${styles.configStatus} ${className} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      <div className={styles.statusHeader}>
        <div className={styles.statusTitle}>
          <span className={styles.statusIcon}>
            {status.isValid ? '✅' : '⚠️'}
          </span>
          <span className={styles.statusText}>
            配置状态 ({status.completedCount}/{status.totalCount})
          </span>
        </div>

        {/* 进度条 */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${status.isValid ? styles.complete : ''}`}
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(status.progress)}%
          </span>
        </div>
      </div>

      {/* 详细配置项状态 */}
      {showDetails && (
        <div className={styles.configItems}>
          {status.itemsStatus.map(item => (
            <div
              key={item.key}
              className={`${styles.configItem} ${item.isValid ? styles.valid : styles.invalid}`}
            >
              <div className={styles.itemInfo}>
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemStatus}>{item.value}</span>
              </div>
              <span className={styles.itemIcon}>
                {item.isValid ? '✓' : '✗'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConfigStatus
