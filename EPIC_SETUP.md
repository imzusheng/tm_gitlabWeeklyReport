# Epic 功能设置说明

## 问题说明

在使用 GitLab Weekly Report 工具时，如果选择 `target_type=epic`，可能会遇到以下错误：

```
"error": "target_type does not have a valid value"
```

## 解决方案

根据 GitLab 官方文档，要使用 Epic 相关的 API 功能，需要启用 Epic 的新外观（new look for epics）。

### 启用方法

#### 对于 GitLab 管理员（Self-Managed）

1. 进入 GitLab 管理界面
2. 启用以下功能标志（Feature Flag）：
   - `work_item_epics`
   - 或者 `namespace_level_work_items`（旧版本）

#### 通过 Rails Console 启用

```ruby
# 启用新的 Epic 工作项功能
Feature.enable(:work_item_epics)

# 或者启用命名空间级别的工作项（包含 Epic）
Feature.enable(:namespace_level_work_items)
```

#### 对于 GitLab.com 用户

- GitLab.com 用户需要等待 GitLab 官方启用此功能
- 或者联系 GitLab 支持团队

### 验证方法

启用功能后，可以通过以下方式验证：

1. 访问您的 GitLab 群组
2. 查看是否可以创建和查看 Epic
3. 确认 Epic 使用新的工作项界面

### API 变更说明

- GitLab 17.0+ 中，Epic REST API 已被弃用
- GitLab 17.4+ 中，如果启用了新外观，建议使用 Work Items API
- 传统的 Epic API 在未启用新外观时可能无法正常工作

## 相关链接

- [GitLab Epic 文档](https://docs.gitlab.com/ee/user/group/epics/)
- [Work Items API 文档](https://docs.gitlab.com/ee/api/work_items.html)
- [Epic API 迁移指南](https://docs.gitlab.com/ee/api/epics.html)

## 注意事项

- Epic 功能仅在 GitLab Premium 和 Ultimate 版本中可用
- 启用新外观后，某些旧的 Epic 功能可能会发生变化
- 建议在测试环境中先验证功能正常性