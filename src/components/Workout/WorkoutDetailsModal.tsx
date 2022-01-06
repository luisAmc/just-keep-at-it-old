import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { WorkoutType } from 'src/models/Workout';
import {
  EXERCISE_TYPE,
  getMuscleGroupLabel
} from 'src/resolvers/ExercisesResolver';
import { getWorkout, WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { Button } from '../ui/Button';
import { Modal, Props as ModalProps } from '../ui/Modal';
import { Pill } from '../ui/Pill';

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

export function WorkoutDetailsModal({ open, onClose }: Props) {
  const router = useRouter();

  const { data, isLoading } = useQuery<
    WorkoutType & { id: string; createdAt: Date }
  >(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string),
    { enabled: !!router.query.workoutId }
  );

  const aerobics = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.AEROBIC)
    : [];

  const strength = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.STRENGTH)
    : [];

  function handleClose() {
    onClose();
    router.push({ pathname: '/home', query: {} }, '/home', {
      shallow: true
    });
  }

  return (
    <Modal title='Detalles' open={open} onClose={handleClose}>
      <div className='flex flex-col space-y-4'>
        {data && (
          <>
            <header className='flex items-center justify-between'>
              <h1 className='text-3xl font-medium'>{data.name}</h1>
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
              <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
                {aerobics.map((exercise) => (
                  <div
                    key={exercise._id}
                    className='px-3 py-2 rounded-lg bg-aerobic-200 text-aerobic-800 hover:bg-aerobic-300'
                  >
                    {exercise.name}
                  </div>
                ))}
              </div>
            </section>

            <section className='flex flex-col space-y-2'>
              <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-strength-200 '>
                {strength.map((exercise) => (
                  <div
                    key={exercise._id}
                    className='flex items-center justify-between px-3 py-2 rounded-lg bg-strength-200 text-strength-800 hover:bg-strength-300'
                  >
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

            <Button href={`/workouts/${data.id}/get-it-done`}>¡Realizar!</Button>
          </>
        )}
      </div>
    </Modal>
  );
}
