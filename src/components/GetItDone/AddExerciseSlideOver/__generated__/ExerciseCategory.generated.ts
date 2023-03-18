import * as Types from '../../../../__generated__/schema.generated';

export type ExerciseCategoryCreateMutationVariables = Types.Exact<{
  input: Types.CreateExerciseInput;
}>;


export type ExerciseCategoryCreateMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string, name: string, type: string, lastSession?: { __typename?: 'WorkoutExercise', sets: Array<{ __typename?: 'WorkoutSet', id: string, mins: number, distance: number, kcal: number, lbs: number, reps: number }> } | null } };
