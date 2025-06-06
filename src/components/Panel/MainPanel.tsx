import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Loading, Notification, Modal } from '../common';
import { EventsTable } from '../EventsTable';
import { ApiSettings, GeneralSettings } from '../Settings';
import { Header } from './Header';
import { Footer } from './Footer';
import { useConfig, useEvents, useReport, useTheme } from '../../hooks';
import { formatDate } from '../../utils';

interface MainPanelProps {
  className?: string;
}

/**
 * 主面板组件
 * 集成所有功能模块的主界面
 */
export const MainPanel: React.FC<MainPanelProps> = ({ className = '' }) => {
  const { config } = useConfig();
  const { themeMode } = useTheme();
  const {
    events,
    selectedEvents,
    dateRange,
    isLoading: eventsLoading,
    error: eventsError,
    fetchEvents,
    toggleEventSelection,
    toggleSelectAll,
    updateDateRange,
    getSelectedEvents,
  } = useEvents();
  
  const {
    report,
    isGenerating: generating,
    error: reportError,
    generateReport,
  } = useReport();

  // 界面状态
  const [showSettings, setShowSettings] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'api' | 'general'>('api');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  } | null>(null);

  // 检查配置是否完整
  const isConfigComplete = config.gitlab.baseUrl && 
                          config.gitlab.token && 
                          config.gitlab.projectId &&
                          config.deepseek.apiKey &&
                          config.deepseek.model;

  // 初始化时获取事件
  useEffect(() => {
    if (isConfigComplete) {
      fetchEvents();
    }
  }, [isConfigComplete, dateRange]);

  // 处理日期范围变化
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newRange = {
      ...dateRange,
      [field === 'start' ? 'startDate' : 'endDate']: value,
    };
    updateDateRange(newRange);
  };

  // 生成周报
  const handleGenerateReport = async () => {
    if (selectedEvents.size === 0) {
      setNotification({
        type: 'warning',
        message: '请至少选择一个事件',
      });
      return;
    }

    try {
      await generateReport(getSelectedEvents(), additionalRequirements);
      setNotification({
        type: 'success',
        message: '周报生成成功！',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: '周报生成失败，请检查配置和网络连接',
      });
    }
  };

  // 导出周报
  const handleExportReport = () => {
    if (!report) {
      setNotification({
        type: 'warning',
        message: '请先生成周报',
      });
      return;
    }

    // 复制到剪贴板
    if (typeof GM_setClipboard !== 'undefined') {
      GM_setClipboard(report);
    } else {
      navigator.clipboard.writeText(report);
    }
    setNotification({
      type: 'success',
      message: '周报已导出到剪贴板',
    });
  };

  // 导出事件数据
  const handleExportEvents = () => {
    if (selectedEvents.size === 0) {
      setNotification({
        type: 'warning',
        message: '请至少选择一个事件',
      });
      return;
    }

    const selectedEventsList = events.filter(event => selectedEvents.has(String(event.id)));
    const csvContent = selectedEventsList.map(event => 
      `${event.created_at},${event.action_name},${event.target_title || ''}`
    ).join('\n');
    
    if (typeof GM_setClipboard !== 'undefined') {
      GM_setClipboard(csvContent);
    } else {
      navigator.clipboard.writeText(csvContent);
    }
    setNotification({
      type: 'success',
      message: '事件数据已导出到剪贴板',
    });
  };

  return (
    <div className={`tm-main-panel tm-theme-${themeMode} ${className}`}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Header onSettingsClick={() => setShowSettings(true)} />
      
      <div className="tm-main-panel__body">
        {!isConfigComplete ? (
          <div className="tm-main-panel__setup">
            <div className="tm-setup-card">
              <div className="tm-setup-card__icon">⚙️</div>
              <div className="tm-setup-card__title">首次使用配置</div>
              <div className="tm-setup-card__description">
                请先配置 GitLab 和 DeepSeek API 信息
              </div>
              <Button
                variant="primary"
                onClick={() => setShowSettings(true)}
              >
                开始配置
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* 日期选择器 */}
            <div className="tm-main-panel__section">
              <div className="tm-section-header">
                <h3 className="tm-section-title">📅 选择日期范围</h3>
              </div>
              <div className="tm-date-range">
                <Input
                  label="开始日期"
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                />
                <Input
                  label="结束日期"
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => fetchEvents()}
                  loading={eventsLoading}
                  disabled={!dateRange.startDate || !dateRange.endDate}
                >
                  刷新事件
                </Button>
              </div>
            </div>

            {/* 事件列表 */}
            <div className="tm-main-panel__section">
              <div className="tm-section-header">
                <h3 className="tm-section-title">📋 GitLab 事件</h3>
                <div className="tm-section-stats">
                  共 {events.length} 个事件，已选择 {selectedEvents.size} 个
                </div>
              </div>
              
              {eventsError ? (
                <div className="tm-error-card">
                  <div className="tm-error-card__icon">❌</div>
                  <div className="tm-error-card__message">{eventsError}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchEvents()}
                  >
                    重试
                  </Button>
                </div>
              ) : (
                <EventsTable
                  events={events}
                  selectedEvents={selectedEvents}
                  onEventSelect={toggleEventSelection}
                  onSelectAll={toggleSelectAll}
                  loading={eventsLoading}
                />
              )}
            </div>

            {/* 附加要求 */}
            <div className="tm-main-panel__section">
              <div className="tm-section-header">
                <h3 className="tm-section-title">📝 附加要求</h3>
              </div>
              <Textarea
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="请输入对周报的特殊要求或补充说明...\n例如：\n- 重点突出某个项目的进展\n- 添加技术难点分析\n- 包含团队协作情况"
                rows={4}
                helperText="可选：为 AI 提供额外的生成指导"
              />
            </div>

            {/* 操作按钮 */}
            <div className="tm-main-panel__section">
              <div className="tm-section-header">
                <h3 className="tm-section-title">🚀 生成周报</h3>
              </div>
              <div className="tm-action-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerateReport}
                  loading={generating}
                  disabled={selectedEvents.size === 0}
                >
                  {generating ? '生成中...' : '生成周报'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportEvents}
                  disabled={selectedEvents.size === 0}
                >
                  导出事件数据
                </Button>
              </div>
            </div>

            {/* 周报结果 */}
            {(report || reportError) && (
              <div className="tm-main-panel__section">
                <div className="tm-section-header">
                  <h3 className="tm-section-title">📄 生成结果</h3>
                  {report && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportReport}
                    >
                      复制到剪贴板
                    </Button>
                  )}
                </div>
                
                {reportError ? (
                  <div className="tm-error-card">
                    <div className="tm-error-card__icon">❌</div>
                    <div className="tm-error-card__message">{reportError}</div>
                  </div>
                ) : (
                  <div className="tm-report-result">
                    <pre className="tm-report-content">{report}</pre>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* 设置模态框 */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="设置"
        size="large"
      >
        <div className="tm-settings-modal">
          <div className="tm-settings-tabs">
            <button
              className={`tm-settings-tab ${
                activeSettingsTab === 'api' ? 'tm-settings-tab--active' : ''
              }`}
              onClick={() => setActiveSettingsTab('api')}
            >
              API 配置
            </button>
            <button
              className={`tm-settings-tab ${
                activeSettingsTab === 'general' ? 'tm-settings-tab--active' : ''
              }`}
              onClick={() => setActiveSettingsTab('general')}
            >
              通用设置
            </button>
          </div>
          
          <div className="tm-settings-content">
            {activeSettingsTab === 'api' ? (
              <ApiSettings />
            ) : (
              <GeneralSettings />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};