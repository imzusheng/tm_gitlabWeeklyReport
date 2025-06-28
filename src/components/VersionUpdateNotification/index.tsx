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

  const [dismissedVersions, setDismissedVersions] = useState<Set<string>>(
    new Set()
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
   */
  const checkForUpdates = useCallback(async () => {
    if (isChecking) return

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
      const baseUrl = isDev && !isUserscript 
        ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
        : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
      
      const response = await request(
        `${baseUrl}?t=${timestamp}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          signal: controller.signal,
          timeout: 10000,
        },
      )

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

      // 检查是否有新版本
      const hasUpdate = compareVersions(currentVersion, versionInfo.version)
      setHasNewVersion(hasUpdate)

      // 只有当版本更新且用户未忽略该版本时才显示通知
      if (hasUpdate && !dismissedVersions.has(versionInfo.version)) {
        setShowNotification(true)
        console.log(`发现新版本 ${versionInfo.version}，建议及时更新！`)
      } else if (!hasUpdate) {
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
  }, [isChecking, compareVersions, currentVersion, dismissedVersions])

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
        await checkForUpdates()
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
        onClick={checkForUpdates}
        disabled={isChecking}
        title={
          lastCheckTime
            ? `上次检查: ${formatTime(lastCheckTime)}${error ? `\n错误: ${error}` : ''}`
            : '点击检查更新'
        }
      >
        <span className={styles.icon}>
          {isChecking ? '🔄' : hasNewVersion ? '🔴' : '🔍'}
        </span>
        <span className={styles.text}>
          {isChecking ? '检查中...' : hasNewVersion ? '有更新' : '检查更新'}
        </span>
      </button>

      {error && (
        <div className={styles.error} title={error}>
          ⚠️ 检查失败
        </div>
      )}

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
