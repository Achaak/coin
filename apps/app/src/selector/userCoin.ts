import type { Prisma } from '@my-coin/database';
import { selectCoin } from './coin';
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
    select: selectCoin,
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
});

export type UserCoin = Prisma.UserGetPayload<{
  select: typeof selectUserCoin;
}>;
