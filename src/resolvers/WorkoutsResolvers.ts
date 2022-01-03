import axios from 'src/utils/axios';

export enum WORKOUT_STATUS {
  DRAFTED = 'drafted',
  DONE = 'done'
}

export async function getWorkouts() {
  const response = await axios.get('/workouts');
  return response.data;
}

export type CreateWorkoutInput = {
  name: string;
  exercises: string[];
};

export async function createWorkout(input: CreateWorkoutInput) {
  return await axios.post('/workouts', input);
}
