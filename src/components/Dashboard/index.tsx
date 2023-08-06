import { gql, useQuery } from '@apollo/client';
import {
  DocumentTextIcon,
  QueueListIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../shared/Button';
import { Heading } from '../shared/Heading';
import { InfiniteList } from '../shared/InfiniteList';
import { Page } from '../shared/Page';
import { useSlideOver } from '../shared/SlideOver';
import { EmptyWorkouts } from './EmptyWorkouts';
import { WorkoutBaseInfoFragment, WorkoutCard } from '../Workouts/WorkoutCard';
import {
  DashboardQuery,
  DashboardQueryVariables
} from './__generated__/index.generated';

import dynamic from 'next/dynamic';
const TemplatesSlideOver = dynamic(() =>
  import('./TemplatesSlideOver').then((mod) => mod.TemplatesSlideOver)
);

const DASHBOARD_QUERY = gql`
  query DashboardQuery($offset: Int, $limit: Int) {
    viewer {
      id
      workoutsCount
      workouts(offset: $offset, limit: $limit) {
        ...WorkoutCard_workout
      }
    }
  }
  ${WorkoutBaseInfoFragment}
`;

export function Dashboard() {
  const newWorkoutSlideOver = useSlideOver();

  const { data, loading, fetchMore } = useQuery<
    DashboardQuery,
    DashboardQueryVariables
  >(DASHBOARD_QUERY);

  const workouts = data?.viewer?.workouts ?? [];

  const hasNext =
    (data?.viewer?.workoutsCount ?? 0) > (data?.viewer?.workouts.length ?? 0);

  return (
    <>
      <Page>
        <div className="flex items-center justify-between space-x-4">
          <Heading>Historial</Heading>

          <div className="flex items-center justify-center space-x-2">
            <Button size="sm" href="/templates" variant="secondary">
              <DocumentTextIcon className="mr-1 h-4 w-4" />
              <span>Bocetos</span>
            </Button>

            <Button size="sm" href="/exercises" variant="secondary">
              <QueueListIcon className="mr-1 h-4 w-4" />
              <span>Ejercicios</span>
            </Button>
          </div>
        </div>

        {loading && <Shimmer />}

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
              <div className="flex flex-col space-y-4">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            </InfiniteList>
          ))}

        <div className="fixed bottom-6 right-4">
          <Button rounded variant="floating" onClick={newWorkoutSlideOver.open}>
            <PlusCircleIcon className="mr-1 h-4 w-4" />
            <span>Nueva rutina</span>
          </Button>
        </div>

        <TemplatesSlideOver {...newWorkoutSlideOver.props} />
      </Page>
    </>
  );
}

function Shimmer() {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`shimmer-div-${i}`}
          className="rounded-lg bg-slate-700 px-5 py-4"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded-md bg-slate-500"></div>
              <div className="h-3 w-20 rounded-md bg-slate-600"></div>
            </div>

            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
            <div className="h-3 w-52 rounded-md bg-slate-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
