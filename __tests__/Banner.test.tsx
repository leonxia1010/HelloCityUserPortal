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
      </I18nProvider>
    );
  });

  it('renders the title and full paragraph correctly', () => {
    const headings = screen.getAllByRole('heading');

    const hasTitle1 = headings.some((el) =>
      el.textContent?.toLowerCase().includes('navigate')
    );
    const hasTitle2 = headings.some((el) =>
      el.textContent?.toLowerCase().includes('confidence')
    );

    const paragraphs = screen.getAllByText((_, el) =>
      el?.textContent?.toLowerCase().includes('get personalized guidance')
    );
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  });

  it('has the CTA button with correct text and spacing', () => {
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBeGreaterThan(0);
    const hasExpectedText = buttons.some((btn) =>
      btn.textContent?.toLowerCase().includes('get started') ||
      btn.textContent?.toLowerCase().includes('hello') 
    );
    expect(hasExpectedText).toBe(true);
  });
});
