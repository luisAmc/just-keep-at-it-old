import {
  ChevronUpIcon,
  PlusCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseCategoryType } from '../Workout/WorkoutUtils';
import { WorkoutExercise_Exercise } from '../Workout/__generated__/WorkoutExercise.generated';
import { Button } from 'src/components/shared/Button';
import { useState } from 'react';
import { Form, useZodForm } from 'src/components/shared/Form';
import { z } from 'zod';
import clsx from 'clsx';
import { Input } from 'src/components/shared/Input';
import { useFormContext } from 'react-hook-form';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { gql, useMutation } from '@apollo/client';
import {
  ExerciseCategoryCreateMutation,
  ExerciseCategoryCreateMutationVariables
} from './__generated__/ExerciseCategory.generated';
import { ExerciseFragment } from '../Workout/WorkoutExercise';
import { AddExerciseSlideOverQuery_query } from '.';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
  category: ExerciseCategoryType;
  onClick(exercise: WorkoutExercise_Exercise): void;
}

const CreateNewExerciseForm = z.object({
  name: z.string().min(1, 'Ingrese el nombre.')
});

export function ExerciseCategory({ category, onClick }: Props) {
  const [creating, setCreating] = useState(false);
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  const form = useZodForm({ schema: CreateNewExerciseForm });

  const [createExercise] = useMutation<
    ExerciseCategoryCreateMutation,
    ExerciseCategoryCreateMutationVariables
  >(
    gql`
      mutation ExerciseCategoryCreateMutation($input: CreateExerciseInput!) {
        createExercise(input: $input) {
          ...WorkoutExercise_exercise
        }
      }
      ${ExerciseFragment}
    `,
    {
      update(cache, { data }) {
        if (!data?.createExercise) return;

        cache.modify({
          fields: {
            exercises(existingExercises = []) {
              console.log({ existingExercises });
              return [data.createExercise, ...existingExercises];
            }
          }
        });
      },
      onCompleted() {
        form.reset();
      },
      refetchQueries: [AddExerciseSlideOverQuery_query]
    }
  );

  return (
    <div>
      <Form
        form={form}
        // onSubmit={(input) => {
        //   createExercise({
        //     variables: {
        //       input: {
        //         name: input.name,
        //         type:
        //           category.id === ExerciseType.AEROBIC
        //             ? ExerciseType.AEROBIC
        //             : ExerciseType.STRENGTH,
        //         muscleGroup:
        //           category.id === ExerciseType.AEROBIC ? undefined : category.id
        //       }
        //     }
        //   });
        // }}
        onSubmit={() => {}}
      >
        <Disclosure>
          {({ open }) => (
            <>
              <div>
                <Disclosure.Button
                  className={clsx(
                    'w-full px-4 py-3 rounded-t-lg hover:opacity-60',
                    open ? 'bg-white/5' : 'bg-black/20 rounded-b-lg'
                  )}
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-medium'>{category.name}</span>

                    <ChevronUpIcon
                      className={clsx('w-4 h-4', open && 'rotate-180')}
                    />
                  </div>
                </Disclosure.Button>
              </div>

              <Disclosure.Panel
                as='div'
                ref={animateParent}
                className='p-1 flex flex-col space-y-1 bg-black/5 rounded-b-lg'
              >
                {category.exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    type='button'
                    onClick={() => onClick(exercise)}
                    className='text-left p-3 rounded-lg hover:bg-black/5'
                  >
                    {exercise.name}
                  </button>
                ))}

                {creating ? (
                  <CreateExercise close={() => setCreating(false)} />
                ) : (
                  <Button variant='secondary' onClick={() => setCreating(true)}>
                    <PlusCircleIcon className='w-4 h-4 mr-1' />
                    Añadir uno nuevo
                  </Button>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Form>
    </div>
  );
}

interface CreateExerciseProps {
  close: () => void;
}

function CreateExercise({ close }: CreateExerciseProps) {
  const form = useFormContext();

  return (
    <div className='flex flex-col space-y-2'>
      <Input autoFocus {...form.register('name')} label='Nombre' hideLabel />

      <div className='flex gap-x-2'>
        <SubmitButton>Añadir</SubmitButton>
        <Button variant='secondary' onClick={close}>
          <XMarkIcon className='w-4 h-4 mr-1' />
          Cancelar
        </Button>
      </div>
    </div>
  );
}
