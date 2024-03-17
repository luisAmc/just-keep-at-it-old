import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  size?: 'lg' | 'xl' | '2xl' | '3xl';
  children: ReactNode;
}

export function Heading({ size = '3xl', children }: Props) {
  return (
    <h1
      className={clsx('font-medium', {
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
        'text-3xl': size === '3xl'
      })}
    >
      {children}
    </h1>
  );
}
