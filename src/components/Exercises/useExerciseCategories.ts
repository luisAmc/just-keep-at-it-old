import {
  Exercise_Exercise,
  Exercise_ExerciseCategory
} from './__generated__/index.generated';

type ExerciseArray = Array<{
  id: Exercise_Exercise['id'];
  name: Exercise_Exercise['name'];
  category: Exercise_ExerciseCategory['name'];
  type: Exercise_ExerciseCategory['type'];
}>;

export function useExerciseCategories(categories: Exercise_ExerciseCategory[]) {
  if (!categories || !categories.length) return [];

  return categories.reduce(
    (exercises, currentCategory) =>
      exercises.concat(
        currentCategory.exercises.map((exercise) => ({
          id: exercise.id,
          name: exercise.name,
          category: currentCategory.name,
          type: currentCategory.type
        }))
      ),
    [] as ExerciseArray
  );
}
