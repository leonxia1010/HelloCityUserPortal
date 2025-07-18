import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Page', () => {
  it('Renders a h1', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Hello World/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
