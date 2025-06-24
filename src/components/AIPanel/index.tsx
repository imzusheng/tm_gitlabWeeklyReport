import React, { useState } from 'react'
import { AIGenerationConfig } from '@/types'
import Modal from '../Modal'
import styles from './index.module.less'

interface AIPanelProps {
  visible: boolean
  config: AIGenerationConfig | null
  defaultPrompt: string
  onClose: () => void
  onGenerate: (prompt: string) => void
  onRegenerate: () => void
  isLoading: boolean
  selectedEventsCount?: number
  dateRange?: {
    startDate: string
    endDate: string
  }
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  defaultPrompt,
  onClose,
  onGenerate,
  onRegenerate,
  isLoading,
  selectedEventsCount = 0,
  dateRange,
}) => {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleGenerate = () => {
    onGenerate(prompt)
  }

  const handleCopyResult = () => {
    if (config?.result) {
      navigator.clipboard.writeText(config.result)
      // 可以添加复制成功的提示
    }
  }

  const resetPrompt = () => {
    setPrompt(defaultPrompt)
  }

  return (
    <Modal
      visible={visible}
      title="AI 周报生成"
      width={800}
      onClose={onClose}
      maskClosable={!isLoading}
    >
      <div className={styles['ai-panel']}>
        {/* 数据概览信息 */}
        <div className={styles['data-overview']}>
          <div className={styles['overview-header']}>
            <h4>📊 数据概览</h4>
          </div>
          <div className={styles['overview-content']}>
            <div className={styles['overview-item']}>
              <span className={styles['overview-label']}>选中事件：</span>
              <span className={styles['overview-value']}>{selectedEventsCount} 条</span>
            </div>
            {dateRange && (
              <div className={styles['overview-item']}>
                <span className={styles['overview-label']}>日期范围：</span>
                <span className={styles['overview-value']}>
                  {dateRange.startDate} 至 {dateRange.endDate}
                </span>
              </div>
            )}
            <div className={styles['overview-item']}>
              <span className={styles['overview-label']}>状态：</span>
              <span className={`${styles['overview-value']} ${selectedEventsCount > 0 ? styles.ready : styles.waiting}`}>
                {selectedEventsCount > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件'}
              </span>
            </div>
          </div>
        </div>

        {/* 提示词编辑区域 */}
        <div className={styles['prompt-section']}>
          <div className={styles['section-header']}>
            <h3>提示词</h3>
            <div className={styles['header-actions']}>
              <button
                className={styles['btn-text']}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? '收起' : '展开'}
              </button>
              <button className={styles['btn-text']} onClick={resetPrompt}>
                重置
              </button>
            </div>
          </div>

          <div className={`${styles['prompt-editor']} ${isExpanded ? styles.expanded : ''}`}>
            <textarea
              className={styles['prompt-textarea']}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="请输入用于生成周报的提示词..."
              rows={isExpanded ? 15 : 6}
              disabled={isLoading}
            />
            <div className={styles['prompt-footer']}>
              <span className={styles['char-count']}>{prompt.length} 字符</span>
              <button
                className={styles['btn-primary']}
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? '生成中...' : '生成周报'}
              </button>
            </div>
          </div>
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className={styles['loading-section']}>
            <div className={styles['loading-spinner']}></div>
            <p>AI 正在分析事件数据，生成周报中...</p>
            <div className={styles['loading-tips']}>
              <span>💡 生成时间通常为 10-30 秒</span>
            </div>
          </div>
        )}

        {/* 生成结果区域 */}
        {config && !isLoading && (
          <div className={styles['result-section']}>
            <div className={styles['section-header']}>
              <h3>生成结果</h3>
              <div className={styles['header-actions']}>
                <span className={styles['token-count']}>
                  Token 使用量: {config.tokensUsed}
                </span>
                <button className={styles['btn-secondary']} onClick={onRegenerate}>
                  重新生成
                </button>
                <button className={styles['btn-primary']} onClick={handleCopyResult}>
                  一键复制
                </button>
              </div>
            </div>

            <div className={styles['result-content']}>
              <div className={styles['result-text']}>
                {config.result.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!config && !isLoading && (
          <div className={styles['empty-result']}>
            <div className={styles['empty-icon']}>🤖</div>
            <h3>准备生成 AI 周报</h3>
            <p>
              点击"生成周报"按钮，AI 将基于您的 GitLab
              事件数据生成专业的工作周报
            </p>
            <div className={styles['empty-features']}>
              <div className={styles['feature-item']}>
                <span className={styles['feature-icon']}>📊</span>
                <span>智能分析工作数据</span>
              </div>
              <div className={styles['feature-item']}>
                <span className={styles['feature-icon']}>📝</span>
                <span>自动生成周报内容</span>
              </div>
              <div className={styles['feature-item']}>
                <span className={styles['feature-icon']}>🎯</span>
                <span>突出重点工作成果</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default AIPanel
