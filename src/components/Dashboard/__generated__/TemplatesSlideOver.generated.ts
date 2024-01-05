import * as Types from '../../../__generated__/schema.generated';

export type TemplatesSlideOverMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TemplatesSlideOverMutation = { __typename?: 'Mutation', startWorkoutFromTemplate: { __typename?: 'Workout', id: string, name: string, status: string, createdAt: string, completedAt?: string | null, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setsCount: number, exercise: { __typename?: 'Exercise', id: string, name: string } }> } };
