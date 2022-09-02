import { Modal, ModalProps } from 'src/components/shared/Modal';
import { PlusIcon } from '@heroicons/react/outline';
import { query as ExercisesQuery } from '../CreateWorkout';
import { SelectExercise } from '../CreateWorkout/SelectExercise';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useExercises } from 'src/utils/useExercises';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Form, useZodForm } from 'src/components/shared/Form';
import { object, string } from 'zod';
import {
  AddExerciseToWorkoutMutation,
  AddExerciseToWorkoutMutationVariables
} from './__generated__/AddExerciseModal.generated';
import { useRouter } from 'next/router';

const AddExerciseSchema = object({
  exercise: object(
    {
      label: string(),
      value: string()
    },
    { required_error: 'Seleccione una opción.' }
  )
});

interface Props extends Omit<ModalProps, 'title' | 'children'> {
  onConfirm: () => void;
}

export function AddExerciseModal({ open, onClose, onConfirm }: Props) {
  const router = useRouter();

  // TODO: Add loading state (shimmer)
  const { data, loading } = useQuery(ExercisesQuery);

  const [commit] = useMutation<
    AddExerciseToWorkoutMutation,
    AddExerciseToWorkoutMutationVariables
  >(
    gql`
      mutation AddExerciseToWorkoutMutation(
        $input: AddExerciseToWorkoutInput!
      ) {
        addExerciseToWorkout(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        onConfirm();
        onClose();
      }
    }
  );

  const form = useZodForm({ schema: AddExerciseSchema });

  const exercises = useExercises(data?.viewer?.exercises);

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Modal title='Añadir un ejercicio más' open={open} onClose={handleClose}>
      <Form
        form={form}
        onSubmit={(input) => {
          commit({
            variables: {
              input: {
                workoutId: router.query.workoutId as string,
                exerciseId: input.exercise.value
              }
            }
          });
        }}
      >
        <SelectExercise name='exercise' options={exercises} />

        <SubmitButton variant='secondary'>
          <PlusIcon className='w-4 h-4 mr-1' />
          <span>Añadir ejercicio</span>
        </SubmitButton>
      </Form>
    </Modal>
  );
}
