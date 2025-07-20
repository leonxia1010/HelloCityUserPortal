'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
        setLanguageState(lang)
        // 保存到 localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang)
        }
    }

    useEffect(() => {
        // 从 localStorage 加载保存的语言
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
                setLanguageState(savedLanguage)
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