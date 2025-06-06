import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode, ThemeColors, UseThemeReturn } from '../types';
import { THEME_COLORS } from '../utils/constants';
import { detectSystemTheme, watchSystemTheme } from '../utils';

/**
 * 主题管理 Hook
 */
export const useTheme = (initialMode: ThemeMode = 'dark'): UseThemeReturn => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => detectSystemTheme());
  
  // 计算当前实际主题
  const currentTheme = themeMode === 'auto' ? systemTheme : themeMode;
  const themeColors: ThemeColors = THEME_COLORS[currentTheme];

  /**
   * 切换主题模式
   */
  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'auto';
        case 'auto':
        default:
          return 'light';
      }
    });
  }, []);

  /**
   * 设置主题模式
   */
  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, []);

  /**
   * 应用主题到 DOM
   */
  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    
    // 设置 CSS 变量
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    
    // 设置主题类名
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${currentTheme}`);
    
    // 设置 data 属性
    root.setAttribute('data-theme', currentTheme);
  }, [themeColors, currentTheme]);

  // 监听系统主题变化
  useEffect(() => {
    const cleanup = watchSystemTheme(setSystemTheme);
    return cleanup;
  }, []);

  // 应用主题变化
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  return {
    themeMode,
    currentTheme,
    themeColors,
    toggleTheme,
    setTheme,
    applyTheme
  };
};