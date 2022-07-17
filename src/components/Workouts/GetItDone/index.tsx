import { AerobicExercise } from './AerobicExercise';
import { Card } from 'src/components/shared/Card';
import { CheckIcon } from '@heroicons/react/outline';
import { ExerciseType, WorkoutStatus } from '@prisma/client';
import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { object, array, number, record, z } from 'zod';
import { Page } from 'src/components/shared/Page';
import { Pill } from 'src/components/shared/Pill';
import { query } from '../ViewWorkout';
import { StrengthExercise } from './StrengthExercise';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { WorkoutQuery } from '../__generated__/ViewWorkout.generated';
import {
  GetWorkoutDoneMutation,
  GetWorkoutDoneMutationVariables
} from './__generated__/index.generated';

const GetItDoneSchema = object({
  aerobics: record(
    object({
      sets: array(
        object({
          mins: number()
        })
      )
    })
  ),
  strengths: record(
    object({
      sets: array(
        object({
          lbs: number(),
          reps: number()
        })
      )
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

  const aerobicExercises = useMemo(() => {
    return (
      data?.workout.workoutExercises.filter(
        (workoutExercise) =>
          workoutExercise.exercise.type === ExerciseType.AEROBIC
      ) ?? []
    );
  }, [data]);

  const strengthExercises = useMemo(() => {
    return (
      data?.workout.workoutExercises.filter(
        (workoutExercise) =>
          workoutExercise.exercise.type === ExerciseType.STRENGTH
      ) ?? []
    );
  }, [data]);

  async function onSubmit(input: z.infer<typeof GetItDoneSchema>) {
    const workoutExercises = [];

    for (const [aerobicKey, aerobicValue] of Object.entries(input.aerobics)) {
      if (aerobicValue.sets.length > 0) {
        const nonEmptySets = aerobicValue.sets.filter((set) => set.mins > 0);

        if (nonEmptySets.length > 0) {
          workoutExercises.push({ id: aerobicKey, sets: nonEmptySets });
        }
      }
    }

    for (const [strengthKey, strengthValue] of Object.entries(
      input.strengths
    )) {
      if (strengthValue.sets.length > 0) {
        const nonEmptySets = strengthValue.sets.filter((set) => set.reps > 0);

        if (nonEmptySets.length > 0) {
          workoutExercises.push({ id: strengthKey, sets: nonEmptySets });
        }
      }
    }

    if (workoutExercises.length > 0) {
      commit({
        variables: {
          input: {
            workoutId: workoutId,
            workoutExercies: workoutExercises
          }
        }
      });
    }
  }

  return (
    <Page>
      <Card size='lg'>
        {data && (
          <Form form={form} onSubmit={onSubmit}>
            <div className='h-full flex flex-col gap-4'>
              <header className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <Heading>{data.workout.name}</Heading>

                <div className='flex items-center justify-end space-x-2'>
                  <div className='text-sm font-medium'>
                    {data.workout.workoutExercisesCount} ejercicios
                  </div>

                  <span>&middot;</span>

                  <Pill
                    text={
                      data.workout.status === WorkoutStatus.DONE
                        ? 'Completado'
                        : 'Pendiente'
                    }
                    color={
                      data.workout.status === WorkoutStatus.DONE
                        ? 'success'
                        : 'mono'
                    }
                  />
                </div>
              </header>

              {aerobicExercises.length > 0 && (
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-xl bg-aerobic-200 divide-y'>
                  {aerobicExercises.map((aerobicExercise) => (
                    <AerobicExercise
                      key={aerobicExercise.id}
                      label={aerobicExercise.exercise.name}
                      exerciseId={aerobicExercise.id}
                      disabled={data.workout.status === WorkoutStatus.DRAFTED}
                    />
                  ))}
                </div>
              )}

              {strengthExercises.length > 0 && (
                <div className='flex flex-col space-y-2 px-2 py-2 rounded-xl bg-strength-200'>
                  {strengthExercises.map((strengthExercise) => (
                    <StrengthExercise
                      key={strengthExercise.id}
                      label={strengthExercise.exercise.name}
                      exerciseId={strengthExercise.id}
                      disabled={data.workout.status === WorkoutStatus.DRAFTED}
                    />
                  ))}
                </div>
              )}
            </div>

            <SubmitButton>
              <CheckIcon className='w-4 h-4 mr-1' />
              <span>Completar</span>
            </SubmitButton>
          </Form>
        )}
      </Card>
    </Page>
  );
}
