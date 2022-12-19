import * as Types from '../../../../__generated__/schema.generated';

export type AddExerciseSlideOverQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AddExerciseSlideOverQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null }> } | null };
