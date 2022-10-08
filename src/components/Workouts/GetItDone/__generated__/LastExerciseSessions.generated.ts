import * as Types from '../../../../__generated__/schema.generated';

export type LastExerciseSessionsQueryVariables = Types.Exact<{
  exerciseId: Types.Scalars['ID'];
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LastExerciseSessionsQuery = { __typename?: 'Query', lastSessions: Array<{ __typename?: 'WorkoutExercise', id: string, createdAt: string, exercise: { __typename?: 'Exercise', type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> };
