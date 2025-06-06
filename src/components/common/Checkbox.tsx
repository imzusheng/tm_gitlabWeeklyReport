import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  error?: string;
}

/**
 * 复选框组件
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const classes = ['checkbox', className].filter(Boolean).join(' ');

  return (
    <div className="checkbox-group">
      <label htmlFor={checkboxId} className={classes}>
        <input
          id={checkboxId}
          type="checkbox"
          {...props}
        />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
      {error && (
        <div className="checkbox-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};