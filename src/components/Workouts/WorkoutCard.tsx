import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatDate } from 'src/utils/transforms';
import {
  motion,
  useMotionTemplate,
  type MotionStyle,
  type MotionValue,
  useMotionValue
} from 'framer-motion';
import { type MouseEvent } from 'react';
import { ViewWorkout_WorkoutBasic } from './ViewWorkout/__generated__/index.generated';
import { WorkoutStatus } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';

interface WorkoutCardProps {
  workout: ViewWorkout_WorkoutBasic;
}

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const isDone = workout.status === WorkoutStatus.DONE;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

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
        <motion.div
          onMouseMove={handleMouseMove}
          className={clsx(
            'lantern-card relative cursor-pointer select-none rounded-lg border border-brand-700 p-6 text-sm drop-shadow-sm',
            isDone
              ? 'border-transparent bg-brand-300 bg-gradient-to-br from-brand-300 to-brand-400 text-brand-950'
              : 'text-brand-950'
          )}
          style={
            {
              '--x': useMotionTemplate`${mouseX}px`,
              '--y': useMotionTemplate`${mouseY}px`
            } as WrapperStyle
          }
        >
          {isDone}

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
        </motion.div>
      </Link>
    </>
  );
}
