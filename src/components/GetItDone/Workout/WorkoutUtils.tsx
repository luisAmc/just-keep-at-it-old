import { ExerciseType, MuscleGroup } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { useWorkoutContext } from './WorkoutContext';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { WorkoutExercise_Exercise } from './__generated__/WorkoutExercise.generated';

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

export function MostRecentCorrespondingSet({ index }: { index: number }) {
  const workoutExercise = useWorkoutExerciseContext();

  const correspondingSet = workoutExercise.mostRecentSession?.sets[index];
  if (workoutExercise.type === ExerciseType.STRENGTH) {
    if (correspondingSet) {
      return (
        <div className='text-slate-400 px-2 py-1'>
          <span>
            <span className='text-sm'>{correspondingSet.lbs}</span>
            <span className='text-xs'>lbs</span>
          </span>

          <span className='text-slate-500 text-sm'>x</span>

          <span>
            <span className='text-sm'>{correspondingSet.reps}</span>
            <span className='text-xs'>reps</span>
          </span>
        </div>
      );
    } else {
      return <span className='text-slate-400 px-2 py-1'>-</span>;
    }
  }

  return null;
}

export type ExerciseCategoryType = {
  id: string;
  name: string;
  exercises: Array<WorkoutExercise_Exercise>;
};

export function useExerciseCategories(exercises?: WorkoutExercise_Exercise[]) {
  if (!exercises || !exercises.length) return [];

  const categories = exercises.reduce((categories, exercise) => {
    const categoryKey = exercise.muscleGroup ?? ExerciseType.AEROBIC;

    const category = categories.get(categoryKey) ?? {
      id: categoryKey,
      name: getCategoryName(categoryKey),
      exercises: []
    };

    category.exercises.push(exercise);

    categories.set(categoryKey, category);

    return categories;
  }, new Map<string, ExerciseCategoryType>());

  return Array.from(categories.values());
}

export function getCategoryName(name: string) {
  switch (name) {
    case MuscleGroup.ARMS:
      return 'Brazos';

    case MuscleGroup.BACK:
      return 'Espalda';

    case MuscleGroup.CHEST:
      return 'Pecho';

    case MuscleGroup.LEGS:
      return 'Piernas';

    case MuscleGroup.SHOULDERS:
      return 'Hombros';

    case ExerciseType.AEROBIC:
      return 'Aerobico';

    default:
      return 'No especificado';
  }
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

export function useWorkoutInLocalStorage<T>() {
  const { getExerciseCache } = useWorkoutContext();

  const save = (workoutId: string, workout: T) => {
    const cache = getExerciseCache();

    localStorage.setItem(
      `workout-${workoutId}`,
      JSON.stringify({ form: workout, exerciseCache: cache })
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
