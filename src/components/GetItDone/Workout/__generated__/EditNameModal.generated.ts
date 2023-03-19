import * as Types from '../../../../__generated__/schema.generated';

export type EditNameModalMutationVariables = Types.Exact<{
  input: Types.EditWorkoutInput;
}>;


export type EditNameModalMutation = { __typename?: 'Mutation', editWorkout: { __typename?: 'Workout', id: string, name: string } };
