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
    expect(screen.getByLabelText(/cn/i)).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.getByLabelText(/en/i)).toBeInTheDocument();
  });

});
