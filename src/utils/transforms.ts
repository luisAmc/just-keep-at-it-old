import format from 'date-fns/format';
import es from 'date-fns/locale/es';

export function formatDate(
  givenDate: string | Date
  // size: 'short' | 'medium' = 'short'
) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  return format(date, 'PPPP', { locale: es });

  // const options: Intl.DateTimeFormatOptions = {
  //   dateStyle: size
  // };

  // const intlDate = new Intl.DateTimeFormat('es-HN', options).format(date);

  // return intlDate;
}
