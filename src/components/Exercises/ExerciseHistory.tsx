import { gql, useQuery } from '@apollo/client';
import { Page } from '../shared/Page';
import { ExerciseHistoryQuery } from './__generated__/ExerciseHistory.generated';
import { InfiniteList } from '../shared/InfiniteList';
import { useRouter } from 'next/router';
import { formatDate } from 'src/utils/transforms';
import { ExerciseType } from '@prisma/client';
import { WorkoutSetFragment } from '../GetItDone/Workout/WorkoutExercise';

export const EXERCISES_HISTORY_QUERY = gql`
  query ExerciseHistoryQuery($id: ID!, $offset: Int, $limit: Int) {
    exercise(id: $id) {
      type
      doneSessionsCount
      doneSessions(offset: $offset, limit: $limit) {
        id
        sets {
          ...WorkoutExercise_workoutSet
        }
        workout {
          name
          completedAt
        }
      }
    }
  }
  ${WorkoutSetFragment}
`;

export function ExerciseHistory() {
  const router = useRouter();

  const { data, loading, fetchMore } = useQuery<ExerciseHistoryQuery>(
    EXERCISES_HISTORY_QUERY,
    { variables: { id: router.query.exerciseId } }
  );

  const doneSessions = data?.exercise.doneSessions ?? [];
  const isAerobic = data?.exercise.type === ExerciseType.AEROBIC;

  const hasNext =
    (data?.exercise.doneSessionsCount ?? 0) >
    (data?.exercise.doneSessions.length ?? 0);

  return (
    <Page href='/exercises' title='Historial'>
      {loading && <div>Cargnado...</div>}

      {!loading &&
        (doneSessions.length === 0 ? (
          <div>No se ha realizado el ejercicio.</div>
        ) : (
          <InfiniteList
            length={doneSessions.length}
            hasNext={hasNext}
            next={() =>
              fetchMore({
                variables: {
                  offset: data?.exercise?.doneSessions.length,
                  limit: 5
                }
              })
            }
          >
            <div className='flex flex-col space-y-4'>
              {doneSessions.map((doneSession) => (
                <div
                  key={doneSession.id}
                  className='rounded-lg bg-slate-700 p-3'
                >
                  <h3>{doneSession.workout.name}</h3>

                  <div className='text-sm text-slate-400'>
                    {formatDate(
                      doneSession.workout.completedAt!,
                      "dd MMMM yy 'a las' h:mm a"
                    )}
                  </div>

                  <div className='pt-2'></div>

                  {doneSession.sets.map((set, i) => (
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
          </InfiniteList>
        ))}
    </Page>
  );
}
