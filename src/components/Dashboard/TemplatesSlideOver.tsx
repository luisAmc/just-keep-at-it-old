import { useMutation, useQuery } from '@apollo/client';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { Heading } from '../shared/Heading';
import { useModal } from '../shared/Modal';
import { SlideOver, SlideOverProps } from '../shared/SlideOver';
import { query, startWorkoutFromTemplateMutation } from '../Templates';
import {
  TemplatesMutation,
  TemplatesMutationVariables,
  TemplatesQuery
} from '../Templates/__generated__/index.generated';
import { NewWorkoutButton } from './NewWorkoutButton';

type Props = Omit<SlideOverProps, 'title' | 'children'>;

export function TemplatesSlideOver(props: Props) {
  const router = useRouter();

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const startFromTemplateModal = useModal();

  const { data, loading } = useQuery<TemplatesQuery>(query);

  const templates = data?.viewer?.workoutTemplates ?? [];

  const [startWorkoutFromTemplate] = useMutation<
    TemplatesMutation,
    TemplatesMutationVariables
  >(startWorkoutFromTemplateMutation, {
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
      router.push(`/workouts/${data.startWorkoutFromTemplate.id}/get-it-done`);
    }
  });

  return (
    <SlideOver title='Nueva rutina' {...props}>
      <div className='flex flex-col space-y-4'>
        <Heading size='xl'>¿Crear una con un boceto?</Heading>

        {loading && <div>Cargando...</div>}

        {data &&
          (templates.length > 0 ? (
            templates.map((template) => (
              <button
                type='button'
                key={template.id}
                className='text-left bg-slate-700 px-5 py-4 rounded-md hover:scale-[1.02]'
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  startFromTemplateModal.open();
                }}
              >
                <Heading size='lg'>{template.name}</Heading>

                <div className='text-slate-400'>
                  {template.exercises.map(({ exercise }, i) => (
                    <div
                      key={exercise.id}
                      className='flex items-center space-x-2'
                    >
                      <span className='text-sm'>{exercise.name}</span>
                    </div>
                  ))}
                </div>
              </button>
            ))
          ) : (
            <div className='bg-slate-700 divide-slate-700 rounded-lg flex flex-col px-4 py-6'>
              <div className='flex flex-col items-center space-y-3 rounded-md text-slate-400'>
                <SparklesIcon className='w-8 h-8' />
                <p className='font-semibold text-sm'>No hay bocetos...</p>
              </div>
            </div>
          ))}

        <NewWorkoutButton />
      </div>

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
    </SlideOver>
  );
}
