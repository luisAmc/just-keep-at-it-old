import * as Types from '../../../../../__generated__/schema.generated';

export type AddExerciseQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AddExerciseQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }> } | null };

export type GetSelectedExerciseLastSessionVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSelectedExerciseLastSession = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null } };
