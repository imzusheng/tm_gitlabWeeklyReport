import { useState, useCallback } from 'react';
import type { GitLabEvent, UseReportReturn, ReportResult } from '../types';
import { deepseekService } from '../services/deepseek';
import { exportToCsv, exportToJson, exportToText } from '../utils';

/**
 * 周报生成管理 Hook
 */
export const useReport = (): UseReportReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<ReportResult | null>(null);

  /**
   * 生成周报
   */
  const generateReport = useCallback(async (
    events: GitLabEvent[],
    additionalPrompt = '',
    model?: string
  ): Promise<ReportResult> => {
    if (events.length === 0) {
      throw new Error('没有选中的事件数据');
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const startTime = Date.now();
      const content = await deepseekService.generateReport(events, additionalPrompt, model);
      const endTime = Date.now();
      
      const result: ReportResult = {
        content,
        events,
        additionalPrompt,
        model: model || 'deepseek-chat',
        generatedAt: new Date(),
        duration: endTime - startTime,
        eventCount: events.length
      };
      
      setLastResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '生成周报失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * 导出周报
   */
  const exportReport = useCallback((result: ReportResult, format: 'txt' | 'json' = 'txt') => {
    if (!result) {
      throw new Error('没有可导出的周报内容');
    }

    const timestamp = result.generatedAt.toISOString().split('T')[0];
    const filename = `周报_${timestamp}`;

    if (format === 'txt') {
      const content = `# GitLab 周报\n\n生成时间：${result.generatedAt.toLocaleString()}\n事件数量：${result.eventCount}\n生成耗时：${result.duration}ms\n\n## 周报内容\n\n${result.content}\n\n## 附加要求\n\n${result.additionalPrompt || '无'}\n\n## 事件详情\n\n${result.events.map((event, index) => `${index + 1}. ${event.created_at} - ${event.target_title || '未知提交'}`).join('\n')}`;
      
      exportToText([], { format: 'txt', filename: `${filename}.txt` });
      
      // 手动创建文本文件
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.txt`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else {
      exportToJson([result as any], { format: 'json', filename: `${filename}.json` });
    }
  }, []);

  /**
   * 导出事件数据
   */
  const exportEvents = useCallback((events: GitLabEvent[], format: 'csv' | 'json' | 'txt' = 'csv') => {
    if (events.length === 0) {
      throw new Error('没有可导出的事件数据');
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `GitLab事件_${timestamp}`;

    switch (format) {
      case 'csv':
        exportToCsv(events, { format: 'csv', filename: `${filename}.csv` });
        break;
      case 'json':
        exportToJson(events, { format: 'json', filename: `${filename}.json` });
        break;
      case 'txt':
        exportToText(events, { format: 'txt', filename: `${filename}.txt` });
        break;
    }
  }, []);

  /**
   * 清除错误
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * 清除结果
   */
  const clearResult = useCallback(() => {
    setLastResult(null);
  }, []);

  return {
    report: lastResult?.content || '',
    isGenerating,
    error,
    lastResult,
    generateReport,
    exportReport,
    exportEvents,
    clearError,
    clearResult
  };
};