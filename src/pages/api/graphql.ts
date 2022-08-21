import { builder, Context, createGraphQLContext } from 'src/graphql/builder';
import {
  printSchema,
  lexicographicSortSchema,
  ExecutionResult,
  GraphQLError
} from 'graphql';
import fs from 'fs';
import { IncomingHttpHeaders } from 'http';
import { NextApiHandler } from 'next';
import { resolveSession } from 'src/utils/sessions';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL
} from 'graphql-helix';
import 'src/graphql/resolvers';

const schema = builder.toSchema({});

fs.writeFileSync(
  './src/graphql/schema.graphql',
  printSchema(lexicographicSortSchema(schema))
);

function getGraphQLCode(error: Error & { code?: number }) {
  return error.code ?? error.name === 'NotFoundError' ? 404 : null;
}

function formatResult(result: ExecutionResult) {
  const formattedResult: ExecutionResult = {
    data: result.data
  };

  if (result.errors) {
    formattedResult.errors = result.errors.map((error) => {
      // NOTE: If you need to debug a specific server-side GraphQL error, you may want to uncomment this log:
      // console.log(error.originalError);

      // Return a generic error message instead
      return new GraphQLError(
        error.message,
        error.nodes,
        error.source,
        error.positions,
        error.path,
        error.originalError,
        {
          code: getGraphQLCode(error.originalError as any),
          path: (error.originalError as any)?.path,
          ...(error.originalError as any)?.extensions
        }
      );
    });
  }

  return formattedResult;
}

interface GraphQLRequest {
  body?: any;
  headers: IncomingHttpHeaders;
  method: string;
  query: any;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST' && req.headers['x-csrf-trick'] !== 'justKeepAtIt') {
    res.status(400);
    res.end('Missing CSRF verification.');
    return;
  }

  const { session, ironSession } = await resolveSession(req, res);

  try {
    // Create a generic Request object that can be consumed by Graphql Helix's API
    const request: GraphQLRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method ?? 'GET',
      query: req.query
    };

    // Determine whether we should render GraphiQL instead of returning an API response
    if (shouldRenderGraphiQL(request)) {
      res.send(
        renderGraphiQL({
          endpoint: '/api/graphql',
          headers: JSON.stringify({ 'X-CSRF-Trick': 'justKeepAtIt' })
        })
      );
    } else {
      // Extract the Graphql parameters from the request
      const { operationName, query, variables } = getGraphQLParameters(request);

      // Validate and execute the query
      const result = await processRequest<Context>({
        operationName,
        query,
        variables,
        request,
        schema,
        contextFactory: () =>
          createGraphQLContext(req, res, ironSession, session)
      });

      // processRequest returns one of three types of results depending on how the server should respond
      // 1) RESPONSE: a regular JSON payload
      // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
      // 3) PUSH: a stream of events to push back down the client for a subscription
      // The "sendResult" is a NodeJS-only shortcut for handling all possible types of Graphql responses,
      // See "Advanced Usage" below for more details and customizations available on that layer.

      //   sendResult(result, res);

      if (result.type !== 'RESPONSE') {
        throw new Error(`Unsupported response type: "${result.type}"`);
      }

      result.headers.forEach(({ name, value }) => res.setHeader(name, value));
      res.status(result.status);
      res.json(formatResult(result.payload));
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
};

export default handler;
