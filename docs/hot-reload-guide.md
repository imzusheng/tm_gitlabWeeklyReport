# GitLab 周报工具 - 热更新开发指南

## 概述

本项目已集成热更新功能，支持在 Web 开发模式下实时预览代码修改效果，同时确保开发的功能能够无缝构建为油猴脚本版本。

## 热更新功能

### 技术实现

- **rollup-plugin-serve**: 提供本地开发服务器
- **rollup-plugin-livereload**: 实现文件变化监听和页面自动刷新
- **端口配置**: Web 开发服务器运行在 `localhost:3004`，livereload 服务运行在端口 `35729`

### 开发模式启动

```bash
# 启动 Web 开发模式（带热更新）
npm run dev:web

# 启动油猴脚本开发模式
npm run dev:userscript
```

### 热更新特性

1. **自动文件监听**: 监听 `src/` 目录下的所有源文件变化
2. **实时编译**: 文件修改后自动重新编译
3. **页面自动刷新**: 编译完成后浏览器页面自动刷新
4. **开发提示**: 控制台显示热更新状态信息

## 版本兼容性

### 双模式支持

项目支持两种构建模式，确保开发和生产环境的一致性：

#### Web 模式
- **入口文件**: `src/web-entry.js`
- **构建配置**: `rollup.config.web.js`
- **输出文件**: `dist/gitlab-weekly-report.web.js` + `dist/index.html`
- **特性**: 全屏显示，直接初始化界面

#### 油猴脚本模式
- **入口文件**: `src/main.js`
- **构建配置**: `rollup.config.js`
- **输出文件**: `dist/gitlab-weekly-report.user.js`
- **特性**: 按钮触发，油猴脚本头部信息

### 共享代码架构

两种模式共享核心业务逻辑：

```
src/
├── core/                 # 核心功能模块
│   ├── ui-manager.js    # UI 管理器
│   └── data-manager.js  # 数据管理器
├── utils/               # 工具函数
├── components/          # UI 组件
├── main.js             # 油猴脚本入口
└── web-entry.js        # Web 模式入口
```

## 开发工作流

### 1. Web 开发模式

```bash
# 启动开发服务器
npm run dev:web

# 浏览器自动打开 http://localhost:3004/index.html
# 修改 src/ 目录下的文件，页面会自动刷新
```

### 2. 功能测试

```bash
# 构建油猴脚本版本
npm run build:userscript

# 构建 Web 版本
npm run build:web

# 构建所有版本
npm run build
```

### 3. 兼容性验证

- Web 开发的功能会自动兼容油猴脚本版本
- 共享的核心模块确保功能一致性
- 不同入口文件处理各自的初始化逻辑

## 配置说明

### Web 开发配置 (rollup.config.web.js)

```javascript
// 热更新插件配置
process.env.ROLLUP_WATCH && livereload({
  watch: 'dist',        // 监听构建输出目录
  verbose: false,       // 静默模式
  port: 35729          // livereload 端口
})

// 开发服务器配置
process.env.ROLLUP_WATCH && serve({
  open: true,
  openPage: '/index.html',
  contentBase: ['dist', '.'],
  host: 'localhost',
  port: 3004,
  // ... 其他配置
})
```

### HTML 模板热更新支持

```html
<!-- 仅在开发模式下注入 livereload 脚本 -->
${process.env.ROLLUP_WATCH ? '<script src="http://localhost:35729/livereload.js?snipver=1"></script>' : ''}
```

## 注意事项

1. **端口冲突**: 确保 3004 和 35729 端口未被占用
2. **文件监听**: 热更新仅监听 `dist/` 目录，源文件修改会触发重新编译
3. **浏览器缓存**: 如遇到更新不及时，可尝试硬刷新 (Ctrl+F5)
4. **开发环境**: 热更新功能仅在开发模式 (`NODE_ENV=development`) 下启用

## 故障排除

### 热更新不工作

1. 检查控制台是否有错误信息
2. 确认 livereload 脚本是否正确加载
3. 验证端口 35729 是否可访问

### 页面不自动刷新

1. 检查浏览器开发者工具网络面板
2. 确认 WebSocket 连接是否建立
3. 尝试手动刷新页面

### 构建失败

1. 检查语法错误
2. 运行 `npm run lint:check` 检查代码规范
3. 查看构建日志中的具体错误信息

## 最佳实践

1. **开发流程**: 使用 Web 模式进行快速开发和调试
2. **功能验证**: 定期构建油猴脚本版本进行兼容性测试
3. **代码共享**: 将业务逻辑放在共享模块中，避免重复代码
4. **环境变量**: 使用环境变量区分开发和生产环境的行为

通过这套热更新开发环境，可以大大提高开发效率，同时确保最终产品的质量和兼容性。