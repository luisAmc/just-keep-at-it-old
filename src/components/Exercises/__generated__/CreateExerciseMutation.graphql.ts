/**
 * @generated SignedSource<<407717a71877cd51f212595f1313bf39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateExerciseInput = {
  muscleGroup?: string | null;
  name: string;
  type: string;
};
export type CreateExerciseMutation$variables = {
  input: CreateExerciseInput;
};
export type CreateExerciseMutationVariables = CreateExerciseMutation$variables;
export type CreateExerciseMutation$data = {
  readonly createExercise: {
    readonly exercise: {
      readonly " $fragmentSpreads": FragmentRefs<"Exercises_exercise">;
    };
  };
};
export type CreateExerciseMutationResponse = CreateExerciseMutation$data;
export type CreateExerciseMutation = {
  variables: CreateExerciseMutationVariables;
  response: CreateExerciseMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateExerciseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateExerciseResult",
        "kind": "LinkedField",
        "name": "createExercise",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Exercise",
            "kind": "LinkedField",
            "name": "exercise",
            "plural": false,
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
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateExerciseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateExerciseResult",
        "kind": "LinkedField",
        "name": "createExercise",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Exercise",
            "kind": "LinkedField",
            "name": "exercise",
            "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e7237d4377b7e91f73baf4e2af5f09a8",
    "id": null,
    "metadata": {},
    "name": "CreateExerciseMutation",
    "operationKind": "mutation",
    "text": "mutation CreateExerciseMutation(\n  $input: CreateExerciseInput!\n) {\n  createExercise(input: $input) {\n    exercise {\n      ...Exercises_exercise\n      id\n    }\n  }\n}\n\nfragment Exercises_exercise on Exercise {\n  id\n  name\n  type\n  muscleGroup\n}\n"
  }
};
})();

(node as any).hash = "10a7d1bf87aa8a14ae397d93195f991e";

export default node;
