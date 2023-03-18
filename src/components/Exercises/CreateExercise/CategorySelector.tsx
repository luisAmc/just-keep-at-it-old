import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { FieldError } from 'src/components/shared/Form';
import { RadioGroup } from '@headlessui/react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

interface CategorySelectorProps {
  categories: Array<{
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }>;
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  const {
    field: { value, onChange }
  } = useController({ name: 'categoryId' });

  return (
    <label>
      <div className='font-medium text-slate-200 mb-2 leading-6'>
        Seleccione la categoría
      </div>

      <RadioGroup
        name='categoryId'
        value={value}
        onChange={onChange}
        className='flex flex-col space-y-3'
      >
        {categories.map((category) => (
          <div key={category.label}>
            <div className='text-xs uppercase font-medium text-slate-400 mb-1 leading-4'>
              {category.label}
            </div>

            <div className='grid grid-cols-2 gap-x-2 gap-y-2'>
              {category.options.map((option) => (
                <RadioGroup.Option
                  key={`${category.label}-ro-${option.value}`}
                  value={option.value}
                  className={({ checked, active }) =>
                    clsx(
                      checked ? 'border-brand-600' : 'border-transparent',
                      active ? 'border-brand-600 ring-2 ring-brand-600' : '',
                      'relative flex cursor-pointer rounded-lg border-2 bg-slate-800 p-4 shadow-sm focus:outline-none'
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <span className='flex flex-1'>
                        <span className='flex flex-col'>
                          <RadioGroup.Label
                            as='span'
                            className='block text-sm font-medium text-slate-300'
                          >
                            {option.label}
                          </RadioGroup.Label>
                        </span>
                      </span>

                      <CheckCircleIcon
                        className={clsx(
                          !checked ? 'invisible' : '',
                          'h-5 w-5 text-brand-600'
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>

      <FieldError name='categoryId' />
    </label>
  );
}
