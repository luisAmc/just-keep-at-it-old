/**
 * @generated SignedSource<<bb2f9629d94222c78c4c812be0f038f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {
  password: string;
  username: string;
};
export type LoginFormMutation$variables = {
  input: LoginInput;
};
export type LoginFormMutationVariables = LoginFormMutation$variables;
export type LoginFormMutation$data = {
  readonly login: {
    readonly id: string;
  };
};
export type LoginFormMutationResponse = LoginFormMutation$data;
export type LoginFormMutation = {
  variables: LoginFormMutationVariables;
  response: LoginFormMutation$data;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4609d9a4b250df6eb2761bac4ab46a12",
    "id": null,
    "metadata": {},
    "name": "LoginFormMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ea3f3202504cd1a0da6121fb695a7109";

export default node;
