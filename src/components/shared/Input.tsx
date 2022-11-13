import clsx from 'clsx';
import { ComponentProps, ComponentType, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label?: string;
  color?: 'light' | 'dark';
  icon?: ComponentType<any>;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = 'text', icon: Icon, color = 'dark', ...props },
  ref
) {
  return (
    <label>
      {label && (
        <div
          className={clsx('font-medium mb-1', {
            'text-slate-800': color === 'light',
            'text-slate-200': color === 'dark'
          })}
        >
          {label}
        </div>
      )}

      <div
        className={clsx(
          'w-full flex items-center rounded-lg border-2 border-transparent transition focus-within:border-brand-600 overflow-hidden',
          {
            'text-slate-700 bg-white focus-within:bg-white': color === 'light',
            'text-slate-200 bg-slate-800': color === 'dark'
          }
        )}
      >
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
