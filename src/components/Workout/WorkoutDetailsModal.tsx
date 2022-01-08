import { SparklesIcon } from '@heroicons/react/outline';
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
import { Shimmer } from './Shimmer';

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

export function WorkoutDetailsModal({ open, onClose }: Props) {
  const router = useRouter();

  const { data, isLoading } = useQuery<
    WorkoutType & { _id: string; createdAt: Date }
  >(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string),
    { enabled: !!router.query.workoutId }
  );

  const aerobics = data
    ? data.workoutExercises.filter(
        (e) => e.exercise.type === EXERCISE_TYPE.AEROBIC
      )
    : [];

  const strength = data
    ? data.workoutExercises.filter(
        (e) => e.exercise.type === EXERCISE_TYPE.STRENGTH
      )
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
        {isLoading && <Shimmer />}

        {data && (
          <>
            <header className='flex items-center justify-between'>
              <h1 className='text-3xl font-medium'>{data.name}</h1>
              <div className='flex items-center space-x-2'>
                <div className='text-sm font-medium'>
                  {data.workoutExercises.length} ejercicios
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

            {aerobics.length > 0 && (
              <section className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
                  {aerobics.map((workoutExercise) => (
                    <div
                      key={workoutExercise._id}
                      className='px-3 py-2 rounded-lg bg-aerobic-200 text-aerobic-800 hover:bg-aerobic-300'
                    >
                      {workoutExercise.exercise.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {strength.length > 0 && (
              <section className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-strength-200 '>
                  {strength.map((workoutExercise) => (
                    <div
                      key={workoutExercise._id}
                      className='flex items-center justify-between px-3 py-2 rounded-lg bg-strength-200 text-strength-800 hover:bg-strength-300'
                    >
                      <span>{workoutExercise.exercise.name}</span>
                      <Pill
                        variant={workoutExercise.exercise.muscleGroup}
                        text={getMuscleGroupLabel(
                          workoutExercise.exercise.muscleGroup
                        )}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <footer className='flex justify-end text-sm'>
              <p>
                Creado el <span>{formatDate(data.createdAt, 'medium')}</span>
              </p>
            </footer>

            <Button href={`/workouts/${data._id}/get-it-done`}>
              <span>Comenzar</span>
              <SparklesIcon className='ml-2 w-4 h-4' />
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
