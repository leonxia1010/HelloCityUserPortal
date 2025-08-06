// File: src/components/DatePicker.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import DatePicker from '../components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const SingleDate: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
      <div className="w-full max-w-xs">
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} label="Pick a date" />
      </div>
    );
  },
};
