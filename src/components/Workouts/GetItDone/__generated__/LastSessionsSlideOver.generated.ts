import * as Types from '../../../../__generated__/schema.generated';

export type LastSessionsQueryVariables = Types.Exact<{
  exerciseId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LastSessionsQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, type: string, doneSessions: Array<{ __typename?: 'WorkoutExercise', id: string, createdAt: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> } };
