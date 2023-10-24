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
          className={clsx('mb-1 font-medium', {
            'text-brand-800': color === 'light',
            'text-brand-200': color === 'dark'
          })}
        >
          {label}
        </div>
      )}

      <div
        className={clsx(
          'flex w-full items-center overflow-hidden rounded-lg border-2 border-solid border-slate-200 transition focus-within:border-brand-600',
          {
            'bg-white text-brand-700 focus-within:bg-white': color === 'light',
            'bg-brand-800 text-brand-200': color === 'dark'
          }
        )}
      >
        {Icon && <Icon className="ml-4 h-4 w-4" />}

        <input
          placeholder={`${label}...`}
          ref={ref}
          type={type}
          className={clsx(
            'w-full rounded-lg bg-transparent px-4 py-2 focus:outline-none',
            'disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60'
          )}
          {...props}
        />
      </div>

      <FieldError name={props.name} />
    </label>
  );
});
