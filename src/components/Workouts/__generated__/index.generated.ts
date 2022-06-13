import * as Types from '../../../__generated__/schema.generated';

export type Workouts_Workout = { __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, workoutExercisesCount: number };

export type WorkoutsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, workouts: Array<{ __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, workoutExercisesCount: number }> } | null };
