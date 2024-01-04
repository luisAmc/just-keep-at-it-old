import * as Types from '../../../__generated__/schema.generated';

export type WorkoutCard_Workout = { __typename?: 'Workout', id: string, name: string, status: string, createdAt: string, completedAt?: string | null, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string } }> };
