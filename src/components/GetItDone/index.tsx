import { gql, useQuery } from '@apollo/client';
import { WorkoutProvider } from './Workout/WorkoutContext';
import { Page } from '../shared/Page';
import { useRouter } from 'next/router';
import { GetItDoneQuery } from './__generated__/index.generated';
import { WorkoutFragment } from './Workout';
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
    <Page>
      {loading && <Shimmer />}

      {workout && (
        <WorkoutProvider workout={workout}>
          <Workout />
        </WorkoutProvider>
      )}
    </Page>
  );
}

function Shimmer() {
  return (
    <div className='animate-pulse flex flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex-1 flex items-center space-x-4'>
          <div className='bg-slate-600 rounded-full w-9 h-9'></div>

          <div className='h-10 w-1/2 bg-slate-500 rounded-md'></div>
        </div>

        <div className='bg-slate-600 rounded-full w-9 h-9'></div>
      </div>

      <div className='rounded-lg bg-slate-700 p-3'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='h-5 w-1/3 bg-slate-500 rounded-md'></div>

            <div className='flex items-center space-x-4'>
              <div className='h-5 w-14 bg-slate-500 rounded-md'></div>
              <div className='bg-slate-600 rounded-full w-8 h-8'></div>
            </div>
          </div>

          {/* Spacer */}
          <div></div>

          <div className='flex flex-col space-y-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`shimmer-set-${i}`}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-2'>
                  <div className='h-8 w-16 bg-slate-600 rounded-md'></div>
                  <div className='h-8 w-16 bg-slate-600 rounded-md'></div>
                  <div className='h-8 w-16 bg-slate-600 rounded-md'></div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='h-4 w-10 bg-slate-600 rounded-md'></div>
                  <div className='bg-slate-600 rounded-full w-8 h-8'></div>
                </div>
              </div>
            ))}
          </div>

          <div></div>

          <div className='h-8 w-full bg-slate-600 rounded-md'></div>
        </div>
      </div>

      <div className='h-10 w-full bg-slate-600 rounded-md'></div>

      <div className='h-10 w-full bg-slate-600 rounded-md'></div>
    </div>
  );
}
