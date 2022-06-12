import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Heading({ children }: Props) {
  return <h1 className='text-3xl'>{children}</h1>;
}
