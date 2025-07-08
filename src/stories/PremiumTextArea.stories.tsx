import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PremiumTextArea from '../components/PremiumTextArea';

const meta: Meta<typeof PremiumTextArea> = {
  title: 'Components/PremiumTextArea',
  component: PremiumTextArea,
};
export default meta;

type Story = StoryObj<typeof PremiumTextArea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <PremiumTextArea
        {...args}
        label="Description"
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
      <PremiumTextArea
        {...args}
        label="Bio"
        value={value}
        error={value === '' ? 'Bio is required' : undefined}
        onChange={e => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <PremiumTextArea
      {...args}
      label="Disabled"
      value=""
      disabled
    />
  ),
}; 