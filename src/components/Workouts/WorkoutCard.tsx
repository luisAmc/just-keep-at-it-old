import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { cn } from 'src/utils/cn';
import { formatDate } from 'src/utils/transforms';
import { gql } from '@apollo/client';
import { WorkoutCard_Workout } from './__generated__/WorkoutCard.generated';
import { WorkoutStatus } from '@prisma/client';
import Link from 'next/link';

interface WorkoutCardProps {
  workout: WorkoutCard_Workout;
}

export const WorkoutCardFragment = gql`
  fragment WorkoutCard_workout on Workout {
    id
    name
    status
    createdAt
    completedAt
    workoutExercises {
      id
      setsCount
      exercise {
        id
        name
      }
    }
  }
`;

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const isDone = workout.status === WorkoutStatus.DONE;

  return (
    <>
      <Link
        passHref
        href={
          isDone
            ? `/workouts/${workout.id}`
            : `/workouts/${workout.id}/get-it-done`
        }
      >
        <div
          className={cn(
            'cursor-pointer select-none rounded-lg border-2 border-brand-400 p-6 text-sm shadow-sm transition-[padding] hover:pl-8 hover:shadow-lg',
            isDone && 'bg-brand-200'
          )}
        >
          <header className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <h2 className="text-lg font-medium">{workout.name}</h2>
              {isDone && <CheckCircleIcon className="h-4 w-4" />}
            </div>

            <span className="itmes-center flex gap-x-1 text-xs">
              <span>{isDone ? 'Finalizado el' : 'Creado el'}</span>
              <span className="font-medium capitalize">
                {formatDate(
                  isDone ? workout.completedAt! : workout.createdAt,
                  'EEEE, dd MMM h:mm aaaa'
                )}
              </span>
            </span>
          </header>

          <section className="mt-2">
            {workout.workoutExercises.map((workoutExercise) => (
              <div key={workoutExercise.id}>
                {workoutExercise.setsCount > 0 &&
                  `${workoutExercise.setsCount}x `}
                {workoutExercise.exercise.name}
              </div>
            ))}
          </section>
        </div>
      </Link>
    </>
  );
}
