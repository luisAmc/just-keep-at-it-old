import { gql } from '@apollo/client';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import {
  MoveExerciseAction,
  WorkoutExerciseActions
} from './WorkoutExerciseActions';
import {
  useWorkoutExerciseContext,
  WorkoutExerciseProvider
} from './WorkoutExerciseContext';
import { WorkoutExerciseInputSet } from './WorkoutExerciseInputSet';

interface WorkoutExerciseProps {
  exerciseId: string;
  index: number;
  maxIndex: number;
  onRemove: () => void;
  onMove: (action: MoveExerciseAction) => void;
  onSelect: (exerciseId: string) => void;
}

export function WorkoutExercise(props: WorkoutExerciseProps) {
  return (
    <WorkoutExerciseProvider {...props}>
      <div className='py-6'>
        <WorkoutExerciseInContext />
      </div>
    </WorkoutExerciseProvider>
  );
}

function WorkoutExerciseInContext() {
  const workoutExercise = useWorkoutExerciseContext();

  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  const { control } = useFormContext();

  const sets = useFieldArray({
    control,
    name: `${workoutExercise.fieldName}.sets`
  });

  function addSet() {
    sets.append({ mins: '', distance: '', kcal: '', reps: '', lbs: '' });
  }

  function removeSet(index: number) {
    sets.remove(index);
  }

  return (
    <div ref={animateParent}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div className='flex items-center space-x-4'>
              <div className='flex w-full justify-between'>
                <button
                  type='button'
                  onClick={() => workoutExercise.onSelect(workoutExercise.id)}
                  className='text-slate-200 hover:bg-white/5 px-2 py-1 rounded-lg transition'
                >
                  {workoutExercise.name}
                </button>

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
                <WorkoutExerciseInputSet
                  key={field.id}
                  index={index}
                  type={workoutExercise.type}
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
                <Button color='secondary' onClick={addSet}>
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

const WorkoutSetFragment = gql`
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
    muscleGroup
    lastSession {
      ...WorkoutExercise_lastSession
    }
  }
  ${LastSessionFragment}
`;

export const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    index
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