import { Button } from '../shared/Button';
import { ExercisesQuery } from './__generated__/index.generated';
import { gql, useQuery } from '@apollo/client';
import { Page } from '../shared/Page';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { ExerciseList } from './ExerciseList';
import { SearchInput } from '../shared/SearchInput';

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

  const categories = data?.viewer?.exerciseCategories ?? [];

  return (
    <Page href='/' title='Ejercicios'>
      {/* TODO: Query the categories/exercises */}
      <SearchInput onChange={() => {}} />

      <ExerciseList categories={categories} />

      <Button href='/exercises/category/create'>
        <PlusCircleIcon className='w-4 h-4 mr-1' />
        <span>Añadir una categoría</span>
      </Button>
    </Page>
  );
}
