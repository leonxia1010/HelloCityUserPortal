'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { i18n } from '@/i18n'

type Language = 'en' | 'zh'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        // 激活Lingui语言
        i18n.activate(lang);
        // 保存到 localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }

    // 从 localStorage 加载语言设置
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
                setLanguage(savedLanguage)
            }
        }
    }, [])

    const value = {
        language,
        setLanguage,
        isEnglish: language === 'en'
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}