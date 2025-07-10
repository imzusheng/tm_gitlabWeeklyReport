import React from 'react'
import { useAppContext } from '@/context/AppContext'
import styles from './index.module.less'

const Pagination: React.FC = () => {
  const { state, updatePaginationOptions } = useAppContext()
  const { paginationOptions } = state
  const { page: current, pageSize, total } = paginationOptions
  const showSizeChanger = true
  const pageSizeOptions = [20, 50, 100, 200]

  const totalPages = Math.ceil(total / pageSize)
  const startItem = (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, total)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      updatePaginationOptions({ page })
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    updatePaginationOptions({ page: 1, pageSize: newPageSize })
  }

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = [1]
    const showRange = 2
    const start = Math.max(2, current - showRange)
    const end = Math.min(totalPages - 1, current + showRange)

    if (current > showRange + 2) {
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < totalPages - showRange - 1) {
      pages.push('...')
    }

    pages.push(totalPages)

    return pages
  }

  if (total === 0) {
    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <span>共 0 条</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        <span>
          显示 {startItem}-{endItem} 条，共 {total} 条
        </span>
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

export default React.memo(Pagination)
