import { useRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';
import { useQuery } from 'react-query';
import { WorkoutType } from 'src/models/Workout';
import { EXERCISE_TYPE } from 'src/resolvers/ExercisesResolver';
import { getWorkout, WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { Container } from '../../ui/Container';
import { Form, useYupForm } from '../../ui/Form';
import { Pill } from '../../ui/Pill';
import { SubmitButton } from '../../ui/SubmitButton';
import { AerobicExercise } from './AerobicExercise';
import { StrengthExercise } from './StrengthExercise';

export function GetItDone() {
  const router = useRouter();

  const { data, isLoading } = useQuery<WorkoutType & { createdAt: Date }>(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string)
  );

  // const getItDoneMutation = useMutation(() => {});

  const form = useYupForm({ schema: null });

  const aerobics = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.AEROBIC)
    : [];

  const strength = data
    ? data.exercises.filter((e) => e.type === EXERCISE_TYPE.STRENGTH)
    : [];

  async function onSubmit(values: FieldValues) {
    console.dir(values);
  }

  return (
    <Container>
      <Form form={form} onSubmit={onSubmit}>
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
                {aerobics.map((exercise, index) => (
                  <AerobicExercise
                    key={`aerobics.${index}`}
                    exercise={exercise}
                  />
                ))}
              </div>
            </section>

            <section className='flex flex-col space-y-2'>
              <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-strength-200 '>
                {strength.map((exercise, index) => (
                  <StrengthExercise
                    key={`strength.${index}`}
                    exercise={exercise}
                  />
                ))}
              </div>
            </section>

            <footer className='flex justify-end text-sm'>
              <p>
                Creado el <span>{formatDate(data.createdAt, 'medium')}</span>
              </p>
            </footer>

            <SubmitButton>Completar</SubmitButton>
          </>
        )}
      </Form>
    </Container>
  );
}
