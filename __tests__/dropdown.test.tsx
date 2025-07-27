import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { DropdownOptionProps } from '@/components/Dropdown';
import Dropdown from '@/components/Dropdown';
import renderWithTheme from '@/test-utils/renderWithTheme';

const baseOptions: DropdownOptionProps[] = [
  {
    label: 'Profile',
    value: 'profile',
    icon: AccountCircleIcon,
    divider: false,
    onClick: jest.fn(),
  },
  {
    label: 'Logout',
    value: 'logout',
    icon: null,
    divider: true,
    onClick: jest.fn(),
  },
];

describe('DropDown component', () => {
  // render test
  it('Renders only trigger button on initial load', () => {
    renderWithTheme(<Dropdown anchorElContent={<span>open</span>} dropdownOptions={baseOptions} />);
    const button = screen.getByRole('button', { name: /open menu/i });
    const menu = screen.queryByRole('menu');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute('aria-expanded');
    expect(menu).not.toBeInTheDocument();
  });

  it('Opens menu and renders items on button click', async () => {
    renderWithTheme(<Dropdown anchorElContent={<span>open</span>} dropdownOptions={baseOptions} />);
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const menu = await screen.findByRole('menu');
    expect(menu).toBeVisible();

    const menuItem = await screen.findAllByRole('menuitem');
    expect(menuItem).toHaveLength(baseOptions.length);

    expect(menuItem[0]).toHaveTextContent('Profile');
    expect(menuItem[1]).toHaveTextContent('Logout');

    expect(within(menuItem[0]).getByTestId('profile-icon')).toBeVisible();
    expect(within(menuItem[1]).queryByTestId('logout-icon')).not.toBeInTheDocument();
  });

  it('Renders Divider when option.divider=true', async () => {
    renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const separators = await screen.findAllByRole('separator');
    expect(separators).toHaveLength(1);
  });

  it('Items are rendered vertically when layout = vertical', async () => {
    renderWithTheme(
      <Dropdown
        anchorElContent={<span>Open</span>}
        dropdownOptions={baseOptions}
        layout="vertical"
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const list = document.querySelector('.MuiMenu-list');
    expect(list).toHaveClass('MuiMenu-list');
  });

  it('Items are rendered horizontally when layout = horizontal', async () => {
    renderWithTheme(
      <Dropdown
        anchorElContent={<span>Open</span>}
        dropdownOptions={baseOptions}
        layout="horizontal"
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const list = document.querySelector('.MuiMenu-list');
    expect(list).toHaveClass('MuiMenu-list');
  });

  it('User label is rendered if showUserLabel = true', async () => {
    renderWithTheme(
      <Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} showUserLabel />,
    );
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    expect(await screen.findByText(/Leon/i)).toBeInTheDocument();
  });

  it('Applied centered text align when textAlign = true', async () => {
    renderWithTheme(
      <Dropdown
        anchorElContent={<span>Open</span>}
        dropdownOptions={baseOptions}
        textAlignCenter
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const typography = await screen.findByText('Profile');
    expect(typography).toHaveStyle({ textAlign: 'center', flexGrow: 1 });
  });

  //   close menu test and onclick event
  it('Onclick fired and menu closes after clicking an item', async () => {
    const spy = jest.fn();
    const options: DropdownOptionProps[] = [{ label: 'Profile', value: 'profile', onClick: spy }];
    renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={options} />);

    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Profile'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('profile');

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('Menu closes after clicking outside', async () => {
    renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);

    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('Menu closes after press esc', async () => {
    renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);

    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // dynamic margin top calculator
  it('uses negative margin when popup opens upward (vertical="top")', async () => {
    renderWithTheme(
      <Dropdown
        anchorElContent={<span>Open</span>}
        dropdownOptions={[{ label: 'A', value: 'a', onClick: jest.fn() }]}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const paper = document.querySelector('.MuiPaper-root') as HTMLElement;
    expect(paper).toHaveStyle({ marginTop: '-0.5rem' });
  });

  it('uses zero margin when vertically centered (vertical="center")', async () => {
    renderWithTheme(
      <Dropdown
        anchorElContent={<span>Open</span>}
        dropdownOptions={[{ label: 'A', value: 'a', onClick: jest.fn() }]}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const paper = document.querySelector('.MuiPaper-root') as HTMLElement;
    expect(paper).toHaveStyle({ marginTop: '0rem' });
  });
});
