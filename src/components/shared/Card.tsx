import clsx from 'clsx';
import { ReactNode } from 'react';
import { Heading } from './Heading';

interface Props {
  title?: string;
  size?: 'md' | 'lg' | 'xl' | '2xl';
  children: ReactNode;
  action?: ReactNode;
}

export function Card({ title, size = 'md', children, action }: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full border bg-white px-6 py-8 rounded-xl shadow-md',
        {
          'max-w-md': size === 'md'
        }
      )}
    >
      {(title || action) && (
        <div className='flex items-center justify-between mb-6'>
          {title && <Heading>{title}</Heading>}
          {action}
        </div>
      )}

      {children}
    </div>
  );
}
