import { gql, useQuery } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import {
  ExercisesQuery,
  ExercisesQueryVariables
} from './__generated__/index.generated';

export const query = gql`
  query ExercisesQuery {
    me {
      id
      exercises {
        id
        name
        type
        muscleGroup
      }
    }
  }
`;

export function Exercises() {
  const { data, loading } = useQuery<ExercisesQuery, ExercisesQueryVariables>(
    query
  );

  const exercises = data?.me?.exercises ?? [];

  return (
    <div className='mt-6'>
      <Card
        title='Ejercicios'
        action={
          <Button href='/exercises/create'>
            <PlusIcon className='w-4 h-4 mr-1' />
            <span>Crear Ejercicio</span>
          </Button>
        }
      >
        {exercises.length > 0 ? (
          exercises.map((exercise) => <div>{exercise.name}</div>)
        ) : (
          <div>No se han creado ejercicios.</div>
        )}
      </Card>
    </div>
  );
}
