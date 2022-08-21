import { gql, useQuery } from '@apollo/client';
import { FireIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
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

  return (
    <Page>
      <div className='flex flex-col space-y-4 pb-4'>
        <div className='flex items-center justify-between space-x-4'>
          <Heading>Últimas rutinas</Heading>

          <Button href='/workouts/create'>
            <PlusCircleIcon className='w-4 h-4 mr-1' />
            <span>Nueva rutina</span>
          </Button>
        </div>

        {!loading &&
          (workouts.length === 0 ? (
            <EmptyWorkouts />
          ) : (
            <div className='flex flex-col space-y-4'>
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ))}

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
              <FireIcon className='w-4 h-4 mr-1' />
              <span className='text-sm'>Ver más rutinas</span>
            </Button>
          )}
      </div>
    </Page>
  );
}
