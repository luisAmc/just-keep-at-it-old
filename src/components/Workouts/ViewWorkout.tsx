import { gql } from '@apollo/client';
import { Card } from '../shared/Card';

export const WorkoutInfoFragment = gql`
  fragment ViewWorkout_workout on Workout {
    id
    name
    status
    completedAt
    createdAt
    workoutExercisesCount
    heavyUseOf
  }
`;

export function ViewWorkout() {
  return <Card>ViewWorkout</Card>;
}
