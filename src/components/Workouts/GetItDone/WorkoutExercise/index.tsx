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
import { WorkoutExerciseActions } from './WorkoutExerciseActions';
import clsx from 'clsx';
import { ZoomInIcon } from '@heroicons/react/solid';

interface WorkoutExerciseProps {
  fieldName: string;
  exercise: {
    exerciseId: string;
    name: string;
    type: string;
  };
  onSelect(exerciseId: string): void;
  onRemove(): void;
}

export function WorkoutExercise({
  fieldName,
  exercise,
  onSelect,
  onRemove
}: WorkoutExerciseProps) {
  const isAerobic = exercise?.type === ExerciseType.AEROBIC;

  const [animateParent] = useAutoAnimate<HTMLDivElement>();
  const { control } = useFormContext();

  const sets = useFieldArray({
    control,
    name: `${fieldName}.sets`
  });

  function addSet() {
    sets.append({ mins: '', distance: '', kcal: '', reps: '', lbs: '' });
  }

  return (
    <div
      ref={animateParent}
      className='p-4 rounded-lg bg-gray-100 text-gray-700'
    >
      <Disclosure>
        {({ open }) => (
          <>
            <div className='flex items-center space-x-4'>
              <Disclosure.Button className='flex w-full justify-between'>
                <span className='font-medium'>{exercise.name}</span>

                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-medium'>
                    {sets.fields.length} sets
                  </span>

                  <ChevronUpIcon
                    className={clsx('w-4 h-4', open && 'transform rotate-180')}
                  />
                </div>
              </Disclosure.Button>

              <WorkoutExerciseActions onRemove={onRemove} />
            </div>

            <Disclosure.Panel className='pt-4'>
              {sets.fields.length > 0 && (
                <>
                  {isAerobic ? (
                    <div>
                      {sets.fields.map((field, setIndex) => (
                        <TimeSet
                          key={field.id}
                          fieldName={`${fieldName}.sets[${setIndex}]`}
                          remove={() => sets.remove(setIndex)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      {sets.fields.map((field, setIndex) => (
                        <RepetitionSet
                          key={field.id}
                          fieldName={`${fieldName}.sets[${setIndex}]`}
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
                  className='w-full flex flex-col items-center justify-center py-5 text-gray-500 border-2 border-dashed border-gray-300 group hover:border-gray-400 rounded-lg'
                  onClick={addSet}
                >
                  <SparklesIcon className='w-6 h-6 group-hover:text-gray-600' />
                  <span className='font-semibold group-hover:text-gray-600'>
                    Comenzar
                  </span>
                </button>
              ) : (
                <div className='flex items-center gap-2'>
                  <Button color='secondary' onClick={addSet}>
                    <PlusIcon className='w-4 h-4 mr-1' />
                    <span>Añadir set</span>
                  </Button>

                  <Button
                    onClick={() => onSelect(exercise.exerciseId)}
                    className='rounded-full p-2 bg-gray-500 text-white'
                  >
                    <ZoomInIcon className='w-4 h-4' />
                  </Button>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
