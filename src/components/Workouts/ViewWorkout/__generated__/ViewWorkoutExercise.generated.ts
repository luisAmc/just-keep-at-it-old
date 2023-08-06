import * as Types from '../../../../__generated__/schema.generated';

export type ViewWorkoutExercise_WorkoutExercise = { __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> };
