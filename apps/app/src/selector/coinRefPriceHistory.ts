import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createCoinRefPriceHistorySelect = <
  T extends Prisma.CoinRefPriceHistorySelect
>(
  arg: CheckSelectKeys<T, Prisma.CoinRefPriceHistorySelect>
): CheckSelectKeys<T, Prisma.CoinRefPriceHistorySelect> => arg;

export const selectCoinRefPriceHistory = createCoinRefPriceHistorySelect({
  id: true,
  coinRefId: true,
  created_at: true,
  price: true,
});

export type CoinRefPriceHistory = Prisma.CoinRefPriceHistoryGetPayload<{
  select: typeof selectCoinRefPriceHistory;
}>;
