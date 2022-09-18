import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutExercise_WorkoutExercise = { __typename?: 'WorkoutExercise', id: string, index: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> };

export type GetItDoneQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetItDoneQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, index: number, lastSession?: { __typename?: 'WorkoutExercise', id: string, index: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> } };

export type GetWorkoutDoneMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type GetWorkoutDoneMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };
