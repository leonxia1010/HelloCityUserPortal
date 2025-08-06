'use client';

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '@/components/InputBox.module.scss';
import { validationRules, getDefaultPlaceholder, getInputType } from '@/components/InputUtils';
import { i18n } from '@/i18n';

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

  const normalizedFieldType = fieldType || label.toLowerCase().replace(/\s/g, '');
  const inputType =
    normalizedFieldType === 'password' || normalizedFieldType === 'repeatPassword'
      ? showPassword
        ? 'text'
        : 'password'
      : getInputType(normalizedFieldType);
  const finalPlaceholder = placeholder ?? getDefaultPlaceholder(normalizedFieldType);
  const inputId = `input-${normalizedFieldType}`;

  useEffect(() => {
    if (!touched) return;

    const rule = validationRules[normalizedFieldType];
    let currentError = '';

    const labelText =
      typeof label === 'string'
        ? label
        : typeof label === 'object' && 'props' in label
          ? label.props.id || ''
          : '';

    if (!value.trim() && required) {
      currentError = i18n._('{field} is required.', { field: labelText });
      setErrorMessage(currentError);
      return;
    }

    if (rule) {
      const isValid =
        normalizedFieldType === 'repeatPassword'
          ? rule.validate(value, originalPassword ?? '')
          : rule.validate(value);

      if (!isValid) {
        currentError = i18n._(rule.error);
      }

      setErrorMessage(currentError);
      return;
    }
  }, [value, touched, required, originalPassword, label, normalizedFieldType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);
    onChange(e);
  };

  return (
    <div className={`${styles['input-box-wrapper']} ${variant}`}>
      <TextField
        id={inputId}
        fullWidth
        label={typeof label === 'string' ? label.charAt(0).toUpperCase() + label.slice(1) : label}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={finalPlaceholder}
        variant="outlined"
        error={!!(errorMessage || externalErrorMessage)}
        helperText={errorMessage || externalErrorMessage || ' '}
        disabled={disabled}
        required={required}
        // FormLabelProps={{ required: false }} if i enable this and global set in scss, the star mark will disappear.
        inputProps={{
          id: inputId,
          maxLength: 20,
          autoComplete: autoComplete ? 'on' : 'off',
          name: normalizedFieldType,
        }}
        InputProps={
          normalizedFieldType === 'password' || normalizedFieldType === 'repeatPassword'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
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
