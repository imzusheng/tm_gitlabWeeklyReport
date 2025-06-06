import React, { useEffect } from 'react';
import { MainPanel } from './components/Panel';
import { useTheme } from './hooks';
import './styles/index.css';

interface AppProps {
  onClose?: () => void;
}

/**
 * 主应用组件
 * 负责初始化应用和渲染主界面
 */
const App: React.FC<AppProps> = ({ onClose }) => {
  const { themeMode, currentTheme, applyTheme } = useTheme();

  // 应用主题到 DOM
  useEffect(() => {
    applyTheme();
  }, [currentTheme, applyTheme]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // 如果点击的是背景区域（不是面板内容），则关闭面板
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="tm-app" onClick={handleBackdropClick}>
      <MainPanel onClose={onClose} />
    </div>
  );
};

export default App;