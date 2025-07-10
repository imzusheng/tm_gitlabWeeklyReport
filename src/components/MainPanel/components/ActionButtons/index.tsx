import React from 'react'
import { AppMode, AppConfig } from '@/types'
import { AI_TASK_CONFIGS } from '@/constants'
import styles from './index.module.less'

interface ActionButtonsProps {
  config: AppConfig
  appMode: AppMode
  onOpenSettings: () => void
  onOpenAI: () => void
}

/**
 * 动作按钮组件
 * 负责设置和AI按钮的渲染和状态管理
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  config,
  appMode,
  onOpenSettings,
  onOpenAI,
}) => {
  const configStatus = React.useMemo(() => {
    const requiredFields = [
      'gitlabUrl',
      'gitlabToken',
      'deepseekApiKey',
      'defaultPrompt',
    ] as const
    const completedCount = requiredFields.filter(field => {
      const value = config[field]
      return typeof value === 'string' ? value.trim() !== '' : !!value
    }).length
    const isValid = completedCount === requiredFields.length
    return { isValid, completedCount, totalCount: requiredFields.length }
  }, [config])

  return (
    <div className={styles.actionButtons}>
      <button
        className={`${styles.actionBtn} ${!configStatus.isValid ? styles.configIncomplete : ''}`}
        onClick={onOpenSettings}
        title={
          configStatus.isValid
            ? '设置'
            : `配置未完成 (${configStatus.completedCount}/${configStatus.totalCount})`
        }
      >
        <span className={styles.btnIcon}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={styles.btnLabel}>
          设置
          {!configStatus.isValid && (
            <span className={styles.configBadge}>
              {configStatus.completedCount}/{configStatus.totalCount}
            </span>
          )}
        </span>
      </button>

      <button
        className={`${styles.actionBtn} ${styles.aiBtn}`}
        onClick={onOpenAI}
        title={
          appMode === 'changelog'
            ? AI_TASK_CONFIGS.changelog.title
            : AI_TASK_CONFIGS['weekly-report'].title
        }
      >
        <span className={styles.btnIcon}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
            <path
              d="M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z"
              fill="currentColor"
            />
            <path
              d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className={styles.btnLabel}>
          {appMode === 'changelog'
            ? AI_TASK_CONFIGS.changelog.buttonText
            : AI_TASK_CONFIGS['weekly-report'].buttonText}
        </span>
      </button>
    </div>
  )
}

export default React.memo(ActionButtons)
