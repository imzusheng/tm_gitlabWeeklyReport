# 版本更新通知组件

## 功能特性

### 🔄 自动版本检查

- **60秒轮询**: 每60秒自动检查一次GitHub最新版本
- **智能比较**: 使用语义化版本号比较，准确识别新版本
- **网络优化**: 10秒请求超时，避免长时间等待
- **错误处理**: 完善的错误处理和用户提示

### 🎯 手动更新检查

- **一键检查**: 点击按钮立即检查最新版本
- **状态显示**: 实时显示检查状态和结果
- **时间记录**: 显示上次检查时间
- **错误提示**: 检查失败时显示详细错误信息

### 🔔 智能通知系统

- **弹窗提醒**: 发现新版本时自动弹出更新通知
- **版本对比**: 清晰显示当前版本和最新版本
- **更新说明**: 展示GitHub Release的更新日志
- **用户选择**: 支持"稍后更新"和"立即更新"操作

### 💾 用户偏好记忆

- **忽略版本**: 用户可以忽略特定版本的更新提醒
- **本地存储**: 使用localStorage记住用户的选择
- **智能过滤**: 不会重复提醒已忽略的版本

### 🛠️ 开发者工具

- **快捷键支持**: `Ctrl/Cmd + Shift + U` 清除所有忽略的版本（仅开发模式）
- **调试信息**: 控制台输出详细的调试信息
- **错误日志**: 完整的错误追踪和日志记录

## 使用方法

### 基本用法

```tsx
import VersionUpdateNotification from '@/components/VersionUpdateNotification'
import { APP_VERSION } from '@/constants'

// 在组件中使用
;<VersionUpdateNotification
  currentVersion={APP_VERSION}
  autoCheckEnabled={true} // 可选，默认true
  checkInterval={300000} // 可选，默认300秒（5分钟）
/>
```

### 参数说明

| 参数               | 类型      | 默认值   | 说明                        |
| ------------------ | --------- | -------- | --------------------------- |
| `currentVersion`   | `string`  | -        | 当前应用版本号（必需）      |
| `autoCheckEnabled` | `boolean` | `true`   | 是否启用自动检查更新        |
| `checkInterval`    | `number`  | `300000` | 检查间隔（毫秒），默认5分钟 |

## 版本检查逻辑

### API 端点

- **远程package.json**: `https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json`
- **下载地址**: `https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js`

### 检查原理

组件通过获取远程仓库的 `package.json` 文件中的版本号，与当前本地版本进行比较，判断是否有新版本可用。这种方式确保了版本检查的准确性和实时性。

### 版本比较算法

```typescript
// 示例：比较 "1.3.4" 和 "1.4.0"
const compareVersions = (current: string, latest: string): boolean => {
  const currentParts = current.split('.').map(Number) // [1, 3, 4]
  const latestParts = latest.split('.').map(Number) // [1, 4, 0]

  // 逐位比较，返回是否有更新
  // 结果：true（1.4.0 > 1.3.4）
}
```

## 用户交互流程

### 正常检查流程

1. 组件加载后立即检查一次版本
2. 每60秒自动检查一次
3. 检查按钮显示当前状态（检查中/有更新/正常）
4. 鼠标悬停显示上次检查时间和错误信息

### 发现新版本

1. 检查到新版本且用户未忽略该版本
2. 自动弹出更新通知弹窗
3. 显示版本对比和更新说明
4. 用户可选择"立即更新"或"稍后更新"

### 用户操作

- **立即更新**: 打开新标签页到下载地址，关闭通知
- **稍后更新**: 关闭通知，将该版本加入忽略列表
- **手动检查**: 点击检查按钮立即检查版本

## 样式主题

### 支持的主题

- ✅ 浅色主题
- ✅ 深色主题
- ✅ 系统主题自动切换
- ✅ 响应式设计

### CSS 变量

组件使用CSS变量实现主题切换，自动适配应用的主题系统。

## 错误处理

### 网络错误

- 请求超时（10秒）
- 网络连接失败
- GitHub API限制
- 响应格式错误

### 本地存储错误

- localStorage不可用
- 数据格式错误
- 存储空间不足

### 用户友好提示

所有错误都会显示简洁的中文提示，详细错误信息记录在控制台。

## 开发调试

### 快捷键

- `Ctrl/Cmd + Shift + U`: 清除所有忽略的版本（仅开发模式）

### 控制台命令

```javascript
// 手动清除忽略的版本
localStorage.removeItem('gitlab-weekly-report-dismissed-versions')

// 查看当前忽略的版本
JSON.parse(
  localStorage.getItem('gitlab-weekly-report-dismissed-versions') || '[]',
)
```

## 性能优化

### 网络请求优化

- 使用AbortController实现请求取消
- 10秒超时避免长时间等待
- 错误重试机制

### 内存管理

- 及时清理定时器
- 使用useCallback避免不必要的重渲染
- 合理的状态管理

### 用户体验优化

- 平滑的动画效果
- 响应式设计适配移动端
- 无障碍访问支持

## 注意事项

1. **网络依赖**: 需要能够访问GitHub API
2. **版本格式**: 要求使用语义化版本号格式（如：1.3.4）
3. **浏览器兼容**: 需要支持localStorage和fetch API
4. **权限要求**: 需要弹窗权限来打开下载页面

## 更新日志

### v1.0.0

- ✅ 基础版本检查功能
- ✅ 自动轮询机制
- ✅ 手动检查按钮
- ✅ 更新通知弹窗
- ✅ 用户偏好记忆
- ✅ 主题适配
- ✅ 错误处理
- ✅ 开发者工具
