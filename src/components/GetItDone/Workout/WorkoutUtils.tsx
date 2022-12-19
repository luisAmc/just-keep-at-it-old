import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useWorkoutContext } from './WorkoutContext';

const numberShape = z.string().or(z.literal('')).optional().transform(Number);

const SetSchema = z.object({
  id: z.string().optional(),
  mins: numberShape,
  distance: numberShape,
  kcal: numberShape,
  reps: numberShape,
  lbs: numberShape
});

export const WorkoutExercisesSchema = z.object({
  workoutExercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.array(SetSchema)
    })
  )
});

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

export function workoutInLocalStorage<T>() {
  const { getExerciseCache } = useWorkoutContext();

  const save = (workoutId: string, workout: T) => {
    localStorage.setItem(
      `workout-${workoutId}`,
      JSON.stringify({ form: workout, exerciseCache: getExerciseCache() })
    );
  };

  const remove = (workoutId: string) => {
    localStorage.removeItem(`workout-${workoutId}`);
  };

  return {
    save,
    remove
  };
}
