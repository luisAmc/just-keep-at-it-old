import { gql, useMutation } from '@apollo/client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from 'src/components/shared/Button';
import { ErrorMessage } from 'src/components/shared/ErrorMessage';
import { Form, useZodForm } from 'src/components/shared/Form';
import { Input } from 'src/components/shared/Input';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { z } from 'zod';
import { ExerciseCategoryFragment, ExerciseFragment } from '..';
import { useExerciseCategoryContext } from './useExerciseCategoryContext';
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables
} from './__generated__/CreateExercise.generated';

export const CreateExerciseSchema = z.object({
  name: z.string().trim().min(1, 'Ingrese el nombre.')
});

interface CreateExerciseProps {
  onClose: () => void;
}

export function CreateExercise({ onClose }: CreateExerciseProps) {
  const category = useExerciseCategoryContext();
  const form = useZodForm({ schema: CreateExerciseSchema });

  const [createExercise, { error }] = useMutation<
    CreateExerciseMutation,
    CreateExerciseMutationVariables
  >(
    gql`
      mutation CreateExerciseMutation($input: CreateExerciseInput!) {
        createExercise(input: $input) {
          id
          category {
            ...Exercise_exerciseCategory
          }
        }
      }
      ${ExerciseCategoryFragment}
      ${ExerciseFragment}
    `,
    {
      onCompleted() {
        onClose();
      }
    }
  );

  return (
    <Form
      form={form}
      onSubmit={async (input) =>
        createExercise({
          variables: {
            input: {
              name: input.name,
              categoryId: category.id
            }
          }
        })
      }
    >
      <div className='flex flex-col space-y-2 p-2'>
        <ErrorMessage title='Ocurrió un error...' error={error} />

        <Input autoFocus {...form.register('name')} label='Nombre' hideLabel />

        <div className='flex gap-x-2'>
          <SubmitButton>Añadir</SubmitButton>

          <Button variant='secondary' onClick={onClose}>
            <XMarkIcon className='w-4 h-4 mr-1' />
            Cancelar
          </Button>
        </div>
      </div>
    </Form>
  );
}
