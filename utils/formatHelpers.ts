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

export const formatDate = (d: Date | string | number | null): string => {
  // eslint-disable-next-line no-param-reassign
  d = new Date(d ?? 0);
  if (Number.isNaN(d.getTime()) || d.getTime() <= 0) return '-';
  const year = d.getFullYear();
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const monthIndex = d.getMonth();
  const month = months[monthIndex];
  return `${date} ${month.slice(0, 3)} ${year}`;
};

export const formatDateForPlot = (d: Date | string | number | null): string => {
  // eslint-disable-next-line no-param-reassign
  d = new Date(d ?? 0);
  if (Number.isNaN(d.getTime()) || d.getTime() <= 0) return '-';
  const year = d.getFullYear();
  const monthIndex = d.getMonth();
  const month = months[monthIndex].slice(0, 3);
  return `${month} ${year}`.toUpperCase();
};

export const formatDateForPlotHint = (
  d: Date | string | number | null,
): string => {
  // eslint-disable-next-line no-param-reassign
  d = new Date(d ?? 0);
  if (Number.isNaN(d.getTime()) || d.getTime() <= 0) return '-';
  const date = d.getDate();
  const monthIndex = d.getMonth();
  const month = months[monthIndex].slice(0, 3);
  return `${month} ${date}`.toUpperCase();
};

export const formatNumberForPlot = (num: number, digits = 2): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

// export const formatDateForMembership = (d: Date | string | number): string => {
//   // eslint-disable-next-line no-param-reassign
//   d = new Date(d);
//   const year = d.getFullYear();
//   const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
//   const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
//   return `${year}-${month}-${date}`;
// };

export const formatNumber = (num: number | string): string =>
  Number(num).toLocaleString();
