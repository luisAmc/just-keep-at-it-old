import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../shared/ErrorMessage';
import { Form, useZodForm } from '../shared/Form';
import { gql, useMutation } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { Input } from 'src/components/shared/Input';
import { Page } from 'src/components/shared/Page';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useRouter } from 'next/router';
import { z } from 'zod';

export const CreateExerciseSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre.'),
  type: z.string().min(1, 'Selecione la categoría.')
});

export function CreateExercise() {
  const router = useRouter();

  const form = useZodForm({ schema: CreateExerciseSchema });

  const [createExercise, { error }] = useMutation(
    gql`
      mutation CreateExerciseMutation($input: CreateExerciseInput!) {
        createExercise(input: $input) {
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
    <Page href='/' title='Crear ejercicio'>
      <div className='h-full flex flex-col space-y-4'>
        <Form
          form={form}
          onSubmit={(input) =>
            createExercise({
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

          <Input {...form.register('name')} label='Nombre' />

          {/* TODO: select exercise category. Radio buttons? */}

          <SubmitButton>Crear Ejercicio</SubmitButton>
        </Form>
      </div>
    </Page>
  );
}
