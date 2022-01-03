import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { FieldError } from './Form';

interface Props {
  label: string;
  name: string;
  hideLabel?: boolean;
  options: { label: string; value: any }[];
  autoFocus?: boolean;
  formatOptionLabel?: any;
}

export const Search = forwardRef(function Search(
  {
    label,
    name,
    hideLabel = false,
    options,
    autoFocus = false,
    ...props
  }: Props,
  ref
) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ControlledSearch
          label={label}
          hideLabel={hideLabel}
          options={options}
          autoFocus={autoFocus}
          {...props}
          {...field}
        />
      )}
    />
  );
});

interface ControlledSearchProps extends Props {
  onChange: (arg0: any) => void;
}

const ControlledSearch = forwardRef<HTMLSelectElement, ControlledSearchProps>(
  function ControlledSearch(
    { label, hideLabel, options, onChange, ...props },
    ref
  ) {
    const style = {
      option: (base) => ({
        ...base,
        margin: 0,
        padding: 0
      }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 })
    };

    return (
      <label>
        {!hideLabel && (
          <div className='text-sm font-medium text-gray-800 dark:text-gray-200 mb-1'>
            {label}
          </div>
        )}

        <div className='w-full border-gray-200 focus:outline-none focus:border-brand-600 focus:border-2 focus:ring-brand-500'>
          <Select
            {...props}
            onChange={onChange}
            options={options}
            placeholder={`${label}...`}
            noOptionsMessage={() => 'No hay una coincidencia.'}
            menuPortalTarget={document.body}
            styles={style}
          />
        </div>

        <FieldError name={props.name} />
      </label>
    );
  }
);
