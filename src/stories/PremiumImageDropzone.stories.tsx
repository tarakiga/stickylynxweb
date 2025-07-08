import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PremiumImageDropzone from '../components/PremiumImageDropzone';

const meta: Meta<typeof PremiumImageDropzone> = {
  title: 'Components/PremiumImageDropzone',
  component: PremiumImageDropzone,
};
export default meta;

type Story = StoryObj<typeof PremiumImageDropzone>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <PremiumImageDropzone
        {...args}
        value={value}
        onChange={file => setValue(URL.createObjectURL(file))}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <PremiumImageDropzone
      {...args}
      disabled
    />
  ),
}; 