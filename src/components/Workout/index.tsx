import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { WorkoutType } from 'src/models/Workout';
import { getWorkout, WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { Container } from '../ui/Container';
import { Pill } from '../ui/Pill';
import {
  EXERCISE_TYPE,
  getMuscleGroupLabel
} from 'src/resolvers/ExercisesResolver';
import { Button } from '../ui/Button';

export function Workout() {
  const router = useRouter();

  const { data, isLoading } = useQuery<WorkoutType & { createdAt: Date }>(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string)
  );

  const aerobics = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.AEROBIC)
    : [];

  const strength = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.STRENGTH)
    : [];

  return (
    <Container>
      <div className='flex flex-col space-y-4'>
        {data && (
          <>
            <header className='flex items-center justify-between'>
              <h1 className='text-3xl'>{data.name}</h1>
              <div className='flex items-center space-x-2'>
                <div className='text-sm font-medium'>
                  {data.exercises.length} ejercicios
                </div>
                <span>&middot;</span>
                <Pill
                  variant={data.status}
                  text={
                    data.status === WORKOUT_STATUS.DRAFTED
                      ? 'Borrador'
                      : 'Completado'
                  }
                />
              </div>
            </header>

            <section className='flex flex-col space-y-2'>
              <h2 className='text-lg'>Aerobicos</h2>

              <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
                {aerobics.map((exercise) => (
                  <div className='px-3 py-2 rounded-lg bg-aerobic-200 text-aerobic-800 hover:bg-aerobic-300'>
                    {exercise.name}
                  </div>
                ))}
              </div>
            </section>

            <section className='flex flex-col space-y-2'>
              <h2 className='text-lg'>Fuerza</h2>

              <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-rose-200 '>
                {strength.map((exercise) => (
                  <div className='flex items-center justify-between px-3 py-2 rounded-lg bg-rose-200 text-rose-800 hover:bg-rose-300'>
                    <span>{exercise.name}</span>
                    <Pill
                      variant={exercise.muscleGroup}
                      text={getMuscleGroupLabel(exercise.muscleGroup)}
                    />
                  </div>
                ))}
              </div>
            </section>

            <footer className='flex justify-end text-sm'>
              <p>
                Creado el <span>{formatDate(data.createdAt, 'medium')}</span>
              </p>
            </footer>

            <Button>¡Realizar!</Button>
          </>
        )}
      </div>
    </Container>
  );
}
