import { ExerciseType, MuscleGroup } from '@prisma/client';

export function useMuscleGroupColors(muscleGroup: string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-200 shadow-arms-400 text-arms-900 border-arms-300';

    case MuscleGroup.BACK:
      return 'bg-back-200 shadow-back-400 text-back-900 border-back-300';

    case MuscleGroup.CHEST:
      return 'bg-chest-200 shadow-chest-400 text-chest-900 border-chest-300';

    case MuscleGroup.LEGS:
      return 'bg-legs-200 shadow-legs-400 text-legs-900 border-legs-300';

    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-200 shadow-shoulders-400 text-shoulders-900 border-shoulders-300';

    default:
      return 'bg-aerobic-200 shadow-aerobic-400 text-aerobic-900 border-aerobic-300';
  }
}

export function useMuscleGroupName(muscleGroup: string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'Brazos';

    case MuscleGroup.BACK:
      return 'Espalda';

    case MuscleGroup.CHEST:
      return 'Pecho';

    case MuscleGroup.LEGS:
      return 'Piernas';

    case MuscleGroup.SHOULDERS:
      return 'Hombros';

    case ExerciseType.AEROBIC:
      return 'Aerobico';

    default:
      return 'Error';
  }
}
