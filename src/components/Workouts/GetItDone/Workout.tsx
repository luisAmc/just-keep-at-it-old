import { Form, useZodForm } from 'src/components/shared/Form';
import { GetItDone_Workout } from './__generated__/index.generated';
import { array, z, literal, object, string } from 'zod';
import { useFieldArray, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { ExerciseType } from '@prisma/client';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { WorkoutExercise } from './WorkoutExercise/WorkoutExercise';
import {
  ExerciseSessionHistory,
  useExerciseSessionHistory
} from './ExerciseSessionHistory';
import { MoveExerciseDirection } from './WorkoutExercise/WorkoutExerciseActions';
import { AddExerciseSlideOver } from './AddExerciseSlideOver';
import { useModal } from 'src/components/shared/Modal';
import { Button } from 'src/components/shared/Button';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/outline';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import {
  useWorkoutContext,
  WorkoutProvider
} from './WorkoutExercise/Contexts/WorkoutContext';
import {
  GetItDoneWorkoutMutation,
  GetItDoneWorkoutMutationVariables
} from './__generated__/Workout.generated';

interface WorkoutProps {
  workout: GetItDone_Workout;
}

export function Workout({ workout }: WorkoutProps) {
  return (
    <WorkoutProvider workout={workout}>
      <WorkoutInContext />
    </WorkoutProvider>
  );
}

function WorkoutInContext() {
  const router = useRouter();
  const {
    workoutId,
    workoutExercises: baseWorkoutExercises,
    cachedExercises,
    setCachedExercises
  } = useWorkoutContext();

  const [commit] = useMutation<
    GetItDoneWorkoutMutation,
    GetItDoneWorkoutMutationVariables
  >(
    gql`
      mutation GetItDoneWorkoutMutation($input: GetWorkoutDoneInput!) {
        getWorkoutDone(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem(`workout-${workoutId}`);
        localStorage.removeItem(`workout-${workoutId}-cache`);
        router.push(`/workouts/${workoutId}`);
      }
    }
  );

  const exerciseSessionHistory = useExerciseSessionHistory();
  const addExerciseModal = useModal();
  const form = useZodForm({ schema: GetItDoneSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  useEffect(() => {
    const alreadyEditedWorkout = localStorage.getItem(`workout-${workoutId}`);

    if (alreadyEditedWorkout) {
      form.reset(JSON.parse(alreadyEditedWorkout));

      const cachedMap = localStorage.getItem(`workout-${workoutId}-cache`);

      if (cachedMap) {
        setCachedExercises(JSON.parse(cachedMap));
      }
    } else {
      form.reset({
        workoutExercises: baseWorkoutExercises
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
  }, []);

  const currentWorkoutState = useWatch({ control: form.control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        `workout-${workoutId}`,
        JSON.stringify(currentWorkoutState)
      );

      localStorage.setItem(
        `workout-${workoutId}-cache`,
        JSON.stringify(cachedExercises())
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

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className='flex flex-col px-4 bg-slate-700 rounded-lg'>
        {workoutExercises.fields.map((field, index) => (
          <WorkoutExercise
            key={field.id}
            fieldIndex={index}
            maxIndex={workoutExercises.fields.length - 1}
            workoutExerciseId={field.exercise.exerciseId}
            onSelect={(id) => exerciseSessionHistory.setExerciseId(id)}
            onRemove={() => workoutExercises.remove(index)}
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

        <AddExerciseSlideOver
          {...addExerciseModal.props}
          onConfirm={(exercise) => {
            workoutExercises.append({ exercise, sets: [] });
          }}
        />
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

      <ExerciseSessionHistory {...exerciseSessionHistory.props} />
    </Form>
  );
}

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
