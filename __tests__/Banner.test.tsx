import { render, screen } from '@testing-library/react';
import Banner from '@/components/Banner';

describe('BannerText', () => {
  beforeEach(() => {
    render(<Banner />);
  });
  // TODO: 所有block之间要有一行空行，有且只有一行
  /**TODO: 这个banner约等于是个静态组件，所以你要测这么几件事：
   * 1. 所有的text都render了，但是你只测了底下那些，你没测上面的title，而且你测title的时候需要测variant
   **/
  it('Render titles with correct typographys', () => {
    expect(
      screen.getByRole('heading', { name: /Navigate your new city with/, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText('confidence')).toHaveStyle({ color: 'rgb(25, 118, 210)' });
  });

  it('Renders the correct text with line breaks', () => {
    // TODO: 测试的所有名称都必须首字母大写
    expect(
      screen.getByText(/Get personalized guidance step by step checklists/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/planning for setting into any city/i)).toBeInTheDocument();
    expect(screen.getByText(/Whether you're a tourist, student or/i)).toBeInTheDocument();
    expect(screen.getByText(/migrant/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Try HelloCity/i })).toBeInTheDocument();
  });

  it('Has the CTA button with proper text and spacing', () => {
    const button = screen.getByRole('button', { name: /Try hellocity/i });
    expect(button).toBeInTheDocument(); // TODO: 有下面那行，这一行就不需要
    expect(button).toHaveStyle({ marginTop: '6px' });
  });
});
