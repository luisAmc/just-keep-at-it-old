import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { forwardRef, Fragment, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  getMuscleGroupLabel,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { FieldError } from './Form';
import { Pill } from './Pill';

interface SelectProps {
  label: string;
  name: string;
  onChange: (arg0: any) => void;
  options: {
    value: string;
    label: string;
    type: string;
    muscleGroup: string;
  }[];
  hideLabel?: boolean;
}

export const Select = forwardRef(function Select(
  { label, name, onChange, options, ...props }: SelectProps,
  ref
) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ControlledSelect
          {...field}
          label={label}
          options={options}
          {...props}
        />
      )}
    />
  );
});

interface ControlledSelectProps extends SelectProps {
  value: any;
  onChange: (option: any) => void;
}

const ControlledSelect = forwardRef(function ControlledSelect(
  {
    label,
    options,
    value: selected,
    hideLabel,
    ...props
  }: ControlledSelectProps,
  ref
) {
  const [query, setQuery] = useState('');

  const availableOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Listbox value={selected} onChange={props.onChange}>
        {({ open }) => (
          <>
            {!hideLabel && (
              <Listbox.Label className='text-sm font-medium text-gray-800 dark:text-gray-200 mb-1'>
                {label}
              </Listbox.Label>
            )}

            <div className='relative'>
              <Listbox.Button className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500'>
                <div className='flex items-center space-x-2'>
                  <span className='block truncate'>
                    {selected && selected.label
                      ? selected.label
                      : 'Seleccione una opción...'}
                  </span>
                  {selected && selected.muscleGroup && (
                    <Pill
                      variant={selected.muscleGroup as MUSCLE_GROUP}
                      text={getMuscleGroupLabel(
                        selected.muscleGroup as MUSCLE_GROUP
                      )}
                    />
                  )}
                </div>

                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <SelectorIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                  {/* <li className='border-b p-2'>
                    <input
                      className='bg-white text-gray-800 w-full rounded-md px-4 py-2 border border-gray-200 focus:outline-none focus:border-brand-600 focus:border-2 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
                      type='search'
                      autoComplete={'off'}
                      placeholder='Buscar...'
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </li> */}

                  {availableOptions.length === 0 ? (
                    <li className='px-3 py-2 text-stone-600'>
                      No se encontró un ejercicio.
                    </li>
                  ) : (
                    availableOptions.map((option) => {
                      const isSelected = selected
                        ? selected.value === option.value
                        : false;

                      return (
                        <Listbox.Option
                          key={option.label}
                          className={({ active }) =>
                            clsx(
                              'cursor-default select-none relative py-2 pl-3 pr-9',
                              (active || isSelected) &&
                                'text-brand-900 bg-brand-50'
                            )
                          }
                          value={option}
                        >
                          {
                            <>
                              <div className='flex items-center space-x-2'>
                                <span
                                  className={clsx(
                                    'block truncate',
                                    isSelected ? 'font-semibold' : 'font-normal'
                                  )}
                                >
                                  {option.label}
                                </span>

                                {option.muscleGroup && (
                                  <Pill
                                    variant={option.muscleGroup as MUSCLE_GROUP}
                                    text={getMuscleGroupLabel(
                                      option.muscleGroup as MUSCLE_GROUP
                                    )}
                                  />
                                )}
                              </div>

                              {isSelected ? (
                                <span className='text-brand-900 absolute inset-y-0 right-0 flex items-center pr-4'>
                                  <CheckIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                </span>
                              ) : null}
                            </>
                          }
                        </Listbox.Option>
                      );
                    })
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <FieldError name={props.name} />
    </>
  );
});
