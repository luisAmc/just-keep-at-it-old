import { ExerciseType, MuscleGroup } from '@prisma/client';
import { Exercise_Exercise } from 'src/components/Exercises/__generated__/index.generated';

export interface ExerciseCategory {
  id: string;
  name: string;
  exercises: Array<Exercise_Exercise>;
}

export function useExerciseCategories(exercises?: Exercise_Exercise[]) {
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
  }, new Map<string, ExerciseCategory>());

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
