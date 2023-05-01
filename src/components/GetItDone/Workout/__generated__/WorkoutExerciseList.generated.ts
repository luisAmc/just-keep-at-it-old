import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutExerciseListMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type WorkoutExerciseListMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };

export type PartialSaveMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type PartialSaveMutation = { __typename?: 'Mutation', partialSave: boolean };
