import { ExerciseType } from '@prisma/client';
import { NumberInput } from 'src/components/shared/NumberInput';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { IconButton } from 'src/components/shared/IconButton';
import { MostRecentCorrespondingSet } from './utils';

interface Props {
  index: number;
  type: ExerciseType;
  onRemove(): void;
}

export function WorkoutExerciseSet({ type, index, onRemove }: Props) {
  const workoutExercise = useWorkoutExerciseContext();
  const { control } = useFormContext();

  const formFieldName = `${workoutExercise.formFieldName}.sets.${index}`;

  return (
    <div className='flex items-center justify-center py-2 gap-x-6'>
      <div className='w-full grid grid-cols-2'>
        <div className='flex items-center space-x-2'>
          {type === ExerciseType.AEROBIC ? (
            <>
              <NumberInput
                {...control.register(`${formFieldName}.mins`)}
                label='mins'
              />
              <NumberInput
                {...control.register(`${formFieldName}.distance`)}
                label='dist'
              />
              <NumberInput
                {...control.register(`${formFieldName}.kcal`)}
                label='kcal'
              />
            </>
          ) : (
            <>
              <NumberInput
                {...control.register(`${formFieldName}.lbs`)}
                label='lbs'
              />
              <NumberInput
                {...control.register(`${formFieldName}.reps`)}
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
