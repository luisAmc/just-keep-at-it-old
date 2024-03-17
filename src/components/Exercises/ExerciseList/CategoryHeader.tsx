import { ExerciseType } from '@prisma/client';
import { Heading } from 'src/components/shared/Heading';
import { useExerciseCategoryContext } from './useExerciseCategoryContext';
import clsx from 'clsx';

const EXERCISE_NAME: Record<string, string> = {
  [ExerciseType.AEROBIC]: 'Aeróbico',
  [ExerciseType.STRENGTH]: 'Fuerza'
} as const;

export function CategoryHeader() {
  const { name, type } = useExerciseCategoryContext();

  return (
    <div className="flex items-center justify-between rounded-t-lg bg-white/5 px-5 py-3">
      <Heading size="lg">{name}</Heading>

      <span
        className={clsx(
          'inline-flex space-x-1 rounded-full px-2 py-0.5 text-xs font-semibold',
          type === ExerciseType.AEROBIC
            ? 'bg-sky-300 text-sky-700'
            : 'bg-rose-100 text-rose-700'
        )}
      >
        {EXERCISE_NAME[type]}
      </span>
    </div>
  );
}
