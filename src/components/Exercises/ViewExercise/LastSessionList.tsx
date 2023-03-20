import { ExerciseType } from '@prisma/client';
import { Heading } from 'src/components/shared/Heading';
import { formatDate } from 'src/utils/transforms';
import { useViewExerciseContext } from './ViewExerciseContext';

export function LastSessionList() {
  const { type, doneSessions } = useViewExerciseContext();

  return (
    <div className='pt-4 flex flex-col space-y-1'>
      <Heading size='lg'>Últimas 10 sesiones realizadas...</Heading>

      {doneSessions.map((session) => (
        <div key={session.id} className='rounded-lg bg-slate-700 p-3'>
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

              {type === ExerciseType.AEROBIC ? (
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

          <div className='pt-2'></div>

          {type === ExerciseType.AEROBIC ? (
            <div>
              Distancia: {session.sets.reduce(
                (totalDistance, currentSet) =>
                  totalDistance + currentSet.distance,
                0
              )}{' '}
              millas
            </div>
          ) : (
            <div>
              Peso total:{' '}
              {session.sets.reduce(
                (totalWeight, currentSet) =>
                  totalWeight + currentSet.lbs * currentSet.reps,
                0
              )}{' '}
              lbs
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
