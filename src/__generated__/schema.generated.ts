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

export type CreateExerciseCategoryInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type CreateExerciseInput = {
  categoryId: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateWorkoutInput = {
  name: Scalars['String'];
};

export type CreateWorkoutTemplateExerciseInput = {
  exerciseId: Scalars['ID'];
  exerciseIndex: Scalars['Int'];
};

export type CreateWorkoutTemplateInput = {
  exercises: Array<CreateWorkoutTemplateExerciseInput>;
  name: Scalars['String'];
};

export type DoneExerciseInput = {
  exerciseId: Scalars['ID'];
  exerciseIndex: Scalars['Int'];
  id?: InputMaybe<Scalars['ID']>;
  sets: Array<DoneExerciseSetInput>;
};

export type DoneExerciseSetInput = {
  distance: Scalars['Float'];
  id?: InputMaybe<Scalars['ID']>;
  kcal: Scalars['Int'];
  lbs: Scalars['Float'];
  mins: Scalars['Float'];
  reps: Scalars['Int'];
};

export type EditExerciseInput = {
  exerciseId: Scalars['ID'];
  name: Scalars['String'];
};

export type EditWorkoutInput = {
  name?: InputMaybe<Scalars['String']>;
  workoutId: Scalars['ID'];
};

export type Exercise = {
  __typename?: 'Exercise';
  category: ExerciseCategory;
  doneSessions: Array<WorkoutExercise>;
  id: Scalars['ID'];
  lastSession?: Maybe<WorkoutExercise>;
  name: Scalars['String'];
  type: Scalars['String'];
};


export type ExerciseDoneSessionsArgs = {
  limit?: Scalars['Int'];
};

export type ExerciseCategory = {
  __typename?: 'ExerciseCategory';
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type ExerciseOnWorkoutTemplate = {
  __typename?: 'ExerciseOnWorkoutTemplate';
  exercise: Exercise;
  id: Scalars['ID'];
  index: Scalars['Int'];
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
  workoutId: Scalars['ID'];
};


export type MutationDeleteWorkoutTemplateArgs = {
  id: Scalars['ID'];
};


export type MutationDoItAgainArgs = {
  workoutToCopyId: Scalars['ID'];
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


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationStartWorkoutFromTemplateArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryWorkoutArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutTemplateArgs = {
  id: Scalars['ID'];
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  exerciseCategories: Array<ExerciseCategory>;
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  username: Scalars['String'];
  workoutTemplates: Array<WorkoutTemplate>;
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
  createdAt: Scalars['DateTime'];
  exercise: Exercise;
  exerciseIndex: Scalars['Int'];
  id: Scalars['ID'];
  sets: Array<WorkoutSet>;
  setsCount: Scalars['Int'];
  workout: Workout;
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  distance: Scalars['Float'];
  id: Scalars['ID'];
  kcal: Scalars['Int'];
  lbs: Scalars['Float'];
  mins: Scalars['Float'];
  reps: Scalars['Int'];
};

export type WorkoutTemplate = {
  __typename?: 'WorkoutTemplate';
  exercises: Array<ExerciseOnWorkoutTemplate>;
  id: Scalars['ID'];
  name: Scalars['String'];
};
