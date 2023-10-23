import * as Types from '../../__generated__/schema.generated';

export type LayoutQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LayoutQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, username: string } | null };

export type LayoutLogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LayoutLogoutMutation = { __typename?: 'Mutation', logout: Types.Result };
