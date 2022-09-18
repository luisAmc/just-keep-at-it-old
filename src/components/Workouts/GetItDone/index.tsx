import { gql, useMutation, useQuery } from '@apollo/client';
import { Page } from 'src/components/shared/Page';
import { useRouter } from 'next/router';
import { Form, useZodForm } from 'src/components/shared/Form';
import { array, z, literal, object, string } from 'zod';
import { useFieldArray } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { CheckCircleIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import { Heading } from 'src/components/shared/Heading';
import { WorkoutExercise } from './WorkoutExercise';
import { useModal } from 'src/components/shared/Modal';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import {
  GetItDoneQuery,
  GetWorkoutDoneMutation,
  GetWorkoutDoneMutationVariables
} from './__generated__/index.generated';
import { AddExerciseModal } from './AddExerciseModal';
import { ExerciseType } from '@prisma/client';

const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    index
    exercise {
      id
      name
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
`;

export const query = gql`
  query GetItDoneQuery($id: ID!) {
    workout(id: $id) {
      name
      status
      completedAt
      createdAt
      workoutExercisesCount
      workoutExercises {
        ...WorkoutExercise_workoutExercise
        lastSession {
          ...WorkoutExercise_workoutExercise
        }
      }
    }
  }
  ${WorkoutExerciseFragment}
`;

const numberShape = string().or(literal('')).optional().transform(Number);

const SetSchema = object({
  id: string().optional(),
  mins: numberShape,
  distance: numberShape,
  kcal: numberShape,
  reps: numberShape,
  lbs: numberShape
});

const GetItDoneSchema = object({
  workoutExercises: array(
    object({
      workoutId: string().optional(),
      exercise: object({
        exerciseId: string(),
        name: string(),
        type: string(),
        lastSession: object({
          sets: array(
            object({
              id: string(),
              mins: string(),
              distance: string(),
              kcal: string(),
              reps: string(),
              lbs: string()
            })
          )
        }).optional()
      }),
      sets: array(SetSchema)
    })
  )
});

export function GetItDone() {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  const addExerciseModal = useModal();

  const form = useZodForm({ schema: GetItDoneSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const { data, loading } = useQuery<GetItDoneQuery>(query, {
    variables: { id: workoutId },
    fetchPolicy: 'no-cache',
    skip: !router.isReady,
    onCompleted(data) {
      form.reset({
        workoutExercises: data.workout.workoutExercises
          .sort((a, b) => (a.index < b.index ? -1 : 1))
          .map((workoutExercise) => ({
            workoutId: workoutExercise.id,
            exercise: {
              exerciseId: workoutExercise.exercise.id,
              name: workoutExercise.exercise.name,
              type: workoutExercise.exercise.type,
              lastSession: workoutExercise.lastSession
                ? {
                    sets: workoutExercise.lastSession.sets.map((set) => ({
                      id: set.id,
                      mins: set.mins.toString(),
                      distance: set.distance.toString(),
                      kcal: set.kcal.toString(),
                      reps: set.reps.toString(),
                      lbs: set.lbs.toString()
                    }))
                  }
                : undefined
            },
            sets: []
          }))
      });
    }
  });

  const [commit] = useMutation<
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

    for (let i = 0; i < input.workoutExercises.length; i++) {
      const workoutExercise = input.workoutExercises[i];

      if (workoutExercise.sets.length > 0) {
        const isAerobic =
          workoutExercise.exercise.type === ExerciseType.AEROBIC;

        const nonEmptySets = workoutExercise.sets.filter((set) =>
          isAerobic ? set.mins ?? 0 : set.lbs ?? 0
        );

        if (nonEmptySets.length > 0) {
          workoutExercises.push({
            index: i,
            id: workoutExercise.workoutId,
            exerciseId: workoutExercise.exercise.exerciseId,
            sets: nonEmptySets.map((set) => ({ ...set }))
          });
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
            <div className='flex flex-col space-y-6'>
              {workoutExercises.fields.map((field, index) => (
                <WorkoutExercise
                  key={field.id}
                  exercise={field.exercise}
                  fieldName={`workoutExercises[${index}]`}
                  onRemove={() => workoutExercises.remove(index)}
                />
              ))}

              <Button
                variant='dashed'
                color='secondary'
                onClick={addExerciseModal.open}
              >
                Añadir otro ejercicio
              </Button>
            </div>

            <div className='flex-auto'></div>

            <SubmitButton>
              <CheckCircleIcon className='w-4 h-4 mr-1' />
              <span>Completar</span>
            </SubmitButton>
          </Form>

          <AddExerciseModal
            {...addExerciseModal.props}
            onConfirm={(exercise: {
              exerciseId: string;
              name: string;
              type: string;
            }) => {
              workoutExercises.append({ exercise, sets: [] });
            }}
          />
        </div>
      )}
    </Page>
  );
}
