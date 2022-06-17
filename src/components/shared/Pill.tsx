import clsx from 'clsx';

interface Props {
  text: string;
  color?: 'success' | 'mono';
}

export function Pill({ text, color = 'mono' }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex font-semibold rounded-full px-2 text-xs leading-5',
        {
          'bg-green-100 text-green-800': color === 'success',
          'bg-gray-100 text-gray-800': color === 'mono'
        }
      )}
    >
      {text}
    </span>
  );
}
