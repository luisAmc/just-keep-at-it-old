import { gql } from '@apollo/client';

const WorkoutSetFragment = gql`
  fragment WorkoutExercise_workoutSet on WorkoutSet {
    id
    mins
    distance
    kcal
    lbs
    reps
  }
`;

export const ExerciseFragment = gql`
  fragment WorkoutExercise_exercise on Exercise {
    id
    name
    type
    lastSession {
      sets {
        ...WorkoutExercise_workoutSet
      }
    }
  }
  ${WorkoutSetFragment}
`;

export const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    index
    exercise {
      ...WorkoutExercise_exercise
    }
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${ExerciseFragment}
  ${WorkoutSetFragment}
`;

interface WorkoutExerciseProps {
  exerciseId: string;
  index: number;
}

export function WorkoutExercise({ exerciseId }: WorkoutExerciseProps) {
  return <div>Workout exercise</div>;
}
