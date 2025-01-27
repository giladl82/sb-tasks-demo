import type { Task as TaskType } from '@models/task';
import { Task } from './Task';

export type TaskListProps = {
  tasks: TaskType[];
  onTaskToggleCompletion: (id: string) => Promise<void>;
  onTaskToggleImportant: (id: string) => Promise<void>;
};
export function TaskList(props: TaskListProps) {
  const { tasks, onTaskToggleCompletion, onTaskToggleImportant } = props;


  if (tasks.length === 0) {
    return (
      <div className="flex justify-center border border-black p-8 align-middle text-4xl">
        No tasks
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
