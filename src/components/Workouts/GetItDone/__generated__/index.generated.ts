import * as Types from '../../../../__generated__/schema.generated';

export type GetWorkoutDoneMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type GetWorkoutDoneMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };
