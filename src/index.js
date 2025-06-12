/**
 * GitLab Weekly Report 统一入口文件
 * 自动检测环境并选择合适的初始化方式
 */

import CONFIG from './config.js';
import UIManager from './core/ui-manager.js';
import DataManager from './core/data-manager.js';
import environmentAdapter from './utils/environment-adapter.js';
// 导入全局滚动条样式
import './components/global-scrollbar.less';

/**
 * GitLab Weekly Report 主应用类
 * 支持油猴脚本模式和Web开发模式
 */
class GitLabWeeklyReport {
    constructor() {
        this.initialized = false;
        this.config = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.mode = environmentAdapter.getMode();
    }

    /**
     * 初始化应用
     * 根据环境模式选择不同的初始化策略
     */
    async init() {
        try {
            if (this.initialized) {
                console.log('GitLab Weekly Report 已经初始化');
                return;
            }

            console.log(`正在初始化 GitLab Weekly Report (${this.mode.toUpperCase()} 模式)...`);

            // 检查运行环境
            if (!(await this.checkEnvironment())) {
                console.error('运行环境检查失败');
                return;
            }

            // 加载配置
            this.config = CONFIG.get();
            console.log('配置加载完成');

            // 根据模式选择初始化策略
            if (this.mode === 'userscript') {
                await this.initUserScriptMode();
            } else {
                await this.initWebMode();
            }

            this.initialized = true;
            console.log(`GitLab Weekly Report 初始化完成 (${this.mode.toUpperCase()} 模式)`);

        } catch (error) {
            console.error('初始化失败:', error);
            this.handleInitError(error);
        }
    }

    /**
     * 油猴脚本模式初始化
     * 创建按钮和面板，等待用户触发
     */
    async initUserScriptMode() {
        console.log('🔧 初始化油猴脚本模式...');

        // 初始化主题
        UIManager.updateTheme();
        console.log('主题初始化完成');

        // 创建主按钮
        UIManager.createButton();
        console.log('主按钮创建完成');

        // 创建遮罩层
        UIManager.createMaskLayer();
        console.log('遮罩层创建完成');

        // 初始化数据管理器
        DataManager.init();
        console.log('数据管理器初始化完成');

        // 绑定全局事件
        this.bindGlobalEvents();
        console.log('全局事件绑定完成');
    }

