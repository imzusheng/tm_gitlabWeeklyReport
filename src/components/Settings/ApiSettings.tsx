import React, { useState } from 'react';
import { Button, Input, Select, Loading, Notification } from '../common';
import { useConfig } from '../../hooks';
import { DeepSeekModel } from '../../types';

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
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* GitLab 设置 */}
      <div className="tm-settings-section">
        <h3 className="tm-settings-section__title">
          <span className="tm-settings-section__icon">🦊</span>
          GitLab 配置
        </h3>
        
        <div className="tm-settings-section__content">
          <Input
            label="GitLab 地址"
            type="url"
            value={config.gitlab.baseUrl}
            onChange={(e) => updateConfig({
              gitlab: { ...config.gitlab, baseUrl: e.target.value }
            })}
            placeholder="https://gitlab.example.com"
            helperText="GitLab 实例的基础 URL 地址"
          />
          
          <Input
            label="访问令牌 (Token)"
            type="password"
            value={config.gitlab.token}
            onChange={(e) => updateConfig({
              gitlab: { ...config.gitlab, token: e.target.value }
            })}
            placeholder="glpat-xxxxxxxxxxxxxxxxxxxx"
            helperText="GitLab 个人访问令牌，需要 read_api 权限"
          />
          
          <Input
            label="项目 ID"
            type="text"
            value={config.gitlab.projectId}
            onChange={(e) => updateConfig({
              gitlab: { ...config.gitlab, projectId: e.target.value }
            })}
            placeholder="123"
            helperText="GitLab 项目 ID，可在项目设置页面查看"
          />
          
          <div className="tm-settings-section__actions">
            <Button
              variant="outline"
              onClick={handleTestGitLab}
              loading={testing.gitlab}
              disabled={!config.gitlab.baseUrl || !config.gitlab.token}
            >
              测试连接
            </Button>
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
          <Input
            label="API Key"
            type="password"
            value={config.deepseek.apiKey}
            onChange={(e) => updateConfig({
              deepseek: { ...config.deepseek, apiKey: e.target.value }
            })}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            helperText="DeepSeek API 密钥"
          />
          
          <div className="tm-form-group">
            <Select
              label="模型选择"
              value={config.deepseek.model}
              onChange={(value) => updateConfig({
                 deepseek: { ...config.deepseek, model: value }
               })}
              options={modelOptions}
              placeholder="选择模型"
              helperText="用于生成周报的 AI 模型"
            />

          </div>
          
          <div className="tm-settings-section__actions">
            <Button
              variant="outline"
              onClick={handleTestDeepSeek}
              loading={testing.deepseek}
              disabled={!config.deepseek.apiKey}
            >
              测试连接
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};