import { gql, useMutation } from '@apollo/client';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { ExerciseType } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { GetItDoneSchema, useDebouncedWorkout } from './utils';
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
import { motion } from 'framer-motion';

export function WorkoutExerciseList() {
  const router = useRouter();

  const [isSetupDone, setIsSetupDone] = useState(false);
  const workout = useWorkoutContext();
  const addExerciseSlideOver = useSlideOver();
  const exerciseSessionHistory = useExerciseSessionHistory();

  const form = useZodForm({ schema: GetItDoneSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const workoutState = useWatch({ control: form.control });

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
        router.replace(`/workouts/${workout.workoutId}`);
      }
    }
  );

  const [partialSave] = useMutation(gql`
    mutation PartialSaveMutation($input: GetWorkoutDoneInput!) {
      partialSave(input: $input)
    }
  `);

  useEffect(() => {
    form.reset({
      workoutExercises: workout.workoutExercises
        .sort((a, b) => a.exerciseIndex - b.exerciseIndex)
        .map((workoutExercise) => ({
          exerciseId: workoutExercise.exercise.id,
          sets: workoutExercise.sets.map((set) => ({
            mins: set.mins?.toString() ?? '',
            distance: set.distance?.toString() ?? '',
            kcal: set.kcal?.toString() ?? '',
            reps: set.reps?.toString() ?? '',
            lbs: set.lbs?.toString() ?? ''
          }))
        })) as any
      // In this case using `any` should be safe
      //
      // The object structure should be the same as the zod schema,
      // but because the schema expects the set's values to be of type `number`
      // it wouldn't match the form input's type (`string`).
    });

    setIsSetupDone(true);
  }, []);

  const debouncedWorkoutState = useDebouncedWorkout(workoutState);

  useEffect(() => {
    if (isSetupDone) {
      const parsedValues = GetItDoneSchema.parse(form.getValues());

      const workoutExercisesInput = parsedValues.workoutExercises.map(
        (we, i) => ({
          exerciseIndex: i,
          exerciseId: we.exerciseId,
          sets: we.sets
        })
      );

      partialSave({
        variables: {
          input: {
            workoutId: workout.workoutId,
            workoutExercises: workoutExercisesInput
          }
        }
      });
      // }
    }
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
              <motion.div
                layout
                key={field.id}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
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
              </motion.div>
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
