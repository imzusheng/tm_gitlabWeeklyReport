import React, { useState, useEffect } from 'react'
import type { AIGenerationConfig, AITaskType } from '@/types'
import { AI_TASK_CONFIGS } from '@/constants'
import { UI_TEXT } from '@/constants/ui'
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
  onBack: () => void
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  taskType,
  onClose,
  onGenerate,
  isLoading,
  selectedEventsCount = 0,
  onBack,
}) => {
  const taskConfig = AI_TASK_CONFIGS[taskType]
  const [prompt, setPrompt] = useState(taskConfig.defaultPrompt)
  const [isCopied, setIsCopied] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    setPrompt(taskConfig.defaultPrompt)
  }, [taskConfig.defaultPrompt])

  useEffect(() => {
    if (isLoading) {
      setPhase(0)
      const t = setTimeout(() => setPhase(1), 500)
      return () => clearTimeout(t)
    }
    if (config?.result) {
      setPhase(2)
    }
  }, [isLoading, config?.result])

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

  if (selectedEventsCount === 0) {
    return (
      <Modal visible={visible} title={taskConfig.title} onClose={onClose}>
        <div className={styles.panel}>
          <div className={styles.empty}>
            <p className={styles.emptyText}>需要先返回勾选事件</p>
            <button className={styles.backBtn} onClick={onBack}>
              {UI_TEXT.CTA.backToSelect}
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal visible={visible} title={taskConfig.title} onClose={onClose}>
      <div className={styles.panel}>
        <div className={styles.overview}>
          已选择事件：{selectedEventsCount}{' '}
          <button className={styles.backLink} onClick={onBack}>
            {UI_TEXT.CTA.backToSelect}
          </button>
        </div>

        <div className={styles.phase}>{UI_TEXT.PHASES[phase]}</div>

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
              disabled={isLoading || !prompt.trim()}
              title={!prompt.trim() ? UI_TEXT.TOOLTIP.selectEvents : undefined}
            >
              {isLoading
                ? UI_TEXT.CTA.generating
                : config?.result
                  ? taskConfig.regenerateButtonText
                  : UI_TEXT.CTA.generate}
            </button>
          </div>
        </div>

        <details className={styles.help}>
          <summary>写作约束</summary>
          <p>{taskConfig.defaultPrompt}</p>
        </details>

        {config?.result ? (
          <div className={styles.result}>
            <div className={styles.resultActions}>
              <button
                className={styles.copyBtn}
                onClick={handleCopy}
                disabled={isCopied}
              >
                {isCopied ? UI_TEXT.CTA.copied : UI_TEXT.CTA.copy}
              </button>
              <button className={styles.backBtn} onClick={onBack}>
                {UI_TEXT.CTA.backToSelect}
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
