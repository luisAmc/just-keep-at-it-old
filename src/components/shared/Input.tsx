import clsx from 'clsx';
import { ComponentProps, ComponentType, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label?: string;
  icon?: ComponentType<any>;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = 'text', icon: Icon, ...props },
  ref
) {
  return (
    <label>
      {label && <div className='font-medium text-slate-800 mb-1'>{label}</div>}

      <div className='text-slate-700 w-full flex items-center rounded-lg bg-white border-2 transition focus-within:border-brand-600 focus-within:bg-white overflow-hidden'>
        {Icon && <Icon className='w-4 h-4 ml-4' />}

        <input
          placeholder={`${label}...`}
          ref={ref}
          type={type}
          className={clsx(
            'bg-transparent w-full rounded-lg px-4 py-2 focus:outline-none',
            'disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
          )}
          {...props}
        />
      </div>

      <FieldError name={props.name} />
    </label>
  );
});
