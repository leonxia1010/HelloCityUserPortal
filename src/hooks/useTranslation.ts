import { useLanguage } from '@/contexts/LanguageContext'

const translations = {
    en: {
        Home: 'Home',
        Chat: 'Chat',
        FAQ: 'FAQ',
        'Check Items': 'Check Items',
        Profile: 'Profile',
        Logout: 'Logout',
        Language: 'Language',
        'Sign In': 'Sign In',
        'Try HelloCity': 'Try HelloCity',
    },
    zh: {
        Home: '首页',
        Chat: '聊天',
        FAQ: '常见问题',
        'Check Items': '检查项目',
        Profile: '个人资料',
        Logout: '登出',
        Language: '语言',
        'Sign In': '登录',
        'Try HelloCity': '试用 HelloCity',
    },
}

export function useTranslation() {
    const { language } = useLanguage()

    const t = (key: string): string => {
        return translations[language][key] || key
    }

    return { t }
}