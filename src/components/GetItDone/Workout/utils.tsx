import { ExerciseType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWorkoutContext } from './WorkoutContext';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { z } from 'zod';

const NumberShape = z.string().or(z.literal('')).optional().transform(Number);

const SetSchema = z.object({
  id: z.string().optional(),
  mins: NumberShape,
  distance: NumberShape,
  kcal: NumberShape,
  reps: NumberShape,
  lbs: NumberShape
});

export const GetItDoneSchema = z.object({
  workoutExercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.array(SetSchema)
    })
  )
});

export function MostRecentCorrespondingSet({ index }: { index: number }) {
  const workoutExercise = useWorkoutExerciseContext();

  const fieldName = `${workoutExercise.formFieldName}.sets.${index}`;
  const form = useFormContext();

  const correspondingSet = workoutExercise.mostRecentSession?.sets[index];

  function copySetToCurrentWorkout(lbs: number, reps: number) {
    form.setValue(`${fieldName}.lbs`, lbs.toString());
    form.setValue(`${fieldName}.reps`, reps.toString());
  }

  if (workoutExercise.type === ExerciseType.STRENGTH) {
    if (correspondingSet) {
      return (
        <div className='flex items-start'>
          <button
            type='button'
            className='hover:bg-white/5 px-2 py-1 rounded-lg transition'
            onClick={() =>
              copySetToCurrentWorkout(
                correspondingSet.lbs,
                correspondingSet.reps
              )
            }
          >
            <span>
              <span className='text-sm'>{correspondingSet.lbs}</span>
              <span className='text-xs'>lbs</span>
            </span>

            <span className='text-slate-500 text-sm'>x</span>

            <span>
              <span className='text-sm'>{correspondingSet.reps}</span>
              <span className='text-xs'>reps</span>
            </span>
          </button>
        </div>
      );
    } else {
      return <span className='text-xs text-slate-500 px-2 py-1'> - </span>;
    }
  }

  return null;
}

export function useDebouncedWorkout<T>(workoutString: T) {
  const [debouncedWorkout, setdebouncedWorkout] = useState(workoutString);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedWorkout(workoutString);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [workoutString]);

  return debouncedWorkout;
}
