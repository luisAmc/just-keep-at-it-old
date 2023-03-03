import * as Types from '../../../../__generated__/schema.generated';

export type CreateWorkoutMutationVariables = Types.Exact<{
  input: Types.CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'Workout', id: string } };
