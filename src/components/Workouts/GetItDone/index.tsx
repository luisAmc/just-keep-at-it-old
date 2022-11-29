import { gql, useMutation, useQuery } from '@apollo/client';
import { Page } from 'src/components/shared/Page';
import { useRouter } from 'next/router';
import { Form, useZodForm } from 'src/components/shared/Form';
import { array, z, literal, object, string } from 'zod';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/outline';
import { Heading } from 'src/components/shared/Heading';
import { WorkoutExercise } from './WorkoutExercise';
import { useModal } from 'src/components/shared/Modal';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { ExerciseType } from '@prisma/client';
import { LastSessionsSlideOver } from './LastSessionsSlideOver';
import { useSlideOver } from 'src/components/shared/SlideOver';
import { useEffect, useState } from 'react';
import {
  GetItDoneDeleteMutation,
  GetItDoneDeleteMutationVariables,
  GetItDoneQuery,
  GetWorkoutDoneMutation,
  GetWorkoutDoneMutationVariables
} from './__generated__/index.generated';
import { ConfirmationModal } from 'src/components/shared/ConfirmationModal';
import { AddExerciseSlideOver } from './AddExerciseSlideOver';
import { MoveExerciseDirection } from './WorkoutExercise/WorkoutExerciseActions';

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
        type: string()
      }),
      sets: array(SetSchema)
    })
  )
});

export function GetItDone() {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;
  const deleteModal = useModal();

  const addExerciseModal = useModal();
  const lastSessions = useSlideOver();

  const [selectedExerciseId, setSelectedExerciseId] = useState('');

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
      const alreadyEditedWorkout = localStorage.getItem(`workout-${workoutId}`);

      if (alreadyEditedWorkout) {
        form.reset(JSON.parse(alreadyEditedWorkout));
      } else {
        form.reset({
          workoutExercises: data.workout.workoutExercises
            .sort((a, b) => (a.index < b.index ? -1 : 1))
            .map((workoutExercise) => ({
              workoutId: workoutExercise.id,
              exercise: {
                exerciseId: workoutExercise.exercise.id,
                name: workoutExercise.exercise.name,
                type: workoutExercise.exercise.type
              },
              sets: []
            }))
        });
      }
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
        localStorage.removeItem(`workout-${workoutId}`);
        router.push(`/workouts/${workoutId}`);
      }
    }
  );

  const [deleteCommit] = useMutation<
    GetItDoneDeleteMutation,
    GetItDoneDeleteMutationVariables
  >(
    gql`
      mutation GetItDoneDeleteMutation($workoutId: ID!) {
        deleteWorkout(workoutId: $workoutId) {
          id
        }
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem(`workout-${workoutId}`);
        router.replace('/');
      }
    }
  );

  const currentWorkoutState = useWatch({ control: form.control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        `workout-${workoutId}`,
        JSON.stringify(currentWorkoutState)
      );
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [JSON.stringify(currentWorkoutState)]);

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
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Button href='/' className=''>
                <div className='rounded-full bg-brand-400 text-brand-800 p-2 flex items-center justify-center'>
                  <ChevronLeftIcon className='w-4 h-4' />
                </div>
              </Button>

              <Heading>{workout.name}</Heading>
            </div>

            <div>
              <Button
                onClick={deleteModal.open}
                className='p-2 rounded-full bg-rose-500 text-rose-300 focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 hover:bg-opacity-80'
              >
                <TrashIcon className='w-4 h-4' />
              </Button>

              <ConfirmationModal
                {...deleteModal.props}
                onConfirm={() => {
                  deleteCommit({
                    variables: {
                      workoutId: workoutId
                    }
                  });
                }}
              >
                ¿Está seguro de borrar la rutina?
              </ConfirmationModal>
            </div>
          </div>

          <Form form={form} onSubmit={onSubmit}>
            <div className='flex flex-col divide-y divide-slate-600 px-4 bg-slate-700 rounded-lg'>
              {workoutExercises.fields.map((field, index) => (
                <WorkoutExercise
                  key={field.id}
                  exercise={field.exercise}
                  fieldName={`workoutExercises[${index}]`}
                  onSelect={(exerciseId) => {
                    setSelectedExerciseId(exerciseId);
                    lastSessions.open();
                  }}
                  onRemove={() => workoutExercises.remove(index)}
                  isFirst={index === 0}
                  isLast={index === workoutExercises.fields.length - 1}
                  onMove={(direction: MoveExerciseDirection) => {
                    if (direction === 'first') {
                      workoutExercises.move(index, 0);
                    } else if (direction === 'last') {
                      workoutExercises.move(
                        index,
                        workoutExercises.fields.length - 1
                      );
                    } else {
                      workoutExercises.move(
                        index,
                        index + (direction === 'up' ? -1 : 1)
                      );
                    }
                  }}
                />
              ))}
            </div>

            <Button
              variant='dashed'
              color='secondary'
              onClick={addExerciseModal.open}
            >
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Añadir otro ejercicio</span>
            </Button>

            <SubmitButton>
              <CheckCircleIcon className='w-4 h-4 mr-1' />
              <span>Completar</span>
            </SubmitButton>
          </Form>

          <AddExerciseSlideOver
            {...addExerciseModal.props}
            onConfirm={(exercise: {
              exerciseId: string;
              name: string;
              type: string;
            }) => {
              workoutExercises.append({ exercise, sets: [] });
            }}
          />

          <LastSessionsSlideOver
            exerciseId={selectedExerciseId}
            open={lastSessions.props.open}
            onClose={() => {
              setSelectedExerciseId('');
              lastSessions.close();
            }}
          />
        </div>
      )}
    </Page>
  );
}
