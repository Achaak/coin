import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createCoinPriceHistorySelect = <T extends Prisma.CoinPriceHistorySelect>(
  arg: CheckSelectKeys<T, Prisma.CoinPriceHistorySelect>
): CheckSelectKeys<T, Prisma.CoinPriceHistorySelect> => arg;

export const selectCoinPriceHistory = createCoinPriceHistorySelect({
  coinId: true,
  created_at: true,
  id: true,
  price: true,
});

export type CoinPriceHistory = Prisma.CoinPriceHistoryGetPayload<{
  select: typeof selectCoinPriceHistory;
}>;
