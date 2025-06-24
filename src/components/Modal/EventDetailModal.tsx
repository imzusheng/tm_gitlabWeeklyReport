import { GitLabEvent } from '@/types'
import styles from './EventDetailModal.module.less'

interface EventDetailModalProps {
  event: GitLabEvent | null
  visible: boolean
  onClose: () => void
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  visible,
  onClose,
}) => {
  if (!visible || !event) return null

  const getEventTypeDisplay = (targetType: string | null) => {
    // 处理空值情况
    if (!targetType || targetType.trim() === '') {
      return '未知类型'
    }

    const typeMap: Record<string, string> = {
      MergeRequest: 'Merge Request',
      Issue: 'Issue',
      Push: '代码推送',
      Note: '评论',
      DiscussionNote: '讨论-评论',
      DiffNote: '代码-评论',
      Commit: '提交',
    }
    return typeMap[targetType] || targetType
  }

  const getActionDisplay = (actionName: string) => {
    const actionMap: Record<string, string> = {
      opened: '开启',
      closed: '关闭',
      merged: '合并',
      'pushed new': '推送新分支',
      'pushed to': '推送到分支',
      'commented on': '评论',
      joined: '加入',
    }
    return actionMap[actionName] || actionName
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getSourceUrl = () => {
    // 如果没有project对象且没有project_id，无法生成URL
    if (!event.project && !event.project_id) return ''

    const baseUrl = 'https://www.lejuhub.com'
    
    // 如果没有完整的project对象，只能返回基础URL
    if (!event.project) {
      return baseUrl
    }
    
    const projectPath = event.project.path_with_namespace

    // 处理空值情况
    if (!event.target_type || event.target_type.trim() === '') {
      return `${baseUrl}/${projectPath}`
    }

    switch (event.target_type) {
      case 'MergeRequest':
        return `${baseUrl}/${projectPath}/-/merge_requests/${event.target_iid}`
      case 'Issue':
        return `${baseUrl}/${projectPath}/-/issues/${event.target_iid}`
      case 'Note':
        if (event.note?.noteable_type === 'Issue') {
          return `${baseUrl}/${projectPath}/-/issues/${event.note.noteable_iid}`
        } else if (event.note?.noteable_type === 'MergeRequest') {
          return `${baseUrl}/${projectPath}/-/merge_requests/${event.note.noteable_iid}`
        }
        return `${baseUrl}/${projectPath}`
      default:
        return `${baseUrl}/${projectPath}`
    }
  }

  return (
    <div className={styles['event-detail-modal-overlay']} onClick={onClose}>
      <div className={styles['event-detail-modal']} onClick={e => e.stopPropagation()}>
        <div className={styles['modal-header']}>
          <h2>事件详情</h2>
          <button className={styles['close-btn']} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles['modal-content']}>
          {/* 基本信息 */}
          <div className={`${styles['detail-section']} ${styles.compact}`}>
            <h3>基本信息</h3>
            <div className={`${styles['detail-grid']} ${styles['compact-grid']}`}>
              <div className={styles['detail-item']}>
                <span className={styles.label}>ID:</span>
                <span className={styles.value}>{event.id}</span>
              </div>
              <div className={styles['detail-item']}>
                <span className={styles.label}>类型:</span>
                <span className={styles.value}>
                  {getEventTypeDisplay(event.target_type)}
                </span>
              </div>
              <div className={styles['detail-item']}>
                <span className={styles.label}>操作:</span>
                <span className={`${styles.value} ${styles['action-badge']}`}>
                  {getActionDisplay(event.action_name)}
                </span>
              </div>
              <div className={styles['detail-item']}>
                <span className={styles.label}>时间:</span>
                <span className={styles.value}>{formatDate(event.created_at)}</span>
              </div>
              {event.state && (
                <div className={styles['detail-item']}>
                  <span className={styles.label}>状态:</span>
                  <span className={`${styles.value} ${styles['status-badge']} ${styles[`status-${event.state}`]}`}>
                    {event.state}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 内容信息 */}
          {(event.title ||
            event.target_title ||
            (event.labels && event.labels.length > 0)) && (
            <div className={`${styles['detail-section']} ${styles.compact}`}>
              <h3>内容</h3>
              <div className={`${styles['detail-content']} ${styles['compact-content']}`}>
                {event.title && (
                  <div className={styles['detail-item']}>
                    <span className={styles.label}>标题:</span>
                    <span className={styles.value}>{event.title}</span>
                  </div>
                )}
                {event.target_title && (
                  <div className={styles['detail-item']}>
                    <span className={styles.label}>目标:</span>
                    <span className={styles.value}>{event.target_title}</span>
                  </div>
                )}
                {event.labels && event.labels.length > 0 && (
                  <div className={styles['detail-item']}>
                    <span className={styles.label}>标签:</span>
                    <div className={styles.labels}>
                      {event.labels.map((label, index) => (
                        <span key={index} className={styles['label-tag']}>
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 作者信息 */}
          {event.author && (
            <div className={`${styles['detail-section']} ${styles.compact}`}>
              <h3>作者</h3>
              <div className={`${styles['author-info']} ${styles['compact-author']}`}>
                {event.author.avatar_url && (
                  <img
                    src={`${event.author.avatar_url}?width=100`}
                    alt={event.author.name}
                    className={styles['author-avatar']}
                  />
                )}
                <div className={styles['author-details']}>
                  <div className={styles['author-name']}>{event.author.name}</div>
                  <div className={styles['author-username']}>
                    @{event.author.username}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 项目信息 */}
          {(event.project || event.project_id) && (
            <div className={`${styles['detail-section']} ${styles.compact}`}>
              <h3>项目</h3>
              <div className={`${styles['project-info']} ${styles['compact-project']}`}>
                {event.project ? (
                  <>
                    <div className={styles['detail-item']}>
                      <span className={styles.label}>名称:</span>
                      <span className={styles.value}>{event.project.name}</span>
                    </div>
                    <div className={styles['detail-item']}>
                      <span className={styles.label}>路径:</span>
                      <span className={styles.value}>
                        {event.project.path_with_namespace}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className={styles['detail-item']}>
                    <span className={styles.label}>项目ID:</span>
                    <span className={styles.value}>{event.project_id}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 推送信息 */}
          {event.push_data && (
            <div className={styles['detail-section']}>
              <h3>推送信息</h3>
              <div className={styles['push-info']}>
                <div className={styles['detail-item']}>
                  <span className={styles.label}>分支:</span>
                  <span className={styles.value}>{event.push_data.ref}</span>
                </div>
                <div className={styles['detail-item']}>
                  <span className={styles.label}>提交数量:</span>
                  <span className={styles.value}>{event.push_data.commit_count}</span>
                </div>
                <div className={styles['detail-item']}>
                  <span className={styles.label}>提交标题:</span>
                  <span className={styles.value}>{event.push_data.commit_title}</span>
                </div>
                <div className={styles['detail-item']}>
                  <span className={styles.label}>提交哈希:</span>
                  <span className={`${styles.value} ${styles['commit-hash']}`}>
                    {event.push_data.commit_to}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 评论信息 */}
          {event.note && (
            <div className={styles['detail-section']}>
              <h3>评论信息</h3>
              <div className={styles['note-info']}>
                <div className={styles['note-body']}>{event.note.body}</div>
                <div className={styles['note-meta']}>
                  <span>创建时间: {formatDate(event.note.created_at)}</span>
                  {event.note.updated_at !== event.note.created_at && (
                    <span>更新时间: {formatDate(event.note.updated_at)}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles['modal-footer']}>
          {getSourceUrl() && (
            <a
              href={getSourceUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['source-link-btn']}
            >
              打开源页面
            </a>
          )}
          <button className={styles['close-modal-btn']} onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal
