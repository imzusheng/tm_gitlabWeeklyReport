import React from 'react';
import type { TextareaHTMLAttributes } from 'react';
import './Textarea.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * 文本域组件
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const classes = ['tm-textarea', className].filter(Boolean).join(' ');

  return (
    <div className="tm-input-group">
      {label && (
        <label htmlFor={textareaId} className="tm-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={classes}
        {...props}
      />
      {error && (
        <div className="tm-text tm-text--error" role="alert">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className="tm-text tm-text--muted tm-text--small">
          {helperText}
        </div>
      )}
    </div>
  );
};