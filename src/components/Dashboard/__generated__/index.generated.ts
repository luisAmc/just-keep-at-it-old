import * as Types from '../../../__generated__/schema.generated';

export type DashboardQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type DashboardQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, workoutsCount: number, workouts: Array<{ __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, bias: string }> } | null };
