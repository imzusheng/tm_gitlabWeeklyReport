/**
 * 事件详情面板组件
 * 用于显示GitLab事件的详细信息
 */

import API from "../api.js";
import Utils from "../utils/utils.js";
import "./event-detail-panel.less";

/**
 * 获取类型颜色
 * @param {string} targetType - 目标类型
 * @param {string} actionName - 操作名称
 * @returns {string} 颜色值
 */
const getTypeColor = (targetType, actionName) => {
  const typeColors = {
    Issue: "#1890ff",
    MergeRequest: "#52c41a",
    Milestone: "#722ed1",
    WikiPage: "#fa8c16",
    Snippet: "#eb2f96",
  };

  if (actionName?.includes("pushed")) {
    return "#13c2c2";
  }

  return typeColors[targetType] || "#666";
};

/**
 * 获取操作图标
 * @param {string} actionName - 操作名称
 * @param {string} targetType - 目标类型
 * @returns {string} 图标字符
 */
const getActionIcon = (actionName, targetType) => {
  if (actionName?.includes("opened")) return "🆕";
  if (actionName?.includes("closed")) return "✅";
  if (actionName?.includes("merged")) return "🔀";
  if (actionName?.includes("pushed")) return "📤";
  if (actionName?.includes("commented")) return "💬";
  if (actionName?.includes("created")) return "✨";
  if (actionName?.includes("updated")) return "🔄";
  if (actionName?.includes("deleted")) return "🗑️";
  return "📋";
};

/**
 * 获取源URL
 * @param {Object} event - 事件对象
 * @returns {string} 源URL
 */
const getSourceUrl = (event) => {
  if (!event.project) return "#";

  const baseUrl =
    event.project.web_url ||
    `https://gitlab.com/${event.project.path_with_namespace}`;

  switch (event.target_type) {
    case "Issue":
      return event.target_iid
        ? `${baseUrl}/-/issues/${event.target_iid}`
        : baseUrl;
    case "MergeRequest":
      return event.target_iid
        ? `${baseUrl}/-/merge_requests/${event.target_iid}`
        : baseUrl;
    case "Milestone":
      return event.target_id
        ? `${baseUrl}/-/milestones/${event.target_id}`
        : baseUrl;
    case "WikiPage":
      return event.target_title
        ? `${baseUrl}/-/wikis/${encodeURIComponent(event.target_title)}`
        : baseUrl;
    case "Snippet":
      return event.target_id
        ? `${baseUrl}/-/snippets/${event.target_id}`
        : baseUrl;
    default:
      // Push 事件或其他类型
      if (event.action_name?.includes("pushed") && event.push_data?.ref) {
        return `${baseUrl}/-/commits/${event.push_data.ref}`;
      }
      return baseUrl;
  }
};

/**
 * 获取事件详情
 * @param {Object} event - 基础事件数据
 * @param {Object} config - 配置信息
 * @returns {Promise<Object>} 详细事件数据
 */
const fetchEventDetail = async (event, config) => {
  if (!event.project_id || !event.target_id || !event.target_type) {
    return event; // 返回原始数据
  }

  try {
    let detailUrl = "";
    const baseUrl = `${config.GITLAB_URL}/projects/${event.project_id}`;

    // 根据不同的target_type构建API URL
    switch (event.target_type) {
      case "Issue":
        detailUrl = `${baseUrl}/issues/${event.target_iid || event.target_id}`;
        break;
      case "MergeRequest":
        detailUrl = `${baseUrl}/merge_requests/${event.target_iid || event.target_id}`;
        break;
      case "Milestone":
        detailUrl = `${baseUrl}/milestones/${event.target_id}`;
        break;
      case "WikiPage":
        // Wiki页面需要特殊处理
        detailUrl = `${baseUrl}/wikis`;
        break;
      case "Snippet":
        detailUrl = `${baseUrl}/snippets/${event.target_id}`;
        break;
      default:
        return event; // 不支持的类型，返回原始数据
    }

    // 添加访问令牌
    const url = `${detailUrl}?access_token=${config.ACCESS_TOKEN}`;

    // 获取详细信息
    const detailData = await API.makeRequest(url);

    // 合并详细信息到原始事件数据
    return {
      ...event,
      detail: detailData,
    };
  } catch (error) {
    console.warn(`获取事件详情失败 (ID: ${event.id}):`, error);
    return event; // 失败时返回原始数据
  }
};

/**
 * 事件详情面板组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @param {Object} props.config - 配置信息
 * @param {Function} props.onClose - 关闭回调函数
 * @returns {JSX.Element} 事件详情面板组件
 */
