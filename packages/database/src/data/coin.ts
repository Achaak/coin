import { randNumber } from '@ngneat/falso';
import type { Coin } from '@prisma/client';
import { euroValues } from './coinRef';

const generateEuroCoins = ({
  yearStart,
  yearEnd,
  coinRefId,
  mintId,
  mintMark,
}: {
  yearStart: number;
  yearEnd: number;
  coinRefId: string;
  mintId: string;
  mintMark?: string;
}): Array<Partial<Coin>> => {
  const coins: Array<Partial<Coin>> = [];

  for (let year = yearStart; year <= yearEnd; year++) {
    for (let i = 0; i < euroValues.length; i++) {
      coins.push({
        id: `${coinRefId}-${euroValues[i].valueShort}-${year}${
          mintMark ? `-${mintMark}` : ''
        }`,
        year,
        refId: `${coinRefId}-${euroValues[i].valueShort}`,
        mintageQtyBU: randNumber({ min: 1000000, max: 10000000 }),
        mintageQtyPRF: randNumber({ min: 1000000, max: 10000000 }),
        mintageQtyUNC: randNumber({ min: 1000000, max: 10000000 }),
        mintId,
        ...(mintMark && { mintMark }),
      });
    }
  }

  return coins;
};

export const DEFAULT_COINS = [
  ...generateEuroCoins({
    yearStart: 1999,
    yearEnd: 2022,
    coinRefId: '2',
    mintId: '1',
  }), // France
  ...generateEuroCoins({
    yearStart: 2002,
    yearEnd: 2022,
    coinRefId: '1',
    mintId: '2',
    mintMark: 'A',
  }), // Germany
  ...generateEuroCoins({
    yearStart: 2002,
    yearEnd: 2022,
    coinRefId: '1',
    mintId: '3',
    mintMark: 'D',
  }), // Germany
  ...generateEuroCoins({
    yearStart: 2002,
    yearEnd: 2022,
    coinRefId: '1',
    mintId: '4',
    mintMark: 'F',
  }), // Germany
  ...generateEuroCoins({
    yearStart: 2002,
    yearEnd: 2022,
    coinRefId: '1',
    mintId: '5',
    mintMark: 'G',
  }), // Germany
  ...generateEuroCoins({
    yearStart: 2002,
    yearEnd: 2022,
    coinRefId: '1',
    mintId: '6',
    mintMark: 'J',
  }), // Germany
] as Coin[];
