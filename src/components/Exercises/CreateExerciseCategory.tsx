import { ErrorMessage } from '../shared/ErrorMessage';
import { ExerciseType } from '@prisma/client';
import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation } from '@apollo/client';
import { Input } from 'src/components/shared/Input';
import { Page } from 'src/components/shared/Page';
import { RadioButtonGroup } from 'src/components/shared/RadioButton';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useRouter } from 'next/router';
import { z } from 'zod';
import {
  CreateExerciseCategoryMutation,
  CreateExerciseCategoryMutationVariables
} from './__generated__/CreateExerciseCategory.generated';

const CreateExerciseCategorySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre.'),
  type: z.string().min(1, 'Seleccione el tipo.')
});

export function CreateExerciseCategory() {
  const router = useRouter();

  const form = useZodForm({
    schema: CreateExerciseCategorySchema,
    defaultValues: {
      type: ''
    }
  });

  const [createCategory, { error }] = useMutation<
    CreateExerciseCategoryMutation,
    CreateExerciseCategoryMutationVariables
  >(
    gql`
      mutation CreateExerciseCategoryMutation(
        $input: CreateExerciseCategoryInput!
      ) {
        createExerciseCategory(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        router.push('/exercises');
      }
    }
  );

  return (
    <Page href='/exercises' title='Crear categoría'>
      <Form
        form={form}
        onSubmit={async (input) =>
          await createCategory({
            variables: {
              input: {
                name: input.name,
                type: input.type
              }
            }
          })
        }
      >
        <ErrorMessage title='Ocurrió un error...' error={error} />

        <Input
          {...form.register('name')}
          label='Ingrese el nombre'
          placeholder='Nombre...'
        />

        <RadioButtonGroup
          name='type'
          label='Seleccione el tipo de la categoría'
          options={[
            { label: 'Aerobico', value: ExerciseType.AEROBIC },
            { label: 'Fuerza', value: ExerciseType.STRENGTH }
          ]}
        />

        <SubmitButton>Crear categoría</SubmitButton>
      </Form>
    </Page>
  );
}
