import React from 'react';

export type InputVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type InputFieldType = 'name' | 'email' | 'password' | 'repeatPassword' | 'phone';

export interface InputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string; // Displayed above the input
  fieldType: InputFieldType; // Used for validation and input behavior
  placeholder?: string;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string; // External error message
  autoComplete?: boolean;
  originalPassword?: string; // For repeatPassword validation
}
