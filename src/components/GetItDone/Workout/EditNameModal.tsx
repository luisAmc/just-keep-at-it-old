import { Form, useZodForm } from 'src/components/shared/Form';
import { gql, useMutation } from '@apollo/client';
import { Input } from 'src/components/shared/Input';
import { Modal, ModalProps } from 'src/components/shared/Modal';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useWorkoutContext } from './WorkoutContext';
import { z } from 'zod';
import {
  EditNameModalMutation,
  EditNameModalMutationVariables
} from './__generated__/EditNameModal.generated';

const EditNameSchema = z.object({
  name: z.string().min(1, 'Ingrese el nuevo nombre.')
});

export function EditNameModal({ open, onClose }: ModalProps) {
  const workout = useWorkoutContext();

  const form = useZodForm({
    schema: EditNameSchema,
    defaultValues: { name: workout.name }
  });

  const [editWorkout] = useMutation<
    EditNameModalMutation,
    EditNameModalMutationVariables
  >(
    gql`
      mutation EditNameModalMutation($input: EditWorkoutInput!) {
        editWorkout(input: $input) {
          id
          name
        }
      }
    `,
    {
      onCompleted(data) {
        workout.setName(data.editWorkout.name);
        onClose();
      }
    }
  );

  return (
    <Modal open={open} onClose={onClose} title='Editar nombre'>
      <Form
        form={form}
        onSubmit={async (input) =>
          await editWorkout({
            variables: {
              input: {
                workoutId: workout.id,
                name: input.name
              }
            }
          })
        }
      >
        <Input {...form.register('name')} label='Nuevo nombre' hideLabel />

        <SubmitButton>Editar</SubmitButton>
      </Form>
    </Modal>
  );
}
