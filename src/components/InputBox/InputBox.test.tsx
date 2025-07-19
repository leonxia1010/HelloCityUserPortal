import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from './InputBox';

describe('InputBox component', () => {
  it('Renders with label and placeholder', () => {
    render(
      <InputBox
        label="Name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
        fieldType="name"
      />
    );
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('Displays error message when errorMessage is provided', () => {
    render(
      <InputBox
        label="Email"
        value="invalid"
        onChange={() => {}}
        errorMessage="Invalid email"
        fieldType="email"
      />
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('Does not call onChange when input is disabled', () => {
    const handleChange = jest.fn();

    render(
      <InputBox
        label="Phone"
        value=""
        onChange={handleChange}
        disabled
        fieldType="phone"
      />
    );

    const input = screen.getByLabelText('Phone');
    expect(input).toBeDisabled();

    fireEvent.change(input, { target: { value: '123' } });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Calls onChange when input value changes', () => {
    const handleChange = jest.fn();

    render(
      <InputBox
        label="Name"
        value=""
        onChange={handleChange}
        fieldType="name"
      />
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
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
    const input = screen.getByLabelText('Phone');
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
    const input = screen.getByLabelText('Email');
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
      />
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
