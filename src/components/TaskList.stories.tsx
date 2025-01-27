import { Meta, StoryObj } from '@storybook/react';
import { TaskList } from './TaskList';
import * as TaskStories from './Task.stories';
const meta: Meta<typeof TaskList> = {
  component: TaskList,
  argTypes: {
    onTaskToggleCompletion: { action: 'onTaskToggleCompletion' },
    onTaskToggleImportant: { action: 'onTaskToggleImportant' },
  },
};

export default meta;

type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
  args: {
    ...TaskStories.default.args,
    tasks: [
      { id: '1', title: 'Task #1' },
      { id: '2', title: 'Task #2' },
      { id: '3', title: 'Task #3' },
      { id: '4', title: 'Task #4' },
      { id: '5', title: 'Task #5' },
    ],
  },
};

export const WithImportant = {
  args: {
    tasks: [
      ...(Default.args?.tasks?.slice(0, 3) ?? []),
      { id: '4', title: 'Task #4', isImportant: true },
      { id: '5', title: 'Task #5', isImportant: true },
    ],
  },
};

export const WithCompleted = {
  args: {
    tasks: [
      { id: '1', title: 'Task #1', isCompleted: true },
      { id: '2', title: 'Task #2', isCompleted: true },
      ...(Default.args?.tasks?.slice(2, 10) ?? []),
    ],
  },
};
