/**
 * @generated SignedSource<<4395d9d2015e642f72c66f1402fd2467>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Exercises_exercise$data = ReadonlyArray<{
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly muscleGroup: string | null;
  readonly " $fragmentType": "Exercises_exercise";
}>;
export type Exercises_exercise = Exercises_exercise$data;
export type Exercises_exercise$key = ReadonlyArray<{
  readonly " $data"?: Exercises_exercise$data;
  readonly " $fragmentSpreads": FragmentRefs<"Exercises_exercise">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Exercises_exercise",
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
  "type": "Exercise",
  "abstractKey": null
};

(node as any).hash = "aa8588ecda117b2ae0a0c32ce053d8cf";

export default node;
