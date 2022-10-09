import { Button } from 'src/components/shared/Button';
import {
  DotsVerticalIcon,
  LightningBoltIcon,
  RefreshIcon,
  TrashIcon
} from '@heroicons/react/outline';
import { ComponentType, Fragment } from 'react';
import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import {
  DeleteWorkoutMutation,
  DeleteWorkoutMutationVariables,
  DoItAgainMutation,
  DoItAgainMutationVariables
} from './__generated__/ViewWorkoutActions.generated';
import { gql, useMutation } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import { useModal } from 'src/components/shared/Modal';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface ViewWorkoutActionsProps {
  isDone: boolean;
}

export function ViewWorkoutActions({ isDone }: ViewWorkoutActionsProps) {
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
        router.push('/');
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
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex w-full justify-center rounded-full bg-slate-500 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <DotsVerticalIcon className='w-4 h-4' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {!isDone && (
            <div className='px-1 py-1'>
              <ViewWorkoutActionItem
                label='Comenzar'
                icon={LightningBoltIcon}
                href={`/workouts/${workoutId}/get-it-done`}
              />
            </div>
          )}

          {isDone && (
            <div className='px-1 py-1'>
              <ViewWorkoutActionItem
                label='Repetir rutina'
                icon={RefreshIcon}
                onClick={() =>
                  doItAgain({
                    variables: {
                      workoutToCopyId: workoutId
                    }
                  })
                }
              />
            </div>
          )}

          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <Button
                  onClick={deleteModal.open}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active ? 'bg-red-500 text-white' : 'text-red-500'
                  )}
                >
                  <TrashIcon className='mr-2 w-4 h-4' />
                  <span>Borrar</span>
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>

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
    </Menu>
  );
}

interface ViewWorkoutActionItemProps {
  label: string;
  icon: ComponentType<any>;
  onClick?(): void;
  href?: string;
}

function ViewWorkoutActionItem({
  label,
  icon: Icon,
  onClick,
  href
}: ViewWorkoutActionItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Button
          onClick={onClick}
          href={href}
          className={clsx(
            'group flex w-full items-center rounded-md p-2 text-sm',
            active ? 'bg-brand-500 text-white' : 'text-gray-900'
          )}
        >
          <Icon className='mr-2 w-4 h-4' />
          <span>{label}</span>
        </Button>
      )}
    </Menu.Item>
  );
}
