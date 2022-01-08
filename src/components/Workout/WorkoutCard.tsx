import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WorkoutType } from 'src/models/Workout';
import {
  EXERCISE_TYPE,
  getMuscleGroupLabel,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';

function getMuscleGroupColor(muscleGroup: MUSCLE_GROUP | string) {
  switch (muscleGroup) {
    case MUSCLE_GROUP.ARMS:
      return 'bg-arms-500/90';
    case MUSCLE_GROUP.CHEST:
      return `bg-chest-500/90`;
    case MUSCLE_GROUP.BACK:
      return 'bg-back-500/90';
    case MUSCLE_GROUP.LEGS:
      return 'bg-legs-500/90';
    case MUSCLE_GROUP.SHOULDERS:
      return 'bg-shoulders-500/90';
    default:
      return 'bg-white';
  }
}

interface Workout extends WorkoutType {
  _id: string;
  createdAt: Date;
}

export function WorkoutCard({ workout }: { workout: Workout }) {
  const router = useRouter();

  const [types, setTypes] = useState([]);
  const [mostUse, setMostUse] = useState('');

  useEffect(() => {
    const strengthExercises = workout.workoutExercises.filter(
      (workoutExercise) =>
        workoutExercise.exercise.type === EXERCISE_TYPE.STRENGTH
    );

    let count = {};
    for (const workoutExercises of strengthExercises) {
      count[workoutExercises.exercise.muscleGroup] = count[
        workoutExercises.exercise.muscleGroup
      ]
        ? count[workoutExercises.exercise.muscleGroup] + 1
        : 1;
    }

    let mostUse = { type: '', count: 0 };
    for (const type of Object.keys(count)) {
      if (count[type] > mostUse.count) {
        mostUse = { type, count: count[type] };
      }
    }

    setMostUse(mostUse.type);
    setTypes(Object.keys(count));
  }, [workout.workoutExercises]);

  function handleClick() {
    router.push(
      { pathname: '/home', query: { workoutId: workout._id } },
      undefined,
      {
        shallow: true
      }
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={clsx(
        'w-full sm:max-w-xs p-6 rounded-lg shadow-lg transition-all ease-in-out text-white hover:opacity-80',
        getMuscleGroupColor(mostUse)
      )}
    >
      <div className='flex flex-col space-y-4'>
        <header className='flex items-center justify-between'>
          <h3 className='text-3xl'>{workout.name}</h3>{' '}
          <Pill
            variant={workout.status}
            text={
              workout.status === WORKOUT_STATUS.DRAFTED
                ? 'Borrador'
                : 'Completado'
            }
          />
        </header>

        <main className='flex flex-col items-center space-y-4'>
          <div className='text-xl'>{workout.workoutExercises.length} ejercicios</div>

          <div className='flex items-center justify-center space-x-2'>
            {types.map((type) => (
              <Pill
                key={type}
                variant={type as MUSCLE_GROUP}
                text={getMuscleGroupLabel(type)}
              />
            ))}
          </div>
        </main>

        <footer className='flex justify-end text-sm'>
          <p>
            Creado el <span>{formatDate(workout.createdAt)}</span>
          </p>
        </footer>
      </div>
    </Button>
  );
}
