import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutExercise_WorkoutSet = { __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number };

export type WorkoutExercise_Exercise = { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null };

export type WorkoutExercise_WorkoutExercise = { __typename?: 'WorkoutExercise', id: string, index: number, exercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> };
