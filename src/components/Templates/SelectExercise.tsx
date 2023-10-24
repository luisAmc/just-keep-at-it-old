import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useController } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { FieldError } from '../shared/Form';
import clsx from 'clsx';

interface Props {
  name: string;
  options: {
    label: string;
    value: string;
    category: string;
  }[];
}

export function SelectExercise({ name, options }: Props) {
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
      <Combobox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative">
            <Combobox.Input
              placeholder="Seleccione una opción..."
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: (typeof options)[0]) =>
                option ? option.label : ''
              }
              className={clsx(
                'relative w-full cursor-default rounded-lg border-2 border-solid border-slate-200 bg-white py-2 pl-3 pr-10 text-left text-brand-700 focus:border-2 focus:border-brand-600 focus:outline-none focus:ring-brand-500'
              )}
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-brand-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-brand-300 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-brand-700">
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
                          'relative cursor-default select-none px-3 py-2 ',
                          active &&
                            !isSelected &&
                            'bg-brand-200 text-brand-800',
                          isSelected && 'bg-brand-500 text-white'
                        )
                      }
                    >
                      <div className="mr-3 flex items-center justify-between space-x-2">
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
                            'inline-flex space-x-1 rounded-full bg-gray-600 px-2 py-0.5 text-xs font-semibold text-brand-300'
                          )}
                        >
                          {option.category}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center">
                        <CheckCircleIcon
                          className={clsx(
                            'h-5 w-5',
                            isSelected ? 'text-white' : 'text-transparent'
                          )}
                          aria-hidden="true"
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
