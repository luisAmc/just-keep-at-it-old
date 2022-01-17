import { Chips } from '../ui/Chips';
import { Container } from '../ui/Container';
import { CreateExerciseMutation } from './__generated__/CreateExerciseMutation.graphql';
import { ErrorMessage } from '../ui/ErrorMessage';
import { ExerciseType, MuscleGroup } from '@prisma/client';
import { FieldValues, useWatch } from 'react-hook-form';
import { Form, useYupForm } from '../ui/Form';
import { graphql, useMutation } from 'relay-hooks';
import { Input } from '../ui/Input';
import { object, string } from 'yup';
import { RadioButton, RadioGroup } from '../ui/RadioButton';
import { SubmitButton } from '../ui/SubmitButton';
import { useRouter } from 'next/router';

const createExerciseSchema = object().shape({
  name: string().trim().required('Ingrese el nombre.'),
  type: string().trim().required('Seleccione el tipo.'),
  muscleGroup: string().when('type', {
    is: (type: string) => type === ExerciseType.STRENGTH,
    then: string().trim().required('Seleccione una opción.')
  })
});

export function CreateExercise() {
  const router = useRouter();

  const [createExercise, createExerciseResult] =
    useMutation<CreateExerciseMutation>(
      graphql`
        mutation CreateExerciseMutation($input: CreateExerciseInput!) {
          createExercise(input: $input) {
            exercise {
              ...Exercises_exercise
            }
          }
        }
      `,
      {
        updater(store) {
          const exercise = store
            .getRootField('createExercise')
            .getLinkedRecord('exercise');

          const exercises = store.getRoot()?.getLinkedRecords('exercises');

          exercises?.unshift(exercise);

          store.getRoot().setLinkedRecords(exercises, 'exercises');
        },
        onCompleted() {
          router.push('/exercises');
        }
      }
    );

  const form = useYupForm({
    schema: createExerciseSchema,
    defaultValues: { name: '', type: '', muscleGroup: '' }
  });

  async function onSubmit(values: FieldValues) {
    createExercise({
      variables: {
        input: {
          name: values.name,
          type: values.type,
          muscleGroup:
            values.type === ExerciseType.STRENGTH
              ? values.muscleGroup
              : undefined
        }
      }
    });
  }

  const selectedType = useWatch({ control: form.control, name: 'type' });

  return (
    <Container href='/exercises' title='Crear Ejercicio' size='xl'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de crear el ejercicio.'
          error={createExerciseResult.error}
        />

        <Input {...form.register('name')} label='Nombre' />

        <RadioGroup name='type' label='¿Cúal será el tipo?'>
          <RadioButton
            label='Aerobico'
            description='Ejercicios para estimular la actividad cardiaca y pulmonar, pueden ser realizados por un periodo extenso de tiempo.'
            value={ExerciseType.AEROBIC}
          />
          <RadioButton
            label='Fuerza'
            description='Ejercicios para fortalecer los músculos y aumentar su resistencia, normalmente ejecutados en grupos de repeticiones.'
            value={ExerciseType.STRENGTH}
          />
        </RadioGroup>

        {selectedType === ExerciseType.STRENGTH && (
          <Chips
            single
            label='¿Que grupos musculares trabajarán?'
            name='muscleGroup'
            options={[
              { label: 'Brazos', value: MuscleGroup.ARMS },
              { label: 'Pecho', value: MuscleGroup.CHEST },
              { label: 'Espalda', value: MuscleGroup.BACK },
              { label: 'Piernas', value: MuscleGroup.LEGS },
              { label: 'Hombros', value: MuscleGroup.SHOULDERS }
            ]}
          />
        )}

        <SubmitButton>Crear Ejercicio</SubmitButton>
      </Form>
    </Container>
  );
}
