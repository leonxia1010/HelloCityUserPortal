'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputBoxProps } from './InputBox.types';
import styles from './InputBox.module.scss';
import { validationRules, getDefaultPlaceholder, getInputType } from './InputBox.utils';

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChange,
  label,
  fieldType,
  placeholder,
  variant = 'Primary',
  disabled = false,
  required = false,
  showError: externalShowError = false,
  errorMessage: externalErrorMessage = '',
  autoComplete = false,
  originalPassword = '',
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const normalizedFieldType = fieldType || label.toLowerCase().replace(/\s/g, '');
  const inputType =
    (normalizedFieldType === 'password' || normalizedFieldType === 'repeatpassword')
      ? (showPassword ? 'text' : 'password')
      : getInputType(normalizedFieldType);
  const finalPlaceholder = placeholder ?? getDefaultPlaceholder(normalizedFieldType);
  const maxLength = 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const rule = validationRules[normalizedFieldType];

    if (required && !newValue.trim()) {
      setShowError(true);
      setErrorMessage(`${label} is required.`);
    } else if (rule) {
      const isValid =
        normalizedFieldType === 'repeatpassword'
          ? rule.validate(newValue, originalPassword)
          : rule.validate(newValue);

      if (!isValid) {
        setShowError(true);
        setErrorMessage(rule.error);
      } else {
        setShowError(false);
        setErrorMessage('');
      }
    } else {
      setShowError(false);
      setErrorMessage('');
    }

    onChange(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`${styles['input-box-wrapper']} ${variant.toLowerCase()}`}>
      <TextField
        fullWidth
        label={label.charAt(0).toUpperCase() + label.slice(1)} // ✅ 解决测试问题
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={finalPlaceholder}
        variant="outlined"
        error={showError || externalShowError}
        helperText={showError || externalShowError ? errorMessage || externalErrorMessage : ''}
        disabled={disabled}
        inputProps={{
          maxLength,
          autoComplete: autoComplete ? 'on' : 'off',
          name: normalizedFieldType,
        }}
        required={required}
        InputProps={
          (normalizedFieldType === 'password' || normalizedFieldType === 'repeatpassword')
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
