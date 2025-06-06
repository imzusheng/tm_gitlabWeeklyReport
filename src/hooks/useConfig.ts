import { useState, useEffect, useCallback } from 'react';
import type { AppConfig, UseConfigReturn } from '../types';
import { DEFAULT_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { getStorageValue, setStorageValue } from '../utils/storage';
import { validateConfig } from '../utils';
import { gitlabService } from '../services/gitlab';
import { deepseekService } from '../services/deepseek';

/**
 * 配置管理 Hook
 */
export const useConfig = (): UseConfigReturn => {
  const [config, setConfig] = useState<AppConfig>(() => {
    // 从存储中加载配置
    const savedConfig: AppConfig = {
      gitlab: {
        baseUrl: getStorageValue(STORAGE_KEYS.GITLAB_URL, DEFAULT_CONFIG.gitlab.baseUrl) as string,
        token: getStorageValue(STORAGE_KEYS.GITLAB_TOKEN, DEFAULT_CONFIG.gitlab.token) as string,
        projectId: getStorageValue(STORAGE_KEYS.GITLAB_PROJECT_ID, DEFAULT_CONFIG.gitlab.projectId) as string
      },
      deepseek: {
        apiKey: getStorageValue(STORAGE_KEYS.DEEPSEEK_API_KEY, DEFAULT_CONFIG.deepseek.apiKey) as string,
        model: getStorageValue(STORAGE_KEYS.DEEPSEEK_MODEL, DEFAULT_CONFIG.deepseek.model) as string,
        maxTokens: getStorageValue(STORAGE_KEYS.DEEPSEEK_MAX_TOKENS, DEFAULT_CONFIG.deepseek.maxTokens) as number
      },
      themeMode: getStorageValue(STORAGE_KEYS.THEME_MODE, DEFAULT_CONFIG.themeMode) as 'light' | 'dark' | 'auto'
    };
    
    return savedConfig;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 更新配置
   */
  const updateConfig = useCallback(async (newConfig: Partial<AppConfig>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedConfig = { ...config, ...newConfig };
      
      // 验证配置
      const validation = validateConfig(updatedConfig);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      
      // 保存到存储
      await Promise.all([
        setStorageValue(STORAGE_KEYS.GITLAB_URL, updatedConfig.gitlab.baseUrl),
        setStorageValue(STORAGE_KEYS.GITLAB_TOKEN, updatedConfig.gitlab.token),
        setStorageValue(STORAGE_KEYS.GITLAB_PROJECT_ID, updatedConfig.gitlab.projectId),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_API_KEY, updatedConfig.deepseek.apiKey),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_MODEL, updatedConfig.deepseek.model),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_MAX_TOKENS, updatedConfig.deepseek.maxTokens),
        setStorageValue(STORAGE_KEYS.THEME_MODE, updatedConfig.themeMode)
      ]);
      
      // 更新服务配置
      gitlabService.updateConfig(
        updatedConfig.gitlab.baseUrl,
        updatedConfig.gitlab.token,
        updatedConfig.gitlab.projectId
      );
      deepseekService.updateApiKey(updatedConfig.deepseek.apiKey);
      
      setConfig(updatedConfig);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '更新配置失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  /**
   * 重置配置
   */
  const resetConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 清除存储
      await Promise.all([
        setStorageValue(STORAGE_KEYS.GITLAB_URL, DEFAULT_CONFIG.gitlab.baseUrl),
        setStorageValue(STORAGE_KEYS.GITLAB_TOKEN, DEFAULT_CONFIG.gitlab.token),
        setStorageValue(STORAGE_KEYS.GITLAB_PROJECT_ID, DEFAULT_CONFIG.gitlab.projectId),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_API_KEY, DEFAULT_CONFIG.deepseek.apiKey),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_MODEL, DEFAULT_CONFIG.deepseek.model),
        setStorageValue(STORAGE_KEYS.DEEPSEEK_MAX_TOKENS, DEFAULT_CONFIG.deepseek.maxTokens),
        setStorageValue(STORAGE_KEYS.THEME_MODE, DEFAULT_CONFIG.themeMode)
      ]);
      
      // 重置服务配置
      gitlabService.updateConfig(
        DEFAULT_CONFIG.gitlab.baseUrl,
        DEFAULT_CONFIG.gitlab.token,
        DEFAULT_CONFIG.gitlab.projectId
      );
      deepseekService.updateApiKey(DEFAULT_CONFIG.deepseek.apiKey);
      
      setConfig(DEFAULT_CONFIG);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '重置配置失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 测试连接
   */
  const testConnection = useCallback(async (): Promise<{ gitlab: boolean; deepseek: boolean }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [gitlabResult, deepseekResult] = await Promise.allSettled([
        gitlabService.testConnection(),
        deepseekService.testConnection()
      ]);
      
      return {
        gitlab: gitlabResult.status === 'fulfilled' ? gitlabResult.value : false,
        deepseek: deepseekResult.status === 'fulfilled' ? deepseekResult.value : false
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '测试连接失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 检查配置是否完整
   */
  const isConfigured = useCallback((): boolean => {
    return validateConfig(config).isValid;
  }, [config]);

  return {
    config,
    isLoading,
    error,
    updateConfig,
    resetConfig,
    testConnection,
    isConfigured
  };
};