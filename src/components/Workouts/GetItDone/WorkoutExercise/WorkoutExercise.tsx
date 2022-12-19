import { Button } from 'src/components/shared/Button';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { gql } from '@apollo/client';
import { InputSet } from './InputSet';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  useWorkoutExerciseContext,
  WorkoutExerciseProvider
} from './Contexts/WorkoutExerciseContext';
import {
  WorkoutExerciseActions,
  WorkoutExerciseActionsProps
} from './WorkoutExerciseActions';
import clsx from 'clsx';

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

export const WorkoutExercise_ExerciseFragment = gql`
  fragment WorkoutExercise_exercise on Exercise {
    id
    name
    type
    lastSession {
      sets {
        ...WorkoutExercise_workoutSet
      }
    }
  }
  ${WorkoutSetFragment}
`;

export const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    index
    exercise {
      id
      ...WorkoutExercise_exercise
    }
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${WorkoutExercise_ExerciseFragment}
  ${WorkoutSetFragment}
`;

interface WorkoutExerciseProps extends WorkoutExerciseInContextProps {
  workoutExerciseId: string;
  fieldIndex: number;
  maxIndex: number;
}

export function WorkoutExercise({
  workoutExerciseId,
  fieldIndex,
  maxIndex,
  ...inContextProps
}: WorkoutExerciseProps) {
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <WorkoutExerciseProvider
      workoutExerciseId={workoutExerciseId}
      fieldIndex={fieldIndex}
      maxIndex={maxIndex}
    >
      <div ref={animateParent} className='py-6'>
        <WorkoutExerciseInContext {...inContextProps} />
      </div>
    </WorkoutExerciseProvider>
  );
}

interface WorkoutExerciseInContextProps
  extends Pick<WorkoutExerciseActionsProps, 'onMove' | 'onRemove'> {
  onSelect(exerciseId: string): void;
}

function WorkoutExerciseInContext({
  onSelect,
  ...actionProps
}: WorkoutExerciseInContextProps) {
  const workoutExercise = useWorkoutExerciseContext();

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
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <div className='flex items-center space-x-4'>
            <div className='flex w-full justify-between'>
              <button
                type='button'
                onClick={() => onSelect(workoutExercise.id)}
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

            <WorkoutExerciseActions
              isFirst={workoutExercise.isFirst}
              isLast={workoutExercise.isLast}
              {...actionProps}
            />
          </div>

          <Disclosure.Panel className='pt-4'>
            {sets.fields.map((_field, index) => (
              <InputSet
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
  );
}
