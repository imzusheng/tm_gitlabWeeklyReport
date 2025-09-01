import { useCallback } from 'react'
import { useAppStore } from '@/stores/app-store'
import { createGitLabApiService } from '@/services/gitlab-api'
import type { GitLabProject } from '@/types'

/**
 * 项目管理 Hook
 * 负责加载和管理 GitLab 项目数据
 */
export const useProjectManagement = () => {
  const {
    config,
    projects,
    selectedProjectId,
    setProjects,
    setSelectedProjectId,
    setLoading,
    setError,
    validateConfig,
  } = useAppStore()

  /**
   * 加载项目列表
   */
  const loadProjects = useCallback(async () => {
    if (!validateConfig()) {
      setError('GitLab 配置无效，请检查配置')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const gitlabService = createGitLabApiService(
        config.gitlabUrl,
        config.gitlabToken,
      )
      await gitlabService.init()

      const { projects: projectList } =
        await gitlabService.getProjectsWithTotal({
          membership: true,
          per_page: 100,
          order_by: 'last_activity_at',
        })

      setProjects(projectList)
    } catch (error) {
      console.error('Failed to load projects:', error)
      setError(error instanceof Error ? error.message : '加载项目列表失败')
    } finally {
      setLoading(false)
    }
  }, [
    config.gitlabUrl,
    config.gitlabToken,
    validateConfig,
    setProjects,
    setLoading,
    setError,
  ])

  /**
   * 选择项目
   */
  const selectProject = useCallback(
    (projectId: number | null) => {
      setSelectedProjectId(projectId)
    },
    [setSelectedProjectId],
  )

  /**
   * 获取选中的项目
   */
  const getSelectedProject = useCallback((): GitLabProject | null => {
    if (!selectedProjectId) return null
    return projects.find(project => project.id === selectedProjectId) || null
  }, [selectedProjectId, projects])

  return {
    projects,
    selectedProjectId,
    loadProjects,
    selectProject,
    getSelectedProject,
  }
}
