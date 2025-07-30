'use client';
import React, { FC } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant: 'primary' | 'primary_register' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

//this part will be removed once apllied MUI
//----------------------
const baseStyles = 'rounded-xl px-6 py-3 font-semibold transition';
const commonEnabledGradient = 'text-white shadow-md hover:brightness-110 hover:shadow-lg';
const commonDisabledGradient =
  'bg-disabled-gradient text-gray-400 shadow-none cursor-not-allowed opacity-70';
const buttonStyles: Record<ButtonProps['variant'], { enabled: string; disabled: string }> = {
  primary: {
    enabled: `bg-primary-gradient ${commonEnabledGradient}`,
    disabled: commonDisabledGradient,
  },
  primary_register: {
    enabled: `bg-modal-gradient ${commonEnabledGradient}`,
    disabled: commonDisabledGradient,
  },
  secondary: {
    enabled:
      'bg-white text-primary border border-gray-300 shadow-sm hover:bg-[#EEF3FF] hover:border-[#A3B4FF]',
    disabled: 'bg-[#F3F3F3] text-[#A0A0A0] border border-[#DCDCDC] shadow-none cursor-not-allowed',
  },
  tertiary: {
    enabled: 'text-primary hover:underline',
    disabled: 'text-[#BBBBBB] cursor-not-allowed',
  },
};
//----------------------

const Button: FC<ButtonProps> = ({ variant, children, disabled, onClick }) => {
  //this part will be modified once applied MUI
  const buttonClass = clsx(
    baseStyles,
    disabled ? buttonStyles[variant].disabled : buttonStyles[variant].enabled,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
