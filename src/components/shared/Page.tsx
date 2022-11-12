import { ReactNode } from 'react';
import { Heading } from './Heading';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Page({ title, action, children }: Props) {
  return (
    <div className='w-full max-w-xl flex-1 mx-auto p-2 sm:px-6 sm:py-4 lg:px-8'>
      {(title || action) && (
        <div className='flex items-center justify-between mb-6'>
          {title ? <Heading>{title}</Heading> : <div></div>}
          {action}
        </div>
      )}
      <div className='bg-white/5 rounded-lg p-4 flex flex-col space-y-4'>
        {children}
      </div>
    </div>
  );
}
