import { gql, useQuery } from '@apollo/client';
import { ExerciseType } from '@prisma/client';
import { useState } from 'react';
import { Modal, ModalProps } from 'src/components/shared/Modal';
import { formatDate } from 'src/utils/transforms';
import {
  ExerciseModalQuery,
  ExerciseModalQueryVariables
} from './__generated__/ExerciseModal.generated';

export function useExerciseModal() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);

  function setExerciseId(id: string) {
    setId(id);
    setOpen(true);
  }

  return {
    setExerciseId,
    props: {
      exerciseId: id,
      open,
      onClose() {
        setOpen(false);
      }
    }
  };
}

interface ExerciseModalProps extends Omit<ModalProps, 'title' | 'children'> {
  exerciseId?: string | null;
}

export function ExerciseModal({
  exerciseId,
  ...modalProps
}: ExerciseModalProps) {
  const { data, loading } = useQuery<
    ExerciseModalQuery,
    ExerciseModalQueryVariables
  >(
    gql`
      query ExerciseModalQuery($id: ID!, $limit: Int) {
        exercise(id: $id) {
          id
          name
          type
          doneSessions(limit: $limit) {
            id
            sets {
              id
              mins
              distance
              kcal
              lbs
              reps
            }
            workout {
              name
              completedAt
            }
          }
        }
      }
    `,
    {
      skip: !exerciseId,
      variables: { id: exerciseId!, limit: 10 }
    }
  );

  const sessions = data?.exercise.doneSessions ?? [];
  const isAerobic = data?.exercise.type === ExerciseType.AEROBIC;

  return (
    <Modal {...modalProps} title={data?.exercise.name}>
      {loading && <Shimmer />}

      {data &&
        (sessions.length > 0 ? (
          <div className='flex flex-col space-y-2'>
            {sessions.map((session) => (
              <div
                key={session.id}
                className='border rounded-lg border-slate-500 p-3'
              >
                <h3>{session.workout.name}</h3>

                <div className='text-sm text-slate-400'>
                  {formatDate(
                    session.workout.completedAt!,
                    "dd MMMM yy 'a las' h:mm a"
                  )}
                </div>

                <div className='pt-2'></div>

                {session.sets.map((set, i) => (
                  <div key={set.id} className='flex items-center space-x-3'>
                    <span className='text-sm'>{i + 1}.</span>

                    {isAerobic ? (
                      <div>
                        <span>
                          <span className='text-base'>{set.mins}</span>
                          <span className='text-xs'>mins</span>
                        </span>

                        <span className='text-slate-400 text-sm'>x</span>

                        <span>
                          <span className='text-base'>{set.distance}</span>
                          <span className='text-xs'>dist</span>
                        </span>

                        <span className='text-slate-400 text-sm'>x</span>

                        <span>
                          <span className='text-base'>{set.kcal}</span>
                          <span className='text-xs'>kcal</span>
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span>
                          <span className='text-base'>{set.lbs}</span>
                          <span className='text-xs'>lbs</span>
                        </span>

                        <span className='text-slate-400 text-sm'>x</span>

                        <span>
                          <span className='text-base'>{set.reps}</span>
                          <span className='text-xs'>reps</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className='px-2 py-4 flex flex-col space-y-4 text-sm text-center'>
            <p>
              El historial de las últimas sesiones de este ejercicio se
              mostrarán aquí.
            </p>

            <p className='font-medium'>
              Pero por los momentos no hay información.
            </p>
          </div>
        ))}
    </Modal>
  );
}

function Shimmer() {
  return <div>Cargando</div>;
}
