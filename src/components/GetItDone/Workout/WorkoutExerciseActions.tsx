import { Menu, Transition } from '@headlessui/react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  DotsVerticalIcon,
  TrashIcon
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';

export type MoveExerciseAction = 'up' | 'down' | 'first' | 'last';

export function WorkoutExerciseActions() {
  const { isFirst, isLast, onRemove, onMove } = useWorkoutExerciseContext();

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex w-full justify-center rounded-full bg-slate-600 p-2 text-sm font-medium text-slate-200 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <DotsVerticalIcon className='w-4 h-4' />
      </Menu.Button>

      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black bg-opacity-40' />
      </Transition.Child>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='z-20 absolute right-0 -mt-8 w-56 origin-top-right divide-y divide-slate-300 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1'>
            <Menu.Item disabled={isFirst}>
              {({ active, disabled }) => (
                <button
                  type='button'
                  onClick={() => onMove('first')}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active && 'bg-gray-500 text-white',
                    disabled && 'text-slate-600 cursor-not-allowed'
                  )}
                >
                  <ChevronDoubleUpIcon className='mr-2 w-4 h-4' />
                  <span>Mover al inicio</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item disabled={isFirst}>
              {({ active, disabled }) => (
                <button
                  type='button'
                  onClick={() => onMove('up')}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active && 'bg-gray-500 text-white',
                    disabled && 'text-slate-600 cursor-not-allowed'
                  )}
                >
                  <ArrowUpIcon className='mr-2 w-4 h-4' />
                  <span>Mover arriba</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item disabled={isLast}>
              {({ active, disabled }) => (
                <button
                  type='button'
                  onClick={() => onMove('down')}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active && 'bg-gray-500 text-white',
                    disabled && 'text-slate-600 cursor-not-allowed'
                  )}
                >
                  <ArrowDownIcon className='mr-2 w-4 h-4' />
                  <span>Mover abajo</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item disabled={isLast}>
              {({ active, disabled }) => (
                <button
                  type='button'
                  onClick={() => onMove('last')}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active && 'bg-gray-500 text-white',
                    disabled && 'text-slate-600 cursor-not-allowed'
                  )}
                >
                  <ChevronDoubleDownIcon className='mr-2 w-4 h-4' />
                  <span>Mover al final</span>
                </button>
              )}
            </Menu.Item>
          </div>

          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  type='button'
                  onClick={onRemove}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    active ? 'bg-red-500 text-red-50' : 'text-white'
                  )}
                >
                  <TrashIcon className='mr-2 w-4 h-4 text-red-500' />
                  <span>Remover ejercicio</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
