import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createCoinSelect = <T extends Prisma.CoinSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinSelect>
): CheckSelectKeys<T, Prisma.CoinSelect> => arg;

export const selectCoin = createCoinSelect({
  id: true,
  catalogId: true,
  mintageQtyBU: true,
  mintageQtyPRF: true,
  mintageQtyUNC: true,
  year: true,
  ref: {
    select: {
      id: true,
      name: true,
      countryCode: true,
      composition: true,
      country: true,
      denomination: true,
      weight: true,
      type: true,
      edge: true,
      diameter: true,
      thickness: true,
      shape: true,
      obverseCreator: true,
      obverseDescription: true,
      reverseCreator: true,
      reverseDescription: true,
    },
  },
});

export type Coin = Prisma.UserGetPayload<{
  select: typeof selectCoin;
}>;
