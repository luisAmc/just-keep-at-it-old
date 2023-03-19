import { gql } from '@apollo/client';
import { WorkoutExerciseFragment } from './WorkoutExercise';
import { WorkoutExerciseList } from './WorkoutExerciseList';
import { WorkoutHeader } from './WorkoutHeader';

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
    <div className='h-full flex flex-col space-y-4'>
      <WorkoutHeader />
      <WorkoutExerciseList />
    </div>
  );
}
