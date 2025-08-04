'use client';

import React from 'react';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import type { Dayjs } from 'dayjs';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
}) => {
  return (

    <div style={{ width: '300px' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: TextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            inputProps: {
              'aria-label': label || 'datepicker',
            },
          },
        }}
        
      />
    </LocalizationProvider>
      </div>
  );
};

export default DatePicker;
