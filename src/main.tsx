import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { applyCSSVariables, getThemeVariables } from '@/styles/css-variables'
import { USERSCRIPT_CONFIG } from '@/constants'
import './index.less'

// 获取根元素
const rootElement = document.getElementById('root')!

// 为 Web 模式根容器添加作用域类名，确保作用域样式生效
if (!rootElement.classList.contains(USERSCRIPT_CONFIG.SCOPE_CLASS)) {
  rootElement.classList.add(USERSCRIPT_CONFIG.SCOPE_CLASS)
}

// 应用CSS变量到根元素
applyCSSVariables(rootElement, getThemeVariables('system'))

// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleThemeChange = () => {
  applyCSSVariables(rootElement, getThemeVariables('system'))
}
mediaQuery.addEventListener('change', handleThemeChange)

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
