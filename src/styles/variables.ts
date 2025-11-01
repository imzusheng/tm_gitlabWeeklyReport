/**
 * CSS 变量定义 - 用于内联注入到容器节点
 */

export interface CSSVariables {
  [key: string]: string
}

// 浅色主题变量
export const lightThemeVariables: CSSVariables = {
  // 主要背景色
  '--glwr-bg-primary': '#fff',
  '--glwr-bg-secondary': '#f2f2f7',
  '--glwr-bg-tertiary': '#f5f5f7',
  '--glwr-bg-quaternary': 'rgba(252, 253, 255, 0.65)',
  '--glwr-bg-disabled': '#f0f0f0',
  '--glwr-bg-color': '#fff',
  '--glwr-bg-hover-color': '#f2f2f7',
  '--glwr-bg-secondary-color': '#f2f2f7',

  // 文本颜色
  '--glwr-text-primary': '#1d1d1f',
  '--glwr-text-secondary': '#86868b',
  '--glwr-text-tertiary': '#666',
  '--glwr-text-quaternary': '#8e8e93',
  '--glwr-text-disabled': '#c7c7cc',
  '--glwr-text-color': '#1d1d1f',
  '--glwr-text-secondary-color': '#86868b',

  // 边框颜色
  '--glwr-border-primary': 'rgb(0 0 0 / 8%)',
  '--glwr-border-secondary': 'rgb(0 0 0 / 5%)',
  '--glwr-border-tertiary': '#e5e5e7',
  '--glwr-border-quaternary': '#d2d2d7',
  '--glwr-border-light': 'rgb(0 0 0 / 5%)',
  '--glwr-border-color': 'rgb(0 0 0 / 8%)',

  // 品牌色
  '--glwr-color-primary': '#007aff',
  '--glwr-color-primary-hover': '#0051d5',
  '--glwr-color-primary-dark': '#0051d5',
  '--glwr-color-primary-light': 'rgb(0 122 255 / 10%)',
  '--glwr-color-primary-lighter': 'rgb(0 122 255 / 5%)',
  '--glwr-primary-rgb': '0, 122, 255',
  '--glwr-primary-hover': 'rgb(0 81 213 / 10%)',
  '--glwr-primary-shadow': 'rgb(74 158 255 / 25%)',

  // 功能色
  '--glwr-color-success': '#34c759',
  '--glwr-color-success-light': 'rgb(52 199 89 / 10%)',
  '--glwr-color-success-lighter': 'rgb(52 199 89 / 5%)',
  '--glwr-success-color': '#34c759',
  '--glwr-color-warning': '#ff9500',
  '--glwr-color-warning-light': 'rgb(255 149 0 / 10%)',
  '--glwr-color-warning-lighter': 'rgb(255 149 0 / 5%)',
  '--glwr-color-warning-dark': '#e6850e',
  '--glwr-warning-color': '#ff9500',
  '--glwr-color-error': '#ff3b30',
  '--glwr-color-error-bg': '#f8d7da',
  '--glwr-color-error-border': '#f5c6cb',
  '--glwr-color-error-text': '#721c24',
  '--glwr-color-error-light': 'rgb(255 59 48 / 10%)',
  '--glwr-error-color': '#ff3b30',
  '--glwr-error-hover-color': '#ff1507',
  '--glwr-color-danger': '#ff3b30',
  '--glwr-color-danger-light': 'rgb(255 59 48 / 10%)',
  '--glwr-color-danger-lighter': 'rgb(255 59 48 / 5%)',
  '--glwr-color-info': '#5856d6',
  '--glwr-color-info-light': 'rgb(88 86 214 / 10%)',

  // 阴影
  '--glwr-shadow-xs': '0 1px 4px rgb(0 0 0 / 4%)',
  '--glwr-shadow-sm': '0 2px 8px rgb(0 0 0 / 6%)',
  '--glwr-shadow-md': '0 4px 16px rgb(0 0 0 / 10%)',
  '--glwr-shadow-lg': '0 8px 32px rgb(0 0 0 / 15%)',
  '--glwr-shadow-xl': '0 20px 60px rgb(0 0 0 / 15%)',

  // 滚动条
  '--glwr-scrollbar-thumb': '#d1d1d6',
  '--glwr-scrollbar-thumb-hover': '#b4b4b9',

  // 遮罩层
  '--glwr-overlay': 'rgba(0, 0, 0, 0.05)',
  '--glwr-overlay-light': 'rgba(0, 0, 0, 0.03)',
  '--glwr-overlay-heavy': 'rgba(0, 0, 0, 0.08)',

  // 按钮
  '--glwr-btn-bg': '#f2f2f7',
  '--glwr-btn-text': '#213547',
  '--glwr-btn-primary-text': '#fff',
  '--glwr-btn-border': 'rgb(0 0 0 / 10%)',
  '--glwr-btn-hover-bg': 'rgb(0 0 0 / 6%)',

  // 悬停背景
  '--glwr-bg-hover': 'rgb(0 0 0 / 4%)',
  '--glwr-primary-bg-hover': 'rgb(74 158 255 / 10%)',

  // 输入框
  '--glwr-input-bg': '#fff',
  '--glwr-input-border': '#ddd',
  '--glwr-input-focus-border': '#007bff',
  '--glwr-input-focus-shadow': 'rgb(0 123 255 / 10%)',

  // 模态框专用
  '--glwr-header-bg': '#fff',
  '--glwr-header-border': '#e5e5e7',
  '--glwr-footer-bg': '#f2f2f7',
  '--glwr-footer-border': '#e5e5e7',
  '--glwr-section-bg': '#fff',
  '--glwr-section-border': '#e5e5e7',
  '--glwr-section-hover-bg': '#f2f2f7',
  '--glwr-section-hover-border': '#d2d2d7',
  '--glwr-item-border': '#e5e5e7',
  '--glwr-close-btn-bg': '#f2f2f7',
  '--glwr-close-btn-hover-bg': '#e5e5e7',
  '--glwr-close-modal-bg': 'transparent',
  '--glwr-close-modal-border': '#ddd',
  '--glwr-close-modal-hover-bg': '#f2f2f7',
  '--glwr-close-modal-hover-border': '#bbb',
}

