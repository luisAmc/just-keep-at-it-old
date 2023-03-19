import { ExerciseType } from '@prisma/client';
import { createContext, useContext, type ReactNode } from 'react';
import { useWorkoutContext } from './WorkoutContext';
import {
  WorkoutExercise_Exercise,
  WorkoutExercise_LastSession
} from './__generated__/WorkoutExercise.generated';

export type MoveExerciseOption = 'up' | 'down' | 'first' | 'last';

interface WorkoutExerciseContextType extends WorkoutExercise_Exercise {
  index: number;
  formFieldName: string;
  isFirst: boolean;
  isLast: boolean;
  mostRecentSession?: WorkoutExercise_LastSession;
  onRemove: () => void;
  onMove: (action: MoveExerciseOption) => void;
  onSelect: (exerciseId: string) => void;
}

const WorkoutExerciseContext = createContext<
  WorkoutExerciseContextType | undefined
>(undefined);

interface WorkoutExerciseProviderProps {
  index: number;
  maxIndex: number;
  exerciseId: string;
  onRemove: () => void;
  onMove: (action: MoveExerciseOption) => void;
  onSelect: (exerciseId: string) => void;
  children: ReactNode;
}

export const WorkoutExerciseProvider = ({
  index,
  maxIndex,
  exerciseId,
  onRemove,
  onMove,
  onSelect,
  children
}: WorkoutExerciseProviderProps) => {
  const { getExercise } = useWorkoutContext();
  const exercise = getExercise(exerciseId);

  return (
    <WorkoutExerciseContext.Provider
      value={{
        index,
        id: exerciseId,
        name: exercise?.name ?? '',
        type: exercise?.type as ExerciseType,
        formFieldName: `workoutExercises.${index}`,
        isFirst: index === 0,
        isLast: index === maxIndex,
        mostRecentSession: exercise?.lastSession ?? undefined,
        onRemove,
        onMove,
        onSelect
      }}
    >
      {children}
    </WorkoutExerciseContext.Provider>
  );
};

export function useWorkoutExerciseContext() {
  const context = useContext(WorkoutExerciseContext);

  if (!context) {
    throw new Error(
      '`useWorkoutExerciseContext` can only be used inside a WorkoutExercise component.'
    );
  }

  return context;
}
