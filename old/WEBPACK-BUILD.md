# Webpack 构建指南

## 概述

本项目使用Webpack将所有ES6模块打包为单个Tampermonkey脚本文件，支持现代化的模块开发和高效的构建流程。

## 快速开始

### 安装依赖
```bash
npm install
```

### 构建脚本
```bash
npm run build
```

### 使用构建结果
1. 复制 `dist/tampermonkey-script.user.js` 的内容
2. 在Tampermonkey中创建新脚本并粘贴
3. 保存并启用脚本

## 项目结构

```
tm/
├── src/                           # 源代码目录
│   ├── index.js                  # 应用入口和主要逻辑
│   ├── config.js                 # 配置管理和主题
│   ├── utils.js                  # 工具函数和数据处理
│   ├── api.js                    # GitLab和DeepSeek API
│   ├── ui.js                     # 基础UI组件
│   └── ui-panels.js              # 复杂UI面板
├── dist/                          # 构建输出
│   └── tampermonkey-script.user.js  # 打包结果（67KB）
├── webpack.config.js              # Webpack配置
├── package.json                   # 项目配置
└── node_modules/                  # 依赖包
```

## 构建命令详解

### `npm run build`
- 生产环境构建
- 代码未压缩，保持可读性
- 自动添加Tampermonkey头部信息
- 输出单个`.user.js`文件

### `npm run build:dev`
- 开发环境构建
- 包含额外的调试信息
- 构建速度更快

### `npm run watch`
- 文件监听模式
- 代码修改时自动重新构建
- 适合开发阶段使用

## 技术特性

### Webpack配置亮点
- **ES6模块支持**：完整的import/export语法
- **自动头部注入**：构建时自动添加Tampermonkey脚本头
- **循环依赖处理**：避免模块间的循环引用
- **单文件输出**：所有代码打包到一个文件中

### 模块架构
- **config.js**：配置管理、主题切换、本地存储
- **utils.js**：日期处理、数据验证、CSV导出
- **api.js**：GitLab数据获取、DeepSeek AI调用
- **ui.js**：基础UI、主题管理、通知系统
- **ui-panels.js**：面板组件、表单处理、设置界面
- **index.js**：应用入口、事件绑定、业务逻辑

## 开发工作流

### 1. 修改代码
```bash
# 编辑src/目录下的源文件
vim src/index.js
```

### 2. 实时构建
```bash
# 启动监听模式
npm run watch
```

### 3. 测试更新
1. 重新构建后，复制`dist/tampermonkey-script.user.js`内容
2. 在Tampermonkey中更新脚本
3. 刷新GitLab页面测试功能

### 4. 发布版本
```bash
# 生产构建
npm run build

# 检查输出文件
ls -la dist/
```

## 添加新功能

### 添加新模块
1. 在`src/`目录创建新的`.js`文件
2. 使用ES6 export导出功能
3. 在需要的地方import引入

### 修改UI界面
1. 编辑`src/ui-panels.js`添加新组件
2. 在`src/index.js`中绑定事件处理
3. 重新构建并测试

### 添加API功能
1. 在`src/api.js`中添加新的API调用
2. 更新`src/config.js`添加相关配置
3. 在主逻辑中集成新功能

## 调试技巧

### 开发环境调试
- 使用`npm run build:dev`获得带调试信息的版本
- 在浏览器开发者工具中查看控制台输出
- 使用`console.log`进行调试

### 生产环境问题
- 检查Tampermonkey是否正确加载脚本
- 确认GitLab页面匹配规则是否正确
- 验证API密钥和网络连接

## 常见问题

### 构建失败
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 脚本无法运行
1. 检查Tampermonkey是否启用
2. 确认脚本是否正确复制
3. 查看浏览器控制台错误信息

### 功能异常
1. 检查API配置是否正确
2. 确认网络连接和权限
3. 查看Tampermonkey脚本日志

## 性能指标

- **构建时间**：约2-3秒
- **输出大小**：67.5KB
- **模块数量**：6个ES6模块
- **依赖包**：3个开发依赖（webpack相关）

## 版本信息

- **Webpack版本**：5.89.0
- **Node.js要求**：v16+
- **脚本版本**：v1.3
- **兼容性**：现代浏览器（Chrome/Edge/Firefox） 

## 更新后的 Webpack 配置

