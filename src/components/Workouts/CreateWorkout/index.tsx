import { Button } from 'src/components/shared/Button';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
} from './__generated__/index.generated';
import { ErrorMessage } from 'src/components/shared/ErrorMessage';
import { Form, useZodForm } from '../../shared/Form';
import { gql, useMutation } from '@apollo/client';
import { Heading } from 'src/components/shared/Heading';
import { Input } from '../../shared/Input';
import { Page } from 'src/components/shared/Page';
import { SubmitButton } from '../../shared/SubmitButton';
import { useRouter } from 'next/router';
import { z } from 'zod';

const CreateWorkoutSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre de la rutina.')
});

export function CreateWorkout() {
  const router = useRouter();

  const form = useZodForm({ schema: CreateWorkoutSchema });

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
      onCompleted(data) {
        router.push(`/workouts/${data.createWorkout.id}/get-it-done`);
      }
    }
  );

  async function onSubmit(input: z.infer<typeof CreateWorkoutSchema>) {
    await createWorkout({
      variables: {
        input: { name: input.name }
      }
    });
  }

  return (
    <Page>
      <div className='h-full flex flex-col space-y-6'>
        <div className='flex items-center space-x-2'>
          <Button href='/' className=''>
            <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
              <ChevronLeftIcon className='w-4 h-4' />
            </div>
          </Button>

          <Heading>Crear rutina</Heading>
        </div>

        <Form form={form} onSubmit={onSubmit}>
          <ErrorMessage title='Ocurrió un error...' error={error} />

          <Input {...form.register('name')} label='Nombre' />

          <SubmitButton>Comenzar</SubmitButton>
        </Form>
      </div>
    </Page>
  );
}
