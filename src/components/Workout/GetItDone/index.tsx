import { CheckIcon } from '@heroicons/react/outline';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Message } from 'src/components/ui/Message';
import { WorkoutType } from 'src/models/Workout';
import { EXERCISE_TYPE } from 'src/resolvers/ExercisesResolver';
import {
  ExerciseDone,
  getWorkout,
  getWorkoutDone,
  GetWorkoutDoneInput,
  WORKOUT_STATUS
} from 'src/resolvers/WorkoutsResolvers';
import { formatDate } from 'src/utils/transforms';
import { object } from 'yup';
import { Container } from '../../ui/Container';
import { Form, useYupForm } from '../../ui/Form';
import { Pill } from '../../ui/Pill';
import { SubmitButton } from '../../ui/SubmitButton';
import { Shimmer } from '../Shimmer';
import { AerobicExercise } from './AerobicExercise';
import { StrengthExercise } from './StrengthExercise';

const getItDoneSchema = object();

interface FormValues {
  aerobics: ExerciseDone[];
  strengths: ExerciseDone[];
}

type FieldArrayItem = Record<'key' | 'id' | 'name', string>;

export function GetItDone() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const getItDoneMutation = useMutation(
    (input: GetWorkoutDoneInput) =>
      getWorkoutDone(router.query.workoutId as string, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('workout');
        queryClient.invalidateQueries('workouts');
      },
      onError: (err: AxiosError) => {
        setError(err?.response?.data);
      }
    }
  );

  const { data, isLoading } = useQuery<WorkoutType & { createdAt: Date }>(
    ['workout', router.query.workoutId as string],
    () => getWorkout(router.query.workoutId as string)
  );

  const form = useYupForm({
    schema: getItDoneSchema,
    defaultValues: { aerobics: [], strengths: [] }
  });

  const aerobics = useFieldArray({
    control: form.control,
    keyName: 'key',
    name: 'aerobics'
  });

  const strengths = useFieldArray({
    control: form.control,
    keyName: 'key',
    name: 'strengths'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (data && data.workoutExercises.length > 0) {
      let aerobics = [];
      let strengths = [];

      for (const workoutExercise of data.workoutExercises) {
        const exerciseData = {
          id: workoutExercise._id,
          name: workoutExercise.exercise.name,
          sets: workoutExercise.sets
        };

        if (workoutExercise.exercise.type === EXERCISE_TYPE.AEROBIC) {
          aerobics.push(exerciseData);
        } else {
          strengths.push(exerciseData);
        }
      }

      form.reset({ aerobics, strengths });
    }
  }, [data, form]);

  async function onSubmit(values: FormValues) {
    // After fetching the exercises at the start, we add them to the form cache, but there's a possibility
    // that the user doesn't complete all the exercies. We don't need to send the *empty* exercises to
    // process, because there's nothing that can be processed.
    //
    // This will remove those *empty* exercises, if they exist.
    const exercisesWithSets = [...values.aerobics, ...values.strengths].filter(
      (exercise) => exercise.sets.length > 0
    );

    const workoutExercises: ExerciseDone[] = [];
    for (const exercise of exercisesWithSets) {
      // Because we don't allow the remove of sets on use, there can be empty sets. We remove those.
      const nonEmptySets = exercise.sets.filter((set: Record<string, number>) =>
        set.mins ? set.mins > 0 : set.reps > 0
      );

      if (nonEmptySets.length > 0) {
        workoutExercises.push({ id: exercise.id, sets: nonEmptySets });
      }
    }

    if (workoutExercises.length > 0) {
      await getItDoneMutation.mutateAsync({ workoutExercises });
    }
  }

  return (
    <Container>
      <Form form={form} onSubmit={onSubmit}>
        <Message
          type='error'
          title='Ocurrió un error al tratar de completar el entrenamiento.'
          text={error}
        />

        {data && data.status === WORKOUT_STATUS.DONE && (
          <Message type='info' title='¡Sigue así!'>
            <p>
              Finalizaste este entrenamiento el{' '}
              <span className='font-bold'>{formatDate(data.doneAt)}</span>.
            </p>
          </Message>
        )}

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

            {aerobics.fields.length > 0 && (
              <section className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
                  {aerobics.fields.map((field: FieldArrayItem, index) => (
                    <AerobicExercise
                      key={field.key}
                      exerciseId={index}
                      name={field.name}
                      editable={data.status === WORKOUT_STATUS.DRAFTED}
                    />
                  ))}
                </div>
              </section>
            )}

            {strengths.fields.length > 0 && (
              <section className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-strength-200 '>
                  {strengths.fields.map((field: FieldArrayItem, index) => (
                    <StrengthExercise
                      key={field.key}
                      exerciseId={index}
                      name={field.name}
                      editable={data.status === WORKOUT_STATUS.DRAFTED}
                    />
                  ))}
                </div>
              </section>
            )}

            <footer className='flex justify-end text-sm'>
              <p>
                Creado el <span>{formatDate(data.createdAt)}</span>
              </p>
            </footer>

            {data.status === WORKOUT_STATUS.DRAFTED && (
              <SubmitButton>
                <span>Finalizar</span>
                <CheckIcon className='ml-2 w-4 h-4' />
              </SubmitButton>
            )}
          </>
        )}
      </Form>
    </Container>
  );
}
