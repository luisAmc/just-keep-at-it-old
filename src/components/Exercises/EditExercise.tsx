import { gql, useQuery } from '@apollo/client';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { object, string } from 'zod';
import { Button } from '../shared/Button';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { Form, useZodForm } from '../shared/Form';
import { Heading } from '../shared/Heading';
import { Input } from '../shared/Input';
import { useModal } from '../shared/Modal';
import { Page } from '../shared/Page';
import { SubmitButton } from '../shared/SubmitButton';
import { EditExerciseQuery } from './__generated__/EditExercise.generated';

export const query = gql`
  query EditExerciseQuery($id: ID!) {
    exercise(id: $id) {
      name
    }
  }
`;

const EditExerciseSchema = object({
  name: string().min(1, 'Ingrese el nombre.')
});

export function EditExercise() {
  const router = useRouter();
  const deleteModal = useModal();

  const { data, loading } = useQuery<EditExerciseQuery>(query, {
    variables: { id: router.query.exerciseId },
    skip: !router.isReady,
    onCompleted(data) {
      if (data) {
        form.reset({ name: data.exercise.name });
      }
    }
  });

  const form = useZodForm({ schema: EditExerciseSchema });

  return (
    <div>
      <div>
        <Page>
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center space-x-2'>
              <Button href='/exercises' className=''>
                <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
                  <ChevronLeftIcon className='w-4 h-4' />
                </div>
              </Button>

              <Heading>Editar ejercicio</Heading>
            </div>

            <Form form={form} onSubmit={() => {}}>
              <Input {...form.register('name')} label='Nombre' />

              <SubmitButton>Editar</SubmitButton>
            </Form>
          </div>
        </Page>
      </div>

      <div>
        <Page>
          <Heading size='xl'>Eliminar ejercicio</Heading>

          <Button color='danger' onClick={deleteModal.open}>
            <TrashIcon className='w-4 h-4 mr-1' />
            Eliminar
          </Button>

          <ConfirmationModal {...deleteModal.props} onConfirm={() => {}}>
            ¿Está seguro de eliminar este ejercicio?
          </ConfirmationModal>
        </Page>
      </div>
    </div>
  );
}
