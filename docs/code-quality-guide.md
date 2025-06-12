# 代码质量检测指南

本项目集成了多种代码质量检测工具，用于确保代码的健壮性和一致性。

## 使用方法

### 1. ESLint 代码规范检查
```bash
# 检查代码规范（只检查，不修复）
npm run lint:check

# 检查并自动修复代码规范问题
npm run lint:fix
```

### 2. 构建时自动检查
```bash
# 构建项目（自动包含 ESLint 修复和双重绑定检测）
npm run build
```

## 🛠️ 可用的检测工具

### 1. 双重事件绑定检测

```bash
# 检测双重事件绑定问题
npm run detect:bindings
```

这个工具会检测以下问题：
- JSX 文件中通过 `onClick` 绑定的按钮
- JS 文件中通过 `addEventListener` 绑定的相同按钮
- 报告潜在的双重绑定冲突

**功能说明：**
- 构建前自动执行 ESLint 修复
- 构建前自动检测双重事件绑定
- 确保发布的代码质量

## 🚨 常见问题及解决方案

### 双重事件绑定问题

**问题描述**：同一个按钮既在 JSX 中通过 `onClick` 绑定事件，又在 JS 文件中通过 `addEventListener` 绑定事件，导致事件被触发两次。

**检测示例**：
```jsx
// data-panel.jsx - JSX 绑定
<button id="openSettings" onClick={onOpenSettings}>设置</button>
```

```javascript
// ui-manager.js - JS 绑定（问题代码）
const openSettings = document.getElementById('openSettings');
openSettings.addEventListener('click', () => {
    UIManager.toggleSettingsPanel();
});
```

**修复方案**：
1. **优先使用 JSX 绑定**：保留 JSX 中的 `onClick` 属性
2. **移除 JS 绑定**：删除 JS 文件中的 `addEventListener` 调用
3. **统一绑定策略**：在同一个项目中保持一致的事件绑定方式

### ESLint 规范问题

**常见问题**：
- 未使用的变量
- 缺少分号
- 不一致的引号使用
- 不规范的缩进

**修复方案**：
```bash
# 自动修复大部分问题
npm run lint:fix

# 手动修复剩余问题
npm run lint:check
```

## 📋 集成到开发流程

### 1. 构建流程集成

项目的构建命令已经集成了检测：

```bash
npm run build  # 包含 lint:fix + detect:bindings + 构建
```

### 2. Git Hooks 集成

可以将检测工具集成到 Git hooks 中：

```json
// package.json
"husky": {
  "hooks": {
    "pre-commit": "node scripts/pre-commit-check.cjs",
    "commit-msg": "echo '✅ 提交信息检查通过'"
  }
}
```

### 3. CI/CD 集成

在 CI/CD 流水线中添加检测步骤：

```yaml
# .github/workflows/ci.yml
- name: Code Quality Check
  run: |
    npm run check:all
    node scripts/pre-commit-check.cjs
```

## 📋 开发工作流建议

### 日常开发
1. 编写代码时遵循 ESLint 规范
2. 避免在同一元素上混合使用 JSX `onClick` 和 `addEventListener`
3. 定期运行 `npm run lint:check` 进行代码规范检查

### 构建发布
1. 运行 `npm run build` 进行生产构建
2. 构建过程会自动执行 ESLint 修复和双重绑定检测
3. 只有通过所有检查的代码才能成功构建

## 🎯 最佳实践

### 事件绑定最佳实践

1. **优先级顺序**：
   - JSX `onClick` 属性（推荐）
   - `addEventListener`（仅在必要时使用）

2. **避免混合绑定**：
   - 同一个元素不要同时使用两种绑定方式
   - 在团队中统一绑定策略

3. **代码审查要点**：
   - 检查新增的事件绑定是否重复
   - 确认事件处理函数的逻辑正确性
   - 验证事件绑定的时机和生命周期

### 代码质量维护

1. **定期检查**：
   ```bash
   # 每日检查
   npm run check:all
   
   # 发布前检查
   node scripts/pre-commit-check.cjs
   ```

2. **持续改进**：
   - 根据检测结果优化代码结构
   - 更新检测规则以适应项目需求
   - 定期审查和更新最佳实践

3. **团队协作**：
   - 在代码审查中关注检测结果
   - 分享和讨论检测发现的问题
   - 建立团队代码质量标准

## 🔧 自定义检测规则

### 扩展双重绑定检测

可以在 `scripts/detect-duplicate-bindings.cjs` 中添加更多检测模式：

```javascript
// 添加新的检测模式
const customPatterns = [
    // 检测 jQuery 绑定
    /\$\s*\(\s*['"]#([^'"]+)['"]\s*\)[^;]*\.on\s*\(\s*['"]click['"]/g,
    // 检测其他事件绑定模式
    // ...
];
```

### 自定义 ESLint 规则

在 `eslint.config.js` 中添加项目特定的规则：

```javascript
export default [
    // 现有配置...
    {
        rules: {
            // 自定义规则
            'no-duplicate-event-binding': 'error',
            // ...
        }
    }
];
```

## 📊 检测报告示例

### 成功检测报告
```
🔍 开始扫描双重事件绑定...
📄 找到 5 个 JSX 文件
📄 找到 10 个 JS 文件

📊 扫描结果:
   - JSX 事件绑定: 12 个元素
   - JS 事件绑定: 0 个元素

============================================================
🚨 双重事件绑定检测报告
============================================================
✅ 未发现双重事件绑定问题！
```

### 问题检测报告
```
❌ 发现 2 个双重事件绑定问题:

1. 元素 ID: "openSettings"
   严重程度: ERROR
   问题描述: 元素 "openSettings" 存在双重事件绑定
   JSX 绑定:
     - components/data-panel.jsx:30
       <button id="openSettings" onClick={onOpenSettings}...
   JS 绑定:
     - core/ui-manager.js:565
       document.getElementById('openSettings').addEventListener('click'
   建议修复:
     - 移除 JS 文件中的 addEventListener 绑定
     - 保留 JSX 文件中的 onClick 绑定
```

通过这些工具和最佳实践，可以有效避免双重事件绑定等常见问题，提高代码质量和维护性。