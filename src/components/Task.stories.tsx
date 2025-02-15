import type { Meta, StoryObj } from '@storybook/react';

import { Task } from './Task';

const meta: Meta<typeof Task> = {
  component: Task,
  title: 'Components/Tasks/Task',
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
  argTypes: {
    onToggleCompletion: { action: 'onToggleCompletion' },
    onToggleImportant: { action: 'onToggleImportant' },
  },
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
    isCompleted: true,
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
