import { GitLabEvent } from '@/types'

/**
 * 事件工具函数集合
 */
export const eventUtils = {
  /**
   * 格式化事件时间
   * @param dateString 日期字符串
   * @returns 格式化后的时间字符串
   */
  formatEventDate: (dateString: string): string => {
    const eventDate = new Date(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const diffTime =
      today.getTime() -
      new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
      ).getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const timeStr = eventDate.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })

    if (diffDays === 0) {
      return `今天 ${timeStr}`
    }
    if (diffDays === 1) {
      return `昨天 ${timeStr}`
    }
    if (diffDays > 1 && diffDays <= 7) {
      return `${diffDays}天前`
    }
    return eventDate.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  /**
   * 根据事件类型获取标题
   * @param event GitLab事件
   * @returns 事件标题
   */
  getEventTitleByType: (event: GitLabEvent): string => {
    // 推送事件的标题在getEventDisplayInfo中已处理
    if (event.push_data) {
      return `推送到分支 ${event.push_data.ref}`
    }

    // 评论事件
    if (event.note) {
      const MAX_NOTE_LENGTH = 50
      const noteBody = event.note.body
        .replace(/\n/g, ' ')
        .substring(0, MAX_NOTE_LENGTH)
      return `评论: ${noteBody}${event.note.body.length > MAX_NOTE_LENGTH ? '...' : ''}`
    }

    // 加入项目事件
    if (event.action_name === 'joined') {
      return '加入项目'
    }

    // 其他事件使用原有标题
    return event.title || event.target_title || '无标题'
  },

  /**
   * 统一的事件显示信息获取方案
   * 综合考虑 target_type、action_name、push_data 等信息
   * 返回包含图标、操作类型和标题的统一对象
   * @param event GitLab事件
   * @returns 事件显示信息
   */
  getEventDisplayInfo: (
    event: GitLabEvent,
  ): { icon: string; actionType: string; title: string } => {
    const { action_name: actionName, target_type: targetType } = event

    // 1. 推送事件特殊处理
    if (event.push_data) {
      const { ref, commit_count: commitCount } = event.push_data
      const title = `推送到分支 ${ref} (${commitCount} 个提交)`
      return { icon: '⬆️', actionType: '推送', title }
    }

    // 2. 评论事件特殊处理
    if (event.note) {
      const MAX_NOTE_LENGTH = 50
      const noteBody = event.note.body
        .replace(/\n/g, ' ')
        .substring(0, MAX_NOTE_LENGTH)
      const title = `评论: ${noteBody}${event.note.body.length > MAX_NOTE_LENGTH ? '...' : ''}`
      return { icon: '💬', actionType: '评论', title }
    }

    // 3. 通用事件处理
    const title = event.title || event.target_title || '无标题'

    const configMap: Record<string, { icon: string; actionType: string }> = {
      // TargetType based
      Issue: { icon: '🐛', actionType: '问题' },
      MergeRequest: { icon: '🔀', actionType: '合并请求' },
      WikiPage: { icon: '📖', actionType: 'Wiki' },
      Project: { icon: '📁', actionType: '项目' },
      Milestone: { icon: '🎯', actionType: '里程碑' },
      Epic: { icon: '🎪', actionType: 'Epic' },
      Snippet: { icon: '✂️', actionType: '代码片段' },
      User: { icon: '👤', actionType: '用户' },
      // ActionName based
      'pushed to': { icon: '⬆️', actionType: '推送' },
      'pushed new': { icon: '⬆️', actionType: '推送新分支' },
      opened: { icon: '🆕', actionType: '开启' },
      closed: { icon: '✅', actionType: '关闭' },
      merged: { icon: '🔀', actionType: '合并' },
      'commented on': { icon: '💬', actionType: '评论' },
      joined: { icon: '👋', actionType: '加入' },
      left: { icon: '👋', actionType: '离开' },
      created: { icon: '✨', actionType: '创建' },
      updated: { icon: '🔄', actionType: '更新' },
      deleted: { icon: '🗑️', actionType: '删除' },
      approved: { icon: '✅', actionType: '批准' },
      unapproved: { icon: '❌', actionType: '取消批准' },
    }

    const config =
      (targetType && configMap[targetType]) ||
      (actionName && configMap[actionName])

    if (config) {
      return { ...config, title }
    }

    // 4. 兜底情况
    return {
      icon: '📋',
      actionType: targetType || actionName || '未知操作',
      title: eventUtils.getEventTitleByType(event),
    }
  },

  /**
   * 获取事件内容描述
   * @param event GitLab事件
   * @returns 事件内容描述
   */
  getEventContent: (event: GitLabEvent): string => {
    if (event.push_data) {
      return `${event.push_data.commit_count} 个提交: ${event.push_data.commit_title}`
    }
    if (event.note && event.target_title) {
      return event.target_title
    }
    return (
      event.project?.path_with_namespace ||
      `项目ID: ${event.project_id}` ||
      '未知项目'
    )
  },
}
