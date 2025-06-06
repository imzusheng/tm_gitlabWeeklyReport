import CONFIG from './config.js';
import Utils from './utils.js';
import API from './api.js';
import UI from './ui.js';
import UIPanels from './ui-panels.js';

// 将UI添加到window对象以便其他部分访问
window.UI = UI;

const Main = {
    updateButtons: () => {
        const generateBtn = document.getElementById('generateReport');
        const exportBtn = document.getElementById('exportData');
        const dataCount = document.getElementById('dataCount');

        const config = CONFIG.get();
        const configErrors = Utils.validateConfig(config);
        const selectedCount = Main.getSelectedEventsCount();

        if (UI.eventsData.length === 0) {
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
            dataCount.textContent = `找到 ${UI.eventsData.length} 条记录，但配置不完整：${configErrors.join('、')}`;
            dataCount.style.color = '#fa8c16';
        } else {
            generateBtn.disabled = false;
            exportBtn.disabled = false;
            generateBtn.style.background = '#722ed1';
            exportBtn.style.background = '#13c2c2';
            generateBtn.style.cursor = 'pointer';
            exportBtn.style.cursor = 'pointer';
            const countText = selectedCount > 0 ?
                `找到 ${UI.eventsData.length} 条记录，已选择 ${selectedCount} 条` :
                `找到 ${UI.eventsData.length} 条记录`;
            dataCount.textContent = countText;
            dataCount.style.color = '#52c41a';
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
            const index = Number(checkbox.dataset.index);
            if (!Number.isNaN(index) && UI.eventsData[index]) {
                selectedEvents.push(UI.eventsData[index]);
            }
        });
        return selectedEvents.length > 0 ? selectedEvents : UI.eventsData;
    },

    updateEventsTable: () => {
        const tbody = document.getElementById('eventsBody');
        tbody.innerHTML = '';

        if (UI.eventsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted, #8e8e93); font-style: italic; font-size: 13px;">暂无数据，请调整日期范围或检查网络连接</td></tr>';
            return;
        }

        UI.eventsData.forEach((event, index) => {
            const row = document.createElement('tr');
            const commitTitle = event.target_title || '未知提交';
            row.style.cssText = 'transition: background-color 0.2s ease; border-bottom: 1px solid var(--border-light, #f0f0f0);';

            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'var(--hover-bg, #f8f8f8)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });

            row.innerHTML = `
                <td style="padding: 12px 8px; text-align: center;">
                    <input type="checkbox" data-index="${index}" style="cursor: pointer; transform: scale(1.1);" checked>
                </td>
                <td style="padding: 12px 8px; color: var(--text-secondary, #6e6e73); font-size: 12px; text-align: center; font-weight: 500;">${index + 1}</td>
                <td style="padding: 12px 8px; color: var(--text-color, #1d1d1f); font-size: 12px; font-weight: 500;">${Utils.formatTime(event.created_at).split(' ')[0]}</td>
                <td style="padding: 12px 8px; color: var(--text-color, #1d1d1f); font-size: 12px; word-break: break-word; line-height: 1.4;">${commitTitle}</td>
                <td style="padding: 12px 8px; text-align: center;">
                    <button class="copy-btn" data-text="${commitTitle.replace(/"/g, '&quot;')}" style="padding: 6px 8px; background: var(--button-bg, #f2f2f7); border: none; border-radius: 6px; cursor: pointer; font-size: 11px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" title="复制此条记录">📋</button>
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

// 为UI添加loadEvents方法
UI.loadEvents = async () => {
    const refreshBtn = document.getElementById('refreshEvents');
    const originalText = refreshBtn.textContent;

    refreshBtn.disabled = true;
    refreshBtn.textContent = '🔄 加载中...';
    refreshBtn.style.background = '#d9d9d9';
    refreshBtn.style.cursor = 'not-allowed';

    try {
        const config = CONFIG.get();
        const configErrors = Utils.validateConfig(config);

        if (configErrors.length > 0) {
            UI.showNotification(`无法加载数据：${configErrors.join('、')}`, 'error');
            UI.eventsData = [];
            Main.updateEventsTable();
            return;
        }

        const startDate = `${UI.currentStartDate}T00:00:00.000Z`;
        const endDate = `${UI.currentEndDate}T23:59:59.999Z`;

        const events = await API.getEvents(startDate, endDate, config);

        if (Array.isArray(events)) {
            UI.eventsData = events;
            UI.showNotification(`成功加载 ${events.length} 条记录`, 'success');
        } else {
            UI.eventsData = [];
            UI.showNotification('数据格式错误', 'error');
        }
    } catch (error) {
        console.error('加载事件失败:', error);
        UI.eventsData = [];

        let errorMessage = '加载数据失败';
        if (error.message.includes('401')) {
            errorMessage = 'Access Token 无效或已过期';
        } else if (error.message.includes('403')) {
            errorMessage = 'GitLab 访问被拒绝，请检查 Token 权限';
        } else if (error.message.includes('404')) {
            errorMessage = 'GitLab API 地址不正确';
        } else if (error.message) {
            errorMessage = error.message;
        }

        UI.showNotification(errorMessage, 'error');
    } finally {
        Main.updateEventsTable();

        refreshBtn.disabled = false;
        refreshBtn.textContent = originalText;
        refreshBtn.style.background = 'var(--success-color, #30d158)';
        refreshBtn.style.cursor = 'pointer';
    }
};

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
