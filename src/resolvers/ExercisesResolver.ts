import axios from 'src/utils/axios';

export enum EXERCISE_TYPE {
  AEROBIC = 'aerobic',
  STRENGTH = 'strength'
}

export enum MUSCLE_GROUP {
  ARMS = 'arms',
  CHEST = 'chest',
  BACK = 'back',
  LEGS = 'legs',
  SHOULDERS = 'shoulders'
}

export async function getExercises() {
  const response = await axios.get('/exercises');
  return response.data;
}

export type CreateExerciseInput = {
  name: string;
  type: EXERCISE_TYPE;
  muscleGroup?: MUSCLE_GROUP;
};

export async function createExercise(input: CreateExerciseInput) {
  return await axios.post('/exercises', input);
}
