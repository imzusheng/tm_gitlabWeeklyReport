import React, { useState, useEffect } from 'react'
import type { AIGenerationConfig, AITaskType } from '@/types'
import { AI_TASK_CONFIGS } from '@/constants'
import Modal from '../Modal'
import styles from './index.module.less'

interface AIPanelProps {
  visible: boolean
  config: AIGenerationConfig | null
  taskType: AITaskType
  onClose: () => void
  onGenerate: (prompt: string) => void
  isLoading: boolean
  selectedEventsCount?: number
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  taskType,
  onClose,
  onGenerate,
  isLoading,
  selectedEventsCount = 0,
}) => {
  const taskConfig = AI_TASK_CONFIGS[taskType]
  const [prompt, setPrompt] = useState(taskConfig.defaultPrompt)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setPrompt(taskConfig.defaultPrompt)
  }, [taskConfig.defaultPrompt])

  const handleGenerate = () => {
    if (!prompt.trim()) return
    onGenerate(prompt)
  }

  const handleCopy = async () => {
    if (!config?.result) return
    await navigator.clipboard.writeText(config.result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1500)
  }

  return (
    <Modal visible={visible} title={taskConfig.title} onClose={onClose}>
      <div className={styles.panel}>
        <div className={styles.overview}>已选择事件：{selectedEventsCount}</div>

        <div className={styles.prompt}>
          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={6}
            disabled={isLoading}
            placeholder={taskConfig.placeholder}
          />
          <div className={styles.promptActions}>
            <span className={styles.charCount}>{prompt.length} 字符</span>
            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={
                isLoading || !prompt.trim() || selectedEventsCount === 0
              }
            >
              {isLoading
                ? '生成中...'
                : config?.result
                  ? taskConfig.regenerateButtonText
                  : taskConfig.generateButtonText}
            </button>
          </div>
        </div>

        {config?.result ? (
          <div className={styles.result}>
            <div className={styles.resultActions}>
              <button
                className={styles.copyBtn}
                onClick={handleCopy}
                disabled={isCopied}
              >
                {isCopied ? '已复制' : '复制'}
              </button>
            </div>
            <pre className={styles.resultText}>{config.result}</pre>
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🤖</div>
            <p className={styles.emptyText}>{taskConfig.emptyDescription}</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default React.memo(AIPanel)
