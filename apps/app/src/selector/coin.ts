import type { Prisma } from '@my-coin/database';
import { selectCoinRef } from './coinRef';

import type { CheckSelectKeys } from './types';

const createCoinSelect = <T extends Prisma.CoinSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinSelect>
): CheckSelectKeys<T, Prisma.CoinSelect> => arg;

export const selectCoin = createCoinSelect({
  id: true,
  mintageQtyBU: true,
  mintageQtyPRF: true,
  mintageQtyUNC: true,
  year: true,
  observeImage: true,
  reverseImage: true,
  updated_at: true,
  created_at: true,
  ref: {
    select: selectCoinRef,
  },
  refId: true,
});

export type Coin = Prisma.UserGetPayload<{
  select: typeof selectCoin;
}>;
