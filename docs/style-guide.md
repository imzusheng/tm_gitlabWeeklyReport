# GitLab 周报插件样式风格指南

## 概述

本文档定义了 GitLab 周报插件的统一样式风格，确保所有组件保持一致的视觉体验和交互行为。

## 设计原则

### 1. 紧凑性 (Compact)
- 优化空间利用，减少不必要的留白
- 保持信息密度与可读性的平衡
- 适配不同屏幕尺寸

### 2. 一致性 (Consistency)
- 统一的颜色系统
- 一致的间距规范
- 标准化的组件样式

### 3. 易用性 (Usability)
- 清晰的视觉层次
- 直观的交互反馈
- 良好的可访问性

## 颜色系统

### 主色调
```css
--primary-color: #007aff;        /* 主要操作按钮 */
--secondary-color: #667eea;      /* 次要元素 */
--accent-color: #764ba2;         /* 强调色 */
```

### 背景色
```css
--panel-bg: white;               /* 面板背景 */
--card-bg: #f8f9fa;             /* 卡片背景 */
--button-bg: #f2f2f7;           /* 按钮背景 */
--hover-bg: #e8e8ed;            /* 悬停背景 */
```

### 文本色
```css
--text-color: #1d1d1f;          /* 主要文本 */
--text-secondary: #6e6e73;      /* 次要文本 */
--text-muted: #8e8e93;          /* 辅助文本 */
```

### 边框色
```css
--border-color: #e1e5e9;        /* 主要边框 */
--border-light: #f0f0f0;        /* 浅色边框 */
```

### 状态色
```css
--success-color: #34c759;       /* 成功状态 */
--error-color: #ff3b30;         /* 错误状态 */
--warning-color: #ff9500;       /* 警告状态 */
--info-color: #007aff;          /* 信息状态 */
```

## 间距系统

### 基础间距单位
```css
/* 基础单位：4px */
--spacing-xs: 4px;   /* 极小间距 */
--spacing-sm: 8px;   /* 小间距 */
--spacing-md: 12px;  /* 中等间距 */
--spacing-lg: 16px;  /* 大间距 */
--spacing-xl: 20px;  /* 超大间距 */
--spacing-xxl: 24px; /* 最大间距 */
```

### 内边距规范
- **小组件**: 6px-10px
- **中等组件**: 12px-16px
- **大组件**: 20px-24px

### 外边距规范
- **组件间距**: 12px-16px
- **区域间距**: 20px-24px

## 字体系统

### 字体族
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### 字体大小
```css
--font-xs: 11px;     /* 辅助信息 */
--font-sm: 12px;     /* 小文本 */
--font-md: 13px;     /* 正文 */
--font-lg: 14px;     /* 标题 */
--font-xl: 16px;     /* 大标题 */
--font-xxl: 18px;    /* 主标题 */
```

### 字重
```css
--font-normal: 400;  /* 正常文本 */
--font-medium: 500;  /* 中等强调 */
--font-semibold: 600; /* 半粗体 */
--font-bold: 700;    /* 粗体 */
```

## 圆角系统

```css
--radius-sm: 4px;    /* 小圆角 */
--radius-md: 6px;    /* 中等圆角 */
--radius-lg: 8px;    /* 大圆角 */
--radius-xl: 12px;   /* 超大圆角 */
--radius-xxl: 16px;  /* 最大圆角 */
```

## 设计风格

### MacOS 扁平化 UI 风格
本插件采用 MacOS 风格的扁平化设计，遵循以下原则：

- **无阴影设计**: 不使用 `box-shadow` 属性，保持界面简洁
- **扁平化元素**: 使用纯色背景和清晰的边框分隔
- **简洁边框**: 使用细线边框 (1px) 来定义元素边界
- **层次分明**: 通过颜色对比和间距来建立视觉层次
- **原生感受**: 模仿 MacOS 系统原生应用的视觉风格

