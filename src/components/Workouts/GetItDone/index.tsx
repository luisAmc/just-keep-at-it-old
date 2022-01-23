import { CheckIcon } from '@heroicons/react/outline';
import { ExerciseType, WorkoutStatus } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldValues, useFieldArray } from 'react-hook-form';
import { ConnectionHandler, graphql, useFragment } from 'react-relay';
import { useMutation } from 'relay-hooks';
import { Container } from 'src/components/ui/Container';
import { Form, useYupForm } from 'src/components/ui/Form';
import { Message } from 'src/components/ui/Message';
import { Pill } from 'src/components/ui/Pill';
import { SubmitButton } from 'src/components/ui/SubmitButton';
import { formatDate } from 'src/utils/transforms';
import { object } from 'yup';
import { AerobicExercise } from './AerobicExercise';
import { StrengthExercise } from './StrengthExercise';
import { GetItDoneMutation } from './__generated__/GetItDoneMutation.graphql';
import { GetItDone_workout$key } from './__generated__/GetItDone_workout.graphql';

export const query = graphql`
  query GetItDoneQuery($id: ID!) {
    workout(id: $id) {
      ...GetItDone_workout
    }
  }
`;

const getItDoneSchema = object();

interface Props {
  workout: GetItDone_workout$key;
}

export function GetItDone({ workout }: Props) {
  const router = useRouter();

  const data = useFragment(
    graphql`
      fragment GetItDone_workout on Workout {
        id
        name
        status
        createdAt
        completedAt
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

  const [getWorkoutDone, getWorkoutDoneResult] = useMutation<GetItDoneMutation>(
    graphql`
      mutation GetItDoneMutation(
        $workoutId: ID!
        $data: GetItDoneInput!
        $connections: [ID!]!
      ) {
        getWorkoutDone(workoutId: $workoutId, data: $data) {
          workout
            @prependNode(
              connections: $connections
              edgeTypeName: "HomeWorkoutConnectionEdge"
            ) {
            id
            ...GetItDone_workout
          }
        }
      }
    `,
    {
      onCompleted() {
        router.push(`/workouts/${data.id}`);
      }
    }
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

  useEffect(() => {
    if (data && data.workoutExercises.length > 0) {
      let aerobics = [];
      let strengths = [];

      for (const workoutExercise of data.workoutExercises) {
        const exerciseData = {
          id: workoutExercise.id,
          name: workoutExercise.exercise.name,
          sets: workoutExercise.sets
        };

        if (workoutExercise.exercise.type === ExerciseType.AEROBIC) {
          aerobics.push(exerciseData);
        } else {
          strengths.push(exerciseData);
        }
      }

      form.reset({ aerobics, strengths });
    }
  }, [data, form]);

  async function onSubmit(values: FieldValues) {
    const connectionId = ConnectionHandler.getConnectionID(
      `${workout}`,
      'Home_workout' // Initial fragment
    );

    // After fetching the exercises at the start, we add them to the form cache, but there's a possibility
    // that the user doesn't complete all the exercies. We don't need to send the *empty* exercises to
    // process, because there's nothing that can be processed.
    //
    // This will remove those *empty* exercises, if they exist.
    const exercisesWithSets = [...values.aerobics, ...values.strengths].filter(
      (exercise) => exercise.sets.length > 0
    );

    const workoutExercises = [];
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
      getWorkoutDone({
        variables: {
          workoutId: data.id,
          data: {
            workoutExercises: workoutExercises.map((doneExercise) => ({
              id: doneExercise.id,
              sets: doneExercise.sets
            }))
          },
          connections: [connectionId]
        }
      });
    }
  }

  return (
    <Container href='/' title='¡Vamos a hacerlo!' size='xl'>
      <Form form={form} onSubmit={onSubmit}>
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

        {data.status === WorkoutStatus.DRAFTED ? (
          <Message
            type='info'
            title='¡Vamos a hacerlo!'
            text='Presiona un ejercicio para empezar cons los sets.'
          />
        ) : (
          <Message type='info' title='¡Sigue así!'>
            <p>
              Finalizaste este entrenamiento el{' '}
              <span className='font-bold'>{formatDate(data.completedAt)}</span>.
            </p>
          </Message>
        )}

        {aerobics.fields.length > 0 && (
          <section className='flex flex-col space-y-2'>
            <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-aerobic-200 '>
              {aerobics.fields.map((field: Record<string, string>, index) => (
                <AerobicExercise
                  key={field.key}
                  exerciseId={index}
                  name={field.name}
                  editable={data.status === WorkoutStatus.DRAFTED}
                />
              ))}
            </div>
          </section>
        )}

        {strengths.fields.length > 0 && (
          <section className='flex flex-col space-y-2'>
            <div className='flex flex-col space-y-2 px-2 py-2 rounded-lg bg-strength-200 '>
              {strengths.fields.map((field: Record<string, string>, index) => (
                <StrengthExercise
                  key={field.key}
                  exerciseId={index}
                  name={field.name}
                  editable={data.status === WorkoutStatus.DRAFTED}
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

        {data.status === WorkoutStatus.DRAFTED && (
          <SubmitButton>
            <span>Finalizar</span>
            <CheckIcon className='ml-2 w-4 h-4' />
          </SubmitButton>
        )}
      </Form>
    </Container>
  );
}
