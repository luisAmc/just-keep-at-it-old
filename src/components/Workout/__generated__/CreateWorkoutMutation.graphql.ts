/**
 * @generated SignedSource<<f723383ebc1e8fdd2cdb99cf0f5e624f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateWorkoutInput = {
  name: string;
  workoutExercises: ReadonlyArray<ExerciseOptionInput>;
};
export type ExerciseOptionInput = {
  id: string;
};
export type CreateWorkoutMutation$variables = {
  input: CreateWorkoutInput;
};
export type CreateWorkoutMutationVariables = CreateWorkoutMutation$variables;
export type CreateWorkoutMutation$data = {
  readonly createWorkout: {
    readonly id: string;
    readonly name: string;
    readonly status: string;
    readonly workoutExercises: ReadonlyArray<{
      readonly exercise: {
        readonly name: string;
      };
    }>;
  };
};
export type CreateWorkoutMutationResponse = CreateWorkoutMutation$data;
export type CreateWorkoutMutation = {
  variables: CreateWorkoutMutationVariables;
  response: CreateWorkoutMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateWorkoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "createWorkout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
                  (v3/*: any*/)
                ],
                "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateWorkoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "createWorkout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "65be47de5044d6d277f4085fa5db96ec",
    "id": null,
    "metadata": {},
    "name": "CreateWorkoutMutation",
    "operationKind": "mutation",
    "text": "mutation CreateWorkoutMutation(\n  $input: CreateWorkoutInput!\n) {\n  createWorkout(input: $input) {\n    id\n    name\n    status\n    workoutExercises {\n      exercise {\n        name\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1817964864b07a9533a8a817c381c2b5";

export default node;
