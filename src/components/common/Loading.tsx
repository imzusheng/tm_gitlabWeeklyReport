import React from 'react';
import './Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

/**
 * 加载动画组件
 * 支持不同尺寸和自定义文本
 */
export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  className = '',
}) => {
  return (
    <div className={`tm-loading tm-loading--${size} ${className}`}>
      <div className="tm-loading__spinner">
        <div className="tm-loading__dot"></div>
        <div className="tm-loading__dot"></div>
        <div className="tm-loading__dot"></div>
      </div>
      {text && (
        <div className="tm-loading__text">{text}</div>
      )}
    </div>
  );
};