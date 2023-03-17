import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutEditNameModalMutationVariables = Types.Exact<{
  input: Types.EditWorkoutInput;
}>;


export type WorkoutEditNameModalMutation = { __typename?: 'Mutation', editWorkout: { __typename?: 'Workout', id: string, name: string } };
