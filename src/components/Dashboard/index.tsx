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
import { Calendar } from '../shared/Calendar';

import dynamic from 'next/dynamic';
const TemplatesSlideOver = dynamic(() =>
  import('./TemplatesSlideOver').then((mod) => mod.TemplatesSlideOver)
);

export const DASHBOARD_QUERY = gql`
  query DashboardQuery($offset: Int, $limit: Int) {
    viewer {
      id
      workedDays
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
      <NewWorkoutCard
        markedDays={data?.viewer?.workedDays ?? []}
        onClick={newWorkoutSlideOver.open}
      />

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

      <TemplatesSlideOver {...newWorkoutSlideOver.props} />
    </>
  );
}

interface NewWorkoutCardProps {
  markedDays: Array<string>;
  onClick: () => void;
}

function NewWorkoutCard({ markedDays, onClick }: NewWorkoutCardProps) {
  return (
    <div className="relative flex flex-col gap-y-4  overflow-hidden rounded-lg bg-gradient-to-b from-brand-300 to-brand-100 p-6 pb-8 pt-8 shadow-sm">
      <MountainsSVG />

      <div>
        <div className="relative text-3xl font-semibold tracking-tight">
          ¿Una nueva rútina?
        </div>
        <div className="relative capitalize">
          {formatDate(new Date(), 'EEEE, dd MMMM')}
        </div>
      </div>

      <Calendar markedDays={markedDays ?? []} />

      <div className="relative flex justify-end">
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
