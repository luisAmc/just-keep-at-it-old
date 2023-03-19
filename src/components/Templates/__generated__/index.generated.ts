import * as Types from '../../../__generated__/schema.generated';

export type Templates_Template = { __typename?: 'WorkoutTemplate', id: string, name: string, exercises: Array<{ __typename?: 'ExerciseOnWorkoutTemplate', exercise: { __typename?: 'Exercise', id: string, name: string, type: string } }> };

export type TemplatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TemplatesQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, workoutTemplates: Array<{ __typename?: 'WorkoutTemplate', id: string, name: string, exercises: Array<{ __typename?: 'ExerciseOnWorkoutTemplate', exercise: { __typename?: 'Exercise', id: string, name: string, type: string } }> }> } | null };

export type TemplatesMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TemplatesMutation = { __typename?: 'Mutation', startWorkoutFromTemplate: { __typename?: 'Workout', id: string } };

export type TemplatesDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TemplatesDeleteMutation = { __typename?: 'Mutation', deleteWorkoutTemplate: { __typename?: 'WorkoutTemplate', id: string } };
