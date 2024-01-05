import * as Types from '../../__generated__/schema.generated';

export type HomeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, username: string } | null };
