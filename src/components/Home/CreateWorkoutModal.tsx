import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { FieldValues, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ExerciseType } from 'src/models/Exercise';
import { getExercises } from 'src/resolvers/ExercisesResolver';
import {
  createWorkout,
  CreateWorkoutInput
} from 'src/resolvers/WorkoutsResolvers';
import { array, object, string } from 'yup';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { Modal, Props as ModalProps } from '../ui/Modal';
import { Select } from '../ui/Select';
import { SubmitButton } from '../ui/SubmitButton';

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

interface Exercise extends ExerciseType {
  id: string;
}

const createWorkoutSchema = object().shape({
  name: string().trim().required('Ingrese el nombre.'),
  exercises: array()
    .of(object().nullable().required('Seleccione un ejercicio.'))
    .min(1, 'Seleccione al menos un ejercicio.')
});

export function CreateWorkoutModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (input: CreateWorkoutInput) => createWorkout(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('workouts');
        form.reset();
        onClose();
      },
      onError: (error: AxiosError) => {
        setError(error?.response?.data);
      }
    }
  );

  const { data, isLoading } = useQuery<{ exercises: Exercise[] }>(
    'exercises',
    () => getExercises(),
    {
      onError: (err: AxiosError) => {
        setError(err?.response?.data);
      }
    }
  );

  const exerciseOptions = useMemo(() => {
    if (data && data.exercises) {
      return data.exercises.map((exercise) => ({
        value: exercise.id,
        label: exercise.name,
        type: exercise.type,
        muscleGroup: exercise.muscleGroup
      }));
    }

    return [];
  }, [data]);

  const form = useYupForm({
    schema: createWorkoutSchema,
    defaultValues: {
      name: '',
      exercises: [{}]
    }
  });
  const [error, setError] = useState('');

  const exercises = useFieldArray({
    control: form.control,
    name: 'exercises'
  });

  async function onSubmit(values: FieldValues) {
    await createMutation.mutateAsync({
      name: values.name,
      exercises: values.exercises.map(
        (exercise: { value: string }) => exercise.value
      )
    });
  }

  return (
    <Modal title='Crear Entrenamiento' open={open} onClose={onClose}>
      <Form form={form} onSubmit={onSubmit}>
        <Message
          type='error'
          title='Ocurrio un error al tratar de obtener los ejercicios.'
          text={error}
        />

        <Input {...form.register('name')} label='Nombre' />

        <div className='flex flex-col space-y-1'>
          <h3 className='text-lg'>Ejercicios</h3>

          <div className='flex flex-col space-y-4'>
            {exercises.fields.map((field, index) => (
              <div key={field.id} className='flex items-center space-x-2'>
                <div className='w-full'>
                  <Select
                    {...form.register(`exercises.${index}`)}
                    hideLabel
                    options={exerciseOptions}
                    label='Ejercicio'
                  />
                </div>

                {exercises.fields.length > 1 && (
                  <button
                    className='p-2.5 rounded-full hover:bg-brand-100'
                    onClick={() => exercises.remove(index)}
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
          onClick={() => exercises.append({ value: '', label: '' })}
        >
          <div className='py-2 flex items-center justify-center space-x-2 text-brand-600'>
            <PlusIcon className='w-4 h-4' />
            <span>Añadir un ejercicio más</span>
          </div>
        </button>

        <SubmitButton>Crear Entrenamiento</SubmitButton>
      </Form>
    </Modal>
  );
}
