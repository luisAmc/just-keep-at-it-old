export function formatDate(givenDate: string | Date) {
  if (givenDate == null || isNaN(Date.parse(givenDate.toString()))) {
    return '-';
  }

  const date = new Date(givenDate);

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short'
  };

  const intlDate = new Intl.DateTimeFormat('es-HN', options).format(date);

  return intlDate;
}
