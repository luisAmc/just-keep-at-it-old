import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/outline';
import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import { gql, useMutation } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';
import { useWorkoutContext } from './WorkoutContext';

export function WorkoutHeader() {
  const workout = useWorkoutContext();

  const router = useRouter();
  const deleteModal = useModal();

  const [deleteWorkout] = useMutation(
    gql`
      mutation GetItDoneDeleteMutation($workoutId: ID!) {
        deleteWorkout(workoutId: $workoutId) {
          id
        }
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem(`workout-${workout.id}`);
        router.replace('/');
      }
    }
  );

  return (
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
            deleteWorkout({
              variables: {
                workoutId: workout.id
              }
            });
          }}
        >
          ¿Está seguro de borrar la rutina?
        </ConfirmationModal>
      </div>
    </div>
  );
}
