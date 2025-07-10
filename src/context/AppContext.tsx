import { createContext, useContext } from 'react'
import { useAppState } from '@/hooks/useAppState'

/**
 * AppContext 的类型定义
 * @description 使用 `ReturnType` 从 `useAppState` Hook 中自动推断类型
 * @public
 */
export type AppContextType = ReturnType<typeof useAppState>

/**
 * 全局应用上下文
 * @description 用于在组件树中传递全局状态和操作函数，避免 props drilling
 * @public
 */
export const AppContext = createContext<AppContextType | null>(null)

/**
 * @hook useAppContext
 * @description 用于消费 AppContext 的自定义 Hook
 * @returns {AppContextType} 返回 AppContext 的值
 * @throws {Error} 如果在 AppContext.Provider 外部使用，将抛出错误
 * @public
 *
 * @example
 * ```tsx
 * const { state, setLoading } = useAppContext();
 * ```
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext 必须在 AppContextProvider 内部使用')
  }
  return context
}
