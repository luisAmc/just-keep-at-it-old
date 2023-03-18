import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useController } from 'react-hook-form';
import { FieldError } from './Form';

interface RadioButtonGroupProps {
  name: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export function RadioButtonGroup({
  label,
  name,
  options
}: RadioButtonGroupProps) {
  const {
    field: { value, onChange }
  } = useController({ name });

  return (
    <label>
      <div className='font-medium text-slate-200 mb-1 leading-6'>{label}</div>

      <RadioGroup name={name} value={value} onChange={onChange}>
        <div className='grid grid-cols-2 gap-x-2'>
          {options.map((option) => (
            <RadioGroup.Option
              key={`ro-${option.value}`}
              value={option.value}
              className={({ checked, active }) =>
                clsx(
                  checked ? 'border-brand-600' : 'border-transparent',
                  active ? 'border-brand-600 ring-2 ring-brand-600' : '',
                  'relative flex cursor-pointer rounded-lg border-2 bg-slate-800 p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked }) => (
                <>
                  <span className='flex flex-1'>
                    <span className='flex flex-col'>
                      <RadioGroup.Label
                        as='span'
                        className='block text-sm font-medium text-slate-300'
                      >
                        {option.label}
                      </RadioGroup.Label>
                    </span>
                  </span>

                  <CheckCircleIcon
                    className={clsx(
                      !checked ? 'invisible' : '',
                      'h-5 w-5 text-brand-600'
                    )}
                    aria-hidden='true'
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <FieldError name={name} />
    </label>
  );
}
