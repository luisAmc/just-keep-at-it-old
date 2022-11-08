import { formatDate } from 'src/utils/transforms';
import { WorkoutStatus } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { ViewWorkout_Workout } from '../Workouts/ViewWorkout/__generated__/index.generated';

interface WorkoutCardProps {
  workout: ViewWorkout_Workout;
}

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
      <div
        className={clsx(
          'px-5 py-4 rounded-md hover:cursor-pointer transition hover:scale-[1.02]',
          isDone ? 'bg-brand-200 text-brand-900' : 'bg-slate-600 text-slate-200'
        )}
      >
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>{workout.name}</h2>

          <span className='font-medium text-xs'>
            {formatDate(workout.createdAt)}
          </span>
        </div>

        <div className='text-sm'>
          {workout.workoutExercises.map((workoutExercise) => (
            <div key={workoutExercise.id}>
              {workoutExercise.setsCount > 0 &&
                `${workoutExercise.setsCount}x `}
              {workoutExercise.exercise.name}
            </div>
          ))}
        </div>

        <div className='flex justify-end text-sm'></div>
      </div>
    </Link>
  );
}
