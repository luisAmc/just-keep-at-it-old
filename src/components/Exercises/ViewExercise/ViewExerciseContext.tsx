import { ExerciseType } from '@prisma/client';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  ViewExercise_DoneSession,
  ViewExercise_ExerciseWithDoneSession
} from './__generated__/index.generated';

type DataSetsType =
  | {
      type: typeof ExerciseType.AEROBIC;
      totalDistance: Array<{ id: number; distance: number }>;
      totalTime: Array<{ id: number; mins: number }>;
    }
  | {
      type: typeof ExerciseType.STRENGTH;
      totalWeight: Array<{ id: number; weight: number }>;
      // topSet: Array<{ id:number; lbs: number; reps: number }>;
    };

interface ViewExerciseContextType {
  type: ExerciseType;
  dataSets: DataSetsType;
  doneSessions: ViewExercise_DoneSession[];
}

const ViewExerciseContext = createContext<ViewExerciseContextType | undefined>(
  undefined
);

interface ViewExerciseProviderProps {
  exercise: ViewExercise_ExerciseWithDoneSession;
  children: ReactNode;
}

export const ViewExerciseProvider = ({
  exercise,
  children
}: ViewExerciseProviderProps) => {
  const dataSets: DataSetsType = useMemo(() => {
    const sessionsCount = exercise.doneSessions.length - 1;

    if (exercise.type === ExerciseType.AEROBIC) {
      // There will be 10 sessions at most, the the limit of the query
      const totalDistance = exercise.doneSessions.map((session, i) => ({
        id: i - sessionsCount,
        distance: session.sets.reduce(
          (totalDistance, currentSet) => totalDistance + currentSet.distance,
          0
        )
      }));

      const totalTime = exercise.doneSessions.map((session, i) => ({
        id: i - sessionsCount,
        mins: session.sets.reduce(
          (totalMins, currentSet) => totalMins + currentSet.mins,
          0
        )
      }));

      return {
        type: ExerciseType.AEROBIC,
        totalDistance,
        totalTime
      };
    } else {
      const totalWeight = exercise.doneSessions.map((session, i) => ({
        id: i - sessionsCount,
        weight: session.sets.reduce(
          (totalWeight, currentSet) =>
            totalWeight + currentSet.lbs * currentSet.reps,
          0
        )
      }));

      // const topSet = exercise.doneSessions.map((session, i) => ({
      //   x: i - sessionsCount,
      //   ...session.sets.reduce(
      //     (topSet, currentSet) =>
      //       topSet.reps < currentSet.reps || topSet.lbs < currentSet.lbs
      //         ? { reps: currentSet.reps, lbs: currentSet.lbs }
      //         : topSet,
      //     { reps: 0, lbs: 0 }
      //   )
      // }));

      return {
        type: ExerciseType.STRENGTH,
        totalWeight
        // topSet
      };
    }
  }, [exercise.id]);

  return (
    <ViewExerciseContext.Provider
      value={{
        type: exercise.type as ExerciseType,
        doneSessions: exercise.doneSessions,
        dataSets
      }}
    >
      {children}
    </ViewExerciseContext.Provider>
  );
};

export function useViewExerciseContext() {
  const context = useContext(ViewExerciseContext);

  if (!context) {
    throw new Error(
      '`useViewExerciseContext` can only be used inside of a ViewExercise component.'
    );
  }

  return context;
}
