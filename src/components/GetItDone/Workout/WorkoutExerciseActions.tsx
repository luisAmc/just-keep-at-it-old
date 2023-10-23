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

      <DropdownItem
        variant="danger"
        label="Remover ejercicio"
        icon={TrashIcon}
        onClick={onRemove}
      />
    </Dropdown>
  );
}
