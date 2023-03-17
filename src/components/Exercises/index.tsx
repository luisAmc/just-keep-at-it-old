import { Button } from '../shared/Button';
import { ExercisesQuery } from './__generated__/index.generated';
import { getMuscleGroupColors } from 'src/utils/getMuscleGroupColors';
import { gql, useQuery } from '@apollo/client';
import { IconButton } from '../shared/IconButton';
import { Page } from '../shared/Page';
import {
  PencilSquareIcon,
  PlusCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const ExerciseFragment = gql`
  fragment Exercise_exercise on Exercise {
    id
    name
    type
    muscleGroup
  }
`;

export const ExerciseCategoryFragment = gql`
  fragment Exercise_exerciseCategory on ExerciseCategory {
    id
    name
    type
  }
`;

export const EXERCISES_QUERY = gql`
  query ExercisesQuery {
    viewer {
      id
      exerciseCategories {
        ...Exercise_exerciseCategory
      }
      exercises {
        ...Exercise_exercise
      }
    }
  }
  ${ExerciseCategoryFragment}
  ${ExerciseFragment}
`;

export function Exercises() {
  const { data } = useQuery<ExercisesQuery>(EXERCISES_QUERY);

  const exercises = data?.viewer?.exercises ?? [];

  return (
    <Page href='/' title='Ejercicios'>
      <div className='h-full flex flex-col space-y-4'>
        <div className='bg-slate-700 text-slate-300 flex flex-col px-3 divide-y divide-gray-600 rounded-lg'>
          {exercises.length > 0 ? (
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

                <IconButton
                  icon={PencilSquareIcon}
                  href={`/exercises/${exercise.id}/edit`}
                />
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center space-y-2 p-8'>
              <SparklesIcon className='w-10 h-10' />
              <p className='font-semibold text-sm'>
                No se han creado ejercicios hasta el momento...
              </p>
            </div>
          )}
        </div>

        <div className='flex-auto'></div>

        <Button href='/exercises/category/create'>
          <PlusCircleIcon className='w-4 h-4 mr-1' />
          <span>Añadir una categoría</span>
        </Button>
      </div>
    </Page>
  );
}
