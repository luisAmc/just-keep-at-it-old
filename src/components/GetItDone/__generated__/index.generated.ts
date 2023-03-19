import * as Types from '../../../__generated__/schema.generated';

export type GetItDoneQueryVariables = Types.Exact<{
  workoutId: Types.Scalars['ID'];
}>;


export type GetItDoneQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, exerciseIndex: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> } };
