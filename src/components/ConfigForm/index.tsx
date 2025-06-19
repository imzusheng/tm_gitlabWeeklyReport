import { AppConfig } from '@/types'
import { urlUtils } from '@/utils'
import './index.less'

interface ConfigFormProps {
  config: AppConfig
  onConfigChange: (updates: Partial<AppConfig>) => void
  onSubmit: () => void
  isLoading: boolean
  disabled?: boolean
}

const ConfigForm: React.FC<ConfigFormProps> = ({
  config,
  onConfigChange,
  onSubmit,
  isLoading,
  disabled = false,
}) => {
  const handleInputChange =
    (field: keyof AppConfig) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onConfigChange({ [field]: e.target.value })
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const isGitLabUrlValid = config.gitlabUrl
    ? urlUtils.isValidGitLabUrl(config.gitlabUrl)
    : true

  return (
    <form className="config-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gitlab-url">
          GitLab 地址 <span className="required">*</span>
        </label>
        <input
          type="url"
          id="gitlab-url"
          value={config.gitlabUrl}
          onChange={handleInputChange('gitlabUrl')}
          placeholder="https://gitlab.example.com"
          disabled={disabled}
          className={!isGitLabUrlValid ? 'invalid' : ''}
        />
        {!isGitLabUrlValid && (
          <span className="error-message">请输入有效的GitLab地址</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gitlab-token">
          GitLab Token <span className="required">*</span>
        </label>
        <input
          type="password"
          id="gitlab-token"
          value={config.gitlabToken}
          onChange={handleInputChange('gitlabToken')}
          placeholder="输入您的 GitLab 访问令牌"
          disabled={disabled}
        />
        <span className="help-text">
          在 GitLab 设置 → 访问令牌 中创建，需要 read_api 权限
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="deepseek-token">
          DeepSeek API Key <span className="required">*</span>
        </label>
        <input
          type="password"
          id="deepseek-token"
          value={config.deepseekApiKey}
          onChange={handleInputChange('deepseekApiKey')}
          placeholder="输入您的 DeepSeek API Key"
          disabled={disabled}
        />
        <span className="help-text">在 DeepSeek 控制台获取 API Key</span>
      </div>

      <div className="form-group">
        <label htmlFor="custom-prompt">自定义提示词（可选）</label>
        <textarea
          id="custom-prompt"
          value={config.customPrompt || ''}
          onChange={handleInputChange('customPrompt')}
          placeholder="输入自定义的AI提示词，留空使用默认提示词"
          rows={4}
          disabled={disabled}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="primary-btn"
          disabled={isLoading || disabled}
        >
          {isLoading ? '生成中...' : '生成周报'}
        </button>
      </div>
    </form>
  )
}

export default ConfigForm
