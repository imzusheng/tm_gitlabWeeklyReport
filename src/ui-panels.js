import CONFIG from './config.js';
import Utils from './utils.js';
import API from './api.js';

const UIPanels = {
    createPanel: (UI, Main) => {
        UI.panel = document.createElement('div');
        UI.panel.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            width: 750px;
            height: calc(100vh - 80px);
            background: var(--panel-bg, white);
            border: 1px solid var(--border-color, #e1e5e9);
            border-radius: 12px;
            box-shadow: var(--shadow-large, 0 4px 20px rgba(0,0,0,0.08));
            backdrop-filter: blur(20px);
            z-index: 10001;
            display: none;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transform-origin: bottom right;
            transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
            opacity: 0;
            transform: scale(0.3) translateY(50px);
        `;

        const [thisWeekStart, thisWeekEnd] = Utils.getThisWeekRange();
        UI.currentStartDate = thisWeekStart;
        UI.currentEndDate = thisWeekEnd;

        UI.panel.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="padding: 20px; border-bottom: 1px solid var(--border-light, #f0f0f0); background: var(--card-bg, #f8f9fa); flex-shrink: 0; border-radius: 12px 12px 0 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="margin: 0; color: var(--text-color, #1d1d1f); font-size: 18px; font-weight: 600;">GitLab 周报生成器</h3>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button id="openSettings" style="background: var(--button-bg, #f2f2f7); border: none; font-size: 16px; cursor: pointer; color: var(--text-secondary, #6e6e73); padding: 8px; border-radius: 8px; transition: all 0.2s ease;" title="打开设置">⚙️</button>
                            <button id="closePanel" style="background: var(--button-bg, #f2f2f7); border: none; font-size: 18px; cursor: pointer; color: var(--text-muted, #8e8e93); padding: 8px; border-radius: 8px; transition: all 0.2s ease;">×</button>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <label style="font-size: 14px; color: var(--text-secondary, #6e6e73); min-width: 50px; line-height: 1; display: flex; align-items: center; font-weight: 500;">开始:</label>
                            <input type="date" id="startDate" value="${thisWeekStart}" style="height: 32px; padding: 0 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 13px; width: 130px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">
                        </div>
                        
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <label style="font-size: 14px; color: var(--text-secondary, #6e6e73); min-width: 50px; line-height: 1; display: flex; align-items: center; font-weight: 500;">结束:</label>
                            <input type="date" id="endDate" value="${thisWeekEnd}" style="height: 32px; padding: 0 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 13px; width: 130px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">
                        </div>
                        
                        <div style="display: flex; gap: 6px;">
                            <button id="thisWeek" style="height: 32px; padding: 0 12px; border: 1px solid var(--primary-color, #007aff); border-radius: 8px; cursor: pointer; font-size: 12px; white-space: nowrap; background: rgba(0, 122, 255, 0.1); color: var(--primary-color, #007aff); font-weight: 500; transition: all 0.2s ease;">本周</button>
                            <button id="lastWeek" style="height: 32px; padding: 0 12px; border: 1px solid var(--success-color, #30d158); border-radius: 8px; cursor: pointer; font-size: 12px; white-space: nowrap; background: rgba(48, 209, 88, 0.1); color: var(--success-color, #30d158); font-weight: 500; transition: all 0.2s ease;">上周</button>
                            <button id="thisMonth" style="height: 32px; padding: 0 12px; border: 1px solid var(--warning-color, #ff9500); border-radius: 8px; cursor: pointer; font-size: 12px; white-space: nowrap; background: rgba(255, 149, 0, 0.1); color: var(--warning-color, #ff9500); font-weight: 500; transition: all 0.2s ease;">本月</button>
                            <button id="lastMonth" style="height: 32px; padding: 0 12px; border: 1px solid var(--error-color, #ff3b30); border-radius: 8px; cursor: pointer; font-size: 12px; white-space: nowrap; background: rgba(255, 59, 48, 0.1); color: var(--error-color, #ff3b30); font-weight: 500; transition: all 0.2s ease;">上月</button>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span id="dataCount" style="color: var(--text-secondary, #6e6e73); font-size: 13px; font-weight: 500;"></span>
                            <span id="dateRange" style="color: var(--text-muted, #8e8e93); font-size: 12px; margin-left: 12px;"></span>
                        </div>
                    </div>
                </div>
                
                <!-- 筛选条件区域 -->
                <div style="padding: 16px; border-bottom: 1px solid var(--border-light, #f0f0f0); background: var(--card-bg, #f8f9fa); flex-shrink: 0;">
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <label style="font-size: 14px; color: var(--text-secondary, #6e6e73); min-width: 80px; font-weight: 500;">Target Type:</label>
                            <select id="targetTypeFilter" style="height: 32px; padding: 0 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 13px; width: 150px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">
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
                        
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <label style="font-size: 14px; color: var(--text-secondary, #6e6e73); min-width: 80px; font-weight: 500;">每页显示:</label>
                            <select id="pageSizeFilter" style="height: 32px; padding: 0 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 13px; width: 100px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">
                                <option value="10">10</option>
                                <option value="20" selected>20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <label style="font-size: 14px; color: var(--text-secondary, #6e6e73); min-width: 60px; font-weight: 500;">搜索:</label>
                            <input type="text" id="searchFilter" placeholder="搜索提交内容..." style="height: 32px; padding: 0 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 13px; width: 200px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">
                        </div>
                        
                        <button id="refreshEvents" style="height: 32px; padding: 0 16px; background: var(--success-color, #30d158); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; white-space: nowrap; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: all 0.2s ease; min-width: 80px;">🔄 刷新</button>
                        
                        <button id="clearFilters" style="height: 32px; padding: 0 12px; background: var(--button-bg, #f2f2f7); border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--text-color, #1d1d1f); font-weight: 500; transition: all 0.2s ease;">清除筛选</button>
                    </div>
                </div>
                
                <div id="scrollableContent" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column;">
                    <div style="max-height: 400px; overflow-y: auto; border-bottom: 1px solid var(--border-light, #f0f0f0); flex-shrink: 0;">
                        <table id="eventsTable" style="width: 100%; border-collapse: collapse;">
                            <thead style="position: sticky; top: 0; background: var(--panel-bg, white); z-index: 1;">
                                <tr style="background: var(--card-bg, #f8f9fa);">
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: center; color: var(--text-color, #1d1d1f); font-weight: 600; width: 40px; font-size: 12px;">
                                        <input type="checkbox" id="selectAll" style="cursor: pointer; transform: scale(1.1);" title="全选/取消全选" checked>
                                    </th>
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: left; color: var(--text-color, #1d1d1f); font-weight: 600; width: 40px; font-size: 12px;">#</th>
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: left; color: var(--text-color, #1d1d1f); font-weight: 600; width: 80px; font-size: 12px;">类型</th>
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: left; color: var(--text-color, #1d1d1f); font-weight: 600; width: 130px; font-size: 12px;">时间</th>
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: left; color: var(--text-color, #1d1d1f); font-weight: 600; font-size: 12px;">提交内容</th>
                                    <th style="padding: 12px 8px; border-bottom: 1px solid var(--border-light, #f0f0f0); text-align: center; color: var(--text-color, #1d1d1f); font-weight: 600; width: 50px; font-size: 12px;">操作</th>
                                </tr>
                            </thead>
                            <tbody id="eventsBody">
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 分页控件 -->
                    <div id="paginationControls" style="padding: 16px; border-bottom: 1px solid var(--border-light, #f0f0f0); background: var(--card-bg, #f8f9fa); flex-shrink: 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button id="firstPage" style="height: 32px; padding: 0 12px; background: var(--button-bg, #f2f2f7); border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" disabled>首页</button>
                            <button id="prevPage" style="height: 32px; padding: 0 12px; background: var(--button-bg, #f2f2f7); border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" disabled>上一页</button>
                            <span id="pageInfo" style="font-size: 13px; color: var(--text-secondary, #6e6e73); margin: 0 12px;">第 1 页，共 1 页</span>
                            <button id="nextPage" style="height: 32px; padding: 0 12px; background: var(--button-bg, #f2f2f7); border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" disabled>下一页</button>
                            <button id="lastPage" style="height: 32px; padding: 0 12px; background: var(--button-bg, #f2f2f7); border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--text-secondary, #6e6e73); transition: all 0.2s ease;" disabled>末页</button>
                        </div>
                        <div style="font-size: 13px; color: var(--text-secondary, #6e6e73);">
                            <span id="totalInfo">共 0 条记录</span>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; border-bottom: 1px solid var(--border-light, #f0f0f0); flex-shrink: 0;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--text-color, #1d1d1f); font-size: 15px;">附加要求:</label>
                            <textarea id="additionalPrompt" rows="3" style="width: 100%; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; padding: 12px; resize: vertical; font-size: 13px; line-height: 1.4; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" placeholder="输入附加要求，如：重点突出某个功能模块...">${CONFIG.get().DEFAULT_ADDITIONAL_PROMPT}</textarea>
                        </div>
                        
                        <div style="margin-bottom: 16px; display: flex; gap: 16px; padding: 12px; background: var(--card-bg, #f8f9fa); border-radius: 8px; border: 1px solid var(--border-light, #f0f0f0);">
                            <span id="balanceInfo" style="color: var(--text-secondary, #6e6e73); font-size: 12px; font-weight: 500;"></span>
                            <span id="tokenUsage" style="color: var(--text-secondary, #6e6e73); font-size: 12px; font-weight: 500;"></span>
                        </div>
                        
                        <div style="display: flex; gap: 12px;">
                            <button id="generateReport" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 600; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: all 0.2s ease;" disabled>🤖 生成周报</button>
                            <button id="exportData" style="padding: 14px 20px; background: var(--primary-color, #007aff); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 600; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: all 0.2s ease;" disabled>📤 导出数据</button>
                        </div>
                    </div>
                    
                    <div id="reportResult" style="padding: 20px; background: var(--card-bg, #f8f9fa); display: none; flex: 1; min-height: 200px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h4 style="margin: 0; color: var(--text-color, #1d1d1f); font-size: 17px; font-weight: 600;">生成的周报:</h4>
                            <button id="copyReport" style="padding: 8px 12px; background: var(--primary-color, #007aff); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">📋 复制</button>
                        </div>
                        <div id="reportContent" style="background: var(--panel-bg, white); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color, #e1e5e9); white-space: pre-wrap; color: var(--text-color, #1d1d1f) !important; line-height: 1.6; font-size: 14px; min-height: 120px; height: calc(100% - 50px); overflow-y: auto; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(UI.panel);

        const scrollableContent = document.getElementById('scrollableContent');
        scrollableContent.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });
        scrollableContent.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        });

        UIPanels.bindPanelEvents(UI, Main);
        UIPanels.updateDateRange(UI);
        UI.updateTheme();

        UIPanels.createSettingsPanel(UI);
    },

    bindPanelEvents: (UI, Main) => {
        document.getElementById('closePanel').addEventListener('click', () => {
            UI.minimizePanel();
        });

        document.getElementById('openSettings').addEventListener('mouseenter', (e) => {
            const btn = e.target;
            btn.style.background = 'var(--hover-bg, #f8f8f8)';
            btn.style.color = 'var(--primary-color, #007aff)';
        });

        document.getElementById('openSettings').addEventListener('mouseleave', (e) => {
            const btn = e.target;
            btn.style.background = 'var(--button-bg, #f2f2f7)';
            btn.style.color = 'var(--text-secondary, #6e6e73)';
        });

        document.getElementById('openSettings').addEventListener('click', () => {
            UIPanels.toggleSettingsPanel();
        });

        document.getElementById('startDate').addEventListener('change', () => UIPanels.updateDateRange(UI));
        document.getElementById('endDate').addEventListener('change', () => UIPanels.updateDateRange(UI));

        document.getElementById('thisWeek').addEventListener('click', () => {
            const [start, end] = Utils.getThisWeekRange();
            UIPanels.setDateRangeAndRefresh(start, end, UI);
        });
        document.getElementById('lastWeek').addEventListener('click', () => {
            const [start, end] = Utils.getLastWeekRange();
            UIPanels.setDateRangeAndRefresh(start, end, UI);
        });
        document.getElementById('thisMonth').addEventListener('click', () => {
            const [start, end] = Utils.getThisMonthRange();
            UIPanels.setDateRangeAndRefresh(start, end, UI);
        });
        document.getElementById('lastMonth').addEventListener('click', () => {
            const [start, end] = Utils.getLastMonthRange();
            UIPanels.setDateRangeAndRefresh(start, end, UI);
        });

        document.getElementById('refreshEvents').addEventListener('click', async () => {
            await UI.loadEvents();
            // 加载完成后应用当前的筛选条件
            Main.applyFiltersAndPagination();
        });
        document.getElementById('generateReport').addEventListener('click', () => Main.onGenerateReport());
        document.getElementById('exportData').addEventListener('click', () => Main.exportData());
        document.getElementById('copyReport').addEventListener('click', () => Main.copyReport());

        document.getElementById('selectAll').addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const checkboxes = document.querySelectorAll('#eventsTable input[type="checkbox"]:not(#selectAll)');
            checkboxes.forEach(checkbox => {
                const cb = checkbox;
                cb.checked = isChecked;
            });
            Main.updateButtons();
        });

        // 筛选和分页事件绑定
        // 筛选条件变化时不自动更新表格，只有点击刷新按钮时才更新
        document.getElementById('targetTypeFilter').addEventListener('change', () => {
            // 筛选条件变化时不执行任何操作
        });

        document.getElementById('pageSizeFilter').addEventListener('change', () => {
            Main.currentPage = 1; // 重置到第一页
            Main.applyFiltersAndPagination();
        });

        document.getElementById('searchFilter').addEventListener('input', () => {
            // 搜索条件变化时不执行任何操作
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            document.getElementById('targetTypeFilter').value = '';
            document.getElementById('searchFilter').value = '';
            document.getElementById('pageSizeFilter').value = '20';
            Main.currentPage = 1;
            // 清除筛选后立即应用
            Main.applyFiltersAndPagination();
        });

        // 分页按钮事件
        document.getElementById('firstPage').addEventListener('click', () => {
            Main.currentPage = 1;
            Main.applyFiltersAndPagination();
        });

        document.getElementById('prevPage').addEventListener('click', () => {
            if (Main.currentPage > 1) {
                Main.currentPage--;
                Main.applyFiltersAndPagination();
            }
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            if (Main.currentPage < Main.totalPages) {
                Main.currentPage++;
                Main.applyFiltersAndPagination();
            }
        });

        document.getElementById('lastPage').addEventListener('click', () => {
            Main.currentPage = Main.totalPages;
            Main.applyFiltersAndPagination();
        });
    },

    setDateRange: (startDate, endDate, UI) => {
        document.getElementById('startDate').value = startDate;
        document.getElementById('endDate').value = endDate;
        UIPanels.updateDateRange(UI);
    },

    setDateRangeAndRefresh: async (startDate, endDate, UI) => {
        UIPanels.setDateRange(startDate, endDate, UI);
        await UI.loadEvents();
    },

    updateDateRange: (UI) => {
        UI.currentStartDate = document.getElementById('startDate').value;
        UI.currentEndDate = document.getElementById('endDate').value;
        const dateRangeText = `${UI.currentStartDate} 至 ${UI.currentEndDate}`;
        document.getElementById('dateRange').textContent = dateRangeText;
    },

    createSettingsPanel: (UI) => {
        const config = CONFIG.get();
        UI.settingsPanel = document.createElement('div');
        UI.settingsPanel.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            width: 600px;
            height: calc(100vh - 80px);
            background: var(--panel-bg, white);
            border: 1px solid var(--border-color, #e1e5e9);
            border-radius: 12px;
            box-shadow: var(--shadow-large, 0 4px 20px rgba(0,0,0,0.08));
            backdrop-filter: blur(20px);
            z-index: 10001;
            display: none;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        UI.settingsPanel.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="padding: 20px; border-bottom: 1px solid var(--border-light, #f0f0f0); background: var(--card-bg, #f8f9fa); flex-shrink: 0; border-radius: 12px 12px 0 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="margin: 0; color: var(--text-color, #1d1d1f); font-size: 18px; font-weight: 600;">⚙️ 插件设置</h3>
                        <button id="closeSettingsPanel" style="background: var(--button-bg, #f2f2f7); border: none; font-size: 18px; cursor: pointer; color: var(--text-muted, #8e8e93); padding: 8px; border-radius: 8px; transition: all 0.2s ease;">×</button>
                    </div>
                </div>
                
                <div style="flex: 1; overflow-y: auto; padding: 20px;">
                    <div style="margin-bottom: 24px;">
                        <h4 style="margin: 0 0 12px 0; color: var(--text-color, #1d1d1f); font-size: 16px; font-weight: 600;">外观设置</h4>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">主题模式:</label>
                            <select id="themeMode" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                                <option value="light" ${config.THEME_MODE === 'light' ? 'selected' : ''}>浅色模式</option>
                                <option value="dark" ${config.THEME_MODE === 'dark' ? 'selected' : ''}>深色模式</option>
                                <option value="system" ${config.THEME_MODE === 'system' ? 'selected' : ''}>跟随系统</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h4 style="margin: 0 0 12px 0; color: var(--text-color, #1d1d1f); font-size: 16px; font-weight: 600;">GitLab 配置</h4>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">GitLab API URL:</label>
                            <input type="text" id="gitlabUrl" value="${config.GITLAB_URL}" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">Access Token:</label>
                            <input type="text" id="accessToken" value="${config.ACCESS_TOKEN}" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h4 style="margin: 0 0 12px 0; color: var(--text-color, #1d1d1f); font-size: 16px; font-weight: 600;">AI 配置</h4>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">DeepSeek API URL:</label>
                            <input type="text" id="deepseekUrl" value="${config.DEEPSEEK_BASE_URL}" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">API Key:</label>
                            <input type="text" id="deepseekKey" value="${config.DEEPSEEK_API_KEY}" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">模型:</label>
                            <select id="deepseekModel" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                                <option value="deepseek-chat" ${config.DEEPSEEK_MODEL === 'deepseek-chat' ? 'selected' : ''}>deepseek-chat</option>
                                <option value="deepseek-reasoner" ${config.DEEPSEEK_MODEL === 'deepseek-reasoner' ? 'selected' : ''}>deepseek-reasoner</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">最大 Token 数 (100-2000):</label>
                            <input type="number" id="maxTokens" value="${config.DEEPSEEK_MAX_TOKENS}" min="100" max="2000" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease;">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h4 style="margin: 0 0 12px 0; color: var(--text-color, #1d1d1f); font-size: 16px; font-weight: 600;">提示词配置</h4>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">系统提示词:</label>
                            <textarea id="systemPrompt" rows="6" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); resize: vertical; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.4;">${config.SYSTEM_PROMPT}</textarea>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary, #6e6e73); font-weight: 500;">默认附加要求:</label>
                            <textarea id="defaultPrompt" rows="3" style="width: 100%; padding: 12px; border: 1px solid var(--border-color, #e1e5e9); border-radius: 8px; font-size: 14px; background: var(--panel-bg, white); color: var(--text-color, #1d1d1f); resize: vertical; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08)); transition: border-color 0.2s ease, box-shadow 0.2s ease; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.4;">${config.DEFAULT_ADDITIONAL_PROMPT}</textarea>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 20px; border-top: 1px solid var(--border-light, #f0f0f0); background: var(--card-bg, #f8f9fa); flex-shrink: 0; border-radius: 0 0 12px 12px;">
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="resetSettings" style="padding: 12px 20px; background: var(--error-color, #ff3b30); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s ease; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">重置</button>
                        <button id="saveSettings" style="padding: 12px 20px; background: var(--primary-color, #007aff); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s ease; box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));">保存</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(UI.settingsPanel);
        UIPanels.bindSettingsEvents(UI);

        setTimeout(() => {
            const maxTokensInput = document.getElementById('maxTokens');
            if (maxTokensInput) {
                Utils.validateTokenInput(maxTokensInput, UI.showNotification);
            }
        }, 100);

        API.fetchAvailableModels(config).then((models) => {
            const modelSelect = document.getElementById('deepseekModel');
            if (modelSelect && models.length > 0) {
                const modelOptions = models.map(model =>
                    `<option value="${model.id}" ${model.id === config.DEEPSEEK_MODEL ? 'selected' : ''}>${model.name || model.id}</option>`
                ).join('');
                modelSelect.innerHTML = modelOptions;
            }
        });
    },

    bindSettingsEvents: (UI) => {
        document.getElementById('closeSettingsPanel').addEventListener('click', () => {
            UI.settingsPanel.style.display = 'none';
        });

        const maxTokensInput = document.getElementById('maxTokens');
        if (maxTokensInput) {
            Utils.validateTokenInput(maxTokensInput, UI.showNotification);
        }

        document.getElementById('saveSettings').addEventListener('click', () => {
            const maxTokens = parseInt(document.getElementById('maxTokens').value, 10);
            if (maxTokens > 2000) {
                UI.showNotification('Token数量不能超过2000', 'error');
                document.getElementById('maxTokens').value = '2000';
                return;
            }

            const newConfig = {
                THEME_MODE: document.getElementById('themeMode').value.trim(),
                GITLAB_URL: document.getElementById('gitlabUrl').value.trim(),
                ACCESS_TOKEN: document.getElementById('accessToken').value.trim(),
                DEEPSEEK_BASE_URL: document.getElementById('deepseekUrl').value.trim(),
                DEEPSEEK_API_KEY: document.getElementById('deepseekKey').value.trim(),
                DEEPSEEK_MODEL: document.getElementById('deepseekModel').value.trim(),
                DEEPSEEK_MAX_TOKENS: maxTokens,
                SYSTEM_PROMPT: document.getElementById('systemPrompt').value.trim(),
                DEFAULT_ADDITIONAL_PROMPT: document.getElementById('defaultPrompt').value.trim()
            };

            CONFIG.save(newConfig);
            UI.updateTheme();
            UI.showNotification('设置保存成功', 'success');

            UI.settingsPanel.style.display = 'none';
        });

        document.getElementById('resetSettings').addEventListener('click', () => {
            if (window.confirm('确定要重置所有设置到默认值吗？')) {
                const defaultConfig = CONFIG.reset();

                document.getElementById('themeMode').value = defaultConfig.THEME_MODE;
                document.getElementById('gitlabUrl').value = defaultConfig.GITLAB_URL;
                document.getElementById('accessToken').value = defaultConfig.ACCESS_TOKEN;
                document.getElementById('deepseekUrl').value = defaultConfig.DEEPSEEK_BASE_URL;
                document.getElementById('deepseekKey').value = defaultConfig.DEEPSEEK_API_KEY;
                document.getElementById('deepseekModel').value = defaultConfig.DEEPSEEK_MODEL;
                document.getElementById('maxTokens').value = defaultConfig.DEEPSEEK_MAX_TOKENS;
                document.getElementById('systemPrompt').value = defaultConfig.SYSTEM_PROMPT;
                document.getElementById('defaultPrompt').value = defaultConfig.DEFAULT_ADDITIONAL_PROMPT;

                const resetTokenInput = document.getElementById('maxTokens');
                if (resetTokenInput) {
                    Utils.validateTokenInput(resetTokenInput, UI.showNotification);
                }

                UI.updateTheme();
                UI.showNotification('设置已重置', 'success');
            }
        });

        document.getElementById('themeMode').addEventListener('change', () => {
            const themeMode = document.getElementById('themeMode').value;
            const currentConfig = CONFIG.get();
            currentConfig.THEME_MODE = themeMode;
            CONFIG.save(currentConfig);
            UI.updateTheme();
            UI.showNotification('主题已切换', 'success');
        });

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                const config = CONFIG.get();
                if (config.THEME_MODE === 'system') {
                    UI.updateTheme();
                }
            });
        }
    },

    toggleSettingsPanel: () => {
        if (!window.UI.settingsPanel) {
            return;
        }

        if (window.UI.settingsPanel.style.display === 'none') {
            window.UI.settingsPanel.style.display = 'block';
        } else {
            window.UI.settingsPanel.style.display = 'none';
        }
    }
};

export default UIPanels;
