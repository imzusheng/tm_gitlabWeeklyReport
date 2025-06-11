import CONFIG from '../config.js';
import Utils from '../utils/utils.js';
import API from '../api.js';
import TableRowTemplate from '../components/table-row.jsx';

const DataManager = {
    // 数据状态管理
    allEvents: [],
    filteredEvents: [],
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
    sortField: 'created_at',
    sortOrder: 'desc',
    lastTokenUsage: null,

    // 性能优化：缓存和防抖
    _filterCache: new Map(),
    _debounceTimer: null,
    _lastFilterKey: '',

    // 初始化
    init: () => {

        // 绑定搜索输入框的防抖事件
        DataManager.bindSearchEvents();
        // 绑定筛选器事件
        DataManager.bindFilterEvents();
    },

    // 性能优化：防抖搜索
    debounceSearch: (callback, delay = 300) => {
        return (...args) => {
            clearTimeout(DataManager._debounceTimer);
            DataManager._debounceTimer = setTimeout(() => callback.apply(null, args), delay);
        };
    },

    // 绑定搜索事件
    bindSearchEvents: () => {
        const searchFilter = document.getElementById('searchFilter');
        if (searchFilter) {
            const debouncedSearch = DataManager.debounceSearch(() => {
                DataManager.currentPage = 1;
                DataManager.applyFiltersAndPagination();
            }, 300);

            searchFilter.addEventListener('input', debouncedSearch);
        }
    },

    // 绑定筛选器事件
    bindFilterEvents: () => {
        const targetTypeFilter = document.getElementById('targetTypeFilter');
        if (targetTypeFilter) {
            targetTypeFilter.addEventListener('change', () => {
                DataManager.currentPage = 1;
                DataManager.applyFiltersAndPagination();
            });
        }
    },

    // 性能优化：生成筛选缓存键
    generateFilterKey: () => {
        const searchFilter = document.getElementById('searchFilter');
        const targetTypeFilter = document.getElementById('targetTypeFilter');
        const pageSizeFilter = document.getElementById('pageSizeFilter');
        
        const searchValue = searchFilter ? searchFilter.value.trim().toLowerCase() : '';
        const typeValue = targetTypeFilter ? targetTypeFilter.value : '';
        const pageSizeValue = pageSizeFilter ? pageSizeFilter.value : '20';
        
        return `${searchValue}|${typeValue}|${pageSizeValue}|${DataManager.sortField}|${DataManager.sortOrder}`;
    },

    // 筛选和分页
    applyFiltersAndPagination: () => {
        try {
            // 性能优化：检查缓存
            const filterKey = DataManager.generateFilterKey();
            if (filterKey === DataManager._lastFilterKey && DataManager._filterCache.has(filterKey)) {
                const cachedResult = DataManager._filterCache.get(filterKey);
                DataManager.filteredEvents = cachedResult.filteredEvents;
                DataManager.pageSize = cachedResult.pageSize;
                DataManager.totalPages = cachedResult.totalPages;
            } else {
                // 应用筛选
                DataManager.filteredEvents = DataManager.filterEvents();
                
                // 更新分页信息
                const pageSizeFilter = document.getElementById('pageSizeFilter');
                DataManager.pageSize = pageSizeFilter ? parseInt(pageSizeFilter.value, 10) : 20;
                DataManager.totalPages = Math.ceil(DataManager.filteredEvents.length / DataManager.pageSize);
                
                // 缓存结果
                DataManager._filterCache.set(filterKey, {
                    filteredEvents: [...DataManager.filteredEvents],
                    pageSize: DataManager.pageSize,
                    totalPages: DataManager.totalPages
                });
                
                // 限制缓存大小
                if (DataManager._filterCache.size > 10) {
                    const firstKey = DataManager._filterCache.keys().next().value;
                    DataManager._filterCache.delete(firstKey);
                }
            }
            
            DataManager._lastFilterKey = filterKey;
            
            // 确保当前页在有效范围内
            if (DataManager.currentPage > DataManager.totalPages) {
                DataManager.currentPage = Math.max(1, DataManager.totalPages);
            }
            
            // 更新表格显示
            DataManager.updateTable();
            DataManager.updatePagination();
            DataManager.updateButtons();
            
        } catch (error) {
            console.error('应用筛选和分页失败:', error);
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('筛选数据时出错', 'error');
            }
        }
    },

    // 筛选事件
    filterEvents: () => {
        try {
            const searchFilter = document.getElementById('searchFilter');
            const targetTypeFilter = document.getElementById('targetTypeFilter');
            
            const searchValue = searchFilter ? searchFilter.value.trim().toLowerCase() : '';
            const typeValue = targetTypeFilter ? targetTypeFilter.value : '';
            
            let filtered = [...DataManager.allEvents];
            
            // 应用搜索筛选
            if (searchValue) {
                filtered = filtered.filter(event => {
                    const searchableText = [
                        event.action_name,
                        event.target_title,
                        event.target_type,
                        event.author_name,
                        event.push_data?.commit_title,
                        event.note?.body
                    ].filter(Boolean).join(' ').toLowerCase();
                    
                    return searchableText.includes(searchValue);
                });
            }
            
            // 应用类型筛选
            if (typeValue) {
                filtered = filtered.filter(event => event.target_type === typeValue);
            }
            
            // 应用排序
            filtered.sort((a, b) => {
                let aValue = a[DataManager.sortField];
                let bValue = b[DataManager.sortField];
                
                // 处理日期字段
                if (DataManager.sortField === 'created_at') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue).getTime();
                }
                
                // 处理字符串字段
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }
                
                if (DataManager.sortOrder === 'asc') {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                } else {
                    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                }
            });
            
            return filtered;
        } catch (error) {
            console.error('筛选事件失败:', error);
            return DataManager.allEvents;
        }
    },

    // 排序事件
    sortEvents: (field) => {
        try {
            if (DataManager.sortField === field) {
                DataManager.sortOrder = DataManager.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                DataManager.sortField = field;
                DataManager.sortOrder = 'desc';
            }
            
            // 清除筛选缓存以强制重新计算
            DataManager._filterCache.clear();
            DataManager._lastFilterKey = '';
            
            DataManager.applyFiltersAndPagination();
            DataManager.updateSortIndicators();
        } catch (error) {
            console.error('排序失败:', error);
        }
    },

    // 更新排序指示器
    updateSortIndicators: () => {
        try {
            // 清除所有排序指示器
            const headers = document.querySelectorAll('[data-sort]');
            headers.forEach(header => {
                const indicator = header.querySelector('.sort-indicator');
                if (indicator) {
                    indicator.remove();
                }
            });
            
            // 添加当前排序字段的指示器
            const currentHeader = document.querySelector(`[data-sort="${DataManager.sortField}"]`);
            if (currentHeader) {
                const indicator = document.createElement('span');
                indicator.className = 'sort-indicator';
                indicator.textContent = DataManager.sortOrder === 'asc' ? ' ↑' : ' ↓';
                indicator.style.cssText = 'margin-left: 4px; color: var(--primary-color, #007aff);';
                currentHeader.appendChild(indicator);
            }
        } catch (error) {
            console.error('更新排序指示器失败:', error);
        }
    },

    // 更新表格
    updateTable: () => {
        try {
            const tableBody = document.getElementById('eventsBody');
            if (!tableBody) {
                console.warn('表格主体元素未找到，可能DOM还未完全加载，尝试延迟执行');
                // 延迟重试，给DOM更多时间渲染
                setTimeout(() => {
                    const retryTableBody = document.getElementById('eventsBody');
                    if (retryTableBody) {
                        DataManager._updateTableContent(retryTableBody);
                    } else {
                        console.error('重试后仍未找到表格主体元素');
                    }
                }, 100);
                return;
            }
            
            DataManager._updateTableContent(tableBody);
        } catch (error) {
            console.error('更新表格失败:', error);
        }
    },

    // 内部方法：更新表格内容
    _updateTableContent: (tableBody) => {
        try {
            
            // 计算当前页的数据
            const startIndex = (DataManager.currentPage - 1) * DataManager.pageSize;
            const endIndex = startIndex + DataManager.pageSize;
            const pageData = DataManager.filteredEvents.slice(startIndex, endIndex);
            
            // 性能优化：使用DocumentFragment批量更新DOM
            const fragment = document.createDocumentFragment();
            
            if (pageData.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `
                    <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted, #8e8e93); font-style: italic;">
                        暂无数据
                    </td>
                `;
                fragment.appendChild(emptyRow);
            } else {
                pageData.forEach(event => {
                    const row = DataManager.createTableRow(event);
                    fragment.appendChild(row);
                });
            }
            
            // 清空表格并添加新内容
            tableBody.innerHTML = '';
            tableBody.appendChild(fragment);
            
        } catch (error) {
            console.error('更新表格内容失败:', error);
        }
    },

    // 创建表格行
    createTableRow: (event) => {
        return TableRowTemplate.createTableRow(event);
    },

    // 显示事件详情
    showEventDetails: (eventId) => {
        try {
            const event = DataManager.allEvents.find(e => e.id.toString() === eventId.toString());
            if (!event) {
                console.error('未找到事件:', eventId);
                return;
            }
            
            const details = DataManager.formatEventDetails(event);
            
            // 创建详情弹窗
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
                z-index: 10005;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: var(--panel-bg, white);
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-large, 0 4px 20px rgba(0,0,0,0.08));
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: var(--text-color, #1d1d1f); font-size: 18px; font-weight: 600;">事件详情</h3>
                        <button id="closeModalBtn" style="
                            background: var(--button-bg, #f2f2f7);
                            border: none;
                            font-size: 18px;
                            cursor: pointer;
                            color: var(--text-muted, #8e8e93);
                            padding: 8px;
                            border-radius: 8px;
                            transition: all 0.2s ease;
                        ">×</button>
                    </div>
                    <div style="color: var(--text-color, #1d1d1f); line-height: 1.6;">
                        ${details}
                    </div>
                </div>
            `;
            
            // 点击背景关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            document.body.appendChild(modal);
            
            // 绑定关闭按钮事件
            const closeBtn = modal.querySelector('#closeModalBtn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                });
            }
            
            // 动画效果
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                const content = modal.querySelector('div > div');
                if (content) {
                    content.style.transform = 'scale(1)';
                }
            });
            
        } catch (error) {
            console.error('显示事件详情失败:', error);
        }
    },

    // 格式化事件详情
    formatEventDetails: (event) => {
        const formatDate = (dateString) => {
            try {
                const date = new Date(dateString);
                return date.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            } catch {
                return dateString;
            }
        };
        
        const getActionIcon = (actionName, targetType) => {
            const iconMap = {
                'pushed to': '📤', 'pushed new': '🆕', 'pushed': '📤',
                'opened': targetType === 'Issue' ? '🐛' : '🔓',
                'closed': targetType === 'Issue' ? '✅' : '🔒',
                'merged': '🔀', 'commented on': '💬', 'created': '✨',
                'updated': '📝', 'deleted': '🗑️'
            };
            return iconMap[actionName] || '📋';
        };
        
        let details = `
            <div style="margin-bottom: 20px; padding: 16px; background: var(--card-bg, #f8f9fa); border-radius: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">${getActionIcon(event.action_name, event.target_type)}</span>
                    <div>
                        <div style="font-size: 16px; font-weight: 600; color: var(--text-color, #1d1d1f);">${event.action_name}</div>
                        <div style="font-size: 14px; color: var(--text-muted, #8e8e93);">${event.target_type || 'Repository'}</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <strong>📋 事件ID:</strong> ${event.id}
            </div>
            <div style="margin-bottom: 16px;">
                <strong>👤 作者:</strong> ${event.author?.name || event.author_username || '未知'}
            </div>
            <div style="margin-bottom: 16px;">
                <strong>🕒 时间:</strong> ${formatDate(event.created_at)}
            </div>
            <div style="margin-bottom: 16px;">
                <strong>🏗️ 项目ID:</strong> ${event.project_id}
            </div>
        `;
        
        // Push 事件详细信息
        if (event.action_name?.includes('pushed') && event.push_data) {
            const pushData = event.push_data;
            details += `
                <div style="margin-bottom: 20px; padding: 16px; background: #e6f7ff; border-left: 4px solid #1890ff; border-radius: 4px;">
                    <h4 style="margin: 0 0 12px 0; color: #1890ff;">📤 Push 详情</h4>
                    ${pushData.commit_count ? `<div style="margin-bottom: 8px;"><strong>提交数量:</strong> ${pushData.commit_count}</div>` : ''}
                    ${pushData.action ? `<div style="margin-bottom: 8px;"><strong>操作类型:</strong> ${pushData.action}</div>` : ''}
                    ${pushData.ref_type ? `<div style="margin-bottom: 8px;"><strong>引用类型:</strong> ${pushData.ref_type}</div>` : ''}
                    ${pushData.ref ? `<div style="margin-bottom: 8px;"><strong>分支/标签:</strong> <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">${pushData.ref}</code></div>` : ''}
                    ${pushData.commit_title ? `
                        <div style="margin-top: 12px;">
                            <strong>提交信息:</strong>
                            <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 6px; font-family: 'SF Mono', Monaco, monospace; font-size: 13px; border: 1px solid #d9d9d9;">
                                ${pushData.commit_title}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        // 评论事件详细信息
        if (event.action_name?.includes('commented') && event.note) {
            const note = event.note;
            details += `
                <div style="margin-bottom: 20px; padding: 16px; background: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
                    <h4 style="margin: 0 0 12px 0; color: #faad14;">💬 评论详情</h4>
                    ${note.type ? `<div style="margin-bottom: 8px;"><strong>评论类型:</strong> ${note.type}</div>` : ''}
                    ${note.noteable_type ? `<div style="margin-bottom: 8px;"><strong>关联对象:</strong> ${note.noteable_type}</div>` : ''}
                    ${note.noteable_iid ? `<div style="margin-bottom: 8px;"><strong>对象编号:</strong> #${note.noteable_iid}</div>` : ''}
                    ${note.resolvable !== undefined ? `<div style="margin-bottom: 8px;"><strong>可解决:</strong> ${note.resolvable ? '是' : '否'}</div>` : ''}
                    ${note.resolved !== undefined && note.resolvable ? `<div style="margin-bottom: 8px;"><strong>已解决:</strong> ${note.resolved ? '是' : '否'}</div>` : ''}
                    ${note.body ? `
                        <div style="margin-top: 12px;">
                            <strong>评论内容:</strong>
                            <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; border: 1px solid #d9d9d9; max-height: 200px; overflow-y: auto;">
                                ${note.body}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        // 目标信息
        if (event.target_title) {
            details += `
                <div style="margin-bottom: 16px;">
                    <strong>🎯 目标标题:</strong>
                    <div style="background: var(--card-bg, #f8f9fa); padding: 12px; border-radius: 6px; margin-top: 6px; font-size: 14px; line-height: 1.5;">
                        ${event.target_title}
                    </div>
                </div>
            `;
        }
        
        // 其他详细信息
        if (event.target_id) {
            details += `<div style="margin-bottom: 16px;"><strong>🔗 目标ID:</strong> ${event.target_id}</div>`;
        }
        if (event.target_iid) {
            details += `<div style="margin-bottom: 16px;"><strong>📝 内部ID:</strong> #${event.target_iid}</div>`;
        }
        
        return details;
    },

    // 更新分页
    updatePagination: () => {
        try {
            const pageInfo = document.getElementById('pageInfo');
            const totalInfo = document.getElementById('totalInfo');
            const firstPage = document.getElementById('firstPage');
            const prevPage = document.getElementById('prevPage');
            const nextPage = document.getElementById('nextPage');
            const lastPage = document.getElementById('lastPage');
            
            if (pageInfo) {
                pageInfo.textContent = `第 ${DataManager.currentPage} 页，共 ${DataManager.totalPages} 页`;
            }
            
            if (totalInfo) {
                const startIndex = (DataManager.currentPage - 1) * DataManager.pageSize + 1;
                const endIndex = Math.min(DataManager.currentPage * DataManager.pageSize, DataManager.filteredEvents.length);
                totalInfo.textContent = `显示 ${startIndex}-${endIndex} 条，共 ${DataManager.filteredEvents.length} 条记录`;
            }
            
            // 更新按钮状态
            if (firstPage) firstPage.disabled = DataManager.currentPage === 1;
            if (prevPage) prevPage.disabled = DataManager.currentPage === 1;
            if (nextPage) nextPage.disabled = DataManager.currentPage === DataManager.totalPages;
            if (lastPage) lastPage.disabled = DataManager.currentPage === DataManager.totalPages;
            
        } catch (error) {
            console.error('更新分页失败:', error);
        }
    },

    // 更新按钮状态
    updateButtons: () => {
        try {
            const config = CONFIG.get();
            const configErrors = Utils.validateConfig(config);
            const hasConfigErrors = configErrors.length > 0;
            
            const generateReport = document.getElementById('generateReport');
            const exportData = document.getElementById('exportData');
            const copyReport = document.getElementById('copyReport');
            
            // 检查是否有选中的事件
            const selectedCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:checked:not(#selectAll)');
            const hasSelectedEvents = selectedCheckboxes.length > 0;
            
            // 更新按钮状态
            if (generateReport) {
                generateReport.disabled = hasConfigErrors || !hasSelectedEvents;
                generateReport.title = hasConfigErrors ? 
                    `配置不完整：${configErrors.join('、')}` : 
                    (!hasSelectedEvents ? '请先选择要生成报告的事件' : '生成周报');
            }
            
            if (exportData) {
                exportData.disabled = !hasSelectedEvents;
                exportData.title = !hasSelectedEvents ? '请先选择要导出的事件' : '导出数据';
            }
            
            if (copyReport) {
                copyReport.disabled = !hasSelectedEvents;
                copyReport.title = !hasSelectedEvents ? '请先选择要复制的事件' : '复制报告';
            }
            
        } catch (error) {
            console.error('更新按钮状态失败:', error);
        }
    },

    // 处理全选
    handleSelectAll: () => {
        try {
            const selectAll = document.getElementById('selectAll');
            if (!selectAll) return;
            
            const isChecked = selectAll.checked;
            const checkboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll)');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            
            DataManager.updateButtons();
        } catch (error) {
            console.error('处理全选失败:', error);
        }
    },

    // 清除筛选
    clearFilters: () => {
        try {
            const targetTypeFilter = document.getElementById('targetTypeFilter');
            const searchFilter = document.getElementById('searchFilter');
            const pageSizeFilter = document.getElementById('pageSizeFilter');
            
            if (targetTypeFilter) targetTypeFilter.value = '';
            if (searchFilter) searchFilter.value = '';
            if (pageSizeFilter) pageSizeFilter.value = '20';
            
            DataManager.currentPage = 1;
            DataManager._filterCache.clear();
            DataManager._lastFilterKey = '';
            DataManager.applyFiltersAndPagination();
        } catch (error) {
            console.error('清除筛选失败:', error);
        }
    },

    // 生成报告
    onGenerateReport: async () => {
        try {
            const config = CONFIG.get();
            const configErrors = Utils.validateConfig(config);
            
            if (configErrors.length > 0) {
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification(`配置不完整：${configErrors.join('、')}`, 'warning');
                }
                return;
            }
            
            const selectedCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:checked:not(#selectAll)');
            if (selectedCheckboxes.length === 0) {
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('请先选择要生成报告的事件', 'warning');
                }
                return;
            }
            
            const selectedEventIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-event-id'));
            const selectedEvents = DataManager.allEvents.filter(event => 
                selectedEventIds.includes(event.id.toString())
            );
            
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('正在生成周报...', 'info');
            }
            
            const reportResult = document.getElementById('reportResult');
            if (reportResult) {
                reportResult.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-muted, #8e8e93);">正在生成中...</div>';
            }
            
            const response = await API.generateReport(selectedEvents, config);
            
            if (response && response.choices && response.choices[0]) {
                const reportContent = response.choices[0].message.content;
                
                if (reportResult) {
                    reportResult.innerHTML = `
                        <div style="background: var(--card-bg, #f8f9fa); border-radius: 8px; padding: 16px; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: var(--text-color, #1d1d1f);">
                            ${reportContent}
                        </div>
                    `;
                }
                
                // 保存token使用情况
                if (response.usage) {
                    DataManager.lastTokenUsage = response.usage;
                    if (window.UIManager) {
                        window.UIManager.lastTokenUsage = response.usage;
                        window.UIManager.updateBalanceDisplay();
                    }
                }
                
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('周报生成成功', 'success');
                }
            } else {
                throw new Error('API响应格式错误');
            }
            
        } catch (error) {
            console.error('生成报告失败:', error);
            
            const reportResult = document.getElementById('reportResult');
            if (reportResult) {
                reportResult.innerHTML = `
                    <div style="color: var(--error-color, #ff3b30); text-align: center; padding: 20px;">
                        生成失败：${error.message}
                    </div>
                `;
            }
            
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('生成周报失败，请重试', 'error');
            }
        }
    },

    // 导出数据
    exportData: () => {
        try {
            const selectedCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:checked:not(#selectAll)');
            if (selectedCheckboxes.length === 0) {
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('请先选择要导出的事件', 'warning');
                }
                return;
            }
            
            const selectedEventIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-event-id'));
            const selectedEvents = DataManager.allEvents.filter(event => 
                selectedEventIds.includes(event.id.toString())
            );
            
            // 准备导出数据
            const exportData = selectedEvents.map(event => ({
                '操作': event.action_name,
                '目标': event.target_title,
                '类型': event.target_type,
                '作者': event.author_name,
                '时间': new Date(event.created_at).toLocaleString('zh-CN'),
                '提交信息': event.push_data?.commit_title || '',
                '备注': event.note?.body || ''
            }));
            
            // 转换为CSV格式
            const headers = Object.keys(exportData[0]);
            const csvContent = [
                headers.join(','),
                ...exportData.map(row => 
                    headers.map(header => {
                        const value = row[header] || '';
                        // 处理包含逗号或换行的字段
                        return value.includes(',') || value.includes('\n') ? 
                            `"${value.replace(/"/g, '""')}"` : value;
                    }).join(',')
                )
            ].join('\n');
            
            // 创建下载链接
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `gitlab_events_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('数据导出成功', 'success');
            }
            
        } catch (error) {
            console.error('导出数据失败:', error);
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('导出数据失败', 'error');
            }
        }
    },

    // 复制报告
    copyReport: () => {
        try {
            const selectedCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:checked:not(#selectAll)');
            if (selectedCheckboxes.length === 0) {
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('请先选择要复制的事件', 'warning');
                }
                return;
            }
            
            const selectedEventIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-event-id'));
            const selectedEvents = DataManager.allEvents.filter(event => 
                selectedEventIds.includes(event.id.toString())
            );
            
            // 生成简单的文本报告
            const reportText = selectedEvents.map(event => {
                const date = new Date(event.created_at).toLocaleString('zh-CN');
                let text = `${date} - ${event.author_name} ${event.action_name} ${event.target_title}`;
                
                if (event.push_data?.commit_title) {
                    text += `\n  提交: ${event.push_data.commit_title}`;
                }
                
                if (event.note?.body) {
                    text += `\n  备注: ${event.note.body}`;
                }
                
                return text;
            }).join('\n\n');
            
            // 复制到剪贴板
            navigator.clipboard.writeText(reportText).then(() => {
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('报告已复制到剪贴板', 'success');
                }
            }).catch(error => {
                console.error('复制失败:', error);
                if (window.UIManager && window.UIManager.showNotification) {
                    window.UIManager.showNotification('复制失败，请手动复制', 'error');
                }
            });
            
        } catch (error) {
            console.error('复制报告失败:', error);
            if (window.UIManager && window.UIManager.showNotification) {
                window.UIManager.showNotification('复制报告失败', 'error');
            }
        }
    },

    // 清理缓存
    clearCache: () => {
        DataManager._filterCache.clear();
        DataManager._lastFilterKey = '';
    },

    // 清理资源
    cleanup: () => {
        if (DataManager._debounceTimer) {
            clearTimeout(DataManager._debounceTimer);
            DataManager._debounceTimer = null;
        }
        DataManager.clearCache();
    }
};

// 将DataManager暴露到全局，供UIManager调用
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
    
    // 页面卸载时清理资源
    window.addEventListener('beforeunload', DataManager.cleanup, { passive: true });
}

export default DataManager;