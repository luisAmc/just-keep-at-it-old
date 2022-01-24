import { forwardRef, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup as HRadioGroup } from '@headlessui/react';
import { FieldError } from './Form';
import clsx from 'clsx';

interface RadioGroupProps {
  label: string;
  name: string;
  children: ReactNode;
}

export function RadioGroup({ label, name, children }: RadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ControlledRadioGroup {...field} name={name} label={label}>
          {children}
        </ControlledRadioGroup>
      )}
    />
  );
}

interface ControlledRadioGroupProps {
  label: string;
  name: string;
  children: ReactNode;
  value: any;
  onChange: (arg0: any) => void;
}

const ControlledRadioGroup = forwardRef(function ControlledRadioGroup(
  { label, children, onChange, ...props }: ControlledRadioGroupProps,
  ref
) {
  return (
    <label>
      <div className='font-medium text-gray-800 mb-1'>{label}</div>
      <HRadioGroup value={props.value} onChange={onChange}>
        <div className='bg-white rounded-md -space-y-px'>{children}</div>
      </HRadioGroup>

      <FieldError name={props.name} />
    </label>
  );
});

interface RadioButtonProps {
  label: string;
  description?: string;
  value: any;
}

export function RadioButton({ label, value, description }: RadioButtonProps) {
  return (
    <HRadioGroup.Option
      value={value}
      className={({ checked }) =>
        clsx(
          checked ? 'bg-brand-50 border-brand-200 z-10' : 'border-gray-200',
          'relative border p-4 flex cursor-pointer focus:outline-none first:rounded-t-md last:rounded-b-md'
        )
      }
    >
      {({ active, checked }) => (
        <>
          <div className='flex items-center'>
            <span
              className={clsx(
                checked
                  ? 'bg-brand-600 border-transparent'
                  : 'bg-white border-gray-200',
                active ? 'ring-2 ring-offset-2 ring-brand-600' : '',
                'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
              )}
              aria-hidden='true'
            >
              <span className='rounded-full bg-white w-1.5 h-1.5' />
            </span>
          </div>
          <div className='ml-3 flex flex-col'>
            <HRadioGroup.Label
              as='span'
              className={clsx(
                checked ? 'text-brand-900' : 'text-gray-900',
                'block text-sm font-medium'
              )}
            >
              {label}
            </HRadioGroup.Label>

            {description && (
              <HRadioGroup.Description
                as='span'
                className={clsx(
                  checked ? 'text-brand-700' : 'text-gray-500',
                  'block text-sm'
                )}
              >
                {description}
              </HRadioGroup.Description>
            )}
          </div>
        </>
      )}
    </HRadioGroup.Option>
  );
}
