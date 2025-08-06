import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@/i18n';
import messages from '@/locales/en/messages.js';
import Banner from '@/components/Banner';

describe('BannerText', () => {
  beforeEach(() => {
    i18n.load('en', messages.messages);
    i18n.activate('en');

    render(
      <I18nProvider i18n={i18n}>
        <Banner />
      </I18nProvider>,
    );
  });

  it('renders the title and full paragraph correctly', () => {
    expect(screen.getAllByText(/navigate your new city with/i)).toHaveLength(1);
    expect(screen.getAllByText(/confidence/i)).toHaveLength(1);

    const paragraphs = screen.getAllByText((_, el) =>
      el?.textContent?.includes('Get personalized guidance'),
    );
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  });

  it('has the CTA button with correct text and spacing', () => {
    const buttons = screen.getAllByRole('button');

    // 所有按钮都存在
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => {
      expect(btn.textContent?.toLowerCase()).toContain('hello');

      const computedMargin = getComputedStyle(btn).marginTop;
      expect(computedMargin).toMatch(/6px|12px/);
    });
  });
});
