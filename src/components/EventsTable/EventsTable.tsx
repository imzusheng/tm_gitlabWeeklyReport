import React from 'react';
import { GitLabEvent } from '../../types';
import { formatDate } from '../../utils';
import './eventstable.css';

interface EventsTableProps {
  events: GitLabEvent[];
  selectedEvents: Set<string>;
  onToggleSelection: (eventId: string, selected: boolean) => void;
  onToggleSelectAll: (selected: boolean) => void;
  loading?: boolean;
  className?: string;
}

/**
 * GitLab 事件表格组件
 * 显示事件列表，支持选择和全选功能
 */
export const EventsTable: React.FC<EventsTableProps> = ({
  events,
  selectedEvents,
  onToggleSelection,
  onToggleSelectAll,
  loading = false,
  className = '',
}) => {
  // 全选状态
  const isAllSelected = events.length > 0 && selectedEvents.size === events.length;
  const isIndeterminate = selectedEvents.size > 0 && selectedEvents.size < events.length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleSelectAll(event.target.checked);
  };

  const handleEventSelect = (eventId: string, checked: boolean) => {
    onToggleSelection(eventId, checked);
  };

  const getEventTypeIcon = (actionName: string) => {
    switch (actionName) {
      case 'pushed':
        return '📤';
      case 'created':
        return '✨';
      case 'opened':
        return '🔓';
      case 'closed':
        return '🔒';
      case 'merged':
        return '🔀';
      case 'commented':
        return '💬';
      default:
        return '📋';
    }
  };

  const getEventTypeText = (actionName: string) => {
    const typeMap: Record<string, string> = {
      pushed: '推送代码',
      created: '创建',
      opened: '打开',
      closed: '关闭',
      merged: '合并',
      commented: '评论',
    };
    return typeMap[actionName] || actionName;
  };

  if (loading) {
    return (
      <div className={`tm-events-table tm-events-table--loading ${className}`}>
        <div className="tm-events-table__loading">
          <div className="tm-loading">
            <div className="tm-loading__spinner">
              <div className="tm-loading__dot"></div>
              <div className="tm-loading__dot"></div>
              <div className="tm-loading__dot"></div>
            </div>
            <div className="tm-loading__text">加载事件数据中...</div>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={`tm-events-table tm-events-table--empty ${className}`}>
        <div className="tm-events-table__empty">
          <div className="tm-events-table__empty-icon">📋</div>
          <div className="tm-events-table__empty-text">暂无事件数据</div>
          <div className="tm-events-table__empty-hint">
            请检查日期范围或 GitLab 配置
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`tm-events-table ${className}`}>
      <div className="tm-events-table__header">
        <div className="tm-events-table__select-all">
          <input
            type="checkbox"
            className="tm-events-table__select-all"
            checked={isAllSelected}
            onChange={handleSelectAll}
            ref={(input) => {
              if (input) input.indeterminate = isIndeterminate;
            }}
          />
          <span>{`全选 (${selectedEvents.size}/${events.length})`}</span>
        </div>
        <div className="tm-events-table__stats">
          已选择 {selectedEvents.size} 个事件
        </div>
      </div>

      <div className="tm-events-table__body">
        {events.map((event) => {
          const isSelected = selectedEvents.has(event.id.toString());
          
          return (
            <div
              key={event.id}
              className={`tm-events-table__row ${
                isSelected ? 'tm-events-table__row--selected' : ''
              }`}
            >
              <div className="tm-events-table__cell tm-events-table__cell--checkbox">
                <input
                  type="checkbox"
                  className="tm-events-table__checkbox"
                  checked={isSelected}
                  onChange={(e) => handleEventSelect(event.id.toString(), e.target.checked)}
                />
              </div>
              
              <div className="tm-events-table__cell tm-events-table__cell--type">
                <div className="tm-events-table__event-type">
                  <span className="tm-events-table__event-icon">
                    {getEventTypeIcon(event.action_name)}
                  </span>
                  <span className="tm-events-table__event-text">
                    {getEventTypeText(event.action_name)}
                  </span>
                </div>
              </div>
              
              <div className="tm-events-table__cell tm-events-table__cell--title">
                <div className="tm-events-table__event-title">
                  {event.target_title || event.push_data?.commit_title || '无标题'}
                </div>
                {event.target_type && (
                  <div className="tm-events-table__event-target">
                    {event.target_type}
                  </div>
                )}
              </div>
              
              <div className="tm-events-table__cell tm-events-table__cell--project">
                <div className="tm-events-table__project-name">
                  {event.project?.name || '未知项目'}
                </div>
              </div>
              
              <div className="tm-events-table__cell tm-events-table__cell--date">
                <div className="tm-events-table__event-date">
                  {formatDate(event.created_at)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};