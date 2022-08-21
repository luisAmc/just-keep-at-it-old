import { Button } from './Button';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Heading } from './Heading';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  href?: string;
  title?: string;
  size?: 'md' | 'lg' | 'xl' | '2xl';
  children: ReactNode;
  action?: ReactNode;
}

export function Card({ href, title, size = 'md', children, action }: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full border bg-white px-6 py-8 rounded-xl shadow-md',
        {
          'max-w-md': size === 'md',
          'max-w-lg': size === 'lg',
          'max-w-xl': size === 'xl'
        }
      )}
    >
      {href && (
        <div className='flex mb-2'>
          <Button
            href={href}
            className='flex items-center pr-2 rounded-full bg-transparent hover:bg-gray-200 transition-colors ease-in-out'
          >
            <ChevronLeftIcon className='w-4 h-4' />
            <span className='ml-1'>Regresar</span>
          </Button>
        </div>
      )}

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
