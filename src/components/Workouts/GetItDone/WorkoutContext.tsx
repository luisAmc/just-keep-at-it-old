import { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  GetItDoneQuery,
  WorkoutExercise_WorkoutExercise
} from './__generated__/index.generated';

interface WorkoutContextType {
  getWorkoutExercise(
    workoutExerciseId: string
  ): WorkoutExercise_WorkoutExercise | undefined;
}

const defaultBehaviour: WorkoutContextType = {
  getWorkoutExercise: () => undefined
};

const WorkoutContext = createContext<WorkoutContextType>(defaultBehaviour);

interface WorkoutProviderProps {
  workout: GetItDoneQuery['workout'];
  children: ReactNode;
}

const workoutExercisesMap = new Map<string, WorkoutExercise_WorkoutExercise>();

export const WorkoutProvider = ({
  workout,
  children
}: WorkoutProviderProps) => {
  useEffect(() => {
    if (workout) {
      for (const workoutExercise of workout.workoutExercises) {
        workoutExercisesMap.set(workoutExercise.exercise.id, workoutExercise);
      }
    }
  }, []);

  const getWorkoutExercise = (workoutExerciseId: string) => {
    return workoutExercisesMap.get(workoutExerciseId);
  };

  return (
    <WorkoutContext.Provider value={{ getWorkoutExercise }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export function useWorkout() {
  return useContext(WorkoutContext);
}
