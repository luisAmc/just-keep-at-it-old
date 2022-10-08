import { gql, useQuery } from '@apollo/client';
import { ExerciseType } from '@prisma/client';
import { Button } from 'src/components/shared/Button';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { formatDate } from 'src/utils/transforms';
import {
  LastExerciseSessionsQuery,
  LastExerciseSessionsQueryVariables
} from './__generated__/LastExerciseSessions.generated';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  exerciseId: string;
}

export function LastExerciseSessions({ exerciseId, open, onClose }: Props) {
  const { data, loading } = useQuery<
    LastExerciseSessionsQuery,
    LastExerciseSessionsQueryVariables
  >(
    gql`
      query LastExerciseSessionsQuery($exerciseId: ID!, $take: Int) {
        lastSessions(exerciseId: $exerciseId, take: $take) {
          id
          exercise {
            type
          }
          createdAt
          sets {
            id
            mins
            distance
            kcal
            lbs
            reps
          }
        }
      }
    `,
    {
      skip: !exerciseId,
      variables: { exerciseId: exerciseId }
    }
  );

  const sessions = data?.lastSessions ?? [];

  return (
    <SlideOver title='Últimas Iteraciones' open={open} onClose={onClose}>
      {loading && <div>Cargando...</div>}

      <div className='flex flex-col space-y-4'>
        {data &&
          sessions.map((session) => (
            <div key={session.id} className='bg-gray-100 px-6 py-3 rounded-lg'>
              <div className='text-xs font-semibold text-right mb-2'>
                {formatDate(session.createdAt)}
              </div>

              <div className='text-center'>
                {session.exercise.type === ExerciseType.AEROBIC
                  ? session.sets.map((set) => (
                      <div key={set.id} className='grid grid-cols-3 gap-3'>
                        <span>
                          <span className='font-medium'>{set.mins}</span>
                          <span className='text-sm ml-1'>mins</span>
                        </span>

                        <span>
                          <span className='font-medium'>{set.distance}</span>
                          <span className='text-sm ml-1'>dist</span>
                        </span>

                        <span>
                          <span className='font-medium'>{set.kcal}</span>
                          <span className='text-sm ml-1'>kcal</span>
                        </span>
                      </div>
                    ))
                  : session.sets.map((set) => (
                      <div key={set.id} className='grid grid-cols-2 gap-3'>
                        <span>
                          <span className='font-medium'>{set.lbs}</span>
                          <span className='text-sm ml-1'>lbs</span>
                        </span>

                        <span>
                          <span className='font-medium'>{set.reps}</span>
                          <span className='text-sm ml-1'>reps</span>
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          ))}
      </div>

      <div className='flex-1'></div>

      <Button color='secondary' onClick={onClose}>
        Cerrar
      </Button>
    </SlideOver>
  );
}
