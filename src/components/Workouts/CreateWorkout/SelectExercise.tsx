import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Combobox, Transition } from '@headlessui/react';
import { FieldError } from '../../shared/Form';
import { Fragment, useState } from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { MuscleGroup } from '@prisma/client';

function useMuscleGroupColors(muscleGroup: string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-200 ring-arms-400 text-arms-900';

    case MuscleGroup.BACK:
      return 'bg-back-200 ring-back-400 text-back-900';

    case MuscleGroup.CHEST:
      return 'bg-chest-200 ring-chest-400 text-chest-900';

    case MuscleGroup.LEGS:
      return 'bg-legs-200 ring-legs-400 text-legs-900';

    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-200 ring-shoulders-400 text-shoulders-900';

    default:
      return 'bg-aerobic-200 ring-aerobic-400 text-aerobic-900';
  }
}

interface Props {
  name: string;
  label?: string;
  options: { label: string; value: string; muscleGroup: string }[];
}

export function SelectExercise({ label, name, options }: Props) {
  const {
    field: { value, onChange }
  } = useController({ name });

  const [query, setQuery] = useState<string>('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <label>
      {label && <div className='font-medium text-gray-800 mb-1'>{label}</div>}

      <Combobox value={value} onChange={onChange}>
        <div className='relative mt-1'>
          <div className='relative'>
            <Combobox.Input
              placeholder='Seleccione una opción...'
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: { label: string }) =>
                option ? option.label : ''
              }
              className={clsx(
                'bg-white relative w-full border rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:border-2 focus:ring-brand-500 focus:border-brand-600',
                value ? 'text-gray-800' : 'text-gray-400'
              )}
            />

            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <SelectorIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              {filteredOptions.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  No se encontró un ejercicio.
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value && value.value === option.value;

                  return (
                    <Combobox.Option
                      key={option.value}
                      value={option}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active && !isSelected && 'text-gray-800 bg-brand-200',
                          isSelected && 'text-white bg-brand-500'
                        )
                      }
                    >
                      <div className='flex items-center justify-between space-x-2 mr-2'>
                        <span
                          className={clsx(
                            'block truncate',
                            isSelected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {option.label}
                        </span>

                        <span
                          className={clsx(
                            'px-2 inline-flex text-xs font-medium rounded-full',
                            useMuscleGroupColors(option.muscleGroup)
                          )}
                        >
                          {option.muscleGroup ?? 'AEROBIC'}
                        </span>
                      </div>

                      <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                        <CheckIcon
                          className={clsx(
                            'h-5 w-5',
                            isSelected ? 'text-white' : 'text-transparent'
                          )}
                          aria-hidden='true'
                        />
                      </span>
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <FieldError name={name} />
    </label>
  );
}