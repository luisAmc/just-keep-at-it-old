/**
 * @generated SignedSource<<9660cf2b2c4599b45b5915430b0afa06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeQuery$variables = {};
export type HomeQueryVariables = HomeQuery$variables;
export type HomeQuery$data = {
  readonly workouts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Home_workout">;
  }>;
};
export type HomeQueryResponse = HomeQuery$data;
export type HomeQuery = {
  variables: HomeQueryVariables;
  response: HomeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "workouts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Home_workout"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "workouts",
        "plural": true,
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
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a939b6504a80d26abc0f91b22459b94d",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  workouts {\n    ...Home_workout\n    id\n  }\n}\n\nfragment Home_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  workoutExercises {\n    exercise {\n      id\n      type\n      muscleGroup\n    }\n    id\n  }\n  ...WorkoutCard_workout\n}\n\nfragment WorkoutCard_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  workoutExercises {\n    exercise {\n      type\n      muscleGroup\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1839b3df2b83bba30756f480b392ff68";

export default node;
