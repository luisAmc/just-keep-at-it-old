import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
  createExercise,
  CreateExerciseInput,
  EXERCISE_TYPE,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { object, string } from 'yup';
import { Chips } from '../ui/Chips';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { Modal, Props as ModalProps } from '../ui/Modal';
import { RadioButton, RadioGroup } from '../ui/RadioButton';
import { SubmitButton } from '../ui/SubmitButton';

const createExerciseSchema = object().shape({
  name: string().required('Ingrese el nombre.'),
  type: string().required('Seleccione el tipo.'),
  muscleGroup: string().when('type', {
    is: (type: string) => type === EXERCISE_TYPE.STRENGTH,
    then: string().required('Seleccione una opción.')
  })
});

interface Props extends Omit<ModalProps, 'title' | 'children'> {}

export function CreateExerciseModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (input: CreateExerciseInput) => createExercise(input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercises');
        form.reset();
        onClose();
      },
      onError: (error: AxiosError) => {
        setError(error?.response?.data);
      }
    }
  );

  const [error, setError] = useState('');

  const form = useYupForm({
    schema: createExerciseSchema,
    defaultValues: { name: '', type: '', muscleGroup: '' }
  });

  async function onSubmit(values: FieldValues) {
    await createMutation.mutateAsync({
      name: values.name,
      type: values.type,
      muscleGroup:
        values.type === EXERCISE_TYPE.STRENGTH ? values.muscleGroup : undefined
    });
  }

  const selectedType = useWatch({ control: form.control, name: 'type' });

  return (
    <Modal title='Crear Ejercicio' open={open} onClose={onClose}>
      <Form form={form} onSubmit={onSubmit}>
        <Message
          type='error'
          title='Ocurrio un error al tratar de crear el ejercicio.'
          text={error}
        />

        <Input {...form.register('name')} label='Nombre' />

        <RadioGroup name='type' label='¿Cúal será el tipo?'>
          <RadioButton
            label='Aerobico'
            description='Ejercicios para estimular la actividad cardiaca y pulmonar, pueden ser realizados por un periodo extenso de tiempo.'
            value={EXERCISE_TYPE.AEROBIC}
          />
          <RadioButton
            label='Fuerza'
            description='Ejercicios para fortalecer los músculos y aumentar su resistencia, normalmente ejecutados en grupos de repeticiones.'
            value={EXERCISE_TYPE.STRENGTH}
          />
        </RadioGroup>

        {selectedType === 'strength' && (
          <Chips
            single
            label='¿Que grupos musculares trabajarán?'
            name='muscleGroup'
            options={[
              { label: 'Brazos', value: MUSCLE_GROUP.ARMS },
              { label: 'Pecho', value: MUSCLE_GROUP.CHEST },
              { label: 'Espalda', value: MUSCLE_GROUP.BACK },
              { label: 'Piernas', value: MUSCLE_GROUP.LEGS },
              { label: 'Hombros', value: MUSCLE_GROUP.SHOULDERS }
            ]}
          />
        )}

        <SubmitButton>Crear Ejercicio</SubmitButton>
      </Form>
    </Modal>
  );
}
