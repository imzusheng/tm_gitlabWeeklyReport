import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useAppState } from '@/hooks/useAppState'
import type { GitLabProject, GitLabApiService } from '@/types'
import { errorUtils } from '@/utils'
import styles from './index.module.less'

// 项目筛选条件类型
interface ProjectFilterConditions {
  starred: boolean
  membership: boolean
}

// 项目缓存接口
interface ProjectCache {
  projects: GitLabProject[]
  totalCount: number
  timestamp: number
  filters: ProjectFilterConditions
  sortBy: 'last_activity_at' | 'name' | 'created_at'
  searchValue: string
}

// 缓存管理类
class ProjectCacheManager {
  private static instance: ProjectCacheManager
  private cache = new Map<string, ProjectCache>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

  static getInstance(): ProjectCacheManager {
    if (!ProjectCacheManager.instance) {
      ProjectCacheManager.instance = new ProjectCacheManager()
    }
    return ProjectCacheManager.instance
  }

  private getCacheKey(
    gitlabUrl: string,
    token: string,
    filters: ProjectFilterConditions,
    sortBy: 'last_activity_at' | 'name' | 'created_at',
    searchValue: string,
  ): string {
    return `${gitlabUrl}_${token}_${JSON.stringify(filters)}_${sortBy}_${searchValue}`
  }

  get(
    gitlabUrl: string,
    token: string,
    filters: ProjectFilterConditions,
    sortBy: 'last_activity_at' | 'name' | 'created_at',
    searchValue: string,
  ): ProjectCache | null {
    const key = this.getCacheKey(gitlabUrl, token, filters, sortBy, searchValue)
    const cached = this.cache.get(key)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached
    }

    // 清理过期缓存
    this.cache.delete(key)
    return null
  }

  set(
    gitlabUrl: string,
    token: string,
    filters: ProjectFilterConditions,
    sortBy: 'last_activity_at' | 'name' | 'created_at',
    searchValue: string,
    projects: GitLabProject[],
    totalCount: number,
  ): void {
    const key = this.getCacheKey(gitlabUrl, token, filters, sortBy, searchValue)
    this.cache.set(key, {
      projects,
      totalCount,
      timestamp: Date.now(),
      filters,
      sortBy,
      searchValue,
    })
  }

  clear(): void {
    this.cache.clear()
  }

  // 清理过期缓存
  cleanup(): void {
    const now = Date.now()
    for (const [key, cache] of this.cache.entries()) {
      if (now - cache.timestamp >= this.CACHE_DURATION) {
        this.cache.delete(key)
      }
    }
  }
}

