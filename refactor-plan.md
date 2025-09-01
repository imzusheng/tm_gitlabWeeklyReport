# GitLab 周报生成器样式隔离重构方案

## 📋 项目概述

本文档详细描述了从 Shadow DOM 方案迁移到**命名空间 + 作用域 CSS**的重构方案，旨在解决油猴脚本模式下的样式冲突问题，同时保持代码的可维护性。

## 🚫 当前问题分析

### Shadow DOM 方案的问题

1. **样式同步困难** - CSS 变量、全局样式需要手动维护同步
2. **构建复杂性** - 需要特殊的 CSS 注入机制
3. **调试困难** - 样式问题难以定位和调试
4. **维护成本高** - 双套样式系统，容易出现不一致

### 全局样式污染的根本原因

1. **过多全局样式** - `src/index.less` 包含大量全局选择器
2. **CSS 变量全局定义** - `:root` 变量可能与宿主页面冲突
3. **元素选择器污染** - `button`, `a`, `*` 等选择器影响宿主页面
4. **缺乏作用域限制** - 样式没有被限制在应用容器内

## ✅ 解决方案：命名空间 + 作用域 CSS

### 核心思路

1. **移除 Shadow DOM** - 回归普通 DOM 结构
2. **添加命名空间容器** - 所有应用内容包装在带前缀的容器中
3. **作用域化全局样式** - 将全局样式限制在命名空间内
4. **保持 CSS Modules** - 组件级样式保持现有模块化结构

## 🏗️ 详细重构方案

### 1. 文件结构调整

```
src/
├── styles/                    # 样式目录
│   ├── scope.less            # 作用域样式入口（使用 @import url(...)）
│   ├── reset.less            # 重置样式（作用域内）
│   ├── base.less             # 基础元素样式（作用域内）
│   ├── animations.less       # 动画定义（作用域内）
│   └── css-variables.ts      # 主题 CSS 变量（JS 注入，替代 variables.less）
├── components/               # 组件目录
├── userscript.ts            # 移除 Shadow DOM（采用 iframe 嵌入）
├── index.less               # 简化为作用域入口
└── App.module.less          # 移除全局样式
```

### 2. 核心文件重构

#### 2.1 创建 `src/styles/scope.less`

```less
// GitLab 周报生成器样式作用域
.gitlab-weekly-report-scope {
  // 引入所有作用域化的样式（遵循 stylelint import-notation）
  @import url('./reset.less');
  @import url('./base.less');
  @import url('./animations.less');

  // 确保容器样式
  position: relative;
  isolation: isolate;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  // 所有后续样式都在这个作用域内生效
}
```

#### 2.2 主题 CSS 变量（JS 注入）

本项目不再使用 variables.less，而是通过 TypeScript 将主题变量以 CSS Variables 形式注入到根节点，便于在油猴脚本与 Web/iframe 模式下统一管理与切换。

```ts
// src/styles/css-variables.ts 中已定义主题变量与工具方法
import { applyCSSVariables, getThemeVariables } from '@/styles/css-variables'

// 在 Web/iframe 根节点注入（见 src/main.tsx）
const root = document.getElementById('root')!
applyCSSVariables(root, getThemeVariables('system'))

// 监听系统主题变化（深色/浅色跟随系统）
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    applyCSSVariables(root, getThemeVariables('system'))
  })
```

说明：所有组件中使用的 CSS 变量统一使用 --gwrs- 前缀，例如 var(--gwrs-bg-primary)、var(--gwrs-text-primary) 等。

#### 2.3 重构 `src/styles/reset.less`

```less
// 重置样式 - 作用域化
.gitlab-weekly-report-scope {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  // 防止继承宿主页面的样式
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: var(--gwrs-text-primary);
  background-color: var(--gwrs-bg-primary);
}
```

#### 2.4 重构 `src/styles/base.less`

```less
// 基础元素样式 - 作用域化
.gitlab-weekly-report-scope {
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--gwrs-btn-bg);
    color: var(--gwrs-btn-text);
    cursor: pointer;
    transition: border-color 0.25s;
    outline: none !important;

    &:hover {
      border-color: var(--gwrs-color-primary);
    }
  }

  a {
    font-weight: 500;
    color: var(--gwrs-color-primary);
    text-decoration: inherit;
    transition: color 0.2s ease;

    &:hover {
      color: var(--gwrs-color-primary-hover);
    }
  }

  input,
  select,
  textarea {
    font-family: inherit;
    border: 1px solid var(--gwrs-input-border);
    background-color: var(--gwrs-input-bg);
    color: var(--gwrs-text-primary);

    &:focus {
      outline: none;
      border-color: var(--gwrs-input-focus-border);
      box-shadow: 0 0 0 2px var(--gwrs-input-focus-shadow);
    }
  }

  // 滚动条样式
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--gwrs-scrollbar-thumb);
    border-radius: 4px;

    &:hover {
      background: var(--gwrs-scrollbar-thumb-hover);
    }
  }
}
```

