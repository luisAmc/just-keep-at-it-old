export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type CreateExerciseCategoryInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateExerciseInput = {
  categoryId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateWorkoutInput = {
  name: Scalars['String']['input'];
};

export type CreateWorkoutTemplateExerciseInput = {
  exerciseId: Scalars['ID']['input'];
  exerciseIndex: Scalars['Int']['input'];
};

export type CreateWorkoutTemplateInput = {
  exercises: Array<CreateWorkoutTemplateExerciseInput>;
  name: Scalars['String']['input'];
};

export type DoneExerciseInput = {
  exerciseId: Scalars['ID']['input'];
  exerciseIndex: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  sets: Array<DoneExerciseSetInput>;
};

export type DoneExerciseSetInput = {
  distance: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  kcal: Scalars['Int']['input'];
  lbs: Scalars['Float']['input'];
  mins: Scalars['Float']['input'];
  reps: Scalars['Int']['input'];
};

export type EditExerciseInput = {
  exerciseId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type EditWorkoutInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  workoutId: Scalars['ID']['input'];
};

export type Exercise = {
  __typename?: 'Exercise';
  category: ExerciseCategory;
  doneSessions: Array<WorkoutExercise>;
  doneSessionsCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastSession?: Maybe<WorkoutExercise>;
  name: Scalars['String']['output'];
  sessions: Array<WorkoutExercise>;
  sessionsCount: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};


export type ExerciseDoneSessionsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type ExerciseSessionsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type ExerciseCategory = {
  __typename?: 'ExerciseCategory';
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ExerciseOnWorkoutTemplate = {
  __typename?: 'ExerciseOnWorkoutTemplate';
  exercise: Exercise;
  exerciseIndex: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type ExerciseOptionInput = {
  id: Scalars['String']['input'];
};

export type GetWorkoutDoneInput = {
  workoutExercises: Array<DoneExerciseInput>;
  workoutId: Scalars['ID']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExercise: Exercise;
  createExerciseCategory: ExerciseCategory;
  createWorkout: Workout;
  createWorkoutTemplate: WorkoutTemplate;
  deleteWorkout: Workout;
  deleteWorkoutTemplate: WorkoutTemplate;
  doItAgain: Workout;
  editExercise: Exercise;
  editWorkout: Workout;
  getWorkoutDone: Workout;
  login: User;
  logout: Result;
  partialSave: Scalars['Boolean']['output'];
  signUp: User;
  startWorkoutFromTemplate: Workout;
};


export type MutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


export type MutationCreateExerciseCategoryArgs = {
  input: CreateExerciseCategoryInput;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationCreateWorkoutTemplateArgs = {
  input: CreateWorkoutTemplateInput;
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['ID']['input'];
};


export type MutationDeleteWorkoutTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDoItAgainArgs = {
  workoutToCopyId: Scalars['ID']['input'];
};


export type MutationEditExerciseArgs = {
  input: EditExerciseInput;
};


export type MutationEditWorkoutArgs = {
  input: EditWorkoutInput;
};


export type MutationGetWorkoutDoneArgs = {
  input: GetWorkoutDoneInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPartialSaveArgs = {
  input: GetWorkoutDoneInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationStartWorkoutFromTemplateArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  exercise: Exercise;
  exerciseCategories: Array<ExerciseCategory>;
  viewer?: Maybe<User>;
  workout: Workout;
  workoutTemplate: WorkoutTemplate;
  workoutTemplates: Array<WorkoutTemplate>;
  workouts: Array<Workout>;
};


export type QueryExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkoutTemplateArgs = {
  id: Scalars['ID']['input'];
};

export enum Result {
  Success = 'SUCCESS'
}

export type SignUpInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  exerciseCategories: Array<ExerciseCategory>;
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
  workedDays: Array<Scalars['DateTime']['output']>;
  workoutTemplates: Array<WorkoutTemplate>;
  workouts: Array<Workout>;
  workoutsCount: Scalars['Int']['output'];
};


export type UserWorkoutsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type Workout = {
  __typename?: 'Workout';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  workoutExercises: Array<WorkoutExercise>;
  workoutExercisesCount: Scalars['Int']['output'];
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  createdAt: Scalars['DateTime']['output'];
  exercise: Exercise;
  exerciseIndex: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  sets: Array<WorkoutSet>;
  setsCount: Scalars['Int']['output'];
  workout: Workout;
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  distance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  kcal: Scalars['Int']['output'];
  lbs: Scalars['Float']['output'];
  mins: Scalars['Float']['output'];
  reps: Scalars['Int']['output'];
};

export type WorkoutTemplate = {
  __typename?: 'WorkoutTemplate';
  exercises: Array<ExerciseOnWorkoutTemplate>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};
