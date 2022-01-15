import { ChevronLeftIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href?: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export function Container({
  href,
  title,
  action,
  children,
  size = 'lg'
}: Props) {
  return (
    <div
      className={clsx(
        'h-full sm:h-auto sm:my-8 w-full mx-auto sm:rounded-xl shadow-lg bg-white p-6',
        {
          'sm:max-w-lg': size === 'lg',
          'sm:max-w-xl': size === 'xl',
          'sm:max-w-2xl': size === '2xl',
          'sm:max-w-3xl': size === '3xl',
          'sm:max-w-4xl': size === '4xl',
          'sm:max-w-5xl': size === '5xl'
        }
      )}
    >
      {(title || action) && (
        <div className='flex items-center justify-between mb-4'>
          {(title || href) && (
            <div className='flex items-center space-x-3 '>
              {href && (
                <Link href={href} passHref>
                  <div className='bg-brand-50 hover:bg-brand-200 p-1 rounded-full hover:cursor-pointer'>
                    <ChevronLeftIcon className='w-5 h-5' />
                  </div>
                </Link>
              )}
              {title && <h1 className='text-3xl'>{title}</h1>}
            </div>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
