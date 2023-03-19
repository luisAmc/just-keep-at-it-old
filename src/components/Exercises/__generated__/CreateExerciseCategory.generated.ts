import * as Types from '../../../__generated__/schema.generated';

export type CreateExerciseCategoryMutationVariables = Types.Exact<{
  input: Types.CreateExerciseCategoryInput;
}>;


export type CreateExerciseCategoryMutation = { __typename?: 'Mutation', createExerciseCategory: { __typename?: 'ExerciseCategory', id: string } };
