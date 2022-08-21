import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ExerciseType, WorkoutStatus } from '@prisma/client';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { Page } from 'src/components/shared/Page';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  DoItAgainMutation,
  DoItAgainMutationVariables,
  WorkoutQuery
} from './__generated__/index.generated';

export const WorkoutInfoFragment = gql`
  fragment ViewWorkout_workout on Workout {
    id
    name
    status
    completedAt
    createdAt
    workoutExercisesCount
    workoutExercises {
      id
      exercise {
        id
        name
      }
      setsCount
    }
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
        }
        setsCount
        sets {
          id
          mins
          distance
          kcal
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

  const [doItAgain] = useMutation<
    DoItAgainMutation,
    DoItAgainMutationVariables
  >(
    gql`
      mutation DoItAgainMutation($workoutToCopyId: ID!) {
        doItAgain(workoutToCopyId: $workoutToCopyId) {
          id
        }
      }
    `,
    {
      onCompleted() {
        router.push('/');
      }
    }
  );

  const { data, loading, error } = useQuery<WorkoutQuery>(query, {
    variables: { id: router.query.workoutId },
    skip: !router.isReady
  });

  const workout = data?.workout ?? null;
  const isDone = workout?.status === WorkoutStatus.DONE;

  return (
    <Page>
      {loading && <div>Cargando...</div>}

      {workout && (
        <div className='h-full flex flex-col space-y-4'>
          <div className='flex items-center space-x-2'>
            <Button href='/' className=''>
              <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
                <ChevronLeftIcon className='w-4 h-4' />
              </div>
            </Button>

            <Heading>{workout.name}</Heading>
          </div>

          <div
            className={clsx(
              'flex flex-col space-y-3 p-2 rounded-lg',
              isDone ? 'bg-teal-100' : 'bg-gray-100'
            )}
          >
            {workout.workoutExercises.map((workoutExercise) => (
              <div
                key={workoutExercise.id}
                className={clsx(
                  'px-3 py-2 rounded-lg',
                  isDone
                    ? 'text-teal-700 bg-teal-300'
                    : 'text-gray-700 bg-gray-300'
                )}
              >
                <div className='flex items-center justify-between'>
                  <h2 className='font-medium'>
                    {workoutExercise.exercise.name}
                  </h2>

                  {isDone && (
                    <span className='font-bold text-xs'>
                      {workoutExercise.setsCount} sets
                    </span>
                  )}
                </div>

                {isDone && (
                  <div>
                    {workoutExercise.sets.map((set) => (
                      <div
                        key={set.id}
                        className='flex items-center justify-center'
                      >
                        {workoutExercise.exercise.type ===
                        ExerciseType.AEROBIC ? (
                          <AerobicSet
                            mins={set.mins}
                            distance={set.distance}
                            kcal={set.kcal}
                          />
                        ) : (
                          <StrengthSet lbs={set.lbs} reps={set.reps} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='flex-auto'></div>

          {isDone ? (
            <Button
              variant='secondary'
              onClick={() =>
                doItAgain({
                  variables: {
                    workoutToCopyId: router.query.workoutId as string
                  }
                })
              }
            >
              Volver a hacer
            </Button>
          ) : (
            <Button href={`/workouts/${workout.id}/get-it-done`}>
              <LightningBoltIcon className='w-4 h-4 mr-1' />
              <span>Comenzar</span>
            </Button>
          )}
        </div>
      )}
    </Page>
  );
}

interface AerobicSetProps {
  mins?: number | null;
  distance?: number | null;
  kcal?: number | null;
}

function AerobicSet({ mins, distance, kcal }: AerobicSetProps) {
  return (
    <div className='grid grid-cols-3 gap-6'>
      <span>
        <span className='text-2xl font-medium'>{mins}</span>
        <span className='ml-1'>mins</span>
      </span>

      <span>
        <span className='text-2xl font-medium'>{distance}</span>
        <span className='ml-1'>dist</span>
      </span>

      <span>
        <span className='text-2xl font-medium'>{kcal}</span>
        <span className='ml-1'>kcal</span>
      </span>
    </div>
  );
}

interface StrengthSetProps {
  lbs?: number | null;
  reps?: number | null;
}

function StrengthSet({ lbs, reps }: StrengthSetProps) {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <span>
        <span className='text-2xl font-medium'>{lbs}</span>
        <span className='ml-1'>lbs</span>
      </span>

      <span>
        <span className='text-2xl font-medium'>{reps}</span>
        <span className='ml-1'>reps</span>
      </span>
    </div>
  );
}
