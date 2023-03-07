export const formatYears = (minYear: number, maxYear: number) => {
  if (minYear === maxYear) {
    return minYear.toString();
  }
  return `${minYear} - ${maxYear}`;
};
