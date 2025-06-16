import { GitLabEvent } from '@/types'

export const mockEvents: GitLabEvent[] = [
  {
    id: 1128106,
    project_id: 1137,
    action_name: "opened",
    target_id: 77104,
    target_iid: 276,
    target_type: "Issue",
    author_id: 1172,
    target_title: "桌面软件视频回传画面卡顿",
    created_at: "2025-06-11T18:08:07.026+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "desktop-software",
      path_with_namespace: "frontend/desktop-software"
    },
    state: "opened",
    labels: ["bug", "video"]
  },
  {
    id: 1128091,
    project_id: 1426,
    action_name: "opened",
    target_id: 33181,
    target_iid: 213,
    target_type: "MergeRequest",
    author_id: 1172,
    target_title: "联调视觉回传功能",
    created_at: "2025-06-11T17:56:58.795+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "vision-system",
      path_with_namespace: "backend/vision-system"
    },
    state: "opened",
    labels: ["feature", "vision"]
  },
  {
    id: 1128088,
    project_id: 1426,
    action_name: "pushed new",
    target_type: "Push",
    author_id: 1172,
    created_at: "2025-06-11T17:55:51.419+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    push_data: {
      commit_count: 10,
      action: "created",
      ref_type: "branch",
      commit_to: "fdaf08b151b426c3f64d2d9a4de5bf8df0f49d34",
      ref: "lzs/2259-feat-vision",
      commit_title: "ui(vision): 调整视觉回传窗口比例以适配视频比例"
    },
    author_username: "lizusheng",
    project: {
      name: "vision-system", 
      path_with_namespace: "backend/vision-system"
    },
    labels: ["ui", "vision"]
  },
  {
    id: 1128078,
    project_id: 1426,
    action_name: "opened",
    target_id: 33180,
    target_iid: 212,
    target_type: "MergeRequest",
    author_id: 1172,
    target_title: "fix(yolo): 修复 yolo 积木块运行错误",
    created_at: "2025-06-11T17:45:06.306+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "ai-blocks",
      path_with_namespace: "ai/ai-blocks" 
    },
    state: "opened",
    labels: ["bug", "yolo", "ai"]
  },
  {
    id: 1128036,
    project_id: 1137,
    action_name: "opened",
    target_id: 77095,
    target_iid: 275,
    target_type: "Issue",
    author_id: 1172,
    target_title: "yolo 积木块代码运行后没有结果返回, 只能手动停止运行",
    created_at: "2025-06-11T17:13:49.310+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "desktop-software",
      path_with_namespace: "frontend/desktop-software"
    },
    state: "opened",
    labels: ["bug", "yolo", "runtime"]
  },
  {
    id: 1127877,
    project_id: 1366,
    action_name: "opened",
    target_id: 33172,
    target_iid: 30,
    target_type: "MergeRequest",
    author_id: 1172,
    target_title: "feat(explain): 实现非 disabled 状态下的开始讲解逻辑",
    created_at: "2025-06-11T14:43:04.235+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "expo-assistant",
      path_with_namespace: "product/expo-assistant"
    },
    state: "opened",
    labels: ["feature", "explain"]
  },
  {
    id: 1127494,
    project_id: 1426,
    action_name: "commented on",
    target_id: 1215652,
    target_iid: 1215652,
    target_type: "Note",
    author_id: 1172,
    target_title: "处理 https://www.lejuhub.com/carlos/softdev_doc/-/issues/2298 -> 验证视觉中与 yolo 相关的积木块功能是否正常 连接机器人 执行下载运行操作 #add-by-emacs",
    created_at: "2025-06-10T19:08:31.077+08:00",
    note: {
      id: 1215652,
      type: "DiscussionNote",
      body: "@yebao @heyinglin 沟通结果: \n\n- 桌面软件可以正常执行`下载`和`运行`功能\n- 机器人执行代码有错误",
      attachment: null,
      author: {
        id: 1172,
        username: "lizusheng",
        name: "李祖昇",
        state: "active",
        avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
        web_url: "https://www.lejuhub.com/lizusheng"
      },
      created_at: "2025-06-10T19:08:30.352+08:00",
      updated_at: "2025-06-10T19:15:44.114+08:00",
      system: false,
      noteable_id: 76651,
      noteable_type: "Issue",
      project_id: 1426,
      resolvable: false,
      resolved: false,
      confidential: false,
      internal: false,
      noteable_iid: 13,
      commands_changes: {}
    },
    author: {
      id: 1172,
      username: "lizusheng", 
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "ai-blocks",
      path_with_namespace: "ai/ai-blocks"
    },
    labels: ["discussion", "testing"]
  },
  {
    id: 1127331,
    project_id: 1137,
    action_name: "opened",
    target_id: 77052,
    target_iid: 273,
    target_type: "Issue",
    author_id: 1172,
    target_title: "桌面软件-运行-下载代码时缺少提示",
    created_at: "2025-06-10T17:11:42.441+08:00",
    author: {
      id: 1172,
      username: "lizusheng",
      name: "李祖昇",
      state: "active",
      avatar_url: "https://www.lejuhub.com/uploads/-/system/user/avatar/1172/avatar.png",
      web_url: "https://www.lejuhub.com/lizusheng"
    },
    author_username: "lizusheng",
    project: {
      name: "desktop-software",
      path_with_namespace: "frontend/desktop-software"
    },
    state: "opened",
    labels: ["enhancement", "ux"]
  }
]

export const mockConfig = {
  gitlabUrl: "https://www.lejuhub.com",
  gitlabToken: "glpat-xxxxxxxxxxxxxxxxxxxx",
  deepseekApiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  defaultPrompt: `请根据以下GitLab事件数据生成工作周报，包括：

1. 本周主要工作内容总结
   - 新功能开发（MergeRequest）
   - Bug修复（Issue）
   - 代码优化和重构

2. 具体完成的任务
   - 已合并的功能分支
   - 已解决的问题单
   - 代码提交和推送记录

3. 当前进行中的工作
   - 开放的MR和Issue
   - 正在开发的功能

4. 遇到的技术难点和解决方案

5. 下周工作计划

请使用专业的技术语言，突出核心技术成果，按项目分类整理。`,
  tokenLimit: 4000,
  model: "deepseek-chat"
} 