import clsx from 'clsx';
import { ComponentProps, ComponentType, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  hideLabel?: boolean;
  label?: string;
  color?: 'light' | 'dark';
  icon?: ComponentType<any>;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    label,
    hideLabel = false,
    type = 'text',
    icon: Icon,
    color = 'light',
    ...props
  },
  ref
) {
  return (
    <label>
      {!hideLabel && label && (
        <div
          className={clsx('font-medium mb-1', {
            'text-brand-800': color === 'light',
            'text-brand-200': color === 'dark'
          })}
        >
          {label}
        </div>
      )}

      <div
        className={clsx(
          'w-full flex items-center rounded-lg border-2 border-transparent transition focus-within:border-brand-600 overflow-hidden',
          {
            'text-brand-700 bg-white focus-within:bg-white': color === 'light',
            'text-brand-200 bg-brand-800': color === 'dark'
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
