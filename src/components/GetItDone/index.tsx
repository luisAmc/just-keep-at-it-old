import { gql, useQuery } from '@apollo/client';
import { WorkoutProvider } from './Workout/WorkoutContext';
import { Page } from '../shared/Page';
import { useRouter } from 'next/router';
import { GetItDoneQuery } from './__generated__/index.generated';
import { WorkoutFragment } from './Workout';
import { GetItDoneShimmer } from './GetItDoneShimmer';
import dynamic from 'next/dynamic';

const { Workout } = {
  Workout: dynamic(() => import('./Workout').then((mod) => mod.Workout))
};

export const query = gql`
  query GetItDoneQuery($workoutId: ID!) {
    workout(id: $workoutId) {
      id
      ...Workout_workout
    }
  }
  ${WorkoutFragment}
`;

export function GetItDone() {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  const { data, loading } = useQuery<GetItDoneQuery>(query, {
    variables: { workoutId },
    fetchPolicy: 'no-cache',
    skip: !router.isReady
  });

  const workout = data?.workout ?? null;

  return (
    <>
      {loading && <GetItDoneShimmer />}

      {workout && (
        <WorkoutProvider workout={workout}>
          <Workout />
        </WorkoutProvider>
      )}
    </>
  );
}
