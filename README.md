# GitLab 周报生成器

## 📋 项目概述

这是一个基于 **DeepSeek AI** 的现代化 **Tampermonkey 脚本**，用于自动生成 GitLab 工作周报。项目采用 **TypeScript + React** 架构，支持两种运行模式：油猴插件模式和 Web 网页模式。

## 项目交互
1. 仿照 MacOS 的 UI 和 交互设计
2. 主面板 Gitlab Events 为上下两部分, 上半部分为筛选条件, 下半部分为事件列表， 带分页器和排序及筛选
- 筛选条件:
  - 时间范围: 默认最近7天, 可选择最近30天, 最近90天, 最近180天, 最近365天
  - 事件类型: 默认全部, 可选择 Merge Request, Issue, Commit, Comment, 等
  - 事件状态: 默认全部, 可选择 Open, Closed, Merged, 等
  - 事件标签: 默认全部, 可选择特定标签
3. 设置面板， 通过主面板的设置按钮打开, 设置面板包含以下内容:
  - Gitlab 项目地址: 输入 Gitlab 项目地址, 用于获取 Gitlab 事件数据
  - Gitlab 个人访问令牌: 输入 Gitlab 个人访问令牌, 用于获取 Gitlab 事件数据
  - DeepSeek API Key: 输入 DeepSeek API Key, 用于生成 AI 周报
  - 默认提示词: 输入默认提示词, 用于生成 AI 周报
  - token 数量限制
  - 使用的模型
4. AI 面板, 通过主面板的 AI 按钮打开, 包含以下内容:
  - 提示词: 输入增强提示词
  - 生成按钮: 点击后生成 AI 周报
  - 生成结果: 显示 AI 周报生成结果， 可以一键复制
  - 显示本次使用 token 数量
  - 重新生成按钮: 点击后重新生成 AI 周报

## 🏗️ 技术架构

### 核心技术栈
- **前端框架**: React latest + TypeScript latest
- **构建工具**: Vite latest
- **样式处理**: Less
- **代码规范**: ESLint + Prettier + Stylelint
- **运行环境**: Node.js latest

### 项目结构

```
src/
├── components/           # React 组件
├── hooks/               # 自定义 React Hooks
├── services/            # API 服务层
│   ├── deepseek-api.ts  # DeepSeek AI API
│   └── gitlab-api.ts    # GitLab API
├── types/               # TypeScript 类型定义
├── constants/           # 常量定义
├── utils/               # 工具函数
├── App.tsx              # 主应用组件
└── main.ts              # 应用入口
└── index.html           # web 应用入口, 用于开发时预览. 油猴环境不需要
```

## 🔧 架构设计特点

### 1. 状态管理架构
- 采用 **React Context + useReducer** 模式
- 分离关注点：配置状态、UI状态、事件数据状态
- 支持持久化存储（localStorage/GM_setValue）

### 2. 组件化设计
- **业务组件**：专注特定功能的复合组件
- **UI组件**：可复用的基础组件
- 每个组件包含 `.tsx` + `.less`

### 3. 服务层设计
- **GitLab API 服务**：处理 GitLab 数据获取
- **DeepSeek API 服务**：处理 AI 周报生成
- 统一错误处理和重试机制

### 4. 环境适配
- **双模式支持**：Tampermonkey 脚本模式 + Web 应用模式
- **环境适配器**：统一处理不同环境的 API 调用和存储

## 🚀 构建流程

### 开发模式
- `npm run dev` - Web 应用开发模式
- 支持热重载和实时预览

### 生产构建
- `npm run build:userscript` - 构建油猴脚本
- `npm run build:web` - 构建 Web 应用
- 自动代码压缩和优化

### 代码质量
- **ESLint**: TypeScript + React 规则
- **Prettier**: 代码格式化
- **Stylelint**: Less 样式规范
- **Husky**: Git hooks 自动检查

## 🎯 核心功能模块

### 1. 数据获取模块
- GitLab API 集成
- 事件数据筛选和分页
- 智能缓存机制

### 2. AI 生成模块
- DeepSeek API 集成
- 自定义提示词支持 + 默认提示词
- Token 使用量统计

### 3. UI 交互模块
- 响应式设计
- 主题切换（明暗模式）
- 数据导出功能

