import { ExerciseType } from '@prisma/client';
import { createContext, ReactNode, useContext } from 'react';
import { useWorkoutContext } from './WorkoutContext';
import { MoveExerciseAction } from './WorkoutExerciseActions';
import { WorkoutExercise_LastSession } from './__generated__/WorkoutExercise.generated';

interface ContextType {
  id: string;
  name: string;
  type: ExerciseType;
  fieldName: string;
  isFirst: boolean;
  isLast: boolean;
  mostRecentSession?: WorkoutExercise_LastSession;
  onRemove: () => void;
  onMove: (action: MoveExerciseAction) => void;
  onSelect: (exerciseId: string) => void;
}

const WorkoutExerciseContext = createContext<ContextType>({
  id: '',
  name: '',
  type: ExerciseType.AEROBIC,
  fieldName: '',
  isFirst: false,
  isLast: false,
  mostRecentSession: undefined,
  onRemove: () => {},
  onMove: () => {},
  onSelect: () => {}
});

interface ProviderProps {
  exerciseId: string;
  index: number;
  maxIndex: number;
  onRemove: () => void;
  onMove: (action: MoveExerciseAction) => void;
  onSelect: (exerciseId: string) => void;
  children: ReactNode;
}

export const WorkoutExerciseProvider = (props: ProviderProps) => {
  const { getExercise } = useWorkoutContext();
  const exerciseInContext = getExercise(props.exerciseId);

  return (
    <WorkoutExerciseContext.Provider
      value={{
        id: props.exerciseId,
        name: exerciseInContext?.name ?? '',
        type: exerciseInContext?.type as ExerciseType,
        fieldName: `workoutExercises.${props.index}`,
        isFirst: props.index === 0,
        isLast: props.index === props.maxIndex,
        mostRecentSession: exerciseInContext?.lastSession ?? undefined,
        onRemove: props.onRemove,
        onMove: props.onMove,
        onSelect: props.onSelect
      }}
    >
      {props.children}
    </WorkoutExerciseContext.Provider>
  );
};

export function useWorkoutExerciseContext() {
  return useContext(WorkoutExerciseContext);
}
