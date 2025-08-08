import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import InputBox from './InputBox';

// TODO: 抽出去到stories文件夹里
// TODO: primary里的每一个种类都可以变成一个storybook的例子
// TODO: storybook是按照variant来划分的，不是按照状态分的，你这个是把正常状态和错误状态分城了两个，这是对storybook的理解出了问题

const meta: Meta<typeof InputBox> = {
  title: 'InputBox',
  component: InputBox,
};
export default meta;

export const Primary = () => {
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
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
      {/* <InputBox
        label="Email"
        fieldType="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /> */}
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

export const Email = () => {
  const [email, setEmail] = useState('');

  return (
    <InputBox
      label="Email"
      fieldType="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  );
};

export const EmailError: StoryObj<typeof InputBox> = {
  args: {
    label: 'Email',
    fieldType: 'email',
    value: 'invalid-email',
    errorMessage: 'Please enter a valid email address.',
  },
};
