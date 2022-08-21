import * as Types from '../../../__generated__/schema.generated';

export type SignUpFormMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;


export type SignUpFormMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string } };
