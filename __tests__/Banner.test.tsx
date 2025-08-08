import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@/i18n';
import messages from '@/locales/en/messages.js';
import Banner from '@/components/Banner';

describe('BannerText', () => {
  beforeEach(() => {
    // ✅ 保留 i18n 初始化（可挪入 setupTests.ts）
    i18n.load('en', messages.messages);
    i18n.activate('en');

    render(
      <I18nProvider i18n={i18n}>
        <Banner isCustom />
      </I18nProvider>,
    );
  });

  it('renders title and paragraph correctly', () => {
    // ✅ 用 heading role 来查找 h2
    const headings = screen.getAllByRole('heading');
    const hasTitle1 = headings.some((el) =>
      el.textContent?.toLowerCase().includes('navigate your new city with'),
    );
    const hasTitle2 = headings.some((el) => el.textContent?.toLowerCase().includes('confidence'));

    expect(hasTitle1).toBe(true);
    expect(hasTitle2).toBe(true);

    // ✅ 用 p 元素找 paragraph 内容
    const paragraphs = screen.getAllByText((_, el) =>
      el?.textContent?.toLowerCase().includes('personalized guidance'),
    );
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('renders CTA button with correct text', () => {
    // ✅ 明确查找按钮名字包含 hello（按钮是 Try HelloCity）
    const button = screen.getByRole('button', { name: /hello/i });
    expect(button).toBeInTheDocument();
  });
});
