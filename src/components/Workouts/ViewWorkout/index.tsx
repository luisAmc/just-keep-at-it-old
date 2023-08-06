import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon, BoltIcon } from '@heroicons/react/24/outline';
import { WorkoutStatus } from '@prisma/client';
import { gql, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { Page } from 'src/components/shared/Page';
import { useRouter } from 'next/router';
import { ViewWorkoutActions } from './ViewWorkoutActions';
import { WorkoutQuery } from './__generated__/index.generated';
import {
  ViewWorkoutExercise,
  WorkoutExerciseInfoFragment
} from './ViewWorkoutExercise';
import { WorkoutBaseInfoFragment } from '../WorkoutCard';
import clsx from 'clsx';

export const WorkoutFragment = gql`
  fragment ViewWorkout_workout on Workout {
    ...WorkoutCard_workout
    workoutExercises {
      ...ViewWorkoutExercise_workoutExercise
    }
  }
  ${WorkoutBaseInfoFragment}
  ${WorkoutExerciseInfoFragment}
`;

export const query = gql`
  query WorkoutQuery($id: ID!) {
    workout(id: $id) {
      ...ViewWorkout_workout
    }
  }
  ${WorkoutFragment}
`;

export function ViewWorkout() {
  const router = useRouter();

  const { data, loading } = useQuery<WorkoutQuery>(query, {
    variables: { id: router.query.workoutId },
    skip: !router.isReady
  });

  const workout = data?.workout ?? null;
  const isDone = workout?.status === WorkoutStatus.DONE;

  return (
    <Page>
      {loading && <div>Cargando...</div>}

      {workout && (
        <div className="flex h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button href="/" className="">
                <div className="flex items-center justify-center rounded-full bg-brand-300 p-2 text-brand-700">
                  <ChevronLeftIcon className="h-4 w-4" />
                </div>
              </Button>

              <Heading>{workout.name}</Heading>
            </div>

            <ViewWorkoutActions isDone={isDone} />
          </div>

          <div
            className={clsx(
              'flex flex-col space-y-3',
              isDone ? 'text-slate-200 ' : 'bg-amber-300 text-amber-700'
            )}
          >
            {workout.workoutExercises.map((workoutExercise) => (
              <ViewWorkoutExercise
                key={workoutExercise.id}
                workoutExercise={workoutExercise}
                isDone={isDone}
              />
            ))}
          </div>

          {!isDone && (
            <Button href={`/workouts/${router.query.workoutId}/get-it-done`}>
              <BoltIcon className="mr-1 h-4 w-4" />
              <span>Comenzar</span>
            </Button>
          )}
        </div>
      )}
    </Page>
  );
}
