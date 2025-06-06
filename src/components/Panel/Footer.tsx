import React from 'react';
import './footer.css';

interface FooterProps {
  className?: string;
}

/**
 * 面板底部组件
 * 显示版权信息和相关链接
 */
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <div className={`tm-panel-footer ${className}`}>
      <div className="tm-panel-footer__content">
        <div className="tm-panel-footer__copyright">
          © 2024 GitLab Weekly Report Generator
        </div>
        <div className="tm-panel-footer__links">
          <a
            href="https://github.com/your-repo/gitlab-weekly-report"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-panel-footer__link"
          >
            GitHub
          </a>
          <span className="tm-panel-footer__separator">•</span>
          <a
            href="https://gitlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-panel-footer__link"
          >
            GitLab
          </a>
          <span className="tm-panel-footer__separator">•</span>
          <a
            href="https://deepseek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-panel-footer__link"
          >
            DeepSeek
          </a>
        </div>
      </div>
    </div>
  );
};