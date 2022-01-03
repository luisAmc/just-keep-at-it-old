import { PlusCircleIcon } from '@heroicons/react/outline';
import { useQuery } from 'react-query';
import { ExerciseType } from 'src/models/Exercise';
import { WorkoutType } from 'src/models/Workout';
import {
  EXERCISE_TYPE,
  getExercises,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { getWorkouts } from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { useModal } from '../ui/Modal';
import { Pill } from '../ui/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../ui/Table';
import { CreateExerciseModal } from './CreateExerciseModal';
import { CreateWorkoutModal } from './CreateWorkoutModal';

type Props = {
  data?: {
    me?: {
      username: 'string';
    };
  };
};

export function Home({ data }: Props) {
  const createWorkout = useModal();
  const createExercise = useModal();

  const exercisesQuery = useQuery<{
    exercises: (ExerciseType & { id: string })[];
  }>('exercises', () => getExercises(), { refetchOnWindowFocus: false });

  const workoutsQuery = useQuery<{
    workouts: (WorkoutType & { id: string; createdAt: Date })[];
  }>('workouts', () => getWorkouts(), { refetchOnWindowFocus: false });

  return (
    <div className='h-screen max-w-2xl w-full mx-auto flex items-center justify-center'>
      <div className='flex flex-col space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <button
            onClick={createExercise.open}
            className='rounded-lg p-4 w-56 h-60 bg-zinc-200 hover:bg-opacity-75 transition-all ease-in-out'
          >
            <div className='flex flex-col space-y-4 items-center justify-center'>
              <PlusCircleIcon className='w-16 h-16 text-stone-700' />
              <p className='text-center text-stone-700 font-semibold'>
                Añadir un nuevo ejercicio
              </p>
            </div>
          </button>

          <button
            onClick={createWorkout.open}
            className='rounded-lg p-4 w-56 h-60 bg-zinc-200 hover:bg-opacity-75 transition-all ease-in-out'
          >
            <div className='flex flex-col space-y-4 items-center justify-center'>
              <PlusCircleIcon className='w-16 h-16 text-stone-700' />
              <p className='text-center text-stone-700 font-semibold'>
                Añadir un nuevo entrenamiento
              </p>
            </div>
          </button>
        </div>

        {workoutsQuery.data && (
          <Table
            values={workoutsQuery.data.workouts}
            header={
              <>
                <TableHeader label='#' />
                <TableHeader label='Nombre' />
                <TableHeader label='Creado el' className='text-right' />
              </>
            }
          >
            {(workout, i) => (
              <TableRow key={workout.id}>
                <TableDataCell>{i + 1}</TableDataCell>
                <TableDataCell>{workout.name}</TableDataCell>
                <TableDataCell className='text-right'>
                  {formatDate(workout.createdAt)}
                </TableDataCell>
              </TableRow>
            )}
          </Table>
        )}

        {exercisesQuery.data && (
          <Table
            values={exercisesQuery.data.exercises ?? []}
            header={
              <>
                <TableHeader label='#' />
                <TableHeader label='Nombre' />
                <TableHeader label='Tipo' className='text-center' />
                <TableHeader label='Grupo múscular' className='text-center' />
              </>
            }
          >
            {(exercise, i) => (
              <TableRow key={exercise.id}>
                <TableDataCell>{i + 1}</TableDataCell>
                <TableDataCell>{exercise.name}</TableDataCell>
                <TableDataCell className='text-center'>
                  <Pill
                    variant={exercise.type}
                    text={
                      exercise.type === EXERCISE_TYPE.AEROBIC
                        ? 'Aerobico'
                        : 'Fuerza'
                    }
                  />
                </TableDataCell>
                <TableDataCell className='text-center'>
                  <Pill
                    variant={exercise.muscleGroup}
                    text={
                      {
                        [MUSCLE_GROUP.ARMS]: 'Brazos',
                        [MUSCLE_GROUP.CHEST]: 'Pecho',
                        [MUSCLE_GROUP.BACK]: 'Espalda',
                        [MUSCLE_GROUP.LEGS]: 'Piernas',
                        [MUSCLE_GROUP.SHOULDERS]: 'Hombros'
                      }[exercise.muscleGroup]
                    }
                  />
                </TableDataCell>
              </TableRow>
            )}
          </Table>
        )}
      </div>

      <CreateExerciseModal {...createExercise.props} />
      <CreateWorkoutModal {...createWorkout.props} />
    </div>
  );
}
