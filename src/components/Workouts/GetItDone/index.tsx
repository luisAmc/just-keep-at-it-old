import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/outline';
import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import {
  GetItDoneDeleteMutation,
  GetItDoneDeleteMutationVariables,
  GetItDoneQuery
} from './__generated__/index.generated';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { Page } from 'src/components/shared/Page';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';
import { Workout } from './Workout';
import { WorkoutExerciseFragment } from './WorkoutExercise/WorkoutExercise';

const WorkoutFragment = gql`
  fragment GetItDone_workout on Workout {
    id
    name
    status
    completedAt
    createdAt
    workoutExercisesCount
    workoutExercises {
      ...WorkoutExercise_workoutExercise
    }
  }
  ${WorkoutExerciseFragment}
`;

export const query = gql`
  query GetItDoneQuery($id: ID!) {
    workout(id: $id) {
      id
      ...GetItDone_workout
    }
  }
  ${WorkoutFragment}
`;

export function GetItDone() {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;
  const deleteModal = useModal();

  const { data, loading } = useQuery<GetItDoneQuery>(query, {
    variables: { id: workoutId },
    fetchPolicy: 'no-cache',
    skip: !router.isReady
  });

  const [deleteCommit] = useMutation<
    GetItDoneDeleteMutation,
    GetItDoneDeleteMutationVariables
  >(
    gql`
      mutation GetItDoneDeleteMutation($workoutId: ID!) {
        deleteWorkout(workoutId: $workoutId) {
          id
        }
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem(`workout-${workoutId}`);
        localStorage.removeItem(`workout-${workoutId}-cache`);
        router.replace('/');
      }
    }
  );

  const workout = data?.workout ?? null;

  return (
    <Page>
      {loading && <div>Cargando...</div>}

      {workout && (
        <div className='h-full flex flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Button href='/' className=''>
                <div className='rounded-full bg-brand-400 text-brand-800 p-2 flex items-center justify-center'>
                  <ChevronLeftIcon className='w-4 h-4' />
                </div>
              </Button>

              <Heading>{workout.name}</Heading>
            </div>

            <div>
              <Button
                onClick={deleteModal.open}
                className='p-2 rounded-full bg-rose-500 text-rose-300 focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 hover:bg-opacity-80'
              >
                <TrashIcon className='w-4 h-4' />
              </Button>

              <ConfirmationModal
                {...deleteModal.props}
                onConfirm={() => {
                  deleteCommit({
                    variables: {
                      workoutId: workoutId
                    }
                  });
                }}
              >
                ¿Está seguro de borrar la rutina?
              </ConfirmationModal>
            </div>
          </div>

          <Workout workout={workout} />
        </div>
      )}
    </Page>
  );
}
