import * as Types from '../../../__generated__/schema.generated';

export type CreateTemplateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateTemplateQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }> } | null };

export type CreateTemplateMutationVariables = Types.Exact<{
  input: Types.CreateWorkoutTemplateInput;
}>;


export type CreateTemplateMutation = { __typename?: 'Mutation', createWorkoutTemplate: { __typename?: 'WorkoutTemplate', id: string } };
