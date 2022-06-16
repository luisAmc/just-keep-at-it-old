import { gql, useQuery } from '@apollo/client';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/outline';
import { MuscleGroup } from '@prisma/client';
import clsx from 'clsx';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
import { Page } from '../shared/Page';
import { WorkoutInfoFragment } from '../Workouts/ViewWorkout';
import { DashboardQuery } from './__generated__/index.generated';

const query = gql`
  query DashboardQuery {
    workouts {
      ...ViewWorkout_workout
    }
  }
  ${WorkoutInfoFragment}
`;

export function Dashboard() {
  const { data } = useQuery<DashboardQuery>(query);

  const workouts = data?.workouts ?? [];

  return (
    <Page>
      <div className='flex flex-col'>
        <Heading>Últimas rutinas</Heading>
        <div className='mt-4 grid grid-cols-4 gap-4'>
          <Button
            href='/workouts/create'
            className='border-2 border-dashed border-gray-300 shadow-md hover:border-brand-500 flex flex-col items-center justify-center rounded-xl bg-white gap-4 text-brand-600'
          >
            <div className='mx-auto flex items-center justify-center p-6 bg-brand-100 rounded-full'>
              <PlusCircleIcon className='w-8 h-8 text-brand-600' />
            </div>

            <p className='font-bold'>Crear una rutina</p>
          </Button>
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className={clsx(
                'bg-white rounded-xl shadow-md p-6 cursor-pointer',
                useMuscleGroupColors(workout.heavyUseOf)
              )}
            >
              <div>{workout.id}</div>
              <div>{workout.name}</div>
              <div>{workout.status}</div>
              <div>{workout.workoutExercisesCount}</div>
              <div>{workout.heavyUseOf}</div>
              <div>{workout.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function useMuscleGroupColors(muscleGroup: string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-200 shadow-arms-400 text-arms-900';

    case MuscleGroup.BACK:
      return 'bg-back-200 shadow-back-400 text-back-900';

    case MuscleGroup.CHEST:
      return 'bg-chest-200 shadow-chest-400 text-chest-900';

    case MuscleGroup.LEGS:
      return 'bg-legs-200 shadow-legs-400 text-legs-900';

    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-200 shadow-shoulders-400 text-shoulders-900';

    default:
      return 'bg-aerobic-200 shadow-aerobic-400 text-aerobic-900';
  }
}
