import { gql, useQuery } from '@apollo/client';
import { FlagIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
import { InfiniteList } from '../shared/InfiniteList';
import { Page } from '../shared/Page';
import { WorkoutInfoFragment } from '../Workouts/ViewWorkout';
import { EmptyWorkouts } from './EmptyWorkouts';
import { WorkoutCard } from './WorkoutCard';
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
  const { data, loading, fetchMore } = useQuery<
    DashboardQuery,
    DashboardQueryVariables
  >(query);

  const workouts = data?.viewer?.workouts ?? [];
  const hasNext =
    (data?.viewer?.workoutsCount ?? 0) > (data?.viewer?.workouts.length ?? 0);

  return (
    <>
      <Page>
        <div className='flex items-center justify-between space-x-4'>
          <Heading>Historial</Heading>

          <div>
            <Button href='/exercises' color='secondary'>
              <FlagIcon className='w-4 h-4 mr-1' />
              <span>Ver ejercicios</span>
            </Button>
          </div>
        </div>

        {!loading &&
          (workouts.length === 0 ? (
            <EmptyWorkouts />
          ) : (
            <InfiniteList
              length={workouts.length}
              hasNext={hasNext}
              next={() =>
                fetchMore({
                  variables: {
                    offset: data?.viewer?.workouts.length,
                    limit: 5
                  }
                })
              }
            >
              <div className='flex flex-col space-y-4'>
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            </InfiniteList>
          ))}
      </Page>

      <div className='fixed bottom-6 right-4'>
        <Button href='/workouts/create' rounded floating>
          <PlusCircleIcon className='w-4 h-4 mr-1' />
          <span>Rutina</span>
        </Button>
      </div>
    </>
  );
}
