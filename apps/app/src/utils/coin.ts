import { Coin } from '../selector/coin';

export const getYearRange = (coin: Coin[]): [number, number] => {
  const min = Math.min(...coin.filter((c) => c.year).map((c) => c.year!));
  const max = Math.max(...coin.filter((c) => c.year).map((c) => c.year!));
  return [min, max];
};
