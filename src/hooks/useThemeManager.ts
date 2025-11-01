import { useEffect, useMemo } from 'react'
import { useAppStore } from '@/store'
import { applyCSSVariables, getThemeVariables } from '@/styles/variables'

/**
 * 主题管理 Hook
 * 负责主题的切换和系统主题监听
 */
export const useThemeManager = () => {
  const { theme, setTheme } = useAppStore()

  // 计算实际主题
  const actualTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }, [theme])

  // 监听主题变化并应用CSS变量和主题类
  useEffect(() => {
    // 应用CSS变量到:root元素，确保全局可用（包括Modal等Portal组件）
    applyCSSVariables(document.documentElement, getThemeVariables(theme))

    // 应用主题类到 body 元素
    document.body.className = document.body.className
      .replace(/\b(light|dark)\b/g, '')
      .trim()
    document.body.classList.add(actualTheme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        // 更新CSS变量以响应系统主题变化
        applyCSSVariables(document.documentElement, getThemeVariables('system'))
        // 强制重新渲染以更新主题
        window.dispatchEvent(new Event('resize'))
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [theme, actualTheme])

  return {
    theme,
    actualTheme,
    setTheme,
  }
}
