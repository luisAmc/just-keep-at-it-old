import { gql, useMutation } from '@apollo/client';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { ExerciseType } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { Form, useZodForm } from 'src/components/shared/Form';
import { useSlideOver } from 'src/components/shared/SlideOver';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { z } from 'zod';
import { AddExerciseSlideOver } from '../AddExerciseSlideOver';
import {
  ExerciseSessionHistory,
  useExerciseSessionHistory
} from '../ExerciseSessionHistory';
import {
  GetItDoneSchema,
  useDebouncedWorkout,
  useWorkoutInLocalStorage
} from './utils';
import { useWorkoutContext } from './WorkoutContext';
import { WorkoutExercise } from './WorkoutExercise';
import {
  MoveExerciseOption,
  WorkoutExerciseProvider
} from './WorkoutExerciseContext';
import {
  WorkoutExerciseListMutation,
  WorkoutExerciseListMutationVariables
} from './__generated__/WorkoutExerciseList.generated';

export function WorkoutExerciseList() {
  const router = useRouter();

  const workout = useWorkoutContext();
  const addExerciseSlideOver = useSlideOver();
  const exerciseSessionHistory = useExerciseSessionHistory();

  const form = useZodForm({ schema: GetItDoneSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const inLocalStorage = useWorkoutInLocalStorage();
  const workoutState = useWatch({ control: form.control });

  useEffect(() => {
    const alreadyEditedWorkout = localStorage.getItem(
      `workout-${workout.workoutId}`
    );

    if (alreadyEditedWorkout) {
      const fromLocalStorage = JSON.parse(alreadyEditedWorkout);

      form.reset(fromLocalStorage.form);
      workout.setCache(fromLocalStorage.exerciseCache ?? []);
    } else {
      form.reset({
        workoutExercises: workout.workoutExercises
          .sort((a, b) => a.exerciseIndex - b.exerciseIndex)
          .map((workoutExercise) => ({
            exerciseId: workoutExercise.exercise.id,
            sets: []
          }))
      });
    }
  }, []);

  const debouncedWorkoutState = useDebouncedWorkout(workoutState);

  useEffect(() => {
    inLocalStorage.save(workout.workoutId, debouncedWorkoutState);
  }, [debouncedWorkoutState]);

  function onRemove(index: number) {
    workoutExercises.remove(index);
  }

  function onMove(action: MoveExerciseOption, index: number) {
    if (action === 'first') {
      workoutExercises.move(index, 0);
    } else if (action === 'last') {
      workoutExercises.move(index, workoutExercises.fields.length - 1);
    } else {
      workoutExercises.move(index, index + (action === 'up' ? -1 : 1));
    }
  }

  const [getWorkoutDone] = useMutation<
    WorkoutExerciseListMutation,
    WorkoutExerciseListMutationVariables
  >(
    gql`
      mutation WorkoutExerciseListMutation($input: GetWorkoutDoneInput!) {
        getWorkoutDone(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        inLocalStorage.remove(workout.workoutId);
        router.push(`/workouts/${workout.workoutId}`);
      }
    }
  );

  async function onSubmit(input: z.infer<typeof GetItDoneSchema>) {
    const nonEmptyWorkoutExercises = [];

    for (let i = 0; i < input.workoutExercises.length; i++) {
      const workoutExercise = input.workoutExercises[i];

      if (workoutExercise.sets.length > 0) {
        const exerciseType = workout.getExercise(
          workoutExercise.exerciseId
        )!.type;

        const nonEmptySets = workoutExercise.sets.filter((set) =>
          exerciseType === ExerciseType.AEROBIC ? set.mins ?? 0 : set.lbs ?? 0
        );

        if (nonEmptySets.length > 0) {
          nonEmptyWorkoutExercises.push({
            exerciseIndex: i,
            exerciseId: workoutExercise.exerciseId,
            sets: nonEmptySets
          });
        }
      }
    }

    if (nonEmptyWorkoutExercises.length > 0) {
      getWorkoutDone({
        variables: {
          input: {
            workoutId: workout.workoutId,
            workoutExercises: nonEmptyWorkoutExercises
          }
        }
      });
    }
  }

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <div className='flex flex-col space-y-2'>
          {workoutExercises.fields.length ? (
            workoutExercises.fields.map((field, i) => (
              <div
                key={field.id}
                className='flex flex-col p-4 bg-slate-700 rounded-lg'
              >
                <WorkoutExerciseProvider
                  index={i}
                  maxIndex={workoutExercises.fields.length - 1}
                  exerciseId={(field as any).exerciseId}
                  onRemove={() => onRemove(i)}
                  onMove={(action) => onMove(action, i)}
                  onSelect={(exerciseId) =>
                    exerciseSessionHistory.setExerciseId(exerciseId)
                  }
                >
                  <WorkoutExercise />
                </WorkoutExerciseProvider>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center space-y-2 p-8 bg-slate-700 rounded-md text-slate-300'>
              <SparklesIcon className='w-10 h-10' />
              <p className='font-semibold text-sm'>
                La rutina no tiene ejercicios hasta el momento...
              </p>
            </div>
          )}
        </div>

        <Button variant='dashed' onClick={addExerciseSlideOver.open}>
          <PlusIcon className='w-4 h-4 mr-1' />
          Añadir otro ejercicio
        </Button>

        <SubmitButton>Completar rutina</SubmitButton>
      </Form>

      <AddExerciseSlideOver
        {...addExerciseSlideOver.props}
        onConfirm={(exerciseId) => {
          workoutExercises.append({ exerciseId, sets: [] });
        }}
      />

      <ExerciseSessionHistory {...exerciseSessionHistory.props} />
    </>
  );
}
