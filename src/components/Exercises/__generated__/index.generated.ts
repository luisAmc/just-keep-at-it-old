import * as Types from '../../../__generated__/schema.generated';

export type Exercise_ExerciseCategory = { __typename?: 'ExerciseCategory', id: string, name: string, type: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string }> };

export type ExercisesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exerciseCategories: Array<{ __typename?: 'ExerciseCategory', id: string, name: string, type: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string }> }> } | null };
