import React from 'react';
import { APP_VERSION } from '../../utils/constants';
import './header.css';

interface HeaderProps {
  onSettingsClick: () => void;
  onClose?: () => void;
  className?: string;
}

/**
 * 面板头部组件
 * 显示标题、版本信息和设置按钮
 */
export const Header: React.FC<HeaderProps> = ({
  onSettingsClick,
  onClose,
  className = '',
}) => {
  return (
    <div className={`tm-panel-header ${className}`}>
      <div className="tm-panel-header__content">
        <div className="tm-panel-header__left">
          <div className="tm-panel-header__title">
            <span className="tm-panel-header__icon">📊</span>
            <span className="tm-panel-header__text">GitLab 周报生成器</span>
          </div>
          <div className="tm-panel-header__version">
            v{APP_VERSION}
          </div>
        </div>
        
        <div className="tm-panel-header__right">
          <button
            onClick={onSettingsClick}
            className="tm-panel-header__settings"
            title="打开设置"
          >
            ⚙️ 设置
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="tm-panel-header__close"
              title="关闭面板"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};