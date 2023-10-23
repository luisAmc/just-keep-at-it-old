import { ExerciseType } from '@prisma/client';
import { NumberInput } from 'src/components/shared/NumberInput';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { MostRecentCorrespondingSet } from './utils';
import { buttonStyles } from 'src/components/shared/Button';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

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
    <div className="flex items-start justify-center gap-x-6 py-2">
      <div className="grid w-full grid-cols-2">
        <div className="flex items-center space-x-2">
          {type === ExerciseType.AEROBIC ? (
            <>
              <NumberInput
                {...control.register(`${formFieldName}.mins`)}
                label="mins"
              />
              <NumberInput
                {...control.register(`${formFieldName}.distance`)}
                label="dist"
              />
              <NumberInput
                {...control.register(`${formFieldName}.kcal`)}
                label="kcal"
              />
            </>
          ) : (
            <>
              <NumberInput
                {...control.register(`${formFieldName}.lbs`)}
                label="lbs"
              />
              <NumberInput
                {...control.register(`${formFieldName}.reps`)}
                label="reps"
              />
            </>
          )}
        </div>

        <div className="flex justify-end">
          <MostRecentCorrespondingSet index={index} />
        </div>
      </div>

      <div className="py-1">
        <button
          onClick={onRemove}
          className={twMerge(
            clsx(
              buttonStyles({ variant: 'ghost' }),
              'inline-block rounded-full p-0.5'
            )
          )}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
