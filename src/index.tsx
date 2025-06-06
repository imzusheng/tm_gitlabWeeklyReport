import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

let appContainer: HTMLElement | null = null;
let appRoot: any = null;
let isAppVisible = false;
let maskLayer: HTMLElement | null = null;
let triggerButton: HTMLElement | null = null;

/**
 * 创建遮罩层
 */
function createMaskLayer() {
  if (maskLayer) return;

  maskLayer = document.createElement('div');
  maskLayer.className = 'tm-mask';
  maskLayer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 9999;
    display: none;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
    will-change: opacity;
    pointer-events: none;
  `;

  // 遮罩层点击事件将在面板容器中处理

  document.body.appendChild(maskLayer);
}

/**
 * 显示遮罩层
 */
function showMaskLayer() {
  if (!maskLayer) {
    createMaskLayer();
  }

  // 防止页面滚动
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollBarWidth + 'px';

  requestAnimationFrame(() => {
    if (maskLayer) {
      maskLayer.style.display = 'block';
      requestAnimationFrame(() => {
        if (maskLayer) {
          maskLayer.style.opacity = '1';
        }
      });
    }
  });
}

/**
 * 隐藏遮罩层
 */
function hideMaskLayer() {
  if (!maskLayer) return;

  maskLayer.style.opacity = '0';
  setTimeout(() => {
    if (maskLayer) {
      maskLayer.style.display = 'none';
    }
    // 恢复页面滚动
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, 300);
}

/**
 * 创建触发按钮
 */
function createTriggerButton() {
  const button = document.createElement('button');
  button.innerHTML = '周报';
  button.className = 'ui-main-button';
  button.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 10000;
    background: #1890ff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
    transform: scale(1);
    will-change: transform, background-color, box-shadow;
  `;

  // 悬停效果
  button.addEventListener('mouseenter', () => {
    button.style.background = '#40a9ff';
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.background = '#1890ff';
    button.style.transform = 'scale(1)';
    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  });

  // 点击效果和切换面板
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = button.matches(':hover') ? 'scale(1.05)' : 'scale(1)';
    }, 100);
    togglePanel();
  });

  document.body.appendChild(button);
  triggerButton = button;
}

/**
 * 切换面板显示/隐藏
 */
function togglePanel() {
  if (isAppVisible) {
    hidePanel();
  } else {
    showPanel();
  }
}

/**
 * 显示面板
 */
function showPanel() {
  if (!appContainer) {
    // 创建应用容器
    appContainer = document.createElement('div');
    appContainer.id = 'tm-root';
    appContainer.className = 'tm-root';
    appContainer.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      width: 750px;
      height: calc(100vh - 80px);
      z-index: 10001;
      transform-origin: bottom right;
      opacity: 0;
      transform: scale(0.3) translateY(50px);
      transition: all 0.4s cubic-bezier(0.25, 0.10, 0.25, 1.00);
      will-change: transform, opacity;
    `;
    
    // 添加到页面
    document.body.appendChild(appContainer);
    
    // 渲染 React 应用
    appRoot = createRoot(appContainer);
    appRoot.render(<App onClose={hidePanel} />);
  }
  
  // 显示遮罩层
  showMaskLayer();
  
  if (appContainer) {
    appContainer.style.display = 'block';
    
    // 从按钮位置钻出的动画
    requestAnimationFrame(() => {
      if (appContainer) {
        appContainer.style.opacity = '1';
        appContainer.style.transform = 'scale(1) translateY(0)';
      }
    });
    
    isAppVisible = true;
  }
}

/**
 * 隐藏面板 - 收回到按钮的动画
 */
function hidePanel() {
  if (!appContainer || !triggerButton) {
    isAppVisible = false;
    return;
  }

  // 获取按钮和面板的位置信息
  const panelRect = appContainer.getBoundingClientRect();
  const buttonRect = triggerButton.getBoundingClientRect();

  // 创建克隆元素用于动画
  const clone = appContainer.cloneNode(true) as HTMLElement;
  clone.style.cssText = appContainer.style.cssText;
  clone.style.zIndex = '10002';
  clone.style.pointerEvents = 'none';
  clone.style.overflow = 'hidden';
  clone.style.willChange = 'transform, opacity, border-radius';
  clone.style.position = 'fixed';
  clone.style.width = `${panelRect.width}px`;
  clone.style.height = `${panelRect.height}px`;
  clone.style.left = `${panelRect.left}px`;
  clone.style.top = `${panelRect.top}px`;
  clone.style.transformOrigin = 'center';

  document.body.appendChild(clone);

  // 隐藏原面板和遮罩层
  appContainer.style.display = 'none';
  hideMaskLayer();

  // 计算动画参数
  const targetCenterX = buttonRect.left + buttonRect.width / 2;
  const targetCenterY = buttonRect.top + buttonRect.height / 2;
  const originCenterX = panelRect.left + panelRect.width / 2;
  const originCenterY = panelRect.top + panelRect.height / 2;

  const deltaX = targetCenterX - originCenterX;
  const deltaY = targetCenterY - originCenterY;

  const scaleX = buttonRect.width / panelRect.width;
  const scaleY = buttonRect.height / panelRect.height;
  const scale = Math.min(scaleX, scaleY);

  // 执行收回动画
  requestAnimationFrame(() => {
    const animation = clone.animate([
      {
        transform: 'translate(0px, 0px) scale(1)',
        opacity: '1',
        borderRadius: '12px'
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
        opacity: '0.3',
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
      if (appContainer) {
        appContainer.style.opacity = '0';
        appContainer.style.transform = 'scale(0.3) translateY(50px)';
      }

      // 按钮反馈动画
      if (triggerButton) {
        const buttonAnimation = triggerButton.animate([
          { transform: 'scale(1.2)' },
          { transform: 'scale(1)' }
        ], {
          duration: 150,
          easing: 'ease-out'
        });
      }
    };
  });

  isAppVisible = false;
}

/**
 * 初始化应用
 */
function initApp() {
  // 创建触发按钮
  createTriggerButton();
  
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

// 自动执行主函数
if (typeof window !== 'undefined') {
  main();
}