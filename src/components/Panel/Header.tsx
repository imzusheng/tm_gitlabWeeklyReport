import React from 'react';
import { Button } from '../common';
import { APP_VERSION } from '../../utils/constants';

interface HeaderProps {
  onSettingsClick: () => void;
  className?: string;
}

/**
 * 面板头部组件
 * 显示标题、版本信息和设置按钮
 */
export const Header: React.FC<HeaderProps> = ({
  onSettingsClick,
  className = '',
}) => {
  return (
    <div className={`tm-panel-header ${className}`}>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="tm-panel-header__settings"
        >
          ⚙️ 设置
        </Button>
      </div>
    </div>
  );
};