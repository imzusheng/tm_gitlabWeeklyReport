import React from 'react'
import './index.less'

interface PaginationProps {
  current: number
  pageSize: number
  total: number
  onChange: (page: number) => void
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  onShowSizeChange?: (current: number, size: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  onShowSizeChange
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 总页数多于7页，显示省略号
      pages.push(1)

      if (current > showRange + 2) {
        pages.push('...')
      }

      const start = Math.max(2, current - showRange)
      const end = Math.min(totalPages - 1, current + showRange)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

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
    return null
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        显示 {startItem}-{endItem} 条，共 {total} 条
      </div>

      <div className="pagination-controls">
        {/* 上一页 */}
        <button
          className={`pagination-btn ${current === 1 ? 'disabled' : ''}`}
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
                className={`pagination-btn ${current === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span className="pagination-ellipsis">{page}</span>
            )}
          </React.Fragment>
        ))}

        {/* 下一页 */}
        <button
          className={`pagination-btn ${current === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
        >
          <span>›</span>
        </button>
      </div>

      {/* 每页显示数量选择器 */}
      {showSizeChanger && (
        <div className="pagination-size-changer">
          <span>每页</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="pagination-select"
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