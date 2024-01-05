import * as Types from '../../../__generated__/schema.generated';

export type ExerciseSessionHistoryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ExerciseSessionHistoryQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, name: string, type: string, doneSessions: Array<{ __typename?: 'WorkoutExercise', id: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, workout: { __typename?: 'Workout', name: string, completedAt?: string | null } }> } };
