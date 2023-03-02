import type { Prisma } from '@my-coin/database';
import { selectCoin } from './coin';
import type { CheckSelectKeys } from './types';
import { selectUser } from './user';

const createCoinWishlistSelect = <T extends Prisma.CoinWishlistSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinWishlistSelect>
): CheckSelectKeys<T, Prisma.CoinWishlistSelect> => arg;

export const selectCoinWishlist = createCoinWishlistSelect({
  id: true,
  coin: {
    select: selectCoin,
  },
  coinId: true,
  user: {
    select: selectUser,
  },
  userId: true,
  created_at: true,
});

export type CoinWishlist = Prisma.CoinWishlistGetPayload<{
  select: typeof selectCoinWishlist;
}>;
