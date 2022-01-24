import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  text?: string;
  children?: ReactNode;
}

export function Message({ type, title, text, children }: Props) {
  if (!text && !children) return null;

  return (
    <div
      className={clsx('rounded-md border-2 border-opacity-50 p-4 space-y-1', {
        'bg-teal-50 border-teal-500': type === 'success',
        'bg-yellow-50 border-yellow-500': type === 'warning',
        'bg-red-50 border-red-500': type === 'error',
        'bg-sky-50 border-sky-500': type === 'info'
      })}
    >
      <h3
        className={clsx('text-sm font-medium', {
          'text-teal-800': type === 'success',
          'text-yellow-800': type === 'warning',
          'text-red-800': type === 'error',
          'text-sky-800': type === 'info'
        })}
      >
        {title}
      </h3>

      <div
        className={clsx('text-sm', {
          'text-teal-700': type === 'success',
          'text-yellow-700': type === 'warning',
          'text-red-700': type === 'error',
          'text-sky-700': type === 'info'
        })}
      >
        {text}
        {children}
      </div>
    </div>
  );
}
