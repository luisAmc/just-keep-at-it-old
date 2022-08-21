import { gql, useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ExerciseType, MuscleGroup } from '@prisma/client';
import { useRouter } from 'next/router';
import { useWatch } from 'react-hook-form';
import { object, string } from 'zod';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { ExerciseTypeSelector } from './ExerciseTypeSelector';
import { Form, useZodForm } from '../../shared/Form';
import { Input } from '../../shared/Input';
import { MuscleGroupSelector } from './MuscleGroupSelector';
import { SubmitButton } from '../../shared/SubmitButton';
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables
} from './__generated__/index.generated';
import { Page } from 'src/components/shared/Page';
import { Button } from 'src/components/shared/Button';
import { Heading } from 'src/components/shared/Heading';

const CreateExerciseSchema = object({
  name: string().min(1, 'Ingrese el nombre.'),
  type: string().min(1, 'Seccione el tipo.'),
  muscleGroup: string().optional()
}).refine(
  (data) => {
    const isStrength = data.type === ExerciseType.STRENGTH;
    const isMuscleGroupSelected = data.muscleGroup !== undefined;

    return (isStrength && isMuscleGroupSelected) || !isStrength;
  },
  {
    message: 'Seleccione el grupo múscular.',
    path: ['muscleGroup']
  }
);

export function CreateExercise() {
  const router = useRouter();

  const form = useZodForm({
    schema: CreateExerciseSchema,
    defaultValues: {
      type: ExerciseType.AEROBIC
    }
  });

  const type = useWatch({ name: 'type', control: form.control });

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
        <div className='flex items-center space-x-4'>
          <Button
            className='rounded-full bg-brand-300 text-brand-700 p-2'
            href='/exercises'
          >
            <ChevronLeftIcon className='w-4 h-4' />
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

          <Input {...form.register('name')} label='Nombre' />

          <ExerciseTypeSelector
            name='type'
            label='Tipo'
            options={[
              {
                label: 'Aerobico',
                description:
                  'Ejercicios para estimular la actividad cardiaca y pulmonar, pueden ser realizados por un periodo extenso de tiempo.',
                value: ExerciseType.AEROBIC
              },
              {
                label: 'Fuerza',
                description:
                  'Ejercicios para fortalecer los músculos y aumentar su resistencia, normalmente ejecutados en grupos de repeticiones.',
                value: ExerciseType.STRENGTH
              }
            ]}
          />

          <Transition
            show={type === ExerciseType.STRENGTH}
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <MuscleGroupSelector
              name='muscleGroup'
              label='Grupo múscular'
              options={[
                { label: 'Brazos', value: MuscleGroup.ARMS },
                { label: 'Espalda', value: MuscleGroup.BACK },
                { label: 'Pecho', value: MuscleGroup.CHEST },
                { label: 'Piernas', value: MuscleGroup.LEGS },
                { label: 'Hombros', value: MuscleGroup.SHOULDERS }
              ]}
            />
          </Transition>

          <div className='flex-auto'></div>

          <SubmitButton>
            <CheckCircleIcon className='w-4 h-4 mr-1' />
            <span>Crear Ejercicio</span>
          </SubmitButton>
        </Form>
      </div>
    </Page>

    // <div className='mt-6'>
    //   <Card title='Crear Ejercicio'>
    //     <Form
    //       form={form}
    //       onSubmit={(input) =>
    //         createExercise({
    //           variables: {
    //             input: {
    //               name: input.name,
    //               type: input.type,
    //               muscleGroup:
    //                 input.type === ExerciseType.STRENGTH
    //                   ? input.muscleGroup
    //                   : undefined
    //             }
    //           }
    //         })
    //       }
    //     >
    //       <ErrorMessage title='Error de creación' error={error} />

    //       <Input {...form.register('name')} label='Nombre' />

    //       <ExerciseTypeSelector
    //         name='type'
    //         label='Tipo'
    //         options={[
    //           {
    //             label: 'Aerobico',
    //             description:
    //               'Ejercicios para estimular la actividad cardiaca y pulmonar, pueden ser realizados por un periodo extenso de tiempo.',
    //             value: ExerciseType.AEROBIC
    //           },
    //           {
    //             label: 'Fuerza',
    //             description:
    //               'Ejercicios para fortalecer los músculos y aumentar su resistencia, normalmente ejecutados en grupos de repeticiones.',
    //             value: ExerciseType.STRENGTH
    //           }
    //         ]}
    //       />

    //       <Transition
    //         show={type === ExerciseType.STRENGTH}
    //         enter='transition-opacity duration-75'
    //         enterFrom='opacity-0'
    //         enterTo='opacity-100'
    //         leave='transition-opacity duration-150'
    //         leaveFrom='opacity-100'
    //         leaveTo='opacity-0'
    //       >
    //         <MuscleGroupSelector
    //           name='muscleGroup'
    //           label='Grupo múscular'
    //           options={[
    //             { label: 'Brazos', value: MuscleGroup.ARMS },
    //             { label: 'Espalda', value: MuscleGroup.BACK },
    //             { label: 'Pecho', value: MuscleGroup.CHEST },
    //             { label: 'Piernas', value: MuscleGroup.LEGS },
    //             { label: 'Hombros', value: MuscleGroup.SHOULDERS }
    //           ]}
    //         />
    //       </Transition>

    //       <SubmitButton>
    //         <CheckCircleIcon className='w-6 h-6 mr-1' />
    //         <span>Crear Ejercicio</span>
    //       </SubmitButton>
    //     </Form>
    //   </Card>
    // </div>
  );
}
