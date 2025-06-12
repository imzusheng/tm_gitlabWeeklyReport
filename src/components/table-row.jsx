/**
 * 表格行模板组件
 * 负责生成事件表格行的JSX结构
 */

import { jsx } from '../utils/jsx-runtime.js';
import './table-row.less';
import EventDetailPanel from './event-detail-panel.jsx';
import '../components/event-detail-panel.less';

const TableRowTemplate = {
    // 工具函数
    utils: {
        /**
         * 格式化日期
         * @param {string} dateString - 日期字符串
         * @returns {string} 格式化后的日期
         */
        formatDate: (dateString) => {
            try {
                const date = new Date(dateString);
                return date.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                return dateString;
            }
        },

        /**
         * 获取操作图标
         * @param {string} actionName - 操作名称
         * @param {string} targetType - 目标类型
         * @returns {string} 对应的图标
         */
        getActionIcon: (actionName, targetType) => {
            const iconMap = {
                // Push 相关操作
                'pushed to': '📤',
                'pushed new': '🆕',
                'pushed': '📤',
                
                // Issue 相关操作
                'opened': targetType === 'Issue' ? '🐛' : '🔓',
                'closed': targetType === 'Issue' ? '✅' : '🔒',
                'reopened': '🔄',
                
                // MergeRequest 相关操作
                'merged': '🔀',
                'approved': '👍',
                'unapproved': '👎',
                
                // 评论相关操作
                'commented on': '💬',
                'commented': '💬',
                
                // 通用操作
                'created': '✨',
                'updated': '📝',
                'deleted': '🗑️',
                'assigned': '👤',
                'unassigned': '👤',
                'labeled': '🏷️',
                'unlabeled': '🏷️',
                'milestoned': '🎯',
                'demilestoned': '🎯'
            };
            return iconMap[actionName] || '📋';
        },

        /**
         * 获取类型颜色
         * @param {string} targetType - 目标类型
         * @param {string} actionName - 操作名称
         * @returns {string} 对应的颜色
         */
        getTypeColor: (targetType, actionName) => {
            const colorMap = {
                // 基础类型
                'Issue': '#f5222d',
                'MergeRequest': '#52c41a',
                'Commit': '#1890ff',
                'Tag': '#722ed1',
                'Release': '#eb2f96',
                'WikiPage': '#fa8c16',
                'Project': '#13c2c2',
                
                // 评论类型
                'Note': '#faad14',
                'DiffNote': '#faad14',
                'DiscussionNote': '#faad14',
                
                // Push 相关
                'Repository': actionName?.includes('pushed') ? '#1890ff' : '#13c2c2',
                
                // 其他类型
                'Milestone': '#722ed1',
                'Label': '#fa8c16',
                'User': '#52c41a',
                'Branch': '#1890ff',
                'Pipeline': '#eb2f96'
            };
            return colorMap[targetType] || '#666';
        },

        /**
         * 截断文本
         * @param {string} text - 原始文本
         * @param {number} maxLength - 最大长度
         * @returns {string} 截断后的文本
         */
        truncateText: (text, maxLength = 50) => {
            if (!text) return '';
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        },

        /**
         * 获取内容标题
         * @param {Object} event - 事件数据
         * @returns {string} 内容标题
         */
        getContentTitle: (event) => {
            // Push 事件
            if (event.action_name?.includes('pushed') && event.push_data) {
                const commitTitle = event.push_data.commit_title;
                const commitCount = event.push_data.commit_count;
                const ref = event.push_data.ref;
                
                if (commitTitle) {
                    return TableRowTemplate.utils.truncateText(commitTitle, 60);
                }
                
                if (commitCount && ref) {
                    return `${commitCount} commit${commitCount > 1 ? 's' : ''} to ${ref}`;
                }
            }
            
            // 评论事件
            if (event.action_name?.includes('commented') && event.note) {
                const noteBody = event.note.body;
                if (noteBody) {
                    return TableRowTemplate.utils.truncateText(noteBody, 60);
                }
            }
            
            // 默认使用 target_title
            return TableRowTemplate.utils.truncateText(event.target_title || 'No title', 60);
        },

        /**
         * 获取内容额外信息
         * @param {Object} event - 事件数据
         * @returns {JSX.Element|null} 额外信息元素
         */
        getContentExtra: (event) => {
            // Push 事件额外信息
            if (event.action_name?.includes('pushed') && event.push_data) {
                const { commit_count, ref_type, ref } = event.push_data;
                
                if (commit_count && ref) {
                    return jsx('span', {
                        className: 'content-extra',
                        children: ` • ${commit_count} commit${commit_count > 1 ? 's' : ''} to ${ref_type || 'branch'} ${ref}`
                    });
                }
            }
            
            // 评论事件额外信息
            if (event.action_name?.includes('commented') && event.note) {
                const noteType = event.note.type;
                const noteableType = event.note.noteable_type;
                
                if (noteType && noteableType) {
                    return jsx('span', {
                        className: 'content-extra',
                        children: ` • ${noteType} on ${noteableType}`
                    });
                }
            }
            
            return null;
        },

        /**
         * 生成源URL路径
         * @param {Object} event - 事件数据
         * @returns {string} 源URL路径
         */
        getSourceUrl: (event) => {
            // 基础项目URL
            const baseUrl = event.project?.web_url || '';
            
            // 根据不同类型生成URL
            switch (event.target_type) {
                case 'Issue':
                    return event.target_iid ? `${baseUrl}/-/issues/${event.target_iid}` : baseUrl;
                case 'MergeRequest':
                    return event.target_iid ? `${baseUrl}/-/merge_requests/${event.target_iid}` : baseUrl;
                case 'Milestone':
                    return event.target_id ? `${baseUrl}/-/milestones/${event.target_id}` : baseUrl;
                case 'WikiPage':
                    return event.target_title ? `${baseUrl}/-/wikis/${encodeURIComponent(event.target_title)}` : baseUrl;
                case 'Snippet':
                    return event.target_id ? `${baseUrl}/-/snippets/${event.target_id}` : baseUrl;
                default:
                    // Push 事件或其他类型
                    if (event.action_name?.includes('pushed') && event.push_data?.ref) {
                        return `${baseUrl}/-/commits/${event.push_data.ref}`;
                    }
                    return baseUrl;
            }
        },

        /**
         * 创建详情面板内容（已废弃，使用EventDetailPanel.create代替）
         * @deprecated 使用EventDetailPanel.create代替
         * @param {Object} event - 事件数据
         * @returns {JSX.Element} 详情面板JSX
         */
        createDetailPanel: (event) => {
            console.warn('TableRowTemplate.createDetailPanel已废弃，请使用EventDetailPanel.create');
            return EventDetailPanel.create(event, window.currentConfig || {});
        },

        /**
         * 显示详情面板
         * @param {Object} event - 事件数据
         * @param {Object} config - 配置信息
         */
        showDetailPanel: async (event, config = window.currentConfig || {}) => {
            // 移除已存在的面板
            const existingPanel = document.querySelector('.event-detail-panel');
            if (existingPanel) {
                existingPanel.remove();
            }

            try {
                // 创建加载状态的面板
                const loadingPanel = jsx('div', {
                    className: 'event-detail-panel loading',
                    children: [
                        jsx('div', {
                            className: 'detail-header',
                            children: [
                                jsx('h4', {
                                    className: 'detail-title',
                                    children: '加载中...'
                                }),
                                jsx('button', {
                                    className: 'detail-close',
                                    onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const panel = e.target.closest('.event-detail-panel');
                                        if (panel) {
                                            panel.remove();
                                        }
                                    },
                                    children: '×'
                                })
                            ]
                        }),
                        jsx('div', {
                            className: 'detail-content',
                            children: []
                        })
                    ]
                });
                
                document.body.appendChild(loadingPanel);

                // 创建详细面板
                const panel = await EventDetailPanel.create(event, config);
                
                // 替换加载面板
                loadingPanel.remove();
                document.body.appendChild(panel);

                // 添加点击背景关闭功能
                panel.addEventListener('click', (e) => {
                    if (e.target === panel) {
                        panel.remove();
                    }
                });

                // 添加ESC键关闭功能
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        panel.remove();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
                
            } catch (error) {
                console.error('显示详情面板失败:', error);
                
                // 显示错误状态
                const errorPanel = jsx('div', {
                    className: 'event-detail-panel error',
                    children: [
                        jsx('div', {
                            className: 'detail-header',
                            children: [
                                jsx('h4', {
                                    className: 'detail-title',
                                    children: '加载失败'
                                }),
                                jsx('button', {
                                    className: 'detail-close',
                                    onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const panel = e.target.closest('.event-detail-panel');
                                        if (panel) {
                                            panel.remove();
                                        }
                                    },
                                    children: '×'
                                })
                            ]
                        }),
                        jsx('div', {
                            className: 'detail-content',
                            children: []
                        })
                    ]
                });
                
                document.body.appendChild(errorPanel);
                
                // 自动关闭错误面板
                setTimeout(() => {
                    if (errorPanel.parentNode) {
                        errorPanel.remove();
                    }
                }, 3000);
            }
        }
    },

    /**
     * 生成表格行JSX
     * @param {Object} event - 事件数据
     * @returns {JSX.Element} JSX元素
     */
    generateRowJSX: (event) => {
        const { utils } = TableRowTemplate;
        
        return jsx('tr', {
            className: 'event-table-row',
            children: [
                // 复选框列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--checkbox',
                    children: jsx('input', {
                        type: 'checkbox',
                        className: 'event-checkbox',
                        'data-event-id': event.id,
                        checked: true
                    })
                }),
                // 类型列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--type',
                    children: jsx('div', {
                        className: 'type-info',
                        children: [
                            jsx('span', {
                                className: 'type-indicator',
                                style: { background: utils.getTypeColor(event.target_type, event.action_name) }
                            }),
                            jsx('span', {
                                className: 'type-text',
                                children: event.target_type || 'Repository'
                            })
                        ]
                    })
                }),
                // 时间列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--time',
                    children: utils.formatDate(event.created_at)
                }),
                // 提交内容列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--content',
                    children: jsx('div', {
                        className: 'content-info',
                        children: [
                            jsx('div', {
                                className: 'content-title',
                                children: utils.getContentTitle(event)
                            }),
                            jsx('div', {
                                className: 'content-meta',
                                children: [
                                    jsx('span', {
                                        className: 'action-icon',
                                        children: utils.getActionIcon(event.action_name, event.target_type)
                                    }),
                                    jsx('span', {
                                        className: 'action-text',
                                        children: event.action_name
                                    }),
                                    jsx('span', {
                                        className: 'author-text',
                                        children: ` by ${event.author?.name || event.author_username || 'Unknown'}`
                                    }),
                                    utils.getContentExtra(event)
                                ]
                            })
                        ]
                    })
                }),
                // 操作列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--actions',
                    children: jsx('button', {
                        className: 'details-button',
                        onClick: () => TableRowTemplate.utils.showDetailPanel(event, window.currentConfig),
                        children: '详情'
                    })
                })
            ]
        });
    },

    /**
     * 创建表格行元素
     * @param {Object} event - 事件数据
     * @returns {HTMLTableRowElement} 表格行元素
     */
    createTableRow: (event) => {
        const jsxElement = TableRowTemplate.generateRowJSX(event);
        return jsxElement;
    }


};

export default TableRowTemplate;