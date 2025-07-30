import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/NavBar';
import React from 'react';

describe('NavBar', () => {
  beforeEach(() => {
    render(<NavBar />);
  });

  it('renders the Logo and Nav buttons', () => {
    expect(screen.getByAltText('HelloCity Logo')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const chatLink = screen.getByRole('link', { name: /Chat/i });
    expect(chatLink).toBeInTheDocument();
    // page component not implemented
    // expect(chatLink).toHaveAttribute('href', '/chat');

    const ctaLink = screen.getByRole('link', { name: /Try HelloCity/i });
    expect(ctaLink).toBeInTheDocument();
    // expect(ctaLink).toHaveAttribute('href', '/chat');
  });

  it('toggles language label between CN and EN', () => {
    const toggle = screen.getByRole('checkbox');

    // Initially CN label visible, both labels are rendered but only one is visible
    expect(screen.getByText(/cn/i)).toBeInTheDocument();
    expect(screen.queryByText(/en/i)).not.toBeInTheDocument();

    fireEvent.click(toggle);

    // EN label visible
    expect(screen.getByText(/en/i)).toBeInTheDocument();
    expect(screen.queryByText(/cn/i)).not.toBeInTheDocument();
  });

  it('has correct Tailwind classes on the outermost div', () => {
    const { container } = render(<NavBar />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass(
      'fixed',
      'w-[100vw]',
      'pt-5',
      'top-0',
      'left-0',
      'flex',
      'justify-around',
      'items-center',
      'z-10',
    );
  });
  //NavBar Login Test incomplete
});
