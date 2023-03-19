import * as Types from '../../../__generated__/schema.generated';

export type NewWorkoutMutationVariables = Types.Exact<{
  input: Types.CreateWorkoutInput;
}>;


export type NewWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'Workout', id: string } };
