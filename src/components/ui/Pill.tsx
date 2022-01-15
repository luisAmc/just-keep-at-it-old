import { ExerciseType, MuscleGroup } from '@prisma/client';
import clsx from 'clsx';

interface Props {
  variant?: ExerciseType | MuscleGroup;
  text: string;
}

export function Pill({ variant = ExerciseType.AEROBIC, text }: Props) {
  return (
    <span
      className={clsx(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        {
          'bg-aerobic-100 text-aerobic-800': variant === ExerciseType.AEROBIC,
          'bg-strength-100 text-strength-800':
            variant === ExerciseType.STRENGTH,
          'bg-arms-100 text-arms-800': variant === MuscleGroup.ARMS,
          'bg-chest-100 text-chest-800': variant === MuscleGroup.CHEST,
          'bg-back-100 text-back-800': variant === MuscleGroup.BACK,
          'bg-legs-100 text-legs-800': variant === MuscleGroup.LEGS,
          'bg-shoulders-100 text-shoulders-800':
            variant === MuscleGroup.SHOULDERS
          // 'bg-slate-100 text-slate-800': variant === WorkoutStatus.DRAFTED,
          // 'bg-green-100 text-green-800': variant === WorkoutStatus.DONE
        }
      )}
    >
      {text}
    </span>
  );
}
