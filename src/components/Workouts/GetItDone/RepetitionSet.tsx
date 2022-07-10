import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import { useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';

interface Props {
  exerciseId: string;
  setId: number;
  disabled: boolean;
}

export function RepetitionSet({ exerciseId, setId, disabled }: Props) {
  const { control, setValue } = useFormContext();

  const SET_ID = `strengths.${exerciseId}.sets.${setId}`;
  const set: { reps: number; lbs: number } = useWatch({
    control,
    name: SET_ID
  });

  function handleLbsChange(amount: number) {
    const updatedValue = set.lbs + amount;
    setValue(`${SET_ID}.lbs`, updatedValue > 0 ? updatedValue : 0);
  }

  function handleRepsChange(amount: number) {
    const updatedValue = set.reps + amount;
    setValue(`${SET_ID}.reps`, updatedValue > 0 ? updatedValue : 0);
  }

  return (
    <div
      className={clsx(
        'pt-2 flex border-strength-800/20',
        disabled
          ? 'flex-col space-y-4'
          : 'items-center justify-center space-x-4'
      )}
    >
      {/* Weight */}
      <div className='flex items-center justify-evenly space-x-4'>
        {disabled && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              disabled={set.lbs === 0}
              className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(-5)}
            >
              <MinusIcon className='w-4 h-4' />
              <span>5</span>
            </button>

            <button
              type='button'
              disabled={set.lbs === 0}
              className='p-4 rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(-1)}
            >
              <MinusIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        <span className='px-2'>
          <span className='text-3xl font-medium'>{set.lbs}</span>
          <span className='ml-1'>lbs</span>
        </span>

        {disabled && (
          <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              className='p-4 rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(1)}
            >
              <PlusIcon className='w-4 h-4' />
            </button>
            <button
              type='button'
              className='flex items-center space-x-1 p-2 text-sm rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleLbsChange(5)}
            >
              <PlusIcon className='w-4 h-4' />
              <span>5</span>
            </button>
          </div>
        )}
      </div>

      {/* Reps */}
      <div className='flex items-center justify-evenly space-x-4'>
        {disabled && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-evenly space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              disabled={set.reps === 0}
              className='flex items-center space-x-1 p-2 text-sm rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(-5)}
            >
              <MinusIcon className='w-3 h-3' />
              <span>5</span>
            </button>

            <button
              type='button'
              disabled={set.reps === 0}
              className='p-4 rounded-full disabled:opacity-30 bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(-1)}
            >
              <MinusIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        <span className='px-2'>
          <span className='text-3xl font-medium'>{set.reps}</span>
          <span className='ml-1'>rep</span>
        </span>

        {disabled && (
          <div className='flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4'>
            <button
              type='button'
              className='p-4 rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(1)}
            >
              <PlusIcon className='w-4 h-4' />
            </button>

            <button
              type='button'
              className='flex items-center space-x-1 p-2 text-sm rounded-full bg-strength-400 hover:bg-strength-500 disabled:hover:bg-strength-400'
              onClick={() => handleRepsChange(5)}
            >
              <PlusIcon className='w-3 h-3' />
              <span>5</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
