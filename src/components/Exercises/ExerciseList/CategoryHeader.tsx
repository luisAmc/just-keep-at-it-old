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
      <Heading size="2xl">{name}</Heading>

      <span
        className={clsx(
          'inline-flex space-x-1 rounded-full px-2 py-0.5 text-xs font-semibold',
          type === ExerciseType.AEROBIC
            ? 'bg-sky-600 text-sky-50'
            : 'bg-rose-500 text-rose-50'
        )}
      >
        {EXERCISE_NAME[type]}
      </span>
    </div>
  );
}
