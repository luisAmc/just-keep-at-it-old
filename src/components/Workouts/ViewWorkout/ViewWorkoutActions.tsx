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
import { Reference, gql, useMutation } from '@apollo/client';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';

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
      onCompleted() {
        router.push(`/`);
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
      update(cache, { data }) {
        cache.modify({
          fields: {
            workouts(existingWorkouts, { readField }) {
              return existingWorkouts.filter(
                (workoutRef: Reference) =>
                  data!.deleteWorkout.id !== readField('id', workoutRef)
              );
            }
          }
        });
      },
      onCompleted() {
        router.replace('/');
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
