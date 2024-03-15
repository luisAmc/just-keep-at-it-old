import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { object, string } from 'zod';
import { Form, useZodForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { useModal } from '../shared/Modal';
import { Page } from '../shared/Page';
import { SubmitButton } from '../shared/SubmitButton';
import {
  EditExerciseMutation,
  EditExerciseMutationVariables,
  EditExerciseQuery
} from './__generated__/EditExercise.generated';
import { EXERCISES_QUERY } from '.';

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

  // TODO: Add loading state
  const { loading } = useQuery<EditExerciseQuery>(query, {
    variables: { id: router.query.exerciseId },
    skip: !router.isReady,
    onCompleted(data) {
      if (data) {
        form.reset({ name: data.exercise.name });
      }
    }
  });

  const [editExercise] = useMutation<
    EditExerciseMutation,
    EditExerciseMutationVariables
  >(
    gql`
      mutation EditExerciseMutation($input: EditExerciseInput!) {
        editExercise(input: $input) {
          id
        }
      }
    `,
    {
      refetchQueries: [EXERCISES_QUERY],
      onCompleted() {
        router.replace('/exercises');
      }
    }
  );

  const form = useZodForm({ schema: EditExerciseSchema });

  return (
    <>
      <Page title="Editar ejercicio" href="/exercises">
        <Form
          form={form}
          onSubmit={async (input) =>
            await editExercise({
              variables: {
                input: {
                  exerciseId: router.query.exerciseId as string,
                  name: input.name
                }
              }
            })
          }
        >
          <Input {...form.register('name')} label="Nombre" />

          <SubmitButton>Editar</SubmitButton>
        </Form>
      </Page>

      {/* <Page>
        <Heading size='lg'>¿Eliminar el ejercicio?</Heading>

        <Button variant='danger'>
          <TrashIcon className='w-4 h-4 mr-1' />
          Si, eliminar este ejercicio
        </Button>
      </Page> */}
    </>
  );
}
