import { gql, useMutation, useQuery } from '@apollo/client';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { Heading } from '../shared/Heading';
import { useModal } from '../shared/Modal';
import { SlideOver, SlideOverProps } from '../shared/SlideOver';
import { query } from '../Templates';
import { TemplatesQuery } from '../Templates/__generated__/index.generated';
import { NewWorkoutButton } from './NewWorkoutButton';
import {
  TemplatesSlideOverMutation,
  TemplatesSlideOverMutationVariables
} from './__generated__/TemplatesSlideOver.generated';
import { DASHBOARD_QUERY } from '.';
import { WorkoutCardFragment } from '../Workouts/WorkoutCard';
import toast from 'react-hot-toast';

type Props = Omit<SlideOverProps, 'title' | 'children'>;

export function TemplatesSlideOver(props: Props) {
  const router = useRouter();

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const startFromTemplateModal = useModal();

  const { data, loading } = useQuery<TemplatesQuery>(query);

  const templates = data?.viewer?.workoutTemplates ?? [];

  const [startWorkoutFromTemplate] = useMutation<
    TemplatesSlideOverMutation,
    TemplatesSlideOverMutationVariables
  >(
    gql`
      mutation TemplatesSlideOverMutation($id: ID!) {
        startWorkoutFromTemplate(id: $id) {
          ...WorkoutCard_workout
        }
      }
      ${WorkoutCardFragment}
    `,
    {
      refetchQueries: [DASHBOARD_QUERY],
      onCompleted(data) {
        router.push(
          `/workouts/${data.startWorkoutFromTemplate.id}/get-it-done`
        );
      }
    }
  );

  return (
    <SlideOver title="Nueva rutina" {...props}>
      <div className="flex flex-col space-y-4">
        <Heading size="xl">¿Usar un boceto?</Heading>

        {loading && <div>Cargando...</div>}

        {data &&
          (templates.length > 0 ? (
            templates.map((template) => (
              <button
                type="button"
                key={template.id}
                className="rounded-md bg-brand-100 px-5 py-4 text-left"
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  startFromTemplateModal.open();
                }}
              >
                <Heading size="lg">{template.name}</Heading>

                <div>
                  {template.exercises.map(({ exercise }, i) => (
                    <div
                      key={`${exercise.id}-${i}`}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-sm">{exercise.name}</span>
                    </div>
                  ))}
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col divide-brand-700 rounded-lg bg-brand-100 px-4 py-6">
              <div className="flex flex-col items-center space-y-3 rounded-md text-brand-500">
                <SparklesIcon className="h-8 w-8" />
                <p className="text-sm font-semibold">No hay bocetos...</p>
              </div>
            </div>
          ))}

        <NewWorkoutButton />
      </div>

      <ConfirmationModal
        {...startFromTemplateModal.props}
        type="warning"
        onConfirm={() => {
          toast.promise(
            startWorkoutFromTemplate({
              variables: {
                id: selectedTemplateId
              }
            }),
            {
              loading: 'Creando rútina...',
              success: '¡Rútina creada!',
              error: 'No se pudo creada la rutina.'
            }
          );
        }}
      >
        ¿Crear una rutina apartir de este boceto?
      </ConfirmationModal>
    </SlideOver>
  );
}
