import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutExercise_WorkoutExercise = { __typename?: 'WorkoutExercise', id: string, index: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> };

export type GetItDoneQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetItDoneQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, index: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> } };

export type GetWorkoutDoneMutationVariables = Types.Exact<{
  input: Types.GetWorkoutDoneInput;
}>;


export type GetWorkoutDoneMutation = { __typename?: 'Mutation', getWorkoutDone: { __typename?: 'Workout', id: string } };

export type GetItDoneDeleteMutationVariables = Types.Exact<{
  workoutId: Types.Scalars['ID'];
}>;


export type GetItDoneDeleteMutation = { __typename?: 'Mutation', deleteWorkout: { __typename?: 'Workout', id: string } };
