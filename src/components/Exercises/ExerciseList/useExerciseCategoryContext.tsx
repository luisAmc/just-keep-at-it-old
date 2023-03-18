import { createContext, type ReactNode, useContext } from 'react';
import {
  Exercise_Exercise,
  type Exercise_ExerciseCategory
} from '../__generated__/index.generated';

interface ExerciseCategoryContextType {
  id: string;
  name: string;
  type: string;
  exercises: Array<Exercise_Exercise>;
}

const ExerciseCategoryContext =
  createContext<ExerciseCategoryContextType | null>(null);

interface ExerciseCategoryProviderProps {
  category: Exercise_ExerciseCategory;
  children: ReactNode;
}

export const ExerciseCategoryProvider = ({
  category,
  children
}: ExerciseCategoryProviderProps) => {
  return (
    <ExerciseCategoryContext.Provider
      value={{
        id: category.id,
        name: category.name,
        type: category.type,
        exercises: category.exercises
      }}
    >
      {children}
    </ExerciseCategoryContext.Provider>
  );
};

export function useExerciseCategoryContext() {
  const context = useContext(ExerciseCategoryContext);

  if (!context) {
    throw new Error(
      '`useExerciseCategoryContext` can only be used inside a ExerciseList component.'
    );
  }

  return context;
}
