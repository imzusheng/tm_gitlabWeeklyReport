import React from 'react'
import styles from './index.module.less'

interface PaginationProps {
  current: number
  pageSize: number
  total: number
  onChange: (page: number) => void
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  onShowSizeChange?: (current: number, size: number) => void
  selectedCount?: number
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = true,
  pageSizeOptions = [20, 50, 100, 200],
  onShowSizeChange,
  selectedCount = 0,
}) => {
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, total)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange(page)
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    if (onShowSizeChange) {
      onShowSizeChange(1, newPageSize)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showRange = 2 // 当前页前后显示的页数

    if (totalPages <= 7) {
      // 总页数少于等于7页，显示所有页
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1))
    } else {
      // 总页数多于7页，显示省略号
      pages.push(1)

      if (current > showRange + 2) {
        pages.push('...')
      }

      const start = Math.max(2, current - showRange)
      const end = Math.min(totalPages - 1, current + showRange)

      pages.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
      )

      if (current < totalPages - showRange - 1) {
        pages.push('...')
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (total === 0) {
    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          暂无数据
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        显示 {startItem}-{endItem} 条，共 {total} 条{selectedCount > 0 ? `，已选中 ${selectedCount} 条` : ''}
      </div>

      <div className={styles.paginationControls}>
        {/* 上一页 */}
        <button
          className={`${styles.paginationBtn} ${current === 1 ? styles.disabled : ''}`}
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
        >
          <span>‹</span>
        </button>

        {/* 页码 */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                className={`${styles.paginationBtn} ${current === page ? styles.active : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span className={styles.paginationEllipsis}>{page}</span>
            )}
          </React.Fragment>
        ))}

        {/* 下一页 */}
        <button
          className={`${styles.paginationBtn} ${current === totalPages ? styles.disabled : ''}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
        >
          <span>›</span>
        </button>
      </div>

      {/* 每页显示数量选择器 */}
      {showSizeChanger && (
        <div className={styles.paginationSizeChanger}>
          <span>每页</span>
          <select
            value={pageSize}
            onChange={e => handlePageSizeChange(Number(e.target.value))}
            className={styles.paginationSelect}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>条</span>
        </div>
      )}
    </div>
  )
}

export default Pagination
