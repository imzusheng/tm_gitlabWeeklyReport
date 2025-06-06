import { useState, useCallback, useMemo } from 'react';
import type { GitLabEvent, DateRange, UseEventsReturn, EventTableRow } from '../types';
import { gitlabService } from '../services/gitlab';
import { formatTime, getPresetDateRange } from '../utils';

/**
 * 事件数据管理 Hook
 */
export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<GitLabEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(() => getPresetDateRange('thisWeek'));
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  /**
   * 获取事件数据
   */
  const fetchEvents = useCallback(async (range?: DateRange) => {
    const targetRange = range || dateRange;
    setIsLoading(true);
    setError(null);
    setProgress({ current: 0, total: 0 });
    
    try {
      const events = await gitlabService.getAllEvents(
        targetRange.startDate,
        targetRange.endDate,
        (current, total) => {
          setProgress({ current, total });
        }
      );
      
      setEvents(events);
      setSelectedEvents(new Set()); // 清空选择
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取事件失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  }, [dateRange]);

  /**
   * 更新日期范围
   */
  const updateDateRange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  /**
   * 切换事件选择状态
   */
  const toggleEventSelection = useCallback((eventId: string) => {
    setSelectedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  }, []);

  /**
   * 全选/取消全选
   */
  const toggleSelectAll = useCallback(() => {
    setSelectedEvents(prev => {
      if (prev.size === events.length) {
        return new Set(); // 取消全选
      } else {
        return new Set(events.map(event => event.id.toString())); // 全选
      }
    });
  }, [events]);

  /**
   * 清空选择
   */
  const clearSelection = useCallback(() => {
    setSelectedEvents(new Set());
  }, []);

  /**
   * 获取选中的事件
   */
  const getSelectedEvents = useCallback((): GitLabEvent[] => {
    return events.filter(event => selectedEvents.has(event.id.toString()));
  }, [events, selectedEvents]);

  /**
   * 转换为表格行数据
   */
  const tableRows = useMemo((): EventTableRow[] => {
    return events.map((event, index) => ({
      id: event.id.toString(),
      index: index + 1,
      time: formatTime(event.created_at),
      title: event.target_title || '未知提交',
      isSelected: selectedEvents.has(event.id.toString()),
      event
    }));
  }, [events, selectedEvents]);

  /**
   * 统计信息
   */
  const stats = useMemo(() => {
    return {
      total: events.length,
      selected: selectedEvents.size,
      isAllSelected: selectedEvents.size === events.length && events.length > 0,
      hasSelection: selectedEvents.size > 0
    };
  }, [events.length, selectedEvents.size]);

  return {
    events,
    selectedEvents,
    isLoading,
    error,
    dateRange,
    progress,
    tableRows,
    stats,
    fetchEvents,
    updateDateRange,
    toggleEventSelection,
    toggleSelectAll,
    clearSelection,
    getSelectedEvents
  };
};