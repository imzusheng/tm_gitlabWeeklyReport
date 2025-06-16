import React, { useState } from 'react'
import { AppConfig } from '@/types'
import Modal from '../Modal'
import './index.less'

interface SettingsPanelProps {
  visible: boolean
  config: AppConfig
  onClose: () => void
  onSave: (config: AppConfig) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  visible,
  config,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<AppConfig>(config)
  const [activeTab, setActiveTab] = useState<'gitlab' | 'deepseek'>('gitlab')

  const handleInputChange = (field: keyof AppConfig, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleReset = () => {
    setFormData(config)
  }

  const isFormValid = () => {
    return !!(
      formData.gitlabUrl.trim() &&
      formData.gitlabToken.trim() &&
      formData.deepseekApiKey.trim() &&
      formData.defaultPrompt.trim()
    )
  }

  return (
    <Modal
      visible={visible}
      title="设置"
      width={600}
      onClose={onClose}
      footer={
        <div className="settings-footer">
          <button className="btn-secondary" onClick={handleReset}>
            重置
          </button>
          <div className="footer-right">
            <button className="btn-secondary" onClick={onClose}>
              取消
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              保存
            </button>
          </div>
        </div>
      }
    >
      <div className="settings-panel">
        {/* 标签页导航 */}
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === 'gitlab' ? 'active' : ''}`}
            onClick={() => setActiveTab('gitlab')}
          >
            <span className="tab-icon">🦊</span>
            GitLab 配置
          </button>
          <button
            className={`tab-button ${activeTab === 'deepseek' ? 'active' : ''}`}
            onClick={() => setActiveTab('deepseek')}
          >
            <span className="tab-icon">🤖</span>
            DeepSeek 配置
          </button>
        </div>

        {/* 标签页内容 */}
        <div className="settings-content">
          {activeTab === 'gitlab' && (
            <div className="tab-panel">
              <div className="form-group">
                <label className="form-label">
                  GitLab 项目地址 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://gitlab.example.com/group/project"
                  value={formData.gitlabUrl}
                  onChange={(e) => handleInputChange('gitlabUrl', e.target.value)}
                />
                <div className="form-hint">
                  请输入完整的 GitLab 项目 URL
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  个人访问令牌 <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="glpat-xxxxxxxxxxxxxxxxxxxx"
                  value={formData.gitlabToken}
                  onChange={(e) => handleInputChange('gitlabToken', e.target.value)}
                />
                                 <div className="form-hint">
                   在 GitLab 个人设置 &gt; 访问令牌 中创建，需要 read_api 权限
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'deepseek' && (
            <div className="tab-panel">
              <div className="form-group">
                <label className="form-label">
                  DeepSeek API Key <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  value={formData.deepseekApiKey}
                  onChange={(e) => handleInputChange('deepseekApiKey', e.target.value)}
                />
                <div className="form-hint">
                  在 DeepSeek 平台获取 API Key
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  使用的模型
                </label>
                <select
                  className="form-select"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                >
                  <option value="deepseek-chat">deepseek-chat</option>
                  <option value="deepseek-coder">deepseek-coder</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Token 数量限制
                </label>
                <input
                  type="number"
                  className="form-input"
                  min="1000"
                  max="10000"
                  value={formData.tokenLimit}
                  onChange={(e) => handleInputChange('tokenLimit', parseInt(e.target.value))}
                />
                <div className="form-hint">
                  单次生成的最大 Token 数量（1000-10000）
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  默认提示词 <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  placeholder="请根据以下GitLab事件数据生成工作周报..."
                  value={formData.defaultPrompt}
                  onChange={(e) => handleInputChange('defaultPrompt', e.target.value)}
                />
                <div className="form-hint">
                  用于生成周报的默认提示词模板
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SettingsPanel 