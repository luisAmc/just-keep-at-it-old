import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Workout_Workout } from './__generated__/index.generated';
import {
  WorkoutExercise_Exercise,
  WorkoutExercise_WorkoutExercise
} from './__generated__/WorkoutExercise.generated';

interface WorkoutContextType {
  workoutId: string;
  name: string;
  setName: (newName: string) => void;
  workoutExercises: Array<WorkoutExercise_WorkoutExercise>;
  addExercise: (exercise: WorkoutExercise_Exercise) => void;
  getExercise: (exerciseId: string) => WorkoutExercise_Exercise | undefined;
  getCache: () => WorkoutExercise_Exercise[];
  setCache: (exercises: any) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface WorkoutProviderProps {
  workout: Workout_Workout;
  children: ReactNode;
}

const exerciseMap = new Map<string, WorkoutExercise_Exercise>();

export const WorkoutProvider = ({
  workout,
  children
}: WorkoutProviderProps) => {
  const [name, setName] = useState(workout.name);

  useEffect(() => {
    for (const workoutExercise of workout.workoutExercises) {
      exerciseMap.set(workoutExercise.exercise.id, workoutExercise.exercise);
    }
  }, []);

  const addExercise = (exercise: WorkoutExercise_Exercise) => {
    exerciseMap.set(exercise.id, exercise);
  };

  const getExercise = (exerciseId: string) => {
    return exerciseMap.get(exerciseId);
  };

  const getCache = () => {
    return Array.from(exerciseMap.values());
  };

  const setCache = (exercises: any[]) => {
    for (const exercise of exercises) {
      exerciseMap.set(exercise.id, exercise);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutId: workout.id,
        workoutExercises: workout.workoutExercises,
        name,
        setName,
        addExercise,
        getExercise,
        getCache,
        setCache
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      '`useWorkoutContext` can only be used in a GetItDone component.'
    );
  }

  return context;
}
