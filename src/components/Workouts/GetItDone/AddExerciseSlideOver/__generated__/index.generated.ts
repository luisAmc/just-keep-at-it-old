import * as Types from '../../../../../__generated__/schema.generated';

export type AddExerciseQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AddExerciseQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }> } | null };
