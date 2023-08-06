import { ExerciseType } from '@prisma/client';
import { gql } from '@apollo/client';
import { ViewWorkoutExercise_WorkoutExercise } from './__generated__/ViewWorkoutExercise.generated';

interface WorkoutExerciseProps {
  workoutExercise: ViewWorkoutExercise_WorkoutExercise;
  isDone: boolean;
}

export const WorkoutExerciseInfoFragment = gql`
  fragment ViewWorkoutExercise_workoutExercise on WorkoutExercise {
    id
    exercise {
      id
      name
      type
    }
    setsCount
    sets {
      id
      mins
      distance
      kcal
      lbs
      reps
    }
  }
`;

export function ViewWorkoutExercise({
  workoutExercise,
  isDone
}: WorkoutExerciseProps) {
  const isAerobic = workoutExercise.exercise.type === ExerciseType.AEROBIC;

  return (
    <section className="rounded-lg bg-slate-600 p-4">
      <header className="flex items-center justify-between">
        <h2 className="font-medium">{workoutExercise.exercise.name}</h2>

        {isDone && (
          <span className="text-xs font-bold">
            {workoutExercise.setsCount} sets
          </span>
        )}
      </header>

      {isDone &&
        workoutExercise.sets.map((set) => (
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
