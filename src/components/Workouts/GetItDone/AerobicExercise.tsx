import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TimeSet } from './TimeSet';

interface Props {
  exerciseId: string;
  label: string;
  disabled: boolean;
}

export function AerobicExercise({ exerciseId, label, disabled }: Props) {
  const { control } = useFormContext();

  const sets = useFieldArray({ control, name: `aerobics.${exerciseId}.sets` });

  return (
    <div className='text-aerobic-800'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={clsx(
                'flex w-full items-center justify-between px-3 py-2 rounded-lg bg-aerobic-200 hover:bg-aerobic-300',
                open && 'rounded-b-none bg-aerobic-300'
              )}
            >
              <span>{label}</span>
              <ChevronUpIcon
                className={clsx('w-5 h-5', open && 'transform rotate-180')}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Disclosure.Panel className='flex flex-col space-y-4 divide-y divide-aerobic-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-aerobic-300'>
                {sets.fields.map((field, setIndex) => (
                  <TimeSet
                    key={field.id}
                    exerciseId={exerciseId}
                    setId={setIndex}
                    disabled={disabled}
                  />
                ))}

                {disabled &&
                  (sets.fields.length === 0 ? (
                    <button
                      type='button'
                      className='flex flex-col items-center justify-center py-8 text-aerobic-500 border-2 border-dashed border-aerobic-400 group hover:border-aerobic-500 rounded-lg'
                      onClick={() => sets.append({ mins: 0 })}
                    >
                      <SparklesIcon className='w-10 h-10 group-hover:text-aerobic-600' />
                      <span className='font-semibold group-hover:text-aerobic-600'>
                        Comenzar
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='w-full border border-dashed rounded-lg bg-aerobic-600 border-aerobic-600 hover:bg-aerobic-500'
                      onClick={() => sets.append({ mins: 0 })}
                    >
                      <div className='py-2 flex items-center justify-center space-x-2 text-white'>
                        <PlusIcon className='w-4 h-4' />
                        <span>Añadir un set más</span>
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
