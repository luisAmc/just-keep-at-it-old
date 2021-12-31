import { ReactNode } from 'react';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Container({ title, action, children }: Props) {
  return (
    <div className='relative mx-auto w-full sm:max-w-lg'>
      <div className='hidden sm:block absolute -inset-0.5 bg-stone-500 rounded-lg blur opacity-75'></div>
      <div className='relative h-full sm:mt-8 sm:rounded-xl bg-white p-6'>
        {(title || action) && (
          <div className='flex items-center justify-between mb-4'>
            {title && <h1 className='text-3xl font-bold'>{title}</h1>}
            {action}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
