interface Props {
  title: string;
  error?: Error;
}

export function ErrorMessage({ title, error }: Props) {
  if (!error) return null;

  return (
    <div className='rounded-md bg-red-50 border-2 border-red-500 border-opacity-50 p-4 space-y-1'>
      {title && <h3 className='text-sm font-medium text-red-800'>{title}</h3>}
      <div className='text-sm text-red-700'>{error.message}</div>
    </div>
  );
}
