# GitLab 周报生成器

> 基于 DeepSeek AI 的现代化 Tampermonkey 脚本，自动生成工作周报

## ✨ 功能特性

- 🤖 **AI 智能生成**: 集成 DeepSeek AI，根据 GitLab 活动记录智能生成周报
- 📊 **数据自动获取**: 通过 GitLab API 自动获取指定时间范围内的所有活动记录
- 🔍 **智能筛选**: 支持按事件类型、标题搜索等多维度筛选数据
- 📋 **数据管理**: 支持全选/取消全选、分页显示、排序等数据操作
- 📤 **多种导出**: 支持复制周报到剪贴板、导出 CSV 数据文件
- 🎨 **现代化 UI**: 采用 JSX 组件化架构，优雅的用户界面设计
- 🌙 **主题切换**: 支持明暗主题和系统自动切换
- 📱 **响应式设计**: 适配不同屏幕尺寸，移动端友好
- ⚡ **性能优化**: DOM 缓存、防抖处理、动画优化等多重性能优化
- 🔧 **配置管理**: 完整的设置面板，支持 GitLab 和 AI 配置管理

## 🚀 使用方法

### 1. 安装脚本
1. 安装 [Tampermonkey](https://tampermonkey.net/) 浏览器扩展
2. 点击 `dist/gitlab-weekly-report.user.js` 安装脚本
3. 访问配置的 GitLab 站点（默认：https://www.lejuhub.com）

### 2. 首次配置
1. 在 GitLab 页面点击右下角的"周报"按钮打开面板
2. 点击设置按钮（⚙️）进入配置页面
3. 配置必要信息：
   - **GitLab Access Token**: 用于访问 GitLab API 的令牌
   - **GitLab API URL**: GitLab API 地址（默认：https://www.lejuhub.com/api/v4）
   - **DeepSeek API Key**: 用于 AI 生成周报的 API 密钥
   - **DeepSeek 模型**: AI 模型选择（默认：deepseek-chat）
   - **系统提示词**: 自定义 AI 生成周报的风格和要求

### 3. 生成周报
1. **选择时间范围**: 使用快捷按钮（本周/上周/本月/上月）或手动选择日期
2. **获取数据**: 点击"刷新数据"按钮从 GitLab 获取活动记录
3. **筛选数据**: 
   - 按事件类型筛选（Push、Issue、MergeRequest 等）
   - 使用搜索框按标题筛选
   - 调整每页显示数量
4. **选择记录**: 勾选要包含在周报中的活动记录（支持全选）
5. **添加说明**: 在"附加说明"框中输入额外要求（可选）
6. **生成周报**: 点击"生成周报"按钮，AI 将自动生成周报内容
7. **导出结果**: 可以复制周报内容或导出原始数据为 CSV 文件

## 🛠️ 开发

### 技术栈

- **构建工具**: Rollup + Babel
- **UI 框架**: 自定义 JSX Runtime
- **样式处理**: Less + PostCSS
- **代码规范**: ESLint + Prettier
- **API 请求**: GM_xmlhttpRequest (Tampermonkey API)
- **存储**: LocalStorage
- **主题系统**: CSS 变量 + 系统主题检测

### 项目结构

```
src/
├── index.js          # 主入口文件，包含分页、筛选、排序逻辑
├── config.js         # 配置管理，包含默认设置和主题定义
├── api.js            # API 调用封装，GitLab 和 DeepSeek API
├── ui.js             # UI 核心功能，主题切换、通知系统
├── ui-panels.js      # 面板创建和事件绑定
├── utils.js          # 工具函数，日期处理、CSV 导出等
├── utils/
│   └── jsx-runtime.js    # 自定义 JSX 运行时
├── ai-panel.jsx      # AI 面板组件（左侧）
├── ai-panel.less     # AI 面板样式
├── data-panel.jsx    # 数据面板组件（右侧）
├── data-panel.less   # 数据面板样式

```

### 安装依赖
```bash
npm install
```

### 开发命令

```bash
# 开发模式（监听文件变化，自动重新构建）
npm run dev

# 生产环境构建
npm run build

# 代码检查
npm run lint:check

# 代码检查并自动修复
npm run lint:fix
```

### 构建特性

- ✅ **ES6 模块支持**: 使用 ES6 import/export 语法
- ✅ **JSX 支持**: 自定义 JSX Runtime，支持组件化开发
- ✅ **Less 预处理**: 支持 Less 样式预处理和模块化
- ✅ **代码压缩**: 生产环境自动压缩 JavaScript 代码
- ✅ **自动添加头部**: 自动添加 Tampermonkey 脚本头部信息
- ✅ **开发服务器**: 支持本地开发服务器和热重载
- ✅ **代码检查**: 集成 ESLint 进行代码质量检查
- ✅ **性能优化**: DOM 缓存、防抖处理等性能优化

## 📦 构建系统

项目使用现代化的构建工具链：

- **Rollup**: 模块打包和构建
- **Babel**: JavaScript 转译，支持 JSX 语法
- **PostCSS**: CSS 后处理，支持 Less 预处理
- **ESLint**: 代码质量检查和风格统一
- **Prettier**: 代码格式化
- **Husky**: Git 钩子管理
- **Terser**: 生产环境代码压缩

### 构建配置特点

- **模块化打包**: 将所有源文件打包为单个 IIFE 格式的用户脚本
- **样式内联**: CSS/Less 样式直接内联到 JavaScript 中
- **环境区分**: 支持开发和生产环境的不同构建配置
- **自动头部**: 自动添加 Tampermonkey 脚本元数据头部
- **热重载**: 开发模式支持文件监听和自动重新构建

## 🔄 自动化流程

- ✅ **构建前检查**: 自动运行 ESLint 代码检查
- ✅ **提交前检查**: 通过 Husky Git 钩子确保代码质量
- ✅ **代码格式化**: 自动修复代码风格问题
- ✅ **语法验证**: 构建后验证 JavaScript 语法正确性
- ✅ **依赖管理**: 自动处理模块依赖和打包优化

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

## �� 许可证

ISC License
