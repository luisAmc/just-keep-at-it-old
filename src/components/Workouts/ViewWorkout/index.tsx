import { WorkoutStatus } from '@prisma/client';
import { gql, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { useRouter } from 'next/router';
import { ViewWorkoutActions } from './ViewWorkoutActions';
import {
  ViewWorkout_Workout,
  WorkoutQuery
} from './__generated__/index.generated';
import {
  ViewWorkoutExercise,
  ViewWorkoutExerciseBasicFragment,
  ViewWorkoutExerciseFragment
} from './ViewWorkoutExercise';
import { ViewWorkoutShimmer } from './ViewWorkoutShimmer';

export const WorkoutBasicFragment = gql`
  fragment ViewWorkout_workoutBasic on Workout {
    id
    name
    status
    createdAt
    workoutExercises {
      ...ViewWorkoutExercise_workoutExerciseBasic
    }
  }
  ${ViewWorkoutExerciseBasicFragment}
`;

export const WorkoutFragment = gql`
  fragment ViewWorkout_workout on Workout {
    ...ViewWorkout_workoutBasic
    workoutExercises {
      ...ViewWorkoutExercise_workoutExercise
    }
  }
  ${WorkoutBasicFragment}
  ${ViewWorkoutExerciseFragment}
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
    <>
      {loading && <ViewWorkoutShimmer />}
      {workout && <Workout workout={workout} />}
    </>
  );
}

interface WorkoutProps {
  workout: ViewWorkout_Workout;
}

function Workout({ workout }: WorkoutProps) {
  return (
    <div className="rounded-lg bg-brand-500/20 p-4">
      <div className="flex items-center justify-between">
        <Heading>{workout.name}</Heading>
        <ViewWorkoutActions />
      </div>

      <div className="mt-4 flex flex-col gap-y-2">
        {workout.workoutExercises.map((we) => (
          <ViewWorkoutExercise key={we.id} workoutExercise={we} />
        ))}
      </div>
    </div>
  );
}
