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
    <div className='bg-white/5 rounded-t-lg px-5 py-3 flex items-center justify-between'>
      <Heading size='xl'>{name}</Heading>

      <span
        className={clsx(
          'px-2 py-0.5 inline-flex space-x-1 text-xs font-semibold rounded-full',
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
