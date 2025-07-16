"use client";
import React from "react"

export default function Button({ buttonStateType, children, disabled, onClick }) {
    const buttonStyles = {
        primary: 'bg-primary-gradient text-white rounded-xl shadow-md px-6 py-3 hover:brightness-110 hover:shadow-lg',
        primary_register: 'bg-modal-gradient text-white rounded-xl shadow-md px-6 py-3 hover:brightness-110 hover:shadow-lg',
        secondary: 'bg-white text-primary border border-gray-300 rounded-xl shadow-sm px-6 py-3 hover:bg-[#EEF3FF] hover:border-[#A3B4FF]',
        tertiary: 'text-primary hover:underline'
    };
    const disabledStyles = {
        primary: 'bg-disabled-gradient text-gray-400 rounded-xl px-6 py-3 cursor-not-allowed',
        secondary: 'bg-gray-200 text-gray-400 border border-gray-300 rounded-xl px-6 py-3 cursor-not-allowed',
        tertiary: 'text-gray-400 cursor-not-allowed'
    };

    const className = disabled ? disabledStyles[buttonStateType] : buttonStyles[buttonStateType]

    return (
        <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
    )
}