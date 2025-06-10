import CONFIG from './config.js';
import Utils from './utils.js';
import API from './api.js';
import UI from './ui.js';
import UIPanels from './ui-panels.js';
import './pagination.css';

// 将UI添加到window对象以便其他部分访问
window.UI = UI;

const Main = {
    // 分页和筛选相关变量
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
    filteredEvents: [],
    allEvents: [],
    
    // 排序相关变量
    currentSortField: null,
    currentSortOrder: 'asc', // 'asc' 或 'desc'

    updateButtons: () => {
        const generateBtn = document.getElementById('generateReport');
        const exportBtn = document.getElementById('exportData');
        const dataCount = document.getElementById('dataCount');

        const config = CONFIG.get();
        const configErrors = Utils.validateConfig(config);
        const selectedCount = Main.getSelectedEventsCount();

        if (Main.allEvents.length === 0) {
            generateBtn.disabled = true;
            exportBtn.disabled = true;
            generateBtn.style.background = '#d9d9d9';
            exportBtn.style.background = '#d9d9d9';
            generateBtn.style.cursor = 'not-allowed';
            exportBtn.style.cursor = 'not-allowed';
            dataCount.textContent = '暂无数据';
            dataCount.style.color = '#ff4d4f';
        } else if (configErrors.length > 0) {
            generateBtn.disabled = true;
            exportBtn.disabled = false;
            generateBtn.style.background = '#d9d9d9';
            exportBtn.style.background = '#13c2c2';
            generateBtn.style.cursor = 'not-allowed';
            exportBtn.style.cursor = 'pointer';
            dataCount.textContent = `找到 ${Main.allEvents.length} 条记录，但配置不完整：${configErrors.join('、')}`;
            dataCount.style.color = '#fa8c16';
        } else {
            generateBtn.disabled = false;
            exportBtn.disabled = false;
            generateBtn.style.background = '#722ed1';
            exportBtn.style.background = '#13c2c2';
            generateBtn.style.cursor = 'pointer';
            exportBtn.style.cursor = 'pointer';
            const countText = selectedCount > 0 ?
                `找到 ${Main.allEvents.length} 条记录，已选择 ${selectedCount} 条` :
                `找到 ${Main.allEvents.length} 条记录`;
            dataCount.textContent = countText;
            dataCount.style.color = '#52c41a';
        }
    },

    // 排序功能
    sortEvents: (field) => {
        // 切换排序顺序
        if (Main.currentSortField === field) {
            Main.currentSortOrder = Main.currentSortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            Main.currentSortField = field;
            Main.currentSortOrder = 'asc';
        }

        // 更新排序图标
        Main.updateSortIcons(field);

        // 对数据进行排序
        const sortedEvents = [...Main.filteredEvents].sort((a, b) => {
            let valueA, valueB;

            switch (field) {
            case 'created_at':
                valueA = new Date(a.created_at);
                valueB = new Date(b.created_at);
                break;
            case 'target_type':
                valueA = Main.getTargetTypeDisplayName(a.target_type);
                valueB = Main.getTargetTypeDisplayName(b.target_type);
                break;
            case 'target_title':
                valueA = (a.target_title || '').toLowerCase();
                valueB = (b.target_title || '').toLowerCase();
                break;
            default:
                return 0;
            }

            if (valueA < valueB) {
                return Main.currentSortOrder === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return Main.currentSortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        // 更新过滤后的事件数据
        Main.filteredEvents = sortedEvents;
        
        // 重置到第一页
        Main.currentPage = 1;
        
        // 重新渲染表格
        Main.applyFiltersAndPagination();
    },

    // 更新排序图标
    updateSortIcons: (activeField) => {
        // 重置所有排序图标
        document.querySelectorAll('.sort-indicator').forEach(icon => {
            icon.style.opacity = '0.5';
            icon.textContent = '↕️';
        });

        // 更新活跃字段的图标
        const activeHeader = document.querySelector(`[data-sort="${activeField}"]`);
        if (activeHeader) {
            const icon = activeHeader.querySelector('.sort-indicator');
            if (icon) {
                icon.style.opacity = '1';
                icon.textContent = Main.currentSortOrder === 'asc' ? '↑' : '↓';
            }
        }

        // 特殊处理时间列的图标
        if (activeField === 'created_at') {
            const timeIcon = document.getElementById('timeSortIcon');
            if (timeIcon) {
                timeIcon.style.color = 'var(--text-color, #1d1d1f)';
                timeIcon.textContent = Main.currentSortOrder === 'asc' ? '↑' : '↓';
            }
        } else {
            const timeIcon = document.getElementById('timeSortIcon');
            if (timeIcon) {
                timeIcon.style.color = 'var(--text-secondary, #8e8e93)';
                timeIcon.textContent = '↕';
            }
        }
    },

    getSelectedEventsCount: () => {
        const checkboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll):checked');
        return checkboxes.length;
    },

    getSelectedEvents: () => {
        const checkboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll):checked');
        const selectedEvents = [];
        checkboxes.forEach(checkbox => {
            const originalIndex = Number(checkbox.dataset.originalIndex);
            if (!Number.isNaN(originalIndex) && Main.allEvents[originalIndex]) {
                selectedEvents.push(Main.allEvents[originalIndex]);
            }
        });
        return selectedEvents.length > 0 ? selectedEvents : Main.allEvents;
    },

    // 筛选和分页核心函数
    applyFiltersAndPagination: () => {
        // 获取筛选条件
        const targetTypeElement = document.getElementById('targetTypeFilter');
        const searchElement = document.getElementById('searchFilter');
        const pageSizeElement = document.getElementById('pageSizeFilter');
        
        const targetType = targetTypeElement ? targetTypeElement.value : '';
        const searchText = searchElement ? searchElement.value.toLowerCase() : '';
        Main.pageSize = pageSizeElement ? parseInt(pageSizeElement.value, 10) : 20;

        console.group('🔍 应用筛选条件');
        console.log('📋 元素状态检查:');
        console.log('  - targetTypeElement存在:', !!targetTypeElement);
        console.log('  - targetTypeElement值:', targetTypeElement ? targetTypeElement.value : 'null');
        console.log('  - targetTypeElement选中索引:', targetTypeElement ? targetTypeElement.selectedIndex : 'null');
        console.log('  - targetTypeElement选项数量:', targetTypeElement ? targetTypeElement.options.length : 'null');
        if (targetTypeElement && targetTypeElement.selectedIndex >= 0) {
            console.log('  - 当前选中选项文本:', targetTypeElement.options[targetTypeElement.selectedIndex].text);
        }
        console.log('🎯 最终筛选值:');
        console.log('  - TargetType:', targetType);
        console.log('  - SearchText:', searchText);
        console.log('  - PageSize:', Main.pageSize);
        // 应用筛选
        Main.filteredEvents = Main.allEvents.filter(event => {
            // Target type 筛选
            if (targetType && event.target_type !== targetType) {
                return false;
            }

            // 搜索文本筛选
            if (searchText) {
                const title = (event.target_title || '').toLowerCase();
                if (!title.includes(searchText)) {
                    return false;
                }
            }

            return true;
        });
        console.groupEnd();
        
        // 添加调试信息
        console.log('总事件数:', Main.allEvents.length, '筛选后事件数:', Main.filteredEvents.length, '筛选条件:', targetType);
        if (Main.allEvents.length > 0) {
            console.log('第一个事件的target_type:', Main.allEvents[0].target_type);
        }

        // 计算分页
        Main.totalPages = Math.ceil(Main.filteredEvents.length / Main.pageSize);
        if (Main.totalPages === 0) Main.totalPages = 1;
        if (Main.currentPage > Main.totalPages) Main.currentPage = Main.totalPages;

        // 获取当前页数据
        const startIndex = (Main.currentPage - 1) * Main.pageSize;
        const endIndex = startIndex + Main.pageSize;
        const currentPageData = Main.filteredEvents.slice(startIndex, endIndex);

        // 更新表格
        Main.updateEventsTable(currentPageData, startIndex);

        // 更新分页控件
        Main.updatePaginationControls();

        // 更新统计信息
        Main.updateStatistics();
    },

    updateEventsTable: (events = null, startIndex = 0) => {
        const tbody = document.getElementById('eventsBody');
        tbody.innerHTML = '';

        const dataToShow = events || UI.eventsData;
        const baseIndex = events ? startIndex : 0;

        if (dataToShow.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted, #8e8e93); font-style: italic; font-size: 13px;">暂无数据，请调整筛选条件或检查网络连接</td></tr>';
            return;
        }

        dataToShow.forEach((event, index) => {
            const row = document.createElement('tr');
            const commitTitle = event.target_title || '未知提交';
            const targetType = Main.getTargetTypeDisplayName(event.target_type);
            const actualIndex = baseIndex + index;
            
            row.style.cssText = 'transition: background-color 0.2s ease; border-bottom: 1px solid var(--border-light, #f0f0f0);';

            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'var(--hover-bg, #f8f8f8)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });

            row.innerHTML = `
                <td style="padding: 8px 6px; text-align: center;">
                    <input type="checkbox" data-index="${actualIndex}" data-original-index="${Main.allEvents.indexOf(event) !== -1 ? Main.allEvents.indexOf(event) : baseIndex + index}" style="cursor: pointer; transform: scale(1.1);" checked>
                </td>
                <td style="padding: 8px 6px; color: var(--text-secondary, #6e6e73); font-size: 12px; text-align: center; font-weight: 500;">${actualIndex + 1}</td>
                <td style="padding: 8px 6px; color: var(--text-color, #1d1d1f); font-size: 12px; font-weight: 500;">
                    <span style="background: var(--card-bg, #f8f9fa); padding: 2px 6px; border-radius: 4px; font-size: 11px;">${targetType}</span>
                </td>
                <td style="padding: 8px 6px; color: var(--text-color, #1d1d1f); font-size: 12px; font-weight: 500;">${Utils.formatTime(event.created_at).split(' ')[0]}</td>
                <td style="padding: 8px 6px; color: var(--text-color, #1d1d1f); font-size: 12px; word-break: break-word; line-height: 1.3;">${commitTitle}</td>
                <td style="padding: 8px 6px; text-align: center;">
                    <button class="copy-btn" data-text="${commitTitle.replace(/"/g, '&quot;')}" style="padding: 4px 6px; background: var(--button-bg, #f2f2f7); border: none; border-radius: 4px; cursor: pointer; font-size: 11px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" title="复制此条记录">📋</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll)').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                Main.updateButtons();
                Main.updateSelectAllCheckbox();
            });
        });

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const button = btn;
                button.style.background = 'var(--primary-color, #007aff)';
                button.style.color = 'white';
            });

            btn.addEventListener('mouseleave', () => {
                const button = btn;
                button.style.background = 'var(--button-bg, #f2f2f7)';
                button.style.color = 'var(--text-secondary, #6e6e73)';
            });

            btn.addEventListener('click', (e) => {
                const { text } = e.target.dataset;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                    UI.showNotification('已复制到剪贴板', 'success');
                } else {
                    UI.showNotification('复制功能不可用', 'error');
                }
            });
        });

        Main.updateButtons();
        Main.updateSelectAllCheckbox();
    },

    // 获取 Target Type 的显示名称
    getTargetTypeDisplayName: (targetType) => {
        const typeMap = {
            'issue': 'Issue',
            'merge_request': 'MR',
            'milestone': 'Milestone',
            'snippet': 'Snippet',
            'push': 'Push',
            'tag_push': 'Tag',
            'note': 'Note',
            'confidential_issue': 'C-Issue',
            'wiki_page': 'Wiki',
            'design': 'Design'
        };
        return typeMap[targetType] || targetType || 'Unknown';
    },

    // 更新分页控件状态
    updatePaginationControls: () => {
        const firstBtn = document.getElementById('firstPage');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const lastBtn = document.getElementById('lastPage');
        const pageInfo = document.getElementById('pageInfo');

        // 更新按钮状态
        const isFirstPage = Main.currentPage === 1;
        const isLastPage = Main.currentPage === Main.totalPages;

        firstBtn.disabled = isFirstPage;
        prevBtn.disabled = isFirstPage;
        nextBtn.disabled = isLastPage;
        lastBtn.disabled = isLastPage;

        // 更新按钮样式
        [firstBtn, prevBtn, nextBtn, lastBtn].forEach(btn => {
            if (btn.disabled) {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.style.background = 'var(--button-bg, #f2f2f7)';
            } else {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
                btn.style.background = 'var(--button-bg, #f2f2f7)';
            }
        });

        // 更新页面信息
        pageInfo.textContent = `第 ${Main.currentPage} 页，共 ${Main.totalPages} 页`;
    },

    // 更新统计信息
    updateStatistics: () => {
        const totalInfo = document.getElementById('totalInfo');
        const dataCount = document.getElementById('dataCount');
        
        totalInfo.textContent = `共 ${Main.filteredEvents.length} 条记录`;
        
        if (dataCount) {
            if (Main.filteredEvents.length !== Main.allEvents.length) {
                dataCount.textContent = `显示 ${Main.filteredEvents.length} / ${Main.allEvents.length} 条记录`;
            } else {
                dataCount.textContent = `共 ${Main.allEvents.length} 条记录`;
            }
        }
    },

    updateSelectAllCheckbox: () => {
        const selectAllCheckbox = document.getElementById('selectAll');
        const otherCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll)');
        const checkedCheckboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll):checked');

        if (otherCheckboxes.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCheckboxes.length === otherCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCheckboxes.length > 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        }
    },

    exportData: () => {
        const success = Utils.exportToCsv(UI.eventsData, UI.currentStartDate, UI.currentEndDate);
        if (success) {
            UI.showNotification('数据导出成功', 'success');
        } else {
            UI.showNotification('浏览器不支持文件下载功能', 'error');
        }
    },

    copyReport: () => {
        const reportContent = document.getElementById('reportContent').textContent;
        if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(reportContent);
            UI.showNotification('周报已复制到剪贴板', 'success');
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(reportContent);
            UI.showNotification('周报已复制到剪贴板', 'success');
        } else {
            UI.showNotification('复制功能不可用', 'error');
        }
    },

    onGenerateReport: async () => {
        const generateBtn = document.getElementById('generateReport');
        const additionalPrompt = document.getElementById('additionalPrompt').value.trim();
        const reportResult = document.getElementById('reportResult');
        const reportContent = document.getElementById('reportContent');

        const config = CONFIG.get();
        const configErrors = Utils.validateConfig(config);
        if (configErrors.length > 0) {
            UI.showNotification(`配置不完整：${configErrors.join('、')}`, 'error');
            return;
        }

        const selectedEvents = Main.getSelectedEvents();
        if (selectedEvents.length === 0) {
            UI.showNotification('请选择至少一条记录', 'warning');
            return;
        }

        const originalText = generateBtn.textContent;
        generateBtn.disabled = true;
        generateBtn.textContent = '🤖 生成中...';
        generateBtn.style.background = '#d9d9d9';
        generateBtn.style.cursor = 'not-allowed';

        try {
            const result = await API.generateReport(selectedEvents, additionalPrompt, config);

            if (result && result.content) {
                reportContent.textContent = result.content;
                reportResult.style.display = 'block';

                if (result.usage) {
                    UI.lastTokenUsage = result.usage;
                    UI.updateBalanceDisplay();
                }

                UI.showNotification('周报生成成功', 'success');

                setTimeout(() => {
                    reportResult.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            } else {
                throw new Error('生成的周报内容为空');
            }
        } catch (error) {
            console.error('生成周报失败:', error);
            let errorMessage = '生成周报失败';

            if (error.message.includes('401')) {
                errorMessage = 'API Key 无效或已过期';
            } else if (error.message.includes('403')) {
                errorMessage = 'API 访问被拒绝，请检查权限';
            } else if (error.message.includes('429')) {
                errorMessage = 'API 调用频率过高，请稍后重试';
            } else if (error.message.includes('insufficient_quota')) {
                errorMessage = 'API 配额不足，请充值后重试';
            } else if (error.message) {
                errorMessage = error.message;
            }

            UI.showNotification(errorMessage, 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = originalText;
            generateBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            generateBtn.style.cursor = 'pointer';
        }
    }
};

/**
 * 加载 GitLab 事件数据
 * 从 GitLab API 获取指定时间范围内的所有事件数据，并应用筛选和分页
 * @async
 * @function
 */
UI.loadEvents = async () => {
    // 常量定义
    const REFRESH_BTN_ID = 'refreshEvents';
    const LOADING_TEXT = '🔄 加载中...';
    const LOADING_STYLES = {
        background: '#d9d9d9',
        cursor: 'not-allowed'
    };
    const SUCCESS_STYLES = {
        background: 'var(--success-color, #30d158)',
        cursor: 'pointer'
    };
    const TIME_SUFFIX = {
        start: 'T00:00:00.000Z',
        end: 'T23:59:59.999Z'
    };
    
    // HTTP 错误码映射
    const ERROR_MESSAGES = {
        '401': 'Access Token 无效或已过期',
        '403': 'GitLab 访问被拒绝，请检查 Token 权限',
        '404': 'GitLab API 地址不正确'
    };
    
    const refreshBtn = document.getElementById(REFRESH_BTN_ID);
    if (!refreshBtn) {
        console.error('未找到刷新按钮元素');
        UI.showNotification('界面元素缺失，请刷新页面', 'error');
        return;
    }
    
    const originalText = refreshBtn.textContent;
    
    /**
     * 重置数据状态
     */
    const resetDataState = () => {
        Main.allEvents = [];
        Main.filteredEvents = [];
        UI.eventsData = [];
    };
    
    /**
     * 设置按钮加载状态
     * @param {boolean} isLoading - 是否为加载状态
     */
    const setButtonLoadingState = (isLoading) => {
        if (isLoading) {
            refreshBtn.disabled = true;
            refreshBtn.textContent = LOADING_TEXT;
            Object.assign(refreshBtn.style, LOADING_STYLES);
        } else {
            refreshBtn.disabled = false;
            refreshBtn.textContent = originalText;
            Object.assign(refreshBtn.style, SUCCESS_STYLES);
        }
    };
    
    /**
     * 解析错误消息
     * @param {Error} error - 错误对象
     * @returns {string} 用户友好的错误消息
     */
    const parseErrorMessage = (error) => {
        if (!error.message) return '加载数据失败';
        
        // 检查是否为 HTTP 错误
        for (const [code, message] of Object.entries(ERROR_MESSAGES)) {
            if (error.message.includes(code)) {
                return message;
            }
        }
        
        return error.message;
    };
    
    setButtonLoadingState(true);
    
    try {
        // 验证配置
        const config = CONFIG.get();
        const configErrors = Utils.validateConfig(config);
        
        if (configErrors.length > 0) {
            const errorMsg = `无法加载数据：${configErrors.join('、')}`;
            UI.showNotification(errorMsg, 'error');
            resetDataState();
            return;
        }
        
        // 构建时间范围
        const startDate = `${UI.currentStartDate}${TIME_SUFFIX.start}`;
        const endDate = `${UI.currentEndDate}${TIME_SUFFIX.end}`;
        
        console.log('🚀 开始加载所有事件数据...');
        console.log(`📅 时间范围: ${UI.currentStartDate} 至 ${UI.currentEndDate}`);
        
        // 获取所有类型的数据，在前端进行筛选
        const events = await API.getEvents(startDate, endDate, config, '');
        
        if (!Array.isArray(events)) {
            resetDataState();
            UI.showNotification('数据格式错误：API 返回的不是数组格式', 'error');
            return;
        }
        
        // 更新数据状态
        Main.allEvents = events;
        UI.eventsData = events; // 保持向后兼容
        
        console.log(`✅ 成功加载 ${events.length} 条原始数据`);
        
        // 应用筛选和分页
        if (typeof Main.applyFiltersAndPagination === 'function') {
            Main.applyFiltersAndPagination();
        } else {
            console.warn('Main.applyFiltersAndPagination 方法不存在');
        }
        
        // 显示加载结果
        const filteredCount = Main.filteredEvents ? Main.filteredEvents.length : events.length;
        const successMsg = `成功加载 ${events.length} 条记录，筛选后显示 ${filteredCount} 条`;
        UI.showNotification(successMsg, 'success');
        
    } catch (error) {
        console.error('加载事件失败:', error);
        resetDataState();
        
        const errorMessage = parseErrorMessage(error);
        UI.showNotification(errorMessage, 'error');
        
    } finally {
        setButtonLoadingState(false);
    }
};

// 将Main添加到window对象以便其他部分访问
window.Main = Main;

// 为UI添加createPanel方法
UI.createPanel = () => {
    UIPanels.createPanel(UI, Main);
};

// 初始化应用
function init() {
    UI.updateTheme();
    UI.createButton();
}

// 等待DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
