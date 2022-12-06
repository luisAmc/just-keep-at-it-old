import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useWorkout } from '../WorkoutContext';

interface WorkoutExerciseContextType {
  exerciseId: string;
  fieldName: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

const defaultBehaviour: WorkoutExerciseContextType = {
  exerciseId: '',
  fieldName: '',
  index: -1,
  isFirst: false,
  isLast: false
};

const WorkoutExerciseContext = createContext(defaultBehaviour);

interface WorkoutExerciseProviderProps
  extends Pick<WorkoutExerciseContextType, 'exerciseId' | 'index'> {
  size: number;
  children: ReactNode;
}

export const WorkoutExerciseProvider = ({
  exerciseId,
  index,
  size,
  children
}: WorkoutExerciseProviderProps) => {
  return (
    <WorkoutExerciseContext.Provider
      value={{
        exerciseId,
        index,
        fieldName: `workoutExercises.${index}`,
        isFirst: index === 0,
        isLast: index === size - 1
      }}
    >
      {children}
    </WorkoutExerciseContext.Provider>
  );
};

// TODO: Really use this to display in place the last session
export function useWorkoutExercise() {
  const { getWorkoutExercise } = useWorkout();
  const context = useContext(WorkoutExerciseContext);

  const workoutExercise = getWorkoutExercise(context.exerciseId);

  return {
    ...workoutExercise,
    ...context
  };
}
