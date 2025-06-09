import CONFIG from './config.js';
import Utils from './utils.js';
import API from './api.js';

// 性能优化：防抖函数（提取到外部避免循环引用）
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const UI = {
    panel: null,
    settingsPanel: null,
    maskLayer: null,
    eventsData: [],
    currentStartDate: '',
    currentEndDate: '',
    userBalance: null,
    lastTokenUsage: null,
    originalBodyOverscrollBehavior: '',
    originalHtmlOverscrollBehavior: '',

    // 性能优化：缓存常用的DOM查询
    _domCache: new Map(),
    _animationFrameId: null,
    _notificationTimer: null,
    // 注释：已移除_scrollBarWidth缓存，使用overscroll-behavior替代

    // 性能优化：获取缓存的DOM元素
    getCachedElement: (selector, context = document) => {
        const key = `${context === document ? 'doc' : 'ctx'}:${selector}`;
        if (!UI._domCache.has(key)) {
            const element = context.querySelector(selector);
            UI._domCache.set(key, element);
        }
        return UI._domCache.get(key);
    },

    // 性能优化：清除DOM缓存
    clearDOMCache: () => {
        UI._domCache.clear();
    },

    // 性能优化：防抖函数
    debounce: debounce,

    // 注释：已移除getScrollBarWidth方法，使用overscroll-behavior替代

    applyTheme: (theme) => {
        const colors = CONFIG.THEMES[theme];
        const root = document.documentElement;

        // 性能优化：批量更新CSS属性
        requestAnimationFrame(() => {
            const styleUpdates = [
                ['--panel-bg', colors.background],
                ['--card-bg', colors.cardBg],
                ['--border-color', colors.border],
                ['--border-light', colors.borderLight],
                ['--text-color', colors.text],
                ['--text-secondary', colors.textSecondary],
                ['--text-muted', colors.textMuted],
                ['--primary-color', colors.primary],
                ['--success-color', colors.success],
                ['--warning-color', colors.warning],
                ['--error-color', colors.error],
                ['--button-bg', colors.buttonBg],
                ['--hover-bg', colors.hoverBg],
                ['--shadow', colors.shadow],
                ['--shadow-large', colors.shadowLarge]
            ];

            styleUpdates.forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        });
    },

    updateTheme: () => {
        const config = CONFIG.get();
        let theme = 'light';
        if (config.THEME_MODE === 'dark') {
            theme = 'dark';
        } else if (config.THEME_MODE === 'system') {
            theme = Utils.detectSystemTheme();
        }
        UI.applyTheme(theme);
    },

    // 性能优化：优化通知创建和动画
    showNotification: (message, type = 'info') => {
        if (!UI.panel || UI.panel.style.display === 'none') {
            return;
        }

        // 清除之前的定时器
        if (UI._notificationTimer) {
            clearTimeout(UI._notificationTimer);
            UI._notificationTimer = null;
        }

        // 移除已存在的通知（使用缓存查询）
        const existingNotification = UI.getCachedElement('[data-notification="true"]', UI.panel);
        if (existingNotification) {
            UI._removeNotification(existingNotification);
        }

        const notification = UI._createNotificationElement(message, type);

        // 性能优化：使用DocumentFragment减少重排
        const fragment = document.createDocumentFragment();
        fragment.appendChild(notification);
        UI.panel.appendChild(fragment);

        // 性能优化：使用requestAnimationFrame优化动画
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // 设置自动关闭定时器
        UI._notificationTimer = setTimeout(() => {
            UI._removeNotification(notification);
        }, 5000);
    },

    // 性能优化：提取通知创建逻辑
    _createNotificationElement: (message, type) => {
        const notification = document.createElement('div');
        notification.setAttribute('data-notification', 'true');

        const typeConfig = {
            info: { color: '#007aff', bg: 'rgba(0, 122, 255, 0.1)', icon: 'ℹ️' },
            success: { color: '#30d158', bg: 'rgba(48, 209, 88, 0.1)', icon: '✅' },
            error: { color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.1)', icon: '❌' },
            warning: { color: '#ff9500', bg: 'rgba(255, 149, 0, 0.1)', icon: '⚠️' }
        };

        const config = typeConfig[type] || typeConfig.info;

        notification.className = 'ui-notification';
        notification.style.cssText = `
            position: fixed;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 350px;
            padding: 6px 12px;
            border-radius: 6px;
            color: var(--text-color, #1d1d1f);
            font-size: 14px;
            z-index: 10004;
            background: ${config.bg};
            border: 1px solid ${config.color}40;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            font-weight: 500;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
            will-change: transform, opacity;
        `;

        // 性能优化：使用innerHTML一次性创建结构
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">${config.icon}</span>
                <span>${message}</span>
            </div>
            <button class="notification-close" style="
                background: none;
                border: none;
                color: ${config.color};
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                margin: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
                flex-shrink: 0;
            ">×</button>
        `;

        // 性能优化：使用事件委托
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            if (UI._notificationTimer) {
                clearTimeout(UI._notificationTimer);
                UI._notificationTimer = null;
            }
            UI._removeNotification(notification);
        }, { once: true });

        // 添加悬停效果
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = `${config.color}20`;
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });

        return notification;
    },

    // 性能优化：提取通知移除逻辑
    _removeNotification: (notification) => {
        if (!notification || !notification.parentNode) {return;}

        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(20px)';
            notification.style.opacity = '0';

            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    UI.clearDOMCache(); // 清除相关缓存
                }
            }, 300);
        });
    },

    createButton: () => {
        const button = document.createElement('button');
        button.innerHTML = '周报';
        button.className = 'ui-main-button';
        button.style.cssText = `
            position: fixed;
            bottom: 110px;
            right: 50px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            z-index: 10000;
            background: #1890ff;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
            transform: scale(1);
            will-change: transform, background-color, box-shadow;
        `;

        // 性能优化：使用passive事件监听器
        const debouncedHover = debounce((isEnter) => {
            requestAnimationFrame(() => {
                if (isEnter) {
                    button.style.background = '#40a9ff';
                    button.style.transform = 'scale(1.1)';
                    button.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
                } else {
                    button.style.background = '#1890ff';
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }
            });
        }, 16); // ~60fps

        button.addEventListener('mouseenter', () => debouncedHover(true), { passive: true });
        button.addEventListener('mouseleave', () => debouncedHover(false), { passive: true });

        button.addEventListener('click', () => {
            requestAnimationFrame(() => {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        button.style.transform = button.matches(':hover') ? 'scale(1.05)' : 'scale(1)';
                    });
                }, 100);
            });
            UI.togglePanel();
        });

        document.body.appendChild(button);
    },

    createMaskLayer: () => {
        if (UI.maskLayer) {return;} // 避免重复创建

        UI.maskLayer = document.createElement('div');
        UI.maskLayer.className = 'ui-mask-layer';
        UI.maskLayer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 9999;
            display: none;
            transition: opacity 0.3s ease;
            opacity: 0;
            will-change: opacity;
        `;

        UI.maskLayer.addEventListener('click', () => {
            UI.minimizePanel();
            if (UI.settingsPanel && UI.settingsPanel.style.display !== 'none') {
                UI.settingsPanel.style.display = 'none';
            }
        }, { passive: true });

        document.body.appendChild(UI.maskLayer);
    },

    showMaskLayer: () => {
        if (!UI.maskLayer) {
            UI.createMaskLayer();
        }

        UI.originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;
        UI.originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

        // 性能优化：批量更新样式
        requestAnimationFrame(() => {
            UI.maskLayer.style.display = 'block';
            document.body.style.overscrollBehavior = 'contain';
            document.documentElement.style.overscrollBehavior = 'contain';

            requestAnimationFrame(() => {
                UI.maskLayer.style.opacity = '1';
            });
        });
    },

    hideMaskLayer: () => {
        if (!UI.maskLayer) {return;}

        requestAnimationFrame(() => {
            UI.maskLayer.style.opacity = '0';

            setTimeout(() => {
                requestAnimationFrame(() => {
                    UI.maskLayer.style.display = 'none';
                    document.body.style.overscrollBehavior = UI.originalBodyOverscrollBehavior || '';
                    document.documentElement.style.overscrollBehavior = UI.originalHtmlOverscrollBehavior || '';
                });
            }, 300);
        });
    },

    togglePanel: () => {
        if (!UI.panel) {
            // 确保方法存在后再调用
            if (typeof UI.createPanel === 'function') {
                UI.createPanel();
            }
            if (typeof UI.loadEvents === 'function') {
                UI.loadEvents();
            }
        }

        if (UI.panel.style.display === 'none') {
            UI.showMaskLayer();

            // 性能优化：批量更新面板样式
            requestAnimationFrame(() => {
                UI.panel.style.display = 'block';

                // 异步获取余额，避免阻塞UI
                UI.fetchAndShowBalance();

                requestAnimationFrame(() => {
                    UI.panel.style.opacity = '1';
                    UI.panel.style.transform = 'scale(1) translateY(0)';
                });
            });
        } else {
            UI.minimizePanel();
        }
    },

    minimizePanel: () => {
        // 性能优化：使用缓存查询
        const button = UI.getCachedElement('button[style*="position: fixed"][style*="bottom: 110px"]');
        if (!button || !UI.panel) {return;}

        // 性能优化：批量获取位置信息
        const rectPanel = UI.panel.getBoundingClientRect();
        const rectButton = button.getBoundingClientRect();

        // 创建克隆元素用于动画
        const clone = UI.panel.cloneNode(true);
        clone.style.cssText = UI.panel.style.cssText;
        clone.style.zIndex = '10002';
        clone.style.pointerEvents = 'none';
        clone.style.overflow = 'hidden';
        clone.style.willChange = 'transform, opacity, border-radius';

        // 性能优化：使用DocumentFragment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        document.body.appendChild(fragment);

        // 批量设置克隆元素的位置
        requestAnimationFrame(() => {
            Object.assign(clone.style, {
                width: `${rectPanel.width}px`,
                height: `${rectPanel.height}px`,
                left: `${rectPanel.left}px`,
                top: `${rectPanel.top}px`,
                position: 'fixed',
                transformOrigin: 'center'
            });

            UI.panel.style.display = 'none';
            UI.hideMaskLayer();
            if (UI.settingsPanel && UI.settingsPanel.style.display !== 'none') {
                UI.settingsPanel.style.display = 'none';
            }

            // 计算动画参数
            const targetCenterX = rectButton.left + rectButton.width / 2;
            const targetCenterY = rectButton.top + rectButton.height / 2;
            const originCenterX = rectPanel.left + rectPanel.width / 2;
            const originCenterY = rectPanel.top + rectPanel.height / 2;

            const deltaX = targetCenterX - originCenterX;
            const deltaY = targetCenterY - originCenterY;

            const scaleX = rectButton.width / rectPanel.width;
            const scaleY = rectButton.height / rectPanel.height;
            const scale = Math.min(scaleX, scaleY);

            // 性能优化：使用Web Animations API
            const animation = clone.animate([
                {
                    transform: 'translate(0px, 0px) scale(1)',
                    opacity: 1,
                    borderRadius: '8px'
                },
                {
                    transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
                    opacity: 0.3,
                    borderRadius: '50%'
                }
            ], {
                duration: 400,
                easing: 'cubic-bezier(0.73, 0.06, 0.34, 1.02)',
                fill: 'forwards'
            });

            animation.onfinish = () => {
                // 清理克隆元素
                if (clone.parentNode) {
                    document.body.removeChild(clone);
                }

                // 重置面板状态
                requestAnimationFrame(() => {
                    UI.panel.style.opacity = '0';
                    UI.panel.style.transform = 'scale(0.3) translateY(50px)';

                    // 按钮反馈动画
                    button.animate([
                        { transform: 'scale(1.2)' },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 150,
                        easing: 'ease-out'
                    });
                });

                UI.clearDOMCache(); // 清除缓存
            };
        });
    },

    // 性能优化：优化余额获取，添加缓存和错误处理
    fetchAndShowBalance: (() => {
        let balanceCache = null;
        let lastFetchTime = 0;
        const CACHE_DURATION = 30000; // 30秒缓存
        let isFetching = false;

        return async () => {
            const now = Date.now();

            // 如果正在获取或缓存有效，则返回
            if (isFetching || (balanceCache && (now - lastFetchTime) < CACHE_DURATION)) {
                if (balanceCache) {
                    UI.userBalance = balanceCache;
                    UI.updateBalanceDisplay();
                }
                return;
            }

            isFetching = true;

            try {
                const config = CONFIG.get();
                const balance = await API.fetchUserBalance(config);

                if (balance) {
                    balanceCache = balance;
                    lastFetchTime = now;
                    UI.userBalance = balance;

                    // 性能优化：使用requestAnimationFrame更新UI
                    requestAnimationFrame(() => {
                        UI.updateBalanceDisplay();
                    });
                }
            } catch (error) {
                console.error('获取余额失败:', error);

                // 性能优化：显示用户友好的错误提示
                requestAnimationFrame(() => {
                    UI.showNotification('获取余额失败，请检查网络连接', 'error');
                });
            } finally {
                isFetching = false;
            }
        };
    })(),

    // 性能优化：优化余额显示更新
    updateBalanceDisplay: () => {
        // 使用缓存查询减少DOM操作
        const balanceElement = UI.getCachedElement('#balanceInfo');
        const tokenElement = UI.getCachedElement('#tokenUsage');

        // 批量更新DOM
        requestAnimationFrame(() => {
            if (balanceElement && UI.userBalance) {
                balanceElement.textContent = `余额: ${UI.userBalance.total_balance} ${UI.userBalance.currency}`;
                balanceElement.style.color = '#52c41a';
            }

            if (tokenElement && UI.lastTokenUsage) {
                tokenElement.textContent = `本次回答使用的Token: ${UI.lastTokenUsage.prompt_tokens}+${UI.lastTokenUsage.completion_tokens}=${UI.lastTokenUsage.total_tokens}`;
            }
        });
    },

    // 性能优化：添加清理方法
    cleanup: () => {
        // 清除所有定时器
        if (UI._notificationTimer) {
            clearTimeout(UI._notificationTimer);
            UI._notificationTimer = null;
        }

        if (UI._animationFrameId) {
            cancelAnimationFrame(UI._animationFrameId);
            UI._animationFrameId = null;
        }

        // 清除DOM缓存
        UI.clearDOMCache();

        // 重置滚动条宽度缓存
        // 注释：已移除滚动条宽度缓存清理
    }
};

// 性能优化：添加窗口大小变化监听（防抖）- 移到UI对象定义后
UI.handleResize = debounce(() => {
    // 重置滚动条宽度缓存
    // 注释：已移除滚动条宽度缓存清理
    UI.clearDOMCache();
}, 250);

// 性能优化：监听窗口大小变化
if (typeof window !== 'undefined') {
    window.addEventListener('resize', UI.handleResize, { passive: true });

    // 页面卸载时清理资源
    window.addEventListener('beforeunload', UI.cleanup, { passive: true });
}

export default UI;
