import * as Types from '../../../__generated__/schema.generated';

export type Exercises_Exercise = { __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null };

export type ExercisesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }> } | null };
