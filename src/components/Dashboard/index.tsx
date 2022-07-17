import { gql, useQuery } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { WorkoutStatus } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  useMuscleGroupColors,
  useMuscleGroupName
} from 'src/components/Workouts/muscleGroupBias';
import { formatDate } from 'src/utils/transforms';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
import { List, ListItem } from '../shared/List';
import { Page } from '../shared/Page';
import { Pill } from '../shared/Pill';
import { useSlideOver } from '../shared/SlideOver';
import { ViewWorkout, WorkoutInfoFragment } from '../Workouts/ViewWorkout';
import {
  DashboardQuery,
  DashboardQueryVariables
} from './__generated__/index.generated';

const query = gql`
  query DashboardQuery($offset: Int, $limit: Int) {
    viewer {
      id
      workoutsCount
      workouts(offset: $offset, limit: $limit) {
        ...ViewWorkout_workout
      }
    }
  }
  ${WorkoutInfoFragment}
`;

export function Dashboard() {
  const router = useRouter();

  const workoutSlideOver = useSlideOver();

  useEffect(() => {
    if (router.query.workoutId) {
      workoutSlideOver.open();
    } else {
      workoutSlideOver.close();
    }
  }, [router.query.workoutId, workoutSlideOver]);

  const { data, loading, fetchMore } = useQuery<
    DashboardQuery,
    DashboardQueryVariables
  >(query);

  const lastWorkouts = (data?.viewer?.workouts ?? []).slice(0, 3);
  const otherWorkouts = (data?.viewer?.workouts ?? []).slice(3);

  return (
    <Page>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col'>
          <Heading>Últimas rutinas</Heading>
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            <Button
              href='/workouts/create'
              className='border-2 border-dashed border-gray-300 py-6 shadow-md hover:border-brand-500 flex flex-col items-center justify-center rounded-xl bg-white gap-4 text-brand-600'
            >
              <div className='mx-auto flex items-center justify-center p-6 bg-brand-100 rounded-full'>
                <PlusCircleIcon className='w-8 h-8 text-brand-600' />
              </div>

              <p className='font-bold'>Crear una rutina</p>
            </Button>

            {lastWorkouts.map((workout) => (
              // Note: Empty className to leave the button with an empty style slate
              <Button
                key={workout.id}
                className=''
                onClick={() => {
                  router.push(
                    { pathname: '/', query: { workoutId: workout.id } },
                    `/?workoutId=${workout.id}`,
                    {
                      shallow: true
                    }
                  );
                }}
              >
                <div
                  className={clsx(
                    'flex flex-col space-y-2 rounded-xl shadow-md p-6 cursor-pointer border-2 border-opacity-0 hover:border-opacity-100',
                    useMuscleGroupColors(workout.bias)
                  )}
                >
                  <div className='flex'>
                    <Pill
                      text={
                        workout.status === WorkoutStatus.DONE
                          ? 'Completado'
                          : 'Pendiente'
                      }
                      color={
                        workout.status === WorkoutStatus.DONE
                          ? 'success'
                          : 'mono'
                      }
                    />
                  </div>
                  <div className='py-2 text-center font-semibold text-xl'>
                    {workout.name}
                  </div>
                  <div className='text-center'>
                    Bias en {useMuscleGroupName(workout.bias)}
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <div>{formatDate(workout.createdAt, 'dd-LLLL-yy')}</div>
                    <div className='text-sm'>
                      {workout.workoutExercisesCount} ejercicios
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Heading>Rutinas</Heading>
          <List values={otherWorkouts}>
            {(workout, i) => (
              <ListItem
                key={workout.id}
                onClick={() => {
                  router.push(
                    { pathname: '/', query: { workoutId: workout.id } },
                    `/?workoutId=${workout.id}`,
                    {
                      shallow: true
                    }
                  );
                }}
              >
                <div
                  className={clsx(
                    'px-5 py-3 flex items-center justify-between',
                    useMuscleGroupColors(workout.bias)
                  )}
                >
                  <div>
                    <div className='font-bold'>{workout.name}</div>

                    <div className='flex items-center gap-2'>
                      <div>Bias en {useMuscleGroupName(workout.bias)}</div>
                      <span className='text-xl font-bold'>&middot;</span>
                      <div>{workout.workoutExercisesCount} ejercicios</div>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-2 text-sm'>
                    <Pill
                      text={
                        workout.status === WorkoutStatus.DONE
                          ? 'Completado'
                          : 'Pendiente'
                      }
                      color={
                        workout.status === WorkoutStatus.DONE
                          ? 'success'
                          : 'mono'
                      }
                    />

                    <div>{formatDate(workout.createdAt, 'dd-LLLL-yy')}</div>
                  </div>
                </div>
              </ListItem>
            )}
          </List>

          {!loading &&
            data?.viewer?.workouts &&
            data.viewer.workoutsCount > data.viewer.workouts.length && (
              <Button
                variant='secondary'
                onClick={() =>
                  fetchMore({
                    variables: {
                      offset: data.viewer?.workouts.length,
                      limit: 5
                    }
                  })
                }
              >
                Ver más
              </Button>
            )}
        </div>
      </div>

      <ViewWorkout {...workoutSlideOver.props} />
    </Page>
  );
}
