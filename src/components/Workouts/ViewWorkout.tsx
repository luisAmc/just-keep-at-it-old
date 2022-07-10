import { Button } from '../shared/Button';
import { ExerciseType, WorkoutStatus } from '@prisma/client';
import { gql, useQuery } from '@apollo/client';
import { Heading } from '../shared/Heading';
import { Pill } from '../shared/Pill';
import { SlideOver, SlideOverProps } from '../shared/SlideOver';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { WorkoutQuery } from './__generated__/ViewWorkout.generated';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {}

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

export function ViewWorkout({ open, onClose }: Props) {
  const router = useRouter();

  const workoutId = router.query.workoutId as string;

  function handleClose() {
    router.push({ pathname: '/', query: {} }, '/', { shallow: true });
    onClose();
  }

  const { data, loading, error } = useQuery<WorkoutQuery>(query, {
    variables: { id: router.query.workoutId },
    skip: !router.isReady || !workoutId
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

  const isDone = data?.workout.status === WorkoutStatus.DONE;

  return (
    <SlideOver open={open} onClose={handleClose} title='Rutina'>
      {data && (
        <div className='h-full flex flex-col gap-4'>
          <header className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <Heading>{data.workout.name}</Heading>

            <div className='flex items-center justify-end space-x-2'>
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
                  className={clsx(
                    'px-3 py-2 rounded-lg text-aerobic-900',
                    isDone && 'bg-aerobic-300'
                  )}
                >
                  <div className='flex items-center justify-between'>
                    <span>{aerobicExercise.exercise.name}</span>

                    {isDone && (
                      <span className='font-bold text-sm'>
                        {aerobicExercise.sets.length} sets
                      </span>
                    )}
                  </div>

                  {isDone && (
                    <div className='flex flex-col space-y-4 divide-y divide-aerobic-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-aerobic-300'>
                      {aerobicExercise.sets.map((set) => (
                        <div
                          key={set.id}
                          className='flex items-center justify-center'
                        >
                          <span>
                            <span className='text-3xl font-medium'>
                              {set.mins}
                            </span>
                            <span className='ml-1'>mins</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
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

          <div className='flex-auto'></div>

          {isDone ? (
            <Button variant='secondary' onClick={handleClose}>
              Cerrar
            </Button>
          ) : (
            <div className='flex flex-col-reverse sm:grid sm:grid-cols-2 gap-2 border-t pt-4'>
              <Button variant='secondary' onClick={handleClose}>
                Cerrar
              </Button>

              <Button href={`/workouts/${workoutId}/get-it-done`}>
                Comenzar
              </Button>
            </div>
          )}
        </div>
      )}
    </SlideOver>
  );
}
