import fs from 'fs';
import { IncomingHttpHeaders } from 'http';
import { NextApiHandler } from 'next';
import { ExecutionResult, GraphQLError, printSchema } from 'graphql';
import { builder, Context, createGraphQLContext } from 'src/graphql/builder';
import { resolveSession } from 'src/utils/sessions';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL
} from 'graphql-helix';
import 'src/graphql/resolvers';

const schema = builder.toSchema({});

fs.writeFileSync('./schema.graphql', printSchema(schema));

function getGraphQLCode(error: Error & { code?: number }) {
  return error.code ?? error.name === 'NotFoundError' ? 404 : null;
}

function formatResult(result: ExecutionResult) {
  const formattedResult: ExecutionResult = {
    data: result.data
  };

  if (result.errors) {
    formattedResult.errors = result.errors.map((error) => {
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

  const session = await resolveSession({ req, res });

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
      res.setHeader('Content-Type', 'text/html');
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
        contextFactory: () => createGraphQLContext(req, res, session)
      });

      // processRequest returns one of three types of results depending on how the server should respond
      // 1) RESPONSE: a regular JSON payload
      // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
      // 3) PUSH: a stream of events to push back down the client for a subscription
      // The "sendResult" is a NodeJS-only shortcut for handling all possible types of Graphql responses,
      // See "Advanced Usage" below for more details and customizations available on that layer.

      if (result.type !== 'RESPONSE') {
        throw new Error(`Unsupported response type: "${result.type}"`);
      }

      // sendResult(result, res);

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
