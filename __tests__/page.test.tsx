import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Page', () => {
  it('Renders a h2', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Navigate your new city with/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
