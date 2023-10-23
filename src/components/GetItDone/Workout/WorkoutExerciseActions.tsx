import { Menu } from '@headlessui/react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EllipsisVerticalIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { Dropdown, DropdownItem } from 'src/components/shared/Dropdown';
import clsx from 'clsx';

export function WorkoutExerciseActions() {
  const { isFirst, isLast, onRemove, onMove } = useWorkoutExerciseContext();

  return (
    <Dropdown
      direction="right"
      trigger={<EllipsisVerticalIcon className="h-6 w-6" />}
    >
      <DropdownItem
        label="Mover al inicio"
        icon={ChevronDoubleUpIcon}
        onClick={() => onMove('first')}
        disabled={isFirst}
      />

      <DropdownItem
        label="Mover arriba"
        icon={ArrowUpIcon}
        onClick={() => onMove('up')}
        disabled={isFirst}
      />

      <DropdownItem
        label="Mover abajo"
        icon={ArrowDownIcon}
        onClick={() => onMove('down')}
        disabled={isLast}
      />

      <DropdownItem
        label="Mover al final"
        icon={ChevronDoubleDownIcon}
        onClick={() => onMove('last')}
        disabled={isLast}
      />

      <div className="p-1">
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={onRemove}
              className={clsx(
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                active ? 'bg-red-500 text-white' : 'text-red-500'
              )}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              <span>Remover ejercicio</span>
            </button>
          )}
        </Menu.Item>
      </div>
    </Dropdown>
  );
}
