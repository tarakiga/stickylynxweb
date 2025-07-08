import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PremiumModal from '../components/PremiumModal';

const meta: Meta<typeof PremiumModal> = {
  title: 'Components/PremiumModal',
  component: PremiumModal,
};
export default meta;

type Story = StoryObj<typeof PremiumModal>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-yellow-500 text-white rounded">Open Modal</button>
        <PremiumModal {...args} isOpen={open} onClose={() => setOpen(false)}>
          <h2 className="text-xl font-bold mb-2">Premium Modal</h2>
          <p>This is a modal using the latest PremiumModal component.</p>
          <button onClick={() => setOpen(false)} className="mt-4 px-3 py-1 bg-gray-200 rounded">Close</button>
        </PremiumModal>
      </>
    );
  },
}; 