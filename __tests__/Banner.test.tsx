import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@/i18n';
import Banner from '@/components/Banner';

describe('BannerText', () => {
  beforeEach(() => {
    // 模拟翻译内容：用 key => text 直接映射
    i18n.load('en', {
      'banner.title1': 'Navigate your new city with',
      'banner.title2': 'Confidence',
      'banner.paragraph':
        'Get personalized guidance step by step checklists, and timeline planning for setting into any city. Whether you\'re a tourist, student or migrant',
      'banner.cta': 'Try HelloCity',
    });
    i18n.activate('en');

    render(
      <I18nProvider i18n={i18n}>
        <Banner />
      </I18nProvider>
    );
  });

  it('renders both heading titles', () => {
    const headings = screen.getAllByRole('heading');
    const hasTitle1 = headings.some(h =>
      h.textContent?.toLowerCase().includes('navigate')
    );
    const hasTitle2 = headings.some(h =>
      h.textContent?.toLowerCase().includes('confidence')
    );

    expect(hasTitle1).toBe(true);
    expect(hasTitle2).toBe(true);
  });

  it('renders the full paragraph text', () => {
    const paragraph = screen.getByText((content) =>
      content.includes('Get personalized guidance') &&
      content.includes('Whether you\'re a tourist')
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('renders the CTA button correctly', () => {
    const btn = screen.getByRole('button', { name: /try hellocity/i });
    expect(btn).toBeInTheDocument();
  });
});
