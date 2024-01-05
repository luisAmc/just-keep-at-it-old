import * as Types from '../../../../__generated__/schema.generated';

export type WorkoutHeaderDeleteMutationVariables = Types.Exact<{
  workoutId: Types.Scalars['ID']['input'];
}>;


export type WorkoutHeaderDeleteMutation = { __typename?: 'Mutation', deleteWorkout: { __typename?: 'Workout', id: string } };
