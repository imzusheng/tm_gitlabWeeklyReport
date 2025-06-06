import React from 'react';
import type { TextareaHTMLAttributes } from 'react';

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
  const classes = ['input', 'textarea', className].filter(Boolean).join(' ');

  return (
    <div className="textarea-group">
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={classes}
        {...props}
      />
      {error && (
        <div className="textarea-error" role="alert">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className="textarea-helper">
          {helperText}
        </div>
      )}
    </div>
  );
};