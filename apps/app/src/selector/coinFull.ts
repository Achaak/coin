import type { Prisma } from '@my-coin/database';
import { selectCoin } from './coin';
import { selectCoinRefFull } from './coinRef';

import type { CheckSelectKeys } from './types';

const createCoinSelect = <T extends Prisma.CoinSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinSelect>
): CheckSelectKeys<T, Prisma.CoinSelect> => arg;

export const selectCoinFull = createCoinSelect({
  ...selectCoin,
  ref: {
    select: selectCoinRefFull,
  },
});

export type CoinFull = Prisma.CoinGetPayload<{
  select: typeof selectCoinFull;
}>;
