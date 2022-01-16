/**
 * @generated SignedSource<<a7c28689b73cb33b6c56028e6f1c30eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type homePageQuery$variables = {};
export type homePageQueryVariables = homePageQuery$variables;
export type homePageQuery$data = {
  readonly workouts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Home_workout">;
  }>;
};
export type homePageQueryResponse = homePageQuery$data;
export type homePageQuery = {
  variables: homePageQueryVariables;
  response: homePageQuery$data;
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
    "name": "homePageQuery",
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
    "name": "homePageQuery",
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
    "cacheID": "cd09fd213c5ae6de30f430e9220f5135",
    "id": null,
    "metadata": {},
    "name": "homePageQuery",
    "operationKind": "query",
    "text": "query homePageQuery {\n  workouts {\n    ...Home_workout\n    id\n  }\n}\n\nfragment Home_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  workoutExercises {\n    exercise {\n      id\n      type\n      muscleGroup\n    }\n    id\n  }\n  ...WorkoutCard_workout\n}\n\nfragment WorkoutCard_workout on Workout {\n  id\n  name\n  status\n  createdAt\n  workoutExercises {\n    exercise {\n      type\n      muscleGroup\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b6d0304d49dc2352af463ff250feb88";

export default node;
