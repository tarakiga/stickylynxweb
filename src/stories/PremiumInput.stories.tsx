import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PremiumInput from '../components/PremiumInput';

const meta: Meta<typeof PremiumInput> = {
  title: 'Components/PremiumInput',
  component: PremiumInput,
};
export default meta;

type Story = StoryObj<typeof PremiumInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <PremiumInput
        {...args}
        label="Name"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <PremiumInput
        {...args}
        label="Email"
        value={value}
        error={value === '' ? 'Email is required' : undefined}
        onChange={e => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <PremiumInput
      {...args}
      label="Disabled"
      value=""
      disabled
    />
  ),
}; 