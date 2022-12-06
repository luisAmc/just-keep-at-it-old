import { Button } from 'src/components/shared/Button';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseType } from '@prisma/client';
import { RepetitionSet } from './RepetitionSet';
import { TimeSet } from './TimeSet';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useWorkoutExercise } from './WorkoutExerciseProvider';
import {
  WorkoutExerciseActions,
  WorkoutExerciseActionsProps
} from './WorkoutExerciseActions';
import clsx from 'clsx';

interface WorkoutExerciseProps
  extends Pick<WorkoutExerciseActionsProps, 'onMove' | 'onRemove'> {
  exercise: {
    exerciseId: string;
    name: string;
    type: string;
  };
  onSelect(exerciseId: string): void;
}

export function WorkoutExercise({
  exercise,
  onSelect,
  onRemove,
  onMove
}: WorkoutExerciseProps) {
  const workoutExercise = useWorkoutExercise();

  const isAerobic = workoutExercise.exercise?.type === ExerciseType.AEROBIC;

  const [animateParent] = useAutoAnimate<HTMLDivElement>();
  const { control } = useFormContext();

  const sets = useFieldArray({
    control,
    name: `${workoutExercise.fieldName}.sets`
  });

  function addSet() {
    sets.append({ mins: '', distance: '', kcal: '', reps: '', lbs: '' });
  }

  return (
    <div ref={animateParent} className='py-6'>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div className='flex items-center space-x-4'>
              <div className='flex w-full justify-between'>
                <button
                  onClick={() => onSelect(workoutExercise.exerciseId)}
                  className='text-slate-200 hover:bg-white/5 px-2 py-1 rounded-lg transition'
                >
                  {exercise.name}
                </button>
                {/* <span className='text-slate-200'>{exercise.name}</span> */}

                <div className='flex items-center space-x-2 text-slate-200'>
                  <span className='text-sm'>{sets.fields.length} sets</span>

                  <ChevronUpIcon
                    className={clsx('w-4 h-4', open && 'transform rotate-180')}
                  />
                </div>
              </div>

              <WorkoutExerciseActions
                isFirst={workoutExercise.isFirst}
                isLast={workoutExercise.isLast}
                onRemove={onRemove}
                onMove={onMove}
              />
            </div>

            <Disclosure.Panel className='pt-4'>
              {sets.fields.length > 0 && (
                <>
                  {isAerobic ? (
                    <div className='divide-y divide-slate-600'>
                      {sets.fields.map((field, setIndex) => (
                        <TimeSet
                          key={field.id}
                          fieldName={`${workoutExercise.fieldName}.sets[${setIndex}]`}
                          remove={() => sets.remove(setIndex)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='divide-y divide-slate-600'>
                      {sets.fields.map((field, setIndex) => (
                        <RepetitionSet
                          key={field.id}
                          fieldName={`${workoutExercise.fieldName}.sets[${setIndex}]`}
                          remove={() => sets.remove(setIndex)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

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
