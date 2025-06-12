import { createElement } from '../utils/jsx-runtime.js';
import './notification.less';

/**
 * 通知组件
 * @param {Object} props - 组件属性
 * @param {string} props.message - 通知消息内容
 * @param {string} props.type - 通知类型：info, success, error, warning
 * @param {Function} props.onClose - 关闭回调函数
 * @param {boolean} props.visible - 是否显示
 */
export const Notification = ({ message, type = 'info', onClose, visible = false }) => {
    // 通知类型配置
    const typeConfig = {
        info: { color: '#007aff', bg: 'rgba(0, 122, 255, 0.1)', icon: 'ℹ️' },
        success: { color: '#30d158', bg: 'rgba(48, 209, 88, 0.1)', icon: '✅' },
        error: { color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.1)', icon: '❌' },
        warning: { color: '#ff9500', bg: 'rgba(255, 149, 0, 0.1)', icon: '⚠️' }
    };

    const config = typeConfig[type] || typeConfig.info;

    // 处理关闭按钮点击
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    // 处理关闭按钮悬停效果
    const handleCloseMouseEnter = (e) => {
        e.target.style.backgroundColor = `${config.color}20`;
    };

    const handleCloseMouseLeave = (e) => {
        e.target.style.backgroundColor = 'transparent';
    };

    if (!visible) {
        return null;
    }

    return (
        <div 
            className={`notification notification--${type} ${visible ? 'notification--visible' : ''}`}
            data-notification="true"
            style={{
                background: config.bg,
                borderColor: `${config.color}40`
            }}
        >
            <div className="notification__content">
                <span className="notification__icon">{config.icon}</span>
                <span className="notification__message">{message}</span>
            </div>
            <button 
                className="notification__close"
                onClick={handleClose}
                onMouseEnter={handleCloseMouseEnter}
                onMouseLeave={handleCloseMouseLeave}
                style={{ color: config.color }}
                aria-label="关闭通知"
            >
                ×
            </button>
        </div>
    );
};

/**
 * 通知管理器类
 * 用于管理通知的显示、隐藏和自动关闭
 */
export class NotificationManager {
    constructor(options = {}) {
        this.notifications = new Map();
        this.container = null;
        this.timers = new Map();
        this.queue = []; // 通知队列
        
        // 配置选项
        this.config = {
            maxVisible: options.maxVisible || 3, // 最大同时显示的通知数量
            position: options.position || 'top-center', // 通知位置
            spacing: options.spacing || 1, // 通知间距
            ...options
        };
    }

