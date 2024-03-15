import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EllipsisVerticalIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import {
  Dropdown,
  DropdownGroup,
  DropdownItem
} from 'src/components/shared/Dropdown';

export function WorkoutExerciseActions() {
  const { isFirst, isLast, onChange, onRemove, onMove } =
    useWorkoutExerciseContext();

  return (
    <Dropdown
      direction="right"
      trigger={<EllipsisVerticalIcon className="h-6 w-6" />}
    >
      <DropdownGroup title="Cambio">
        <DropdownItem
          label="Cambiar ejercicio"
          icon={ArrowsRightLeftIcon}
          onClick={() => onChange()}
        />
      </DropdownGroup>

      <DropdownGroup title="Ubicación">
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
      </DropdownGroup>

      <DropdownGroup title="Peligro">
        <DropdownItem
          variant="danger"
          label="Remover ejercicio"
          icon={TrashIcon}
          onClick={onRemove}
        />
      </DropdownGroup>
    </Dropdown>
  );
}