    /**
     * Web开发模式初始化
     * 直接显示全屏面板
     */
    async initWebMode() {
        console.log('🌐 初始化Web开发模式...');

        // 初始化数据管理器
        const dataManager = DataManager;
        
        // 初始化UI管理器
        const uiManager = UIManager;
        
        // 将DataManager设置为全局变量，供UIManager使用
        window.DataManager = dataManager;
        
        // 在Web模式下直接显示全屏弹窗
        uiManager.createPanel();
        
        // 设置全屏样式
        if (uiManager.panel) {
            uiManager.panel.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: var(--panel-bg, white);
                border: none;
                border-radius: 0;
                box-shadow: none;
                backdrop-filter: blur(20px);
                z-index: 10001;
                display: block;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                opacity: 1;
                transform: none;
                transition: none;
            `;
            
            // 隐藏加载提示
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
             
            // 延迟加载事件数据
            setTimeout(() => {
                uiManager.loadEvents();
            }, 200);
        }
         
        // 添加热更新测试标识
        console.log('🔥 热更新功能已启用 - 修改代码后页面将自动刷新');
        
        // 设置全局变量供调试使用
        window.GitLabWeeklyReport = {
            dataManager,
            uiManager,
            version: '1.3.0'
        };
        
        // 移除加载提示
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // 绑定全局事件（Web模式也需要键盘快捷键等）
        this.bindGlobalEvents();
        
        console.log('Web 模式初始化完成');
    }

    /**
     * 检查运行环境
     * @returns {Promise<boolean>} 环境检查是否通过
     */
    async checkEnvironment() {
        const result = await environmentAdapter.checkEnvironment();
        return result.success;
    }

    /**
     * 绑定全局事件
     * 包括键盘快捷键、网络状态监听等
     */
    bindGlobalEvents() {
        try {
            // 监听页面可见性变化
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    // 页面重新可见时，更新主题
                    UIManager.updateTheme();
                }
            });

            // 监听键盘快捷键
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + Shift + W 打开/关闭面板
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'W') {
                    e.preventDefault();
                    UIManager.togglePanel();
                }

                // ESC 关闭面板
                if (e.key === 'Escape') {
                    if (UIManager.panel && UIManager.panel.style.display !== 'none') {
                        UIManager.minimizePanel();
                    }
                    if (UIManager.settingsPanel && UIManager.settingsPanel.style.display !== 'none') {
                        UIManager.settingsPanel.style.display = 'none';
                    }
                }
            });

            // 监听网络状态变化
            if ('navigator' in window && 'onLine' in navigator) {
                window.addEventListener('online', () => {
                    UIManager.showNotification('网络连接已恢复', 'success');
                });

                window.addEventListener('offline', () => {
                    UIManager.showNotification('网络连接已断开', 'warning');
                });
            }

            // 监听配置变化
            window.addEventListener('storage', (e) => {
                if (e.key === CONFIG.STORAGE_KEY) {
                    console.log('检测到配置变化，重新加载配置');
                    this.config = CONFIG.get();
                    UIManager.updateTheme();
                    if (DataManager.updateButtons) {
                        DataManager.updateButtons();
                    }
                }
            });

            console.log('全局事件绑定完成');
        } catch (error) {
            console.error('绑定全局事件失败:', error);
        }
    }

    /**
     * 处理初始化错误
     * @param {Error} _error 错误对象
     */
    handleInitError(_error) {
        this.retryCount++;
        
        if (this.retryCount <= this.maxRetries) {
            console.log(`初始化失败，${3000}ms后进行第${this.retryCount}次重试...`);
            setTimeout(() => {
                this.init();
            }, 3000);
        } else {
            console.error('初始化重试次数已达上限，插件启动失败');
            
            // 显示错误通知
            this.showErrorNotification();
        }
    }

    /**
     * 显示错误通知
     */
    showErrorNotification() {
        const errorNotification = document.createElement('div');
        errorNotification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff3b30;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
        `;
        
        if (this.mode === 'web') {
            errorNotification.innerHTML = `
                <div style="color: #dc3545; text-align: center;">
                    <h3>初始化失败</h3>
                    <p>GitLab 周报插件启动失败</p>
                    <button onclick="location.reload()" style="
                        padding: 8px 16px;
                        background: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">重新加载</button>
                </div>
            `;
        } else {
            errorNotification.textContent = 'GitLab 周报插件启动失败，请刷新页面重试';
        }
        
        document.body.appendChild(errorNotification);
        
        // 5秒后自动移除错误通知
        setTimeout(() => {
            if (errorNotification.parentNode) {
                errorNotification.parentNode.removeChild(errorNotification);
            }
        }, 5000);
    }

    /**
     * 重新初始化
     */
    async reinit() {
        try {
            console.log('正在重新初始化...');
            
            // 清理现有资源
            this.cleanup();
            
            // 重置状态
            this.initialized = false;
            this.retryCount = 0;
            
            // 重新初始化
            await this.init();
        } catch (error) {
            console.error('重新初始化失败:', error);
        }
    }

    /**
     * 清理资源
     */
    cleanup() {
        try {
            console.log('正在清理资源...');
            
            // 清理UIManager资源
            if (UIManager.cleanup) {
                UIManager.cleanup();
            }
            
            // 清理DataManager资源
            if (DataManager.cleanup) {
                DataManager.cleanup();
            }
            
            // 移除主按钮
            const mainButton = document.querySelector('.ui-main-button');
            if (mainButton && mainButton.parentNode) {
                mainButton.parentNode.removeChild(mainButton);
            }
            
            // 移除面板
            if (UIManager.panel && UIManager.panel.parentNode) {
                UIManager.panel.parentNode.removeChild(UIManager.panel);
                UIManager.panel = null;
            }
            
            // 移除设置面板
            if (UIManager.settingsPanel && UIManager.settingsPanel.parentNode) {
                UIManager.settingsPanel.parentNode.removeChild(UIManager.settingsPanel);
                UIManager.settingsPanel = null;
            }
            
            // 移除遮罩层
            if (UIManager.maskLayer && UIManager.maskLayer.parentNode) {
                UIManager.maskLayer.parentNode.removeChild(UIManager.maskLayer);
                UIManager.maskLayer = null;
            }
            
            // 移除通知
            const notifications = document.querySelectorAll('[data-notification="true"]');
            notifications.forEach(notification => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
            
            console.log('资源清理完成');
        } catch (error) {
            console.error('清理资源失败:', error);
        }
    }

    /**
     * 获取应用状态
     * @returns {Object} 应用状态信息
     */
    getStatus() {
        return {
            initialized: this.initialized,
            mode: this.mode,
            retryCount: this.retryCount,
            config: this.config,
            eventsCount: DataManager.allEvents ? DataManager.allEvents.length : 0,
            filteredEventsCount: DataManager.filteredEvents ? DataManager.filteredEvents.length : 0,
            currentPage: DataManager.currentPage,
            totalPages: DataManager.totalPages,
            environmentInfo: environmentAdapter.getSummary()
        };
    }

    /**
     * 导出调试信息
     * @returns {Object} 调试信息
     */
    exportDebugInfo() {
        const debugInfo = {
            status: this.getStatus(),
            config: CONFIG.get(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            errors: this.errors || [],
            environment: environmentAdapter.getSummary()
        };
        
        console.log('Debug Info:', debugInfo);
        return debugInfo;
    }
}

// 创建全局实例
const app = new GitLabWeeklyReport();

/**
 * 初始化函数
 * 根据DOM状态决定何时初始化
 */
function initializeApp() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            app.init();
        });
    } else {
        // DOM已经加载完成，直接初始化
        app.init();
    }
}

