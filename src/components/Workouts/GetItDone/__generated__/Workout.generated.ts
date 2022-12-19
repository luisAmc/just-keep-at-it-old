import * as Types from '../../../../__generated__/schema.generated';

export type GetItDoneWorkoutMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type GetItDoneWorkoutMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };
