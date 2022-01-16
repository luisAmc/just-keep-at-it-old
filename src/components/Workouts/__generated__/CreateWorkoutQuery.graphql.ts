/**
 * @generated SignedSource<<d25f464983fd562d65fd136fa4aab04d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CreateWorkoutQuery$variables = {};
export type CreateWorkoutQueryVariables = CreateWorkoutQuery$variables;
export type CreateWorkoutQuery$data = {
  readonly exercises: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly muscleGroup: string | null;
  }>;
};
export type CreateWorkoutQueryResponse = CreateWorkoutQuery$data;
export type CreateWorkoutQuery = {
  variables: CreateWorkoutQueryVariables;
  response: CreateWorkoutQuery$data;
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
    "name": "CreateWorkoutQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateWorkoutQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3be459550369f084f7e1549bc5e79f9f",
    "id": null,
    "metadata": {},
    "name": "CreateWorkoutQuery",
    "operationKind": "query",
    "text": "query CreateWorkoutQuery {\n  exercises {\n    id\n    name\n    type\n    muscleGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "66e546d5da560fb146b1426a804cc39d";

export default node;
