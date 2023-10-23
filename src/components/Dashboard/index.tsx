import {
  DashboardQuery,
  DashboardQueryVariables
} from './__generated__/index.generated';
import { DashboardShimmer } from './DashboardShimmer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { EmptyWorkouts } from './EmptyWorkouts';
import { formatDate } from 'src/utils/transforms';
import { gql, useQuery } from '@apollo/client';
import { Heading } from '../shared/Heading';
import { InfiniteList } from '../shared/InfiniteList';
import { MountainsSVG } from './MountainsSVG';
import { useSlideOver } from '../shared/SlideOver';
import { WorkoutCard } from '../Workouts/WorkoutCard';
import { WorkoutBasicFragment } from '../Workouts/ViewWorkout';

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
        ...ViewWorkout_workoutBasic
      }
    }
  }
  ${WorkoutBasicFragment}
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
      <NewWorkoutCard onClick={newWorkoutSlideOver.open} />

      <div></div>

      <Heading>Historial</Heading>

      {loading && <DashboardShimmer />}

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
            <div className="flex flex-col space-y-2">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </InfiniteList>
        ))}

      {/* <div className="fixed bottom-6 right-4">
        <Button rounded variant="floating" onClick={newWorkoutSlideOver.open}>
          <PlusCircleIcon className="mr-1 h-4 w-4" />
          <span>Nueva rutina</span>
        </Button>
      </div> */}

      {/* <div className="absolute bottom-0 left-0 right-0 mt-3 flex">
        <Button href="/templates" variant="outline">
          <DocumentTextIcon className="mr-1 h-4 w-4" />
          <span>Bocetos</span>
        </Button>

        <Button href="/exercises" variant="outline">
          <QueueListIcon className="mr-1 h-4 w-4" />
          <span>Ejercicios</span>
        </Button>
      </div> */}

      <TemplatesSlideOver {...newWorkoutSlideOver.props} />
    </>
  );
}

interface NewWorkoutCardProps {
  onClick: () => void;
}

function NewWorkoutCard({ onClick }: NewWorkoutCardProps) {
  const currentDate = formatDate(new Date(), 'EEEE, dd MMMM');

  return (
    <div className="relative h-[25rem] overflow-hidden rounded-lg bg-gradient-to-b from-brand-300 to-brand-100 p-6 pb-8 pt-8 shadow-sm">
      <MountainsSVG />

      <div className="relative text-3xl font-semibold tracking-tight">
        ¿Una nueva rútina?
      </div>

      <div className="relative capitalize">{currentDate}</div>

      <div className="absolute bottom-8 right-6 flex justify-end">
        <button
          className="flex items-center space-x-2 border-b border-transparent text-brand-50 hover:border-brand-50"
          onClick={onClick}
        >
          <span className="text-xl">Comenzar</span>
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