### 替代阴影的设计方案
```css
/* 使用边框替代阴影 */
border: 1px solid var(--border-color);

/* 使用背景色对比建立层次 */
background: var(--card-bg); /* 与面板背景形成对比 */

/* 使用悬停状态的背景色变化 */
&:hover {
  background: var(--hover-bg);
}
```

## 按钮规范

### 主要按钮 (Primary Button)
```css
.btn-primary {
  padding: 12px 16px;
  background: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-color);
  filter: brightness(1.1);
  transform: translateY(-1px);
}
```

### 次要按钮 (Secondary Button)
```css
.btn-secondary {
  padding: 12px 16px;
  background: var(--button-bg);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--hover-bg);
  border-color: var(--text-secondary);
  transform: translateY(-1px);
}
```

### 小按钮 (Small Button)
```css
.btn-small {
  padding: 6px 10px;
  font-size: var(--font-sm);
  border-radius: var(--radius-sm);
}
```

### 图标按钮 (Icon Button)
```css
.btn-icon {
  padding: 6px;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 输入框规范

### 基础输入框
```css
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  background: var(--panel-bg);
  color: var(--text-color);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--card-bg);
}

.input:hover {
  border-color: var(--primary-color);
}
```

### 文本域
```css
.textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.4;
}
```

## 卡片规范

### 基础卡片
```css
.card {
  background: var(--panel-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}
```

### 信息卡片
```css
.info-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 1px solid transparent;
  border-radius: var(--radius-xxl);
  padding: var(--spacing-xl);
}
```

## 动画规范

### 过渡动画
```css
/* 标准过渡 */
transition: all 0.2s ease;

/* 快速过渡 */
transition: all 0.15s ease;

/* 慢速过渡 */
transition: all 0.3s ease;
```

### 缓动函数
```css
/* 标准缓动 */
easing: cubic-bezier(0.25, 0.10, 0.25, 1.00);

/* 弹性缓动 */
easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 响应式断点

```css
/* 平板 */
@media (max-width: 768px) {
  /* 调整间距和字体大小 */
}

/* 手机 */
@media (max-width: 480px) {
  /* 进一步压缩布局 */
}
```

## 深色模式适配

### 深色模式变量
```css
[data-theme="dark"] {
  --panel-bg: #1c1c1e;
  --card-bg: #2c2c2e;
  --text-color: #ffffff;
  --text-secondary: #98989d;
  --border-color: #38383a;
  --border-light: #48484a;
}
```

## 组件一致性检查清单

### 扁平化设计检查
- [ ] 不使用 `box-shadow` 属性
- [ ] 使用边框定义元素边界
- [ ] 通过背景色对比建立层次
- [ ] 悬停状态使用背景色变化而非阴影
- [ ] 保持 MacOS 原生应用的简洁风格

### 按钮检查
- [ ] 使用统一的内边距规范
- [ ] 应用标准的圆角大小
- [ ] 实现悬停和激活状态
- [ ] 支持禁用状态
- [ ] 使用一致的字体大小和字重
- [ ] 使用边框而非阴影定义边界

### 输入框检查
- [ ] 统一的边框样式
- [ ] 焦点状态样式
- [ ] 悬停状态样式
- [ ] 错误状态样式
- [ ] 占位符样式

### 卡片检查
- [ ] 一致的背景色
- [ ] 统一的边框和阴影
- [ ] 标准的内边距
- [ ] 适当的圆角大小

### 间距检查
- [ ] 组件内部间距符合规范
- [ ] 组件之间间距一致
- [ ] 响应式间距调整

## 使用指南

1. **新组件开发**：参考本指南创建新组件样式
2. **现有组件优化**：对照检查清单进行样式统一
3. **响应式适配**：确保在不同屏幕尺寸下的一致性
4. **深色模式**：使用 CSS 变量确保主题切换的兼容性

## 更新日志

- **v1.0.0** (2024-01-XX): 初始版本，定义基础样式规范