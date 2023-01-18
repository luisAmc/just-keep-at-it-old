import { gql, useQuery } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { WorkoutInfoFragment } from './ViewWorkout';
import { WorkoutsQuery } from './__generated__/index.generated';

export const query = gql`
  query WorkoutsQuery {
    viewer {
      id
      workouts {
        ...ViewWorkout_workout
      }
    }
  }
  ${WorkoutInfoFragment}
`;

export function Workouts() {
  const { data } = useQuery<WorkoutsQuery>(query);

  const workouts = data?.viewer?.workouts ?? [];

  return (
    <div className='mt-6'>
      <Card
        href='/'
        title='Ejercicios'
        action={
          <Button href='/workouts/create'>
            <PlusIcon className='w-4 h-4 mr-1' />
            <span>Crear Rutina</span>
          </Button>
        }
      >
        {workouts.length > 0 ? (
          workouts.map((workout) => <div key={workout.id}>{workout.name}</div>)
        ) : (
          <div>No se han creado rutinas.</div>
        )}
      </Card>
    </div>
  );
}
