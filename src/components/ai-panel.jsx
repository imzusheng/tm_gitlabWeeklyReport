import { createElement } from "../utils/jsx-runtime.js";
import CONFIG from "../config.js";
import "./ai-panel.less";

// AI面板组件
export function AIPanel({ onGenerateReport, onExportData, onCopyReport }) {
  // 折叠状态管理
  const handleToggleCollapse = () => {
    const panel = document.getElementById("ai-panel");
    const content = panel.querySelector(".ai-content");
    const toggleBtn = panel.querySelector(".toggle-btn");

    if (content.style.display === "none") {
      content.style.display = "block";
      toggleBtn.textContent = "▼";
      panel.classList.remove("collapsed");
    } else {
      content.style.display = "none";
      toggleBtn.textContent = "▶";
      panel.classList.add("collapsed");
    }
  };

  return (
    <div id="ai-panel">
      {/* 头部区域 */}
      <div className="header">
        <div className="title-row">
          <h3>🤖 AI 助手</h3>
          <button
            className="toggle-btn"
            onClick={handleToggleCollapse}
            title="折叠/展开"
          >
            ▼
          </button>
        </div>
      </div>

      {/* 可折叠内容区域 */}
      <div className="ai-content">
        {/* 附加要求 */}
        <div className="prompt-section">
          <label>📝 附加要求:</label>
          <textarea
            id="additionalPrompt"
            rows="3"
            placeholder="输入附加要求，如：重点突出某个功能模块..."
            defaultValue={CONFIG.get().DEFAULT_ADDITIONAL_PROMPT}
          />
        </div>

        {/* 金额和Token信息 */}
        <div className="info-section">
          <div className="info-row">
            <span id="balance-info" className="info-text">
              💰 获取余额中
            </span>
          </div>
          <div className="info-row">
            <span id="token-usage" className="info-text">
              Token使用情况: -
            </span>
          </div>
        </div>

        {/* AI操作按钮 */}
        <div className="action-buttons">
          <button
            id="generateReport"
            onClick={onGenerateReport}
            className="generate-button"
            disabled
          >
            🤖 生成周报
          </button>
          <button
            id="exportData"
            onClick={onExportData}
            className="export-button"
            disabled
          >
            📤 导出数据
          </button>
        </div>
      </div>

      {/* AI生成结果区域 */}
      <div id="reportResult" className="report-result">
        <div className="result-header">
          <h4>📄 生成的周报:</h4>
          <button
            id="copyReport"
            onClick={onCopyReport}
            className="copy-button"
          >
            📋 复制
          </button>
        </div>
        <div id="reportContent" className="report-content" />
      </div>
    </div>
  );
}
