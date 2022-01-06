import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ExerciseDocument } from 'src/models/Exercise';
import clsx from 'clsx';

export function AerobicExercise({ exercise }: { exercise: ExerciseDocument }) {
  const { control } = useFormContext();
  const sets = useFieldArray({
    control,
    name: `exercises.${exercise._id}.sets`
  });

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
              <span>{exercise.name}</span>
              <ChevronUpIcon
                className={clsx('w-5 h-5', open && 'transform rotate-180')}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='flex flex-col space-y-4 divide-y divide-aerobic-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-aerobic-300'>
              {sets.fields.map((field, index) => (
                <TimeSet
                  key={field.id}
                  setId={index}
                  exerciseId={exercise._id}
                />
              ))}

              {sets.fields.length === 0 ? (
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
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

interface TimeSetProps {
  setId: number;
  exerciseId: string;
}

function TimeSet({ setId, exerciseId }: TimeSetProps) {
  const { control, setValue } = useFormContext();

  const SET_ID = `exercises.${exerciseId}.sets.${setId}.mins`;
  const reps: number = useWatch({ control, name: SET_ID });

  function handleRepsChange(amount: number) {
    const updatedValue = reps + amount;
    setValue(SET_ID, updatedValue > 0 ? updatedValue : 0);
  }

  return (
    <div className='pt-2 flex flex-col space-y-4 border-aerobic-800/20'>
      <div className='flex items-center justify-evenly space-x-4'>
        <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
          <button
            type='button'
            disabled={reps === 0}
            className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
            onClick={() => handleRepsChange(-5)}
          >
            <MinusIcon className='w-4 h-4' />
            <span>5</span>
          </button>

          <button
            type='button'
            disabled={reps === 0}
            className='p-4 rounded-full disabled:opacity-30 bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
            onClick={() => handleRepsChange(-1)}
          >
            <MinusIcon className='w-4 h-4' />
          </button>
        </div>

        <span>
          <span className='text-3xl font-medium'>{reps}</span>
          <span className='ml-1'>mins</span>
        </span>

        <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
          <button
            type='button'
            className='p-4 rounded-full bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
            onClick={() => handleRepsChange(1)}
          >
            <PlusIcon className='w-4 h-4' />
          </button>
          <button
            type='button'
            className='flex items-center space-x-1 p-2 text-sm rounded-full bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
            onClick={() => handleRepsChange(5)}
          >
            <PlusIcon className='w-4 h-4' />
            <span>5</span>
          </button>
        </div>
      </div>
    </div>
  );
}
