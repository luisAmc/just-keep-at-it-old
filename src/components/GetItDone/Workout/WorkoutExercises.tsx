import { Form, useZodForm } from 'src/components/shared/Form';
import { useFieldArray, useWatch } from 'react-hook-form';
import { WorkoutExercise } from './WorkoutExercise';
import {
  useDebouncedWorkout,
  WorkoutExercisesSchema,
  workoutInLocalStorage
} from './WorkoutUtils';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useWorkoutContext } from './WorkoutContext';
import { useEffect } from 'react';

export function WorkoutExercises() {
  const workout = useWorkoutContext();

  const form = useZodForm({ schema: WorkoutExercisesSchema });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const inLocalStorage = workoutInLocalStorage();
  const workoutState = useWatch({ control: form.control });
  const debouncedWorkoutState = useDebouncedWorkout(workoutState);

  useEffect(() => {
    inLocalStorage.save(workout.id, debouncedWorkoutState);
  }, [debouncedWorkoutState]);

  useEffect(() => {
    const alreadyEditedWorkout = localStorage.getItem(`workout-${workout.id}`);

    if (alreadyEditedWorkout) {
      const fromLocalStorage = JSON.parse(alreadyEditedWorkout);

      form.reset(fromLocalStorage.form);
      workout.setExerciseCache(fromLocalStorage.exerciseMap ?? []);
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

  return (
    <Form form={form} onSubmit={() => {}}>
      <div className='flex flex-col px-4 bg-slate-700 rounded-lg'>
        {workoutExercises.fields.map((field, i) => (
          <WorkoutExercise
            key={field.id}
            index={i}
            exerciseId={field.exerciseId}
          />
        ))}
      </div>

      <SubmitButton>
        <CheckCircleIcon className='w-4 h-4 mr-1' />
        <span>Completar</span>
      </SubmitButton>
    </Form>
  );
}
