/**
 * @generated SignedSource<<b83e1258963cfed131f9df4fbe9045ec>>
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
export type CreateExerciseModalMutation$variables = {
  input: CreateExerciseInput;
};
export type CreateExerciseModalMutationVariables = CreateExerciseModalMutation$variables;
export type CreateExerciseModalMutation$data = {
  readonly createExercise: {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly muscleGroup: string | null;
  };
};
export type CreateExerciseModalMutationResponse = CreateExerciseModalMutation$data;
export type CreateExerciseModalMutation = {
  variables: CreateExerciseModalMutationVariables;
  response: CreateExerciseModalMutation$data;
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
    "name": "CreateExerciseModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateExerciseModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3ee15e6babd88a989b5d73d825b2b169",
    "id": null,
    "metadata": {},
    "name": "CreateExerciseModalMutation",
    "operationKind": "mutation",
    "text": "mutation CreateExerciseModalMutation(\n  $input: CreateExerciseInput!\n) {\n  createExercise(input: $input) {\n    id\n    name\n    type\n    muscleGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "41b15e69f1357448620b3b90c6dff784";

export default node;
