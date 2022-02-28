const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const formatDate = (d: Date | string): string => {
  // eslint-disable-next-line no-param-reassign
  d = new Date(d);
  const year = d.getFullYear();
  const date = d.getDate();
  const monthIndex = d.getMonth();
  const month = months[monthIndex];
  return `${month} ${date}, ${year}`;
};
