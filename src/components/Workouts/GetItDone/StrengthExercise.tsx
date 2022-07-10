import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RepetitionSet } from './RepetitionSet';

interface Props {
  exerciseId: string;
  label: string;
  disabled: boolean;
}

export function StrengthExercise({ exerciseId, label, disabled }: Props) {
  const { control } = useFormContext();

  const sets = useFieldArray({ control, name: `strengths.${exerciseId}.sets` });

  return (
    <div className='text-strength-800'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={clsx(
                'flex w-full items-center justify-between px-3 py-2 rounded-lg bg-strength-200 hover:bg-strength-300',
                open && 'rounded-b-none bg-strength-300'
              )}
            >
              <span>{label}</span>

              <div className='flex items-center space-x-2'>
                {sets.fields.length > 0 && (
                  <span className='font-bold text-sm'>
                    {sets.fields.length} sets
                  </span>
                )}

                <ChevronUpIcon
                  className={clsx('w-5 h-5', open && 'transform rotate-180')}
                />
              </div>
            </Disclosure.Button>
            <Transition
              show={open}
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Disclosure.Panel className='flex flex-col space-y-4 divide-y divide-strength-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-strength-300'>
                {sets.fields.map((field, index) => (
                  <RepetitionSet
                    key={field.id}
                    setId={index}
                    exerciseId={exerciseId}
                    disabled={disabled}
                  />
                ))}

                {disabled &&
                  (sets.fields.length === 0 ? (
                    <button
                      type='button'
                      className='flex flex-col items-center justify-center py-8 text-strength-500 border-2 border-dashed border-strength-400 group hover:border-strength-500 rounded-lg'
                      onClick={() => sets.append({ reps: 0, lbs: 0 })}
                    >
                      <SparklesIcon className='w-10 h-10 group-hover:text-strength-600' />
                      <span className='font-semibold group-hover:text-strength-600'>
                        Comenzar
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='w-full border border-dashed rounded-lg bg-strength-600 border-strength-600 hover:bg-strength-500'
                      onClick={() => sets.append({ reps: 0, lbs: 0 })}
                    >
                      <div className='py-2 flex items-center justify-center space-x-2 text-white'>
                        <PlusIcon className='w-4 h-4' />
                        <span>Comenzar un set</span>
                      </div>
                    </button>
                  ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
