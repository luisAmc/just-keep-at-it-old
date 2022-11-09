import { ReactNode } from 'react';
import { Heading } from './Heading';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Page({ title, action, children }: Props) {
  return (
    <div className='h-full w-full max-w-xl flex-1 mx-auto p-2 sm:px-6 sm:py-4 lg:px-8'>
      {(title || action) && (
        <div className='flex items-center justify-between mb-6'>
          {title ? <Heading>{title}</Heading> : <div></div>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
