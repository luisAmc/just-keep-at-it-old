import { gql, useMutation, useQuery } from '@apollo/client';
import {
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { ExerciseFragment, EXERCISES_QUERY } from '../Exercises';
import {
  ExercisesQuery,
  Exercise_ExerciseCategory
} from '../Exercises/__generated__/index.generated';
import { Button, buttonStyles } from '../shared/Button';
import { FieldError, Form, useZodForm } from '../shared/Form';
import { Heading } from '../shared/Heading';
import { Input } from '../shared/Input';
import { SubmitButton } from '../shared/SubmitButton';
import { SelectExercise } from './SelectExercise';
import {
  CreateTemplateMutation,
  CreateTemplateMutationVariables
} from './__generated__/CreateTemplate.generated';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const query = gql`
  query CreateTemplateQuery {
    viewer {
      id
      exercises {
        ...Exercise_exercise
      }
    }
  }
  ${ExerciseFragment}
`;

const CreateTemplateSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  exercises: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  )
});

export function CreateTemplate() {
  const router = useRouter();

  const { data, loading } = useQuery<ExercisesQuery>(EXERCISES_QUERY);

  const exercises = useExercises(data?.viewer?.exerciseCategories);

  const form = useZodForm({
    schema: CreateTemplateSchema,
    defaultValues: {
      exercises: [{ label: '', value: '' }]
    }
  });

  const exercisesFields = useFieldArray({
    control: form.control,
    name: 'exercises'
  });

  function addExercise() {
    exercisesFields.append({ value: '', label: '' });
  }

  function removeExercise(index: number) {
    exercisesFields.remove(index);
  }

  const [createWorkoutTemplate] = useMutation<
    CreateTemplateMutation,
    CreateTemplateMutationVariables
  >(
    gql`
      mutation CreateTemplateMutation($input: CreateWorkoutTemplateInput!) {
        createWorkoutTemplate(input: $input) {
          id
        }
      }
    `,
    {
      refetchQueries: ['TemplatesQuery'],
      onCompleted() {
        router.push(`/templates`);
      }
    }
  );

  async function onSubmit(input: z.infer<typeof CreateTemplateSchema>) {
    await createWorkoutTemplate({
      variables: {
        input: {
          name: input.name,
          exercises: input.exercises.map((exercise, i) => ({
            exerciseIndex: i,
            exerciseId: exercise.value
          }))
        }
      }
    });
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button href="/templates" className="">
          <div className="flex items-center justify-center rounded-full bg-brand-300 p-2 text-brand-700">
            <ChevronLeftIcon className="h-4 w-4" />
          </div>
        </Button>

        <Heading>Crear boceto</Heading>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <Input {...form.register('name')} label="Nombre" />

        <label>
          <div>Ejercicios</div>

          {exercisesFields.fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="w-full">
                <SelectExercise
                  name={`exercises.${index}`}
                  options={exercises}
                />
              </div>

              {exercisesFields.fields.length > 1 && (
                <div>
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className={twMerge(
                      clsx(
                        buttonStyles({ variant: 'ghost' }),
                        'inline-block rounded-full p-0.5'
                      )
                    )}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          <FieldError name="exercises" />
        </label>

        <Button onClick={addExercise} variant="outline">
          <PlusIcon className="mr-1 h-4 w-4" />
          <span>Añadir uno más</span>
        </Button>

        <SubmitButton>Ingresar</SubmitButton>
      </Form>
    </>
  );
}

function useExercises(categories: Exercise_ExerciseCategory[] | undefined) {
  if (!categories || !categories.length) return [];

  const exercises: Array<{ label: string; value: string; category: string }> =
    [];

  for (const category of categories) {
    exercises.push(
      ...category.exercises.map((exercise) => ({
        value: exercise.id,
        label: exercise.name,
        category: category.name
      }))
    );
  }

  return exercises;
}
