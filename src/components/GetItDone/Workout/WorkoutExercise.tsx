import { Button } from 'src/components/shared/Button';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseType } from '@prisma/client';
import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { WorkoutExerciseActions } from './WorkoutExerciseActions';
import { WorkoutExerciseSet } from './WorkoutExerciseSet';
import clsx from 'clsx';

export const WorkoutSetFragment = gql`
  fragment WorkoutExercise_workoutSet on WorkoutSet {
    id
    mins
    distance
    kcal
    lbs
    reps
  }
`;

export const LastSessionFragment = gql`
  fragment WorkoutExercise_lastSession on WorkoutExercise {
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${WorkoutSetFragment}
`;

export const ExerciseFragment = gql`
  fragment WorkoutExercise_exercise on Exercise {
    id
    name
    type
    lastSession {
      ...WorkoutExercise_lastSession
    }
  }
  ${LastSessionFragment}
`;

export const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    exerciseIndex
    exercise {
      ...WorkoutExercise_exercise
    }
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${ExerciseFragment}
  ${WorkoutSetFragment}
`;

export function WorkoutExercise() {
  const workoutExercise = useWorkoutExerciseContext();

  const form = useFormContext();

  const sets = useFieldArray({
    control: form.control,
    name: `${workoutExercise.formFieldName}.sets`
  });

  useEffect(() => {
    if (
      workoutExercise.mostRecentSession &&
      workoutExercise.mostRecentSession.sets.length > sets.fields.length
    ) {
      const differenceInSets =
        workoutExercise.mostRecentSession.sets.length - sets.fields.length;

      Array.from({ length: differenceInSets }).forEach((_) => addSet());
    }
  }, []);

  function addSet() {
    sets.append({ mins: '', distance: '', kcal: '', reps: '', lbs: '' });
  }

  function removeSet(index: number) {
    sets.remove(index);
  }

  return (
    <div>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div className='flex items-center space-x-4'>
              <div className='w-full flex items-center justify-between'>
                <Button
                  onClick={() => workoutExercise.onSelect(workoutExercise.id)}
                  className='text-slate-200 hover:bg-white/10 px-2 py-1 rounded transition'
                >
                  {workoutExercise.name}
                </Button>

                <Disclosure.Button className='flex items-center space-x-2 text-slate-200 hover:bg-white/5 px-2 py-1 rounded-lg transition'>
                  <span className='text-sm'>{sets.fields.length} sets</span>

                  <ChevronUpIcon
                    className={clsx('w-4 h-4', open && 'transform rotate-180')}
                  />
                </Disclosure.Button>
              </div>

              <WorkoutExerciseActions />
            </div>

            <Disclosure.Panel className='pt-4'>
              {sets.fields.map((field, index) => (
                <WorkoutExerciseSet
                  key={field.id}
                  index={index}
                  type={workoutExercise.type as ExerciseType}
                  onRemove={() => removeSet(index)}
                />
              ))}

              {sets.fields.length === 0 ? (
                <button
                  type='button'
                  className='w-full flex flex-col items-center justify-center py-5 text-slate-500 border-2 border-dashed border-slate-600 group hover:border-slate-300 rounded-lg'
                  onClick={addSet}
                >
                  <SparklesIcon className='w-6 h-6 group-hover:text-slate-200' />
                  <span className='font-semibold group-hover:text-slate-200'>
                    Comenzar
                  </span>
                </button>
              ) : (
                <Button variant='secondary' onClick={addSet}>
                  <PlusIcon className='w-4 h-4 mr-1' />
                  <span>Añadir set</span>
                </Button>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
