import { ExerciseType } from '@prisma/client';
import { MostRecentCorrespondingSet } from './WorkoutUtils';
import { NumberInput } from 'src/components/shared/NumberInput';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { IconButton } from 'src/components/shared/IconButton';

interface Props {
  index: number;
  type: ExerciseType;
  onRemove(): void;
}

export function WorkoutExerciseSet({ type, index, onRemove }: Props) {
  const workoutExercise = useWorkoutExerciseContext();
  const { control } = useFormContext();

  const fieldName = `${workoutExercise.fieldName}.sets.${index}`;

  return (
    <div className='flex items-center justify-center py-2 gap-x-6'>
      <div className='w-full grid grid-cols-2'>
        <div className='flex items-center space-x-2'>
          {type === ExerciseType.AEROBIC ? (
            <>
              <NumberInput
                {...control.register(`${fieldName}.mins`)}
                label='mins'
              />
              <NumberInput
                {...control.register(`${fieldName}.distance`)}
                label='dist'
              />
              <NumberInput
                {...control.register(`${fieldName}.kcal`)}
                label='kcal'
              />
            </>
          ) : (
            <>
              <NumberInput
                {...control.register(`${fieldName}.lbs`)}
                label='lbs'
              />
              <NumberInput
                {...control.register(`${fieldName}.reps`)}
                label='reps'
              />
            </>
          )}
        </div>

        <div className='flex justify-end'>
          <MostRecentCorrespondingSet index={index} />
        </div>
      </div>

      <IconButton onClick={onRemove} icon={TrashIcon} />
    </div>
  );
}