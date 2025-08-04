// File: src/components/DatePicker.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from '@/components/DatePicker';
import dayjs from 'dayjs';
import { jest } from '@jest/globals';

// Helper: test wrapper to avoid repeating LocalizationProvider
const renderDatePicker = (props: {
  value: dayjs.Dayjs | null;
  onChange: (value: dayjs.Dayjs | null) => void;
  label?: string;
  disabled?: boolean;
}) => {
  render(<DatePicker {...props} />);
};

describe('DatePicker Component', () => {
  it('renders with label', () => {
    renderDatePicker({
      value: dayjs(),
      onChange: jest.fn(),
      label: 'Pick a date',
    });

    // Check that the label exists
    expect(screen.getByLabelText('Pick a date')).toBeInTheDocument();
  });

  it('disables the input when disabled is true', () => {
    renderDatePicker({
      value: dayjs(),
      onChange: jest.fn(),
      label: 'Disabled Date',
      disabled: true,
    });

    const input = screen.getByLabelText('Disabled Date');
    expect(input).toBeDisabled();
  });

  it('calls onChange when date is changed manually', () => {
    const handleChange = jest.fn();

    renderDatePicker({
      value: dayjs('2025-08-01'),
      onChange: handleChange,
      label: 'Change Date',
    });

    const input = screen.getByLabelText('Change Date');
    fireEvent.change(input, { target: { value: '08/03/2025' } });
    fireEvent.blur(input); // simulate focus out

    expect(handleChange).toHaveBeenCalled();
  });
});
