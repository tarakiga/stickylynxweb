import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryCard from '../components/CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Components/CategoryCard',
  component: CategoryCard,
};
export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  args: {
    logo: '/public/globe.svg',
    title: 'World Cuisine',
    description: 'Explore a variety of international dishes and flavors from around the globe. Perfect for adventurous foodies!'
  },
}; 