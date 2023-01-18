import * as Types from '../../../__generated__/schema.generated';

export type EditExerciseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EditExerciseQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', name: string } };

export type EditExerciseMutationVariables = Types.Exact<{
  input: Types.EditExerciseInput;
}>;


export type EditExerciseMutation = { __typename?: 'Mutation', editExercise: { __typename?: 'Exercise', id: string } };
