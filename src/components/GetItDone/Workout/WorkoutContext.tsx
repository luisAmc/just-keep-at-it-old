import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { Workout_Workout } from './__generated__/index.generated';
import {
  WorkoutExercise_Exercise,
  WorkoutExercise_WorkoutExercise
} from './__generated__/WorkoutExercise.generated';

interface ContextType {
  id: string;
  name: string;
  workoutExercises: Array<WorkoutExercise_WorkoutExercise>;
  setName(newName: string): void;
  addExercise(workout: WorkoutExercise_Exercise): void;
  getExercise(exerciseId: string): WorkoutExercise_Exercise | undefined;
  getExerciseCache(): WorkoutExercise_Exercise[];
  setExerciseCache(alreadyEditedExercises: any[]): void;
}

const WorkoutContext = createContext<ContextType | null>({
  id: '',
  name: '',
  workoutExercises: [],
  setName: () => {},
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
  const [name, _setName] = useState(workout.name);

  useEffect(() => {
    for (const workoutExercise of workout.workoutExercises) {
      exerciseMap.set(workoutExercise.exercise.id, workoutExercise.exercise);
    }
  }, []);

  const setName = (newName: string) => {
    _setName(newName);
  };

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
        name: name,
        workoutExercises: workout.workoutExercises,
        setName,
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
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      '`useWorkoutContext` can only be used in a GetItDone component.'
    );
  }

  return context;
}
