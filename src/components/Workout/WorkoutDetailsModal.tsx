import { ClipboardCopyIcon, SparklesIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WorkoutType } from 'src/models/Workout';
import {
  EXERCISE_TYPE,
  getMuscleGroupLabel
} from 'src/resolvers/ExercisesResolver';
import {
  duplicateWorkout,
  getWorkout,
  WORKOUT_STATUS
} from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { Button } from '../ui/Button';
import { Message } from '../ui/Message';
import { Modal, Props as ModalProps } from '../ui/Modal';
import { Pill } from '../ui/Pill';
import { Shimmer } from './Shimmer';

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

export function WorkoutDetailsModal({ open, onClose }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<
    WorkoutType & { _id: string; createdAt: Date }
  >(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string),
    { enabled: !!router.query.workoutId }
  );

  const duplicateWorkoutMutation = useMutation(
    () => duplicateWorkout(router.query.workoutId as string),

    {
      onSuccess: () => {
        queryClient.invalidateQueries('workouts');
        handleClose();
      }
    }
  );

  const isDone = data && data.status === WORKOUT_STATUS.DONE;

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

  async function handleCopyClick() {
    await duplicateWorkoutMutation.mutateAsync();
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

            {isDone && (
              <Message type='info' title='¡Sigue así!'>
                <p>
                  Finalizaste este entrenamiento el{' '}
                  <span className='font-bold'>{formatDate(data.doneAt)}</span>.
                </p>
              </Message>
            )}
            {aerobics.length > 0 && (
              <section className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
                  {aerobics.map((workoutExercise) => (
                    <div
                      key={workoutExercise._id}
                      className={clsx(
                        'px-3 py-2 rounded-lg text-aerobic-800',
                        isDone
                          ? 'bg-aerobic-300'
                          : 'bg-aerobic-200 hover:bg-aerobic-300'
                      )}
                    >
                      <div className='flex items-center justify-between'>
                        <span>{workoutExercise.exercise.name}</span>
                        {isDone && (
                          <span className='font-bold text-sm'>
                            {workoutExercise.sets.length} sets
                          </span>
                        )}
                      </div>

                      {isDone && (
                        <div className='flex flex-col space-y-4 divide-y divide-aerobic-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-aerobic-300'>
                          {workoutExercise.sets.map(
                            (set: Record<string, string>) => (
                              <div
                                key={set._id}
                                className='flex items-center justify-center'
                              >
                                <span>
                                  <span className='text-3xl font-medium'>
                                    {set.mins}
                                  </span>
                                  <span className='ml-1'>mins</span>
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
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
                      className={clsx(
                        'px-3 py-2 rounded-lg text-strength-800',
                        isDone
                          ? 'bg-strength-300'
                          : 'bg-strength-200 hover:bg-strength-300'
                      )}
                    >
                      <div className='flex items-center justify-between'>
                        <span>{workoutExercise.exercise.name}</span>

                        <div>
                          <Pill
                            variant={workoutExercise.exercise.muscleGroup}
                            text={getMuscleGroupLabel(
                              workoutExercise.exercise.muscleGroup
                            )}
                          />

                          {isDone && (
                            <span className='ml-2 font-bold text-sm'>
                              {workoutExercise.sets.length} sets
                            </span>
                          )}
                        </div>
                      </div>

                      {isDone && (
                        <div className='flex flex-col space-y-4 divide-y divide-strength-400 px-3 py-2 t-0 rounded-lg rounded-t-none bg-strength-300'>
                          {workoutExercise.sets.map(
                            (set: Record<string, string>) => (
                              <div
                                key={set._id}
                                className='pt-2 flex items-center justify-center space-x-4'
                              >
                                <span className='px-2'>
                                  <span className='text-3xl font-medium'>
                                    {set.lbs}
                                  </span>
                                  <span className='ml-1'>lbs</span>
                                </span>

                                <span className='px-2'>
                                  <span className='text-3xl font-medium'>
                                    {set.reps}
                                  </span>
                                  <span className='ml-1'>rep</span>
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <footer className='flex justify-end text-sm'>
              <p>
                Creado el <span>{formatDate(data.createdAt)}</span>
              </p>
            </footer>

            {data.status === WORKOUT_STATUS.DRAFTED ? (
              <Button href={`/workouts/${data._id}/get-it-done`}>
                <span>Comenzar</span>
                <SparklesIcon className='ml-2 w-4 h-4' />
              </Button>
            ) : (
              <Button color='secondary' onClick={handleCopyClick}>
                <ClipboardCopyIcon className='mr-2 w-4 h-4' />
                <span>Volver a hacer</span>
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
