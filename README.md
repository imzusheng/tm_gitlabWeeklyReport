# GitLab 周报生成器

> 使用 React + TypeScript + Rollup 的现代化 Tampermonkey 脚本

一个智能的 GitLab 周报生成工具，帮助开发者快速生成专业的工作周报。通过集成 AI 技术，自动分析 GitLab 活动并生成结构化的周报内容。

## ✨ 特性

- 🚀 **现代化技术栈**：基于 React + TypeScript + Rollup 构建
- 🤖 **AI 智能生成**：集成 DeepSeek API，智能分析和总结工作内容
- 📊 **数据可视化**：直观展示工作统计和进度
- 🎨 **美观界面**：现代化 UI 设计，支持主题切换
- ⚡ **高性能**：优化的构建流程和运行时性能
- 🔧 **易于配置**：动态配置系统，支持个性化定制

## 📦 安装使用

### 前置要求

- 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
- Node.js 16+ (仅开发时需要)

### 安装脚本

1. 下载最新版本的 `dist/index.user.js` 文件
2. 在 Tampermonkey 中导入或直接复制粘贴脚本内容
3. 访问配置的目标网站即可使用

### 开发环境

```bash
# 克隆项目
git clone <repository-url>
cd tm_ts_weekly_report_trae

# 安装依赖
npm install

# 开发模式（自动监听文件变化）
npm run dev

# 生产构建
npm run build

# 生产优化构建
npm run build:prod
```

## 🛠️ 开发指南

### 项目结构

```
tm_ts_weekly_report_trae/
├── src/
│   ├── components/          # React 组件
│   │   ├── EventsTable/    # 事件表格组件
│   │   ├── Panel/          # 主面板组件
│   │   ├── Settings/       # 设置组件
│   │   └── common/         # 通用组件
│   ├── hooks/              # React Hooks
│   ├── services/           # API 服务
│   │   ├── gitlab.ts       # GitLab API
│   │   └── deepseek.ts     # DeepSeek AI API
│   ├── styles/             # 样式文件
│   │   └── index.css       # 主样式文件
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   │   ├── constants.ts    # 常量定义
│   │   └── storage.ts      # 本地存储
│   ├── App.tsx             # 主应用组件
│   └── index.tsx           # 入口文件
├── scripts/
│   └── update-version.cjs  # 版本更新脚本
├── dist/                   # 构建输出目录
├── package.json
├── rollup.config.js        # Rollup 配置
├── tsconfig.json          # TypeScript 配置
├── userscript.config.js   # 油猴脚本配置
└── README.md
```

### 可用脚本

```bash
# 开发相关
npm run dev              # 开发模式
npm run build            # 构建项目
npm run build:prod       # 生产构建
npm run prebuild         # 预构建配置文件

# 代码质量
npm run lint             # 代码检查
npm run lint:fix         # 自动修复代码问题
npm run type-check       # 类型检查

# 版本管理
npm run version          # 交互式版本更新
npm run version:patch    # 补丁版本更新
npm run version:minor    # 次版本更新
npm run version:major    # 主版本更新
npm run release          # 发布版本
```

### 脚本工具说明

#### 版本更新脚本 (update-version.cjs)

这个脚本用于自动更新项目的版本号，包括更新以下文件：

- `package.json`
- `package-lock.json`
- `CHANGELOG.md`

##### 使用方法

可以通过以下npm脚本命令使用：

```bash
# 默认更新补丁版本号 (x.x.X)
npm run version

# 更新补丁版本号 (x.x.X)
npm run version:patch

# 更新次要版本号 (x.Y.0)
npm run version:minor

# 更新主要版本号 (X.0.0)
npm run version:major
```

也可以直接运行脚本：

```bash
node scripts/update-version.cjs [patch|minor|major]
```

##### 版本号规则

版本号遵循语义化版本规范 (Semantic Versioning)：

- **主要版本号 (MAJOR)**：当你做了不兼容的API修改
- **次要版本号 (MINOR)**：当你添加了向下兼容的新功能
- **补丁版本号 (PATCH)**：当你做了向下兼容的问题修正

##### 自动更新内容

1. **package.json**: 更新版本号
2. **package-lock.json**: 更新版本号
3. **CHANGELOG.md**: 添加新版本的更新记录，包括：
   - 版本号
   - 更新日期（自动获取当前日期）
   - 根据版本类型自动生成基础的更新说明

##### 注意事项

- 脚本会自动根据版本类型生成基础的更新说明，但建议在运行脚本后手动编辑CHANGELOG.md，添加更详细的更新内容
- 更新版本后，记得运行 `npm run build` 来构建新版本

## ⚙️ 油猴脚本配置

本项目使用JavaScript配置文件来管理油猴脚本的元数据，所有配置都集中在根目录的 `userscript.config.js` 文件中。

### 配置文件位置

```
userscript.config.js
```

### 配置项说明

#### userscript.config.js 配置项

