import type { Prisma } from '@my-coin/database';
import { selectCoinRef } from './coinRef';
import type { CheckSelectKeys } from './types';
import { selectUser } from './user';

const createCoinRefWishlistSelect = <T extends Prisma.CoinRefWishlistSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinRefWishlistSelect>
): CheckSelectKeys<T, Prisma.CoinRefWishlistSelect> => arg;

export const selectCoinRefWishlist = createCoinRefWishlistSelect({
  id: true,
  coinRef: {
    select: selectCoinRef,
  },
  coinRefId: true,
  user: {
    select: selectUser,
  },
  userId: true,
  created_at: true,
  updated_at: true,
});

export type CoinRefWishlist = Prisma.CoinRefWishlistGetPayload<{
  select: typeof selectCoinRefWishlist;
}>;
