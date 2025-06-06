/**
 * GitLab 周报生成器 - 本地存储工具
 * 封装油猴脚本的存储 API
 */

import { STORAGE_KEYS } from './constants';

/**
 * 存储值到本地
 * @param key 存储键
 * @param value 存储值
 */
export const setValue = <T>(key: string, value: T): void => {
  try {
    if (typeof window !== 'undefined' && window.GM_setValue) {
      // 油猴脚本环境
      window.GM_setValue(key, JSON.stringify(value));
    } else {
      // 开发环境或普通浏览器环境
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('存储数据失败:', error);
  }
};

/**
 * 从本地获取值
 * @param key 存储键
 * @param defaultValue 默认值
 * @returns 存储的值或默认值
 */
export const getValue = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    let stored: string | null = null;
    
    if (typeof window !== 'undefined' && window.GM_getValue) {
      // 油猴脚本环境
      stored = window.GM_getValue(key, null);
    } else {
      // 开发环境或普通浏览器环境
      stored = localStorage.getItem(key);
    }
    
    if (stored === null) {
      return defaultValue;
    }
    
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error('读取数据失败:', error);
    return defaultValue;
  }
};

// 添加缺少的导出函数别名
export const getStorageValue = getValue;
export const setStorageValue = setValue;

/**
 * 删除本地存储的值
 * @param key 存储键
 */
export const deleteValue = (key: string): void => {
  try {
    if (typeof window !== 'undefined' && window.GM_deleteValue) {
      // 油猴脚本环境
      window.GM_deleteValue(key);
    } else {
      // 开发环境或普通浏览器环境
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('删除数据失败:', error);
  }
};

/**
 * 清空所有相关存储
 */
export const clearAllStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    deleteValue(key);
  });
};

/**
 * 检查存储是否可用
 * @returns 是否可用
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    const testValue = 'test';
    
    setValue(testKey, testValue);
    const retrieved = getValue(testKey);
    deleteValue(testKey);
    
    return retrieved === testValue;
  } catch {
    return false;
  }
};