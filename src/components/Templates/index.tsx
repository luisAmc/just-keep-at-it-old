import { gql, useMutation, useQuery } from '@apollo/client';
import {
  ChevronLeftIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
  SparklesIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ExerciseFragment } from '../Exercises';
import { Button } from '../shared/Button';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { Heading } from '../shared/Heading';
import { useModal } from '../shared/Modal';
import { Page } from '../shared/Page';
import {
  TemplatesDeleteMutation,
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
  ${ExerciseFragment}
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

export const startWorkoutFromTemplateMutation = gql`
  mutation TemplatesMutation($id: ID!) {
    startWorkoutFromTemplate(id: $id) {
      id
    }
  }
`;

export function Templates() {
  const router = useRouter();

  const { data } = useQuery<TemplatesQuery>(query);

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const startFromTemplateModal = useModal();
  const deleteTemplateModal = useModal();

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

  const [deleteWorkoutTemplate] = useMutation<
    TemplatesDeleteMutation,
    TemplatesMutationVariables
  >(
    gql`
      mutation TemplatesDeleteMutation($id: ID!) {
        deleteWorkoutTemplate(id: $id) {
          id
        }
      }
    `,
    {
      onCompleted() {
        router.reload();
      }
    }
  );

  const templates = data?.viewer?.workoutTemplates ?? [];

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button href="/" className="">
          <div className="flex items-center justify-center rounded-full bg-brand-300 p-2 text-brand-700">
            <ChevronLeftIcon className="h-4 w-4" />
          </div>
        </Button>

        <Heading>Bocetos</Heading>
      </div>

      <Button href="/templates/create">
        <PlusCircleIcon className="mr-1 h-4 w-4" />
        <span>Crear un boceto nuevo</span>
      </Button>

      {templates.length > 0 ? (
        templates.map((template) => (
          <div
            key={template.id}
            className="flex rounded-md bg-brand-100 px-5 py-4"
          >
            <div className="flex-1">
              <Heading size="lg">{template.name}</Heading>

              <div>
                {template.exercises.map(({ exercise }, i) => (
                  <div
                    key={`${template.id}-exercise-${i}`}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-sm">{exercise.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-evenly">
              <div>
                <Button
                  className="rounded-full bg-brand-400 p-2 hover:bg-opacity-50"
                  onClick={() => {
                    setSelectedTemplateId(template.id);
                    startFromTemplateModal.open();
                  }}
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </Button>
              </div>

              <div>
                <Button
                  className="rounded-full bg-brand-400 p-2 hover:bg-opacity-50"
                  onClick={() => {
                    setSelectedTemplateId(template.id);
                    deleteTemplateModal.open();
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col divide-brand-700 rounded-lg bg-brand-100 px-4 py-4">
          <div className="flex flex-col items-center space-y-4 rounded-md py-12 text-brand-500">
            <SparklesIcon className="h-10 w-10" />
            <p className="text-sm font-semibold">
              No hay bocetos creados hasta el momento...
            </p>
          </div>
        </div>
      )}

      <ConfirmationModal
        {...startFromTemplateModal.props}
        type="warning"
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

      <ConfirmationModal
        {...deleteTemplateModal.props}
        onConfirm={() => {
          deleteWorkoutTemplate({
            variables: {
              id: selectedTemplateId
            }
          });
        }}
      >
        ¿Está seguro de borrar el boceto?
      </ConfirmationModal>
    </>
  );
}
