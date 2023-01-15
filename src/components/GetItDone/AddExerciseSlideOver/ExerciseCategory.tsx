import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseCategoryType } from '../Workout/WorkoutUtils';
import { WorkoutExercise_Exercise } from '../Workout/__generated__/WorkoutExercise.generated';
import clsx from 'clsx';

interface Props {
  category: ExerciseCategoryType;
  onClick(exercise: WorkoutExercise_Exercise): void;
}

export function ExerciseCategory({ category, onClick }: Props) {
  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <div>
              <Disclosure.Button
                className={clsx(
                  'w-full px-4 py-3 rounded-t-lg hover:opacity-60',
                  open ? 'bg-white/5' : 'bg-black/20 rounded-b-lg'
                )}
              >
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>{category.name}</span>

                  <ChevronUpIcon
                    className={clsx('w-4 h-4', open && 'rotate-180')}
                  />
                </div>
              </Disclosure.Button>
            </div>

            <Disclosure.Panel className='p-1 flex flex-col space-y-1 bg-black/5 rounded-b-lg'>
              {category.exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  type='button'
                  onClick={() => onClick(exercise)}
                  className='text-left p-3 rounded-lg hover:bg-black/5'
                >
                  {exercise.name}
                </button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
