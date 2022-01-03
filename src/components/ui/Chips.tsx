import { CheckIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldError } from './Form';

interface ChipProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  single?: boolean;
}

export function Chips({ single = false, label, name, options }: ChipProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ControlledChips
          {...field}
          label={label}
          options={options}
          single={single}
        />
      )}
    />
  );
}

const ControlledChips = forwardRef(function (
  {
    label,
    options,
    onChange,
    single,
    ...props
  }: { onChange: (value: any) => void; value: string | string[] } & ChipProps,
  ref
) {
  function handleClick(value: string) {
    if (single) {
      onChange(value);
    } else {
      if (props.value.includes(value)) {
        onChange([...props.value].filter((item) => item !== value));
      } else {
        onChange([...props.value, value]);
      }
    }
  }

  return (
    <label>
      <div className='font-medium text-gray-800 dark:text-gray-200 mb-1'>
        {label}
      </div>

      <div className='flex flex-wrap gap-x-2 gap-y-4'>
        {options.map((chip) => (
          <IndividualChip
            key={chip.value}
            {...chip}
            isSelected={
              single
                ? props.value === chip.value
                : props.value.includes(chip.value)
            }
            onClick={handleClick}
          />
        ))}
      </div>

      <FieldError name={props.name} />
    </label>
  );
});

interface IndividualChipProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

function IndividualChip({
  label,
  value,
  isSelected,
  onClick
}: IndividualChipProps) {
  return (
    <div
      className={clsx(
        'flex items-center p-2 rounded-full leading-3 transition-all ease-in-out cursor-pointer select-none text-sm',
        isSelected ? 'bg-brand-300 text-brand-800' : 'bg-stone-200'
      )}
      onClick={() => onClick(value)}
    >
      {isSelected && <CheckIcon className='w-3 h-3.w-3 mr-1' />}
      <span>{label}</span>
    </div>
  );
}
