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
import { Menu } from '@headlessui/react';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';
import clsx from 'clsx';

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
      onCompleted(data) {
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

        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                onClick={deleteModal.open}
                className={clsx(
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  active ? 'bg-red-500 text-white' : 'text-red-500'
                )}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Borrar</span>
              </button>
            )}
          </Menu.Item>
        </div>
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
