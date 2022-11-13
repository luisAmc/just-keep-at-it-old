import { Exercise_Exercise } from './__generated__/index.generated';

export function useExercises(exercises: Exercise_Exercise[] | undefined) {
  if (!exercises || !exercises.length) return [];

  return exercises.map((exercise) => ({
    id: exercise.id,
    label: exercise.name,
    value: exercise.id,
    type: exercise.type,
    muscleGroup: exercise.muscleGroup as string
  }));
}
