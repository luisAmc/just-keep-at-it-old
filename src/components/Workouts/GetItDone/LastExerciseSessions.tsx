import { gql, useQuery } from '@apollo/client';
import { ExerciseType } from '@prisma/client';
import { ErrorMessage } from 'src/components/shared/ErrorMessage';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import {
  LastExerciseSessionsQuery,
  LastExerciseSessionsQueryVariables
} from './__generated__/LastExerciseSessions.generated';

const query = gql`
  query LastExerciseSessionsQuery($exerciseId: ID!, $limit: Int) {
    exercise(id: $exerciseId) {
      id
      type
      doneSessions(limit: $limit) {
        id
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
  }
`;

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  exerciseId: string;
}

export function LastExerciseSessions({ exerciseId, open, onClose }: Props) {
  const { data, loading, error } = useQuery<
    LastExerciseSessionsQuery,
    LastExerciseSessionsQueryVariables
  >(query, {
    skip: !exerciseId,
    variables: { exerciseId: exerciseId }
  });

  const sessions = data?.exercise?.doneSessions ?? [];
  const isAerobic = data?.exercise.type === ExerciseType.AEROBIC;

  return (
    <SlideOver title='Últimas Iteraciones' open={open} onClose={onClose}>
      {loading && <div>Cargando...</div>}

      <ErrorMessage title='Error...' error={error} />

      {data && (
        <div className='flex flex-col space-y-1'>
          {sessions.map((session) => (
            <div key={session.id} className='bg-gray-100 px-4 py-3 rounded-lg'>
              <div className='flex flex-col space-y-1'>
                {session.sets.map((set, i) => (
                  <div key={set.id} className='flex items-center space-x-3'>
                    <div className='text-xs'>{i + 1}.</div>

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
            </div>
          ))}
        </div>
      )}
    </SlideOver>
  );
}
