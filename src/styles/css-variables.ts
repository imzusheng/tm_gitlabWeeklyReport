/**
 * CSS 变量定义 - 用于内联注入到容器节点
 */

export interface CSSVariables {
  [key: string]: string
}

// 浅色主题变量
export const lightThemeVariables: CSSVariables = {
  // 主要背景色
  '--gwrs-bg-primary': '#fff',
  '--gwrs-bg-secondary': '#f5f5f7',
  '--gwrs-bg-tertiary': '#f8f9fa',
  '--gwrs-bg-quaternary': 'rgb(248 248 248 / 80%)',
  '--gwrs-bg-disabled': '#f0f0f0',
  '--gwrs-bg-color': '#fff',
  '--gwrs-bg-hover-color': '#f5f5f7',
  '--gwrs-bg-secondary-color': '#f5f5f7',

  // 文本颜色
  '--gwrs-text-primary': '#1d1d1f',
  '--gwrs-text-secondary': '#86868b',
  '--gwrs-text-tertiary': '#666',
  '--gwrs-text-quaternary': '#8e8e93',
  '--gwrs-text-disabled': '#c7c7cc',
  '--gwrs-text-color': '#1d1d1f',
  '--gwrs-text-secondary-color': '#86868b',

  // 边框颜色
  '--gwrs-border-primary': 'rgb(0 0 0 / 8%)',
  '--gwrs-border-secondary': 'rgb(0 0 0 / 5%)',
  '--gwrs-border-tertiary': '#e5e5e7',
  '--gwrs-border-quaternary': '#d2d2d7',
  '--gwrs-border-light': 'rgb(0 0 0 / 5%)',
  '--gwrs-border-color': 'rgb(0 0 0 / 8%)',

  // 品牌色
  '--gwrs-color-primary': '#007aff',
  '--gwrs-color-primary-hover': '#0051d5',
  '--gwrs-color-primary-dark': '#0051d5',
  '--gwrs-color-primary-light': 'rgb(0 122 255 / 10%)',
  '--gwrs-color-primary-lighter': 'rgb(0 122 255 / 5%)',
  '--gwrs-primary-rgb': '0, 122, 255',
  '--gwrs-primary-hover': 'rgb(0 81 213 / 10%)',
  '--gwrs-primary-shadow': 'rgb(74 158 255 / 25%)',

  // 功能色
  '--gwrs-color-success': '#34c759',
  '--gwrs-color-success-light': 'rgb(52 199 89 / 10%)',
  '--gwrs-color-success-lighter': 'rgb(52 199 89 / 5%)',
  '--gwrs-success-color': '#34c759',
  '--gwrs-color-warning': '#ff9500',
  '--gwrs-color-warning-light': 'rgb(255 149 0 / 10%)',
  '--gwrs-color-warning-lighter': 'rgb(255 149 0 / 5%)',
  '--gwrs-color-warning-dark': '#e6850e',
  '--gwrs-warning-color': '#ff9500',
  '--gwrs-color-error': '#ff3b30',
  '--gwrs-color-error-bg': '#f8d7da',
  '--gwrs-color-error-border': '#f5c6cb',
  '--gwrs-color-error-text': '#721c24',
  '--gwrs-color-error-light': 'rgb(255 59 48 / 10%)',
  '--gwrs-error-color': '#ff3b30',
  '--gwrs-error-hover-color': '#ff1507',
  '--gwrs-color-danger': '#ff3b30',
  '--gwrs-color-danger-light': 'rgb(255 59 48 / 10%)',
  '--gwrs-color-danger-lighter': 'rgb(255 59 48 / 5%)',
  '--gwrs-color-info': '#5856d6',
  '--gwrs-color-info-light': 'rgb(88 86 214 / 10%)',

  // 阴影
  '--gwrs-shadow-xs': '0 1px 4px rgb(0 0 0 / 4%)',
  '--gwrs-shadow-sm': '0 2px 8px rgb(0 0 0 / 6%)',
  '--gwrs-shadow-md': '0 4px 16px rgb(0 0 0 / 10%)',
  '--gwrs-shadow-lg': '0 8px 32px rgb(0 0 0 / 15%)',
  '--gwrs-shadow-xl': '0 20px 60px rgb(0 0 0 / 15%)',

  // 滚动条
  '--gwrs-scrollbar-thumb': '#d1d1d6',
  '--gwrs-scrollbar-thumb-hover': '#b4b4b9',

  // 遮罩层
  '--gwrs-overlay': 'rgb(0 0 0 / 50%)',
  '--gwrs-overlay-light': 'rgb(0 0 0 / 50%)',
  '--gwrs-overlay-heavy': 'rgb(0 0 0 / 60%)',

  // 按钮
  '--gwrs-btn-bg': '#f9f9f9',
  '--gwrs-btn-text': '#213547',
  '--gwrs-btn-primary-text': '#fff',
  '--gwrs-btn-border': 'rgb(0 0 0 / 10%)',
  '--gwrs-btn-hover-bg': 'rgb(0 0 0 / 6%)',

  // 悬停背景
  '--gwrs-bg-hover': 'rgb(0 0 0 / 4%)',
  '--gwrs-primary-bg-hover': 'rgb(74 158 255 / 10%)',

  // 输入框
  '--gwrs-input-bg': '#fff',
  '--gwrs-input-border': '#ddd',
  '--gwrs-input-focus-border': '#007bff',
  '--gwrs-input-focus-shadow': 'rgb(0 123 255 / 10%)',

  // 模态框专用
  '--gwrs-header-bg': '#f8f9fa',
  '--gwrs-header-border': '#e5e5e7',
  '--gwrs-footer-bg': '#f8f9fa',
  '--gwrs-footer-border': '#e5e5e7',
  '--gwrs-section-bg': '#fff',
  '--gwrs-section-border': '#e5e5e7',
  '--gwrs-section-hover-bg': '#f5f5f7',
  '--gwrs-section-hover-border': '#d2d2d7',
  '--gwrs-item-border': '#e5e5e7',
  '--gwrs-close-btn-bg': '#f5f5f7',
  '--gwrs-close-btn-hover-bg': '#e5e5e7',
  '--gwrs-close-modal-bg': 'transparent',
  '--gwrs-close-modal-border': '#ddd',
  '--gwrs-close-modal-hover-bg': '#f5f5f7',
  '--gwrs-close-modal-hover-border': '#bbb',
}

