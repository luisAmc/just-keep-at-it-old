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
  AddExerciseToWorkoutMutationVariables,
  AddNewExerciseMutation,
  AddNewExerciseMutationVariables
} from './__generated__/AddExerciseModal.generated';
import { useRouter } from 'next/router';
import { Button } from 'src/components/shared/Button';
import { useState } from 'react';
import {
  CreateExerciseForm,
  CreateExerciseSchema
} from 'src/components/Exercises/CreateExercise/CreateExerciseForm';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ExerciseType } from '@prisma/client';

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
  const { data, loading, refetch } = useQuery(ExercisesQuery);

  const [isCreatingExercise, setIsCreatingExercise] = useState(false);
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  const [addNewExerciseCommit] = useMutation<
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
        form.reset();
      }
    }
  );

  const [createNewExerciseCommit] = useMutation<
    AddNewExerciseMutation,
    AddNewExerciseMutationVariables
  >(
    gql`
      mutation AddNewExerciseMutation($input: CreateExerciseInput!) {
        createExercise(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        form.reset();
        refetch();
        setIsCreatingExercise(false);
      }
    }
  );

  const form = useZodForm({
    schema: isCreatingExercise ? CreateExerciseSchema : AddExerciseSchema
  });

  const exercises = useExercises(data?.viewer?.exercises);

  async function onSubmit(input: Record<string, any>) {
    if (isCreatingExercise) {
      createNewExerciseCommit({
        variables: {
          input: {
            name: input.name,
            type: input.type,
            muscleGroup:
              input.type === ExerciseType.STRENGTH
                ? input.muscleGroup
                : undefined
          }
        }
      });
    } else {
      addNewExerciseCommit({
        variables: {
          input: {
            workoutId: router.query.workoutId as string,
            exerciseId: input.exercise.value
          }
        }
      });
    }
  }

  function handleClose() {
    setIsCreatingExercise(false);
    form.reset();
    onClose();
  }

  return (
    <Modal title='Añadir un ejercicio más' open={open} onClose={handleClose}>
      <Form form={form} onSubmit={onSubmit}>
        <div ref={animateParent} className='flex flex-col space-y-4'>
          {isCreatingExercise ? (
            <CreateExerciseForm />
          ) : (
            <>
              <SelectExercise name='exercise' options={exercises} />

              <Button
                variant='dashed'
                color='secondary'
                onClick={() => setIsCreatingExercise(true)}
              >
                <p>¿El ejercicio no está en la lista?</p>
              </Button>

              <SubmitButton color='secondary'>
                <PlusIcon className='w-4 h-4 mr-1' />
                <span>Añadir ejercicio</span>
              </SubmitButton>
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
}
