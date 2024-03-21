export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Recife',
  };

  const formated = new Intl.DateTimeFormat('pt-BR', options);

  return formated.format(new Date(date));
};

export const formatDateWithTz = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Recife',
  };

  const formated = new Intl.DateTimeFormat('pt-BR', options);
  const localDate = new Date(date);
  localDate.setHours(localDate.getHours() - 3);

  return formated.format(localDate);
};

export const formatResumeDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
