import type { Prisma } from '@my-coin/database';
import { selectCoinFull } from './coinFull';
import type { CheckSelectKeys } from './types';
import { selectUser } from './user';

const createUserCoinSelect = <T extends Prisma.UserCoinSelect>(
  arg: CheckSelectKeys<T, Prisma.UserCoinSelect>
): CheckSelectKeys<T, Prisma.UserCoinSelect> => arg;

export const selectUserCoin = createUserCoinSelect({
  id: true,
  comment: true,
  price: true,
  condition: true,
  exchangeable: true,
  coin: {
    select: selectCoinFull,
  },
  coinId: true,
  user: {
    select: selectUser,
  },
  userId: true,
  observeImage: true,
  reverseImage: true,
  created_at: true,
  updated_at: true,
  currencyCode: true,
});

export type UserCoin = Prisma.UserCoinGetPayload<{
  select: typeof selectUserCoin;
}>;