| 配置项 | 类型 | 说明 | 当前值 |
|--------|------|------|--------|
| `name` | string | 脚本名称 | `GitLab 周报生成器` |
| `namespace` | string | 命名空间 | `http://tampermonkey.net/` |
| `description` | string | 脚本描述 | `GitLab 周报生成器 - 使用 React + TypeScript + Rollup 的现代化 Tampermonkey 脚本` |
| `author` | string | 作者 | `Trae AI` |
| `match` | string | 匹配的网站URL | `https://www.lejuhub.com/*` |
| `grants` | string[] | 权限列表 | `["GM_xmlhttpRequest", "GM_setValue", "GM_getValue", "GM_deleteValue"]` |
| `requires` | string[] | 依赖库列表 | `[]` |
| `icon` | string | 脚本图标URL | `""` |
| `homepage` | string | 主页URL | `""` |
| `supportURL` | string | 支持页面URL | `""` |
| `updateURL` | string | 更新检查URL | `""` |
| `downloadURL` | string | 下载URL | `""` |
| `connect` | string[] | 允许连接的域名 | `[]` |
| `noframes` | boolean | 是否在框架中运行 | `false` |
| `unwrap` | boolean | 是否解包 | `false` |
| `run-at` | string | 运行时机 | `"document-end"` |

### 如何修改配置

#### 1. 修改匹配网站

如果需要在不同的网站上运行脚本，修改 `match` 字段：

```json
{
  "match": "https://your-website.com/*"
}
```

#### 2. 添加权限

如果脚本需要额外的权限，在 `grants` 数组中添加：

```json
{
  "grants": [
    "GM_xmlhttpRequest",
    "GM_setValue",
    "GM_getValue",
    "GM_deleteValue",
    "GM_notification",
    "GM_openInTab"
  ]
}
```

#### 3. 添加外部依赖

如果需要引入外部库，在 `requires` 数组中添加：

```json
{
  "requires": [
    "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
  ]
}
```

#### 4. 设置脚本图标

```json
{
  "icon": "https://your-domain.com/icon.png"
}
```

#### 5. 配置连接域名

如果脚本需要连接外部API，在 `connect` 数组中添加：

```json
{
  "connect": [
    "api.example.com",
    "*.googleapis.com"
  ]
}
```

### 构建流程

当你修改配置后，需要重新构建项目：

```bash
# 开发模式（自动监听文件变化）
npm run dev

# 生产构建
npm run build

# 生产优化构建
npm run build:prod
```

### 构建原理

1. **读取配置**：Rollup构建时直接读取 `userscript.config.js` 文件
2. **生成头部**：使用 `rollup-plugin-banner2` 插件和自定义函数生成油猴脚本头部
3. **最终输出**：生成的 `dist/index.user.js` 文件包含了JavaScript配置的元数据

### 注意事项

1. **修改配置后必须重新构建**：配置修改后需要运行构建命令才能生效
2. **JavaScript格式**：配置文件必须是有效的JavaScript格式，注意语法正确性
3. **match 模式**：支持通配符，如 `https://*.example.com/*`
4. **权限安全**：只添加脚本实际需要的权限，避免过度授权
5. **版本管理**：版本号会自动从 `package.json` 中读取，无需手动修改

### 常见配置示例

#### 多网站匹配

```json
{
  "match": "https://*.gitlab.com/*"
}
```

#### 完整配置示例

```javascript
export const userscriptConfig = {
  name: "我的油猴脚本",
  namespace: "http://tampermonkey.net/",
  description: "一个功能强大的油猴脚本",
  author: "Your Name",
  match: "https://example.com/*",
  grants: [
    "GM_xmlhttpRequest",
    "GM_setValue",
    "GM_getValue",
    "GM_notification"
  ],
  requires: [
    "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
  ],
  connect: [
    "api.example.com",
    "*.googleapis.com"
  ],
  icon: "https://example.com/icon.png",
  homepage: "https://github.com/username/repo",
  supportURL: "https://github.com/username/repo/issues",
  "run-at": "document-end",
  noframes: false,
  unwrap: false
};
```

**注意**：如需匹配多个不同域名，可以考虑使用更宽泛的匹配模式，或在脚本内部进行URL判断。单个 `match` 字段不支持数组格式。

## 🔧 技术栈

- **前端框架**：React 18
- **类型系统**：TypeScript 5
- **构建工具**：Rollup 4
- **样式处理**：PostCSS
- **代码规范**：ESLint + TypeScript ESLint
- **版本管理**：Standard Version
- **AI 服务**：DeepSeek API

## 📝 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循 ESLint 代码规范
- 使用 TypeScript 进行类型检查
- 编写清晰的注释和文档
- 每次升级版本都要更新 CHANGELOG
- 注意代码性能和可读性

## 📄 许可证

本项目采用 ISC 许可证 - 详见 [LICENSE](./LICENSE) 文件

## 🙏 致谢

- [Tampermonkey](https://www.tampermonkey.net/) - 强大的用户脚本管理器
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Rollup](https://rollupjs.org/) - 模块打包器
- [DeepSeek](https://www.deepseek.com/) - AI 服务提供商