# Contributing Guide

## 开发流程

本项目使用语义化发布 (Semantic Release) 和约定式提交 (Conventional Commits) 来自动管理版本号和生成发布记录。

## 提交信息规范

### Conventional Commits 格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型 (type)

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响功能）
- **refactor**: 代码重构（既不是新功能也不是修复）
- **perf**: 性能优化
- **test**: 测试相关
- **build**: 构建系统或外部依赖变更
- **ci**: CI 配置文件和脚本变更
- **chore**: 其他不修改源码或测试的变更
- **revert**: 回滚之前的提交

### 版本号规则

- **MAJOR**: 破坏性变更 (BREAKING CHANGE)
- **MINOR**: 新功能 (feat)
- **PATCH**: 修复 (fix)

### 提交示例

```bash
# 新功能 (会增加 minor 版本)
git commit -m "feat: add weekly report export functionality"

# 修复 bug (会增加 patch 版本)
git commit -m "fix: resolve date parsing issue in report generation"

# 破坏性变更 (会增加 major 版本)
git commit -m "feat!: change API response format"
# 或者
git commit -m "feat: change API response format

BREAKING CHANGE: API response format changed from array to object"

# 文档更新 (不会触发版本发布)
git commit -m "docs: update installation instructions"

# 代码重构 (不会触发版本发布)
git commit -m "refactor: extract report generation logic"
```

## 开发工作流

1. **克隆仓库并安装依赖**
   ```bash
   git clone <repository-url>
   cd tm_gitlabWeeklyReport_v2
   npm install
   ```

2. **开发功能**
   ```bash
   npm run dev  # 启动开发服务器
   ```

3. **代码检查**
   ```bash
   npm run check  # 运行所有检查（lint + stylelint + type-check）
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```
   
   > 注意：提交时会自动运行 commitlint 检查提交信息格式

5. **推送到远程仓库**
   ```bash
   git push origin v2
   ```

6. **自动发布**
   - 当代码推送到 `v2` 分支时，CI/CD 会自动：
     - 运行测试和检查
     - 分析提交信息
     - 自动确定版本号
     - 生成 CHANGELOG
     - 创建 Git 标签
     - 发布 GitHub Release
     - 更新相关文件中的版本号

## 本地测试发布

在推送前，可以本地测试语义化发布：

```bash
# 干运行，查看会发布什么版本
npm run release:dry-run
```

## 手动发布

如果需要手动触发发布：

```bash
npm run release
```

## 注意事项

1. **提交信息必须符合 Conventional Commits 规范**，否则会被 commitlint 拒绝
2. **只有 `feat` 和 `fix` 类型的提交会触发版本发布**
3. **破坏性变更必须在提交信息中明确标注** (`!` 或 `BREAKING CHANGE:`)
4. **版本号完全由提交信息自动确定**，无需手动修改
5. **CHANGELOG.md 会自动生成和更新**

## 开发工作流

1. **克隆仓库并安装依赖**
   ```bash
   git clone https://github.com/imzusheng/tm_gitlabWeeklyReport.git
   cd tm_gitlabWeeklyReport
   npm install
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试**
   ```bash
   npm run dev      # 启动开发服务器
   npm run check    # 运行代码检查
   npm run build    # 构建项目
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **推送并创建 Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```