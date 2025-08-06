import type { ReactNode } from 'react';
import { Trans } from '@lingui/react';
import { i18n } from '@lingui/core';

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;
  return passwordRegex.test(password);
};

// Return string only for placeholder (required by MUI TextField)
export const getDefaultPlaceholder = (type: string): string => {
  switch (type) {
    case 'email':
      return i18n._(/* id: "placeholder.email" */ 'Please enter your email');
    case 'password':
      return i18n._(/* id: "placeholder.password" */ 'Please enter your password');
    case 'repeatPassword':
      return i18n._(/* id: "placeholder.repeatPassword" */ 'Please repeat your password');
    case 'name':
      return i18n._(/* id: "placeholder.name" */ 'Please enter your name');
    case 'phone':
      return i18n._(/* id: "placeholder.phone" */ 'Please enter your phone number');
    default:
      return i18n._(/* id: "placeholder.default" */ 'Please enter value');
  }
};

export const getInputType = (type: string): 'text' | 'email' | 'password' | 'tel' => {
  switch (type) {
    case 'email':
      return 'email';
    case 'password':
    case 'repeatPassword':
      return 'password';
    case 'phone':
      return 'tel';
    default:
      return 'text';
  }
};

export const validationRules: Record<
  string,
  {
    validate: (value: string, compareTo?: string) => boolean;
    error: ReactNode;
  }
> = {
  name: {
    validate: (v) => v.trim() !== '' && /^[a-zA-Z\s]+$/.test(v),
    error: <Trans id="validation.nameError">Only letters are allowed and name is required.</Trans>,
  },
  email: {
    validate: isValidEmail,
    error: <Trans id="validation.emailError">Please enter a valid email address.</Trans>,
  },
  password: {
    validate: isStrongPassword,
    error: (
      <Trans id="validation.passwordError">
        Password must be 6-20 characters with uppercase, lowercase, number, and special character.
      </Trans>
    ),
  },
  repeatPassword: {
    validate: (v, original = '') => v === original,
    error: <Trans id="validation.repeatPasswordError">Passwords do not match.</Trans>,
  },
  phone: {
    validate: (v) => /^\d+$/.test(v),
    error: <Trans id="validation.phoneError">Only numbers are allowed.</Trans>,
  },
};
