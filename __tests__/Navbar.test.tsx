import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from '@/components/NavBar';
import React from 'react';

// Mock Next.js navigation hooks at the top level
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
  }),
  usePathname: () => '/en',
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

import { I18nTestWrapper } from './utils/TestWrapper';

describe('NavBar', () => {
  beforeEach(() => {
    // Clear localStorage to ensure a clean state for each test
    localStorage.clear();
    // Clear all mocks
    jest.clearAllMocks();
  });

  it('renders the Logo and Nav buttons', () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

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

  it('displays language toggle with EN label by default', () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('has correct Tailwind classes on the outermost div', () => {
    const { container } = render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass(
      'fixed',
      'left-0',
      'top-0',
      'z-10',
      'flex',
      'w-[100vw]',
      'items-center',
      'justify-around',
      'pt-5'
    );
  });

  it('displays English navigation items by default', () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

    // It would display English navigation items by default
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Check Items')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Try HelloCity')).toBeInTheDocument();
  });

  it('calls router.push when language toggle is clicked', async () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

    const toggle = screen.getByRole('checkbox');
    
    // Click to switch language
    fireEvent.click(toggle);

    // Wait for the router.push to be called
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('renders sign in button when not logged in', () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Try HelloCity')).toBeInTheDocument();
  });

  it('renders all navigation buttons as links', () => {
    render(
      <I18nTestWrapper>
        <NavBar />
      </I18nTestWrapper>
    );

    // Check that navigation items are rendered as links
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const chatLink = screen.getByRole('link', { name: /Chat/i });
    const tryHelloCityLink = screen.getByRole('link', { name: /Try HelloCity/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(chatLink).toHaveAttribute('href', '/');
    expect(tryHelloCityLink).toHaveAttribute('href', '/');
  });
});
