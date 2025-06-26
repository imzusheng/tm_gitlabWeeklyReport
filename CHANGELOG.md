# [1.1.0](https://github.com/imzusheng/tm_gitlabWeeklyReport/compare/v1.0.1...v1.1.0) (2025-06-26)


### Features

* **SettingsPanel:** 移除固定高度以改进布局灵活性 ([83aa120](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/83aa12005f3a98ba41499b944d55a72063c846b6))

## [1.0.1](https://github.com/imzusheng/tm_gitlabWeeklyReport/compare/v1.0.0...v1.0.1) (2025-06-26)


### Bug Fixes

* **userscript:** 更新匹配规则以包含dashboard下的所有页面 ([d837648](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/d837648c07a15b659a98ef1abd0cba934cc5115a))

# 1.0.0 (2025-06-26)


### Features

* **AIPanel:** 添加数据概览面板显示选中事件数和日期范围 ([4729a0a](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/4729a0a971541ccf367e0fbfa02639f8f41fc693))
* **EventsList:** 重构事件显示逻辑并优化UI ([4ca0bc0](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/4ca0bc09b1a6ab7dccbd47cc5acf40dad3933a96))
* **events:** 添加目标类型列并优化全选功能 ([d3d1cce](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/d3d1cce8e43ae844eee88e3a5380613de0d6370d))
* **theme:** 实现主题配置持久化并简化排序逻辑 ([b3d1adf](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/b3d1adfb5fce01d31ebe27e60722e070f6ae43c6))
* **version:** 添加自动版本更新脚本及相关npm命令 ([0a19d34](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/0a19d348413eca40b9cd9458c7fe9545397673a4))
* 实现CSS模块化并优化构建配置 ([bf4a9c4](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/bf4a9c497b7191c9bee2f4a947d5cfa60f9e5f6b))
* 实现用户会话管理及事件选择功能 ([ed4567e](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/ed4567e19abfa1451b0cebbe4b6d7f3edeb6d922))
* 实现语义化发布和自动化版本管理 ([90e88f5](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/90e88f5daf2d1ff9765516d3d12d0f18e2e5b31e))
* **时间范围:** 添加本周选项并优化时间范围逻辑 ([b93d84e](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/b93d84e35058b4212c533688737993f260ac4c9c))
* **样式:** 优化UI组件样式并添加Epic功能文档 ([9c168d1](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/9c168d161f1f853a07c729178caa217c08da5931))
* **样式:** 更新主题变量和组件样式以支持深色模式 ([cb7b5c1](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/cb7b5c17a280dabb781bd87e692fdd3c1c066575))
* 添加CSS变量支持并重构主题系统 ([3ebad52](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/3ebad525e0f015383d30eaf7bf613e61dfbe1967))
* **请求:** 添加可取消请求功能避免竞态条件 ([805f3d3](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/805f3d33085761784fdaedf2e4bfd6084f18a77d))
* 重构项目以支持油猴脚本环境 ([3de7aa5](https://github.com/imzusheng/tm_gitlabWeeklyReport/commit/3de7aa5f5b7495677d6c8b1bf4412a713836cca2))

# 更新日志

本项目的所有重要变更都将记录在此文件中。

版本格式遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [未发布]

### 新增
- 实现语义化发布和约定式提交
- 添加自动化版本管理
- 添加提交信息检查工具 commitlint
- 添加 Git hooks 管理工具 husky

### 变更
- 从手动版本管理迁移到语义化发布
- 更新 CI/CD 流程使用语义化发布

### 移除
- 移除手动版本更新脚本
- 移除手动构建和部署工作流

## [1.1.0] - 之前版本

### 功能特性
- GitLab 周报生成器
- Tampermonkey 用户脚本支持
- Web 版本支持
- DeepSeek AI 集成
- 现代化 React UI 界面
