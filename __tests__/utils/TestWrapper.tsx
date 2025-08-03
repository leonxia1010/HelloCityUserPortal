import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { I18nProvider } from '@/contexts/I18nProvider';

// Mock messages for testing
const mockMessages = {
  en: {
    "Home": "Home",
    "Chat": "Chat", 
    "FAQ": "FAQ",
    "Check Items": "Check Items",
    "Profile": "Profile",
    "Logout": "Logout",
    "Sign In": "Sign In",
    "Try HelloCity": "Try HelloCity"
  },
  zh: {
    "Home": "首页",
    "Chat": "聊天",
    "FAQ": "常见问题", 
    "Check Items": "检查项目",
    "Profile": "个人资料",
    "Logout": "登出",
    "Sign In": "登录",
    "Try HelloCity": "试用HelloCity"
  }
};

// This is a wrapper component that provides language context for testing purposes
export const I18nTestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <LanguageProvider>
    <I18nProvider initialLocale="en" initialMessages={mockMessages}>
    { children }
    </I18nProvider>
    </LanguageProvider>
);