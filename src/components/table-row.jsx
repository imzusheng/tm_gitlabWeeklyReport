/**
 * 表格行模板组件
 * 负责生成事件表格行的JSX结构
 */

import { jsx } from '../utils/jsx-runtime.js';
import './table-row.less';

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
                        'data-event-id': event.id
                    })
                }),
                // ID列
                jsx('td', {
                    className: 'event-table-cell event-table-cell--id',
                    children: event.id
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
                        onClick: () => {
                            if (window.DataManager && window.DataManager.showEventDetails) {
                                window.DataManager.showEventDetails(event.id);
                            }
                        },
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
    },


};

export default TableRowTemplate;