#### 2.5 重构 `src/styles/animations.less`

```less
// 动画定义 - 作用域化
.gitlab-weekly-report-scope {
  @keyframes gwrs-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes gwrs-slide-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gwrs-slide-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gwrs-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // 工具类
  .gwrs-fade-in {
    animation: gwrs-fade-in 0.3s ease-out;
  }

  .gwrs-slide-in-up {
    animation: gwrs-slide-in-up 0.3s ease-out;
  }

  .gwrs-slide-in-down {
    animation: gwrs-slide-in-down 0.3s ease-out;
  }
}
```

### 3. 组件样式重构

#### 3.1 更新所有 CSS 变量引用

将所有组件中的 CSS 变量添加前缀：

```less
// 修改前（历史代码示例，存在变量命名冲突风险）
.main-panel {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

// 修改后（统一使用 --gwrs- 前缀）
.main-panel {
  background: var(--gwrs-bg-primary);
  color: var(--gwrs-text-primary);
  border: 1px solid var(--gwrs-border-primary);
}
```

#### 3.2 CSS Modules 配置优化

```typescript
// vite.config.ts 中的 CSS Modules 配置
css: {
  modules: {
    localsConvention: 'camelCase',
    generateScopedName: 'gwrs-[name]__[local]__[hash:base64:5]', // 添加前缀
    hashPrefix: 'gitlab-weekly-report',
  },
}
```

### 4. 入口文件重构

#### 4.1 重构 `src/userscript.ts`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import type { Root } from 'react-dom/client'
import { USERSCRIPT_CONFIG } from '@/constants'
// 引入作用域样式
import '@/styles/scope.less'

let reactRoot: Root | null = null
let containerElement: HTMLElement | null = null

// 创建应用容器
const createAppContainer = (): HTMLElement => {
  const container = document.createElement('div')
  container.id = USERSCRIPT_CONFIG.CONTAINER_ID
  container.className = 'gitlab-weekly-report-scope' // 关键：添加作用域类名

  // 容器样式
  container.style.cssText = `
    position: fixed;
    top: 60px;
    left: 60px;
    right: 60px;
    bottom: 60px;
    z-index: 999999;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    display: none;
    overflow: hidden;
    isolation: isolate;
  `

  return container
}

// 创建触发按钮
const createTriggerButton = (): HTMLElement => {
  const button = document.createElement('div')
  button.id = USERSCRIPT_CONFIG.TRIGGER_BUTTON.ID
  button.innerHTML = USERSCRIPT_CONFIG.TRIGGER_BUTTON.ICON

  // 按钮样式（不需要作用域，因为是独立元素）
  button.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 50px;
    width: 50px;
    height: 50px;
    background: #1976d2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999998;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    font-size: 20px;
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `

  return button
}

// 创建遮罩层
const createOverlay = (): HTMLElement => {
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999997;
    display: none;
  `
  return overlay
}

// 初始化油猴脚本
const initUserscript = () => {
  // 检查是否已经注入过
  if (document.getElementById(USERSCRIPT_CONFIG.CONTAINER_ID)) {
    return
  }

  // 创建元素
  const triggerButton = createTriggerButton()
  const overlay = createOverlay()
  containerElement = createAppContainer()

  // 显示/隐藏面板的函数
  const togglePanel = () => {
    const isVisible = containerElement!.style.display !== 'none'
    if (isVisible) {
      containerElement!.style.display = 'none'
      overlay.style.display = 'none'
      triggerButton.style.transform = 'scale(1)'
    } else {
      containerElement!.style.display = 'block'
      overlay.style.display = 'block'
      triggerButton.style.transform = 'scale(0.9)'
    }
  }

  // 绑定事件
  triggerButton.addEventListener('click', togglePanel)
  overlay.addEventListener('click', togglePanel)

  // 添加元素到页面
  document.body.appendChild(triggerButton)
  document.body.appendChild(overlay)
  document.body.appendChild(containerElement)

  // 渲染 React 应用
  reactRoot = ReactDOM.createRoot(containerElement)
  reactRoot.render(React.createElement(App, { isUserscript: true }))
}

// 其余代码保持不变...
```

#### 4.2 重构 `src/App.tsx`

```typescript
import React from 'react'
import { useAppState } from '@/hooks/useAppState'
// 移除 App.module.less 中的全局样式，只保留组件样式
import styles from './App.module.less'

interface AppProps {
  isUserscript?: boolean
}

