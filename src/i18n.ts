import { i18n } from '@lingui/core';

// 加载消息目录
import { messages as enMessages } from './locales/en/messages';
import { messages as zhMessages } from './locales/zh/messages';

i18n.loadLocaleData({
  en: { plurals: (n: number) => (n === 1 ? 0 : 1) },
  zh: { plurals: () => 0 },
});

i18n.load({
  en: enMessages,
  zh: zhMessages,
});

i18n.activate('en');

export { i18n };