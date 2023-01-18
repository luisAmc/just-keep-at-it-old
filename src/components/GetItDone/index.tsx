import { GetItDoneQuery } from './__generated__/index.generated';
import { gql, useQuery } from '@apollo/client';
import { Page } from '../shared/Page';
import { useRouter } from 'next/router';
import { Workout, WorkoutFragment } from './Workout/Workout';

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
    <Page>
      {loading && <Shimmer />}
      {workout && <Workout workout={workout} />}
    </Page>
  );
}

function Shimmer() {
  return <div>Cargando...</div>;
}
