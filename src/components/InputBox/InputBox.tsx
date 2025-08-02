'use client';

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './InputBox.module.scss';
import { validationRules, getDefaultPlaceholder, getInputType } from './utils';

export type InputVariant = 'primary' | 'secondary' | 'tertiary';
export type InputFieldType = 'name' | 'email' | 'password' | 'repeatPassword' | 'phone';

export interface InputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  fieldType: InputFieldType;
  placeholder?: string;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  autoComplete?: boolean;
  originalPassword?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChange,
  label,
  fieldType,
  placeholder,
  variant = 'primary',
  disabled,
  required,
  errorMessage: externalErrorMessage = '',
  autoComplete,
  originalPassword,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  // TODO: 其实这个touch不重要，因为即使用户没有focus在input上，错误的输入还是应该显示错误的提示消息（我可能理解的不完全对）

  const normalizedFieldType = fieldType || label.toLowerCase().replace(/\s/g, '');
  const inputType =
    normalizedFieldType === 'password' || normalizedFieldType === 'repeatPassword'
      ? showPassword
        ? 'text'
        : 'password'
      : getInputType(normalizedFieldType);
  const finalPlaceholder = placeholder ?? getDefaultPlaceholder(normalizedFieldType);
  const maxLength = 20; // TODO: 不需要，值没变且：只用了一次；就直接设置在参数里就可以了
  const inputId = `input-${normalizedFieldType}`;

  useEffect(() => {
    if (!touched) return;

    const rule = validationRules[normalizedFieldType];
    let currentError = '';

    if (!value.trim()) {
      if (required) {
        currentError = `${label} is required.`;
      }
      // TODO: 这俩if套if，弯曲可以合并成一个条件
    } else if (rule) {
      // TODO: 切记，少用else，比如说你这里，你如果觉得如果value是空字符串则不需要测试rule，那就把setErrorMessage挪到上面去，然后直接一个return;
      const isValid =
        normalizedFieldType === 'repeatPassword'
          ? rule.validate(value, originalPassword ?? '')
          : rule.validate(value);

      if (!isValid) {
        currentError = rule.error;
      }
    }

    setErrorMessage(currentError);
  }, [value, touched, required, originalPassword, label, normalizedFieldType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);
    onChange(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    // TODO: 如果这个函数就一行，那就没必要弄个别的函数包一下
  };

  return (
    <div className={`${styles['input-box-wrapper']} ${variant}`}>
      <TextField
        id={inputId}
        fullWidth
        label={label.charAt(0).toUpperCase() + label.slice(1)}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={finalPlaceholder}
        variant="outlined"
        error={!!(errorMessage || externalErrorMessage)}
        helperText={errorMessage || externalErrorMessage || ' '}
        disabled={disabled}
        required={required}
        inputProps={{
          id: inputId,
          maxLength,
          autoComplete: autoComplete ? 'on' : 'off',
          name: normalizedFieldType,
        }}
        // TODO: 这俩InputProps的区别是什么呢？
        InputProps={
          normalizedFieldType === 'password' || normalizedFieldType === 'repeatPassword'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </div>
  );
};

export default InputBox;
