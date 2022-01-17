/**
 * @generated SignedSource<<937449f1d9d69dc0cec77df4985af135>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type exercisesPageQuery$variables = {};
export type exercisesPageQueryVariables = exercisesPageQuery$variables;
export type exercisesPageQuery$data = {
  readonly exercises: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Exercises_exercise">;
  }>;
};
export type exercisesPageQueryResponse = exercisesPageQuery$data;
export type exercisesPageQuery = {
  variables: exercisesPageQueryVariables;
  response: exercisesPageQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "exercisesPageQuery",
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
    "name": "exercisesPageQuery",
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
    "cacheID": "60d8522826da8aebe81c95e4784394cd",
    "id": null,
    "metadata": {},
    "name": "exercisesPageQuery",
    "operationKind": "query",
    "text": "query exercisesPageQuery {\n  exercises {\n    ...Exercises_exercise\n    id\n  }\n}\n\nfragment Exercises_exercise on Exercise {\n  id\n  name\n  type\n  muscleGroup\n}\n"
  }
};

(node as any).hash = "a13ff64cafa3dbf006852845f1556bbd";

export default node;
