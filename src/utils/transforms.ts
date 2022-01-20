import { MuscleGroup } from '@prisma/client';

export function formatDate(
  givenDate: string | Date,
  size: 'short' | 'medium' = 'medium'
) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: size
  };

  const intlDate = new Intl.DateTimeFormat('es-HN', options).format(date);

  return intlDate;
}

export function getMuscleGroupLabel(muscleGroup: MuscleGroup) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'Brazos';
    case MuscleGroup.CHEST:
      return 'Pecho';
    case MuscleGroup.BACK:
      return 'Espalda';
    case MuscleGroup.LEGS:
      return 'Piernas';
    case MuscleGroup.SHOULDERS:
      return 'Hombros';
    default:
      return '';
  }
}

export function getMuscleGroupColor(muscleGroup: MuscleGroup | string) {
  switch (muscleGroup) {
    case MuscleGroup.ARMS:
      return 'bg-arms-500/90';
    case MuscleGroup.CHEST:
      return `bg-chest-500/90`;
    case MuscleGroup.BACK:
      return 'bg-back-500/90';
    case MuscleGroup.LEGS:
      return 'bg-legs-500/90';
    case MuscleGroup.SHOULDERS:
      return 'bg-shoulders-500/90';
    default:
      return 'bg-white';
  }
}
