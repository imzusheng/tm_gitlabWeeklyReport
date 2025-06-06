import React, { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * 模态框组件
 * 支持不同尺寸和自定义内容
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
}) => {
  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="tm-modal-overlay" onClick={onClose}>
      <div
        className={`tm-modal tm-modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="tm-modal__header">
            <h3 className="tm-modal__title">{title}</h3>
            <button
              className="tm-modal__close"
              onClick={onClose}
              aria-label="关闭"
            >
              ×
            </button>
          </div>
        )}
        <div className="tm-modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};