// 执行初始化
initializeApp();

// 将应用实例暴露到全局（用于调试和扩展）
if (typeof window !== 'undefined') {
    window.GitLabWeeklyReport = app;
    window.UIManager = UIManager;
    window.DataManager = DataManager;
    window.environmentAdapter = environmentAdapter;
    
    // 为了保持向后兼容性，暴露原有的接口
    // 原 ui.js 的兼容性接口
    const UI = UIManager;
    UI.eventsData = UIManager.state?.eventsData;
    UI.currentStartDate = UIManager.state?.currentStartDate;
    UI.currentEndDate = UIManager.state?.currentEndDate;
    UI.userBalance = UIManager.state?.userBalance;
    UI.lastTokenUsage = UIManager.state?.lastTokenUsage;
    UI.panel = UIManager.state?.panel;
    UI.settingsPanel = UIManager.state?.settingsPanel;
    UI.maskLayer = UIManager.state?.maskLayer;
    window.UI = UI;
    
    // 原 index.js 的兼容性接口
    const Main = DataManager;
    Main.currentPage = DataManager.state?.currentPage;
    Main.pageSize = DataManager.state?.pageSize;
    Main.totalPages = DataManager.state?.totalPages;
    Main.filteredEvents = DataManager.state?.filteredEvents;
    Main.allEvents = DataManager.state?.allEvents;
    Main.currentSortField = DataManager.state?.currentSortField;
    Main.currentSortOrder = DataManager.state?.currentSortOrder;
    window.Main = Main;
    
    // 原 ui-panels.js 的兼容性接口
    window.UIPanels = {
        createPanel: (_UI, _Main) => {
            return UIManager.createPanel();
        }
    };
    
    // 添加控制台命令（用于调试）
    window.glwr = {
        status: () => app.getStatus(),
        reinit: () => app.reinit(),
        cleanup: () => app.cleanup(),
        debug: () => app.exportDebugInfo(),
        config: {
            get: () => CONFIG.get(),
            set: (newConfig) => CONFIG.save(newConfig),
            reset: () => CONFIG.reset()
        },
        ui: {
            show: () => UIManager.togglePanel(),
            hide: () => UIManager.minimizePanel(),
            theme: (theme) => {
                if (theme) {
                    const config = CONFIG.get();
                    config.THEME_MODE = theme;
                    CONFIG.save(config);
                    UIManager.updateTheme();
                } else {
                    return CONFIG.get().THEME_MODE;
                }
            }
        },
        data: {
            load: () => UIManager.loadEvents(),
            export: () => DataManager.exportData(),
            clear: () => {
                DataManager.allEvents = [];
                DataManager.filteredEvents = [];
                DataManager.applyFiltersAndPagination();
            }
        },
        env: {
            mode: () => environmentAdapter.getMode(),
            info: () => environmentAdapter.getSummary(),
            check: () => environmentAdapter.checkEnvironment()
        }
    };
    
    console.log('GitLab Weekly Report 控制台命令已注册，使用 window.glwr 访问');
}

// 热更新支持：在开发模式下添加模块热替换逻辑
if (process.env.NODE_ENV === 'development') {
    console.log('🔥 开发模式：热更新已启用');
    
    // 监听文件变化（通过 livereload 实现）
    if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
            console.log('页面即将刷新...');
        });
    }
}

// 导出主应用类和初始化函数（用于模块化使用）
// export { initializeApp as initWebMode };
// export { app };

// 兼容性：将初始化函数暴露到全局
if (typeof window !== 'undefined') {
    window.initWebMode = initializeApp;
}