import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfileCard from '../src/components/UserLabel';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => (
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

describe('Userlabel component test', () => {

  it('Correctly render incoming user data', () => {
    render(<UserProfileCard {...mockUserData} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('@nikeJohn')).toBeInTheDocument();
    expect(screen.getByText(/last login: 2023-10-15 14:30/i)).toBeInTheDocument();

    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('When missing some data, show default values', () => {
    render(<UserProfileCard />);
    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getByText('@UnknownNickname')).toBeInTheDocument();
    expect(screen.getByText(/last login: unknown/i)).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('@nikeJohn')).not.toBeInTheDocument();
    expect(screen.queryByText(/last login: 2023-10-15 14:30/i)).not.toBeInTheDocument();
  });

  it('When no avatar is provided, show placeholder icon', () => {
    render(<UserProfileCard UserName="SecondName" PreferredName="SecondNickname" />);
    const placeholderIcon = screen.getByText('account_circle');
    expect(placeholderIcon).toBeInTheDocument();
    expect(placeholderIcon).toHaveClass('material-icons text-7xl text-gray-400');
    expect(screen.queryByAltText('User Avatar')).not.toBeInTheDocument();
  });

  it('Applies the correct style classes', () => {
    const { container } = render(<UserProfileCard {...mockUserData} />);
    const card = container.firstChild;
    expect(card).toHaveClass('bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl');

    const avatarContainer = screen.getByTestId('avatar-container');
    expect(avatarContainer).toHaveClass('w-20 h-20 rounded-full border-4 border-white');

    const userName = screen.getByText('John');
    expect(userName).toHaveClass('text-xl font-bold');

    const nickname = screen.getByText('@nikeJohn');
    expect(nickname).toHaveClass('text-indigo-200');
  });

  it('Displays the time icon', () => {
    render(<UserProfileCard {...mockUserData} />);
    const timeIcon = screen.getByText('access_time');
    expect(timeIcon).toBeInTheDocument();
    expect(timeIcon).toHaveClass('material-icons text-base text-indigo-200');
  });

  it('When avatar is provided, uses the correct size', () => {
    render(<UserProfileCard {...mockUserData} />);
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toHaveAttribute('width', '64');
    expect(avatar).toHaveAttribute('height', '64');
  });
});