import { PlusIcon } from '@heroicons/react/outline';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useQuery } from 'react-query';
import { ExerciseType } from 'src/models/Exercise';
import {
  getExercises,
  EXERCISE_TYPE,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { Modal, Props as ModalProps } from '../ui/Modal';
import { Pill } from '../ui/Pill';
import { Select } from '../ui/Select';
import { SubmitButton } from '../ui/SubmitButton';

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

interface Exercise extends ExerciseType {
  id: string;
}

export function CreateWorkoutModal({ open, onClose }: Props) {
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
    schema: null,
    defaultValues: {
      exercises: [
        {
          value: '',
          label: '',
          type: '',
          muscleGroup: ''
        }
      ]
    }
  });
  const [error, setError] = useState('');

  const exercises = useFieldArray({
    control: form.control,
    name: 'exercises'
  });

  return (
    <Modal title='Crear Entrenamiento' open={open} onClose={onClose}>
      <Form form={form} onSubmit={() => {}}>
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
              <div key={field.id}>
                <Select
                  {...form.register(`exercise.${index}.name`)}
                  hideLabel
                  options={exerciseOptions}
                  label='Ejercicio'
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className='w-full  border  border-dashed border-brand-600 rounded-lg hover:bg-brand-50/40 hover:border-brand-500'
          onClick={() => exercises.append({ value: '', label: '' })}
        >
          <div className='px-6 py-3 flex items-center justify-center space-x-2 text-brand-600'>
            <PlusIcon className='w-4 h-4' />
            <span>Añadir un ejercicio más</span>
          </div>
        </button>

        <SubmitButton>Crear Entrenamiento</SubmitButton>
      </Form>
    </Modal>
  );
}

type CustomOptionLabelProps = {
  label: string;
  value: string;
  type: EXERCISE_TYPE;
  muscleGroup: MUSCLE_GROUP;
};

function CustomOptionLabel({
  label,
  value,
  type,
  muscleGroup
}: CustomOptionLabelProps) {
  return (
    <div className='flex items-center space-x-4 px-4 py-2'>
      <Pill text={type === EXERCISE_TYPE.AEROBIC ? 'Aerobico' : 'Fuerza'} />
      <div>{label}</div>
      <div>{muscleGroup}</div>
    </div>
  );
}
