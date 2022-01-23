/**
 * @generated SignedSource<<37b1be2170291bd6e353b32107be68cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignUpInput = {
  password: string;
  username: string;
};
export type SignUpFormMutation$variables = {
  input: SignUpInput;
};
export type SignUpFormMutationVariables = SignUpFormMutation$variables;
export type SignUpFormMutation$data = {
  readonly signUp: {
    readonly id: string;
  };
};
export type SignUpFormMutationResponse = SignUpFormMutation$data;
export type SignUpFormMutation = {
  variables: SignUpFormMutationVariables;
  response: SignUpFormMutation$data;
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
    "name": "signUp",
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
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a78c28593d5042caf2ca9ed696af419e",
    "id": null,
    "metadata": {},
    "name": "SignUpFormMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpFormMutation(\n  $input: SignUpInput!\n) {\n  signUp(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "374255e984ae2207671441402c6e2454";

export default node;
