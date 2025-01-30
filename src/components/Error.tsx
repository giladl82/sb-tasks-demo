type ErrorProps = { error: Error };
export function Error(props: ErrorProps) {
  const { error } = props;
  if (!error) return null;

  return (
    <div
      role="alert"
      className="absolute right-4 bottom-4 flex items-center justify-center rounded-md border-2 border-red-400 bg-red-200 px-4 py-2 text-lg text-red-700"
    >
      {error.message}
    </div>
  );
}
