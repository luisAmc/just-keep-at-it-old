import { gql, useQuery } from '@apollo/client';
import { ExerciseType, WorkoutStatus } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import { Page } from '../shared/Page';
import { Pill } from '../shared/Pill';
import { useMuscleGroupColors } from './muscleGroupBias';
import { WorkoutQuery } from './__generated__/ViewWorkout.generated';

export const WorkoutInfoFragment = gql`
  fragment ViewWorkout_workout on Workout {
    id
    name
    status
    completedAt
    createdAt
    workoutExercisesCount
    bias
  }
`;

export const query = gql`
  query WorkoutQuery($id: ID!) {
    workout(id: $id) {
      ...ViewWorkout_workout
      workoutExercises {
        id
        exercise {
          id
          name
          type
          muscleGroup
        }
        sets {
          id
          mins
          lbs
          reps
        }
      }
    }
  }
  ${WorkoutInfoFragment}
`;

export function ViewWorkout() {
  const router = useRouter();

  const { data, loading, error } = useQuery<WorkoutQuery>(query, {
    variables: { id: router.query.workoutId },
    skip: !router.isReady
  });

  const aerobicExercises = useMemo(() => {
    return (
      data?.workout.workoutExercises.filter(
        (workoutExercise) =>
          workoutExercise.exercise.type === ExerciseType.AEROBIC
      ) ?? []
    );
  }, [data]);

  const strengthExercises = useMemo(() => {
    return (
      data?.workout.workoutExercises.filter(
        (workoutExercise) =>
          workoutExercise.exercise.type === ExerciseType.STRENGTH
      ) ?? []
    );
  }, [data]);

  return (
    <Page>
      <Card size='xl'>
        {data && (
          <div className='flex flex-col gap-4'>
            <header className='flex items-center justify-between'>
              <Heading>{data.workout.name}</Heading>

              <div className='flex items-center space-x-2'>
                <div className='text-sm font-medium'>
                  {data.workout.workoutExercisesCount} ejercicios
                </div>

                <span>&middot;</span>

                <Pill
                  text={
                    data.workout.status === WorkoutStatus.DONE
                      ? 'Completado'
                      : 'Pendiente'
                  }
                  color={
                    data.workout.status === WorkoutStatus.DONE
                      ? 'success'
                      : 'mono'
                  }
                />
              </div>
            </header>

            {aerobicExercises.length > 0 && (
              <div className='flex flex-col space-y-2 px-2 py-2 rounded-xl bg-aerobic-200 divide-y'>
                {aerobicExercises.map((aerobicExercise) => (
                  <div
                    key={aerobicExercise.id}
                    className={clsx('px-3 py-2 rounded-lg text-aerobic-900')}
                  >
                    <div className='flex items-center justify-between'>
                      <span>{aerobicExercise.exercise.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {strengthExercises.length > 0 && (
              <div className='flex flex-col space-y-2 px-2 py-2 rounded-xl bg-strength-200'>
                {strengthExercises.map((strengthExercise) => (
                  <div
                    key={strengthExercise.id}
                    className={clsx('px-3 py-2 rounded-lg text-strength-900')}
                  >
                    <div className='flex items-center justify-between'>
                      <span>{strengthExercise.exercise.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    </Page>
  );
}

function useExerciseTypeColors(type: string) {
  switch (type) {
    case ExerciseType.AEROBIC:
      return 'bg-aerobic-200';

    case ExerciseType.STRENGTH:
      return 'bg-strength-200';

    default:
      return '';
  }
}
