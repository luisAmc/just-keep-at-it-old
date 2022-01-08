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
          'bg-strength-100 text-strength-800':
            variant === EXERCISE_TYPE.STRENGTH,
          'bg-arms-100 text-arms-800': variant === MUSCLE_GROUP.ARMS,
          'bg-chest-100 text-chest-800': variant === MUSCLE_GROUP.CHEST,
          'bg-back-100 text-back-800': variant === MUSCLE_GROUP.BACK,
          'bg-legs-100 text-legs-800': variant === MUSCLE_GROUP.LEGS,
          'bg-shoulders-100 text-shoulders-800':
            variant === MUSCLE_GROUP.SHOULDERS,
          'bg-slate-100 text-slate-800': variant === WORKOUT_STATUS.DRAFTED,
          'bg-green-100 text-green-800': variant === WORKOUT_STATUS.DONE
        }
      )}
    >
      {text}
    </span>
  );
}
