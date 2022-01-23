/**
 * @generated SignedSource<<aed54a2c9e8ad9d7607bf3abfaf3c6a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GetItDoneInput = {
  workoutExercises: ReadonlyArray<DoneWorkoutExerciseInput>;
};
export type DoneWorkoutExerciseInput = {
  id: string;
  sets: ReadonlyArray<DoneWorkoutExerciseSetInput>;
};
export type DoneWorkoutExerciseSetInput = {
  lbs?: number | null;
  mins?: number | null;
  reps?: number | null;
};
export type GetItDoneMutation$variables = {
  workoutId: string;
  data: GetItDoneInput;
  connections: ReadonlyArray<string>;
};
export type GetItDoneMutationVariables = GetItDoneMutation$variables;
export type GetItDoneMutation$data = {
  readonly getWorkoutDone: {
    readonly workout: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"GetItDone_workout">;
    };
  };
};
export type GetItDoneMutationResponse = GetItDoneMutation$data;
export type GetItDoneMutation = {
  variables: GetItDoneMutationVariables;
  response: GetItDoneMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "data"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workoutId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "data",
    "variableName": "data"
  },
  {
    "kind": "Variable",
    "name": "workoutId",
    "variableName": "workoutId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetItDoneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GetWorkoutDoneResult",
        "kind": "LinkedField",
        "name": "getWorkoutDone",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Workout",
            "kind": "LinkedField",
            "name": "workout",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GetItDone_workout"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GetItDoneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GetWorkoutDoneResult",
        "kind": "LinkedField",
        "name": "getWorkoutDone",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Workout",
            "kind": "LinkedField",
            "name": "workout",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkoutSet",
                    "kind": "LinkedField",
                    "name": "sets",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
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
                      (v4/*: any*/),
                      (v5/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "workout",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "HomeWorkoutConnectionEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5873a6f0948321fbf3a6b3e712830fbc",
    "id": null,
    "metadata": {},
    "name": "GetItDoneMutation",
    "operationKind": "mutation",
    "text": "mutation GetItDoneMutation(\n  $workoutId: ID!\n  $data: GetItDoneInput!\n) {\n  getWorkoutDone(workoutId: $workoutId, data: $data) {\n    workout {\n      id\n      ...GetItDone_workout\n    }\n  }\n}\n\nfragment GetItDone_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  completedAt\n  workoutExercises {\n    id\n    sets {\n      id\n      mins\n      lbs\n      reps\n    }\n    exercise {\n      id\n      name\n      type\n      muscleGroup\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a9d1f50cf8dd5636e2c54af3130a00c";

export default node;
