import { gql, useQuery } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import {
  ExercisesQuery,
  ExercisesQueryVariables
} from './__generated__/index.generated';

export const ExerciseInfoFragment = gql`
  fragment Exercises_exercise on Exercise {
    id
    name
    type
    muscleGroup
  }
`;

export const query = gql`
  query ExercisesQuery {
    me {
      id
      exercises {
        ...Exercises_exercise
      }
    }
  }
  ${ExerciseInfoFragment}
`;

export function Exercises() {
  const { data } = useQuery<ExercisesQuery>(query);

  const exercises = data?.me?.exercises ?? [];

  return (
    <div className='mt-6'>
      <Card
        href='/'
        title='Ejercicios'
        action={
          <Button href='/exercises/create'>
            <PlusIcon className='w-4 h-4 mr-1' />
            <span>Crear Ejercicio</span>
          </Button>
        }
      >
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise.id}>{exercise.name}</div>
          ))
        ) : (
          <div>No se han creado ejercicios.</div>
        )}
      </Card>
    </div>
  );
}
