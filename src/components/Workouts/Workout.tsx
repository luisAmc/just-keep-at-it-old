import { Button } from '../ui/Button';
import { ClipboardCopyIcon, SparklesIcon } from '@heroicons/react/outline';
import { Container } from '../ui/Container';
import { ExerciseType, MuscleGroup, WorkoutStatus } from '@prisma/client';
import { formatDate, getMuscleGroupLabel } from 'src/utils/transforms';
import { graphql, useFragment } from 'react-relay';
import { Message } from '../ui/Message';
import { Pill } from '../ui/Pill';
import { Workout_workout$key } from './__generated__/Workout_workout.graphql';
import clsx from 'clsx';

export const query = graphql`
  query WorkoutIdQuery($id: ID!) {
    workout(id: $id) {
      ...Workout_workout
    }
  }
`;

interface Props {
  workout: Workout_workout$key;
}

export function Workout({ workout }: Props) {
  const data = useFragment(
    graphql`
      fragment Workout_workout on Workout {
        id
        name
        status
        createdAt
        doneAt
        workoutExercises {
          id
          sets {
            id
            mins
            lbs
            reps
          }
          exercise {
            id
            name
            type
            muscleGroup
          }
        }
      }
    `,
    workout
  );

  const isDone = data.status === WorkoutStatus.DONE;

  const aerobics = workout
    ? data.workoutExercises.filter(
        (e) => e.exercise.type === ExerciseType.AEROBIC
      )
    : [];

  const strength = workout
    ? data.workoutExercises.filter(
        (e) => e.exercise.type === ExerciseType.STRENGTH
      )
    : [];

  return (
    <Container href='/' title='Rutina' size='xl'>
      <div className='flex flex-col space-y-4'>
        <header className='flex items-center justify-between'>
          <h1 className='text-3xl font-medium'>{data.name}</h1>
          <div className='flex items-center space-x-2'>
            <div className='text-sm font-medium'>
              {data.workoutExercises.length} ejercicios
            </div>
            <span>&middot;</span>
            <Pill
              variant={data.status as WorkoutStatus}
              text={
                data.status === WorkoutStatus.DRAFTED
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
                  key={workoutExercise.id}
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
                      {workoutExercise.sets.map((set) => (
                        <div
                          key={set.id}
                          className='flex items-center justify-center'
                        >
                          <span>
                            <span className='text-3xl font-medium'>
                              {set.mins}
                            </span>
                            <span className='ml-1'>mins</span>
                          </span>
                        </div>
                      ))}
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
                  key={workoutExercise.id}
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
                        variant={
                          workoutExercise.exercise.muscleGroup as MuscleGroup
                        }
                        text={getMuscleGroupLabel(
                          workoutExercise.exercise.muscleGroup as MuscleGroup
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
                      {workoutExercise.sets.map((set) => (
                        <div
                          key={set.id}
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
                      ))}
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

        {data.status === WorkoutStatus.DRAFTED ? (
          <Button href={`/workouts/${data.id}/get-it-done`}>
            <span>Comenzar</span>
            <SparklesIcon className='ml-2 w-4 h-4' />
          </Button>
        ) : (
          // <Button color='secondary' onClick={handleCopyClick}>
          <Button color='secondary' onClick={() => {}}>
            <ClipboardCopyIcon className='mr-2 w-4 h-4' />
            <span>Volver a hacer</span>
          </Button>
        )}
      </div>
    </Container>
  );
}

export function WorkoutShimmer() {
  return (
    <div className='mt-8 animate-pulse p-4 border rounded-lg max-w-xl mx-auto'>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center mb-2'>
          <div className='bg-neutral-200 w-6 h-6 mr-2 rounded-full'></div>
          <div className='bg-neutral-300 w-32 h-6 rounded-xl'></div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='bg-neutral-300 w-32 h-6 rounded-xl'></div>
          <div className='flex items-center justify-center space-x-2'>
            <div className='bg-neutral-300 w-20 h-4 rounded-xl'></div>
            <span className='text-neutral-400'>&middot;</span>
            <div className='bg-neutral-300 w-14 h-4 rounded-xl'></div>
          </div>
        </div>

        <div className='flex flex-col space-y-4 border rounded-lg p-4'>
          <div className='flex items-center justify-between gap-8'>
            <div className='bg-neutral-300 w-5/6 h-4 rounded-lg'></div>
            <div className='bg-neutral-300 w-1/6 h-4 rounded-lg'></div>
          </div>
        </div>

        <div className='flex flex-col space-y-4 border rounded-lg p-4'>
          <div className='flex items-center justify-between gap-8'>
            <div className='bg-neutral-300 w-5/6 h-4 rounded-lg'></div>
            <div className='bg-neutral-300 w-1/6 h-4 rounded-lg'></div>
          </div>
          <div className='flex items-center justify-between gap-8'>
            <div className='bg-neutral-300 w-5/6 h-4 rounded-lg'></div>
            <div className='bg-neutral-300 w-1/6 h-4 rounded-lg'></div>
          </div>
          <div className='flex items-center justify-between gap-8'>
            <div className='bg-neutral-300 w-5/6 h-4 rounded-lg'></div>
            <div className='bg-neutral-300 w-1/6 h-4 rounded-lg'></div>
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='mx- bg-neutral-300 w-36 h-4 rounded-lg'></div>
        </div>

        <div className='bg-neutral-300 w-full h-5 rounded-lg'></div>
      </div>
    </div>
  );
}
