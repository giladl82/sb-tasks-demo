import type { Task as TaskType } from '@models/task';

import { Task } from './Task';

export type TaskListProps = {
  tasks: TaskType[];
  onTaskToggleCompletion: (task: TaskType) => Promise<void>;
  onTaskToggleImportant: (task: TaskType) => Promise<void>;
};

export function TaskList(props: TaskListProps) {
  const { tasks, onTaskToggleCompletion, onTaskToggleImportant } = props;

  if (tasks.length === 0) {
    return (
      <div className="absolute top-[50%] left-[50%] flex h-[50vh] w-[50%] translate-[-50%] items-center justify-center border-4 border-blue-500 text-center text-4xl text-blue-600 shadow-md shadow-amber-400">
        There are no tasks to display
      </div>
    );
  }

  const importantTasks = tasks.filter((t) => t.isImportant && !t.isCompleted);
  const normalTasks = tasks.filter((t) => !t.isCompleted && !t.isImportant);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  return (
    <ul>
      {(
        [...importantTasks, ...normalTasks, ...completedTasks] as TaskType[]
      ).map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggleCompletion={onTaskToggleCompletion}
          onToggleImportant={onTaskToggleImportant}
        />
      ))}
    </ul>
  );
}