// 深色主题变量
export const darkThemeVariables: CSSVariables = {
  // 主要背景色
  '--gwrs-bg-primary': '#1a1a1a',
  '--gwrs-bg-secondary': '#1c1c1e',
  '--gwrs-bg-tertiary': '#2c2c2e',
  '--gwrs-bg-quaternary': 'rgb(28 28 30 / 80%)',
  '--gwrs-bg-disabled': '#2c2c2e',
  '--gwrs-bg-color': '#1a1a1a',
  '--gwrs-bg-hover-color': '#1c1c1e',
  '--gwrs-bg-secondary-color': '#1c1c1e',

  // 文本颜色
  '--gwrs-text-primary': '#fff',
  '--gwrs-text-secondary': '#8e8e93',
  '--gwrs-text-tertiary': '#98989d',
  '--gwrs-text-quaternary': '#636366',
  '--gwrs-text-disabled': '#48484a',
  '--gwrs-text-color': '#fff',
  '--gwrs-text-secondary-color': '#8e8e93',

  // 边框颜色
  '--gwrs-border-primary': 'rgb(255 255 255 / 10%)',
  '--gwrs-border-secondary': 'rgb(255 255 255 / 8%)',
  '--gwrs-border-tertiary': '#424245',
  '--gwrs-border-quaternary': '#48484a',
  '--gwrs-border-light': 'rgb(255 255 255 / 8%)',
  '--gwrs-border-color': 'rgb(255 255 255 / 10%)',

  // 品牌色
  '--gwrs-color-primary': '#4a9eff',
  '--gwrs-color-primary-hover': '#64b5f6',
  '--gwrs-color-primary-dark': '#3a8eef',
  '--gwrs-color-primary-light': 'rgb(74 158 255 / 20%)',
  '--gwrs-color-primary-lighter': 'rgb(74 158 255 / 10%)',
  '--gwrs-primary-rgb': '74, 158, 255',
  '--gwrs-primary-hover': 'rgb(100 181 246 / 20%)',
  '--gwrs-primary-shadow': 'rgb(74 158 255 / 30%)',

  // 功能色
  '--gwrs-color-success': '#32d74b',
  '--gwrs-color-success-light': 'rgb(52 199 89 / 20%)',
  '--gwrs-color-success-lighter': 'rgb(52 199 89 / 10%)',
  '--gwrs-success-color': '#32d74b',
  '--gwrs-color-warning': '#ff9f0a',
  '--gwrs-color-warning-light': 'rgb(255 149 0 / 20%)',
  '--gwrs-color-warning-lighter': 'rgb(255 149 0 / 10%)',
  '--gwrs-color-warning-dark': '#cc7f08',
  '--gwrs-warning-color': '#ff9f0a',
  '--gwrs-color-error': '#ff453a',
  '--gwrs-color-error-bg': '#5c2122',
  '--gwrs-color-error-border': '#7c2e2f',
  '--gwrs-color-error-text': '#f8d7da',
  '--gwrs-color-error-light': 'rgb(255 69 58 / 20%)',
  '--gwrs-error-color': '#ff453a',
  '--gwrs-error-hover-color': '#ff6b60',
  '--gwrs-color-danger': '#ff453a',
  '--gwrs-color-danger-light': 'rgb(255 69 58 / 20%)',
  '--gwrs-color-danger-lighter': 'rgb(255 69 58 / 10%)',
  '--gwrs-color-info': '#5e5ce6',
  '--gwrs-color-info-light': 'rgb(88 86 214 / 20%)',

  // 阴影
  '--gwrs-shadow-xs': '0 1px 4px rgb(0 0 0 / 10%)',
  '--gwrs-shadow-sm': '0 2px 8px rgb(0 0 0 / 20%)',
  '--gwrs-shadow-md': '0 4px 16px rgb(0 0 0 / 30%)',
  '--gwrs-shadow-lg': '0 8px 32px rgb(0 0 0 / 40%)',
  '--gwrs-shadow-xl': '0 20px 60px rgb(0 0 0 / 50%)',

  // 滚动条
  '--gwrs-scrollbar-thumb': '#48484a',
  '--gwrs-scrollbar-thumb-hover': '#636366',

  // 遮罩层
  '--gwrs-overlay': 'rgb(0 0 0 / 60%)',
  '--gwrs-overlay-light': 'rgb(0 0 0 / 60%)',
  '--gwrs-overlay-heavy': 'rgb(0 0 0 / 80%)',

  // 按钮
  '--gwrs-btn-bg': '#1a1a1a',
  '--gwrs-btn-text': 'rgb(255 255 255 / 87%)',
  '--gwrs-btn-primary-text': '#fff',
  '--gwrs-btn-border': 'rgb(255 255 255 / 20%)',
  '--gwrs-btn-hover-bg': 'rgb(255 255 255 / 10%)',

  // 悬停背景
  '--gwrs-bg-hover': 'rgb(255 255 255 / 6%)',
  '--gwrs-primary-bg-hover': 'rgb(74 158 255 / 20%)',

  // 输入框
  '--gwrs-input-bg': '#2c2c2e',
  '--gwrs-input-border': '#48484a',
  '--gwrs-input-focus-border': '#64b5f6',
  '--gwrs-input-focus-shadow': 'rgb(100 181 246 / 10%)',

  // 模态框专用
  '--gwrs-header-bg': '#2c2c2e',
  '--gwrs-header-border': '#424245',
  '--gwrs-footer-bg': '#2c2c2e',
  '--gwrs-footer-border': '#424245',
  '--gwrs-section-bg': '#1a1a1a',
  '--gwrs-section-border': '#424245',
  '--gwrs-section-hover-bg': '#1c1c1e',
  '--gwrs-section-hover-border': '#48484a',
  '--gwrs-item-border': '#424245',
  '--gwrs-close-btn-bg': '#1c1c1e',
  '--gwrs-close-btn-hover-bg': '#424245',
  '--gwrs-close-modal-bg': 'transparent',
  '--gwrs-close-modal-border': '#48484a',
  '--gwrs-close-modal-hover-bg': '#1c1c1e',
  '--gwrs-close-modal-hover-border': '#636366',
}

/**
 * 应用CSS变量到指定元素
 */
export function applyCSSVariables(
  element: HTMLElement,
  variables: CSSVariables,
): void {
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value)
  })
}

/**
 * 获取当前主题的CSS变量
 */
export function getThemeVariables(
  theme: 'light' | 'dark' | 'system',
): CSSVariables {
  if (theme === 'system') {
    // 系统主题，根据媒体查询判断
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    return prefersDark ? darkThemeVariables : lightThemeVariables
  }

  return theme === 'dark' ? darkThemeVariables : lightThemeVariables
}

/**
 * 移除元素上的所有CSS变量
 */
export function removeCSSVariables(
  element: HTMLElement,
  variables: CSSVariables,
): void {
  Object.keys(variables).forEach(property => {
    element.style.removeProperty(property)
  })
}
