import React, { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number; // 自动消失时间（毫秒），0 表示不自动消失
  onClose?: () => void;
  className?: string;
}

/**
 * 通知组件
 * 支持不同类型的通知和自动消失功能
 */
export const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  duration = 3000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose?.();
        }, 300); // 等待动画完成
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <div
      className={`tm-notification tm-notification--${type} ${
        isVisible ? 'tm-notification--visible' : 'tm-notification--hidden'
      } ${className}`}
    >
      <div className="tm-notification__icon">
        {getIcon()}
      </div>
      <div className="tm-notification__content">
        {message}
      </div>
      <button
        className="tm-notification__close"
        onClick={handleClose}
        aria-label="关闭通知"
      >
        ×
      </button>
    </div>
  );
};