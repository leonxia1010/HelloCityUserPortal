import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfileCard from '../src/components/UserLabel';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => (
    // TODO: 首先不能有any，哪怕自定义也要自定义出一个type来
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  ),
}));

const mockUserData = {
  UserName: 'John',
  PreferredName: 'nikeJohn',
  Avatar: 'https://example.com/avatar.jpg',
  LastJoinDate: '2023-10-15 14:30',
};

const renderUserLabel = (props = {}) => {
  return render(<UserProfileCard {...props} />);
};

describe('UserLabel component test', () => {
  it('Correctly render incoming user data', () => {
    renderUserLabel(mockUserData);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('@nikeJohn')).toBeInTheDocument();
    expect(screen.getByText(/last login: 2023-10-15 14:30/i)).toBeInTheDocument();

    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument(); // TODO: 你要是有后续的测试，那toBeInTheDocument不用测
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('When missing some data, show default values', () => {
    renderUserLabel({
      UserName: undefined,
      PreferredName: undefined,
      Avatar: undefined,
      LastJoinDate: undefined,
    });
    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getByText('@UnknownNickname')).toBeInTheDocument();
    expect(screen.getByText(/last login: unknown/i)).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('@nikeJohn')).not.toBeInTheDocument();
    expect(screen.queryByText(/last login: 2023-10-15 14:30/i)).not.toBeInTheDocument();
  });

  it('When no avatar is provided, show placeholder icon', () => {
    // TODO: 这个测试为什么不能和上面那个合并成一个呢？从语义上来说，都是没有数据显示default值的情况
    // render(<UserProfileCard UserName="SecondName" PreferredName="SecondNickname" />);
    renderUserLabel({ UserName: 'SecondName', PreferredName: 'SecondNickname' });
    const placeholderIcon = screen.getByText('account_circle');
    expect(placeholderIcon).toBeInTheDocument();
    expect(placeholderIcon).toHaveClass('material-icons text-7xl text-gray-400');
    expect(screen.queryByAltText('User Avatar')).not.toBeInTheDocument();
  });

  it('Applies the correct style classes', () => {
    // const { container } = render(<UserProfileCard {...mockUserData} />);
    const { container } = renderUserLabel(mockUserData);
    const card = container.firstChild;
    expect(card).toHaveClass(
      'bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl',
    );

    const avatarContainer = screen.getByTestId('avatar-container'); // 这三行都是这个问题
    expect(avatarContainer).toHaveClass('w-20 h-20 rounded-full border-4 border-white');

    // TODO: 你都测container了为什么不把image的classname也测一波

    const userName = screen.getByText('John');
    expect(userName).toHaveClass('text-xl font-bold');

    const nickname = screen.getByText('@nikeJohn'); // TODO: 只用一次的变量没必要赋值给一个变量，直接就 expect(screen.getByText('@nikeJohn')).toHaveClass('text-indigo-200');
    expect(nickname).toHaveClass('text-indigo-200');
  });

  it('Displays the time icon', () => {
    // render(<UserProfileCard {...mockUserData} />);
    renderUserLabel(mockUserData);
    const timeIcon = screen.getByText('access_time');
    expect(timeIcon).toBeInTheDocument(); // TODO: 这个不需要测，因为下面那一行过了上面这一行肯定过
    expect(timeIcon).toHaveClass('material-icons text-base text-indigo-200');
  });

  it('When avatar is provided, uses the correct size', () => {
    // render(<UserProfileCard {...mockUserData} />);
    renderUserLabel(mockUserData);
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toHaveAttribute('width', '64');
    expect(avatar).toHaveAttribute('height', '64');
  });
});
