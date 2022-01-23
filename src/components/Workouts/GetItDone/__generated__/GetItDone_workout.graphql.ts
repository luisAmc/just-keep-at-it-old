/**
 * @generated SignedSource<<66d91915ebbf279a52f1fe29e8ff9ac7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GetItDone_workout$data = {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: any;
  readonly completedAt: any | null;
  readonly workoutExercises: ReadonlyArray<{
    readonly id: string;
    readonly sets: ReadonlyArray<{
      readonly id: string;
      readonly mins: number | null;
      readonly lbs: number | null;
      readonly reps: number | null;
    }>;
    readonly exercise: {
      readonly id: string;
      readonly name: string;
      readonly type: string;
      readonly muscleGroup: string | null;
    };
  }>;
  readonly " $fragmentType": "GetItDone_workout";
};
export type GetItDone_workout = GetItDone_workout$data;
export type GetItDone_workout$key = {
  readonly " $data"?: GetItDone_workout$data;
  readonly " $fragmentSpreads": FragmentRefs<"GetItDone_workout">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GetItDone_workout",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
      "kind": "ScalarField",
      "name": "completedAt",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkoutSet",
          "kind": "LinkedField",
          "name": "sets",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mins",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lbs",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reps",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Exercise",
          "kind": "LinkedField",
          "name": "exercise",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
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
  ],
  "type": "Workout",
  "abstractKey": null
};
})();

(node as any).hash = "9637a5ef219096eee41fc7973d20d09b";

export default node;
