export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CreateExerciseInput = {
  muscleGroup?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

export type CreateWorkoutInput = {
  name: Scalars['String'];
  workoutExercises: Array<ExerciseOptionInput>;
};

export type DoneExerciseInput = {
  exerciseId: Scalars['ID'];
  id?: InputMaybe<Scalars['ID']>;
  sets: Array<DoneExerciseSetInput>;
};

export type DoneExerciseSetInput = {
  distance: Scalars['Float'];
  kcal: Scalars['Int'];
  lbs: Scalars['Float'];
  mins: Scalars['Int'];
  reps: Scalars['Int'];
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['ID'];
  muscleGroup?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

export type ExerciseOptionInput = {
  id: Scalars['String'];
};

export type GetWorkoutDoneInput = {
  workoutExercises: Array<DoneExerciseInput>;
  workoutId: Scalars['ID'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExercise: Exercise;
  createWorkout: Workout;
  deleteWorkout: Workout;
  doItAgain: Workout;
  getWorkoutDone: Workout;
  login: User;
  signUp: User;
};


export type MutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['ID'];
};


export type MutationDoItAgainArgs = {
  workoutToCopyId: Scalars['ID'];
};


export type MutationGetWorkoutDoneArgs = {
  input: GetWorkoutDoneInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<User>;
  workout: Workout;
  workouts: Array<Workout>;
};


export type QueryWorkoutArgs = {
  id: Scalars['ID'];
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  username: Scalars['String'];
  workouts: Array<Workout>;
  workoutsCount: Scalars['Int'];
};


export type UserWorkoutsArgs = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Workout = {
  __typename?: 'Workout';
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Scalars['String'];
  workoutExercises: Array<WorkoutExercise>;
  workoutExercisesCount: Scalars['Int'];
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  exercise: Exercise;
  id: Scalars['ID'];
  index: Scalars['Int'];
  lastSession?: Maybe<WorkoutExercise>;
  sets: Array<WorkoutSet>;
  setsCount: Scalars['Int'];
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  distance: Scalars['Float'];
  id: Scalars['ID'];
  kcal: Scalars['Int'];
  lbs: Scalars['Float'];
  mins: Scalars['Int'];
  reps: Scalars['Int'];
};
