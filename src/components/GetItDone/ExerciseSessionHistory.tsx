import { gql, useQuery } from '@apollo/client';
import { ExerciseType } from '@prisma/client';
import { useState } from 'react';
import { formatDate } from 'src/utils/transforms';
import { SlideOver, SlideOverProps } from '../shared/SlideOver';
import {
  ExerciseSessionHistoryQuery,
  ExerciseSessionHistoryQueryVariables
} from './__generated__/ExerciseSessionHistory.generated';

export function useExerciseSessionHistory() {
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

interface ExerciseSessionHistoryProps
  extends Omit<SlideOverProps, 'title' | 'children'> {
  exerciseId?: string | null;
}

export function ExerciseSessionHistory({
  exerciseId,
  ...modalProps
}: ExerciseSessionHistoryProps) {
  const { data, loading } = useQuery<
    ExerciseSessionHistoryQuery,
    ExerciseSessionHistoryQueryVariables
  >(
    gql`
      query ExerciseSessionHistoryQuery($id: ID!, $limit: Int) {
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
      variables: { id: exerciseId!, limit: 5 }
    }
  );

  const sessions = data?.exercise.doneSessions ?? [];
  const isAerobic = data?.exercise.type === ExerciseType.AEROBIC;

  return (
    <SlideOver {...modalProps} title={data?.exercise.name ?? ''}>
      {loading && <Shimmer />}

      {data &&
        (sessions.length > 0 ? (
          <div className='flex flex-col space-y-2 pb-2'>
            <div className='text-sm text-slate-400'>
              Últimas cinco sesiones del ejercicio...
            </div>

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
    </SlideOver>
  );
}

function Shimmer() {
  return (
    <div className='animate-pulse flex flex-col space-y-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`shimmer-div-${i}`}
          className='border rounded-lg border-slate-500 p-3'
        >
          <div className='flex flex-col space-y-2'>
            <div className='h-4 w-1/2 bg-slate-500 rounded-md'></div>
            <div className='h-3 w-3/4 bg-slate-600 rounded-md'></div>

            {/* Spacer */}
            <div></div>

            <div className='h-4 w-3/5 bg-slate-500 rounded-md'></div>
            <div className='h-4 w-3/5 bg-slate-500 rounded-md'></div>
            <div className='h-4 w-3/5 bg-slate-500 rounded-md'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
