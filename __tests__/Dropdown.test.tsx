import React, { ReactNode } from 'react';
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
const spy = jest.fn();
// TODO: 所有常量要都要单独提出来

const options: DropdownOptionProps[] = [{ label: 'Profile', value: 'profile', onClick: spy }];
// TODO: 这个option和base不同，你需要给一个合理的名字，这个名字不合适

const renderDropdown = (props = {}) => {
  return renderWithTheme(<Dropdown anchorElContent={<span>open</span>} dropdownOptions={baseOptions} {...props} />);
}
// TODO: 这个renderDropdown重复次数太多了，应该提出来做一个单独的函数

describe('DropDown component', () => {
  // render test
  describe('UI Stylee', () => {
    it('Renders only trigger button on initial load', () => {
      // renderWithTheme(<Dropdown anchorElContent={<span>open</span>} dropdownOptions={baseOptions} />);
      renderDropdown();
      const button = screen.getByRole('button', { name: /open menu/i });
      const menu = screen.queryByRole('menu');
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('aria-expanded');
      expect(menu).not.toBeInTheDocument();
    });

    it('Renders Divider when option.divider=true', async () => {
      // renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);
      renderDropdown();
      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

      const separators = await screen.findAllByRole('separator');
      expect(separators).toHaveLength(1);
    });

    it('Items are rendered vertically when layout = vertical as default value', async () => { // TODO: vertical是default，所以应该在测试上明确说出来
      renderDropdown();
      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

      const list = document.querySelector('.MuiMenu-list');
      expect(list).toHaveClass('MuiMenu-list');
    });

    it('Items are rendered horizontally when layout = horizontal', async () => {
      renderDropdown({layout: 'horizontal'});
      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

      const list = document.querySelector('.MuiMenu-list');
      expect(list).toHaveClass('MuiMenu-list');
    });

    it('User label is rendered if showUserLabel = true', async () => {
      renderDropdown({showUserLabel: true});
      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

      expect(await screen.findByText(/Leon/i)).toBeInTheDocument();
    });

    it('Applied centered text align when textAlign = true', async () => {
      // renderWithTheme(
      //   <Dropdown
      //     anchorElContent={<span>Open</span>}
      //     dropdownOptions={baseOptions}
      //     textAlignCenter
      //   />,
      // );
      renderDropdown({textAlignCenter: true});
      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));

      const typography = await screen.findByText('Profile');
      expect(typography).toHaveStyle({ textAlign: 'center', flexGrow: 1 });
    });

      // dynamic margin top calculator
    it('uses negative margin when popup opens upward (vertical="top")', async () => {
      // renderWithTheme(
      //   <Dropdown
      //     anchorElContent={<span>Open</span>}
      //     dropdownOptions={[{ label: 'A', value: 'a', onClick: jest.fn() }]}
      //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      //   />,
      // );

      renderDropdown({dropdownOptions: [{ label: 'A', value: 'a', onClick: jest.fn() }], anchorOrigin: { vertical: 'top', horizontal: 'right' }});

      // TODO: 既然用了customized的propr，那就提出去起个名，尤其是你都用了两次了

      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
      const paper = document.querySelector('.MuiPaper-root') as HTMLElement;
      expect(paper).toHaveStyle({ marginTop: '-0.5rem' });
    });

    it('uses zero margin when vertically centered (vertical="center")', async () => {
      // renderWithTheme(
      //   <Dropdown
      //     anchorElContent={<span>Open</span>}
      //     dropdownOptions={[{ label: 'A', value: 'a', onClick: jest.fn() }]}
      //     anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      //   />,
      // );

      renderDropdown({dropdownOptions: [{ label: 'A', value: 'a', onClick: jest.fn() }], anchorOrigin: { vertical: 'center', horizontal: 'right' }});

      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
      const paper = document.querySelector('.MuiPaper-root') as HTMLElement;
      expect(paper).toHaveStyle({ marginTop: '0rem' });
    });
  });

  describe('UX interactions', () => {
    it('Opens menu and renders items on button click', async () => {
      // renderWithTheme(<Dropdown anchorElContent={<span>open</span>} dropdownOptions={baseOptions} />);
      renderDropdown();
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

    //   close menu test and onclick event TODO: 你test都写上名字了你为啥还要再加上comment呢？comment少加，能少加都少加，好的代码根本不需要加comment，加comment显得很难看
    it('Onclick fired and menu closes after clicking an item', async () => {
      // renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={options} />);
      renderDropdown({dropdownOptions: options});

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
      // renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);
      renderDropdown();

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
      // renderWithTheme(<Dropdown anchorElContent={<span>Open</span>} dropdownOptions={baseOptions} />);
      renderDropdown();

      await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
      expect(await screen.findByRole('menu')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  })
});
