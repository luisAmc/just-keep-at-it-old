import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function ListItem({ children, onClick }: ListItemProps) {
  return (
    <li onClick={onClick} className='hover:opacity-80 hover:cursor-pointer'>
      {children}
    </li>
  );
}

interface ListProps<T> {
  values: readonly T[];
  children: (item: T, index: number) => ReactNode;
}

export function List<T>({ values, children }: ListProps<T>) {
  return (
    <div className='rounded-lg overflow-hidden mg-4 shadow border border-gray-200'>
      <div className='bg-white'>
        <ul role='list' className='divide-y divide-gray-400'>
          {values.map((node, i) => children(node, i))}
        </ul>
      </div>
    </div>
  );
}
