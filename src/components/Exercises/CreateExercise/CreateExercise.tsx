import { CategorySelector } from './CategorySelector';
import { CreateExerciseQuery } from './__generated__/CreateExercise.generated';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { ExerciseType } from '@prisma/client';
import { Form, useZodForm } from '../../shared/Form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Input } from 'src/components/shared/Input';
import { Page } from 'src/components/shared/Page';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';

export const CreateExerciseSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre.'),
  categoryId: z.string().min(1, 'Selecione la categoría.')
});

export function CreateExercise() {
  const router = useRouter();

  const { data, loading } = useQuery<CreateExerciseQuery>(gql`
    query CreateExerciseQuery {
      viewer {
        exerciseCategories {
          id
          name
          type
        }
      }
    }
  `);

  const categories = useMemo(() => {
    const categories = data?.viewer?.exerciseCategories ?? [];

    const aerobics = categories
      .filter((category) => category.type === ExerciseType.AEROBIC)
      .map((exercise) => ({ label: exercise.name, value: exercise.id }));

    const strengths = categories
      .filter((category) => category.type === ExerciseType.STRENGTH)
      .map((exercise) => ({ label: exercise.name, value: exercise.id }));

    return [
      { label: 'Aerobicos', options: aerobics },
      { label: 'Fuerza', options: strengths }
    ];
  }, [data?.viewer?.exerciseCategories]);

  const form = useZodForm({
    schema: CreateExerciseSchema,
    defaultValues: { categoryId: '' }
  });

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
    <Page href='/exercises' title='Crear ejercicio'>
      <div className='h-full flex flex-col space-y-4'>
        <Form
          form={form}
          onSubmit={(input) =>
            createExercise({
              variables: {
                input: {
                  name: input.name,
                  categoryId: input.categoryId
                }
              }
            })
          }
        >
          <ErrorMessage title='Ocurrió un error...' error={error} />

          <Input {...form.register('name')} label='Nombre' />

          <CategorySelector categories={categories} />

          {loading && <div>Cargando...</div>}

          <SubmitButton>Crear Ejercicio</SubmitButton>
        </Form>
      </div>
    </Page>
  );
}
