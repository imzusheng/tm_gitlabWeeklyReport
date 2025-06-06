import React, { useEffect } from 'react';
import { MainPanel } from './components/Panel';
import { useTheme } from './hooks';
import './styles/index.css';

/**
 * 主应用组件
 * 负责初始化应用和渲染主界面
 */
const App: React.FC = () => {
  const { themeMode, currentTheme, applyTheme } = useTheme();

  // 应用主题到 DOM
  useEffect(() => {
    applyTheme();
  }, [currentTheme, applyTheme]);

  return (
    <div className="tm-app">
      <MainPanel />
    </div>
  );
};

export default App;