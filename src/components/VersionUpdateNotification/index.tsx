import React, { useState, useCallback, useEffect } from 'react'

import { request } from '@/utils/request'
import styles from './index.module.less'

interface VersionInfo {
  version: string
  downloadUrl: string
  releaseNotes?: string
}

interface VersionUpdateNotificationProps {
  currentVersion: string
}

const VersionUpdateNotification: React.FC<VersionUpdateNotificationProps> = ({
  currentVersion,
}) => {
  const [latestVersion, setLatestVersion] = useState<VersionInfo | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [hasNewVersion, setHasNewVersion] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false) // 标记是否已检查过

  const [dismissedVersions, setDismissedVersions] = useState<Set<string>>(
    new Set(),
  )

  // 初始化时从localStorage读取忽略的版本
  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        'gitlab-weekly-report-dismissed-versions',
      )
      if (stored) {
        setDismissedVersions(new Set(JSON.parse(stored)))
      }
    } catch (err) {
      console.warn('无法读取忽略版本信息:', err)
    }
  }, [])

  /**
   * 比较版本号
   * @param current 当前版本
   * @param latest 最新版本
   * @returns 如果latest版本更新则返回true
   */
  const compareVersions = useCallback(
    (current: string, latest: string): boolean => {
      const currentParts = current.split('.').map(Number)
      const latestParts = latest.split('.').map(Number)

      const maxLength = Math.max(currentParts.length, latestParts.length)

      for (let i = 0; i < maxLength; i++) {
        const currentPart = currentParts[i] || 0
        const latestPart = latestParts[i] || 0

        if (latestPart > currentPart) {
          return true
        } else if (latestPart < currentPart) {
          return false
        }
      }

      return false
    },
    [],
  )

  /**
   * 检查版本更新
   * @param forceShow 是否强制显示通知（手动检查时为true）
   */
  const checkForUpdates = useCallback(
    async (forceShow = true) => {
      if (isChecking) return

      // 如果已经检查过且有缓存结果，直接显示通知而不重新请求
      if (hasCheckedOnce && latestVersion && hasNewVersion && forceShow) {
        if (forceShow || !dismissedVersions.has(latestVersion.version)) {
          setShowNotification(true)
          console.log(`使用缓存结果显示新版本 ${latestVersion.version}`)
        }
        return
      }

      setIsChecking(true)
      setError(null)

      try {
        // 从远程仓库获取package.json文件来检查版本
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时

        // 添加时间戳防止缓存
        const timestamp = Date.now()

        // 在开发环境中且不是油猴脚本环境时，使用代理URL
        const isDev = process.env.NODE_ENV === 'development'
        const isUserscript = typeof GM_xmlhttpRequest !== 'undefined'
        const baseUrl =
          isDev && !isUserscript
            ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
            : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json'

        const response = await request(`${baseUrl}?t=${timestamp}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          signal: controller.signal,
          timeout: 10000,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const packageData = (await response.json()) as { version: string }
        console.log('获取到版本信息:', packageData)

        const versionInfo: VersionInfo = {
          version: packageData.version,
          downloadUrl:
            'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
          releaseNotes: `版本 ${packageData.version} 已发布，请及时更新以获得最新功能和修复。`,
        }

        setLatestVersion(versionInfo)
        setLastCheckTime(new Date())
        setHasCheckedOnce(true) // 标记已检查过

        // 检查是否有新版本
        const hasUpdate = compareVersions(currentVersion, versionInfo.version)
        setHasNewVersion(hasUpdate)

        // 检查是否显示通知
        if (hasUpdate) {
          // 如果是强制显示（手动检查）或者版本未被忽略，则显示通知
          if (forceShow || !dismissedVersions.has(versionInfo.version)) {
            setShowNotification(true)
            console.log(`发现新版本 ${versionInfo.version}，建议及时更新！`)
          } else {
            console.log(`发现新版本 ${versionInfo.version}，但已被忽略`)
          }
        } else {
          console.log('当前已是最新版本')
        }
      } catch (err) {
        console.error('检查版本更新失败:', err)
        const errorMessage = err instanceof Error ? err.message : '检查更新失败'
        setError(errorMessage)
        console.error(`检查更新失败: ${errorMessage}`)
      } finally {
        setIsChecking(false)
      }
    },
    [
      isChecking,
      compareVersions,
      currentVersion,
      dismissedVersions,
      hasCheckedOnce,
      latestVersion,
      hasNewVersion,
    ],
  )

  // 组件初始化时自动检查更新（遵循忽略列表）
  useEffect(() => {
    const timer = setTimeout(() => {
      checkForUpdates(false) // 自动检查不强制显示通知
    }, 1000) // 延迟1秒后自动检查

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 手动更新
   */
  const handleUpdate = useCallback(async () => {
    if (latestVersion?.downloadUrl) {
      window.open(latestVersion.downloadUrl, '_blank')
      // 更新后关闭通知
      setShowNotification(false)

      // 重新检查版本并提示结果
      setTimeout(async () => {
        await checkForUpdates(false) // 更新后的自动检查不强制显示
        const isLatest = !compareVersions(currentVersion, latestVersion.version)
        if (isLatest) {
          console.log('当前已是最新版本！')
        } else {
          console.log(
            `检测到新版本 ${latestVersion.version}，请手动刷新页面或重新安装脚本。`,
          )
        }
      }, 1000) // 延迟1秒后检查
    }
  }, [latestVersion, checkForUpdates, compareVersions, currentVersion])

  /**
   * 清除所有忽略的版本（调试用）
   */
  const clearDismissedVersions = useCallback(() => {
    setDismissedVersions(new Set())
    try {
      localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
    } catch (err) {
      console.warn('无法清除忽略版本信息:', err)
    }
  }, [])

  /**
   * 关闭通知
   */
  const handleCloseNotification = useCallback(() => {
    setShowNotification(false)
    // 记录用户忽略的版本
    if (latestVersion) {
      const newDismissedVersions = new Set(dismissedVersions)
      newDismissedVersions.add(latestVersion.version)
      setDismissedVersions(newDismissedVersions)

      try {
        localStorage.setItem(
          'gitlab-weekly-report-dismissed-versions',
          JSON.stringify(Array.from(newDismissedVersions)),
        )
      } catch (err) {
        console.warn('无法保存忽略版本信息:', err)
      }
    }
  }, [latestVersion, dismissedVersions])

  /**
   * 格式化时间
   */
  const formatTime = useCallback((date: Date): string => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }, [])

  /**
   * 获取按钮文案
   */
  const getButtonText = useCallback((): string => {
    if (isChecking) return '检查中...'
    if (error) return '检查失败'
    if (hasNewVersion) return '有更新'
    if (hasCheckedOnce && !hasNewVersion) return '已是最新版本 🎉'
    return '检查更新'
  }, [isChecking, error, hasNewVersion, hasCheckedOnce])

  /**
   * 获取按钮图标
   */
  const getButtonIcon = useCallback((): string => {
    if (isChecking) return '🔄'
    if (error) return '⚠️'
    if (hasNewVersion) return '🔴'
    return '🔍'
  }, [isChecking, error, hasNewVersion])

  // 开发模式下的快捷键支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + U 清除忽略的版本
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'U'
      ) {
        event.preventDefault()
        clearDismissedVersions()
        console.log('已清除所有忽略的版本')
      }
    }

    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [clearDismissedVersions])

  return (
    <>
      {/* 版本检查按钮 */}
      <button
        className={`${styles.actionBtn} ${styles.versionBtn} ${isChecking ? styles.checking : ''} ${hasNewVersion ? styles.hasUpdate : ''}`}
        onClick={() => checkForUpdates(true)} // 手动检查强制显示通知
        disabled={isChecking}
        title={
          lastCheckTime
            ? `上次检查: ${formatTime(lastCheckTime)}${error ? `\n错误: ${error}` : ''}`
            : '点击检查更新'
        }
      >
        <span className={styles.icon}>{getButtonIcon()}</span>
        <span className={styles.text}>{getButtonText()}</span>
      </button>

      {/* 更新通知弹窗 */}
      {showNotification && hasNewVersion && latestVersion && (
        <div className={styles.notificationOverlay}>
          <div className={styles.notification}>
            <div className={styles.notificationHeader}>
              <h3>🎉 发现新版本</h3>
              <button
                className={styles.closeBtn}
                onClick={handleCloseNotification}
              >
                ×
              </button>
            </div>

            <div className={styles.notificationBody}>
              <div className={styles.versionInfo}>
                <p>
                  <strong>当前版本:</strong> v{currentVersion}
                </p>
                <p>
                  <strong>最新版本:</strong> v{latestVersion.version}
                </p>
              </div>

              {latestVersion.releaseNotes && (
                <div className={styles.releaseNotes}>
                  <h4>更新说明:</h4>
                  <div className={styles.notesContent}>
                    {latestVersion.releaseNotes}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.notificationFooter}>
              <button
                className={styles.laterBtn}
                onClick={handleCloseNotification}
              >
                稍后更新
              </button>
              <button className={styles.updateBtn} onClick={handleUpdate}>
                立即更新
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VersionUpdateNotification
