import { gql, useMutation, useQuery } from '@apollo/client';
import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useFieldArray } from 'react-hook-form';
import { array, object, string } from 'zod';
import { ExerciseInfoFragment } from '../../Exercises';
import { Exercises_Exercise } from '../../Exercises/__generated__/index.generated';
import { Card } from '../../shared/Card';
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

export const query = gql`
  query CreateWorkoutQuery {
    me {
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
    message: 'Todos los selectores tiene que tener un valor seleccionado.'
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
      onCompleted() {
        router.push('/workouts');
      }
    }
  );

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  const exercises = useExercises(data?.me?.exercises);

  return (
    <Card title='Crear Rutina'>
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
        <ErrorMessage title='Error de creación' error={error} />

        <Input {...form.register('name')} label='Nombre' />

        <div className='flex flex-col space-y-4'>
          <label>
            <div className='font-medium text-gray-800 mb-1'>Ejercicios</div>

            {workoutExercises.fields.map((field, index) => (
              <div key={field.id} className='flex items-center space-x-2'>
                <div className='w-full'>
                  <SelectExercise
                    name={`workoutExercises.${index}`}
                    options={exercises}
                  />
                </div>

                {workoutExercises.fields.length > 1 && (
                  <button
                    className='p-2.5 rounded-full hover:bg-brand-100'
                    onClick={() => workoutExercises.remove(index)}
                  >
                    <TrashIcon className='w-4 h-4' />
                  </button>
                )}
              </div>
            ))}

            <FieldError name='workoutExercises' />
          </label>
        </div>

        <button
          type='button'
          className='w-full border border-dashed border-brand-600 rounded-lg hover:bg-brand-50/40 hover:border-brand-500'
          onClick={(e) => {
            e.preventDefault();
            workoutExercises.append({ value: '', label: '' });
          }}
        >
          <div className='py-2 flex items-center justify-center space-x-2 text-brand-600'>
            <PlusIcon className='w-4 h-4' />
            <span>Añadir un ejercicio más</span>
          </div>
        </button>

        <SubmitButton>
          <CheckIcon className='w-6 h-6 mr-1' />
          <span>Ingresar</span>
        </SubmitButton>
      </Form>
    </Card>
  );
}
