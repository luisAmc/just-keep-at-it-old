import * as Types from '../../../../__generated__/schema.generated';

export type ViewExercise_Exercise = { __typename?: 'Exercise', id: string, name: string, type: string };

export type ViewExercise_DoneSession = { __typename?: 'WorkoutExercise', id: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, workout: { __typename?: 'Workout', name: string, completedAt?: string | null } };

export type ViewExercise_ExerciseWithDoneSession = { __typename?: 'Exercise', id: string, name: string, type: string, doneSessions: Array<{ __typename?: 'WorkoutExercise', id: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, workout: { __typename?: 'Workout', name: string, completedAt?: string | null } }> };

export type ViewExerciseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  limit: Types.Scalars['Int'];
}>;


export type ViewExerciseQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, name: string, type: string, doneSessions: Array<{ __typename?: 'WorkoutExercise', id: string, sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }>, workout: { __typename?: 'Workout', name: string, completedAt?: string | null } }> } };
