import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput({ label, ...props }, ref) {
    return (
      <label className='flex flex-col items-center justify-center'>
        <input
          className={clsx(
            'w-10 justify-center text-xl text-center text-gray-800 bg-transparent outline-none appearance-none',
            'focus:border-brand-600 focus:border-b-2 focus:ring-brand-500',
            'disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:rounded-lg'
          )}
          ref={ref}
          type='number'
          step='any'
          placeholder='0'
          {...props}
        />

        <div className='text-sm font-medium text-gray-800 ml-1'>{label}</div>
      </label>
    );
  }
);
