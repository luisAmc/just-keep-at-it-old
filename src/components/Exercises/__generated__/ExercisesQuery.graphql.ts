/**
 * @generated SignedSource<<0e1edd62cb52f91b641931f1296417dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ExercisesQuery$variables = {};
export type ExercisesQueryVariables = ExercisesQuery$variables;
export type ExercisesQuery$data = {
  readonly exercises: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly muscleGroup: string | null;
  }>;
};
export type ExercisesQueryResponse = ExercisesQuery$data;
export type ExercisesQuery = {
  variables: ExercisesQueryVariables;
  response: ExercisesQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Exercise",
    "kind": "LinkedField",
    "name": "exercises",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "muscleGroup",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExercisesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExercisesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "77749ad6d3dc42e6dc7f4c091ac8eb94",
    "id": null,
    "metadata": {},
    "name": "ExercisesQuery",
    "operationKind": "query",
    "text": "query ExercisesQuery {\n  exercises {\n    id\n    name\n    type\n    muscleGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b8644fb601787e7092177af52e2ccea";

export default node;
