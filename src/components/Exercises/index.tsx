import { gql, useQuery } from '@apollo/client';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
import { Page } from '../shared/Page';
import clsx from 'clsx';
import { ExercisesQuery } from './__generated__/index.generated';
import { getMuscleGroupColors } from 'src/utils/getMuscleGroupColors';

export const ExerciseInfoFragment = gql`
  fragment Exercise_exercise on Exercise {
    id
    name
    type
    muscleGroup
  }
`;

export const query = gql`
  query ExercisesQuery {
    viewer {
      id
      exercises {
        ...Exercise_exercise
      }
    }
  }
  ${ExerciseInfoFragment}
`;

export function Exercises() {
  const { data } = useQuery<ExercisesQuery>(query);

  const exercises = data?.viewer?.exercises ?? [];

  return (
    <Page>
      <div className='h-full flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <Button href='/' className=''>
            <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
              <ChevronLeftIcon className='w-4 h-4' />
            </div>
          </Button>

          <Heading>Ejercicios</Heading>
        </div>

        <div className='bg-slate-700 flex flex-col px-3 divide-y divide-gray-600 rounded-lg'>
          {exercises.length > 0 &&
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className='px-4 py-3 flex items-center justify-between'
              >
                <div>{exercise.name}</div>

                <span
                  className={clsx(
                    'px-2 inline-flex text-xs font-medium rounded-full',
                    getMuscleGroupColors(exercise.muscleGroup)
                  )}
                >
                  {exercise.muscleGroup ?? 'AEROBIC'}
                </span>
              </div>
            ))}
        </div>

        <div className='flex-auto'></div>

        <Button href='/exercises/create'>
          <PlusCircleIcon className='w-4 h-4 mr-1' />
          <span>Añadir un ejercicio</span>
        </Button>
      </div>
    </Page>
  );
}