export default function App({ isUserscript = false }: AppProps) {
  const { state } = useAppState()

  return (
    <div
      className={`${styles.app} ${isUserscript ? styles.userscriptMode : styles.webMode}`}
      // 不再需要手动添加作用域类名，因为容器已经有了
    >
      {/* 应用内容 */}
    </div>
  )
}
```

### 5. 构建配置优化

#### 5.1 更新 `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ mode }) => {
  const isUserscript = mode === 'userscript'

  return {
    plugins: isUserscript
      ? [
          react(),
          // 简化的 CSS 注入，因为不再需要 Shadow DOM
          cssInjectedByJsPlugin({
            topExecutionPriority: false,
          }),
          userscriptPlugin(),
        ]
      : [react()],

    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: 'gwrs-[name]__[local]__[hash:base64:5]', // 添加前缀
        hashPrefix: 'gitlab-weekly-report',
      },
    },

    // 其余配置保持不变...
  }
})
```

### 6. 迁移清单

#### 6.1 删除的文件/内容

- [ ] 删除 Shadow DOM 相关代码
- [ ] 清理手动复制的 CSS 变量
- [ ] 移除复杂的样式注入逻辑

#### 6.2 新增的文件

- [x] `src/styles/scope.less` - 作用域样式入口
- [x] `src/styles/reset.less` - 重置样式
- [x] `src/styles/base.less` - 基础元素样式
- [x] `src/styles/animations.less` - 动画定义
- [x] `src/styles/css-variables.ts` - 主题 CSS 变量（JS 注入，替代 variables.less）

#### 6.3 修改的文件

- [x] `src/userscript.ts` - 移除 Shadow DOM；采用 iframe 嵌入，作用域类由 iframe 内根节点承担
- [x] `src/index.less` - 简化为作用域样式引入
- [x] `src/App.module.less` - 移除全局样式（滚动条与通用动画/工具类已清理）
- [x] `vite.config.ts` - 更新 CSS Modules 配置
- [x] 所有 `*.module.less` 文件 - CSS 变量统一使用 --gwrs- 前缀（若发现遗留请继续修正）

## 🎯 重构优势

### 1. 维护性

- ✅ **单一样式系统** - 不再需要维护双套样式
- ✅ **自动同步** - 所有样式变更自动生效
- ✅ **调试友好** - 正常的 CSS 调试体验

### 2. 性能

- ✅ **更小体积** - 移除重复的样式代码
- ✅ **更快加载** - 简化的样式注入机制
- ✅ **更好兼容** - 无需特殊的浏览器支持

### 3. 开发体验

- ✅ **简化构建** - 移除复杂的 Shadow DOM 配置
- ✅ **热重载友好** - 样式修改即时生效
- ✅ **IDE 支持** - 完整的 CSS IntelliSense 支持

### 4. 隔离效果

- ✅ **命名空间隔离** - 通过前缀避免冲突
- ✅ **作用域限制** - 样式只在容器内生效
- ✅ **CSS Modules** - 组件级样式自动隔离

## 📝 实施步骤

### 第一阶段：样式系统重构（2-3小时）

1. 创建新的样式目录结构
2. 重构全局样式为作用域样式
3. 更新 CSS 变量命名和引用
4. 配置构建系统

### 第二阶段：组件迁移（1-2小时）

1. 更新所有组件的 CSS 变量引用
2. 测试组件样式的正确性
3. 修复任何样式问题

### 第三阶段：入口重构（1小时）

1. 重构 userscript.ts 移除 Shadow DOM
2. 更新 App.tsx 移除全局样式
3. 测试油猴脚本和 Web 应用模式

### 第四阶段：测试和优化（1小时）

1. 测试样式隔离效果
2. 验证主题切换功能
3. 检查不同浏览器兼容性
4. 性能测试和优化

## 🔍 验证标准

### 样式隔离测试

- [ ] 在复杂的 GitLab 页面中不影响宿主样式
- [ ] 宿主页面样式不影响应用显示
- [ ] 主题切换功能正常工作
- [ ] 所有组件样式显示正确

### 开发体验测试

- [ ] 样式修改热重载正常
- [ ] CSS 调试工具正常工作
- [ ] 构建速度无明显影响
- [ ] IDE 自动补全正常

### 兼容性测试

- [ ] Chrome/Firefox/Safari/Edge 正常工作
- [ ] 不同版本的 GitLab 页面正常工作
- [ ] 移动端响应式正常
- [ ] 高分辨率屏幕显示正常

## 📚 最佳实践

### CSS 变量命名规范

- 使用 `--gwrs-` 前缀避免冲突
- 语义化命名，如 `--gwrs-bg-primary` 而不是 `--gwrs-color1`
- 保持与设计系统一致的命名

### 作用域样式组织

- 按功能模块组织样式文件
- 避免在作用域内使用过深的嵌套
- 保持样式的可复用性

### 构建优化

- 使用 CSS Modules 的 hash 优化缓存
- 合理配置样式压缩和优化
- 监控打包体积的变化

---

**总结**：这个重构方案通过命名空间和作用域限制，既解决了样式冲突问题，又保持了代码的可维护性。相比 Shadow DOM 方案，它更简单、更可靠、更易于维护。