```
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tampermonkey-script.user.js',
    clean: true,
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
          mangle: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: "> 0.5%, last 2 versions, not dead",
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
    ],
  },
  // ... 保留原有的 Tampermonkey 头部插件配置
}; 

# Webpack 构建脚本说明

以下是 `package.json` 中定义的 `scripts` 命令及其用途和适用场景：

## 构建相关
1. **`build`**  
   - **用途**: 执行代码检查并通过 Webpack 构建生产环境代码。  
   - **场景**: 用于正式发布前的构建，确保代码质量和优化。  
   - **命令**: `npm run lint:check && webpack --mode=production`

2. **`build:dev`**  
   - **用途**: 通过 Webpack 构建开发环境代码（未优化）。  
   - **场景**: 开发时快速构建，便于调试。  
   - **命令**: `webpack --mode=development`

3. **`build:release`**  
   - **用途**: 触发标准版本发布流程。  
   - **场景**: 发布新版本时使用。  
   - **命令**: `npm run release`

4. **`watch`**  
   - **用途**: 监听文件变化并自动重新构建开发环境代码。  
   - **场景**: 开发时实时预览修改效果。  
   - **命令**: `webpack --mode=development --watch`

## 代码检查
5. **`lint`**  
   - **用途**: 检查并自动修复代码风格问题。  
   - **场景**: 开发时确保代码风格一致。  
   - **命令**: `eslint src/ --fix`

6. **`lint:check`**  
   - **用途**: 仅检查代码风格问题（不自动修复）。  
   - **场景**: CI/CD 或构建前检查代码质量。  
   - **命令**: `eslint src/`

7. **`lint:md`**  
   - **用途**: 占位符命令，标记 Markdown 文件检查通过。  
   - **场景**: 预留用于未来扩展 Markdown 检查。  
   - **命令**: `echo '📝 Markdown 检查通过'`

## 发布相关
8. **`release`**  
   - **用途**: 执行标准版本发布流程（自动更新版本号和生成变更日志）。  
   - **场景**: 发布新版本时使用。  
   - **命令**: `standard-version`

9. **`release:minor`** / **`release:major`** / **`release:patch`**  
   - **用途**: 分别发布次要版本、主版本或补丁版本。  
   - **场景**: 根据语义化版本控制规则发布不同级别的更新。  
   - **命令**: `standard-version --release-as <minor|major|patch>`

10. **`release:prerelease`**  
    - **用途**: 发布预发布版本（如 `1.0.0-0`）。  
    - **场景**: 测试新功能或修复时使用。  
    - **命令**: `standard-version --prerelease`

11. **`release:dry`**  
    - **用途**: 模拟发布流程（不实际修改文件）。  
    - **场景**: 测试发布流程是否正常。  
    - **命令**: `standard-version --dry-run`

12. **`changelog`**  
    - **用途**: 生成符合 Angular 提交规范的变更日志。  
    - **场景**: 手动生成或更新变更日志文件。  
    - **命令**: `conventional-changelog -p angular -i CHANGELOG.md -s`

## 其他实用命令
13. **`version:check`**  
    - **用途**: 显示当前项目版本号。  
    - **场景**: 快速查看当前版本。  
    - **命令**: `echo "当前版本: $(node -p 'require(\"./package.json\").version')"`

14. **`dev`**  
    - **用途**: 启动开发模式（监听文件变化）。  
    - **场景**: 开发时使用。  
    - **命令**: `npm run watch`

15. **`start`**  
    - **用途**: 启动开发构建（不监听文件变化）。  
    - **场景**: 快速启动开发环境。  
    - **命令**: `npm run build:dev`

## 钩子与前置/后置任务
16. **`prebuild`**  
    - **用途**: 在构建前执行代码检查。  
    - **场景**: 确保构建前代码质量。  
    - **命令**: `npm run lint:check`

17. **`prerelease`**  
    - **用途**: 在发布前执行代码检查和构建。  
    - **场景**: 确保发布前代码质量和功能正常。  
    - **命令**: `npm run lint && npm run build`

18. **`postrelease`**  
    - **用途**: 发布完成后提示推送标签。  
    - **场景**: 提醒开发者完成发布流程。  
    - **命令**: `echo '🚀 发布完成！记得推送标签: git push --follow-tags'`

19. **`prepare`**  
    - **用途**: 安装 Git 钩子（通过 Husky）。  
    - **场景**: 初始化项目或安装依赖后设置钩子。  
    - **命令**: `husky install` 