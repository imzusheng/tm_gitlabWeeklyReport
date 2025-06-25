# 版本更新脚本

这个脚本用于自动更新项目中的版本号，遵循语义化版本控制 (Semantic Versioning) 规范。

## 功能特性

- ✅ 自动更新 `package.json` 中的版本号
- ✅ 自动更新 `vite.config.ts` 中 userscript 的版本号
- ✅ 自动更新已构建的 userscript 文件中的版本号
- ✅ 支持语义化版本控制 (MAJOR.MINOR.PATCH)
- ✅ 提供友好的命令行界面和错误处理

## 使用方法

### 直接使用脚本

```bash
# 查看帮助信息
node scripts/update-version.cjs --help

# 更新修订版本号 (1.0.0 → 1.0.1)
node scripts/update-version.cjs patch

# 更新次版本号 (1.0.0 → 1.1.0)
node scripts/update-version.cjs minor

# 更新主版本号 (1.0.0 → 2.0.0)
node scripts/update-version.cjs major
```

### 使用 npm 脚本

```bash
# 仅更新版本号
npm run version:patch   # 更新修订版本
npm run version:minor   # 更新次版本
npm run version:major   # 更新主版本

# 更新版本号并构建项目
npm run build:patch    # 更新修订版本并构建
npm run build:minor    # 更新次版本并构建
npm run build:major    # 更新主版本并构建
npm run build          # 默认更新修订版本并构建
```

## 版本号规范

本项目遵循 [语义化版本控制](https://semver.org/lang/zh-CN/) 规范：

- **主版本号 (MAJOR)**：当你做了不兼容的 API 修改
- **次版本号 (MINOR)**：当你做了向下兼容的功能性新增
- **修订版本号 (PATCH)**：当你做了向下兼容的问题修正

## 脚本工作流程

1. 读取 `package.json` 中的当前版本号
2. 根据指定的版本类型计算新版本号
3. 更新 `package.json` 中的版本号
4. 更新 `vite.config.ts` 中 userscript 头部的版本号
5. 如果存在已构建的 userscript 文件，同时更新其版本号
6. 输出更新结果和提示信息

## 注意事项

- 脚本会自动验证版本号格式的有效性
- 如果当前版本号格式不正确，脚本会报错并退出
- 更新版本号后，建议运行 `npm run build` 重新构建项目
- 脚本使用 CommonJS 格式 (`.cjs` 扩展名) 以兼容项目的 ES 模块配置

## 错误处理

脚本包含完善的错误处理机制：

- 无效的版本类型参数
- 文件读取/写入错误
- 版本号格式验证
- 正则表达式匹配失败

所有错误都会显示友好的错误信息并正确退出。