import * as Types from '../../../__generated__/schema.generated';

export type DashboardQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type DashboardQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, workoutsCount: number, workouts: Array<{ __typename?: 'Workout', id: string, name: string, status: string, createdAt: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string } }> }> } | null };
