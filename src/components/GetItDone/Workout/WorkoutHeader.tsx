import { gql, useMutation } from '@apollo/client';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Button } from 'src/components/shared/Button';
import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import { Heading } from 'src/components/shared/Heading';
import { useModal } from 'src/components/shared/Modal';
import { EditNameModal } from './EditNameModal';
import { useWorkoutContext } from './WorkoutContext';

export function WorkoutHeader() {
  const router = useRouter();

  const { name, workoutId } = useWorkoutContext();
  const editNameModal = useModal();
  const deleteModal = useModal();

  const [deleteWorkout] = useMutation(
    gql`
      mutation WorkoutHeaderDeleteMutation($workoutId: ID!) {
        deleteWorkout(workoutId: $workoutId) {
          id
        }
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem(`workout-${workoutId}`);
        router.replace('/');
      }
    }
  );

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <Button href='/' className=''>
          <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
            <ChevronLeftIcon className='w-4 h-4' />
          </div>
        </Button>

        <Button variant='ghost' size='sm' onClick={editNameModal.open}>
          <Heading>{name}</Heading>
        </Button>

        <EditNameModal {...editNameModal.props} />
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
                workoutId: workoutId
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
