import clsx from 'clsx';
import { EXERCISE_TYPE, MUSCLE_GROUP } from 'src/resolvers/ExercisesResolver';
import { WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';

interface Props {
  variant?: EXERCISE_TYPE | MUSCLE_GROUP | WORKOUT_STATUS;
  text: string;
}

export function Pill({ variant = EXERCISE_TYPE.AEROBIC, text }: Props) {
  return (
    <span
      className={clsx(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        {
          'bg-aerobic-100 text-aerobic-800': variant === EXERCISE_TYPE.AEROBIC,
          'bg-strength-100 text-strength-800': variant === EXERCISE_TYPE.STRENGTH,
          'bg-pink-100 text-pink-800': variant === MUSCLE_GROUP.ARMS,
          'bg-blue-100 text-blue-800': variant === MUSCLE_GROUP.CHEST,
          'bg-emerald-100 text-emerald-800': variant === MUSCLE_GROUP.BACK,
          'bg-rose-100 text-red-800': variant === MUSCLE_GROUP.LEGS,
          'bg-yellow-100 text-yellow-800': variant === MUSCLE_GROUP.SHOULDERS,
          'bg-slate-100 text-slate-800': variant === WORKOUT_STATUS.DRAFTED,
          'bg-green-100 text-green-800': variant === WORKOUT_STATUS.DONE,
        }
      )}
    >
      {text}
    </span>
  );
}
