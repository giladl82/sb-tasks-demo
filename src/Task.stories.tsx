import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';

const meta: Meta<typeof Task> = {
  component: Task,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Task>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'This is a test Task',
  },
};

export const Completed: Story = {
  args: {
    ...Default.args,
    isCompleted: false,
  },
};

export const Important: Story = {
  args: {
    ...Default.args,
    isImportant: true,
  },
};

export const ImportantAndCompleted: Story = {
  args: {
    ...Default.args,
    isImportant: true,
    isCompleted: true,
  },
};
