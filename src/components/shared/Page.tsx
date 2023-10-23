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
    // <div className='w-full max-w-xl flex-1 mx-auto p-2 sm:px-6 sm:py-4 lg:px-8'>
    <div className="relative mx-auto w-full max-w-xl flex-1 overflow-y-auto">
      <div className="flex flex-col space-y-4 rounded-lg bg-white/5 p-4">
        {(href || title) && (
          <div className="mb-2 flex items-center space-x-2">
            {href && (
              <Button href={href} className="">
                <div className="flex items-center justify-center rounded-full bg-brand-300 p-2 text-brand-700">
                  <ChevronLeftIcon className="h-4 w-4" />
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
