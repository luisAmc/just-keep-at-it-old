import { formatDate } from 'src/utils/transforms';
import { gql } from '@apollo/client';
import { WorkoutCard_Workout } from './__generated__/WorkoutCard.generated';
import { WorkoutStatus } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';

interface WorkoutCardProps {
  workout: WorkoutCard_Workout;
}

export const WorkoutBaseInfoFragment = gql`
  fragment WorkoutCard_workout on Workout {
    id
    name
    status
    createdAt
    workoutExercises {
      id
      exercise {
        id
        name
        type
      }
      setsCount
    }
  }
`;

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const isDone = workout.status === WorkoutStatus.DONE;

  return (
    <Link
      href={
        isDone
          ? `/workouts/${workout.id}`
          : `/workouts/${workout.id}/get-it-done`
      }
    >
      <a
        className={clsx(
          'rounded-md px-5 py-4 transition hover:scale-[1.02] hover:cursor-pointer',
          isDone ? 'bg-brand-200 text-brand-900' : 'bg-slate-600 text-slate-200'
        )}
      >
        <header className="flex items-center justify-between">
          <h2 className="font-medium">{workout.name}</h2>

          <span className="text-xs font-medium">
            {formatDate(workout.createdAt)}
          </span>
        </header>

        <section className="text-sm">
          {workout.workoutExercises.map((workoutExercise) => (
            <div key={workoutExercise.id}>
              {workoutExercise.setsCount > 0 &&
                `${workoutExercise.setsCount}x `}
              {workoutExercise.exercise.name}
            </div>
          ))}
        </section>
      </a>
    </Link>
  );
}
