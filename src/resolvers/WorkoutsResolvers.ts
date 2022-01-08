import axios from 'src/utils/axios';

export enum WORKOUT_STATUS {
  DRAFTED = 'drafted',
  DONE = 'done'
}

export async function getWorkout(workoutId: string) {
  const response = await axios.get(`/workouts/${workoutId}`);
  return response.data;
}

export async function getWorkouts() {
  const response = await axios.get('/workouts');
  return response.data;
}

export interface CreateWorkoutInput {
  name: string;
  workoutExercises: string[];
}

export async function createWorkout(input: CreateWorkoutInput) {
  return await axios.post('/workouts', input);
}

export interface ExerciseDone {
  id: string;
  sets: {
    mins?: number;
    lbs?: number;
    reps?: number;
  }[];
}

export interface GetWorkoutDoneInput {
  workoutExercises: ExerciseDone[];
}

export async function getWorkoutDone(
  workoutId: string,
  input: GetWorkoutDoneInput
) {
  return await axios.put(`/workouts/${workoutId}/get-it-done`, input);
}
