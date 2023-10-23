import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput({ label, ...props }, ref) {
    return (
      <label className="flex flex-col items-center justify-center">
        <input
          className={clsx(
            'w-16 appearance-none justify-center bg-brand-200 py-0.5 text-center text-xl outline-none',
            'rounded-md border-2 border-transparent focus:border-brand-600 focus:ring-brand-500',
            'placeholder:text-brand-500 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60'
          )}
          ref={ref}
          inputMode="decimal"
          step="any"
          placeholder="0"
          onFocus={(e) => e.target.select()}
          {...props}
        />

        <div className="ml-1 text-sm font-medium">{label}</div>
      </label>
    );
  }
);
