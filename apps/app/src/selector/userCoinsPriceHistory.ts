import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createUserCoinsPriceHistorySelect = <
  T extends Prisma.UserCoinsPriceHistorySelect
>(
  arg: CheckSelectKeys<T, Prisma.UserCoinsPriceHistorySelect>
): CheckSelectKeys<T, Prisma.UserCoinsPriceHistorySelect> => arg;

export const selectUserCoinsPriceHistory = createUserCoinsPriceHistorySelect({
  id: true,
  created_at: true,
  date: true,
  price: true,
  userId: true,
});

export type UserCoinsPriceHistory = Prisma.UserCoinsPriceHistoryGetPayload<{
  select: typeof selectUserCoinsPriceHistory;
}>;
