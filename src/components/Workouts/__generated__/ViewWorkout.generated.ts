import * as Types from '../../../__generated__/schema.generated';

export type ViewWorkout_Workout = { __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, bias: string };

export type WorkoutQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type WorkoutQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: string, name: string, status: string, completedAt?: string | null, createdAt: string, workoutExercisesCount: number, bias: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, exercise: { __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins?: number | null, lbs?: number | null, reps?: number | null }> }> } };
