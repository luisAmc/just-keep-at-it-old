import { MuscleGroup } from "@prisma/client";

export function getMuscleGroupColors
(muscleGroup?: string | null) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-200 ring-arms-400 text-arms-900';

    case MuscleGroup.BACK:
      return 'bg-back-200 ring-back-400 text-back-900';

    case MuscleGroup.CHEST:
      return 'bg-chest-200 ring-chest-400 text-chest-900';

    case MuscleGroup.LEGS:
      return 'bg-legs-200 ring-legs-400 text-legs-900';

    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-200 ring-shoulders-400 text-shoulders-900';

    default:
      return 'bg-aerobic-200 ring-aerobic-400 text-aerobic-900';
  }
}
