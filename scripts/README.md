# 脚本说明

## semantic-version-update.cjs

这个脚本用于语义化发布过程中自动更新项目中的版本号，配合 semantic-release 使用。

### 功能特性

- ✅ 自动更新 `vite.config.ts` 中 userscript 的版本号
- ✅ 自动更新已构建的 userscript 文件中的版本号
- ✅ 支持语义化版本控制 (MAJOR.MINOR.PATCH)
- ✅ 与 semantic-release 集成，自动化版本管理

### 工作原理

该脚本在 semantic-release 的 `prepare` 阶段被调用，接收新版本号作为参数：

1. 读取传入的新版本号
2. 更新 `vite.config.ts` 中 userscript 头部的版本号
3. 如果存在已构建的 userscript 文件，同时更新其版本号
4. 输出更新结果

### 配置说明

脚本在 `.releaserc.json` 中的 `@semantic-release/exec` 插件中配置：

```json
{
  "plugins": [
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "node scripts/semantic-version-update.cjs ${nextRelease.version}"
      }
    ]
  ]
}
```

### 版本号规范

本项目遵循 [语义化版本控制](https://semver.org/lang/zh-CN/) 规范：

- **主版本号 (MAJOR)**：当你做了不兼容的 API 修改
- **次版本号 (MINOR)**：当你做了向下兼容的功能性新增
- **修订版本号 (PATCH)**：当你做了向下兼容的问题修正

### 自动化发布

版本更新完全自动化，通过以下方式触发：

1. 提交符合约定式提交规范的代码到 `v2` 分支
2. CI/CD 自动运行 semantic-release
3. 自动分析提交信息，确定版本号类型
4. 调用此脚本更新相关文件中的版本号
5. 自动创建 Git 标签和 GitHub 发布

### 注意事项

- 脚本会自动验证版本号格式的有效性
- 如果文件不存在或格式不正确，脚本会报错并退出
- 脚本使用 CommonJS 格式 (`.cjs` 扩展名) 以兼容项目的 ES 模块配置
- 不要手动调用此脚本，它应该只在 semantic-release 过程中被调用