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

    // 在 setLanguage 函数中添加日志
    const setLanguage = (lang: Language) => {
        console.log('Setting language to:', lang);
        setLanguageState(lang);
        // 激活Lingui语言
        console.log('Activating language in i18n:', lang);
        i18n.activate(lang);
        console.log('Current active language catalog:', i18n.locale, i18n._);
        // 保存到 localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
            console.log('Language saved to localStorage:', lang);
        }
    }

    // 在 useEffect 中添加日志
    useEffect(() => {
        // 从 localStorage 加载保存的语言
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language;
            console.log('Loaded language from localStorage:', savedLanguage);
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
                setLanguageState(savedLanguage);
                console.log('Activating saved language:', savedLanguage);
                i18n.activate(savedLanguage);
                console.log('Language activated from localStorage');
            }
        }
    }, [])

    const isEnglish = language === 'en'

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isEnglish }}>
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