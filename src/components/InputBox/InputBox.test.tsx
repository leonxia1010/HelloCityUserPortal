import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from './InputBox';

// TODO: 这个可能是因为合并的原因，但是应该把test文件放在一起，标准要统一
// TODO: 这个文件我不手把手改了，照着其他几个文件的写法来改
/**
 * 1. 把render抽出来当个函数
 * 2. 你能知道把validation当成一个describe，这很好，这一部分本身也是InputBox的一部分，所以你需要把两个describe合并成一个，统一叫InputBox component，第一部分叫Static UI styles and children components
 * 3. 把onChange抽象成一个mock函数，然后测一下被call了几次
 */

describe('InputBox component', () => {
  it('Renders with label and placeholder', () => {
    render(
      <InputBox
        label="Name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
        fieldType="name"
      />,
    );
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('Displays error message when errorMessage is provided', () => {
    render(
      <InputBox
        label="Email"
        value="invalid"
        onChange={() => {}}
        errorMessage="Invalid email"
        fieldType="email"
      />,
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('Calls onChange when input value changes', () => {
    const handleChange = jest.fn();

    render(<InputBox label="Name" value="" onChange={handleChange} fieldType="name" />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('InputBox validation', () => {
  test('Shows required error when phone input is empty', () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState('123');
      return (
        <InputBox
          label="Phone"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          required
          fieldType="phone"
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByLabelText(/phone/i);
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('Phone is required.')).toBeInTheDocument();
  });

  test('Shows required error when email input is empty', () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState('abc');
      return (
        <InputBox
          label="Email"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          required
          fieldType="email"
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });

  test('Shows rule error for invalid format (custom rule)', () => {
    render(
      <InputBox
        label="Email"
        value="invalid"
        onChange={() => {}}
        errorMessage="Invalid email"
        fieldType="email"
      />,
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
