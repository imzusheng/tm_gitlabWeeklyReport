import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * 可重用的下拉选择框组件
 * 支持标签、错误提示、帮助文本等功能
 */
export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = '请选择...',
  error,
  helperText,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`tm-form-group ${className}`}>
      {label && (
        <label className="tm-form-label">
          {label}
        </label>
      )}
      <select
        className={`tm-select ${error ? 'tm-select--error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="tm-form-error">{error}</div>
      )}
      {helperText && !error && (
        <div className="tm-form-helper">{helperText}</div>
      )}
    </div>
  );
};