import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { object, array, record, z, string } from 'zod';
import { Page } from 'src/components/shared/Page';
import { query } from '../ViewWorkout';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useRouter } from 'next/router';
import { WorkoutQuery } from '../ViewWorkout/__generated__/index.generated';
import {
  GetWorkoutDoneMutation,
  GetWorkoutDoneMutationVariables
} from './__generated__/index.generated';
import { Button } from 'src/components/shared/Button';
import { ExerciseSetInput } from './ExerciseSetInput';

const numberShape = string().regex(/^\d*$/).transform(Number);

const SetSchema = object({
  mins: numberShape.optional().nullable(),
  distance: numberShape.optional().nullable(),
  kcal: numberShape.optional().nullable(),
  lbs: numberShape.optional().nullable(),
  reps: numberShape.optional().nullable()
});

const GetItDoneSchema = object({
  workoutExercises: record(
    object({
      sets: array(SetSchema)
    })
  )
});

export function GetItDone() {
  const router = useRouter();

  const workoutId = router.query.workoutId as string;

  const { data, loading } = useQuery<WorkoutQuery>(query, {
    variables: { id: workoutId },
    skip: !router.isReady
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
      onCompleted(data) {
        router.push(`/workouts/${data.getWorkoutDone.id}`);
      }
    }
  );

  const form = useZodForm({ schema: GetItDoneSchema });

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
        <div className='h-full flex flex-col space-y-4 pb-4'>
          <div className='flex items-center space-x-4'>
            <Button
              className='rounded-full bg-brand-300 text-brand-700 p-2'
              href='/'
            >
              <ChevronLeftIcon className='w-4 h-4' />
            </Button>

            <Heading>{workout.name}</Heading>
          </div>

          <Form form={form} onSubmit={onSubmit}>
            <div className='flex flex-col space-y-4 rounded-lg'>
              {workout.workoutExercises.map((workoutExercise) => (
                <ExerciseSetInput
                  key={workoutExercise.id}
                  workoutExerciseId={workoutExercise.id}
                  exercise={workoutExercise.exercise}
                  isDisabled={false}
                />
              ))}
            </div>

            <div className='flex-auto'></div>

            <SubmitButton>
              <CheckIcon className='w-4 h-4 mr-1' />
              <span>Completar</span>
            </SubmitButton>
          </Form>
        </div>
      )}
    </Page>
  );
}