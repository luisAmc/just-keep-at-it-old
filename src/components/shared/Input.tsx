import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = 'text', ...props },
  ref
) {
  return (
    <label>
      <div className='font-medium text-gray-800 mb-1'>{label}</div>

      <input
        {...props}
        ref={ref}
        type={type}
        placeholder={`${label}...`}
        className={clsx(
          'text-gray-800 w-full rounded-lg px-4 py-2 border',
          'focus:outline-none focus:border-brand-600 focus:border-2 focus:ring-brand-500',
          'disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
        )}
      />

      <FieldError name={props.name} />
    </label>
  );
});
