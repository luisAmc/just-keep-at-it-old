import { TrashIcon } from '@heroicons/react/outline';
import { useFormContext } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { NumberInput } from 'src/components/shared/NumberInput';

interface Props {
  fieldName: string;

  remove(): void;
}

export function TimeSet({ fieldName, remove }: Props) {
  const { control } = useFormContext();

  return (
    <div className='flex items-center justify-center py-2 gap-x-6'>
      <NumberInput {...control.register(`${fieldName}.mins`)} label='mins' />
      <NumberInput
        {...control.register(`${fieldName}.distance`)}
        label='dist'
      />
      <NumberInput {...control.register(`${fieldName}.kcal`)} label='kcal' />

      <div className='flex-auto'></div>

      <Button
        onClick={remove}
        className='p-2 rounded-full bg-gray-100 text-gray-500 border border-gray-200'
      >
        <TrashIcon className='w-4 h-4' />
      </Button>
    </div>
  );
}
