"use client";
import React, { FC } from "react"

interface ButtonProps {
    variant: "primary" | "primary_register" | "secondary" | "tertiary";
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

//this part will be removed once apllied MUI
//----------------------
const baseStyles = "rounded-xl px-6 py-3 font-semibold transition";
const variantStyles: Record<ButtonProps["variant"], string> = {
    primary:
        "bg-primary-gradient text-white shadow-md hover:brightness-110 hover:shadow-lg",
    primary_register:
        "bg-modal-gradient text-white shadow-md hover:brightness-110 hover:shadow-lg",
    secondary:
        "bg-white text-primary border border-gray-300 shadow-sm hover:bg-[#EEF3FF] hover:border-[#A3B4FF]",
    tertiary: "text-primary hover:underline",
};
const disabledStyles: Record<ButtonProps["variant"], string> = {
    primary: "bg-disabled-gradient text-gray-400 shadow-none cursor-not-allowed opacity-70",
    primary_register: "bg-disabled-gradient text-gray-400 shadow-none cursor-not-allowed opacity-70",
    secondary: "bg-[#F3F3F3] text-[#A0A0A0] border border-[#DCDCDC] shadow-none cursor-not-allowed",
    tertiary: "text-[#BBBBBB] cursor-not-allowed",
};
//----------------------

const Button: FC<ButtonProps> = ({ variant, children, disabled, onClick }) => {
    //this part will be modified once applied MUI
    const buttonClass = `
        ${baseStyles}
        ${disabled ? disabledStyles[variant] : variantStyles[variant]}`;

    return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;