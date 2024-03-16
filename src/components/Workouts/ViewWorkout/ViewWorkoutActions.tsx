import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import {
  DeleteWorkoutMutation,
  DeleteWorkoutMutationVariables,
  DoItAgainMutation,
  DoItAgainMutationVariables
} from './__generated__/ViewWorkoutActions.generated';
import { Dropdown, DropdownItem } from 'src/components/shared/Dropdown';
import {
  EllipsisVerticalIcon,
  ArrowPathIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { gql, useMutation } from '@apollo/client';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';
import { DASHBOARD_QUERY } from 'src/components/Dashboard';
import toast from 'react-hot-toast';

export function ViewWorkoutActions() {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  const deleteModal = useModal();

  const [doItAgain] = useMutation<
    DoItAgainMutation,
    DoItAgainMutationVariables
  >(
    gql`
      mutation DoItAgainMutation($workoutToCopyId: ID!) {
        doItAgain(workoutToCopyId: $workoutToCopyId) {
          id
        }
      }
    `,
    {
      refetchQueries: [DASHBOARD_QUERY],
      onCompleted(data) {
        toast.success('¡Rútina creada!');

        router.push(`/workouts/${data.doItAgain.id}/get-it-done`);
      }
    }
  );

  const [deleteCommit] = useMutation<
    DeleteWorkoutMutation,
    DeleteWorkoutMutationVariables
  >(
    gql`
      mutation DeleteWorkoutMutation($workoutId: ID!) {
        deleteWorkout(workoutId: $workoutId) {
          id
        }
      }
    `,
    {
      update(cache) {
        const deletedWorkoutId = cache.identify({
          __typename: 'Workout',
          id: workoutId
        });

        cache.evict({ id: deletedWorkoutId });
        cache.gc();
      },
      onCompleted() {
        toast.success('Rútina eliminada.');

        router.push('/');
      }
    }
  );

  return (
    <>
      <Dropdown
        direction="right"
        trigger={<EllipsisVerticalIcon className="h-6 w-6" />}
      >
        <DropdownItem
          label="Repetir rutina"
          icon={ArrowPathIcon}
          onClick={() =>
            doItAgain({
              variables: {
                workoutToCopyId: workoutId
              }
            })
          }
        />

        <DropdownItem
          variant="danger"
          label="Borrar"
          icon={TrashIcon}
          onClick={deleteModal.open}
        />
      </Dropdown>

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
    </>
  );
}
