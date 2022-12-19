import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutExercisesMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type WorkoutExercisesMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };
