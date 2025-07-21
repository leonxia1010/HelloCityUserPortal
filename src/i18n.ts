import { i18n } from '@lingui/core'

// 加载消息目录
import { messages as enMessages } from './locales/en/messages'
import { messages as zhMessages } from './locales/zh/messages'

// 初始化i18n实例 - 使用简化的plurals配置
i18n.loadLocaleData({
    en: { plurals: (n: number) => n === 1 ? 0 : 1 },  // 简单的英文复数规则
    zh: { plurals: () => 0 },  // 中文没有复数形式
})

// 预加载翻译
i18n.load({
    en: enMessages,
    zh: zhMessages,
})

// 激活默认语言
i18n.activate('en')

export { i18n }