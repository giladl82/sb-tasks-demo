import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { TaskList } from '@components/TaskList';
import { Task } from '@models/task';
import { useGetAllTasks, useUpdateTask } from '@services/queries';

export function Tasks() {
  const { data: tasks, isLoading, isError, error } = useGetAllTasks();
  const { mutate: updateTaskInfo } = useUpdateTask();
  
  const handleTaskToggleCompletion = async (task: Task) => {
    updateTaskInfo(task);
  };
  const handleTaskToggleImportant = async (task: Task) => {
    updateTaskInfo(task);
  };

  if (tasks) {
    return (
      <div className="h-[100vh] bg-gray-100 p-4">
        <header>
          <h1 className="mb-4 text-2xl underline">My tasks</h1>
        </header>
        <main className="bg-white p-4">
          <TaskList
            tasks={tasks}
            onTaskToggleCompletion={handleTaskToggleCompletion}
            onTaskToggleImportant={handleTaskToggleImportant}
          />
        </main>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return null;
}
