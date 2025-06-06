/**
 * GitLab 周报生成器 - 工具函数
 * 提供日期处理、数据验证、导出等通用功能
 */

import type { AppConfig, DateRange, ExportOptions, GitLabEvent, PresetDateRange } from '@/types';
import { VALIDATION_RULES } from './constants';

// ============= 日期处理工具 =============

export * from './constants';
export * from './storage';

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * 格式化日期时间为本地化字符串
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 格式化时间为简短格式
 */
export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = limit - (now - previous);
    
    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 优先使用油猴脚本的 API
    if (typeof GM_setClipboard !== 'undefined') {
      GM_setClipboard(text);
      return true;
    }
    
    // 回退到浏览器 API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // 最后回退到传统方法
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    return result;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * 显示通知
 */
export function showNotification(title: string, message: string, type: 'info' | 'success' | 'error' = 'info'): void {
  try {
    // 优先使用油猴脚本的通知 API
    if (typeof GM_notification !== 'undefined') {
      GM_notification({
        title,
        text: message,
        timeout: 3000,
      });
      return;
    }
    
    // 回退到浏览器通知 API
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, {
              body: message,
              icon: type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️',
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Failed to show notification:', error);
    // 最后回退到 console
    console.log(`${title}: ${message}`);
  }
}

/**
 * 生成唯一 ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 安全的 JSON 解析
 */
export function safeJsonParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return defaultValue;
  }
}

/**
 * 检查是否为有效的 URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取相对时间描述
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} 天前`;
  } else if (diffHours > 0) {
    return `${diffHours} 小时前`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} 分钟前`;
  } else {
    return '刚刚';
  }
}

/**
 * 获取指定偏移量的周范围
 * @param offset 周偏移量，0为本周，-1为上周
 * @returns 日期范围数组 [开始日期, 结束日期]
 */
export const getWeekRange = (offset = 0): [string, string] => {
  const today = new Date();
  const startOfWeek = new Date(today);
  
  // 设置为周一（getDay() 返回 0-6，0为周日）
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(today.getDate() + daysToMonday + offset * 7);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  return [formatDate(startOfWeek), formatDate(endOfWeek)];
};

/**
 * 获取本周日期范围
 */
export const getThisWeekRange = (): [string, string] => getWeekRange(0);

/**
 * 获取上周日期范围
 */
export const getLastWeekRange = (): [string, string] => getWeekRange(-1);

/**
 * 获取指定偏移量的月份范围
 * @param offset 月偏移量，0为本月，-1为上月
 * @returns 日期范围数组 [开始日期, 结束日期]
 */
export const getMonthRange = (offset = 0): [string, string] => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + offset + 1, 0);
  
  return [formatDate(startOfMonth), formatDate(endOfMonth)];
};

/**
 * 获取本月日期范围
 */
export const getThisMonthRange = (): [string, string] => getMonthRange(0);

/**
 * 获取上月日期范围
 */
export const getLastMonthRange = (): [string, string] => getMonthRange(-1);

/**
 * 根据预设类型获取日期范围
 * @param preset 预设类型
 * @returns 日期范围对象
 */
export const getPresetDateRange = (preset: PresetDateRange): DateRange => {
  const ranges = {
    thisWeek: getThisWeekRange(),
    lastWeek: getLastWeekRange(),
    thisMonth: getThisMonthRange(),
    lastMonth: getLastMonthRange()
  };
  
  const [startDate, endDate] = ranges[preset];
  return { startDate, endDate };
};

// ============= 数据验证工具 =============

/**
 * 验证应用配置
 * @param config 应用配置
 * @returns 验证结果
 */
export const validateConfig = (config: AppConfig): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!config.gitlab.token?.trim()) {
    errors.push('GitLab Token 未配置');
  } else if (config.gitlab.token.length < VALIDATION_RULES.TOKEN_MIN_LENGTH) {
    errors.push('GitLab Token 长度不足');
  }
  
  if (!config.deepseek.apiKey?.trim()) {
    errors.push('DeepSeek API Key 不能为空');
  }
  if (!config.deepseek.model?.trim()) {
    errors.push('DeepSeek 模型不能为空');
  }
  if (!config.deepseek.maxTokens || config.deepseek.maxTokens < 1) {
    errors.push('DeepSeek 最大 Token 数必须大于 0');
  }
  
  if (config.deepseek.maxTokens < VALIDATION_RULES.MAX_TOKENS_MIN || 
      config.deepseek.maxTokens > VALIDATION_RULES.MAX_TOKENS_MAX) {
    errors.push(`Token 数量应在 ${VALIDATION_RULES.MAX_TOKENS_MIN}-${VALIDATION_RULES.MAX_TOKENS_MAX} 之间`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 验证日期范围
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 是否有效
 */
export const validateDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return start <= end && start <= new Date();
};

// ============= 数据处理工具 =============

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
};

// ============= 数据导出工具 =============

/**
 * 导出数据为 CSV 格式
 * @param events 事件数据
 * @param options 导出选项
 */
export const exportToCsv = (
  events: GitLabEvent[],
  options: ExportOptions = { format: 'csv' }
): void => {
  const headers = ['序号', '时间', '提交内容'];
  const rows = events.map((event, index) => [
    (index + 1).toString(),
    formatTime(event.created_at),
    `"${(event.target_title || '').replace(/"/g, '""')}"`
  ]);
  
  const csvContent = [
    options.includeHeaders !== false ? headers.join(',') : '',
    ...rows.map(row => row.join(','))
  ].filter(Boolean).join('\n');
  
  downloadFile(
    `\ufeff${csvContent}`, // 添加 BOM 以支持中文
    options.filename || `GitLab提交记录_${formatDate(new Date())}.csv`,
    'text/csv;charset=utf-8'
  );
};

/**
 * 导出数据为 JSON 格式
 * @param events 事件数据
 * @param options 导出选项
 */
export const exportToJson = (
  events: GitLabEvent[],
  options: ExportOptions = { format: 'json' }
): void => {
  const jsonContent = JSON.stringify(events, null, 2);
  
  downloadFile(
    jsonContent,
    options.filename || `GitLab提交记录_${formatDate(new Date())}.json`,
    'application/json'
  );
};

/**
 * 导出数据为文本格式
 * @param events 事件数据
 * @param options 导出选项
 */
export const exportToText = (
  events: GitLabEvent[],
  options: ExportOptions = { format: 'txt' }
): void => {
  const textContent = events
    .map((event, index) => 
      `${index + 1}. ${formatTime(event.created_at)} - ${event.target_title || '未知提交'}`
    )
    .join('\n');
  
  downloadFile(
    textContent,
    options.filename || `GitLab提交记录_${formatDate(new Date())}.txt`,
    'text/plain;charset=utf-8'
  );
};

/**
 * 通用文件下载函数
 * @param content 文件内容
 * @param filename 文件名
 * @param mimeType MIME 类型
 */
const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 清理 URL 对象
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

// ============= 主题检测工具 =============

/**
 * 检测系统主题偏好
 * @returns 'light' | 'dark'
 */
export const detectSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * 监听系统主题变化
 * @param callback 主题变化回调函数
 * @returns 清理函数
 */
export const watchSystemTheme = (callback: (theme: 'light' | 'dark') => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
};

// ============= 字符串处理工具 =============

/**
 * 截断字符串
 * @param str 原字符串
 * @param maxLength 最大长度
 * @param suffix 后缀
 * @returns 截断后的字符串
 */
export const truncateString = (str: string, maxLength: number, suffix = '...'): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * 转义 HTML 字符
 * @param str 原字符串
 * @returns 转义后的字符串
 */
export const escapeHtml = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};