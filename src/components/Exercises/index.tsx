import { Button } from '../shared/Button';
import { ExercisesQuery } from './__generated__/index.generated';
import { gql, useQuery } from '@apollo/client';
import { Page } from '../shared/Page';
import {
  ChartBarIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useExerciseCategories } from './useExerciseCategories';
import { IconButton } from '../shared/IconButton';

export const ExerciseFragment = gql`
  fragment Exercise_exercise on Exercise {
    id
    name
  }
`;

export const ExerciseCategoryFragment = gql`
  fragment Exercise_exerciseCategory on ExerciseCategory {
    id
    name
    type
    exercises {
      ...Exercise_exercise
    }
  }
`;

export const EXERCISES_QUERY = gql`
  query ExercisesQuery {
    viewer {
      id
      exerciseCategories {
        ...Exercise_exerciseCategory
      }
    }
  }
  ${ExerciseCategoryFragment}
  ${ExerciseFragment}
`;

export function Exercises() {
  const { data } = useQuery<ExercisesQuery>(EXERCISES_QUERY);

  const exercises = useExerciseCategories(
    data?.viewer?.exerciseCategories ?? []
  );

  return (
    <Page href='/' title='Ejercicios'>
      <div className='bg-slate-700 text-slate-300 flex divide-y divide-gray-600 rounded-lg flex-col p-2'>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className='px-4 py-3 flex items-center justify-between'
            >
              <div>{exercise.name}</div>

              <div className='flex space-x-2'>
                <span className='bg-gray-600 px-2 py-0.5 inline-flex space-x-1 text-xs font-medium rounded-full'>
                  {exercise.category}
                </span>
              </div>

              <div className='flex space-x-2'>
                <IconButton
                  icon={ChartBarIcon}
                  href={`/exercises/${exercise.id}/edit`}
                />

                <IconButton
                  icon={PencilSquareIcon}
                  href={`/exercises/${exercise.id}/edit`}
                />
              </div>
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

      <Button variant='dashed' href='/exercises/category/create'>
        <PlusCircleIcon className='w-4 h-4 mr-1' />
        <span>Añadir una categoría</span>
      </Button>

      <Button href='/exercises/create'>
        <PlusCircleIcon className='w-4 h-4 mr-1' />
        <span>Añadir un ejercicio</span>
      </Button>
    </Page>
  );
}
