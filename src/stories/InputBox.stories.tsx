import React, { useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import InputBox from '@/components/InputBox';



const meta: Meta<typeof InputBox> = {
  title: 'InputBox',
  component: InputBox,
};

export default meta;

export const Name: React.FC = () => {
  const [name, setName] = useState('');
  return (
    <InputBox
      label="Name"
      fieldType="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  );
};

export const Phone: React.FC = () => {
  const [phone, setPhone] = useState('');
  return (
    <InputBox
      label="Phone"
      fieldType="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
    />
  );
};

export const Email: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setError('');
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    validateEmail(val);
  };

  return (
    <InputBox
      label="Email"
      fieldType="email"
      value={email}
      onChange={handleChange}
      required
      errorMessage={error}
    />
  );
};

export const Passwords: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <>
      <InputBox
        label="Password"
        fieldType="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputBox
        label="Repeat Password"
        fieldType="repeatPassword"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        originalPassword={password}
        required
      />
    </>
  );
};
