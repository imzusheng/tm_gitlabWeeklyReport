import React, { useState } from 'react'
import { AIGenerationConfig } from '@/types'
import Modal from '../Modal'
import './index.less'

interface AIPanelProps {
  visible: boolean
  config: AIGenerationConfig | null
  defaultPrompt: string
  onClose: () => void
  onGenerate: (prompt: string) => void
  onRegenerate: () => void
  isLoading: boolean
}

const AIPanel: React.FC<AIPanelProps> = ({
  visible,
  config,
  defaultPrompt,
  onClose,
  onGenerate,
  onRegenerate,
  isLoading,
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
      <div className="ai-panel">
        {/* 提示词编辑区域 */}
        <div className="prompt-section">
          <div className="section-header">
            <h3>提示词</h3>
            <div className="header-actions">
              <button
                className="btn-text"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? '收起' : '展开'}
              </button>
              <button className="btn-text" onClick={resetPrompt}>
                重置
              </button>
            </div>
          </div>

          <div className={`prompt-editor ${isExpanded ? 'expanded' : ''}`}>
            <textarea
              className="prompt-textarea"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="请输入用于生成周报的提示词..."
              rows={isExpanded ? 15 : 6}
              disabled={isLoading}
            />
            <div className="prompt-footer">
              <span className="char-count">{prompt.length} 字符</span>
              <button
                className="btn-primary"
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
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>AI 正在分析事件数据，生成周报中...</p>
            <div className="loading-tips">
              <span>💡 生成时间通常为 10-30 秒</span>
            </div>
          </div>
        )}

        {/* 生成结果区域 */}
        {config && !isLoading && (
          <div className="result-section">
            <div className="section-header">
              <h3>生成结果</h3>
              <div className="header-actions">
                <span className="token-count">
                  Token 使用量: {config.tokensUsed}
                </span>
                <button className="btn-secondary" onClick={onRegenerate}>
                  重新生成
                </button>
                <button className="btn-primary" onClick={handleCopyResult}>
                  一键复制
                </button>
              </div>
            </div>

            <div className="result-content">
              <div className="result-text">
                {config.result.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!config && !isLoading && (
          <div className="empty-result">
            <div className="empty-icon">🤖</div>
            <h3>准备生成 AI 周报</h3>
            <p>
              点击"生成周报"按钮，AI 将基于您的 GitLab
              事件数据生成专业的工作周报
            </p>
            <div className="empty-features">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>智能分析工作数据</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📝</span>
                <span>自动生成周报内容</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
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
