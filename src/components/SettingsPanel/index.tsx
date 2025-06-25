import React, { useState, useEffect } from 'react'
import { AppConfig } from '@/types'
import Modal from '../Modal'
import { CONFIG_PLACEHOLDERS } from '@/constants'
import styles from './index.module.less'

interface SettingsPanelProps {
  isOpen: boolean
  config: AppConfig
  theme: 'light' | 'dark' | 'system'
  onClose: () => void
  onSave: (config: AppConfig, theme: 'light' | 'dark' | 'system') => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  theme,
}) => {
  const [formData, setFormData] = useState<AppConfig>(config)
  const [localTheme, setLocalTheme] = useState<'light' | 'dark' | 'system'>(theme)
  const [activeTab, setActiveTab] = useState<
    'gitlab' | 'deepseek' | 'appearance'
  >('gitlab')

  // 当配置更新时，同步表单数据
  useEffect(() => {
    setFormData(config)
  }, [config])

  // 当主题更新时，同步本地主题状态
  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  // 当面板打开时，重置表单数据和主题为当前配置
  useEffect(() => {
    if (isOpen) {
      setFormData(config)
      setLocalTheme(theme)
    }
  }, [isOpen, config, theme])

  const handleInputChange = (
    field: keyof AppConfig,
    value: string | number,
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(formData, localTheme)
    onClose()
  }

  const handleReset = () => {
    setFormData(config)
    setLocalTheme(theme)
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
      visible={isOpen}
      title="系统设置"
      width={600}
      onClose={onClose}
      footer={
        <div className={styles.settingsFooter}>
          <button className={styles.btnSecondary} onClick={handleReset}>
            重置
          </button>
          <div className={styles.footerRight}>
            <button className={styles.btnSecondary} onClick={onClose}>
              取消
            </button>
            <button
              className={styles.btnPrimary}
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              保存
            </button>
          </div>
        </div>
      }
    >
      <div className={styles.settingsPanel}>
        {/* 标签页导航 */}
        <div className={styles.settingsTabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'gitlab' ? styles.active : ''}`}
            onClick={() => setActiveTab('gitlab')}
          >
            <span className={styles.tabIcon}>🦊</span>
            GitLab 配置
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'deepseek' ? styles.active : ''}`}
            onClick={() => setActiveTab('deepseek')}
          >
            <span className={styles.tabIcon}>🤖</span>
            DeepSeek 配置
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'appearance' ? styles.active : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <span className={styles.tabIcon}>🎨</span>
            外观设置
          </button>
        </div>

        {/* 标签页内容 */}
        <div className={styles.settingsContent}>
          {activeTab === 'gitlab' && (
            <div className={styles.tabPanel}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  GitLab 项目地址 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={CONFIG_PLACEHOLDERS.gitlabUrl}
                  value={formData.gitlabUrl}
                  onChange={e => handleInputChange('gitlabUrl', e.target.value)}
                />
                <div className={styles.formHint}>请输入完整的 GitLab 项目 URL</div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  个人访问令牌 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={CONFIG_PLACEHOLDERS.gitlabToken}
                  value={formData.gitlabToken}
                  onChange={e =>
                    handleInputChange('gitlabToken', e.target.value)
                  }
                />
                <div className={styles.formHint}>
                  在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deepseek' && (
            <div className={styles.tabPanel}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  DeepSeek API Key <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={CONFIG_PLACEHOLDERS.deepseekApiKey}
                  value={formData.deepseekApiKey}
                  onChange={e =>
                    handleInputChange('deepseekApiKey', e.target.value)
                  }
                />
                <div className={styles.formHint}>在 DeepSeek 平台获取 API Key</div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>使用的模型</label>
                <select
                  className={styles.formSelect}
                  value={formData.model}
                  onChange={e => handleInputChange('model', e.target.value)}
                >
                  <option value="deepseek-chat">deepseek-chat</option>
                  <option value="deepseek-coder">deepseek-coder</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Token 数量限制</label>
                <input
                  type="number"
                  className={styles.formInput}
                  min="1000"
                  max="10000"
                  placeholder="4000"
                  value={formData.tokenLimit}
                  onChange={e =>
                    handleInputChange('tokenLimit', parseInt(e.target.value))
                  }
                />
                <div className={styles.formHint}>
                  单次生成的最大 Token 数量（1000-10000）
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  默认提示词 <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.formTextarea}
                  rows={6}
                  placeholder={CONFIG_PLACEHOLDERS.defaultPrompt}
                  value={formData.defaultPrompt}
                  onChange={e =>
                    handleInputChange('defaultPrompt', e.target.value)
                  }
                />
                <div className={styles.formHint}>用于生成周报的默认提示词模板</div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className={styles.tabPanel}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>主题模式</label>
                <select
                  className={styles.formSelect}
                  value={localTheme}
                  onChange={e =>
                    setLocalTheme(e.target.value as 'light' | 'dark' | 'system')
                  }
                >
                  <option value="system">🔄 跟随系统</option>
                  <option value="light">☀️ 浅色模式</option>
                  <option value="dark">🌙 深色模式</option>
                </select>
                <div className={styles.formHint}>
                  选择应用的主题模式，跟随系统将根据系统设置自动切换
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
