/**
 * @generated SignedSource<<5a4d8fb719528212f52966ab8a6b0640>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExercisesQuery$variables = {};
export type ExercisesQueryVariables = ExercisesQuery$variables;
export type ExercisesQuery$data = {
  readonly exercises: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Exercises_exercise">;
  }>;
};
export type ExercisesQueryResponse = ExercisesQuery$data;
export type ExercisesQuery = {
  variables: ExercisesQueryVariables;
  response: ExercisesQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExercisesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Exercise",
        "kind": "LinkedField",
        "name": "exercises",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Exercises_exercise"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExercisesQuery",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "c4f24e83e0ed6fac0ec37665c709fe4e",
    "id": null,
    "metadata": {},
    "name": "ExercisesQuery",
    "operationKind": "query",
    "text": "query ExercisesQuery {\n  exercises {\n    ...Exercises_exercise\n    id\n  }\n}\n\nfragment Exercises_exercise on Exercise {\n  id\n  name\n  type\n  muscleGroup\n}\n"
  }
};

(node as any).hash = "c06040de1efb9dc59b4434c645bc0a84";

export default node;
