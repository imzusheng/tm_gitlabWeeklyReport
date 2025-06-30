import React from 'react'
import { AppConfig } from '@/types'
import styles from './index.module.less'

interface ConfigStatusProps {
  config: AppConfig
  className?: string
  showDetails?: boolean
  onClick?: () => void
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
 * 显示配置完整性状态，包括进度条和详细信息
 */
const ConfigStatus: React.FC<ConfigStatusProps> = ({
  config,
  className = '',
  showDetails = false,
  onClick,
}) => {
  // 检查配置项状态
  const getConfigStatus = () => {
    const missingItems: string[] = []
    const completedItems: string[] = []
    
    CONFIG_ITEMS.forEach(item => {
      const value = config[item.key]
      const isValid = typeof value === 'string' ? value.trim() !== '' : !!value
      
      if (item.required) {
        if (isValid) {
          completedItems.push(item.label)
        } else {
          missingItems.push(item.label)
        }
      }
    })
    
    return {
      isValid: missingItems.length === 0,
      missingItems,
      completedItems,
      completedCount: completedItems.length,
      totalCount: CONFIG_ITEMS.filter(item => item.required).length,
      progress: (completedItems.length / CONFIG_ITEMS.filter(item => item.required).length) * 100
    }
  }

  const status = getConfigStatus()

  return (
    <div 
      className={`${styles.configStatus} ${className} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      <div className={`${styles.statusIndicator} ${status.isValid ? styles.valid : styles.invalid}`}>
        <span className={styles.statusIcon}>
          {status.isValid ? '✅' : '⚠️'}
        </span>
        <span className={styles.statusText}>
          {status.isValid ? '就绪' : `${status.completedCount}/${status.totalCount}`}
        </span>
        
        {/* 进度条 */}
        {!status.isValid && (
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${status.progress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* 详细信息 */}
      {showDetails && !status.isValid && (
        <div className={styles.statusDetails}>
          <div className={styles.missingItems}>
            {status.missingItems.join(' · ')}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfigStatus