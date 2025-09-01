import { useEffect, useMemo } from 'react'
import { useAppStore } from '@/stores/app-store'

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

  // 监听系统主题变化并应用主题类
  useEffect(() => {
    // 应用主题类到 body 元素
    document.body.className = document.body.className
      .replace(/\b(light|dark)\b/g, '')
      .trim()
    document.body.classList.add(actualTheme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
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
