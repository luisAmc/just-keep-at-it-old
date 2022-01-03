import clsx from 'clsx';
import { ReactNode, useState } from 'react';

export function TableHeader({
  label,
  className,
  color = 'primary'
}: {
  label: string;
  className?: string;
  color?: 'primary' | 'mono';
}) {
  return (
    <th
      className={clsx(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        {
          'bg-gray-100 text-gray-600': color === 'primary',
          'bg-gray-50 text-gray-500': color === 'mono'
        },
        className
      )}
    >
      {label}
    </th>
  );
}

export function TableRow({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      className={clsx(
        'hover:bg-gray-100 flex flex-col sm:table-row transition ease-in-out',
        !!onClick ? 'cursor-pointer' : 'cursor-default'
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableDataCell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={clsx('px-6 py-1 sm:py-3 whitespace-wrap text-sm', className)}
    >
      {children}
    </td>
  );
}

export function Table<T>({
  header,
  values,
  itemsPerPage = 5,
  children
}: {
  header: ReactNode;
  values: T[];
  paginated?: boolean;
  itemsPerPage?: number;
  children: (items: T, i: number) => ReactNode;
}) {
  const maxPage = Math.floor(values.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className='shadow overflow-visible border-b border-gray-200 sm:rounded-lg'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr className='flex flex-col sm:table-row'>{header}</tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-200'>
          {values
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map((node, i) => children(node, i))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className='bg-white px-4 py-3 flex items-center justify-between border-t border-stone-200 sm:px-6'>
        <div className='hidden sm:block'>
          <p className='text-sm text-stone-700'>
            Mostrándo{' '}
            <span className='font-medium'>
              {currentPage * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {currentPage * itemsPerPage + itemsPerPage}
            </span>{' '}
            de <span className='font-medium'>{values.length}</span>
          </p>
        </div>

        <div className='flex-1 flex justify-between sm:justify-end'>
          <button
            type='button'
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className='relative inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-default'
          >
            Anterior
          </button>
          
          <button
            type='button'
            disabled={currentPage >= maxPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-default'
          >
            Siguiente
          </button>
        </div>
      </nav>
    </div>
  );
}

export function TableShimmer() {
  return (
    <div className='animate-pulse flex items-center space-x-4 p-4 border sm:rounded-lg'>
      <div className='flex flex-col w-full'>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
        <div className='flex-1 space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={'table-shimmer-row-' + i} className='flex mt-2 space-x-4'>
              <div className='h-4 w-1/12 rounded-full bg-gray-300'></div>
              <div className='h-4 w-4/12 rounded-full bg-gray-300'></div>
              <div className='h-4 w-3/12 rounded-full bg-gray-300'></div>
              <div className='h-4 w-3/12 rounded-full bg-gray-300'></div>
              <div className='h-4 w-1/12 rounded-full bg-gray-300'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
