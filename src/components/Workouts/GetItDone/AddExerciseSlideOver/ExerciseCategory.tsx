import { ChevronUpIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseCategory } from './AddExerciseUtils';
import clsx from 'clsx';
import { WorkoutExercise_Exercise } from '../WorkoutExercise/__generated__/WorkoutExercise.generated';

interface ExerciseCategoryProps {
  category: ExerciseCategory;
  onClick(exercise: WorkoutExercise_Exercise): void;
}

export function ExerciseCategory({ category, onClick }: ExerciseCategoryProps) {
  return (
    <div>
      <Disclosure defaultOpen={true}>
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
