/**
 * @generated SignedSource<<051d3d356a0e316ca589197cc5a7a987>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Workout_workout$data = {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: any;
  readonly doneAt: any | null;
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
  readonly " $fragmentType": "Workout_workout";
};
export type Workout_workout = Workout_workout$data;
export type Workout_workout$key = {
  readonly " $data"?: Workout_workout$data;
  readonly " $fragmentSpreads": FragmentRefs<"Workout_workout">;
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
  "name": "Workout_workout",
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
      "name": "doneAt",
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

(node as any).hash = "e95b2148742ae022f9707d7c3f6c9c2b";

export default node;
