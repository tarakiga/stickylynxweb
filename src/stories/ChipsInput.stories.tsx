import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ChipsInput from '../components/ChipsInput';

const meta: Meta<typeof ChipsInput> = {
  title: 'Components/ChipsInput',
  component: ChipsInput,
};
export default meta;

type Story = StoryObj<typeof ChipsInput>;

export const Default: Story = {
  render: (args) => {
    const [chips, setChips] = useState<string[]>([]);
    return (
      <ChipsInput
        {...args}
        label="Tags"
        value={chips}
        onChange={setChips}
        placeholder="Type and press Enter or comma"
      />
    );
  },
}; 