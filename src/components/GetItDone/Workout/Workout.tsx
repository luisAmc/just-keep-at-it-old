import { gql } from '@apollo/client';
import { Workout_Workout } from './__generated__/Workout.generated';
import { WorkoutExerciseFragment } from './WorkoutExercise';
import { WorkoutExercises } from './WorkoutExercises';
import { WorkoutHeader } from './WorkoutHeader';
import { WorkoutProvider } from './WorkoutContext';

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

interface WorkoutProps {
  workout: Workout_Workout;
}

export function Workout({ workout }: WorkoutProps) {
  return (
    <WorkoutProvider workout={workout}>
      <div className='h-full flex flex-col space-y-4'>
        <WorkoutHeader />
        <WorkoutExercises />
      </div>
    </WorkoutProvider>
  );
}
