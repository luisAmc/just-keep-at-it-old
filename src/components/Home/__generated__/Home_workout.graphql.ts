/**
 * @generated SignedSource<<6ff33777ae624b0ec2418f9f9eec4e31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Home_workout$data = ReadonlyArray<{
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: any;
  readonly workoutExercises: ReadonlyArray<{
    readonly exercise: {
      readonly id: string;
      readonly type: string;
      readonly muscleGroup: string | null;
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"WorkoutCard_workout">;
  readonly " $fragmentType": "Home_workout";
}>;
export type Home_workout = Home_workout$data;
export type Home_workout$key = ReadonlyArray<{
  readonly " $data"?: Home_workout$data;
  readonly " $fragmentSpreads": FragmentRefs<"Home_workout">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Home_workout",
  "selections": [
    (v0/*: any*/),
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkoutExercise",
      "kind": "LinkedField",
      "name": "workoutExercises",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Exercise",
          "kind": "LinkedField",
          "name": "exercise",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkoutCard_workout"
    }
  ],
  "type": "Workout",
  "abstractKey": null
};
})();

(node as any).hash = "7b86b917884d8cc36fa44c2c8af32d31";

export default node;
