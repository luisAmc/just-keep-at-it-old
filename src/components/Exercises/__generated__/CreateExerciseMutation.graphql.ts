/**
 * @generated SignedSource<<ba42a0378f340c73dd090acf3bc5fa63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly muscleGroup: string | null;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Exercise",
    "kind": "LinkedField",
    "name": "createExercise",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateExerciseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateExerciseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "adf3ebf5fd7ee1fb8c2ec4c165c1f8e6",
    "id": null,
    "metadata": {},
    "name": "CreateExerciseMutation",
    "operationKind": "mutation",
    "text": "mutation CreateExerciseMutation(\n  $input: CreateExerciseInput!\n) {\n  createExercise(input: $input) {\n    id\n    name\n    type\n    muscleGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "5827b09c28570661acd840b1ca4d9099";

export default node;
