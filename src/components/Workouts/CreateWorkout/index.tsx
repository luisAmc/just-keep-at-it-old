import { gql, useMutation, useQuery } from '@apollo/client';
import { ChevronLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useFieldArray } from 'react-hook-form';
import { array, object, string } from 'zod';
import { ExerciseInfoFragment } from '../../Exercises';
import { Exercises_Exercise } from '../../Exercises/__generated__/index.generated';
import { FieldError, Form, useZodForm } from '../../shared/Form';
import { Input } from '../../shared/Input';
import { SelectExercise } from './SelectExercise';
import { SubmitButton } from '../../shared/SubmitButton';
import {
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  CreateWorkoutQuery
} from './__generated__/index.generated';
import { ErrorMessage } from 'src/components/shared/ErrorMessage';
import { useRouter } from 'next/router';
import { Page } from 'src/components/shared/Page';
import { Heading } from 'src/components/shared/Heading';
import { Button } from 'src/components/shared/Button';
import { CheckCircleIcon } from '@heroicons/react/solid';

export const query = gql`
  query CreateWorkoutQuery {
    viewer {
      id
      exercises {
        ...Exercises_exercise
      }
    }
  }
  ${ExerciseInfoFragment}
`;

function useExercises(exercises: Exercises_Exercise[] | undefined) {
  if (!exercises || !exercises.length) return [];

  return exercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.id,
    muscleGroup: exercise.muscleGroup as string
  }));
}

const CreateWorkoutSchema = object({
  name: string().min(1, 'Ingrese el nombre de la rutina.'),
  workoutExercises: array(
    object({
      label: string(),
      value: string()
    })
  ).refine((data) => data.every((workoutExercise) => workoutExercise.value), {
    message: 'Seleccione un valor en todos los campos.'
  })
});

export function CreateWorkout() {
  const router = useRouter();

  const { data, loading } = useQuery<CreateWorkoutQuery>(query);

  const form = useZodForm({
    schema: CreateWorkoutSchema,
    defaultValues: {
      workoutExercises: [
        {
          label: '',
          value: ''
        }
      ]
    }
  });

  const [createWorkout, { error }] = useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(
    gql`
      mutation CreateWorkoutMutation($input: CreateWorkoutInput!) {
        createWorkout(input: $input) {
          id
        }
      }
    `,
    {
      update(cache, { data }) {
        if (!data?.createWorkout) return;

        cache.modify({
          fields: {
            workouts(existingWorkouts = []) {
              return [data.createWorkout, ...existingWorkouts];
            }
          }
        });
      },
      onCompleted() {
        router.push('/');
      }
    }
  );

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const exercises = useExercises(data?.viewer?.exercises);

  return (
    <Page>
      <div className='h-full flex flex-col space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button
            className='rounded-full bg-brand-300 text-brand-700 p-2'
            href='/'
          >
            <ChevronLeftIcon className='w-4 h-4' />
          </Button>

          <Heading>Crear rutina</Heading>
        </div>

        <Form
          form={form}
          onSubmit={(input) =>
            createWorkout({
              variables: {
                input: {
                  name: input.name,
                  workoutExercises: input.workoutExercises.map((exercise) => ({
                    id: exercise.value
                  }))
                }
              }
            })
          }
        >
          <ErrorMessage title='Ocurrió un error...' error={error} />

          <Input {...form.register('name')} label='Nombre' />

          <div>
            <label>
              <div>Ejercicios</div>

              {workoutExercises.fields.map((field, index) => (
                <div key={field.id} className='flex items-center space-x-2'>
                  <div className='w-full'>
                    <SelectExercise
                      name={`workoutExercises.${index}`}
                      options={exercises}
                    />
                  </div>

                  {workoutExercises.fields.length > 1 && (
                    <Button
                      className='p-2.5 rounded-full bg-brand-100 text-brand-300'
                      onClick={() => workoutExercises.remove(index)}
                    >
                      <TrashIcon className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              ))}

              <FieldError name='workoutExercises' />
            </label>
          </div>

          <Button
            className='w-full border border-dashed border-brand-600 rounded-lg'
            onClick={() => {
              workoutExercises.append({ value: '', label: '' });
            }}
          >
            <div className='py-2 flex items-center justify-center space-x-2 text-brand-600'>
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Añadir uno más</span>
            </div>
          </Button>

          <div className='flex-auto'></div>

          <SubmitButton>
            <CheckCircleIcon className='w-4 h-4 mr-1' />
            <span>Ingresar</span>
          </SubmitButton>
        </Form>
      </div>
    </Page>
  );
}
