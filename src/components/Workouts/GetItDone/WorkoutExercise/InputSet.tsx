import { Button } from 'src/components/shared/Button';
import { ExerciseType } from '@prisma/client';
import { NumberInput } from 'src/components/shared/NumberInput';
import { TrashIcon } from '@heroicons/react/outline';
import { useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './Contexts/WorkoutExerciseContext';

interface InputSetProps {
  type: ExerciseType;
  index: number;
  onRemove(): void;
}

export function InputSet({ type, index, onRemove }: InputSetProps) {
  const { fieldName } = useWorkoutExerciseContext();
  const { control } = useFormContext();

  return (
    <div className='flex items-center justify-center py-2 gap-x-6'>
      {type === ExerciseType.AEROBIC ? (
        <>
          <NumberInput
            {...control.register(`${fieldName}.sets.${index}.mins`)}
            label='mins'
          />
          <NumberInput
            {...control.register(`${fieldName}.sets.${index}.distance`)}
            label='dist'
          />
          <NumberInput
            {...control.register(`${fieldName}.sets.${index}.kcal`)}
            label='kcal'
          />
        </>
      ) : (
        <>
          <NumberInput
            {...control.register(`${fieldName}.sets.${index}.lbs`)}
            label='lbs'
          />
          <NumberInput
            {...control.register(`${fieldName}.sets.${index}.reps`)}
            label='reps'
          />
        </>
      )}

      <div className='flex-auto'></div>

      <Button
        onClick={onRemove}
        className='p-2 rounded-full bg-slate-600 text-slate-200'
      >
        <TrashIcon className='w-4 h-4' />
      </Button>
    </div>
  );
}
