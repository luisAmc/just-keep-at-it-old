import * as Types from '../../../../__generated__/schema.generated';

export type GetItDoneDeleteMutationVariables = Types.Exact<{
  workoutId: Types.Scalars['ID'];
}>;


export type GetItDoneDeleteMutation = { __typename?: 'Mutation', deleteWorkout: { __typename?: 'Workout', id: string } };
