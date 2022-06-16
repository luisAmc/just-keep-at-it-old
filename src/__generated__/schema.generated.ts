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

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExercise: Exercise;
  createWorkout: Workout;
  login: User;
  signUp: User;
};


export type MutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
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
  workouts: Array<Workout>;
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
};


export type UserWorkoutsArgs = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Workout = {
  __typename?: 'Workout';
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  heavyUseOf: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Scalars['String'];
  workoutExercisesCount: Scalars['Int'];
};
