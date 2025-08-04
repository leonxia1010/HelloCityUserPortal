import React, { useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import InputBox from '../components/InputBox/InputBox';

export default {
  title: 'InputBox',
  component: InputBox,
} as Meta<typeof InputBox>;

export const InteractiveDemo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <InputBox
        label="Name"
        fieldType="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputBox
        label="Phone"
        fieldType="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <InputBox
        label="Email"
        fieldType="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
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
    </div>
  );
};

export const EmailError = {
  args: {
    label: 'Email',
    fieldType: 'email',
    value: 'invalid-email',
    errorMessage: 'Please enter a valid email address.',
  },
};
