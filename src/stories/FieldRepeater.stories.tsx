import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FieldRepeater from '../components/FieldRepeater';

const meta: Meta<typeof FieldRepeater> = {
  title: 'Components/FieldRepeater',
  component: FieldRepeater,
};
export default meta;

type Story = StoryObj<typeof FieldRepeater>;

export const Default: Story = {
  render: (args) => {
    const [fields, setFields] = useState(['']);
    return (
      <FieldRepeater
        {...args}
        label="Email"
        value={fields}
        onChange={setFields}
        inputProps={{ type: 'email', placeholder: 'Enter email' }}
      />
    );
  },
}; 