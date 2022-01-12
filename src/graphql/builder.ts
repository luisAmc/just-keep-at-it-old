import SchemaBuilder from '@giraphql/core';
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth';
import RelayPlugin from '@giraphql/plugin-relay';
import PrismaPlugin from '@giraphql/plugin-prisma';
import type PrismaTypes from '@giraphql/plugin-prisma/generated';
import { db } from 'src/utils/prisma';
import { IncomingMessage, OutgoingMessage } from 'http';
import { Session } from '@prisma/client';

export interface Context {
  req: IncomingMessage;
  res: OutgoingMessage;
  session?: Session | null;
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage,
  session?: Session | null
): Context {
  return {
    req,
    res,
    session
  };
}

export const builder = new SchemaBuilder<{
  DefaultInputFieldRequiredness: true;
  PrismaTypes: PrismaTypes;
  Context: Context;
  AuthScopes: {
    public: boolean;
    user: boolean;
    unauthenticated: boolean;
  };
  Scalars: {
    ID: { Input: string; Output: string | number };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin, ScopeAuthPlugin],
  authScopes: async ({ session }) => ({
    public: true,
    user: !!session,
    unauthenticated: !session
  }),
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String'
  },
  prisma: {
    client: db
  },
  defaultInputFieldRequiredness: true
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({
  authScopes: { user: true }
});

builder.mutationType({
  authScopes: { user: true }
});

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date: any) => {
    return new Date(date);
  }
});
