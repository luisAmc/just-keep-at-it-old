import * as Types from '../../../../__generated__/schema.generated';

export type CreateExerciseQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateExerciseQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', exerciseCategories: Array<{ __typename?: 'ExerciseCategory', id: string, name: string, type: string }> } | null };

export type CreateExerciseMutationVariables = Types.Exact<{
  input: Types.CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string } };
