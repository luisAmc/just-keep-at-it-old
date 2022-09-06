import * as Types from '../../../../__generated__/schema.generated';

export type AddExerciseToWorkoutMutationVariables = Types.Exact<{
  input: Types.AddExerciseToWorkoutInput;
}>;


export type AddExerciseToWorkoutMutation = { __typename?: 'Mutation', addExerciseToWorkout: { __typename?: 'Workout', id: string } };

export type AddNewExerciseMutationVariables = Types.Exact<{
  input: Types.CreateExerciseInput;
}>;


export type AddNewExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string } };
