import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * 初始化并渲染 React 应用
 */
function initApp() {
  // 创建应用容器
  const container = document.createElement('div');
  container.id = 'tm-root';
  container.className = 'tm-root';
  
  // 添加到页面
  document.body.appendChild(container);
  
  // 渲染 React 应用
  const root = createRoot(container);
  root.render(<App />);
  
  console.log('GitLab Weekly Report Generator initialized');
}

/**
 * 油猴脚本入口
 * 等待页面加载完成后初始化应用
 */
function main() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

// 导出主函数供油猴脚本调用
export { main };

// 如果直接运行（开发环境），立即执行
if (typeof window !== 'undefined' && !window.GM_info) {
  main();
}