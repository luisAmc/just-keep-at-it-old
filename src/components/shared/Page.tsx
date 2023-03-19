import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';

interface Props {
  title?: string;
  href?: string;
  children: ReactNode;
}

export function Page({ title, href, children }: Props) {
  return (
    <div className='w-full max-w-xl flex-1 mx-auto p-2 sm:px-6 sm:py-4 lg:px-8'>
      <div className='bg-white/5 rounded-lg p-4 flex flex-col space-y-4'>
        {(href || title) && (
          <div className='flex items-center space-x-2 mb-2'>
            {href && (
              <Button href={href} className=''>
                <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
                  <ChevronLeftIcon className='w-4 h-4' />
                </div>
              </Button>
            )}

            {title && <Heading>{title}</Heading>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
