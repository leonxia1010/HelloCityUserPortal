import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/NavBar';
import React from 'react';

describe('NavBar', () => {
  it('renders the Logo and Nav buttons', () => {
    render(<NavBar />);

    expect(screen.getByAltText('HelloCity Logo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Chat/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Try HelloCity/i })).toBeInTheDocument();
  });

  it('toggles language label between CN and EN', () => {
    render(<NavBar />);
    const toggle = screen.getByRole('checkbox');

    // Initially: CN label visible, both labels are rendered but only one is visible
    expect(screen.getByText(/cn/i)).toBeInTheDocument();
    expect(screen.queryByText(/en/i)).not.toBeInTheDocument();

    fireEvent.click(toggle);

    // Now: EN label visible
    expect(screen.getByText(/en/i)).toBeInTheDocument();
    expect(screen.queryByText(/cn/i)).not.toBeInTheDocument();
  });

  //NavBar Login Test in
});
