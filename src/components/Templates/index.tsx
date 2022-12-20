import { gql, useMutation, useQuery } from '@apollo/client';
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ExerciseInfoFragment } from '../Exercises';
import { Button } from '../shared/Button';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { Heading } from '../shared/Heading';
import { useModal } from '../shared/Modal';
import { Page } from '../shared/Page';
import {
  TemplatesMutation,
  TemplatesMutationVariables,
  TemplatesQuery
} from './__generated__/index.generated';

export const TemplateFragment = gql`
  fragment Templates_template on WorkoutTemplate {
    id
    name
    exercises {
      exercise {
        ...Exercise_exercise
      }
    }
  }
  ${ExerciseInfoFragment}
`;

export const query = gql`
  query TemplatesQuery {
    viewer {
      id
      workoutTemplates {
        ...Templates_template
      }
    }
  }
  ${TemplateFragment}
`;

export function Templates() {
  const router = useRouter();

  const { data } = useQuery<TemplatesQuery>(query);

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const startFromTemplateModal = useModal();

  const [startWorkoutFromTemplate] = useMutation<
    TemplatesMutation,
    TemplatesMutationVariables
  >(
    gql`
      mutation TemplatesMutation($id: ID!) {
        startWorkoutFromTemplate(id: $id) {
          id
        }
      }
    `,
    {
      update(cache, { data }) {
        if (!data?.startWorkoutFromTemplate) return;

        cache.modify({
          fields: {
            workouts(existingWorkouts = []) {
              return [data.startWorkoutFromTemplate, ...existingWorkouts];
            }
          }
        });
      },
      onCompleted(data) {
        router.push(
          `/workouts/${data.startWorkoutFromTemplate.id}/get-it-done`
        );
      }
    }
  );

  const templates = data?.viewer?.workoutTemplates ?? [];

  return (
    <Page>
      <div className='flex items-center space-x-2'>
        <Button href='/' className=''>
          <div className='rounded-full bg-brand-300 text-brand-700 p-2 flex items-center justify-center'>
            <ChevronLeftIcon className='w-4 h-4' />
          </div>
        </Button>

        <Heading>Bocetos</Heading>
      </div>

      <Button href='/templates/create'>
        <PlusCircleIcon className='w-4 h-4 mr-1' />
        <span>Crear un boceto nuevo</span>
      </Button>

      {templates.length > 0 ? (
        templates.map((template) => (
          <button
            key={template.id}
            type='button'
            className='bg-slate-700 hover:bg-opacity-50 px-5 py-4 rounded-md'
            onClick={() => {
              setSelectedTemplateId(template.id);
              startFromTemplateModal.open();
            }}
          >
            <div className='flex items-center justify-between'>
              <Heading size='lg'>{template.name}</Heading>
            </div>

            <div className='text-slate-400'>
              {template.exercises.map(({ exercise }, i) => (
                <div key={exercise.id} className='flex items-center space-x-2'>
                  <span className='text-sm'>{exercise.name}</span>
                </div>
              ))}
            </div>
          </button>
        ))
      ) : (
        <div className='bg-slate-700 divide-slate-700 rounded-lg flex flex-col px-4 py-4'>
          <div className='flex flex-col items-center space-y-4 py-12 rounded-md text-slate-500'>
            <SparklesIcon className='w-10 h-10' />
            <p className='font-semibold text-sm'>
              No hay bocetos creados hasta el momento...
            </p>
          </div>
        </div>
      )}

      <ConfirmationModal
        {...startFromTemplateModal.props}
        type='warning'
        onConfirm={() => {
          startWorkoutFromTemplate({
            variables: {
              id: selectedTemplateId
            }
          });
        }}
      >
        ¿Comenzar una rutina apartir de este boceto?
      </ConfirmationModal>
    </Page>
  );
}
