import { createContext, ReactNode, useContext, useEffect } from 'react';
import { Workout_Workout } from './__generated__/Workout.generated';
import {
  WorkoutExercise_Exercise,
  WorkoutExercise_WorkoutExercise
} from './__generated__/WorkoutExercise.generated';

interface ContextType {
  id: string;
  name: string;
  workoutExercises: Array<WorkoutExercise_WorkoutExercise>;
  addExercise(workout: WorkoutExercise_Exercise): void;
  getExercise(exerciseId: string): WorkoutExercise_Exercise | undefined;
  getExerciseCache(): WorkoutExercise_Exercise[];
  setExerciseCache(alreadyEditedExercises: any[]): void;
}

const WorkoutContext = createContext<ContextType>({
  id: '',
  name: '',
  workoutExercises: [],
  addExercise: () => {},
  getExercise: () => undefined,
  getExerciseCache: () => [],
  setExerciseCache: () => {}
});

interface WorkoutProviderProps {
  workout: Workout_Workout;
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

  const getExercise = (exerciseId: string) => {
    return exerciseMap.get(exerciseId);
  };

  const getExerciseCache = () => {
    return Array.from(exerciseMap.values());
  };

  const setExerciseCache = (alreadyEditedExercises: any[]) => {
    for (const exercise of alreadyEditedExercises) {
      exerciseMap.set(exercise.id, exercise);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        id: workout.id,
        name: workout.name,
        workoutExercises: workout.workoutExercises,
        addExercise,
        getExercise,
        getExerciseCache,
        setExerciseCache
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
