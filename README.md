# GitLab 周报生成器

> 使用 DeepSeek AI 的现代化 Tampermonkey 脚本

## ✨ 功能特性

- 🤖 **AI 驱动**: 使用 DeepSeek AI 智能生成周报
- 📊 **数据获取**: 自动从 GitLab API 获取提交记录
- 🎨 **现代 UI**: 优雅的用户界面设计
- 🌙 **主题切换**: 支持明暗主题和系统自动切换
- 📱 **响应式**: 适配不同屏幕尺寸
- ⚡ **高性能**: 优化的代码和动画性能

## 🚀 使用方法

### 1. 安装脚本
1. 安装 [Tampermonkey](https://tampermonkey.net/) 浏览器扩展
2. 点击 `dist/tampermonkey-script.user.js` 安装脚本

### 2. 配置
1. 在 GitLab 页面点击右下角的"周报"按钮
2. 点击设置按钮配置：
   - GitLab Access Token
   - GitLab API URL
   - DeepSeek API Key

### 3. 生成周报
1. 选择时间范围
2. 选择要包含的提交记录
3. 添加额外说明（可选）
4. 点击"生成周报"

## 🛠️ 开发

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建

项目使用 Rollup 作为构建工具，支持以下命令：

```bash
# 生产环境构建
npm run build

# 开发环境构建
npm run build:dev

# 监听模式构建（文件变化时自动重新构建）
npm run watch

# 开发模式（启动开发服务器 + 监听模式）
npm run dev
```

### 开发模式

运行 `npm run dev` 将启动开发服务器，可以通过以下地址访问：

- 预览页面: http://localhost:3000/preview.html
- 脚本文件: http://localhost:3000/dist/gitlab-weekly-report.user.js

### 构建特性

- ✅ ES6 模块支持
- ✅ CommonJS 模块转换
- ✅ CSS 处理和注入
- ✅ 生产环境代码压缩
- ✅ 开发服务器支持
- ✅ 自动添加 Tampermonkey 头部
- ✅ 热重载开发模式

### 代码检查
```bash
npm run lint
```

### 版本发布
```bash
npm run release
```

## 📦 构建系统

项目使用现代化的构建工具链：

- **ESLint**: 代码质量检查
- **Webpack**: 模块打包
- **Husky**: Git 钩子
- **Standard Version**: 自动版本管理
- **Conventional Changelog**: 自动生成更新日志

## 🔄 自动化流程

- ✅ **构建前检查**: 自动运行代码检查
- ✅ **提交前检查**: 通过 git hook 确保代码质量
- ✅ **版本管理**: 自动更新版本号和生成 changelog
- ✅ **语法验证**: 构建后验证 JavaScript 语法

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

## �� 许可证

ISC License
