import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FieldValues, useFieldArray } from 'react-hook-form';
import { graphql, useMutation, useQuery } from 'relay-hooks';
import { array, object, string } from 'yup';
import { Container } from '../ui/Container';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { SubmitButton } from '../ui/SubmitButton';
import { CreateWorkoutQuery } from './__generated__/CreateWorkoutQuery.graphql';

const createWorkoutSchema = object().shape({
  name: string().trim().required('Ingrese el nombre.'),
  exercises: array()
    .of(object().nullable().required('Seleccione un ejercicio.'))
    .min(1, 'Seleccione al menos un ejercicio.')
});

export function CreateWorkout() {
  const router = useRouter();

  const { data } = useQuery<CreateWorkoutQuery>(
    graphql`
      query CreateWorkoutQuery {
        exercises {
          id
          name
          type
          muscleGroup
        }
      }
    `,
    {}
  );

  const [createWorkout, createWorkoutResult] = useMutation(
    graphql`
      mutation CreateWorkoutMutation($input: CreateWorkoutInput!) {
        createWorkout(input: $input) {
          id
          name
          status
          workoutExercises {
            exercise {
              name
            }
          }
        }
      }
    `,
    {
      onCompleted() {
        router.push('/');
      }
    }
  );

  const exerciseOptions = useMemo(() => {
    if (data && data.exercises) {
      return data.exercises.map((exercise) => ({
        value: exercise.id,
        label: exercise.name,
        type: exercise.type,
        muscleGroup: exercise.muscleGroup || ''
      }));
    }

    return [];
  }, [data]);

  const form = useYupForm({
    schema: createWorkoutSchema,
    defaultValues: {
      name: '',
      workoutExercises: [{}]
    }
  });

  const workoutExercises = useFieldArray({
    control: form.control,
    name: 'workoutExercises'
  });

  async function onSubmit(values: FieldValues) {
    createWorkout({
      variables: {
        input: {
          name: values.name,
          workoutExercises: values.workoutExercises.map(
            (exercise: { value: string }) => ({
              id: exercise.value
            })
          )
        }
      }
    });
  }

  return (
    <Container href='/' title='Crear Rutina' size='xl'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de crear la rutina.'
          error={createWorkoutResult.error}
        />

        <Input {...form.register('name')} label='Nombre' />

        <div className='flex flex-col space-y-1'>
          <h3 className='text-lg'>Ejercicios</h3>

          <div className='flex flex-col space-y-4'>
            {workoutExercises.fields.map((field, index) => (
              <div key={field.id} className='flex items-center space-x-2'>
                <div className='w-full'>
                  <Select
                    {...form.register(`workoutExercises.${index}`)}
                    hideLabel
                    options={exerciseOptions}
                    label='Ejercicio'
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
          </div>
        </div>

        <button
          type='button'
          className='w-full border border-dashed border-brand-600 rounded-lg hover:bg-brand-50/40 hover:border-brand-500'
          onClick={() => workoutExercises.append({ value: '', label: '' })}
        >
          <div className='py-2 flex items-center justify-center space-x-2 text-brand-600'>
            <PlusIcon className='w-4 h-4' />
            <span>Añadir un ejercicio más</span>
          </div>
        </button>

        <SubmitButton>Crear Rutina</SubmitButton>
      </Form>
    </Container>
  );
}
