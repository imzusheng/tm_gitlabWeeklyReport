import './data-panel.less'
import { createElement, Fragment } from '../utils/jsx-runtime.js';

// 右侧数据面板组件
export function DataPanel({
  onClosePanel,
  onRefreshEvents,
  onClearFilters,
  onSelectAll,
  startDate,
  endDate,
  onThisWeek,
  onLastWeek,
  onThisMonth,
  onLastMonth
}) {
  return (
    <div data-name="tm-gwe-ui-panel__events-table" className="data-panel pro-table">
      {/* ProTable 风格的头部工具栏 */}
      <div className="pro-table-header">
        <div className="header-left">
          <div className="table-title">
            <span className="title-icon">📊</span>
            <h3>GitLab 数据表格</h3>
          </div>
        </div>
        <div className="header-right">
          <div className="header-actions">
            <button id="refreshEvents" onClick={onRefreshEvents} className="action-btn refresh" title="刷新数据">
              <span className="btn-icon">🔄</span>
            </button>
            <button id="clearFilters" onClick={onClearFilters} className="action-btn clear" title="清除筛选">
              <span className="btn-icon">🗑️</span>
            </button>
            <button id="closePanel" onClick={onClosePanel} className="action-btn close" title="关闭面板">
              <span className="btn-icon">×</span>
            </button>
          </div>
        </div>
      </div>

      {/* ProTable 风格的查询表单 */}
      <div className="pro-table-query">
        <div className="query-form">
          <div className="form-row">
            {/* 日期范围选择 */}
            <div className="form-item date-range-item">
              <label className="form-label">时间范围</label>
              <div className="date-range-picker">
                <input type="date" id="startDate" value={startDate} className="date-input start-date" />
                <span className="date-separator">~</span>
                <input type="date" id="endDate" value={endDate} className="date-input end-date" />
              </div>
            </div>
            
            {/* 类型筛选 */}
            <div className="form-item">
              <label className="form-label">类型</label>
              <select id="targetTypeFilter" className="form-select">
                <option value="">全部类型</option>
                <option value="Epic">Epic</option>
                <option value="Issue">Issue</option>
                <option value="MergeRequest">Merge Request</option>
                <option value="Milestone">Milestone</option>
                <option value="Note2">Note2</option>
                <option value="Project">Project</option>
                <option value="Snippet">Snippet</option>
                <option value="User">User</option>
              </select>
            </div>
            
            {/* 每页显示 */}
            <div className="form-item">
              <label className="form-label">每页</label>
              <select id="pageSizeFilter" className="form-select">
                <option value="10">10 条</option>
                <option value="20" selected>20 条</option>
                <option value="50">50 条</option>
              </select>
            </div>
            
            {/* 搜索框 */}
            <div className="form-item search-item">
              <label className="form-label">搜索</label>
              <div className="search-input-wrapper">
                <input type="text" id="searchFilter" className="search-input" placeholder="搜索内容、标题..." />
                <span className="search-icon">🔍</span>
              </div>
            </div>
          </div>
          
          {/* 快速时间选择 */}
          <div className="quick-time-bar">
            <span className="quick-label">快速选择:</span>
            <div className="quick-buttons">
              <button id="thisWeek" onClick={onThisWeek} className="quick-btn">本周</button>
              <button id="lastWeek" onClick={onLastWeek} className="quick-btn">上周</button>
              <button id="thisMonth" onClick={onThisMonth} className="quick-btn">本月</button>
              <button id="lastMonth" onClick={onLastMonth} className="quick-btn">上月</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 表格内容区域 */}
      <div id="scrollableContent" className="scrollable-content">
        <div className="table-container">
          <table id="eventsTable" className="events-table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input type="checkbox" id="selectAll" onClick={onSelectAll} title="全选/取消全选" checked />
                </th>
                <th className="id-column">#</th>
                <th className="type-column" data-sort="target_type" title="点击排序">
                  类型 <span className="sort-indicator">↕️</span>
                </th>
                <th className="time-column" data-sort="created_at" title="点击排序">
                  时间 <span className="sort-indicator">↕️</span>
                </th>
                <th className="content-column" data-sort="target_title" title="点击排序">
                  提交内容 <span className="sort-indicator">↕️</span>
                </th>
                <th className="action-column">操作</th>
              </tr>
            </thead>
            <tbody id="eventsBody">
            </tbody>
          </table>
        </div>
      </div>
        
      {/* 分页控件 */}
      <div id="paginationControls" className="pagination-controls">
        <div className="pagination-buttons">
          <button id="firstPage" className="page-button" disabled>首页</button>
          <button id="prevPage" className="page-button" disabled>上一页</button>
          <span id="pageInfo" className="page-info">第 1 页，共 1 页</span>
          <button id="nextPage" className="page-button" disabled>下一页</button>
          <button id="lastPage" className="page-button" disabled>末页</button>
        </div>
        <div className="total-info">
          <span id="totalInfo">共 0 条记录</span>
        </div>
      </div>
    </div>
  );
}