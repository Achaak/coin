export const formatYears = (minYear: number, maxYear: number) => {
  if (minYear === maxYear) {
    return minYear.toString();
  }
  return `${minYear} - ${maxYear}`;
};

export const getMinAndMaxYear = (years: number[]) => {
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  return { minYear, maxYear };
};
