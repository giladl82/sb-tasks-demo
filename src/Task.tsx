import classNames from 'classnames';

type TaskProps = {
  id: string;
  title: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  onToggleCompletion: (id: string) => Promise<void>;
  onToggleImportant: (id: string) => Promise<void>;
};

export function Task(props: TaskProps) {
  const {
    id,
    title,
    isCompleted = false,
    isImportant = false,
    onToggleCompletion,
    onToggleImportant,
  } = props;

  const titleClassName = classNames({
    'text-gray-900 italic line-through': isCompleted,
  });

  const itemClassName = classNames({
    'mb-2 flex gap-2 border border-gray-500 p-4': true,
    'bg-gray-100': isCompleted,
  });

  const handleItemClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await onToggleCompletion(id);
  };

  const handleToggleImportant = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await onToggleImportant(id);
  };

  return (
    <li onClick={handleItemClick} className={itemClassName}>
      <input data-testid="toggle-completion" aria-label='toggle task completion' type="checkbox" checked={isCompleted} />{' '}
      <span data-testid="title" className={titleClassName}>{title}</span>
      <button data-testid="toggle-important" className="ml-auto" onClick={handleToggleImportant}>
        {isImportant ? '😎' : '🫥'}
      </button>
    </li>
  );
}
