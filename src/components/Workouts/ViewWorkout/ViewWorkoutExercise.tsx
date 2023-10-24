import { ExerciseType } from '@prisma/client';
import { gql } from '@apollo/client';
import { ViewWorkoutExercise_WorkoutExercise } from './__generated__/ViewWorkoutExercise.generated';

export const ViewWorkoutExerciseBasicFragment = gql`
  fragment ViewWorkoutExercise_workoutExerciseBasic on WorkoutExercise {
    id
    exercise {
      id
      name
      type
    }
    setsCount
  }
`;

export const ViewWorkoutExerciseSetFragment = gql`
  fragment ViewWorkoutExercise_workoutSet on WorkoutSet {
    id
    mins
    distance
    kcal
    lbs
    reps
  }
`;

export const ViewWorkoutExerciseFragment = gql`
  fragment ViewWorkoutExercise_workoutExercise on WorkoutExercise {
    ...ViewWorkoutExercise_workoutExerciseBasic
    sets {
      ...ViewWorkoutExercise_workoutSet
    }
  }
  ${ViewWorkoutExerciseBasicFragment}
  ${ViewWorkoutExerciseSetFragment}
`;

interface WorkoutExerciseProps {
  workoutExercise: ViewWorkoutExercise_WorkoutExercise;
}

export function ViewWorkoutExercise({ workoutExercise }: WorkoutExerciseProps) {
  const isAerobic = workoutExercise.exercise.type === ExerciseType.AEROBIC;

  return (
    <section className="p-4 rounded-lg bg-brand-100">
      <header className="flex items-center justify-between">
        <h2 className="font-medium">{workoutExercise.exercise.name}</h2>

        <span className="text-xs font-bold">
          {workoutExercise.setsCount} sets
        </span>
      </header>

      {workoutExercise.sets.map((set) => (
        <div key={set.id} className="flex items-center justify-center">
          {isAerobic ? <AerobicSet {...set} /> : <StrengthSet {...set} />}
        </div>
      ))}
    </section>
  );
}

interface AerobicSetProps {
  mins?: number | null;
  distance?: number | null;
  kcal?: number | null;
}

function AerobicSet({ mins, distance, kcal }: AerobicSetProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <span>
        <span className="text-2xl font-medium">{mins}</span>
        <span className="ml-1">mins</span>
      </span>

      <span>
        <span className="text-2xl font-medium">{distance}</span>
        <span className="ml-1">dist</span>
      </span>

      <span>
        <span className="text-2xl font-medium">{kcal}</span>
        <span className="ml-1">kcal</span>
      </span>
    </div>
  );
}

interface StrengthSetProps {
  lbs?: number | null;
  reps?: number | null;
}

function StrengthSet({ lbs, reps }: StrengthSetProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <span>
        <span className="text-2xl font-medium">{lbs}</span>
        <span className="ml-1">lbs</span>
      </span>

      <span>
        <span className="text-2xl font-medium">{reps}</span>
        <span className="ml-1">reps</span>
      </span>
    </div>
  );
}
