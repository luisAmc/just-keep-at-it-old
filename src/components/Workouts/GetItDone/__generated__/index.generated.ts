import * as Types from '../../../../__generated__/schema.generated';

export type GetIrDoneQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetIrDoneQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, lastSession?: { __typename?: 'WorkoutExercise', exercise: { __typename?: 'Exercise', type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }> } };

export type GetWorkoutDoneMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type GetWorkoutDoneMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };
