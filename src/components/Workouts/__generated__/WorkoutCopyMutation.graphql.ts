/**
 * @generated SignedSource<<d41961dc9e5451a81b252340411165d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkoutCopyMutation$variables = {
  workoutId: string;
};
export type WorkoutCopyMutationVariables = WorkoutCopyMutation$variables;
export type WorkoutCopyMutation$data = {
  readonly copyDoneWorkout: {
    readonly " $fragmentSpreads": FragmentRefs<"Workout_workout">;
  };
};
export type WorkoutCopyMutationResponse = WorkoutCopyMutation$data;
export type WorkoutCopyMutation = {
  variables: WorkoutCopyMutationVariables;
  response: WorkoutCopyMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workoutId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "workoutId",
    "variableName": "workoutId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkoutCopyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "copyDoneWorkout",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Workout_workout"
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
    "name": "WorkoutCopyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "copyDoneWorkout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkoutSet",
                "kind": "LinkedField",
                "name": "sets",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7e9eb03a943213aaca9d6130463405a8",
    "id": null,
    "metadata": {},
    "name": "WorkoutCopyMutation",
    "operationKind": "mutation",
    "text": "mutation WorkoutCopyMutation(\n  $workoutId: ID!\n) {\n  copyDoneWorkout(workoutId: $workoutId) {\n    ...Workout_workout\n    id\n  }\n}\n\nfragment Workout_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  completedAt\n  workoutExercises {\n    id\n    sets {\n      id\n      mins\n      lbs\n      reps\n    }\n    exercise {\n      id\n      name\n      type\n      muscleGroup\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "91cd698c3434e656065bfeae3a630ae2";

export default node;
