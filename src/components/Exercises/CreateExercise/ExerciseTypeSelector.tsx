import { FieldError } from '../../shared/Form';
import { RadioGroup } from '@headlessui/react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

interface Props {
  name: string;
  label?: string;
  options: { label: string; description?: string; value: string | number }[];
}

export function ExerciseTypeSelector({ label, options, name }: Props) {
  const {
    field: { value, onChange }
  } = useController({ name });

  return (
    <label>
      <div className='font-medium text-slate-200 mb-1'>{label}</div>

      <RadioGroup value={value} onChange={onChange} name={name}>
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ checked }) =>
              clsx(
                'relative border border-slate-700 p-4 flex cursor-pointer focus:outline-none first:rounded-t-md last:rounded-b-md',
                checked && 'bg-slate-800'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className='flex items-center'>
                  <span
                    className={clsx(
                      'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center',
                      active && 'ring-2 ring-offset-2 ring-brand-600',
                      checked
                        ? 'border-transparent bg-brand-600'
                        : 'bg-white border-gray-200'
                    )}
                    aria-hidden='true'
                  >
                    <span className='rounded-full bg-white w-1.5 h-1.5' />
                  </span>
                </div>
                <div className='ml-3 flex flex-col'>
                  <RadioGroup.Label
                    as='span'
                    className={clsx(
                      checked ? 'text-slate-50' : 'text-slate-400',
                      'block text-sm font-medium'
                    )}
                  >
                    {option.label}
                  </RadioGroup.Label>

                  {option.description && (
                    <RadioGroup.Description
                      as='span'
                      className={clsx(
                        'block text-sm',
                        checked ? 'text-slate-200' : 'text-slate-500'
                      )}
                    >
                      {option.description}
                    </RadioGroup.Description>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <FieldError name={name} />
    </label>
  );
}
