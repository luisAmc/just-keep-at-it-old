import * as Types from '../../../__generated__/schema.generated';

export type ExerciseHistoryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ExerciseHistoryQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', type: string, doneSessionsCount: number, doneSessions: Array<{ __typename?: 'WorkoutExercise', id: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, workout: { __typename?: 'Workout', name: string, completedAt?: string | null } }> } };
