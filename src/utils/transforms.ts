export function formatDate(
  givenDate: string | Date,
  size: 'short' | 'medium' = 'short'
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
