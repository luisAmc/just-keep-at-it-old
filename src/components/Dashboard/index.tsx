import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  DashboardQuery,
  DashboardQueryVariables
} from './__generated__/index.generated';
import { DashboardShimmer } from './DashboardShimmer';
import { EmptyWorkouts } from './EmptyWorkouts';
import { formatDate } from 'src/utils/transforms';
import { gql, useQuery } from '@apollo/client';
import { Heading } from '../shared/Heading';
import { InfiniteList } from '../shared/InfiniteList';
import { MountainsSVG } from './MountainsSVG';
import { useSlideOver } from '../shared/SlideOver';
import { WorkoutCard, WorkoutCardFragment } from '../Workouts/WorkoutCard';

import dynamic from 'next/dynamic';
const TemplatesSlideOver = dynamic(() =>
  import('./TemplatesSlideOver').then((mod) => mod.TemplatesSlideOver)
);

export const DASHBOARD_QUERY = gql`
  query DashboardQuery($offset: Int, $limit: Int) {
    viewer {
      id
      workoutsCount
      workouts(offset: $offset, limit: $limit) {
        ...WorkoutCard_workout
      }
    }
  }
  ${WorkoutCardFragment}
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
    <div className="relative flex flex-1 flex-col gap-y-4 px-2 pb-2">
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
            <div className="flex flex-col gap-y-2">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </InfiniteList>
        ))}

      <TemplatesSlideOver {...newWorkoutSlideOver.props} />
    </div>
  );
}

interface NewWorkoutCardProps {
  onClick: () => void;
}

function NewWorkoutCard({ onClick }: NewWorkoutCardProps) {
  return (
    <div className="relative flex h-52 flex-col gap-y-4 overflow-hidden rounded-lg bg-gradient-to-b from-brand-300 to-brand-100 p-6 pb-8 pt-8 shadow-sm">
      <MountainsSVG />

      <div>
        <div className="relative text-3xl font-semibold tracking-tight">
          ¿Una nueva rútina?
        </div>
        <div className="relative capitalize">
          {formatDate(new Date(), 'EEEE, dd MMMM')}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex justify-end">
        <button
          className="flex items-center space-x-2 border-b border-transparent text-brand-50"
          onClick={onClick}
        >
          <span className="text-xl">Comenzar</span>
          <ArrowRightIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}