    /**
     * 初始化通知容器
     */
    init() {
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    /**
     * 显示通知
     * @param {string} message - 通知消息
     * @param {string} type - 通知类型
     * @param {number} duration - 显示时长（毫秒），0表示不自动关闭
     * @returns {string} 通知ID
     */
    show(message, type = 'info', duration = 5000) {
        this.init();

        const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const notificationData = { id, message, type, duration };
        
        // 如果当前显示的通知数量已达到最大值，将新通知加入队列
        if (this.notifications.size >= this.config.maxVisible) {
            this.queue.push(notificationData);
            return id;
        }
        
        // 直接显示通知
        this._showNotification(notificationData);
        
        return id;
    }
    
    /**
     * 内部方法：实际显示通知
     * @param {Object} notificationData - 通知数据
     */
    _showNotification({ id, message, type, duration }) {
        // 创建通知元素
        const notificationElement = createElement(Notification, {
            message,
            type,
            visible: true,
            onClose: () => this.hide(id)
        });

        // 先添加到容器以便获取实际尺寸
        this.container.appendChild(notificationElement);
        this.notifications.set(id, notificationElement);

        // 计算通知位置（避免重叠）
        this._updateNotificationPositions();

        // 设置动画
        requestAnimationFrame(() => {
            notificationElement.classList.add('notification--show');
        });

        // 设置自动关闭定时器
        if (duration > 0) {
            const timer = setTimeout(() => {
                this.hide(id);
            }, duration);
            this.timers.set(id, timer);
        }
    }

    /**
     * 隐藏指定通知
     * @param {string} id - 通知ID
     */
    hide(id) {
        const notification = this.notifications.get(id);
        if (!notification) {
            // 如果通知不在显示列表中，可能在队列中，从队列中移除
            this.queue = this.queue.filter(item => item.id !== id);
            return;
        }

        // 清除定时器
        const timer = this.timers.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(id);
        }

        // 添加隐藏动画
        notification.classList.add('notification--hide');

        // 延迟移除DOM元素
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications.delete(id);
            
            // 重新排列剩余通知
            this._rearrangeNotifications();
            
            // 处理队列中的下一个通知
            this._processQueue();
        }, 300);
    }
    
    /**
     * 更新所有通知的位置
     */
    _updateNotificationPositions() {
        // 使用 requestAnimationFrame 确保 DOM 已经渲染
        requestAnimationFrame(() => {
            let totalOffset = 0;
            let index = 0;
            
            this.notifications.forEach((notification) => {
                // 设置当前通知的位置
                notification.style.transform = `translateY(${totalOffset}px)`;
                notification.style.zIndex = 10004 - index;
                
                // 获取当前通知的实际高度
                const rect = notification.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(notification);
                const marginTop = parseFloat(computedStyle.marginTop) || 0;
                const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
                
                // 如果高度为0（可能还未渲染），使用默认高度
                const actualHeight = rect.height > 0 ? rect.height : 48; // 48px 作为默认最小高度
                
                // 计算下一个通知的偏移量
                totalOffset += actualHeight + marginTop + marginBottom + this.config.spacing;
                index++;
            });
        });
    }
    
    /**
     * 重新排列剩余通知的位置（兼容旧方法名）
     */
    _rearrangeNotifications() {
        this._updateNotificationPositions();
    }
    
    /**
     * 处理队列中的通知
     */
    _processQueue() {
        // 如果队列中有通知且当前显示数量未达到最大值，显示下一个通知
        if (this.queue.length > 0 && this.notifications.size < this.config.maxVisible) {
            const nextNotification = this.queue.shift();
            this._showNotification(nextNotification);
        }
    }

    /**
     * 清除所有通知
     */
    clearAll() {
        // 清除所有显示的通知
        this.notifications.forEach((notification, id) => {
            this.hide(id);
        });
        
        // 清空队列
        this.queue = [];
    }

    /**
     * 销毁通知管理器
     */
    destroy() {
        // 清除所有定时器
        this.timers.forEach(timer => clearTimeout(timer));
        
        // 清除所有通知元素
        this.notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
        
        // 移除容器
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        // 清空所有数据
        this.container = null;
        this.notifications.clear();
        this.timers.clear();
        this.queue = [];
    }
    
    /**
     * 更新配置
     * @param {Object} newConfig - 新的配置选项
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        // 如果最大显示数量减少了，需要处理多余的通知
        if (this.notifications.size > this.config.maxVisible) {
            const notificationsArray = Array.from(this.notifications.keys());
            const excessNotifications = notificationsArray.slice(this.config.maxVisible);
            
            excessNotifications.forEach(id => {
                const notification = this.notifications.get(id);
                const notificationData = {
                    id,
                    message: notification.querySelector('.notification__message').textContent,
                    type: notification.className.match(/notification--([a-z]+)/)?.[1] || 'info',
                    duration: 5000 // 默认时长
                };
                
                this.hide(id);
                this.queue.unshift(notificationData); // 添加到队列前面
            });
        }
        
        // 重新排列通知
        this._updateNotificationPositions();
    }
}

// 创建全局通知管理器实例
// 可以通过 notificationManager.updateConfig() 方法更新配置
export const notificationManager = new NotificationManager({
    maxVisible: 3, // 默认最多显示3条通知
    position: 'top-center', // 默认位置
    spacing: 1 // 默认间距
});

// 导出配置常量，方便外部使用
export const NOTIFICATION_POSITIONS = {
    TOP_CENTER: 'top-center',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
};

export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
};