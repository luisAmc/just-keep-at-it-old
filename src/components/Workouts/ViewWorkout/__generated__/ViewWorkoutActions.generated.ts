import * as Types from '../../../../__generated__/schema.generated';

export type DoItAgainMutationVariables = Types.Exact<{
  workoutToCopyId: Types.Scalars['ID']['input'];
}>;


export type DoItAgainMutation = { __typename?: 'Mutation', doItAgain: { __typename?: 'Workout', id: string } };

export type DeleteWorkoutMutationVariables = Types.Exact<{
  workoutId: Types.Scalars['ID']['input'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout: { __typename?: 'Workout', id: string } };
