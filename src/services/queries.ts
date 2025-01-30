import { Task } from '@models/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllTasks = () => {
  const info = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks,
  });

  return info;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedTask: Task) => updateTaskInfo(updatedTask),
    // // When mutate is called:
    onMutate: async (updatedTask) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData(['tasks']) as Task[];

      const updatedTaskIndex = previousTasks.findIndex(
        (task) => task.id === updatedTask.id,
      );

      const updatedTasks = [...previousTasks];
      updatedTasks[updatedTaskIndex] = updatedTask;

      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], updatedTasks);

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    // If the mutation fails, use the context we returned above
    onError: (_, _2, context) => {
      if (!context) return;

      queryClient.setQueryData(['tasks'], context.previousTasks);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

const apiUrl = 'http://localhost:3000';
const fetchAllTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`);
  const json = await response.json();

  return json;
};

const updateTaskInfo = async (updatedTask: Task) => {
  const response = await axios.put(`${apiUrl}/tasks/${updatedTask.id}`, {
    ...updatedTask,
  });
  return response.data;
};
