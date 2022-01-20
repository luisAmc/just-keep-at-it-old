import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

const fetchRelay: FetchFunction = async (operation, variables) => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });

  const json = await res.json();

  return json;
};

export const relayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10
  })
});
