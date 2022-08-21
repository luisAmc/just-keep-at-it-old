import Link from 'next/link';
import { formatDate } from 'src/utils/transforms';
import { ViewWorkout_Workout } from '../Workouts/ViewWorkout/__generated__/index.generated';

interface WorkoutCardProps {
  workout: ViewWorkout_Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className='px-5 py-4 bg-gray-100 rounded-md hover:cursor-pointer'>
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
