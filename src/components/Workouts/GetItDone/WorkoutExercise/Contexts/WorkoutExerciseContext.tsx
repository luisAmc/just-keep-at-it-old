import { ExerciseType } from '@prisma/client';
import { createContext, ReactNode, useContext } from 'react';
import { WorkoutExercise_WorkoutExercise } from '../__generated__/WorkoutExercise.generated';
import { useWorkoutContext } from './WorkoutContext';

interface WorkoutExerciseContextType {
  id: string;
  name: string;
  fieldName: string;
  type: ExerciseType;
  isFirst: boolean;
  isLast: boolean;
  // TODO: Better typed this
  mostRecentSession?: WorkoutExercise_WorkoutExercise['exercise']['lastSession'];
}

const WorkoutExerciseContext = createContext<WorkoutExerciseContextType>({
  id: '',
  name: '',
  fieldName: '',
  type: 'AEROBIC',
  isFirst: false,
  isLast: false,
  mostRecentSession: undefined
});

interface WorkoutExerciseProviderProps {
  workoutExerciseId: string;
  fieldIndex: number;
  maxIndex: number;
  children: ReactNode;
}

export const WorkoutExerciseProvider = ({
  workoutExerciseId,
  fieldIndex,
  maxIndex,
  children
}: WorkoutExerciseProviderProps) => {
  const { getExercise } = useWorkoutContext();
  const exercise = getExercise(workoutExerciseId);

  return (
    <WorkoutExerciseContext.Provider
      value={{
        id: workoutExerciseId,
        name: exercise?.name ?? '',
        fieldName: `workoutExercises.${fieldIndex}`,
        type: exercise?.type as ExerciseType,
        isFirst: fieldIndex === 0,
        isLast: fieldIndex === maxIndex,
        mostRecentSession: exercise?.lastSession
      }}
    >
      {children}
    </WorkoutExerciseContext.Provider>
  );
};

export function useWorkoutExerciseContext() {
  return useContext(WorkoutExerciseContext);
}
