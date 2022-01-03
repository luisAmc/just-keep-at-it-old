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

export function getMuscleGroupLabel(muscleGroup: MUSCLE_GROUP) {
  switch (muscleGroup) {
    case MUSCLE_GROUP.ARMS:
      return 'Brazos';
    case MUSCLE_GROUP.CHEST:
      return 'Pecho';
    case MUSCLE_GROUP.BACK:
      return 'Espalda';
    case MUSCLE_GROUP.LEGS:
      return 'Piernas';
    case MUSCLE_GROUP.SHOULDERS:
      return 'Hombros';
    default:
      return '';
  }
}
