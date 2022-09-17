import { Exercises_Exercise } from 'src/components/Exercises/__generated__/index.generated';

export function useExercises(exercises: Exercises_Exercise[] | undefined) {
  if (!exercises || !exercises.length) return [];

  return exercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.id,
    muscleGroup: exercise.muscleGroup as string,
    type: exercise.type
  }));
}
