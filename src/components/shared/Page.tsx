import { ReactNode } from 'react';
import { Heading } from './Heading';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Page({ title, action, children }: Props) {
  return (
    <div className='w-full max-w-7xl flex-1 mx-auto px-2 pt-5 sm:px-6 lg:px-8'>
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
