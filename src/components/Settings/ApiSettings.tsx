import React, { useState } from 'react';
import { useConfig } from '../../hooks';
import { DeepSeekModel } from '../../types';
import './apisettings.css';

interface ApiSettingsProps {
  className?: string;
}

/**
 * API 设置组件
 * 用于配置 GitLab 和 DeepSeek API 相关设置
 */
export const ApiSettings: React.FC<ApiSettingsProps> = ({ className = '' }) => {
  const {
    config,
    updateConfig,
    testConnection,
  } = useConfig();

  const [testing, setTesting] = useState({
    gitlab: false,
    deepseek: false,
  });
  
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  } | null>(null);

  // 测试 GitLab 连接
  const handleTestGitLab = async () => {
    setTesting(prev => ({ ...prev, gitlab: true }));
    try {
      const result = await testConnection();
      setNotification({
        type: result.gitlab ? 'success' : 'error',
        message: result.gitlab ? 'GitLab 连接成功' : 'GitLab 连接失败',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: '测试连接失败',
      });
    } finally {
      setTesting(prev => ({ ...prev, gitlab: false }));
    }
  };

  const handleTestDeepSeek = async () => {
    setTesting(prev => ({ ...prev, deepseek: true }));
    try {
      const result = await testConnection();
      setNotification({
        type: result.deepseek ? 'success' : 'error',
        message: result.deepseek ? 'DeepSeek 连接成功' : 'DeepSeek 连接失败',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: '测试连接失败',
      });
    } finally {
      setTesting(prev => ({ ...prev, deepseek: false }));
    }
  };

  // 模型选项
  const modelOptions = [
    { value: 'deepseek-chat', label: 'deepseek-chat' },
    { value: 'deepseek-coder', label: 'deepseek-coder' },
  ];

  return (
    <div className={`tm-api-settings ${className}`}>
      {notification && (
        <div className={`tm-settings__test-status tm-settings__test-status--${notification.type}`}>
          <span className="tm-settings__test-icon">
            {notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span>{notification.message}</span>
          <button 
            className="tm-settings__close" 
            onClick={() => setNotification(null)}
            style={{ marginLeft: 'auto', fontSize: '12px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* GitLab 设置 */}
      <div className="tm-settings-section">
        <h3 className="tm-settings-section__title">
          <span className="tm-settings-section__icon">🦊</span>
          GitLab 配置
        </h3>
        
        <div className="tm-settings-section__content">
          <div className="tm-settings__item">
            <label className="tm-settings__label tm-settings__label--required">
              GitLab 地址
            </label>
            <input
              type="url"
              className="tm-settings__input"
              value={config.gitlab.baseUrl}
              onChange={(e) => updateConfig({
                gitlab: { ...config.gitlab, baseUrl: e.target.value }
              })}
              placeholder="https://gitlab.example.com"
            />
            <div className="tm-settings__help">
              GitLab 实例的基础 URL 地址
            </div>
          </div>
          
          <div className="tm-settings__item">
            <label className="tm-settings__label tm-settings__label--required">
              访问令牌 (Token)
            </label>
            <input
              type="password"
              className="tm-settings__input"
              value={config.gitlab.token}
              onChange={(e) => updateConfig({
                gitlab: { ...config.gitlab, token: e.target.value }
              })}
              placeholder="glpat-xxxxxxxxxxxxxxxxxxxx"
            />
            <div className="tm-settings__help">
              GitLab 个人访问令牌，需要 read_api 权限
            </div>
          </div>
          
          <div className="tm-settings__item">
            <label className="tm-settings__label tm-settings__label--required">
              项目 ID
            </label>
            <input
              type="text"
              className="tm-settings__input"
              value={config.gitlab.projectId}
              onChange={(e) => updateConfig({
                gitlab: { ...config.gitlab, projectId: e.target.value }
              })}
              placeholder="123"
            />
            <div className="tm-settings__help">
              GitLab 项目 ID，可在项目设置页面查看
            </div>
          </div>
          
          <div className="tm-settings-section__actions">
            <button
              className="tm-settings__button tm-settings__button--secondary"
              onClick={handleTestGitLab}
              disabled={testing.gitlab || !config.gitlab.baseUrl || !config.gitlab.token}
            >
              {testing.gitlab ? '测试中...' : '测试连接'}
            </button>
          </div>
        </div>
      </div>

      {/* DeepSeek 设置 */}
      <div className="tm-settings-section">
        <h3 className="tm-settings-section__title">
          <span className="tm-settings-section__icon">🤖</span>
          DeepSeek 配置
        </h3>
        
        <div className="tm-settings-section__content">
          <div className="tm-settings__item">
            <label className="tm-settings__label tm-settings__label--required">
              API Key
            </label>
            <input
              type="password"
              className="tm-settings__input"
              value={config.deepseek.apiKey}
              onChange={(e) => updateConfig({
                deepseek: { ...config.deepseek, apiKey: e.target.value }
              })}
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <div className="tm-settings__help">
              DeepSeek API 密钥
            </div>
          </div>
          
          <div className="tm-form-group">
            <div className="tm-settings__item">
              <label className="tm-settings__label">
                模型选择
              </label>
              <select
                className="tm-settings__select"
                value={config.deepseek.model}
                onChange={(e) => updateConfig({
                  deepseek: { ...config.deepseek, model: e.target.value }
                })}
              >
                {modelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="tm-settings__help">
                用于生成周报的 AI 模型
              </div>
            </div>

          </div>
          
          <div className="tm-settings-section__actions">
            <button
              className="tm-settings__button tm-settings__button--secondary"
              onClick={handleTestDeepSeek}
              disabled={testing.deepseek || !config.deepseek.apiKey}
            >
              {testing.deepseek ? '测试中...' : '测试连接'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};