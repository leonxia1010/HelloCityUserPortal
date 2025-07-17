import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, Stack } from '@mui/material';

interface ButtonDisplayProps {
  variant: 'primary' | 'secondary' | 'tertiary';
}

const ButtonDisplay: React.FC<ButtonDisplayProps> = ({ variant }) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ padding: '20px' }}>
      <Button variant={variant}>
        {`${variant} button active`}
      </Button>
      <Button variant={variant} disabled>
        {`${variant} button disabled`}
      </Button>
    </Stack>
  );
};

const meta: Meta<typeof ButtonDisplay> = {
  title: 'Components/ButtonDisplay',
  component: ButtonDisplay,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ButtonDisplay>;

export default meta;
type Story = StoryObj<typeof ButtonDisplay>;

export const Primary: Story = {
  render: () => 
  <ButtonDisplay variant='primary' />
};

export const Secondary: Story = {
  render: (): React.ReactElement => (
    <ButtonDisplay variant='secondary' />
  ),
};

export const Tertiary: Story = {
  render: (): React.ReactElement => (
    <div style={{ backgroundColor: '#292929', padding: '20px' }}>
      <ButtonDisplay variant='tertiary' />
    </div>
  ),
};