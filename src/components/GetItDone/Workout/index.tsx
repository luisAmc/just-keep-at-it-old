import { gql } from '@apollo/client';
import { WorkoutExerciseFragment } from './WorkoutExercise';
import dynamic from 'next/dynamic';

const WorkoutHeader = dynamic(
  import('./WorkoutHeader').then((mod) => mod.WorkoutHeader)
);

const WorkoutExerciseList = dynamic(
  import('./WorkoutExerciseList').then((mod) => mod.WorkoutExerciseList)
);

export const WorkoutFragment = gql`
  fragment Workout_workout on Workout {
    id
    name
    status
    completedAt
    createdAt
    workoutExercisesCount
    workoutExercises {
      ...WorkoutExercise_workoutExercise
    }
  }
  ${WorkoutExerciseFragment}
`;

export function Workout() {
  return (
    <div className="rounded-lg bg-brand-50 p-4">
      <WorkoutHeader />
      <div className="mt-4"></div>
      <WorkoutExerciseList />
    </div>
  );
}
