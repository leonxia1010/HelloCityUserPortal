import { i18n } from '@lingui/core'
import { messages as enMessages } from './locales/en/messages'
import { messages as zhMessages } from './locales/zh/messages'

export const locales = {
    en: 'English',
    zh: '中文',
}

export const defaultLocale = 'en'

// 加载所有消息
i18n.load({
    en: enMessages,
    zh: zhMessages,
})

// 激活默认语言
i18n.activate(defaultLocale)

export { i18n }