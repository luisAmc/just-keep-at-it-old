import { gql, useMutation, useQuery } from '@apollo/client';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { ExerciseInfoFragment } from '../Exercises';
import { useExercises } from '../Exercises/useExercises';
import { Button } from '../shared/Button';
import { FieldError, Form, useZodForm } from '../shared/Form';
import { Heading } from '../shared/Heading';
import { Input } from '../shared/Input';
import { Page } from '../shared/Page';
import { SubmitButton } from '../shared/SubmitButton';
import { SelectExercise } from '../Workouts/CreateWorkout/SelectExercise';
import {
  CreateTemplateMutation,
  CreateTemplateMutationVariables,
  CreateTemplateQuery
} from './__generated__/CreateTemplate.generated';

export const query = gql`
  query CreateTemplateQuery {
    viewer {
      id
      exercises {
        ...Exercise_exercise
      }
    }
  }
  ${ExerciseInfoFragment}
`;

export function CreateTemplate() {
  const router = useRouter();

  const { data } = useQuery<CreateTemplateQuery>(query);
  const exercises = useExercises(data?.viewer?.exercises);

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
      update(cache, { data }) {
        if (!data?.createWorkoutTemplate) return;

        cache.modify({
          fields: {
            workoutTemplates(existingTemplates = []) {
              return [data.createWorkoutTemplate, ...existingTemplates];
            }
          }
        });
      },
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
          exercises: input.exercises.map((exercise) => ({
            exerciseId: exercise.value
          }))
        }
      }
    });
  }

  return (
    <Page>
      <div className='flex items-center space-x-2'>
        <Button href='/templates' className=''>
          <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
            <ChevronLeftIcon className='w-4 h-4' />
          </div>
        </Button>

        <Heading>Crear boceto</Heading>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <Input {...form.register('name')} label='Nombre' />

        <label>
          <div>Ejercicios</div>

          {exercisesFields.fields.map((field, index) => (
            <div key={field.id} className='flex items-center space-x-2'>
              <div className='w-full'>
                <SelectExercise
                  name={`exercises.${index}`}
                  options={exercises}
                />
              </div>

              {exercisesFields.fields.length > 1 && (
                <Button
                  className='p-2.5 rounded-full bg-slate-700 text-slate-300'
                  onClick={() => removeExercise(index)}
                >
                  <TrashIcon className='w-4 h-4' />
                </Button>
              )}
            </div>
          ))}

          <FieldError name='exercises' />
        </label>

        <Button onClick={addExercise} variant='dashed' color='secondary'>
          <PlusIcon className='w-4 h-4 mr-1' />
          <span>Añadir uno más</span>
        </Button>

        <SubmitButton>
          <CheckCircleIcon className='w-4 h-4 mr-1' />
          <span>Ingresar</span>
        </SubmitButton>
      </Form>
    </Page>
  );
}

const CreateTemplateSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  exercises: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  )
});
