import { Button } from '../ui/Button';
import { ExerciseType, MuscleGroup, WorkoutStatus } from '@prisma/client';
import {
  formatDate,
  getMuscleGroupColor,
  getMuscleGroupLabel
} from 'src/utils/transforms';
import { Pill } from '../ui/Pill';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { graphql, useFragment } from 'react-relay';
import { WorkoutCard_workout$key } from './__generated__/WorkoutCard_workout.graphql';
import { useRouter } from 'next/router';

interface Props {
  workout: WorkoutCard_workout$key;
}

export function WorkoutCard({ workout }: Props) {
  const router = useRouter();

  const data = useFragment(
    graphql`
      fragment WorkoutCard_workout on Workout {
        id
        name
        status
        createdAt
        workoutExercises {
          exercise {
            type
            muscleGroup
          }
        }
      }
    `,
    workout
  );

  const [types, setTypes] = useState<string[]>();
  const [mostUse, setMostUse] = useState('');

  useEffect(() => {
    const strengthExercises = data.workoutExercises.filter(
      (workoutExercise) =>
        workoutExercise.exercise.type === ExerciseType.STRENGTH
    );

    let count: Record<string, number> = {};
    for (const workoutExercises of strengthExercises) {
      count[workoutExercises.exercise.muscleGroup!] = count[
        workoutExercises.exercise.muscleGroup!
      ]
        ? count[workoutExercises.exercise.muscleGroup!] + 1
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
  }, [data.workoutExercises]);

  return (
    <Button
      onClick={() => {
        router.push(`/workouts/${data.id}`);
      }}
      className={clsx(
        'w-full sm:max-w-xs p-6 rounded-lg shadow-lg transition-all ease-in-out text-white hover:opacity-80',
        getMuscleGroupColor(mostUse)
      )}
    >
      <div className='flex flex-col space-y-4'>
        <header className='flex items-center justify-between'>
          <h3 className='text-3xl truncate'>{data.name}</h3>{' '}
          <Pill
            variant={data.status as WorkoutStatus}
            text={
              data.status === WorkoutStatus.DRAFTED ? 'Borrador' : 'Completado'
            }
          />
        </header>

        <main className='flex flex-col items-center space-y-4'>
          <div className='text-xl'>
            {data.workoutExercises.length} ejercicios
          </div>

          <div className='flex items-center justify-center space-x-2'>
            {types?.map((type) => (
              <Pill
                key={type}
                variant={type as MuscleGroup}
                text={getMuscleGroupLabel(type as MuscleGroup)}
              />
            ))}
          </div>
        </main>

        <footer className='flex justify-end text-sm'>
          <p>
            Creado el <span>{formatDate(data.createdAt)}</span>
          </p>
        </footer>
      </div>
    </Button>
  );
}
