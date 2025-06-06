import React from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * 输入框组件
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const classes = ['tm-input', className].filter(Boolean).join(' ');

  return (
    <div className="tm-input-group">
      {label && (
        <label htmlFor={inputId} className="tm-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
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