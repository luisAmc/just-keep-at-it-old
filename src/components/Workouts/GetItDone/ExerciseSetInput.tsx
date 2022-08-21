import { PlusIcon, SparklesIcon } from '@heroicons/react/outline';
import { ExerciseType } from '@prisma/client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { WorkoutQuery } from '../ViewWorkout/__generated__/index.generated';
import { RepetitionSet } from './RepetitionSet';
import { TimeSet } from './TimeSet';

interface ExerciseSetInputProps {
  exercise: WorkoutQuery['workout']['workoutExercises'][0]['exercise'];
  isDisabled: boolean;
}

export function ExerciseSetInput({
  exercise,
  isDisabled
}: ExerciseSetInputProps) {
  const { control } = useFormContext();

  const sets = useFieldArray({
    control,
    name: `workoutExercises.${exercise.id}.sets`
  });

  const isAerobic = exercise.type === ExerciseType.AEROBIC;

  return (
    <div className='px-4 py-4 rounded-lg bg-gray-100 text-gray-700'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>{exercise.name}</h2>

          <span className='font-medium text-sm'>{sets.fields.length} sets</span>
        </div>

        {sets.fields.length > 0 &&
          (isAerobic ? (
            <div className='flex flex-col divide-y divide-gray-300 bg-gray-200 p-2 rounded-lg'>
              {sets.fields.map((field, index) => (
                <TimeSet
                  key={field.id}
                  setId={index}
                  exerciseId={exercise.id}
                  isDisabled={isDisabled}
                  remove={() => sets.remove(index)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col divide-y divide-gray-300 bg-gray-200 p-2 rounded-lg'>
              {sets.fields.map((field, index) => (
                <RepetitionSet
                  key={field.id}
                  setId={index}
                  exerciseId={exercise.id}
                  isDisabled={isDisabled}
                  remove={() => sets.remove(index)}
                />
              ))}
            </div>
          ))}

        {!isDisabled &&
          (sets.fields.length === 0 ? (
            <button
              type='button'
              className='flex flex-col items-center justify-center py-5 text-gray-500 border-2 border-dashed border-gray-300 group hover:border-gray-400 rounded-lg'
              onClick={() => sets.append({ reps: 0, lbs: 0 })}
            >
              <SparklesIcon className='w-6 h-6 group-hover:text-gray-600' />
              <span className='font-semibold group-hover:text-gray-600'>
                Comenzar
              </span>
            </button>
          ) : (
            <Button
              variant='secondary'
              onClick={() => sets.append({ reps: 0, lbs: 0 })}
            >
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Añadir set</span>
            </Button>
          ))}
      </div>
    </div>
  );
}
