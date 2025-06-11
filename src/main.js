/**
 * GitLab Weekly Report - 主入口文件
 * 整合了原来的 ui.js, index.js, ui-panels.js 的功能
 * 提供统一的初始化和管理接口
 */

import CONFIG from './config.js';
import Utils from './utils/utils.js';
import UIManager from './core/ui-manager.js';
import DataManager from './core/data-manager.js';

// 主应用类
class GitLabWeeklyReport {
    constructor() {
        this.initialized = false;
        this.config = null;
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    // 初始化应用
    async init() {
        try {
            if (this.initialized) {
                console.log('GitLab Weekly Report 已经初始化');
                return;
            }

            console.log('正在初始化 GitLab Weekly Report...');

            // 检查运行环境
            if (!this.checkEnvironment()) {
                console.error('运行环境检查失败');
                return;
            }

            // 加载配置
            this.config = CONFIG.get();
            console.log('配置加载完成');

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

            this.initialized = true;
            console.log('GitLab Weekly Report 初始化完成');

            // 显示初始化成功通知
            setTimeout(() => {
                UIManager.showNotification('GitLab 周报插件已就绪', 'success');
            }, 1000);

        } catch (error) {
            console.error('初始化失败:', error);
            this.handleInitError(error);
        }
    }

    // 检查运行环境
    checkEnvironment() {
        try {
            // 检查是否在浏览器环境中
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                console.error('必须在浏览器环境中运行');
                return false;
            }

            // 检查必要的API支持
            const requiredAPIs = [
                'fetch',
                'localStorage',
                'JSON',
                'Promise',
                'requestAnimationFrame'
            ];

            for (const api of requiredAPIs) {
                if (typeof window[api] === 'undefined') {
                    console.error(`浏览器不支持 ${api} API`);
                    return false;
                }
            }

            // 检查是否在GitLab页面
            const isGitLabPage = window.location.hostname.includes('gitlab') || 
                                document.querySelector('[data-page="projects:activity"]') ||
                                document.querySelector('.navbar-gitlab');

            if (!isGitLabPage) {
                console.warn('当前页面可能不是GitLab页面，插件功能可能受限');
            }

            return true;
        } catch (error) {
            console.error('环境检查失败:', error);
            return false;
        }
    }

    // 绑定全局事件
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

    // 处理初始化错误
    handleInitError(error) {
        this.retryCount++;
        
        if (this.retryCount <= this.maxRetries) {
            console.log(`初始化失败，${3000}ms后进行第${this.retryCount}次重试...`);
            setTimeout(() => {
                this.init();
            }, 3000);
        } else {
            console.error('初始化重试次数已达上限，插件启动失败');
            
            // 显示错误通知
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
            errorNotification.textContent = 'GitLab 周报插件启动失败，请刷新页面重试';
            document.body.appendChild(errorNotification);
            
            // 5秒后自动移除错误通知
            setTimeout(() => {
                if (errorNotification.parentNode) {
                    errorNotification.parentNode.removeChild(errorNotification);
                }
            }, 5000);
        }
    }

    // 重新初始化
    reinit() {
        try {
            console.log('正在重新初始化...');
            
            // 清理现有资源
            this.cleanup();
            
            // 重置状态
            this.initialized = false;
            this.retryCount = 0;
            
            // 重新初始化
            this.init();
        } catch (error) {
            console.error('重新初始化失败:', error);
        }
    }

    // 清理资源
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

    // 获取应用状态
    getStatus() {
        return {
            initialized: this.initialized,
            retryCount: this.retryCount,
            config: this.config,
            eventsCount: DataManager.allEvents ? DataManager.allEvents.length : 0,
            filteredEventsCount: DataManager.filteredEvents ? DataManager.filteredEvents.length : 0,
            currentPage: DataManager.currentPage,
            totalPages: DataManager.totalPages
        };
    }

    // 导出数据（用于调试）
    exportDebugInfo() {
        const debugInfo = {
            status: this.getStatus(),
            config: CONFIG.get(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            errors: this.errors || []
        };
        
        console.log('Debug Info:', debugInfo);
        return debugInfo;
    }
}

// 创建全局实例
const app = new GitLabWeeklyReport();

// 等待DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    // DOM已经加载完成，直接初始化
    app.init();
}

// 将应用实例暴露到全局（用于调试和扩展）
if (typeof window !== 'undefined') {
    window.GitLabWeeklyReport = app;
    window.UIManager = UIManager;
    window.DataManager = DataManager;
    
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
        createPanel: (UI, Main) => {
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
        }
    };
    
    console.log('GitLab Weekly Report 控制台命令已注册，使用 window.glwr 访问');
}

// 导出主应用类（用于模块化使用）
export default GitLabWeeklyReport;