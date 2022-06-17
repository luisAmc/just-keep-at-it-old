import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

export function formatDate(
  givenDate: string | Date,
  pattern: string = 'dd/MM/yyy'
) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  return format(date, pattern, { locale: esLocale });
}
