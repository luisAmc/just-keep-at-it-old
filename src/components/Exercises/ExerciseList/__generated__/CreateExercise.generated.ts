import * as Types from '../../../../__generated__/schema.generated';

export type CreateExerciseMutationVariables = Types.Exact<{
  input: Types.CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string, category: { __typename?: 'ExerciseCategory', id: string, name: string, type: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string }> } } };
