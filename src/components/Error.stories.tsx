import { Meta, StoryObj } from '@storybook/react';
import { Error } from './Error';

const meta: Meta<typeof Error> = {
  component: Error,
  title: 'Components/Helpers/Error',
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    error: {
      name: 'Error',
      message: 'An error occurred',
    },
  },
};
