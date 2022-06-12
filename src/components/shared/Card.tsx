import clsx from 'clsx';
import { ReactNode } from 'react';
import { Heading } from './Heading';

interface Props {
  title?: string;
  size?: 'md' | 'lg' | 'xl' | '2xl';
  children: ReactNode;
}

export function Card({ title, size = 'md', children }: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full border bg-white px-6 py-8 rounded-lg shadow-md',
        {
          'max-w-md': size === 'md'
        }
      )}
    >
      {title && (
        <div className='mb-6'>
          <Heading>{title}</Heading>
        </div>
      )}

      {children}
    </div>
  );
}
