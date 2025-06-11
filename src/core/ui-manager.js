import Utils from '../utils/utils.js';
import CONFIG from '../config.js';
import API from '../api.js';
import { createElement } from '../utils/jsx-runtime.js';
import { AIPanel } from '../components/ai-panel.jsx';
import { DataPanel } from '../components/data-panel.jsx';
import { SettingsPanel } from '../components/settings-panel.jsx';
import { notificationManager } from '../components/notification.jsx';

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

const UIManager = {
    // UI状态管理
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

    // 性能优化：获取缓存的DOM元素
    getCachedElement: (selector, context = document) => {
        const key = `${context === document ? 'doc' : 'ctx'}:${selector}`;
        if (!UIManager._domCache.has(key)) {
            const element = context.querySelector(selector);
            UIManager._domCache.set(key, element);
        }
        return UIManager._domCache.get(key);
    },

    // 性能优化：清除DOM缓存
    clearDOMCache: () => {
        UIManager._domCache.clear();
    },

    // 性能优化：防抖函数
    debounce: debounce,

    // 主题管理
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
        UIManager.applyTheme(theme);
    },

    // 通知系统
    showNotification: (message, type = 'info') => {
        // 使用新的通知管理器显示通知
        notificationManager.show(message, type, 5000);
    },



    // 主按钮创建
    createButton: () => {
        const button = document.createElement('button');
        button.innerHTML = '周报';
        button.className = 'ui-main-button';
        button.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 30px;
            width: var(--button-size-lg, 44px);
            height: var(--button-size-lg, 44px);
            border-radius: 50%;
            z-index: 10000;
            background: var(--primary-color, #007aff);
            color: white;
            border: none;
            cursor: pointer;
            font-size: var(--font-md, 13px);
            font-weight: var(--font-semibold, 600);
            box-shadow: var(--shadow, 0 1px 3px rgba(0,0,0,0.08));
            transition: all 0.2s ease;
            transform: scale(1);
            will-change: transform, background-color, box-shadow;
        `;

        // 性能优化：使用passive事件监听器
        const debouncedHover = debounce((isEnter) => {
            requestAnimationFrame(() => {
                if (isEnter) {
                    button.style.background = 'var(--primary-color, #007aff)';
                    button.style.filter = 'brightness(1.1)';
                    button.style.transform = 'scale(1.05)';
                    button.style.boxShadow = 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.1))';
                } else {
                    button.style.background = 'var(--primary-color, #007aff)';
                    button.style.filter = 'brightness(1)';
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = 'var(--shadow, 0 1px 3px rgba(0,0,0,0.08))';
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
            UIManager.togglePanel();
        });

        document.body.appendChild(button);
    },

    // 遮罩层管理
    createMaskLayer: () => {
        if (UIManager.maskLayer) {return;} // 避免重复创建

        UIManager.maskLayer = document.createElement('div');
        UIManager.maskLayer.className = 'ui-mask-layer';
        UIManager.maskLayer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--overlay-bg, rgba(0, 0, 0, 0.3));
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 9999;
            display: none;
            transition: opacity 0.2s ease;
            opacity: 0;
            will-change: opacity;
        `;

        UIManager.maskLayer.addEventListener('click', () => {
            UIManager.minimizePanel();
            if (UIManager.settingsPanel && UIManager.settingsPanel.style.display !== 'none') {
                UIManager.settingsPanel.style.display = 'none';
            }
        }, { passive: true });

        document.body.appendChild(UIManager.maskLayer);
    },

    showMaskLayer: () => {
        if (!UIManager.maskLayer) {
            UIManager.createMaskLayer();
        }

        UIManager.originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;
        UIManager.originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

        // 性能优化：批量更新样式
        requestAnimationFrame(() => {
            UIManager.maskLayer.style.display = 'block';
            document.body.style.overscrollBehavior = 'contain';
            document.documentElement.style.overscrollBehavior = 'contain';

            requestAnimationFrame(() => {
                UIManager.maskLayer.style.opacity = '1';
            });
        });
    },

    hideMaskLayer: () => {
        if (!UIManager.maskLayer) {return;}

        requestAnimationFrame(() => {
            UIManager.maskLayer.style.opacity = '0';

            setTimeout(() => {
                requestAnimationFrame(() => {
                    UIManager.maskLayer.style.display = 'none';
                    document.body.style.overscrollBehavior = UIManager.originalBodyOverscrollBehavior || '';
                    document.documentElement.style.overscrollBehavior = UIManager.originalHtmlOverscrollBehavior || '';
                });
            }, 300);
        });
    },

    // 面板控制
    togglePanel: () => {
        if (!UIManager.panel) {
            UIManager.createPanel();
            // 延迟加载事件，确保DOM完全渲染
            setTimeout(() => {
                UIManager.loadEvents();
            }, 200);
        }

        if (UIManager.panel.style.display === 'none') {
            UIManager.showMaskLayer();

            // 性能优化：批量更新面板样式
            requestAnimationFrame(() => {
                UIManager.panel.style.display = 'block';

                // 异步获取余额，避免阻塞UI
                UIManager.fetchAndShowBalance();

                requestAnimationFrame(() => {
                    UIManager.panel.style.opacity = '1';
                    UIManager.panel.style.transform = 'scale(1) translateY(0)';
                });
            });
        } else {
            UIManager.minimizePanel();
        }
    },

    minimizePanel: () => {
        // 性能优化：使用缓存查询
        const button = UIManager.getCachedElement('button[style*="position: fixed"][style*="bottom: 110px"]');
        if (!button || !UIManager.panel) {return;}

        // 性能优化：批量获取位置信息
        const rectPanel = UIManager.panel.getBoundingClientRect();
        const rectButton = button.getBoundingClientRect();

        // 创建克隆元素用于动画
        const clone = UIManager.panel.cloneNode(true);
        clone.style.cssText = UIManager.panel.style.cssText;
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

            UIManager.panel.style.display = 'none';
            UIManager.hideMaskLayer();
            if (UIManager.settingsPanel && UIManager.settingsPanel.style.display !== 'none') {
                UIManager.settingsPanel.style.display = 'none';
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
                    UIManager.panel.style.opacity = '0';
                    UIManager.panel.style.transform = 'scale(0.3) translateY(50px)';

                    // 按钮反馈动画
                    button.animate([
                        { transform: 'scale(1.2)' },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 150,
                        easing: 'ease-out'
                    });
                });

                UIManager.clearDOMCache(); // 清除缓存
            };
        });
    },

    // 余额管理
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
                    UIManager.userBalance = balanceCache;
                    UIManager.updateBalanceDisplay();
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
                    UIManager.userBalance = balance;

                    // 性能优化：使用requestAnimationFrame更新UI
                    requestAnimationFrame(() => {
                        UIManager.updateBalanceDisplay();
                    });
                }
            } catch (error) {
                console.error('获取余额失败:', error);

                // 性能优化：显示用户友好的错误提示
                requestAnimationFrame(() => {
                    UIManager.showNotification('获取余额失败，请检查网络连接', 'error');
                });
            } finally {
                isFetching = false;
            }
        };
    })(),

    // 性能优化：优化余额显示更新
    updateBalanceDisplay: () => {
        // 使用缓存查询减少DOM操作
        const balanceElement = UIManager.getCachedElement('#balanceInfo');
        const tokenElement = UIManager.getCachedElement('#tokenUsage');

        // 批量更新DOM
        requestAnimationFrame(() => {
            if (balanceElement && UIManager.userBalance) {
                balanceElement.textContent = `余额: ${UIManager.userBalance.total_balance} ${UIManager.userBalance.currency}`;
                balanceElement.style.color = '#52c41a';
            }

            if (tokenElement && UIManager.lastTokenUsage) {
                tokenElement.textContent = `本次回答使用的Token: ${UIManager.lastTokenUsage.prompt_tokens}+${UIManager.lastTokenUsage.completion_tokens}=${UIManager.lastTokenUsage.total_tokens}`;
            }
        });
    },

    // 面板创建和事件绑定
    createPanel: () => {
        UIManager.panel = document.createElement('div');
        UIManager.panel.id = 'tm-gwe-ui-panel';
        UIManager.panel.style.cssText = `
            position: fixed;
            top: 40px;
            right: 20px;
            width: min(calc(100vw - 60px), 1200px);
            height: calc(100vh - 60px);
            background: var(--panel-bg, white);
            border: 1px solid var(--border-color, #e1e5e9);
            border-radius: 10px;
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
        UIManager.currentStartDate = thisWeekStart;
        UIManager.currentEndDate = thisWeekEnd;

        // 创建主容器
        const mainContainer = createElement('div', {
            style: {
                display: 'flex',
                height: '100%'
            }
        });
        
        // 创建AI面板
        const aiPanelElement = createElement(AIPanel, {
            onOpenSettings: () => {
                UIManager.toggleSettingsPanel();
            },
            onGenerateReport: () => {
                // 这里会在DataManager中处理
                if (window.DataManager && window.DataManager.onGenerateReport) {
                    window.DataManager.onGenerateReport();
                }
            },
            onExportData: () => {
                if (window.DataManager && window.DataManager.exportData) {
                    window.DataManager.exportData();
                }
            },
            onCopyReport: () => {
                if (window.DataManager && window.DataManager.copyReport) {
                    window.DataManager.copyReport();
                }
            }
        });
        
        // 创建右侧数据面板
        const dataPanelElement = createElement(DataPanel, {
            onClosePanel: () => {
                UIManager.minimizePanel();
            },
            onRefreshEvents: () => {
                UIManager.loadEvents();
            },
            onClearFilters: () => {
                if (window.DataManager && window.DataManager.clearFilters) {
                    window.DataManager.clearFilters();
                }
            },
            onSelectAll: () => {
                if (window.DataManager && window.DataManager.handleSelectAll) {
                    window.DataManager.handleSelectAll();
                }
            },
            startDate: thisWeekStart,
            endDate: thisWeekEnd,
            onThisWeek: () => {
                const [start, end] = Utils.getThisWeekRange();
                UIManager.setDateRangeAndRefresh(start, end);
            },
            onLastWeek: () => {
                const [start, end] = Utils.getLastWeekRange();
                UIManager.setDateRangeAndRefresh(start, end);
            },
            onThisMonth: () => {
                const [start, end] = Utils.getThisMonthRange();
                UIManager.setDateRangeAndRefresh(start, end);
            },
            onLastMonth: () => {
                const [start, end] = Utils.getLastMonthRange();
                UIManager.setDateRangeAndRefresh(start, end);
            }
        });
        
        mainContainer.appendChild(aiPanelElement);
        mainContainer.appendChild(dataPanelElement);
        
        // 将主容器添加到面板
        UIManager.panel.appendChild(mainContainer);

        document.body.appendChild(UIManager.panel);

        const scrollableContent = document.getElementById('scrollableContent');
        if (scrollableContent) {
            scrollableContent.addEventListener('wheel', (e) => {
                e.stopPropagation();
            });
            scrollableContent.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        }

        UIManager.bindPanelEvents();
        UIManager.updateDateRange();
        UIManager.updateTheme();

        UIManager.createSettingsPanel();
    },

    // 事件绑定
    bindPanelEvents: () => {
        // 注意：closePanel 的点击事件已经通过 JSX onClick 属性绑定，无需重复绑定
        
        const openSettings = document.getElementById('openSettings');
        if (openSettings) {
            openSettings.addEventListener('click', () => {
                UIManager.toggleSettingsPanel();
            });
        }

        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        if (startDate) startDate.addEventListener('change', () => UIManager.updateDateRange());
        if (endDate) endDate.addEventListener('change', () => UIManager.updateDateRange());
        
        // 绑定表格排序事件
        UIManager.bindTableSortEvents();

        // 绑定日期快捷按钮
        const thisWeek = document.getElementById('thisWeek');
        const lastWeek = document.getElementById('lastWeek');
        const thisMonth = document.getElementById('thisMonth');
        const lastMonth = document.getElementById('lastMonth');
        
        if (thisWeek) {
            thisWeek.addEventListener('click', () => {
                const [start, end] = Utils.getThisWeekRange();
                UIManager.setDateRangeAndRefresh(start, end);
            });
        }
        if (lastWeek) {
            lastWeek.addEventListener('click', () => {
                const [start, end] = Utils.getLastWeekRange();
                UIManager.setDateRangeAndRefresh(start, end);
            });
        }
        if (thisMonth) {
            thisMonth.addEventListener('click', () => {
                const [start, end] = Utils.getThisMonthRange();
                UIManager.setDateRangeAndRefresh(start, end);
            });
        }
        if (lastMonth) {
            lastMonth.addEventListener('click', () => {
                const [start, end] = Utils.getLastMonthRange();
                UIManager.setDateRangeAndRefresh(start, end);
            });
        }

        // 绑定其他按钮事件
        // 注意：refreshEvents 的点击事件已经通过 JSX onClick 属性绑定，无需重复绑定

        const generateReport = document.getElementById('generateReport');
        if (generateReport) {
            generateReport.addEventListener('click', () => {
                if (window.DataManager && window.DataManager.onGenerateReport) {
                    window.DataManager.onGenerateReport();
                }
            });
        }

        const exportData = document.getElementById('exportData');
        if (exportData) {
            exportData.addEventListener('click', () => {
                if (window.DataManager && window.DataManager.exportData) {
                    window.DataManager.exportData();
                }
            });
        }

        const copyReport = document.getElementById('copyReport');
        if (copyReport) {
            copyReport.addEventListener('click', () => {
                if (window.DataManager && window.DataManager.copyReport) {
                    window.DataManager.copyReport();
                }
            });
        }

        // 注意：selectAll 的点击事件已经通过 JSX onClick 属性绑定，无需重复绑定

        // 筛选和分页事件绑定
        const pageSizeFilter = document.getElementById('pageSizeFilter');

        if (pageSizeFilter) {
            pageSizeFilter.addEventListener('change', () => {
                if (window.DataManager) {
                    window.DataManager.currentPage = 1; // 重置到第一页
                    window.DataManager.applyFiltersAndPagination();
                }
            });
        }

        // 注意：clearFilters 的点击事件已经通过 JSX onClick 属性绑定，无需重复绑定

        // 分页按钮事件
        const firstPage = document.getElementById('firstPage');
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        const lastPage = document.getElementById('lastPage');

        if (firstPage) {
            firstPage.addEventListener('click', () => {
                if (window.DataManager) {
                    window.DataManager.currentPage = 1;
                    window.DataManager.applyFiltersAndPagination();
                }
            });
        }

        if (prevPage) {
            prevPage.addEventListener('click', () => {
                if (window.DataManager && window.DataManager.currentPage > 1) {
                    window.DataManager.currentPage--;
                    window.DataManager.applyFiltersAndPagination();
                }
            });
        }

        if (nextPage) {
            nextPage.addEventListener('click', () => {
                if (window.DataManager && window.DataManager.currentPage < window.DataManager.totalPages) {
                    window.DataManager.currentPage++;
                    window.DataManager.applyFiltersAndPagination();
                }
            });
        }

        if (lastPage) {
            lastPage.addEventListener('click', () => {
                if (window.DataManager) {
                    window.DataManager.currentPage = window.DataManager.totalPages;
                    window.DataManager.applyFiltersAndPagination();
                }
            });
        }
    },

    // 日期范围管理
    setDateRange: (startDate, endDate) => {
        try {
            const startDateElement = document.getElementById('startDate');
            const endDateElement = document.getElementById('endDate');
            
            if (!startDateElement || !endDateElement) {
                console.error('日期输入框元素未找到');
                return;
            }
            
            startDateElement.value = startDate;
            endDateElement.value = endDate;
            UIManager.updateDateRange();
        } catch (error) {
            console.error('设置日期范围失败:', error);
        }
    },

    setDateRangeAndRefresh: async (startDate, endDate) => {
        try {
            // 先设置日期范围
            UIManager.setDateRange(startDate, endDate);
            
            // 然后刷新事件数据
            await UIManager.loadEvents();
        } catch (error) {
            console.error('设置日期范围并刷新数据失败:', error);
            UIManager.showNotification('刷新数据失败，请重试', 'error');
        }
    },

    updateDateRange: () => {
        try {
            const startDateElement = document.getElementById('startDate');
            const endDateElement = document.getElementById('endDate');
            const dateRangeElement = document.getElementById('dateRange');
            
            if (!startDateElement || !endDateElement || !dateRangeElement) {
                console.error('日期相关元素未找到');
                return;
            }
            
            // 更新UIManager对象中的日期值
            UIManager.currentStartDate = startDateElement.value;
            UIManager.currentEndDate = endDateElement.value;
            
            // 更新显示文本
            const dateRangeText = `${UIManager.currentStartDate} 至 ${UIManager.currentEndDate}`;
            dateRangeElement.textContent = dateRangeText;
        } catch (error) {
            console.error('更新日期范围显示失败:', error);
        }
    },

    // 表格排序事件绑定
    bindTableSortEvents: () => {
        try {
            // 常量定义
            const HOVER_BG_COLOR = 'var(--hover-bg, #f8f8f8)';
            const TIME_HEADER_ID = 'timeHeader';
            const TIME_SORT_FIELD = 'created_at';
            
            /**
             * 为表头元素添加悬停效果
             * @param {HTMLElement} element - 表头元素
             */
            const addHoverEffect = (element) => {
                element.addEventListener('mouseenter', () => {
                    element.style.backgroundColor = HOVER_BG_COLOR;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.backgroundColor = '';
                });
            };
            
            /**
             * 为表头元素添加排序点击事件
             * @param {HTMLElement} element - 表头元素
             * @param {string} sortField - 排序字段名
             */
            const addSortClickEvent = (element, sortField) => {
                element.addEventListener('click', () => {
                    if (window.DataManager && typeof window.DataManager.sortEvents === 'function') {
                        window.DataManager.sortEvents(sortField);
                    } else {
                        console.warn('排序功能不可用: DataManager.sortEvents 方法未找到');
                    }
                });
            };
            
            // 绑定所有带有 data-sort 属性的表头
            const sortableHeaders = document.querySelectorAll('[data-sort]');
            if (sortableHeaders.length === 0) {
                console.warn('未找到可排序的表头元素');
                return;
            }
            
            sortableHeaders.forEach(header => {
                const sortField = header.getAttribute('data-sort');
                if (sortField) {
                    addSortClickEvent(header, sortField);
                    addHoverEffect(header);
                } else {
                    console.warn('表头元素缺少 data-sort 属性值:', header);
                }
            });
            
            // 特殊处理时间列（如果存在且未被上面的逻辑处理）
            const timeHeader = document.getElementById(TIME_HEADER_ID);
            if (timeHeader && !timeHeader.hasAttribute('data-sort')) {
                addSortClickEvent(timeHeader, TIME_SORT_FIELD);
                addHoverEffect(timeHeader);
            }
            
            console.log(`已绑定 ${sortableHeaders.length} 个可排序表头的事件`);
        } catch (error) {
            console.error('绑定表格排序事件失败:', error);
        }
    },

    // 设置面板
    createSettingsPanel: () => {
        // 创建设置面板组件
        const settingsPanelElement = createElement(SettingsPanel, {
            onClose: () => {
                UIManager.settingsPanel.style.display = 'none';
            },
            onSave: () => {
                UIManager.saveSettings();
            },
            onReset: () => {
                UIManager.resetSettings();
            },
            userBalance: UIManager.userBalance,
            tokenUsage: UIManager.lastTokenUsage
        });
        
        // 设置初始显示状态
        settingsPanelElement.style.display = 'none';
        
        UIManager.settingsPanel = settingsPanelElement;
        document.body.appendChild(UIManager.settingsPanel);

        // 绑定设置面板事件
        UIManager.bindSettingsEvents();
    },

    bindSettingsEvents: () => {
        const closeSettingsPanel = document.getElementById('closeSettingsPanel');
        if (closeSettingsPanel) {
            closeSettingsPanel.addEventListener('click', () => {
                UIManager.settingsPanel.style.display = 'none';
            });
        }

        const saveSettings = document.getElementById('saveSettings');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => {
                UIManager.saveSettings();
            });
        }

        const resetSettings = document.getElementById('resetSettings');
        if (resetSettings) {
            resetSettings.addEventListener('click', () => {
                UIManager.resetSettings();
            });
        }

        const maxTokens = document.getElementById('maxTokens');
        if (maxTokens) {
            Utils.validateTokenInput(maxTokens, UIManager.showNotification);
        }

        const themeMode = document.getElementById('themeMode');
        if (themeMode) {
            themeMode.addEventListener('change', () => {
                UIManager.updateTheme();
            });
        }
    },

    toggleSettingsPanel: () => {
        if (!UIManager.settingsPanel) {
            UIManager.createSettingsPanel();
        }
        
        if (UIManager.settingsPanel.style.display === 'none') {
            UIManager.settingsPanel.style.display = 'block';
            UIManager.fetchAndShowBalance();
        } else {
            UIManager.settingsPanel.style.display = 'none';
        }
    },

    saveSettings: () => {
        const config = {
            THEME_MODE: document.getElementById('themeMode').value,
            GITLAB_URL: document.getElementById('gitlabUrl').value.trim(),
            ACCESS_TOKEN: document.getElementById('accessToken').value.trim(),
            DEEPSEEK_BASE_URL: document.getElementById('deepseekUrl').value.trim(),
            DEEPSEEK_API_KEY: document.getElementById('deepseekKey').value.trim(),
            DEEPSEEK_MODEL: document.getElementById('deepseekModel').value,
            MAX_TOKENS: parseInt(document.getElementById('maxTokens').value, 10)
        };

        CONFIG.save(config);
        UIManager.updateTheme();
        UIManager.showNotification('设置已保存', 'success');
        
        // 更新按钮状态
        if (window.DataManager && window.DataManager.updateButtons) {
            window.DataManager.updateButtons();
        }
    },

    resetSettings: () => {
        CONFIG.reset();
        const config = CONFIG.get();
        
        document.getElementById('themeMode').value = config.THEME_MODE;
        document.getElementById('gitlabUrl').value = config.GITLAB_URL;
        document.getElementById('accessToken').value = config.ACCESS_TOKEN;
        document.getElementById('deepseekUrl').value = config.DEEPSEEK_BASE_URL;
        document.getElementById('deepseekKey').value = config.DEEPSEEK_API_KEY;
        document.getElementById('deepseekModel').value = config.DEEPSEEK_MODEL;
        document.getElementById('maxTokens').value = config.MAX_TOKENS;
        
        UIManager.updateTheme();
        UIManager.showNotification('设置已重置', 'info');
        
        // 更新按钮状态
        if (window.DataManager && window.DataManager.updateButtons) {
            window.DataManager.updateButtons();
        }
    },

    // 加载事件数据
    loadEvents: async () => {
        try {
            const config = CONFIG.get();
            const configErrors = Utils.validateConfig(config);
            
            if (configErrors.length > 0) {
                UIManager.showNotification(`配置不完整：${configErrors.join('、')}`, 'warning');
                return;
            }

            UIManager.showNotification('正在加载数据...', 'info');
            
            // 构建时间范围
            const startDate = `${UIManager.currentStartDate}T00:00:00.000Z`;
            const endDate = `${UIManager.currentEndDate}T23:59:59.999Z`;
            
            const events = await API.getEvents(
                startDate,
                endDate,
                config,
                '' // targetType 参数，空字符串表示获取所有类型
            );
            
            UIManager.eventsData = events || [];
            
            // 更新DataManager中的数据
            if (window.DataManager) {
                window.DataManager.allEvents = UIManager.eventsData;
                window.DataManager.filteredEvents = [...UIManager.eventsData];
                window.DataManager.currentPage = 1;
                window.DataManager.applyFiltersAndPagination();
            }
            
            UIManager.showNotification(`加载完成，共 ${UIManager.eventsData.length} 条记录`, 'success');
        } catch (error) {
            console.error('加载事件失败:', error);
            UIManager.showNotification('加载数据失败，请检查网络连接和配置', 'error');
        }
    },

    // 性能优化：添加清理方法
    cleanup: () => {
        // 清除所有定时器
        if (UIManager._animationFrameId) {
            cancelAnimationFrame(UIManager._animationFrameId);
            UIManager._animationFrameId = null;
        }

        // 清理通知管理器
        notificationManager.destroy();

        // 清除DOM缓存
        UIManager.clearDOMCache();
    }
};

// 性能优化：添加窗口大小变化监听（防抖）
UIManager.handleResize = debounce(() => {
    UIManager.clearDOMCache();
}, 250);

// 性能优化：监听窗口大小变化
if (typeof window !== 'undefined') {
    window.addEventListener('resize', UIManager.handleResize, { passive: true });

    // 页面卸载时清理资源
    window.addEventListener('beforeunload', UIManager.cleanup, { passive: true });
}

export default UIManager;