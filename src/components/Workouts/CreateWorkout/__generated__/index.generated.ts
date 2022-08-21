import * as Types from '../../../../__generated__/schema.generated';

export type CreateWorkoutQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateWorkoutQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, type: string, muscleGroup?: string | null }> } | null };

export type CreateWorkoutMutationVariables = Types.Exact<{
  input: Types.CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'Workout', id: string } };
