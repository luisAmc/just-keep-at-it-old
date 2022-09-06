import { gql, useMutation } from '@apollo/client';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ExerciseType } from '@prisma/client';
import { useRouter } from 'next/router';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { Form, useZodForm } from '../../shared/Form';
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables
} from './__generated__/index.generated';
import { Page } from 'src/components/shared/Page';
import { Button } from 'src/components/shared/Button';
import { Heading } from 'src/components/shared/Heading';
import { CreateExerciseForm, CreateExerciseSchema } from './CreateExerciseForm';

export function CreateExercise() {
  const router = useRouter();

  const form = useZodForm({
    schema: CreateExerciseSchema,
    defaultValues: {
      type: ExerciseType.AEROBIC
    }
  });

  const [createExercise, { error }] = useMutation<
    CreateExerciseMutation,
    CreateExerciseMutationVariables
  >(
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
    <Page>
      <div className='h-full flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <Button href='/' className=''>
            <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
              <ChevronLeftIcon className='w-4 h-4' />
            </div>
          </Button>

          <Heading>Crear ejercicio</Heading>
        </div>

        <Form
          form={form}
          onSubmit={(input) =>
            createExercise({
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
            })
          }
        >
          <ErrorMessage title='Ocurrió un error...' error={error} />

          <CreateExerciseForm />
        </Form>
      </div>
    </Page>
  );
}
