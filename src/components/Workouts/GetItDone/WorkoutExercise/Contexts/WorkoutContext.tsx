import { createContext, ReactNode, useContext, useEffect } from 'react';
import { GetItDone_Workout } from '../../__generated__/index.generated';
import {
  WorkoutExercise_Exercise,
  WorkoutExercise_WorkoutExercise
} from '../__generated__/WorkoutExercise.generated';

interface WorkoutContextType {
  workoutId: string;
  workoutExercises: Array<WorkoutExercise_WorkoutExercise>;
  cachedExercises(): Array<any>;
  setCachedExercises(exercises: any[]): void;
  addExercise(workout: WorkoutExercise_Exercise): void;
  getExercise(workoutExerciseId: string): WorkoutExercise_Exercise | undefined;
}

const WorkoutContext = createContext<WorkoutContextType>({
  workoutId: '',
  workoutExercises: [],
  cachedExercises: () => [],
  setCachedExercises: () => {},
  addExercise: () => {},
  getExercise: () => undefined
});

interface WorkoutProviderProps {
  workout: GetItDone_Workout;
  children: ReactNode;
}

const exerciseMap = new Map<string, WorkoutExercise_Exercise>();

export const WorkoutProvider = ({
  workout,
  children
}: WorkoutProviderProps) => {
  useEffect(() => {
    for (const workoutExercise of workout.workoutExercises) {
      exerciseMap.set(workoutExercise.exercise.id, workoutExercise.exercise);
    }
  }, []);

  const addExercise = (exercise: WorkoutExercise_Exercise) => {
    exerciseMap.set(exercise.id, exercise);
  };

  const getExercise = (workoutExerciseId: string) => {
    return exerciseMap.get(workoutExerciseId);
  };

  const cachedExercises = () => {
    return Array.from(exerciseMap.values());
  };

  const setCachedExercises = (exercises: any[]) => {
    for (const workoutExercise of exercises) {
      exerciseMap.set(workoutExercise.id, workoutExercise);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutId: workout.id,
        workoutExercises: workout.workoutExercises,
        cachedExercises,
        setCachedExercises,
        addExercise,
        getExercise
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
