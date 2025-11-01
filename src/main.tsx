import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { applyCSSVariables, getThemeVariables } from '@/styles/variables'
import './index.less'

// 获取:root元素（html元素），确保CSS变量全局可用
const rootElement = document.documentElement

// 应用CSS变量到:root元素
applyCSSVariables(rootElement, getThemeVariables('system'))

// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleThemeChange = () => {
  applyCSSVariables(rootElement, getThemeVariables('system'))
}
mediaQuery.addEventListener('change', handleThemeChange)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