// 深色主题变量
export const darkThemeVariables: CSSVariables = {
  // 主要背景色
  '--glwr-bg-primary': '#1a1a1a',
  '--glwr-bg-secondary': '#1c1c1e',
  '--glwr-bg-tertiary': '#2c2c2e',
  '--glwr-bg-quaternary': 'rgb(28 28 30 / 80%)',
  '--glwr-bg-disabled': '#2c2c2e',
  '--glwr-bg-color': '#1a1a1a',
  '--glwr-bg-hover-color': '#1c1c1e',
  '--glwr-bg-secondary-color': '#1c1c1e',

  // 文本颜色
  '--glwr-text-primary': '#fff',
  '--glwr-text-secondary': '#8e8e93',
  '--glwr-text-tertiary': '#98989d',
  '--glwr-text-quaternary': '#636366',
  '--glwr-text-disabled': '#48484a',
  '--glwr-text-color': '#fff',
  '--glwr-text-secondary-color': '#8e8e93',

  // 边框颜色
  '--glwr-border-primary': 'rgb(255 255 255 / 10%)',
  '--glwr-border-secondary': 'rgb(255 255 255 / 8%)',
  '--glwr-border-tertiary': '#424245',
  '--glwr-border-quaternary': '#48484a',
  '--glwr-border-light': 'rgb(255 255 255 / 8%)',
  '--glwr-border-color': 'rgb(255 255 255 / 10%)',

  // 品牌色
  '--glwr-color-primary': '#4a9eff',
  '--glwr-color-primary-hover': '#64b5f6',
  '--glwr-color-primary-dark': '#3a8eef',
  '--glwr-color-primary-light': 'rgb(74 158 255 / 20%)',
  '--glwr-color-primary-lighter': 'rgb(74 158 255 / 10%)',
  '--glwr-primary-rgb': '74, 158, 255',
  '--glwr-primary-hover': 'rgb(100 181 246 / 20%)',
  '--glwr-primary-shadow': 'rgb(74 158 255 / 30%)',

  // 功能色
  '--glwr-color-success': '#32d74b',
  '--glwr-color-success-light': 'rgb(52 199 89 / 20%)',
  '--glwr-color-success-lighter': 'rgb(52 199 89 / 10%)',
  '--glwr-success-color': '#32d74b',
  '--glwr-color-warning': '#ff9f0a',
  '--glwr-color-warning-light': 'rgb(255 149 0 / 20%)',
  '--glwr-color-warning-lighter': 'rgb(255 149 0 / 10%)',
  '--glwr-color-warning-dark': '#cc7f08',
  '--glwr-warning-color': '#ff9f0a',
  '--glwr-color-error': '#ff453a',
  '--glwr-color-error-bg': '#5c2122',
  '--glwr-color-error-border': '#7c2e2f',
  '--glwr-color-error-text': '#f8d7da',
  '--glwr-color-error-light': 'rgb(255 69 58 / 20%)',
  '--glwr-error-color': '#ff453a',
  '--glwr-error-hover-color': '#ff6b60',
  '--glwr-color-danger': '#ff453a',
  '--glwr-color-danger-light': 'rgb(255 69 58 / 20%)',
  '--glwr-color-danger-lighter': 'rgb(255 69 58 / 10%)',
  '--glwr-color-info': '#5e5ce6',
  '--glwr-color-info-light': 'rgb(88 86 214 / 20%)',

  // 阴影
  '--glwr-shadow-xs': '0 1px 4px rgb(0 0 0 / 10%)',
  '--glwr-shadow-sm': '0 2px 8px rgb(0 0 0 / 20%)',
  '--glwr-shadow-md': '0 4px 16px rgb(0 0 0 / 30%)',
  '--glwr-shadow-lg': '0 8px 32px rgb(0 0 0 / 40%)',
  '--glwr-shadow-xl': '0 20px 60px rgb(0 0 0 / 50%)',

  // 滚动条
  '--glwr-scrollbar-thumb': '#48484a',
  '--glwr-scrollbar-thumb-hover': '#636366',

  // 遮罩层
  '--glwr-overlay': 'rgb(0 0 0 / 60%)',
  '--glwr-overlay-light': 'rgb(0 0 0 / 60%)',
  '--glwr-overlay-heavy': 'rgb(0 0 0 / 80%)',

  // 按钮
  '--glwr-btn-bg': '#1a1a1a',
  '--glwr-btn-text': 'rgb(255 255 255 / 87%)',
  '--glwr-btn-primary-text': '#fff',
  '--glwr-btn-border': 'rgb(255 255 255 / 20%)',
  '--glwr-btn-hover-bg': 'rgb(255 255 255 / 10%)',

  // 悬停背景
  '--glwr-bg-hover': 'rgb(255 255 255 / 6%)',
  '--glwr-primary-bg-hover': 'rgb(74 158 255 / 20%)',

  // 输入框
  '--glwr-input-bg': '#2c2c2e',
  '--glwr-input-border': '#48484a',
  '--glwr-input-focus-border': '#64b5f6',
  '--glwr-input-focus-shadow': 'rgb(100 181 246 / 10%)',

  // 模态框专用
  '--glwr-header-bg': '#2c2c2e',
  '--glwr-header-border': '#424245',
  '--glwr-footer-bg': '#2c2c2e',
  '--glwr-footer-border': '#424245',
  '--glwr-section-bg': '#1a1a1a',
  '--glwr-section-border': '#424245',
  '--glwr-section-hover-bg': '#1c1c1e',
  '--glwr-section-hover-border': '#48484a',
  '--glwr-item-border': '#424245',
  '--glwr-close-btn-bg': '#1c1c1e',
  '--glwr-close-btn-hover-bg': '#424245',
  '--glwr-close-modal-bg': 'transparent',
  '--glwr-close-modal-border': '#48484a',
  '--glwr-close-modal-hover-bg': '#1c1c1e',
  '--glwr-close-modal-hover-border': '#636366',
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
