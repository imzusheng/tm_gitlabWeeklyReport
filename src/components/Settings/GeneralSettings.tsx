import React from 'react';
import { useTheme } from '../../hooks';
import type { ThemeMode } from '../../types';
import './generalsettings.css';

interface GeneralSettingsProps {
  className?: string;
}

/**
 * 通用设置组件
 * 用于配置主题等通用选项
 */
export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ className = '' }) => {
  const { themeMode, setTheme } = useTheme();
  
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as ThemeMode);
  };

  const themeOptions = [
    { value: 'light', label: '浅色主题' },
    { value: 'dark', label: '深色主题' },
    { value: 'auto', label: '跟随系统' },
  ];

  return (
    <div className={`tm-general-settings ${className}`}>
      <div className="tm-settings-section">
        <h3 className="tm-settings-section__title">
          <span className="tm-settings-section__icon">⚙️</span>
          界面设置
        </h3>
        
        <div className="tm-settings-section__content">
          <div className="tm-settings__item">
            <label className="tm-settings__label">
              主题模式
            </label>
            <select
              className="tm-settings__select"
              value={themeMode}
              onChange={handleThemeChange}
            >
              {themeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="tm-settings__help">
              选择界面主题模式
            </div>
          </div>
        </div>
      </div>

      <div className="tm-settings-section">
        <h3 className="tm-settings-section__title">
          <span className="tm-settings-section__icon">📊</span>
          数据设置
        </h3>
        
        <div className="tm-settings-section__content">
          <div className="tm-settings-info">
            <div className="tm-settings-info__item">
              <span className="tm-settings-info__label">数据存储：</span>
              <span className="tm-settings-info__value">本地存储 (LocalStorage)</span>
            </div>
            <div className="tm-settings-info__item">
              <span className="tm-settings-info__label">数据同步：</span>
              <span className="tm-settings-info__value">仅本地，不上传到服务器</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};