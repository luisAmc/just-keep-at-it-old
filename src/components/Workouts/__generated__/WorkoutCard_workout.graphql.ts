/**
 * @generated SignedSource<<be20f909994530d40a984d0691888357>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkoutCard_workout$data = {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: any;
  readonly workoutExercises: ReadonlyArray<{
    readonly exercise: {
      readonly type: string;
      readonly muscleGroup: string | null;
    };
  }>;
  readonly " $fragmentType": "WorkoutCard_workout";
};
export type WorkoutCard_workout = WorkoutCard_workout$data;
export type WorkoutCard_workout$key = {
  readonly " $data"?: WorkoutCard_workout$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorkoutCard_workout">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkoutCard_workout",
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

(node as any).hash = "5d85f7f2c71eb32da88b0bd9f0492155";

export default node;