export function EventDetailPanel({ event, config, onClose }) {
  const [detailedEvent, setDetailedEvent] = React.useState(event);
  const [loading, setLoading] = React.useState(true);

  // 获取当前时间
  const currentTime = Utils.formatTime(new Date());

  // 组件挂载时获取详细信息
  React.useEffect(() => {
    const loadEventDetail = async () => {
      try {
        const detail = await fetchEventDetail(event, config);
        setDetailedEvent(detail);
      } catch (error) {
        console.warn("获取事件详情失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEventDetail();
  }, [event, config]);

  // 处理关闭事件
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  // 获取源URL
  const sourceUrl = getSourceUrl(detailedEvent);

  if (loading) {
    return (
      <div className="event-detail-panel">
        <div className="detail-header">
          <h4 className="detail-title">加载中...</h4>
          <button className="detail-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="detail-content">
          <div className="loading-spinner">🔄 正在加载事件详情...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-detail-panel">
      {/* 头部区域 */}
      <div className="detail-header">
        <h4 className="detail-title">
          {detailedEvent.target_type || "Repository"} 详情
        </h4>
        <button
          className="detail-close"
          onClick={handleClose}
          title="关闭详情面板"
        >
          ×
        </button>
      </div>

      {/* 内容区域 */}
      <div className="detail-content">
        <BasicInfo event={detailedEvent} />

        {detailedEvent.detail && <DetailInfo event={detailedEvent} />}

        {detailedEvent.project && <ProjectInfo event={detailedEvent} />}

        {detailedEvent.push_data && <PushInfo event={detailedEvent} />}

        {detailedEvent.note_data && <CommentInfo event={detailedEvent} />}

        <LinkInfo event={detailedEvent} sourceUrl={sourceUrl} />
      </div>

      {/* 底部区域 */}
      <div className="detail-footer">
        <span className="footer-text">查看时间: {currentTime}</span>
      </div>
    </div>
  );
}

// 为了保持向后兼容，提供create静态方法
EventDetailPanel.create = async (event, config) => {
  // 创建容器元素
  const container = document.createElement("div");
  container.className = "event-detail-overlay";

  // 使用React渲染组件
  const React = window.React;
  const ReactDOM = window.ReactDOM;

  if (React && ReactDOM) {
    // 创建关闭函数
    const handleClose = () => {
      container.remove();
    };

    ReactDOM.render(
      React.createElement(EventDetailPanel, { 
        event: event, 
        config: config, 
        onClose: handleClose 
      }),
      container
    );
  } else {
    // 如果没有React，回退到原始DOM操作
    const eventDetail = await fetchEventDetail(event, config);
    
    container.innerHTML = `
      <div class="event-detail-panel">
        <div class="detail-header">
          <h4 class="detail-title">${eventDetail.target_type || 'Repository'} 详情</h4>
          <button class="detail-close" onclick="this.closest('.event-detail-overlay').remove()">×</button>
        </div>
        <div class="detail-content">
          <div class="detail-section">
            <h5 class="section-title">📋 基本信息</h5>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="item-label">ID:</span>
                <span class="item-value">${eventDetail.id}</span>
              </div>
              <div class="detail-item">
                <span class="item-label">类型:</span>
                <span class="item-value">${eventDetail.target_type || 'Repository'}</span>
              </div>
              <div class="detail-item">
                <span class="item-label">操作:</span>
                <span class="item-value">${eventDetail.action_name}</span>
              </div>
              <div class="detail-item">
                <span class="item-label">作者:</span>
                <span class="item-value">${eventDetail.author?.name || eventDetail.author_username || 'Unknown'}</span>
              </div>
              <div class="detail-item full-width">
                <span class="item-label">标题:</span>
                <span class="item-value">${eventDetail.target_title || 'No title'}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-footer">
          <span class="footer-text">查看时间: ${Utils.formatTime(new Date())}</span>
        </div>
      </div>
    `;
  }

  return container;
};

export default EventDetailPanel;

/**
 * 基本信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @returns {JSX.Element} 基本信息组件
 */
function BasicInfo({ event }) {
  return (
    <div className="detail-section">
      <h5 className="section-title">📋 基本信息</h5>
      <div className="detail-grid">
        {/* ID */}
        <div className="detail-item">
          <span className="item-label">ID:</span>
          <span className="item-value">{event.id}</span>
        </div>

        {/* 类型 */}
        <div className="detail-item">
          <span className="item-label">类型:</span>
          <span
            className="item-value type-badge"
            style={{
              background: getTypeColor(event.target_type, event.action_name),
            }}
          >
            {event.target_type || "Repository"}
          </span>
        </div>

        {/* 操作 */}
        <div className="detail-item">
          <span className="item-label">操作:</span>
          <span className="item-value">
            <span className="action-icon">
              {getActionIcon(event.action_name, event.target_type)}
            </span>
            {` ${event.action_name}`}
          </span>
        </div>

        {/* 作者 */}
        <div className="detail-item">
          <span className="item-label">作者:</span>
          <span className="item-value">
            {event.author?.name || event.author_username || "Unknown"}
          </span>
        </div>

        {/* 时间 */}
        <div className="detail-item">
          <span className="item-label">时间:</span>
          <span className="item-value">
            {Utils.formatTime(event.created_at) || "Unknown"}
          </span>
        </div>

        {/* 标题 */}
        <div className="detail-item full-width">
          <span className="item-label">标题:</span>
          <span className="item-value">{event.target_title || "No title"}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 详细信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @returns {JSX.Element} 详细信息组件
 */
function DetailInfo({ event }) {
  const detail = event.detail;
  if (!detail) return null;

  return (
    <div className="detail-section">
      <h5 className="section-title">🔍 详细信息</h5>
      <div className="detail-grid">
        {/* 状态信息 */}
        {detail.state && (
          <div className="detail-item">
            <span className="item-label">状态:</span>
            <span className={`item-value state-badge state-${detail.state}`}>
              {detail.state}
            </span>
          </div>
        )}

        {/* 标签信息 */}
        {detail.labels && detail.labels.length > 0 && (
          <div className="detail-item full-width">
            <span className="item-label">标签:</span>
            <div className="item-value labels-container">
              {detail.labels.map((label, index) => (
                <span
                  key={index}
                  className="label-badge"
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 描述信息 */}
        {detail.description && (
          <div className="detail-item full-width">
            <span className="item-label">描述:</span>
            <div className="item-value description-content">
              {detail.description}
            </div>
          </div>
        )}

        {/* 指派人信息 */}
        {detail.assignee && (
          <div className="detail-item">
            <span className="item-label">指派人:</span>
            <span className="item-value">{detail.assignee.name}</span>
          </div>
        )}

        {/* 里程碑信息 */}
        {detail.milestone && (
          <div className="detail-item">
            <span className="item-label">里程碑:</span>
            <span className="item-value">{detail.milestone.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 项目信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @returns {JSX.Element} 项目信息组件
 */
function ProjectInfo({ event }) {
  return (
    <div className="detail-section">
      <h5 className="section-title">🏗️ 项目信息</h5>
      <div className="detail-grid">
        {/* 项目名 */}
        <div className="detail-item">
          <span className="item-label">项目名:</span>
          <span className="item-value">{event.project.name}</span>
        </div>

        {/* 命名空间 */}
        <div className="detail-item">
          <span className="item-label">命名空间:</span>
          <span className="item-value">
            {event.project.path_with_namespace}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Push信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @returns {JSX.Element} Push信息组件
 */
function PushInfo({ event }) {
  return (
    <div className="detail-section">
      <h5 className="section-title">📤 Push 信息</h5>
      <div className="detail-grid">
        {/* 提交数 */}
        <div className="detail-item">
          <span className="item-label">提交数:</span>
          <span className="item-value">
            {event.push_data.commit_count || 0}
          </span>
        </div>

        {/* 分支 */}
        <div className="detail-item">
          <span className="item-label">分支:</span>
          <span className="item-value">{event.push_data.ref || "Unknown"}</span>
        </div>

        {/* 提交信息（如果有的话） */}
        {event.push_data.commit_title && (
          <div className="detail-item full-width">
            <span className="item-label">提交信息:</span>
            <span className="item-value">{event.push_data.commit_title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 评论信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @returns {JSX.Element} 评论信息组件
 */
function CommentInfo({ event }) {
  return (
    <div className="detail-section">
      <h5 className="section-title">💬 评论信息</h5>
      <div className="detail-grid">
        {/* 评论类型 */}
        <div className="detail-item">
          <span className="item-label">评论类型:</span>
          <span className="item-value">
            {event.note_data.noteable_type || "Unknown"}
          </span>
        </div>

        {/* 目标类型 */}
        <div className="detail-item">
          <span className="item-label">目标类型:</span>
          <span className="item-value">{event.target_type || "Unknown"}</span>
        </div>

        {/* 评论内容（如果有的话） */}
        {event.note_data.note && (
          <div className="detail-item full-width">
            <span className="item-label">评论内容:</span>
            <div className="item-value note-content">
              {event.note_data.note}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 链接信息组件
 * @param {Object} props - 组件属性
 * @param {Object} props.event - 事件数据
 * @param {string} props.sourceUrl - 源URL
 * @returns {JSX.Element} 链接信息组件
 */
function LinkInfo({ event, sourceUrl }) {
  return (
    <div className="detail-section">
      <h5 className="section-title">🔗 链接信息</h5>
      <div className="detail-grid">
        <div className="detail-item full-width">
          <span className="item-label">源URL:</span>
          <a
            className="item-value source-link"
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sourceUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
