import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  hideLabel?: boolean;
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, hideLabel = false, type = 'text', ...props }, ref) => {
    return (
      <label>
        {!hideLabel && (
          <div className='font-medium text-gray-800 mb-1'>{label}</div>
        )}
        <input
          className='bg-white text-gray-800 w-full rounded-md px-4 py-2 border border-gray-200 focus:outline-none focus:border-brand-600 focus:border-2 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
          type={type}
          step={type === 'number' ? 'any' : undefined}
          ref={ref}
          autoComplete={props.autoComplete || 'off'}
          placeholder={`${label}...`}
          {...props}
        />

        <FieldError name={props.name} />
      </label>
    );
  }
);
