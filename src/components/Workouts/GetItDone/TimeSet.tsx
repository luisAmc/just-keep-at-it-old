import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  exerciseId: string;
  setId: number;
  disabled: boolean;
}

export function TimeSet({ exerciseId, setId, disabled }: Props) {
  const { control, setValue } = useFormContext();

  const SET_ID = `aerobics.${exerciseId}.sets.${setId}.mins`;
  const mins: number = useWatch({ control, name: SET_ID });

  function handleRepsChange(amount: number) {
    const updatedValue = mins + amount;
    setValue(SET_ID, updatedValue > 0 ? updatedValue : 0);
  }

  return (
    <div className='pt-2 flex flex-col space-y-4 border-aerobic-800/20'>
      <div className='flex items-center justify-evenly space-x-4'>
        {disabled && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              disabled={mins === 0}
              className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
              onClick={() => handleRepsChange(-5)}
            >
              <MinusIcon className='w-4 h-4' />
              <span>5</span>
            </button>

            <button
              type='button'
              disabled={mins === 0}
              className='p-4 rounded-full disabled:opacity-30 bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
              onClick={() => handleRepsChange(-1)}
            >
              <MinusIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        <span>
          <span className='text-3xl font-medium'>{mins}</span>
          <span className='ml-1'>mins</span>
        </span>

        {disabled && (
          <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              className='p-4 rounded-full bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
              onClick={() => handleRepsChange(1)}
            >
              <PlusIcon className='w-4 h-4' />
            </button>
            <button
              type='button'
              className='flex items-center space-x-1 p-2 text-sm rounded-full bg-aerobic-400 hover:bg-aerobic-500 disabled:hover:bg-aerobic-400'
              onClick={() => handleRepsChange(5)}
            >
              <PlusIcon className='w-4 h-4' />
              <span>5</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
