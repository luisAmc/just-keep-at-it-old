import * as Types from '../../../../__generated__/schema.generated';

export type ViewWorkout_Workout = { __typename?: 'Workout', id: string, name: string, status: string, createdAt: string, completedAt?: string | null, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> };

export type WorkoutQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type WorkoutQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: string, name: string, status: string, createdAt: string, completedAt?: string | null, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> }> } };
