import * as Types from '../../../__generated__/schema.generated';

export type WorkoutsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, workouts: Array<{ __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, exercise: { __typename?: 'Exercise', id: string, name: string } }> }> } | null };