interface ProjectSelectorProps {
  /** GitLab API 服务实例 */
  gitlabService: GitLabApiService
  /** 当前选中的项目ID */
  selectedProjectId: number | null
  /** 项目选择回调 */
  onProjectSelect: (projectId: number | null) => void
  /** 配置是否有效 */
  isConfigValid: () => boolean
  /** 是否禁用 */
  disabled?: boolean
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  gitlabService,
  selectedProjectId,
  onProjectSelect,
  isConfigValid,
  disabled = false,
}) => {
  const { state } = useAppState()
  const [isOpen, setIsOpen] = useState(false)
  const [projects, setProjects] = useState<GitLabProject[]>([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState<
    'last_activity_at' | 'name' | 'created_at'
  >('last_activity_at')
  const [filters, setFilters] = useState<ProjectFilterConditions>({
    starred: false,
    membership: true,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const cacheManager = useRef(ProjectCacheManager.getInstance())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pageSize = 20

  // 获取项目列表
  const fetchProjects = useCallback(
    async (search?: string, page?: number) => {
      if (!isConfigValid()) return

      const currentSearch = search || searchValue || ''
      const currentFilters = filters
      const currentSortBy = sortBy

      // 检查缓存
      const cached = cacheManager.current.get(
        state.config.gitlabUrl,
        state.config.gitlabToken,
        currentFilters,
        currentSortBy,
        currentSearch,
      )

      if (cached && (page || currentPage) === 1) {
        setProjects(cached.projects)
        setTotalCount(cached.totalCount)

        // 如果当前没有选中项目且有项目列表，自动选择第一个
        if (!selectedProjectId && cached.projects.length > 0) {
          onProjectSelect(cached.projects[0].id)
        }
        return
      }

      setLoading(true)
      setError(null)

      try {
        await gitlabService.init()

        const options = {
          membership: currentFilters.membership || undefined,
          starred: currentFilters.starred || undefined,
          simple: true,
          order_by: currentSortBy,
          search: currentSearch || undefined,
          page: page || currentPage,
          per_page: pageSize,
        }

        const { projects: fetchedProjects, total } =
          await gitlabService.getProjectsWithTotal(options)

        // 只缓存第一页的数据
        if ((page || currentPage) === 1) {
          cacheManager.current.set(
            state.config.gitlabUrl,
            state.config.gitlabToken,
            currentFilters,
            currentSortBy,
            currentSearch,
            fetchedProjects,
            total,
          )
        }

        setProjects(fetchedProjects)
        setTotalCount(total)

        // 如果当前没有选中项目且有项目列表，自动选择第一个
        if (!selectedProjectId && fetchedProjects.length > 0) {
          onProjectSelect(fetchedProjects[0].id)
        }
      } catch (err) {
        console.error(
          'Failed to fetch projects:',
          errorUtils.formatErrorMessage(err),
        )
        setError('获取项目列表失败')
        setProjects([])
        setTotalCount(0)
      } finally {
        setLoading(false)
      }
    },
    [
      isConfigValid,
      gitlabService,
      filters,
      sortBy,
      searchValue,
      currentPage,
      selectedProjectId,
      onProjectSelect,
      state.config.gitlabUrl,
      state.config.gitlabToken,
    ],
  )

  // 防抖搜索
  const debouncedSearch = useMemo(() => {
    return (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentPage(1) // 搜索时重置到第一页
        fetchProjects(value, 1)
      }, 300)
    }
  }, [fetchProjects])

  // 初始化加载项目
  useEffect(() => {
    if (isOpen) {
      fetchProjects()
    }
  }, [isOpen, filters, sortBy, currentPage, fetchProjects])

  // 搜索输入处理
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchValue(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  // 排序变化处理
  const handleSortChange = useCallback(
    (newSort: 'last_activity_at' | 'name' | 'created_at') => {
      setSortBy(newSort)
      setCurrentPage(1)
    },
    [],
  )

  // 筛选变化处理
  const handleFilterChange = useCallback(
    (filterKey: 'starred' | 'membership', checked: boolean) => {
      setFilters(prev => ({ ...prev, [filterKey]: checked }))
      setCurrentPage(1)
    },
    [],
  )

  // 项目选择处理
  const handleProjectClick = useCallback(
    (projectId: number) => {
      onProjectSelect(projectId)
      setIsOpen(false)
    },
    [onProjectSelect],
  )

  // 分页处理
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 打开下拉框时聚焦搜索框
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // 当前选中的项目
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId)
  }, [projects, selectedProjectId])

  // 计算总页数
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className={styles.projectSelector} ref={dropdownRef}>
      {/* 选择器触发器 */}
      <div
        className={`${styles.selectorTrigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={styles.selectedText}>
          {selectedProject ? selectedProject.path_with_namespace : '请选择项目'}
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}>
          ▼
        </span>
      </div>

      {/* 下拉面板 */}
      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          {/* 搜索框 */}
          <div className={styles.searchSection}>
            <div className={styles.searchInput}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索项目..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>

            {/* 筛选和排序选项 */}
            <div className={styles.filtersSection}>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.membership}
                    onChange={e =>
                      handleFilterChange('membership', e.target.checked)
                    }
                  />
                  我的项目
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.starred}
                    onChange={e =>
                      handleFilterChange('starred', e.target.checked)
                    }
                  />
                  已收藏
                </label>
              </div>
              <div className={styles.sortOptions}>
                <label>排序：</label>
                <select
                  value={sortBy}
                  onChange={e =>
                    handleSortChange(
                      e.target.value as
                        | 'last_activity_at'
                        | 'name'
                        | 'created_at',
                    )
                  }
                >
                  <option value="last_activity_at">按活跃度排序</option>
                  <option value="name">按名称排序</option>
                  <option value="created_at">按创建时间排序</option>
                </select>
              </div>
            </div>
          </div>

          {/* 项目列表 */}
          <div className={styles.projectList}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                加载中...
              </div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : projects.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📄</div>
                <div className={styles.emptyText}>暂无项目</div>
                <div className={styles.emptyHint}>
                  请检查筛选条件或搜索关键词
                </div>
              </div>
            ) : (
              projects.map(project => (
                <div
                  key={project.id}
                  className={`${styles.projectItem} ${
                    project.id === selectedProjectId ? styles.selected : ''
                  }`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className={styles.projectInfo}>
                    <div className={styles.projectName}>{project.name}</div>
                    <div className={styles.projectPath}>
                      {project.path_with_namespace}
                    </div>
                    {project.description && (
                      <div className={styles.projectDescription}>
                        {project.description}
                      </div>
                    )}
                  </div>
                  {project.starred && (
                    <span className={styles.starIcon}>⭐</span>
                  )}
                  {project.id === selectedProjectId && (
                    <span className={styles.checkIcon}>✓</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                上一页
              </button>
              <div className={styles.pageInfo}>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <div className={styles.totalCount}>共 {totalCount} 个项目</div>
              </div>
              <button
                className={styles.pageButton}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                下一页
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectSelector
