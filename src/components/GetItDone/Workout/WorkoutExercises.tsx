import { AddExerciseSlideOver } from '../AddExerciseSlideOver';
import { Button } from 'src/components/shared/Button';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation } from '@apollo/client';
import { MoveExerciseAction } from './WorkoutExerciseActions';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import {
  useDebouncedWorkout,
  WorkoutExercisesSchema,
  useWorkoutInLocalStorage
} from './WorkoutUtils';
import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { useSlideOver } from 'src/components/shared/SlideOver';
import { useWorkoutContext } from './WorkoutContext';
import { WorkoutExercise } from './WorkoutExercise';
import { z } from 'zod';
import router from 'next/router';
import {
  WorkoutExercisesMutation,
  WorkoutExercisesMutationVariables
} from './__generated__/WorkoutExercises.generated';
import { ExerciseType } from '@prisma/client';
import {
  ExerciseSessionHistory,
  useExerciseSessionHistory
} from '../ExerciseSessionHistory';

export function WorkoutExercises() {
  const workout = useWorkoutContext();

  const addExerciseSlideOver = useSlideOver();
  const exerciseSessionHistory = useExerciseSessionHistory();

  const form = useZodForm({ schema: WorkoutExercisesSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const inLocalStorage = useWorkoutInLocalStorage();
  const workoutState = useWatch({ control: form.control });

  useEffect(() => {
    const alreadyEditedWorkout = localStorage.getItem(`workout-${workout.id}`);

    if (alreadyEditedWorkout) {
      const fromLocalStorage = JSON.parse(alreadyEditedWorkout);

      form.reset(fromLocalStorage.form);
      workout.setExerciseCache(fromLocalStorage.exerciseCache ?? []);
    } else {
      form.reset({
        workoutExercises: workout.workoutExercises
          .sort((a, b) => a.index - b.index)
          .map((workoutExercise) => ({
            exerciseId: workoutExercise.exercise.id,
            sets: []
          }))
      });
    }
  }, []);

  const debouncedWorkoutState = useDebouncedWorkout(workoutState);

  useEffect(() => {
    inLocalStorage.save(workout.id, debouncedWorkoutState);
  }, [debouncedWorkoutState]);

  function removeExercise(index: number) {
    workoutExercises.remove(index);
  }

  function moveExercise(action: MoveExerciseAction, index: number) {
    if (action === 'first') {
      workoutExercises.move(index, 0);
    } else if (action === 'last') {
      workoutExercises.move(index, workoutExercises.fields.length - 1);
    } else {
      workoutExercises.move(index, index + (action === 'up' ? -1 : 1));
    }
  }

  const [getWorkoutDone] = useMutation<
    WorkoutExercisesMutation,
    WorkoutExercisesMutationVariables
  >(
    gql`
      mutation WorkoutExercisesMutation($input: GetWorkoutDoneInput!) {
        getWorkoutDone(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        inLocalStorage.remove(workout.id);
        router.push(`/workouts/${workout.id}`);
      }
    }
  );

  async function onSubmit(input: z.infer<typeof WorkoutExercisesSchema>) {
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
            index: i,
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
            workoutId: workout.id,
            workoutExercises: nonEmptyWorkoutExercises
          }
        }
      });
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className='flex flex-col px-4 bg-slate-700 rounded-lg'>
        {workoutExercises.fields.map((field, i) => (
          <WorkoutExercise
            key={field.id}
            index={i}
            maxIndex={workoutExercises.fields.length - 1}
            exerciseId={field.exerciseId}
            onRemove={() => removeExercise(i)}
            onMove={(action) => moveExercise(action, i)}
            onSelect={(exerciseId) =>
              exerciseSessionHistory.setExerciseId(exerciseId)
            }
          />
        ))}
      </div>

      <Button
        variant='dashed'
        color='secondary'
        onClick={addExerciseSlideOver.open}
      >
        <PlusIcon className='w-4 h-4 mr-1' />
        <span>Añadir otro ejercicio</span>
      </Button>

      <AddExerciseSlideOver
        {...addExerciseSlideOver.props}
        onConfirm={(exerciseId) => {
          workoutExercises.append({ exerciseId, sets: [] });
        }}
      />

      <ExerciseSessionHistory {...exerciseSessionHistory.props} />

      <SubmitButton>
        <CheckCircleIcon className='w-4 h-4 mr-1' />
        <span>Completar</span>
      </SubmitButton>
    </Form>
  );
}
