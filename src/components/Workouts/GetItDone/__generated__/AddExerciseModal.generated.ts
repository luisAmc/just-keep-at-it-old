import * as Types from '../../../../__generated__/schema.generated';

export type AddNewExerciseMutationVariables = Types.Exact<{
  input: Types.CreateExerciseInput;
}>;


export type AddNewExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string } };
