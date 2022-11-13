import { FieldError } from '../../shared/Form';
import { MuscleGroup } from '@prisma/client';
import { RadioGroup } from '@headlessui/react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

function getMuscleGroupColors(muscleGroup: string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-200 ring-arms-400 text-arms-900';

    case MuscleGroup.BACK:
      return 'bg-back-200 ring-back-400 text-back-900';

    case MuscleGroup.CHEST:
      return 'bg-chest-200 ring-chest-400 text-chest-900';

    case MuscleGroup.LEGS:
      return 'bg-legs-200 ring-legs-400 text-legs-900';

    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-200 ring-shoulders-400 text-shoulders-900';

    default:
      '';
  }
}

interface Props {
  name: string;
  label?: string;
  options: { label: string; description?: string; value: string }[];
}

export function MuscleGroupSelector({ label, options, name }: Props) {
  const {
    field: { value, onChange }
  } = useController({ name });

  return (
    <label>
      <div className='font-medium text-slate-200 mb-1'>{label}</div>

      <RadioGroup value={value} onChange={onChange}>
        <div className='flex '>
          {options.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className={({ active, checked }) =>
                clsx(
                  getMuscleGroupColors(option.value),
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'm-0.5 relative rounded-lg flex items-center justify-center cursor-pointer focus:outline-none'
                )
              }
            >
              <RadioGroup.Label
                as='span'
                className='font-medium text-sm px-2 py-1.5'
              >
                {option.label}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <FieldError name={name} />
    </label>
  );
}
