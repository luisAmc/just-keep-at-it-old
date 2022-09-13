import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { object, array, record, z, string, literal } from 'zod';
import { Page } from 'src/components/shared/Page';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useRouter } from 'next/router';
import {
  GetItDoneQuery,
  GetWorkoutDoneMutation,
  GetWorkoutDoneMutationVariables
} from './__generated__/index.generated';
import { Button } from 'src/components/shared/Button';
import { ExerciseSetInput } from './ExerciseSetInput';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useModal } from 'src/components/shared/Modal';
import { AddExerciseModal } from './AddExerciseModal';

const numberShape = string().or(literal('')).optional().transform(Number);

const SetSchema = object({
  mins: numberShape,
  distance: numberShape,
  kcal: numberShape,
  reps: numberShape,
  lbs: numberShape
});

const GetItDoneSchema = object({
  workoutExercises: record(
    object({
      sets: array(SetSchema)
    })
  )
});

export const query = gql`
  query GetItDoneQuery($id: ID!) {
    workout(id: $id) {
      name
      status
      completedAt
      createdAt
      workoutExercisesCount
      workoutExercises {
        id
        exercise {
          id
          name
          type
        }
        setsCount
        sets {
          id
          mins
          distance
          kcal
          lbs
          reps
        }
        lastSession {
          exercise {
            type
          }
          sets {
            id
            mins
            distance
            kcal
            lbs
            reps
          }
        }
      }
    }
  }
`;

export function GetItDone() {
  const router = useRouter();

  const workoutId = router.query.workoutId as string;

  const form = useZodForm({ schema: GetItDoneSchema });
  const addExerciseModal = useModal();

  const { data, loading, refetch } = useQuery<GetItDoneQuery>(query, {
    variables: { id: workoutId },
    skip: !router.isReady,
    onCompleted(data) {
      const workoutExercises: Record<string, any> = {};

      for (const workoutExercise of data.workout.workoutExercises) {
        workoutExercises[workoutExercise.id] = {
          sets: workoutExercise.sets.map((set) => ({
            mins: set.mins.toString(),
            distance: set.distance.toString(),
            kcal: set.kcal.toString(),
            reps: set.reps.toString(),
            lbs: set.lbs.toString()
          }))
        };
      }

      form.reset({ workoutExercises });
    }
  });

  const [commit, { error }] = useMutation<
    GetWorkoutDoneMutation,
    GetWorkoutDoneMutationVariables
  >(
    gql`
      mutation GetWorkoutDoneMutation($input: GetWorkoutDoneInput!) {
        getWorkoutDone(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        router.push(`/workouts/${workoutId}`);
      }
    }
  );

  async function onSubmit(input: z.infer<typeof GetItDoneSchema>) {
    const workoutExercises = [];

    for (const [workoutExerciseKey, workoutExerciseValue] of Object.entries(
      input.workoutExercises
    )) {
      if (workoutExerciseValue.sets.length > 0) {
        const nonEmptySets = workoutExerciseValue.sets.filter(
          (set) => (set.mins ?? 0) > 0 || (set.lbs ?? 0) > 0
        );

        if (nonEmptySets.length > 0) {
          workoutExercises.push({ id: workoutExerciseKey, sets: nonEmptySets });
        }
      }
    }

    if (workoutExercises.length > 0) {
      commit({
        variables: {
          input: {
            workoutId: workoutId,
            workoutExercises: workoutExercises
          }
        }
      });
    }
  }

  const workout = data?.workout ?? null;

  return (
    <Page>
      {loading && <div>Cargando...</div>}

      {workout && (
        <div className='h-full flex flex-col space-y-4'>
          <div className='flex items-center space-x-2'>
            <Button href={`/workouts/${workoutId}`} className=''>
              <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
                <ChevronLeftIcon className='w-4 h-4' />
              </div>
            </Button>

            <Heading>{workout.name}</Heading>
          </div>

          <Form form={form} onSubmit={onSubmit}>
            <div className='flex flex-col space-y-6 rounded-lg'>
              {workout.workoutExercises.map((workoutExercise) => (
                <ExerciseSetInput
                  key={workoutExercise.id}
                  workoutExerciseId={workoutExercise.id}
                  exercise={workoutExercise.exercise}
                  lastSession={workoutExercise.lastSession}
                  isDisabled={false}
                />
              ))}
            </div>

            <Button
              variant='dashed'
              color='secondary'
              onClick={addExerciseModal.open}
            >
              Añadir otro ejercicio
            </Button>

            <div className='flex-auto'></div>

            <SubmitButton>
              <CheckCircleIcon className='w-4 h-4 mr-1' />
              <span>Completar</span>
            </SubmitButton>
          </Form>
        </div>
      )}

      <AddExerciseModal {...addExerciseModal.props} onConfirm={refetch} />
    </Page>
  );
}
