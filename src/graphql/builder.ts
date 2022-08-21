import { Session } from '@prisma/client';
import { IncomingMessage, OutgoingMessage } from 'http';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { db } from 'src/utils/prisma';
import { IronSession } from 'iron-session';

export interface Context {
  req: IncomingMessage;
  res: OutgoingMessage;
  ironSession: IronSession;
  session?: Session | null;
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage,
  ironSession: IronSession,
  session?: Session | null
): Context {
  return { req, res, ironSession, session };
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
    ID: { Input: string; Output: string };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [PrismaPlugin, ScopeAuthPlugin, SimpleObjectsPlugin],
  authScopes: async ({ session }) => ({
    public: true,
    user: !!session,
    unauthenticated: !session
  }),
  prisma: {
    client: db
  },
  defaultInputFieldRequiredness: true
});

builder.queryType({ authScopes: { user: true } });

builder.mutationType({ authScopes: { user: true } });

builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    if (typeof date !== 'string') {
      throw new Error('Unknown date value.');
    }

    return new Date(date);
  }
});
