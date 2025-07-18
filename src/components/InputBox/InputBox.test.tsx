


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from './InputBox';

describe('InputBox component', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputBox
        label="Name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
      />
    );
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('displays error message when showError is true', () => {
    render(
      <InputBox
        label="Email"
        value="invalid"
        onChange={() => {}}
        showError
        errorMessage="Invalid email"
      />
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('disables input when disabled is true', () => {
    render(
      <InputBox
        label="Phone"
        value=""
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByLabelText('Phone')).toBeDisabled();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(
      <InputBox
        label="Name"
        value=""
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalled();
  });
});