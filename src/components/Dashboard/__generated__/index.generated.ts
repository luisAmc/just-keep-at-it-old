import * as Types from '../../../__generated__/schema.generated';

export type DashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', workouts: Array<{ __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, heavyUseOf: string }> };
