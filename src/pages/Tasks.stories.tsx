import { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { within, expect } from '@storybook/test';

import { Tasks } from './Tasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const meta: Meta<typeof Tasks> = {
  component: Tasks,
  title: 'Pages/Tasks',
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Tasks>;

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/tasks', async () => {
          return HttpResponse.json([
            {
              id: '1',
              title: 'Task 1',
              isCompleted: false,
              isImportant: false,
            },
            { id: '2', title: 'Task 2', isCompleted: true, isImportant: false },
            { id: '3', title: 'Task 3', isCompleted: false, isImportant: true },
          ]);
        }),
      ],
    },
  },
};

export const Loading: Story = {
  beforeEach: () => {
    queryClient.clear();
  },
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/tasks', async () => {
          await delay(1000);
          return HttpResponse.json([
            {
              id: '1',
              title: 'Task 1',
              isCompleted: false,
              isImportant: false,
            },
          ]);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = await canvas.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  },
};
