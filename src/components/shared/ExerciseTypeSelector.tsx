import { ExerciseType } from '@prisma/client';
import { FieldError } from './Form';
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
      <div className='font-medium text-gray-800 mb-1'>{label}</div>

      <RadioGroup value={value} onChange={onChange} name={name}>
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ checked }) =>
              clsx(
                'relative border p-4 flex cursor-pointer focus:outline-none first:rounded-t-md last:rounded-b-md',
                checked
                  ? {
                      'bg-aerobic-50 border-aerobic-200':
                        value === ExerciseType.AEROBIC,
                      'bg-strength-50 border-strength-200':
                        value === ExerciseType.STRENGTH
                    }
                  : 'border-gray-200'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className='flex items-center'>
                  <span
                    className={clsx(
                      'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center',
                      checked && 'border-transparent',
                      checked
                        ? {
                            'bg-aerobic-600': value === ExerciseType.AEROBIC,
                            'bg-strength-600': value === ExerciseType.STRENGTH
                          }
                        : 'bg-white border-gray-200',
                      active && 'ring-2 ring-offset-2',
                      active
                        ? {
                            'ring-aerobic-600': value === ExerciseType.AEROBIC,
                            'ring-strength-600': value === ExerciseType.STRENGTH
                          }
                        : ''
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
                      checked
                        ? value === ExerciseType.AEROBIC
                          ? 'text-aerobic-900'
                          : 'text-strength-900'
                        : 'text-gray-900',
                      'block text-sm font-medium'
                    )}
                  >
                    {option.label}
                  </RadioGroup.Label>

                  {option.description && (
                    <RadioGroup.Description
                      as='span'
                      className={clsx(
                        checked
                          ? value === ExerciseType.AEROBIC
                            ? 'text-aerobic-700'
                            : 'text-strength-700'
                          : 'text-gray-500',
                        'block text-sm'
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
