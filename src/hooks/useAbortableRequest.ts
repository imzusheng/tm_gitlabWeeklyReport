import { useRef, useCallback, useEffect } from 'react'

/**
 * 可取消请求的自定义Hook
 * 提供请求取消功能，避免竞态条件
 */
export const useAbortableRequest = () => {
  const abortControllerRef = useRef<AbortController | null>(null)

  /**
   * 创建新的请求控制器，并取消之前的请求
   * @returns AbortController 实例
   */
  const createRequest = useCallback((): AbortController => {
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // 创建新的 AbortController
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    return abortController
  }, [])

  /**
   * 取消当前请求
   */
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  /**
   * 检查请求是否被取消
   * @param controller AbortController 实例
   * @returns 是否被取消
   */
  const isRequestCancelled = useCallback(
    (controller: AbortController): boolean => {
      return controller.signal.aborted
    },
    [],
  )

  /**
   * 清理控制器引用
   * @param controller 当前的 AbortController 实例
   */
  const cleanupRequest = useCallback((controller: AbortController) => {
    if (abortControllerRef.current === controller) {
      abortControllerRef.current = null
    }
  }, [])

  /**
   * 检查错误是否为取消错误
   * @param error 错误对象
   * @returns 是否为取消错误
   */
  const isAbortError = useCallback((error: unknown): boolean => {
    return error instanceof Error && error.name === 'AbortError'
  }, [])

  // 组件卸载时取消所有请求
  useEffect(() => {
    return () => {
      cancelRequest()
    }
  }, [cancelRequest])

  return {
    createRequest,
    cancelRequest,
    isRequestCancelled,
    cleanupRequest,
    isAbortError,
  }
}

export default useAbortableRequest
