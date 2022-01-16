import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';

interface StrengthExerciseProps {
  exerciseId: number;
  name: string;
  editable: boolean;
}

export function StrengthExercise({
  exerciseId,
  name,
  editable
}: StrengthExerciseProps) {
  const { control } = useFormContext();
  const sets = useFieldArray({
    control,
    name: `strengths.${exerciseId}.sets`
  });

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
              <span>{name}</span>

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
            <Disclosure.Panel className='flex flex-col space-y-4 divide-y divide-strength-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-strength-300'>
              {sets.fields.map((field, index) => (
                <RepetitionSet
                  key={field.id}
                  setId={index}
                  exerciseId={exerciseId}
                  editable={editable}
                />
              ))}

              {editable &&
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
          </>
        )}
      </Disclosure>
    </div>
  );
}

interface RepetitionSetProps {
  exerciseId: number;
  setId: number;
  editable: boolean;
}

function RepetitionSet({ exerciseId, setId, editable }: RepetitionSetProps) {
  const { control, setValue } = useFormContext();

  const SET_ID = `strengths.${exerciseId}.sets.${setId}`;
  const set: { reps: number; lbs: number } = useWatch({
    control,
    name: SET_ID
  });

  function handleLbsChange(amount: number) {
    const updatedValue = set.lbs + amount;
    setValue(`${SET_ID}.lbs`, updatedValue > 0 ? updatedValue : 0);
  }

  function handleRepsChange(amount: number) {
    const updatedValue = set.reps + amount;
    setValue(`${SET_ID}.reps`, updatedValue > 0 ? updatedValue : 0);
  }

  return (
    <div
      className={clsx(
        'pt-2 flex border-strength-800/20',
        editable
          ? 'flex-col space-y-4'
          : 'items-center justify-center space-x-4'
      )}
    >
      {/* Weight */}
      <div className='flex items-center justify-evenly space-x-4'>
        {editable && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              disabled={set.lbs === 0}
              className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(-5)}
            >
              <MinusIcon className='w-4 h-4' />
              <span>5</span>
            </button>

            <button
              type='button'
              disabled={set.lbs === 0}
              className='p-4 rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(-1)}
            >
              <MinusIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        <span className='px-2'>
          <span className='text-3xl font-medium'>{set.lbs}</span>
          <span className='ml-1'>lbs</span>
        </span>

        {editable && (
          <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              className='p-4 rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(1)}
            >
              <PlusIcon className='w-4 h-4' />
            </button>
            <button
              type='button'
              className='flex items-center space-x-1 p-2 text-sm rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(5)}
            >
              <PlusIcon className='w-4 h-4' />
              <span>5</span>
            </button>
          </div>
        )}
      </div>

      {/* Reps */}
      <div className='flex items-center justify-evenly space-x-4'>
        {editable && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              disabled={set.reps === 0}
              className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(-5)}
            >
              <MinusIcon className='w-3 h-3' />
              <span>5</span>
            </button>

            <button
              type='button'
              disabled={set.reps === 0}
              className='p-4 rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(-1)}
            >
              <MinusIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        <span className='px-2'>
          <span className='text-3xl font-medium'>{set.reps}</span>
          <span className='ml-1'>rep</span>
        </span>

        {editable && (
          <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              className='p-4 rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(1)}
            >
              <PlusIcon className='w-4 h-4' />
            </button>

            <button
              type='button'
              className='flex items-center space-x-1 p-2 text-sm rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(5)}
            >
              <PlusIcon className='w-3 h-3' />
              <span>5</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
