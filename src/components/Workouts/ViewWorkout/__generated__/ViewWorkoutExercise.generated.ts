import * as Types from '../../../../__generated__/schema.generated';

export type ViewWorkoutExercise_WorkoutExerciseBasic = { __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string } };

export type ViewWorkoutExercise_WorkoutSet = { __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number };

export type ViewWorkoutExercise_WorkoutExercise = { __typename?: 'WorkoutExercise', id: string, setsCount: number, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, exercise: { __typename?: 'Exercise', id: string, name: string, type: string } };
